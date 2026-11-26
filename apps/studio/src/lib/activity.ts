import type { CutId, DailiesEvent } from '@dailies/shared';

/**
 * The Activity view: the whole event log folded into runs a person can scan —
 * every Claude Code session, every Kane CLI command (test design, each
 * analyzer call with its exact conditions and verdicts, each seal test with
 * its steps), every Stop-hook decision and every pinned version.
 */
export type Status = 'running' | 'done' | 'failed';

export interface ClaudeItem {
  ts: number;
  type: 'text' | 'edit' | 'read' | 'hook' | 'result' | 'init';
  text: string;
  detail?: string;
  added?: number;
  removed?: number;
}
export interface ClaudeRun {
  kind: 'claude';
  key: string;
  stage: string;
  startedAt: number;
  endedAt?: number;
  prompt: string;
  model?: string;
  sessionId?: string;
  resume?: string | null;
  items: ClaudeItem[];
  costUsd?: number;
  turns?: number;
  durationMs?: number;
  status: Status;
}
export interface DesignStep {
  ts: number;
  label: string;
  cmd: string;
  ms?: number;
  credits?: number;
  code?: number;
  activity: string[];
  committed: string[];
}
export interface DesignRun {
  kind: 'design';
  key: string;
  startedAt: number;
  endedAt?: number;
  steps: DesignStep[];
  result?: { criteria: number; tests: number; scenarios: number; gaps: number; credits: number };
  cached?: boolean;
  status: Status;
  error?: string;
}
export interface KaneCall {
  cut: CutId;
  lane: number;
  url?: string;
  eye?: string;
  cmd?: string;
  conditions: { ac: string; text: string }[];
  steps: { ts: number; text: string; status: string }[];
  done?: { credits: number; ms: number; ok: boolean };
  error?: string;
}
export interface RoundRun {
  kind: 'round';
  key: string;
  id: string;
  version: number;
  rkind: string;
  cuts: CutId[];
  startedAt: number;
  endedAt?: number;
  total: number;
  calls: KaneCall[];
  checks: { ac: string; cut: CutId; verdict: string; reason: string }[];
  summary?: { pass: number; fail: number; unknown: number; credits: number; ms: number; calls: number };
  trigger?: 'review' | 'hook' | 'gate';
  status: Status;
}
export interface HookItem {
  kind: 'hook';
  key: string;
  ts: number;
  state: 'stop' | 'block' | 'allow' | 'error';
  text: string;
  detail?: string;
}
export interface VersionItem {
  kind: 'version';
  key: string;
  ts: number;
  n: number;
  vkind: string;
  added?: number;
  removed?: number;
  lines: number;
  compiles: boolean;
  summary?: string;
}
export interface SealRun {
  kind: 'seal';
  key: string;
  startedAt: number;
  endedAt?: number;
  tests: { id: string; file: string; status: string; credits?: number; share?: string | null; reason?: string | null; steps: { ts: number; text: string; status: string }[] }[];
  status: Status;
}
export interface RequestItem {
  kind: 'request';
  key: string;
  ts: number;
  text: string;
}
export type Entry = ClaudeRun | DesignRun | RoundRun | HookItem | VersionItem | SealRun | RequestItem;

export function buildActivity(events: DailiesEvent[]): Entry[] {
  const out: Entry[] = [];
  let claude: ClaudeRun | null = null;
  let design: DesignRun | null = null;
  const rounds = new Map<string, RoundRun>();
  let seal: SealRun | null = null;
  let lastHookStop = 0;

  for (const e of events) {
    const d = e.data as Record<string, any>;
    switch (e.type) {
      case 'claude.start':
        claude = { kind: 'claude', key: `c${e.seq}`, stage: d.stage, startedAt: e.ts, prompt: d.prompt ?? '', resume: d.resume, items: [], status: 'running' };
        out.push(claude);
        break;
      case 'claude.init':
        if (claude) Object.assign(claude, { model: d.model, sessionId: d.sessionId });
        break;
      case 'claude.text':
        claude?.items.push({ ts: e.ts, type: 'text', text: d.text });
        break;
      case 'claude.tool':
        claude?.items.push({ ts: e.ts, type: d.tool === 'Write' || d.tool === 'Edit' ? 'edit' : 'read', text: d.summary, added: d.added, removed: d.removed });
        break;
      case 'claude.hook_feedback':
        claude?.items.push({ ts: e.ts, type: 'hook', text: 'Stop hook kept Claude working', detail: String(d.text).replace(/^Stop hook feedback:\s*/i, '') });
        break;
      case 'claude.result':
        if (claude) Object.assign(claude, { costUsd: d.costUsd, turns: d.turns, durationMs: d.durationMs, endedAt: e.ts, status: d.ok ? 'done' : 'failed' });
        break;
      case 'claude.end':
        if (claude) {
          claude.endedAt ??= e.ts;
          if (claude.status === 'running') claude.status = d.code ? 'failed' : 'done';
        }
        claude = null;
        break;
      case 'plan.start':
        design = { kind: 'design', key: `d${e.seq}`, startedAt: e.ts, steps: [], status: 'running' };
        out.push(design);
        break;
      case 'plan.cached':
        out.push({ kind: 'design', key: `d${e.seq}`, startedAt: e.ts, endedAt: e.ts, steps: [], cached: true, result: { criteria: d.criteria, tests: d.tests, scenarios: 0, gaps: 0, credits: 0 }, status: 'done' });
        break;
      case 'plan.step':
        design?.steps.push({ ts: e.ts, label: d.label, cmd: d.cmd, activity: [], committed: [] });
        break;
      case 'kane.activity': {
        const s = design?.steps.at(-1);
        if (s && d.kind !== 'thinking_done' && d.label) s.activity.push(d.label);
        break;
      }
      case 'kane.commit':
      case 'kane.receipt': {
        const s = design?.steps.at(-1);
        if (s) s.committed.push(...((d.minted ?? d.committed ?? []) as string[]));
        break;
      }
      case 'plan.step.done': {
        const s = [...(design?.steps ?? [])].reverse().find((x) => x.label === d.label);
        if (s) Object.assign(s, { ms: d.ms, credits: d.credits, code: d.code });
        break;
      }
      case 'plan.done':
        if (design) Object.assign(design, { result: d, endedAt: e.ts, status: 'done' });
        design = null;
        break;
      case 'plan.error':
        if (design) Object.assign(design, { error: d.error, endedAt: e.ts, status: 'failed' });
        design = null;
        break;
      case 'round.start': {
        const r: RoundRun = {
          kind: 'round',
          key: `r${e.seq}`,
          id: d.id,
          version: d.version,
          rkind: d.kind,
          cuts: d.cuts,
          startedAt: e.ts,
          total: d.checks?.length ?? d.conditions ?? 0,
          calls: [],
          checks: [],
          trigger: e.ts - lastHookStop < 15000 ? 'hook' : 'review',
          status: 'running',
        };
        rounds.set(d.id, r);
        out.push(r);
        break;
      }
      case 'round.cut.open': {
        const r = rounds.get(d.id);
        if (r) r.calls.push({ cut: d.cut, lane: d.lane ?? 0, url: d.url, conditions: [], steps: [] });
        break;
      }
      case 'round.cut.eye': {
        const c = rounds.get(d.id)?.calls.find((x) => x.cut === d.cut && x.lane === (d.lane ?? 0));
        if (c) c.eye = d.src;
        break;
      }
      case 'round.cut.error': {
        const c = rounds.get(d.id)?.calls.find((x) => x.cut === d.cut);
        if (c) c.error = d.error;
        break;
      }
      case 'round.kane.call': {
        const c = rounds.get(d.id)?.calls.find((x) => x.cut === d.cut && x.lane === (d.lane ?? 0));
        if (c) Object.assign(c, { cmd: d.cmd, conditions: d.conditions });
        break;
      }
      case 'round.kane.step': {
        const c = rounds.get(d.id)?.calls.find((x) => x.cut === d.cut && x.lane === (d.lane ?? 0));
        c?.steps.push({ ts: e.ts, text: d.remark, status: d.status });
        break;
      }
      case 'round.kane.done': {
        const c = rounds.get(d.id)?.calls.find((x) => x.cut === d.cut && x.lane === (d.lane ?? 0));
        if (c) c.done = { credits: d.credits, ms: d.ms, ok: d.ok };
        break;
      }
      case 'round.check':
        rounds.get(d.id)?.checks.push({ ac: d.ac, cut: d.cut, verdict: d.verdict, reason: d.reason });
        break;
      case 'round.end': {
        const r = rounds.get(d.id);
        if (r) Object.assign(r, { summary: d, endedAt: e.ts, status: d.fail || d.unknown ? 'failed' : 'done' });
        break;
      }
      case 'hook.stop':
        lastHookStop = e.ts;
        out.push({ kind: 'hook', key: `h${e.seq}`, ts: e.ts, state: 'stop', text: d.interactive ? 'Your Claude Code session tried to stop' : 'Claude tried to stop — the Stop hook hands it to Kane' });
        break;
      case 'hook.block':
        out.push({ kind: 'hook', key: `h${e.seq}`, ts: e.ts, state: 'block', text: 'Stop blocked — Kane’s findings sent back to Claude', detail: d.reason });
        break;
      case 'hook.allow':
        out.push({ kind: 'hook', key: `h${e.seq}`, ts: e.ts, state: 'allow', text: d.note });
        break;
      case 'hook.error':
        out.push({ kind: 'hook', key: `h${e.seq}`, ts: e.ts, state: 'error', text: `Hook could not verify: ${d.error}` });
        break;
      case 'version':
        out.push({ kind: 'version', key: `v${e.seq}`, ts: e.ts, n: d.n, vkind: d.kind, added: d.added, removed: d.removed, lines: d.lines, compiles: d.compiles, summary: d.summary });
        break;
      case 'revise.request':
        out.push({ kind: 'request', key: `q${e.seq}`, ts: e.ts, text: d.request });
        break;
      case 'seal.test.start':
        if (!seal || seal.status !== 'running') {
          seal = { kind: 'seal', key: `s${e.seq}`, startedAt: e.ts, tests: [], status: 'running' };
          out.push(seal);
        }
        seal.tests.push({ id: d.id, file: d.file, status: 'running', steps: [] });
        break;
      case 'seal.test.step':
        seal?.tests.find((t) => t.id === d.id)?.steps.push({ ts: e.ts, text: d.remark, status: d.status });
        break;
      case 'seal.test.end': {
        const t = seal?.tests.find((x) => x.id === d.id);
        if (t) Object.assign(t, { status: d.status, credits: d.credits, share: d.share, reason: d.reason });
        break;
      }
      case 'seal.done':
        if (seal) Object.assign(seal, { endedAt: e.ts, status: seal.tests.every((t) => t.status === 'passed') ? 'done' : 'failed' });
        seal = null;
        break;
    }
  }
  return out;
}

export function dur(ms?: number) {
  if (ms === undefined) return '';
  if (ms < 1000) return `${ms}ms`;
  const s = ms / 1000;
  return s < 60 ? `${s.toFixed(s < 10 ? 1 : 0)}s` : `${Math.floor(s / 60)}m ${Math.round(s % 60)}s`;
}
