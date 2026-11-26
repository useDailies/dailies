import { randomBytes } from 'node:crypto';
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  checkKey,
  conditionFor,
  framesInReason,
  parseStoryboard,
  sampleFrames,
  type CheckResult,
  type Criterion,
  type CutId,
  type RoundKind,
  type VerifyRound,
} from '@dailies/shared';
import { bus } from './bus.ts';
import { openSheet } from './chrome.ts';
import { config } from './config.ts';
import { analyze } from './kane.ts';
import { getProject, updateProject, ws } from './store.ts';

/**
 * One verification round = Kane CLI judging a pinned version.
 *
 * Budget strategy (why a round is cheap):
 *  - one contact sheet per cut holds every storyboard timecode, so one Kane
 *    analyzer call answers every criterion for that cut;
 *  - exact text and positions are read from the sheet's facts table (DOM), so
 *    Kane never has to OCR a typo out of pixels;
 *  - cuts are judged in parallel, each in its own Chrome;
 *  - after a fix, only the checks that failed are re-judged (targeted), and a
 *    full regression sweep runs once they pass.
 */
export function sheetUrl(projectId: string, version: number, cut: CutId) {
  const key = getProject(projectId)?.inspectKey;
  return `${config.studioUrl}/inspect/${projectId}/${version}/sheet${key ? `/${key}` : ''}?cut=${cut}&guides=1&kane=1`;
}

export async function runRound(
  projectId: string,
  opts: { version: number; kind: RoundKind; only?: { ac: string; cut: CutId }[] },
): Promise<VerifyRound> {
  const p = getProject(projectId)!;
  if (!p.plan) throw new Error('no Kane plan yet');
  const sb = parseStoryboard(p.storyboard);
  const frames = sampleFrames(sb);
  const id = `r${p.rounds.length + 1}-${randomBytes(2).toString('hex')}`;
  const byCut = new Map<CutId, Criterion[]>();
  for (const cut of p.cuts) {
    const list = p.plan.criteria.filter((c) => c.cuts.includes(cut) && (!opts.only || opts.only.some((o) => o.ac === c.id && o.cut === cut)));
    if (list.length) byCut.set(cut, list);
  }
  const round: VerifyRound = {
    id,
    version: opts.version,
    kind: opts.kind,
    startedAt: new Date().toISOString(),
    cuts: [...byCut.keys()],
    acs: [...new Set([...byCut.values()].flat().map((c) => c.id))],
    results: [],
    credits: 0,
    calls: 0,
    conditions: [...byCut.values()].reduce((n, l) => n + l.length, 0),
    durationMs: 0,
    eye: {},
  };
  bus.emit(projectId, 'round.start', {
    id,
    version: opts.version,
    kind: opts.kind,
    cuts: round.cuts,
    checks: [...byCut.entries()].flatMap(([cut, list]) => list.map((c) => checkKey(c.id, cut))),
    conditions: round.conditions,
  });
  const t0 = Date.now();
  const errors: string[] = [];

  await Promise.all(
    [...byCut.entries()].map(async ([cut, criteria]) => {
      const chunks: Criterion[][] = [];
      for (let i = 0; i < criteria.length; i += config.kane.maxConditionsPerCall) chunks.push(criteria.slice(i, i + config.kane.maxConditionsPerCall));
      await Promise.all(
        chunks.map(async (chunk, lane) => {
          const shot = `${id}-${cut}${lane ? `-${lane}` : ''}.png`;
          let port: number;
          try {
            bus.emit(projectId, 'round.cut.open', { id, cut, lane, url: sheetUrl(projectId, opts.version, cut) });
            const opened = await openSheet(cut, sheetUrl(projectId, opts.version, cut), join(ws(projectId, 'runs', 'eye'), shot), lane);
            port = opened.port;
            if (!lane) {
              round.eye[cut] = `eye/${shot}`;
              round.reports = { ...(round.reports ?? {}), [cut]: opened.report };
            }
            bus.emit(projectId, 'round.cut.eye', { id, cut, lane, src: `eye/${shot}` });
          } catch (e) {
            const msg = (e as Error).message;
            errors.push(`${cut}: ${msg}`);
            for (const c of chunk) round.results.push({ ac: c.id, cut, verdict: 'unknown', reason: `Sheet did not render: ${msg}`, frames: [] });
            bus.emit(projectId, 'round.cut.error', { id, cut, error: msg });
            return;
          }
          const conditions = chunk.map((c) => conditionFor(c, cut, frames, sb));
          bus.emit(projectId, 'round.kane.call', {
            id,
            cut,
            lane,
            cmd: `kane-cli run --analyzer-only --agent --cdp-endpoint http://127.0.0.1:${port} ${conditions.map(() => '--condition …').join(' ')}`,
            conditions: chunk.map((c, i) => ({ ac: c.id, text: conditions[i] })),
          });
          let stepIx = 0;
          const out = await analyze({
            cwd: ws(projectId),
            cdpPort: port,
            conditions,
            onEvent: (e) => {
              if (e.remark && e.step !== undefined) {
                bus.emit(projectId, 'round.kane.step', { id, cut, lane, step: e.step, status: e.status, remark: String(e.remark).slice(0, 400), ac: chunk[Math.min(stepIx, chunk.length - 1)]?.id });
                if (e.status === 'done' || e.status === 'failed') stepIx++;
              }
            },
          });
          round.calls++;
          round.credits += out.credits;
          if (!out.ok) errors.push(`${cut}: ${out.error}`);
          chunk.forEach((c, i) => {
            const v = out.results[i];
            const reason = out.reasons[i] ?? out.error ?? '';
            const r: CheckResult = { ac: c.id, cut, verdict: v === true ? 'pass' : v === false ? 'fail' : 'unknown', reason, frames: framesInReason(reason) };
            round.results.push(r);
            bus.emit(projectId, 'round.check', { id, ...r });
          });
          bus.emit(projectId, 'round.kane.done', { id, cut, lane, credits: out.credits, ms: out.durationMs, ok: out.ok });
        }),
      );
    }),
  );

  round.durationMs = Date.now() - t0;
  round.endedAt = new Date().toISOString();
  if (errors.length) round.error = errors.join(' | ');
  writeFileSync(ws(projectId, 'runs', 'rounds', `${id}.json`), JSON.stringify(round, null, 2));
  updateProject(projectId, (pp) => {
    pp.rounds.push(round);
    pp.credits.verify += round.credits;
  });
  const pass = round.results.filter((r) => r.verdict === 'pass').length;
  const fail = round.results.filter((r) => r.verdict === 'fail').length;
  const unknown = round.results.filter((r) => r.verdict === 'unknown').length;
  bus.emit(projectId, 'round.end', { id, version: opts.version, kind: opts.kind, pass, fail, unknown, credits: round.credits, ms: round.durationMs, calls: round.calls, error: round.error ?? null });
  return round;
}

/** Latest verdict for every (criterion, cut) across rounds on or before a version. */
export function latestVerdicts(projectId: string, version?: number): Map<string, CheckResult & { round: string; version: number }> {
  const p = getProject(projectId)!;
  const out = new Map<string, CheckResult & { round: string; version: number }>();
  for (const r of p.rounds) {
    if (version !== undefined && r.version > version) continue;
    for (const c of r.results) out.set(checkKey(c.ac, c.cut), { ...c, round: r.id, version: r.version });
  }
  return out;
}
