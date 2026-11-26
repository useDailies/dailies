/**
 * External agents: Claude Code, Cursor or any MCP client composing in the
 * user's own repository, with Kane CLI judging through dailies.
 *
 *   start   → an owned spot; Kane designs the criteria in the background
 *   submit  → upload the composition files, pin a version, Kane judges
 *             (full sweep, then targeted re-checks of what failed + a regression
 *             sweep), structured verdicts back
 *
 * The same submit backs both the `dailies_review` MCP tool and the Stop hook,
 * so an agent cannot end its turn while a check Kane judged is failing.
 */
import { randomBytes, createHash } from 'node:crypto';
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join, normalize } from 'node:path';
import { CUTS, checkKey, parseStoryboard, sampleFrames, type CheckResult, type CutId, type Project, type VerifyRound } from '@dailies/shared';
import { bus } from './bus.ts';
import { config } from './config.ts';
import { buildPlan, setSheetUrl } from './plan.ts';
import { describeFails, evidenceFor, setPhase, snapshot } from './pipeline.ts';
import { createProject, getProject, liveDiffersFromLatest, updateProject, versionSource, ws } from './store.ts';
import { agentContract, correctionPrompt } from './templates.ts';
import { runRound } from './verify.ts';

const planning = new Map<string, Promise<unknown>>();
const inflight = new Map<string, Promise<JudgeResult>>();
interface AgentState {
  fixRounds: number;
  pending: { ac: string; cut: CutId }[];
  last?: JudgeResult;
}
const states = new Map<string, AgentState>();

/** MCP clients report raw names ("claude-code", "cursor-vscode"); show people the product. */
export function clientName(raw?: string) {
  const r = String(raw ?? '').toLowerCase();
  if (r.includes('claude')) return 'Claude Code';
  if (r.includes('cursor')) return 'Cursor';
  if (r.includes('codex')) return 'Codex';
  if (r.includes('windsurf') || r.includes('codeium')) return 'Windsurf';
  if (r.includes('vscode') || r.includes('visual studio code')) return 'VS Code';
  if (r.includes('zed')) return 'Zed';
  return String(raw ?? 'MCP client').slice(0, 40) || 'MCP client';
}

export function studioLink(id: string) {
  return `${config.publicUrl}/p/${id}`;
}

/* ---------------------------------------------------------------- start */

export function startAgentSpot(owner: string, body: { storyboard: string; title?: string; client?: string; clientVersion?: string; dir?: string; repo?: string }) {
  if (!body?.storyboard?.trim()) throw Object.assign(new Error('storyboard is required'), { statusCode: 400 });
  const sb = parseStoryboard(body.storyboard);
  if (!sb.shots.length) throw Object.assign(new Error('The storyboard has no shots. Use "## Shot 1 (0:00-0:03) Title" headings.'), { statusCode: 400 });
  const p = createProject(body.storyboard, body.title);
  const dir = (body.dir ?? 'video').replace(/^\.?\/+|\/+$/g, '') || 'video';
  updateProject(p.id, (pp) => {
    pp.owner = owner;
    pp.source = 'mcp';
    pp.inspectKey = randomBytes(12).toString('base64url');
    pp.agent = { client: clientName(body.client), version: body.clientVersion?.slice(0, 30), dir, repo: body.repo?.slice(0, 80) };
    pp.phase = 'drafting';
  });
  bus.emit(p.id, 'agent.start', { client: clientName(body.client), dir, title: p.title });
  ensurePlan(p.id);
  return describeSpot(p.id);
}

function ensurePlan(id: string) {
  if (getProject(id)?.plan) return Promise.resolve();
  if (!planning.has(id)) {
    updateProject(id, (p) => void (p.busy = 'plan'));
    bus.emit(id, 'busy', { busy: 'plan' });
    const run = buildPlan(id)
      .catch((e) => {
        bus.emit(id, 'plan.error', { error: (e as Error).message });
        throw e;
      })
      .finally(() => {
        planning.delete(id);
        updateProject(id, (p) => void (p.busy = null));
        bus.emit(id, 'busy', { busy: null });
      });
    planning.set(id, run);
  }
  return planning.get(id)!;
}

export function describeSpot(id: string) {
  const p = getProject(id)!;
  const sb = parseStoryboard(p.storyboard);
  return {
    id: p.id,
    title: p.title,
    studioUrl: studioLink(p.id),
    dir: p.agent?.dir ?? 'video',
    cuts: p.cuts.map((c) => ({ id: c, ratio: CUTS[c].ratio, width: CUTS[c].width, height: CUTS[c].height })),
    durationSeconds: sb.duration,
    fps: sb.fps,
    shots: sb.shots.map((s) => ({ n: s.n, title: s.title, start: s.start, end: s.end })),
    framesKaneJudges: sampleFrames(sb).map((f) => ({ label: f.label, timecode: f.timecode, frame: f.frame, why: f.reason })),
    contract: agentContract(p.cuts, p.agent?.dir ?? 'video'),
    plan: p.plan ? { criteria: p.plan.criteria.length, tests: p.plan.tests.length } : { status: planning.has(id) ? 'Kane CLI is designing the acceptance criteria' : 'not started' },
    versions: p.versions.length,
    lastVerdict: summarizeLatest(p),
  };
}

function summarizeLatest(p: Project) {
  const v = p.versions.at(-1)?.n;
  if (!v) return null;
  const latest = new Map<string, CheckResult>();
  for (const r of p.rounds) for (const res of r.results) latest.set(checkKey(res.ac, res.cut), res);
  const mine = [...latest.values()];
  const judgedV = p.rounds.filter((r) => r.version === v);
  if (!judgedV.length) return { version: v, judged: false };
  return { version: v, judged: true, pass: mine.filter((r) => r.verdict === 'pass').length, total: mine.length };
}

export async function criteriaFor(id: string, waitSec = 0) {
  if (!getProject(id)?.plan && waitSec > 0) {
    await Promise.race([ensurePlan(id).catch(() => undefined), new Promise((r) => setTimeout(r, waitSec * 1000))]);
  }
  const p = getProject(id)!;
  if (!p.plan) return { ready: false, status: planning.has(id) ? 'Kane CLI is still designing the acceptance criteria.' : (p.error ?? 'No plan yet.') };
  return {
    ready: true,
    credits: p.plan.credits,
    criteria: p.plan.criteria.map((c) => ({ id: c.id, text: c.text, cuts: c.cuts, atSeconds: c.times, shot: c.shot, storyboardLine: c.line, risk: c.risk, expected: c.expected })),
    tests: p.plan.tests.map((t) => ({ id: t.id, title: t.title, file: t.file })),
  };
}

/* --------------------------------------------------------------- submit */

export interface JudgeResult {
  status: 'pass' | 'fail' | 'compile_error' | 'capped' | 'error';
  version: number | null;
  unchanged?: boolean;
  round?: string;
  kind?: string;
  pass: number;
  total: number;
  failing: { ac: string; cut: string; ratio: string; criterion: string; reason: string; frames: string; storyboardLine: number | null; storyboardText: string | null }[];
  /** what the agent should read: Kane's findings as a correction brief */
  feedback: string;
  sheets: { cut: string; ratio: string; image: string | null; report: string | null }[];
  credits: number;
  fixRounds: number;
  studioUrl: string;
  message: string;
}

const MAX_FILES = 40;
const MAX_BYTES = 600_000;

/** Replace the workspace's src/ with the agent's composition files (sandboxed paths). */
function writeSources(id: string, files: Record<string, string>) {
  const entries = Object.entries(files ?? {});
  if (!entries.length) throw Object.assign(new Error('No composition files were sent.'), { statusCode: 400 });
  if (entries.length > MAX_FILES) throw Object.assign(new Error(`Too many files (${entries.length} > ${MAX_FILES}).`), { statusCode: 400 });
  let bytes = 0;
  const clean: [string, string][] = [];
  for (const [raw, body] of entries) {
    const rel = normalize(String(raw)).replace(/\\/g, '/').replace(/^\/+/, '');
    if (rel.startsWith('..') || rel.includes('/../') || !/\.(tsx?|jsx?|json|css)$/.test(rel)) throw Object.assign(new Error(`Refusing file path ${raw}`), { statusCode: 400 });
    bytes += Buffer.byteLength(String(body));
    clean.push([rel, String(body)]);
  }
  if (bytes > MAX_BYTES) throw Object.assign(new Error(`Composition too large (${bytes} bytes).`), { statusCode: 413 });
  if (!clean.some(([r]) => r === 'Video.tsx')) throw Object.assign(new Error('The composition must include Video.tsx (the entry file).'), { statusCode: 400 });
  const src = ws(id, 'src');
  const before = new Map<string, string>();
  for (const f of listFiles(src)) before.set(f, readFileSync(join(src, f), 'utf8'));
  const same = before.size === clean.length && clean.every(([r, b]) => before.get(r) === b);
  if (same) return false;
  rmSync(src, { recursive: true, force: true });
  for (const [rel, body] of clean) {
    mkdirSync(dirname(join(src, rel)), { recursive: true });
    writeFileSync(join(src, rel), body);
  }
  return true;
}

function listFiles(dir: string, base = ''): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? listFiles(join(dir, d.name), join(base, d.name)) : [join(base, d.name)]));
}

const sourceHash = (id: string) => createHash('sha256').update(versionSource(id, 'live') ?? '').digest('hex');

export async function submit(id: string, body: { files: Record<string, string>; summary?: string; trigger?: 'mcp' | 'hook'; client?: string }): Promise<JudgeResult> {
  // Serialise per spot: an MCP review and a Stop hook can arrive together.
  while (inflight.has(id)) await inflight.get(id)!.catch(() => undefined);
  const job = judge(id, body);
  inflight.set(id, job);
  try {
    return await job;
  } finally {
    inflight.delete(id);
  }
}

async function judge(id: string, body: { files: Record<string, string>; summary?: string; trigger?: 'mcp' | 'hook'; client?: string }): Promise<JudgeResult> {
  const st = states.get(id) ?? { fixRounds: 0, pending: [] };
  states.set(id, st);
  const trigger = body.trigger ?? 'mcp';
  const changed = writeSources(id, body.files);
  bus.emit(id, 'agent.submit', { trigger, client: body.client ? clientName(body.client) : getProject(id)?.agent?.client, changed, files: Object.keys(body.files).length });

  let p = getProject(id)!;
  const lastV = p.versions.at(-1);
  // Nothing changed since Kane's last verdict on this exact source: answer from it.
  if (!changed && lastV && !liveDiffersFromLatest(id) && st.last && st.last.version === lastV.n) {
    if (st.last.status === 'pass') return { ...st.last, unchanged: true, message: `No change since Kane CLI verified v${lastV.n}. Every criterion passes in every cut.` };
    if (trigger === 'hook') st.fixRounds++;
    if (st.fixRounds >= config.maxFixRounds) return finish(id, st, { ...st.last, status: 'capped', unchanged: true, fixRounds: st.fixRounds, message: `Still failing after ${st.fixRounds} rounds with no further change; handing back to a human.` });
    return { ...st.last, unchanged: true, fixRounds: st.fixRounds, message: `You have not changed the composition since Kane CLI reported these failures. Fix them, then review again.` };
  }

  updateProject(id, (pp) => void (pp.busy = 'agent'));
  bus.emit(id, 'busy', { busy: 'agent' });
  try {
    if (!getProject(id)!.plan) {
      setPhase(id, 'drafting');
      await ensurePlan(id);
    }
    p = getProject(id)!;
    const v =
      changed || !lastV || liveDiffersFromLatest(id)
        ? await snapshot(id, p.versions.length ? 'fix' : 'draft', { summary: (body.summary ?? `Submitted by ${p.agent?.client ?? 'agent'} via ${trigger}`).slice(0, 1200) })
        : lastV;
    const base = { version: v.n, studioUrl: studioLink(id), credits: 0, fixRounds: st.fixRounds };
    if (!v.compiles) {
      st.fixRounds++;
      const msg = `The composition does not compile, so Kane CLI could not look at it:\n${v.compileError}\nFix the error, then review again.`;
      if (st.fixRounds >= config.maxFixRounds) return finish(id, st, { ...base, status: 'capped', pass: 0, total: 0, failing: [], sheets: [], feedback: msg, fixRounds: st.fixRounds, message: 'Still not compiling after the round cap.' });
      return remember(st, { ...base, status: 'compile_error', pass: 0, total: 0, failing: [], sheets: [], feedback: msg, fixRounds: st.fixRounds, message: 'Compile error' });
    }
    setSheetUrl(id, v.n);
    setPhase(id, 'verifying');
    const credits0 = getProject(id)!.credits.verify;
    let round = await runRound(id, st.pending.length ? { version: v.n, kind: 'targeted', only: st.pending } : { version: v.n, kind: 'sweep' });
    let failing = round.results.filter((r) => r.verdict !== 'pass');
    if (!failing.length && round.kind === 'targeted') {
      round = await runRound(id, { version: v.n, kind: 'regression' });
      failing = round.results.filter((r) => r.verdict !== 'pass');
    }
    st.fixRounds++;
    const credits = +(getProject(id)!.credits.verify - credits0).toFixed(2);
    const result = shape(id, round, failing, { ...base, credits, fixRounds: st.fixRounds });
    if (!failing.length) {
      setPhase(id, 'reviewed');
      bus.emit(id, 'hook.allow', { note: result.message, fixRounds: st.fixRounds, external: true });
      return finish(id, st, result);
    }
    st.pending = failing.map((f) => ({ ac: f.ac, cut: f.cut }));
    setPhase(id, 'correcting');
    if (st.fixRounds >= config.maxFixRounds) return finish(id, st, { ...result, status: 'capped', message: `${failing.length} check(s) still fail after ${st.fixRounds} rounds; flagged for human review.` });
    bus.emit(id, trigger === 'hook' ? 'hook.block' : 'agent.verdict', { reason: result.feedback, fixRounds: st.fixRounds, failing: failing.map((f) => checkKey(f.ac, f.cut)) });
    return remember(st, result);
  } catch (e) {
    bus.emit(id, 'hook.error', { error: (e as Error).message });
    return { status: 'error', version: getProject(id)!.versions.at(-1)?.n ?? null, pass: 0, total: 0, failing: [], sheets: [], feedback: '', credits: 0, fixRounds: st.fixRounds, studioUrl: studioLink(id), message: `dailies could not verify: ${(e as Error).message}` };
  } finally {
    updateProject(id, (pp) => void (pp.busy = null));
    bus.emit(id, 'busy', { busy: null });
  }
}

function remember(st: AgentState, r: JudgeResult) {
  st.last = r;
  return r;
}
function finish(id: string, st: AgentState, r: JudgeResult) {
  // A pass (or a cap) closes this correction series; the next change starts fresh.
  states.set(id, { fixRounds: 0, pending: [], last: r.status === 'pass' ? r : undefined });
  return r;
}

/** URL of the sheet Kane judged: the compact JPEG when it exists. */
function sheetImage(id: string, rel: string) {
  const jpg = rel.replace(/\.png$/, '.jpg');
  const use = existsSync(ws(id, jpg)) ? jpg : rel;
  return `${config.publicUrl}/api/projects/${id}/files/${use.replace(/^runs\//, '')}`;
}

function shape(id: string, round: VerifyRound, failing: CheckResult[], base: { version: number; studioUrl: string; credits: number; fixRounds: number }): JudgeResult {
  const p = getProject(id)!;
  const dir = p.agent?.dir ?? 'video';
  const fails = describeFails(p, failing);
  const ev = evidenceFor(round, failing).map((e) => ({ ...e, screenshot: e.screenshot ? sheetImage(id, e.screenshot) : undefined }));
  // Totals: the latest verdict of every check on this version.
  const latest = new Map<string, CheckResult>();
  for (const r of p.rounds.filter((x) => x.version <= base.version)) for (const res of r.results) latest.set(checkKey(res.ac, res.cut), res);
  const all = [...latest.values()];
  const pass = all.filter((r) => r.verdict === 'pass').length;
  return {
    status: failing.length ? 'fail' : 'pass',
    round: round.id,
    kind: round.kind,
    ...base,
    pass,
    total: all.length,
    failing: fails.map((f) => ({ ac: f.ac, cut: f.cut, ratio: CUTS[f.cut as CutId]?.ratio ?? f.cut, criterion: f.text, reason: f.reason, frames: f.where, storyboardLine: f.line, storyboardText: f.lineText })),
    feedback: failing.length ? correctionPrompt(fails, base.fixRounds, base.fixRounds <= 1, ev, { file: `${dir}/Video.tsx`, external: true }) : '',
    sheets: evidenceFor(round, failing.length ? failing : round.results).map((e) => ({ cut: e.cut, ratio: e.ratio, image: e.screenshot ? sheetImage(id, e.screenshot) : null, report: e.report ?? null })),
    message: failing.length
      ? `Kane CLI judged v${base.version} (${round.kind}): ${failing.length} check${failing.length === 1 ? '' : 's'} failing.`
      : `Kane CLI verified v${base.version}: every criterion passes in every cut (${pass}/${all.length}).`,
  };
}
