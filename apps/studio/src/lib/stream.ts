import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import type { CutId, DailiesEvent, Project, Verdict } from '@dailies/shared';
import { api, STATIC } from './api';

export type Who = 'claude' | 'kane' | 'dailies';

export interface FeedItem {
  seq: number;
  ts: number;
  who: Who;
  kind: string;
  text: string;
  detail?: string;
  tone?: 'pass' | 'fail' | 'warn' | 'info' | 'cmd' | 'muted';
  meta?: Record<string, any>;
}

export interface RoundLive {
  id: string;
  version: number;
  kind: string;
  cuts: CutId[];
  checks: string[];
  results: Record<string, { verdict: Verdict; reason: string; frames: string[] }>;
  steps: Partial<Record<CutId, string>>;
  eye: Partial<Record<CutId, string>>;
  callsDone: number;
  credits: number;
  done: boolean;
  startedAt: number;
}

export interface LiveState {
  events: DailiesEvent[];
  feed: FeedItem[];
  liveBust: number;
  liveError: string | null;
  round: RoundLive | null;
  busy: string | null;
  claudeWorking: boolean;
  kaneWorking: boolean;
  hook: { state: 'idle' | 'judging' | 'blocked' | 'allowed'; text?: string; at?: number };
  editing: { file?: string; at: number } | null;
  /** Claude's code as it is being typed (partial tool input from Claude Code's stream). */
  typing: { file: string; chars: number; tail: string; at: number } | null;
  /** version numbers and round ids already announced (for replay filtering) */
  seenVersions: Set<number>;
  seenRounds: Set<string>;
  planned: boolean;
  lastSeq: number;
}

const initial = (): LiveState => ({
  events: [],
  feed: [],
  liveBust: 0,
  liveError: null,
  round: null,
  busy: null,
  claudeWorking: false,
  kaneWorking: false,
  hook: { state: 'idle' },
  editing: null,
  typing: null,
  seenVersions: new Set(),
  seenRounds: new Set(),
  planned: false,
  lastSeq: 0,
});

const CUT_LABEL: Record<string, string> = { '16x9': '16:9', '9x16': '9:16', '1x1': '1:1', '4x5': '4:5' };

function feedFor(e: DailiesEvent): FeedItem | null {
  const d = e.data as Record<string, any>;
  const base = { seq: e.seq, ts: e.ts };
  switch (e.type) {
    case 'claude.start':
      return { ...base, who: 'claude', kind: 'start', tone: 'info', text: d.stage === 'draft' ? 'Drafting from the storyboard' : 'Resuming the draft session with Kane’s findings', detail: d.prompt };
    case 'claude.init':
      return { ...base, who: 'claude', kind: 'init', tone: 'muted', text: `session ${String(d.sessionId).slice(0, 8)} · ${d.model}` };
    case 'claude.text':
      return { ...base, who: 'claude', kind: 'text', text: d.text };
    case 'claude.tool':
      if (d.tool === 'Read' || d.tool === 'Glob' || d.tool === 'Grep') return { ...base, who: 'claude', kind: 'read', tone: 'muted', text: d.summary };
      return {
        ...base,
        who: 'claude',
        kind: 'edit',
        tone: 'info',
        text: d.summary,
        meta: { added: d.added, removed: d.removed, file: d.file },
      };
    case 'claude.hook_feedback':
      return { ...base, who: 'claude', kind: 'hook', tone: 'warn', text: 'Stop hook kept me working', detail: String(d.text).replace(/^Stop hook feedback:\s*/i, '') };
    case 'claude.result':
      return { ...base, who: 'claude', kind: 'result', tone: d.ok ? 'pass' : 'fail', text: `Turn ended · ${d.turns} turns · $${Number(d.costUsd).toFixed(2)}` };
    case 'plan.start':
      return { ...base, who: 'kane', kind: 'plan', tone: 'info', text: 'Designing tests from the storyboard' };
    case 'plan.cached':
      return { ...base, who: 'kane', kind: 'plan', tone: 'muted', text: `Test plan unchanged · ${d.criteria} criteria · ${d.tests} tests` };
    case 'plan.step':
      return { ...base, who: 'kane', kind: 'cmd', tone: 'cmd', text: `$ ${d.cmd}` };
    case 'plan.step.done':
      return { ...base, who: 'kane', kind: 'done', tone: d.code === 0 ? 'muted' : 'warn', text: `${d.label} · ${(d.ms / 1000).toFixed(0)}s · ${Number(d.credits).toFixed(1)} cr${d.code ? ` · exit ${d.code}` : ''}` };
    case 'plan.changeset':
      return { ...base, who: 'kane', kind: 'plan', tone: 'warn', text: 'Storyboard changed — reconciled the suite' };
    case 'kane.activity':
      if (d.kind === 'thinking_done') return null;
      return { ...base, who: 'kane', kind: 'activity', tone: 'muted', text: d.label };
    case 'kane.commit':
      return d.source
        ? { ...base, who: 'kane', kind: 'commit', tone: 'info', text: `Extracted ${d.minted.join(', ') || 'nothing new'} from ${d.source}.md` }
        : { ...base, who: 'kane', kind: 'commit', tone: 'info', text: `Committed ${d.minted.join(', ') || 'nothing new'}` };
    case 'kane.receipt':
      return {
        ...base,
        who: 'kane',
        kind: 'commit',
        tone: 'info',
        text: `Committed ${d.phase}: ${d.committed.length} item${d.committed.length === 1 ? '' : 's'}`,
        detail: d.committed.join(' '),
      };
    case 'kane.paused':
      return { ...base, who: 'kane', kind: 'warn', tone: 'warn', text: 'Kane paused on a question; answering with its recommended default' };
    case 'plan.done':
      return { ...base, who: 'kane', kind: 'plan', tone: 'pass', text: `Test plan ready · ${d.criteria} acceptance criteria · ${d.scenarios} scenarios · ${d.tests} tests` };
    case 'plan.error':
      return { ...base, who: 'kane', kind: 'error', tone: 'fail', text: `Planning failed: ${d.error}` };
    case 'round.start':
      return {
        ...base,
        who: 'kane',
        kind: 'round',
        tone: 'info',
        text: `${d.kind === 'sweep' ? 'Full sweep' : d.kind === 'targeted' ? 'Targeted re-check' : 'Regression sweep'} of v${d.version} · ${d.checks.length} checks across ${d.cuts.map((c: string) => CUT_LABEL[c]).join(' ')}`,
      };
    case 'round.kane.call':
      return { ...base, who: 'kane', kind: 'cmd', tone: 'cmd', text: `$ kane-cli run --analyzer-only --cdp-endpoint … ${d.conditions.length}× --condition`, meta: { cut: d.cut } };
    case 'round.kane.step':
      return { ...base, who: 'kane', kind: 'step', tone: d.status === 'failed' ? 'warn' : 'muted', text: d.remark, meta: { cut: d.cut } };
    case 'round.check':
      return {
        ...base,
        who: 'kane',
        kind: 'check',
        tone: d.verdict === 'pass' ? 'pass' : d.verdict === 'fail' ? 'fail' : 'warn',
        text: `${d.ac} · ${CUT_LABEL[d.cut]}`,
        detail: d.reason,
        meta: { ac: d.ac, cut: d.cut, verdict: d.verdict },
      };
    case 'round.cut.error':
      return { ...base, who: 'kane', kind: 'error', tone: 'fail', text: `${CUT_LABEL[d.cut]} sheet failed: ${d.error}` };
    case 'round.end':
      return {
        ...base,
        who: 'kane',
        kind: 'round-end',
        tone: d.fail || d.unknown ? 'fail' : 'pass',
        text: `v${d.version}: ${d.pass} pass · ${d.fail} fail${d.unknown ? ` · ${d.unknown} unjudged` : ''} · ${(d.ms / 1000).toFixed(0)}s · ${Number(d.credits).toFixed(1)} cr`,
      };
    case 'hook.stop':
      return { ...base, who: 'dailies', kind: 'hook', tone: 'info', text: 'Claude tried to stop → Stop hook → Kane re-verifies' };
    case 'hook.block':
      return { ...base, who: 'dailies', kind: 'hook', tone: 'fail', text: 'Stop blocked — findings sent back to Claude', detail: d.reason };
    case 'hook.allow':
      return { ...base, who: 'dailies', kind: 'hook', tone: 'pass', text: d.note };
    case 'hook.error':
      return { ...base, who: 'dailies', kind: 'hook', tone: 'warn', text: `Hook could not verify: ${d.error}` };
    case 'version':
      return {
        ...base,
        who: 'dailies',
        kind: 'version',
        tone: d.compiles ? 'info' : 'fail',
        text: `v${d.n} pinned${d.added !== undefined ? ` · +${d.added} −${d.removed}` : ` · ${d.lines} lines`}${d.compiles ? '' : ' · does not compile'}`,
      };
    case 'review.clean':
      return { ...base, who: 'kane', kind: 'round-end', tone: 'pass', text: 'Kane found nothing to correct' };
    case 'seal.test.start':
      return { ...base, who: 'kane', kind: 'cmd', tone: 'cmd', text: `$ kane-cli testmd run .testmuai/tests/${d.file} --agent --headless` };
    case 'seal.test.step':
      return { ...base, who: 'kane', kind: 'step', tone: d.status === 'failed' ? 'warn' : 'muted', text: d.remark };
    case 'seal.test.end':
      return { ...base, who: 'kane', kind: 'check', tone: d.status === 'passed' ? 'pass' : 'fail', text: `${d.id} ${d.status} · ${Number(d.credits).toFixed(1)} cr` };
    case 'seal.done':
      return { ...base, who: 'kane', kind: 'round-end', tone: 'pass', text: 'Sealed: evidence packs written, coverage measured' };
    case 'busy':
      return d.error ? { ...base, who: 'dailies', kind: 'error', tone: 'fail', text: d.error } : null;
    default:
      return null;
  }
}

function reduce(s: LiveState, e: DailiesEvent): LiveState {
  if (e.seq <= s.lastSeq) return s;
  const d = e.data as Record<string, any>;
  const n: LiveState = { ...s, events: [...s.events, e], lastSeq: e.seq };
  const item = feedFor(e);
  if (item) n.feed = [...s.feed, item].slice(-600);

  switch (e.type) {
    case 'busy':
      n.busy = d.busy ?? null;
      if (!d.busy) {
        n.claudeWorking = false;
        n.kaneWorking = false;
      }
      break;
    case 'claude.start':
      n.claudeWorking = true;
      break;
    case 'claude.tool':
      if (d.tool === 'Write' || d.tool === 'Edit') n.editing = { file: d.file, at: e.ts };
      break;
    case 'claude.typing':
      n.typing = { file: d.file, chars: d.chars, tail: d.tail, at: e.ts };
      n.editing = { file: d.file, at: e.ts };
      break;
    case 'claude.tool_result':
      n.typing = null;
      break;
    case 'claude.result':
    case 'claude.end':
      n.claudeWorking = false;
      n.editing = null;
      n.typing = null;
      break;
    case 'live.changed':
      n.liveBust = e.seq;
      n.liveError = d.ok ? null : d.error;
      break;
    case 'plan.start':
      n.kaneWorking = true;
      break;
    case 'plan.done':
    case 'plan.cached':
      n.planned = true;
      n.kaneWorking = Boolean(s.round && !s.round.done);
      break;
    case 'round.start':
      n.kaneWorking = true;
      n.round = {
        id: d.id,
        version: d.version,
        kind: d.kind,
        cuts: d.cuts,
        checks: d.checks,
        results: {},
        steps: {},
        eye: {},
        callsDone: 0,
        credits: 0,
        done: false,
        startedAt: e.ts,
      };
      if (s.hook.state === 'idle' || s.hook.state === 'allowed') n.hook = s.hook;
      break;
    case 'round.cut.eye':
      if (n.round && n.round.id === d.id) n.round = { ...n.round, eye: { ...n.round.eye, [d.cut]: d.src } };
      break;
    case 'round.kane.step':
      if (n.round && n.round.id === d.id) n.round = { ...n.round, steps: { ...n.round.steps, [d.cut]: d.remark } };
      break;
    case 'round.check':
      if (n.round && n.round.id === d.id)
        n.round = { ...n.round, results: { ...n.round.results, [`${d.ac}@${d.cut}`]: { verdict: d.verdict, reason: d.reason, frames: d.frames } } };
      break;
    case 'round.kane.done':
      if (n.round && n.round.id === d.id) n.round = { ...n.round, callsDone: n.round.callsDone + 1, credits: n.round.credits + Number(d.credits) };
      break;
    case 'round.end':
      if (n.round && n.round.id === d.id) n.round = { ...n.round, done: true };
      n.seenRounds = new Set([...s.seenRounds, d.id]);
      n.kaneWorking = false;
      break;
    case 'version':
      n.seenVersions = new Set([...s.seenVersions, d.n]);
      break;
    case 'hook.stop':
      n.hook = { state: 'judging', at: e.ts };
      break;
    case 'hook.block':
      n.hook = { state: 'blocked', text: d.reason, at: e.ts };
      break;
    case 'hook.allow':
      n.hook = { state: 'allowed', text: d.note, at: e.ts };
      break;
    case 'seal.test.start':
      n.kaneWorking = true;
      break;
    case 'seal.done':
      n.kaneWorking = false;
      break;
  }
  return n;
}

type Action = { type: 'event'; e: DailiesEvent } | { type: 'reset' };

function reducer(s: LiveState, a: Action): LiveState {
  if (a.type === 'reset') return initial();
  return reduce(s, a.e);
}

export interface ReplayControls {
  playing: boolean;
  speed: number;
  progress: number;
  total: number;
  play: () => void;
  pause: () => void;
  restart: () => void;
  setSpeed: (n: number) => void;
  skipToEnd: () => void;
}

/**
 * Live: subscribe to the server's SSE stream (history first, then live).
 * Replay: load a recorded run's event log and play it back with its real
 * rhythm (long silences compressed), so a judge sees the loop happen.
 */
export function useProjectStream(id: string | undefined, mode: 'live' | 'replay') {
  const [state, dispatch] = useReducer(reducer, undefined, initial);
  const [project, setProject] = useState<Project | null>(null);
  const [replayEvents, setReplayEvents] = useState<DailiesEvent[] | null>(null);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(3);
  const [cursor, setCursor] = useState(0);
  const refetchTimer = useRef<number | null>(null);

  const refetch = useCallback(() => {
    if (!id) return;
    if (refetchTimer.current) window.clearTimeout(refetchTimer.current);
    refetchTimer.current = window.setTimeout(() => {
      api.project(id).then(setProject).catch(() => undefined);
    }, 250);
  }, [id]);

  useEffect(() => {
    dispatch({ type: 'reset' });
    setProject(null);
    setReplayEvents(null);
    setCursor(0);
    if (!id) return;
    api.project(id).then(setProject).catch(() => undefined);
    if (mode === 'replay' || STATIC) {
      api.events(id).then((ev) => {
        setReplayEvents(ev);
        setPlaying(true);
      });
      return;
    }
    const es = new EventSource(`/api/projects/${id}/events`);
    es.onmessage = (m) => {
      const e = JSON.parse(m.data) as DailiesEvent;
      dispatch({ type: 'event', e });
      if (/^(version|round\.end|plan\.done|phase|busy|seal\.|hook\.allow|claude\.end)/.test(e.type)) refetch();
    };
    return () => es.close();
  }, [id, mode, refetch]);

  // Replay clock
  useEffect(() => {
    if (!replayEvents || !playing || cursor >= replayEvents.length) {
      if (replayEvents && cursor >= replayEvents.length) setPlaying(false);
      return;
    }
    const e = replayEvents[cursor];
    const prev = replayEvents[cursor - 1];
    const gap = prev ? Math.min(2200, Math.max(0, e.ts - prev.ts)) / speed : 0;
    const t = window.setTimeout(() => {
      dispatch({ type: 'event', e });
      setCursor((c) => c + 1);
    }, gap);
    return () => window.clearTimeout(t);
  }, [replayEvents, playing, cursor, speed]);

  const replay: ReplayControls | null = useMemo(
    () =>
      replayEvents
        ? {
            playing,
            speed,
            progress: cursor,
            total: replayEvents.length,
            play: () => setPlaying(true),
            pause: () => setPlaying(false),
            restart: () => {
              dispatch({ type: 'reset' });
              setCursor(0);
              setPlaying(true);
            },
            setSpeed,
            skipToEnd: () => {
              for (let i = cursor; i < replayEvents.length; i++) dispatch({ type: 'event', e: replayEvents[i] });
              setCursor(replayEvents.length);
              setPlaying(false);
            },
          }
        : null,
    [replayEvents, playing, speed, cursor],
  );

  // In replay, only show versions/rounds the playback has reached.
  const visibleProject = useMemo(() => {
    if (!project || !replay) return project;
    const done = replay.progress >= replay.total;
    if (done) return project;
    return {
      ...project,
      versions: project.versions.filter((v) => state.seenVersions.has(v.n)),
      rounds: project.rounds.filter((r) => state.seenRounds.has(r.id)),
      plan: state.planned ? project.plan : undefined,
      seal: state.events.some((e) => e.type === 'seal.done') ? project.seal : undefined,
    };
  }, [project, replay, state.seenVersions, state.seenRounds, state.planned, state.events]);

  return { state, project: visibleProject, refetch, replay };
}
