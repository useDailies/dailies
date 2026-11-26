import { readFileSync, rmSync, watch, writeFileSync, type FSWatcher } from 'node:fs';
import { join } from 'node:path';
import { checkKey, parseStoryboard, type CheckResult, type CutId, type Project, type VerifyRound } from '@dailies/shared';
import { bus } from './bus.ts';
import { runClaude, type ClaudeEvent } from './claude.ts';
import { compileComposition } from './compile.ts';
import { config } from './config.ts';
import { kane, killKaneIn } from './kane.ts';
import { buildPlan, setSheetUrl } from './plan.ts';
import { getProject, liveDiffersFromLatest, snapshotVersion, updateProject, versionEntry, ws } from './store.ts';
import { correctionPrompt, draftPrompt, type FailedCheck, type SheetEvidence } from './templates.ts';
import { CUTS } from '@dailies/shared';
import { runRound } from './verify.ts';

/* ------------------------------------------------------------------ helpers */

const live = new Map<string, { child?: import('node:child_process').ChildProcess; watcher?: FSWatcher }>();

export function setPhase(id: string, phase: Project['phase'], extra: Partial<Project> = {}) {
  updateProject(id, (p) => {
    p.phase = phase;
    Object.assign(p, extra);
  });
  bus.emit(id, 'phase', { phase, ...extra });
}

function claudeRelay(id: string, stage: string) {
  return (e: ClaudeEvent) => {
    bus.emit(id, `claude.${e.kind}`, { stage, ...e });
    if (e.kind === 'init') updateProject(id, (p) => void (p.claude.model = e.model));
  };
}

/** Tell the studio every time Claude's working file changes, so the player hot-swaps it. */
function watchLive(id: string) {
  const state = live.get(id) ?? {};
  if (state.watcher) return;
  let t: NodeJS.Timeout | null = null;
  state.watcher = watch(ws(id, 'src'), { recursive: true }, () => {
    if (t) clearTimeout(t);
    t = setTimeout(async () => {
      const c = await compileComposition(versionEntry(id, 'live'));
      bus.emit(id, 'live.changed', { ok: c.ok, error: c.ok ? null : c.error });
    }, 250);
  });
  live.set(id, state);
}

function stopWatch(id: string) {
  live.get(id)?.watcher?.close();
  const s = live.get(id);
  if (s) s.watcher = undefined;
}

export function describeFails(p: Project, results: CheckResult[]): FailedCheck[] {
  const sb = parseStoryboard(p.storyboard);
  return results
    .filter((r) => r.verdict !== 'pass')
    .map((r) => {
      const c = p.plan!.criteria.find((x) => x.id === r.ac)!;
      return {
        ac: r.ac,
        text: c?.text ?? r.ac,
        cut: r.cut,
        reason: r.verdict === 'unknown' ? `could not be judged: ${r.reason}` : r.reason,
        where: r.frames.join(', '),
        line: c?.line ?? null,
        lineText: c?.line ? (sb.lines.find((l) => l.n === c.line)?.text ?? null) : null,
      };
    });
}

/** The sheets Kane judged for the failing cuts: screenshot path + measured placement report. */
export function evidenceFor(round: VerifyRound, fails: CheckResult[]): SheetEvidence[] {
  const cuts = [...new Set(fails.map((f) => f.cut))];
  return cuts.map((cut) => ({
    cut,
    ratio: CUTS[cut].ratio,
    screenshot: round.eye[cut] ? `runs/${round.eye[cut]}` : undefined,
    report: round.reports?.[cut],
  }));
}

export async function snapshot(id: string, kind: 'draft' | 'fix', extra: { trigger?: string; summary?: string } = {}) {
  const c = await compileComposition(versionEntry(id, 'live'));
  const p = getProject(id)!;
  const prev = p.versions.at(-1);
  const v = snapshotVersion(id, { kind, compiles: c.ok, compileError: c.ok ? undefined : c.error, ...extra });
  if (prev) {
    const { diffLines } = await import('diff');
    const { readFileSync } = await import('node:fs');
    const a = readFileSync(join(ws(id, 'versions', `v${prev.n}`), 'Video.tsx'), 'utf8');
    const b = readFileSync(join(ws(id, 'versions', `v${v.n}`), 'Video.tsx'), 'utf8');
    let added = 0;
    let removed = 0;
    for (const part of diffLines(a, b)) {
      if (part.added) added += part.count ?? 0;
      if (part.removed) removed += part.count ?? 0;
    }
    updateProject(id, (pp) => {
      const vv = pp.versions.find((x) => x.n === v.n)!;
      vv.added = added;
      vv.removed = removed;
    });
    Object.assign(v, { added, removed });
  }
  bus.emit(id, 'version', { ...v });
  return v;
}

function guard(id: string, label: string) {
  const p = getProject(id);
  if (!p) throw Object.assign(new Error('not found'), { status: 404 });
  if (p.busy) throw Object.assign(new Error(`busy: ${p.busy}`), { status: 409 });
  updateProject(id, (pp) => {
    pp.busy = label;
    pp.error = null;
  });
  return p;
}

function release(id: string, error?: string) {
  updateProject(id, (p) => {
    p.busy = null;
    if (error) p.error = error;
  });
  bus.emit(id, 'busy', { busy: null, error: error ?? null });
}

/* -------------------------------------------------------------------- draft */

/**
 * Generate: Claude Code writes the first draft while Kane CLI designs the
 * tests from the same storyboard. The two agents work at the same time and
 * never see each other's output until review.
 */
export function startDraft(id: string) {
  guard(id, 'draft');
  bus.emit(id, 'busy', { busy: 'draft' });
  void (async () => {
    try {
      setPhase(id, 'drafting');
      watchLive(id);
      const planning = buildPlan(id).catch((e) => {
        bus.emit(id, 'plan.error', { error: (e as Error).message });
        throw e;
      });
      bus.emit(id, 'claude.start', { stage: 'draft', prompt: draftPrompt(), model: config.claude.model });
      const run = runClaude({
        cwd: ws(id),
        prompt: draftPrompt(),
        env: { DAILIES_PHASE: 'draft', DAILIES_PROJECT: id, DAILIES_API: config.apiUrl },
        onEvent: claudeRelay(id, 'draft'),
      });
      live.set(id, { ...live.get(id), child: run.child });
      const res = await run.done;
      updateProject(id, (pp) => {
        pp.claude.sessionId = res.sessionId ?? pp.claude.sessionId;
        pp.claude.costUsd += res.costUsd;
        pp.claude.turns += res.turns;
      });
      if (res.code !== 0) throw new Error(`Claude Code exited ${res.code}: ${res.lastText}`);
      const v = await snapshot(id, 'draft', { summary: res.lastText.slice(0, 1200) });
      bus.emit(id, 'claude.end', { stage: 'draft', version: v.n, compiles: v.compiles });
      bus.emit(id, 'busy', { busy: 'plan' });
      await planning;
      setPhase(id, 'drafted');
      release(id);
    } catch (e) {
      setPhase(id, 'error');
      release(id, (e as Error).message);
    } finally {
      stopWatch(id);
    }
  })();
}

/* ------------------------------------------------------------------- review */

interface ReviewState {
  active: boolean;
  fixRounds: number;
  pending: { ac: string; cut: CutId }[];
  inHook: boolean;
  /** a session the user opened themselves (studio gate), not one dailies spawned */
  interactive?: boolean;
}
const reviews = new Map<string, ReviewState>();

/**
 * Kane review: sweep the draft; if anything fails, resume Claude's own draft
 * session with Kane's findings. The workspace Stop hook then sends Claude's
 * every attempt to finish back through Kane — Claude cannot end its turn until
 * the checks it broke pass, or the round cap hands it to a human.
 */
export function startReview(id: string) {
  const p0 = guard(id, 'review');
  bus.emit(id, 'busy', { busy: 'review' });
  void (async () => {
    try {
      if (!p0.versions.length) throw new Error('Generate a draft first');
      if (!getProject(id)!.plan) await buildPlan(id);
      let p = getProject(id)!;
      if (liveDiffersFromLatest(id)) await snapshot(id, 'fix', { summary: 'Edited outside dailies' });
      p = getProject(id)!;
      const version = p.versions.at(-1)!.n;
      setSheetUrl(id, version);
      setPhase(id, 'verifying');
      const sweep = await runRound(id, { version, kind: 'sweep' });
      const fails = sweep.results.filter((r) => r.verdict !== 'pass');
      if (!fails.length) {
        bus.emit(id, 'review.clean', { version });
        setPhase(id, 'reviewed');
        release(id);
        return;
      }
      setPhase(id, 'correcting');
      reviews.set(id, { active: true, fixRounds: 0, pending: fails.map((f) => ({ ac: f.ac, cut: f.cut })), inHook: false });
      watchLive(id);
      const prompt = correctionPrompt(describeFails(getProject(id)!, fails), 1, true, evidenceFor(sweep, fails));
      bus.emit(id, 'claude.start', { stage: 'review', prompt, resume: p.claude.sessionId ?? null });
      const run = runClaude({
        cwd: ws(id),
        prompt,
        resume: p.claude.sessionId,
        env: { DAILIES_PHASE: 'review', DAILIES_PROJECT: id, DAILIES_API: config.apiUrl },
        onEvent: claudeRelay(id, 'review'),
      });
      live.set(id, { ...live.get(id), child: run.child });
      const res = await run.done;
      updateProject(id, (pp) => {
        pp.claude.sessionId = res.sessionId ?? pp.claude.sessionId;
        pp.claude.costUsd += res.costUsd;
        pp.claude.turns += res.turns;
      });
      const st = reviews.get(id);
      reviews.delete(id);
      // If Claude's process ended without its final attempt reaching the hook
      // (crash, or the hook failed open), make sure the last edit is pinned and judged.
      if (liveDiffersFromLatest(id)) {
        const v = await snapshot(id, 'fix', { summary: res.lastText.slice(0, 1200) });
        await runRound(id, { version: v.n, kind: 'regression' });
      }
      bus.emit(id, 'claude.end', { stage: 'review', code: res.code, fixRounds: st?.fixRounds ?? 0 });
      setPhase(id, 'reviewed');
      release(id, res.code === 0 ? undefined : `Claude Code exited ${res.code}: ${res.lastText}`);
    } catch (e) {
      reviews.delete(id);
      setPhase(id, 'error');
      release(id, (e as Error).message);
    } finally {
      stopWatch(id);
    }
  })();
}

export interface HookPayload {
  session_id?: string;
  stop_hook_active?: boolean;
  last_assistant_message?: string;
}

/**
 * Claude Code tried to stop. Pin what it wrote, have Kane re-judge, and answer
 * with Claude Code's Stop-hook contract: {"decision":"block","reason":…} keeps
 * Claude working; an empty object lets it finish.
 */
export async function onStopHook(id: string, payload: HookPayload & { mode?: string }): Promise<{ decision?: 'block'; reason?: string; systemMessage?: string }> {
  const st = reviews.get(id);
  if (!st?.active && payload.mode === 'gate' && getProject(id)?.gate) {
    // The user's own Claude Code session tried to stop in a gated workspace.
    return onGatedStop(id, payload);
  }
  if (!st?.active) return {};
  if (st.inHook) return {};
  st.inHook = true;
  try {
    bus.emit(id, 'hook.stop', { stopHookActive: Boolean(payload.stop_hook_active), fixRounds: st.fixRounds });
    if (!liveDiffersFromLatest(id)) {
      st.fixRounds++;
      if (st.fixRounds >= config.maxFixRounds) return allow(id, st, 'Claude made no further change; handing back to a human.');
      return block(id, st, 'You have not changed src/Video.tsx since Kane CLI reported the failures above. Fix them in src/Video.tsx, then stop.');
    }
    st.fixRounds++;
    const v = await snapshot(id, 'fix', { trigger: getProject(id)!.rounds.at(-1)?.id, summary: (payload.last_assistant_message ?? '').slice(0, 1200) });
    if (!v.compiles) {
      if (st.fixRounds >= config.maxFixRounds) return allow(id, st, 'Composition still does not compile after the round cap.');
      return block(id, st, `src/Video.tsx does not compile, so Kane CLI could not look at it:\n${v.compileError}\nFix the error, then stop.`);
    }
    setPhase(id, 'verifying');
    // A revision has nothing pending yet: judge everything. A correction re-judges what failed first.
    const first = await runRound(id, st.pending.length ? { version: v.n, kind: 'targeted', only: st.pending } : { version: v.n, kind: 'sweep' });
    let failing = first.results.filter((r) => r.verdict !== 'pass');
    let decided: VerifyRound = first;
    if (!failing.length && first.kind === 'targeted') {
      // What was broken now holds. Make sure the fix broke nothing else.
      const reg = await runRound(id, { version: v.n, kind: 'regression' });
      failing = reg.results.filter((r) => r.verdict !== 'pass');
      decided = reg;
    }
    if (!failing.length) {
      setPhase(id, 'correcting');
      return allow(id, st, `Kane CLI verified v${v.n}: every criterion passes in every cut.`);
    }
    st.pending = failing.map((f) => ({ ac: f.ac, cut: f.cut }));
    if (st.fixRounds >= config.maxFixRounds) {
      setPhase(id, 'correcting');
      return allow(id, st, `${failing.length} check(s) still fail after ${st.fixRounds} rounds; flagged for human review.`);
    }
    setPhase(id, 'correcting');
    const reason = correctionPrompt(describeFails(getProject(id)!, failing), st.fixRounds + 1, false, evidenceFor(decided, failing));
    bus.emit(id, 'hook.verdict', { round: decided.id, failing: failing.map((f) => checkKey(f.ac, f.cut)) });
    return block(id, st, reason);
  } catch (e) {
    // Fail open: an infrastructure problem must never trap the agent.
    bus.emit(id, 'hook.error', { error: (e as Error).message });
    return { systemMessage: `dailies could not verify (${(e as Error).message}); not confirmed by Kane.` };
  } finally {
    st.inHook = false;
  }
}

/**
 * Gate for a Claude Code session the user opened in the workspace themselves.
 * Same contract as the spawned review: pin what changed, have Kane judge it
 * (full sweep, or targeted while a previous gated stop still has failures),
 * and block with Kane's findings until the storyboard holds.
 */
const gated = new Map<string, ReviewState>();
async function onGatedStop(id: string, payload: HookPayload): Promise<{ decision?: 'block'; reason?: string; systemMessage?: string }> {
  const st = gated.get(id) ?? { active: true, fixRounds: 0, pending: [], inHook: false, interactive: true };
  gated.set(id, st);
  if (st.inHook) return {};
  if (getProject(id)!.busy) return { systemMessage: 'dailies is busy with another run; not verified by Kane.' };
  st.inHook = true;
  updateProject(id, (p) => void (p.busy = 'gate'));
  bus.emit(id, 'busy', { busy: 'gate' });
  watchLive(id);
  try {
    bus.emit(id, 'hook.stop', { stopHookActive: Boolean(payload.stop_hook_active), fixRounds: st.fixRounds, interactive: true });
    if (!getProject(id)!.plan) await buildPlan(id);
    const changed = liveDiffersFromLatest(id);
    const p = getProject(id)!;
    if (!changed && p.rounds.some((r) => r.version === p.versions.at(-1)?.n) && !st.pending.length) {
      gated.delete(id);
      return { systemMessage: 'No change to src/Video.tsx since Kane last verified it.' };
    }
    const v = changed ? await snapshot(id, p.versions.length ? 'fix' : 'draft', { summary: (payload.last_assistant_message ?? '').slice(0, 1200) }) : p.versions.at(-1)!;
    if (!v.compiles) return block(id, st, `src/Video.tsx does not compile, so Kane CLI could not look at it:\n${v.compileError}\nFix the error, then stop.`);
    setSheetUrl(id, v.n);
    st.fixRounds++;
    let round = await runRound(id, st.pending.length ? { version: v.n, kind: 'targeted', only: st.pending } : { version: v.n, kind: 'sweep' });
    let failing = round.results.filter((r) => r.verdict !== 'pass');
    if (!failing.length && round.kind === 'targeted') {
      round = await runRound(id, { version: v.n, kind: 'regression' });
      failing = round.results.filter((r) => r.verdict !== 'pass');
    }
    if (!failing.length || st.fixRounds >= config.maxFixRounds) {
      gated.delete(id);
      return allow(id, st, failing.length ? `${failing.length} check(s) still fail after ${st.fixRounds} rounds; flagged for human review.` : `Kane CLI verified v${v.n}: every criterion passes in every cut.`);
    }
    st.pending = failing.map((f) => ({ ac: f.ac, cut: f.cut }));
    return block(id, st, correctionPrompt(describeFails(getProject(id)!, failing), st.fixRounds, st.fixRounds === 1, evidenceFor(round, failing)));
  } catch (e) {
    bus.emit(id, 'hook.error', { error: (e as Error).message });
    return { systemMessage: `dailies could not verify (${(e as Error).message}); not confirmed by Kane.` };
  } finally {
    st.inHook = false;
    stopWatch(id);
    updateProject(id, (p) => void (p.busy = null));
    bus.emit(id, 'busy', { busy: null });
  }
}

export function setGate(id: string, on: boolean) {
  const f = ws(id, '.dailies-gate');
  if (on) writeFileSync(f, JSON.stringify({ project: id, api: config.apiUrl }));
  else rmSync(f, { force: true });
  gated.delete(id);
  return updateProject(id, (p) => void (p.gate = on));
}

function block(id: string, st: ReviewState, reason: string) {
  bus.emit(id, 'hook.block', { reason, fixRounds: st.fixRounds });
  return { decision: 'block' as const, reason };
}
function allow(id: string, st: ReviewState, note: string) {
  st.active = false;
  bus.emit(id, 'hook.allow', { note, fixRounds: st.fixRounds });
  return { systemMessage: note };
}

/* ------------------------------------------------------------------ revise */

/**
 * Ask Claude for a change. Claude's own session resumes with the request; the
 * Stop hook then runs a full Kane sweep before Claude may finish, so a change
 * that breaks the storyboard (a caption pushed into the 9:16 UI band, a reveal
 * moved past its timecode) comes straight back as Kane's findings.
 */
export function startRevise(id: string, request: string) {
  const p0 = guard(id, 'revise');
  bus.emit(id, 'busy', { busy: 'revise' });
  void (async () => {
    try {
      if (!p0.versions.length) throw new Error('Generate a draft first');
      if (!getProject(id)!.plan) await buildPlan(id);
      const p = getProject(id)!;
      setPhase(id, 'correcting');
      reviews.set(id, { active: true, fixRounds: 0, pending: [], inHook: false });
      watchLive(id);
      // Passed exactly as the user wrote it. The storyboard is enforced by the
      // Stop hook, not by reminding Claude in the prompt.
      const prompt = request.trim();
      bus.emit(id, 'revise.request', { request: request.trim() });
      bus.emit(id, 'claude.start', { stage: 'revise', prompt, resume: p.claude.sessionId ?? null });
      const run = runClaude({
        cwd: ws(id),
        prompt,
        resume: p.claude.sessionId,
        env: { DAILIES_PHASE: 'review', DAILIES_PROJECT: id, DAILIES_API: config.apiUrl },
        onEvent: claudeRelay(id, 'revise'),
      });
      live.set(id, { ...live.get(id), child: run.child });
      const res = await run.done;
      updateProject(id, (pp) => {
        pp.claude.sessionId = res.sessionId ?? pp.claude.sessionId;
        pp.claude.costUsd += res.costUsd;
        pp.claude.turns += res.turns;
      });
      const st = reviews.get(id);
      reviews.delete(id);
      if (liveDiffersFromLatest(id)) {
        const v = await snapshot(id, 'fix', { summary: res.lastText.slice(0, 1200) });
        await runRound(id, { version: v.n, kind: 'sweep' });
      }
      bus.emit(id, 'claude.end', { stage: 'revise', code: res.code, fixRounds: st?.fixRounds ?? 0 });
      setPhase(id, 'reviewed');
      release(id, res.code === 0 ? undefined : `Claude Code exited ${res.code}: ${res.lastText}`);
    } catch (e) {
      reviews.delete(id);
      setPhase(id, 'error');
      release(id, (e as Error).message);
    } finally {
      stopWatch(id);
    }
  })();
}

/* --------------------------------------------------------------------- seal */

/**
 * Seal: run Kane's own designed *_test.md files against the final version
 * (authoring them in a real browser), then `kane-cli cover` to report what the
 * storyboard's criteria proved vs still owe. This is the evidence pack a client
 * signs off on.
 */
export function startSeal(id: string) {
  guard(id, 'seal');
  bus.emit(id, 'busy', { busy: 'seal' });
  void (async () => {
    try {
      const p = getProject(id)!;
      if (!p.plan?.tests.length) throw new Error('No designed tests to seal yet');
      const version = p.versions.at(-1)!.n;
      setSheetUrl(id, version);
      setPhase(id, 'sealing');
      updateProject(id, (pp) => {
        pp.seal = {
          startedAt: new Date().toISOString(),
          version,
          credits: 0,
          tests: pp.plan!.tests.map((t) => ({ id: t.id, file: t.file, title: t.title, status: 'queued', credits: 0 })),
        };
      });
      const queue = [...p.plan.tests];
      const worker = async () => {
        for (let t = queue.shift(); t; t = queue.shift()) {
          const test = t;
          bus.emit(id, 'seal.test.start', { id: test.id, file: test.file });
          updateProject(id, (pp) => void (pp.seal!.tests.find((x) => x.id === test.id)!.status = 'running'));
          const r = await kane(['testmd', 'run', `.testmuai/tests/${test.file}`, '--agent', '--headless', '--timeout', '240', '--on-lock-conflict', 'wait'], {
            cwd: ws(id),
            timeoutSec: 1500,
            onEvent: (e) => {
              if (e.remark && e.step !== undefined) bus.emit(id, 'seal.test.step', { id: test.id, step: e.step, status: e.status, remark: String(e.remark).slice(0, 300) });
            },
          });
          const done = r.events.find((e) => e.type === 'test_md_done');
          const status = done?.overall_status === 'passed' ? 'passed' : done?.overall_status === 'failed' ? 'failed' : 'error';
          const pack = (r.stderr + r.stdout).match(/(\S+\.evidence)\b/)?.[1];
          const why = readResult(id, test.file);
          const errText = status === 'error' ? r.stderr.trim().split('\n').filter(Boolean).slice(-2).join(' ').slice(0, 400) : undefined;
          updateProject(id, (pp) => {
            const row = pp.seal!.tests.find((x) => x.id === test.id)!;
            Object.assign(row, { status, credits: r.credits, share: done?.share_url, pack, failedStep: why?.step, reason: why?.reason ?? errText });
            pp.seal!.credits += r.credits;
            pp.credits.seal += r.credits;
          });
          bus.emit(id, 'seal.test.end', { id: test.id, status, credits: r.credits, share: done?.share_url ?? null, reason: why?.reason ?? errText ?? null });
        }
      };
      // One at a time: testmd runs in one workspace share Kane's local store lock.
      await worker();
      const cover = await kane(['cover', '--json'], { cwd: ws(id), timeoutSec: 120 });
      let coverage: unknown = null;
      try {
        coverage = JSON.parse(cover.stdout.slice(cover.stdout.indexOf('{')));
      } catch {
        coverage = { raw: cover.stdout.slice(0, 4000) };
      }
      updateProject(id, (pp) => {
        pp.seal!.coverage = coverage;
        pp.seal!.endedAt = new Date().toISOString();
      });
      bus.emit(id, 'seal.done', { version });
      setPhase(id, 'sealed');
      release(id);
    } catch (e) {
      setPhase(id, 'error');
      release(id, (e as Error).message);
    }
  })();
}

export function cancel(id: string) {
  live.get(id)?.child?.kill('SIGTERM');
  killKaneIn(ws(id));
  reviews.delete(id);
  stopWatch(id);
  release(id, 'Cancelled');
}

/** Kane writes output-<stem>/Result.md next to each test; pull the first failed step's reason. */
function readResult(id: string, file: string): { step: string; reason: string } | null {
  try {
    const md = readFileSync(join(ws(id, '.testmuai', 'tests'), `output-${file.replace(/_test\.md$/, '')}`, 'Result.md'), 'utf8');
    const m = md.match(/^## (Step[^\n]*?) ✗ failed[^\n]*\n(?:md5:[^\n]*\n)?Reason: ([^\n]+)/m);
    return m ? { step: m[1].trim(), reason: m[2].trim() } : null;
  } catch {
    return null;
  }
}
