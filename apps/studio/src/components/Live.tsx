import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Thumbnail } from '@remotion/player';
import { checkKey, CUTS, framesForCriterion, type Criterion, type CutId, type Project, type SampleFrame, type Storyboard } from '@dailies/shared';
import type { Entry } from '../lib/activity';
import type { LoadedComposition } from '../lib/composition';
import type { Playhead } from '../lib/playhead';
import { useFrame } from '../lib/playhead';
import type { LiveState } from '../lib/stream';
import { CUT_RATIO, summarize, type Cell } from '../lib/verdicts';
import { EntryView } from './Activity';
import { Coll, Face, Icon, VMark, useDismiss, useElapsed } from './ui';

/* --------------------------------------------------------- status pill */

export interface AgentStatus {
  who: 'claude' | 'kane' | 'fail' | 'pass';
  label: string;
  running: boolean;
  since: number | null;
  tone: '' | 'block' | 'allow';
  /** a second agent working at the same time (Kane designing while Claude drafts) */
  also?: { who: 'claude' | 'kane'; label: string };
}

/** One sentence about what the agents are doing right now. */
export function useAgentStatus(state: LiveState, entries: Entry[], now = Date.now()): AgentStatus | null {
  const lastHook = [...entries].reverse().find((e) => e.kind === 'hook');
  const running = [...entries].reverse().find((e) => 'status' in e && e.status === 'running') as Entry | undefined;
  const recentHook = lastHook && lastHook.kind === 'hook' && now - lastHook.ts < 8000;
  if (recentHook && lastHook.kind === 'hook' && lastHook.state === 'block')
    return { who: 'fail', label: 'Kane blocked the stop · findings sent to Claude', running: false, since: null, tone: 'block' };
  if (running?.kind === 'round') {
    const r = state.round;
    const n = r ? Object.keys(r.results).length : 0;
    return { who: 'kane', label: `Kane is judging v${running.version} · ${n}/${running.total} checks`, running: true, since: running.startedAt, tone: '' };
  }
  const designing = entries.some((e) => e.kind === 'design' && e.status === 'running');
  if (running?.kind === 'claude' || (running?.kind === 'design' && state.claudeWorking)) {
    const cl = [...entries].reverse().find((e) => e.kind === 'claude' && e.status === 'running');
    if (cl && cl.kind === 'claude')
      return {
        who: 'claude',
        label: state.typing ? `Claude is writing ${state.typing.file}` : cl.stage === 'draft' ? 'Claude is drafting' : cl.stage === 'revise' ? 'Claude is making your change' : 'Claude is fixing Kane’s findings',
        running: true,
        since: cl.startedAt,
        tone: '',
        also: designing ? { who: 'kane', label: 'Kane is designing the tests' } : undefined,
      };
  }
  if (running?.kind === 'claude')
    return {
      who: 'claude',
      label: state.typing ? `Claude is writing ${state.typing.file}` : running.stage === 'draft' ? 'Claude is drafting' : running.stage === 'revise' ? 'Claude is making your change' : 'Claude is fixing Kane’s findings',
      running: true,
      since: running.startedAt,
      tone: '',
    };
  if (running?.kind === 'design') return { who: 'kane', label: 'Kane is designing the tests', running: true, since: running.startedAt, tone: '' };
  if (running?.kind === 'seal') return { who: 'kane', label: 'Kane is running its designed tests', running: true, since: running.startedAt, tone: '' };
  if (lastHook && lastHook.kind === 'hook' && lastHook.state === 'allow' && now - lastHook.ts < 60000)
    return { who: 'pass', label: lastHook.text, running: false, since: null, tone: 'allow' };
  if (lastHook && lastHook.kind === 'hook' && lastHook.state === 'stop' && now - lastHook.ts < 20000)
    return { who: 'kane', label: 'Claude tried to stop · Kane re-judges', running: true, since: lastHook.ts, tone: '' };
  return null;
}

export function StatusPill({ status, entries, projectId, replay }: { status: AgentStatus; entries: Entry[]; projectId: string; replay?: boolean }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const ref = useDismiss(open, close);
  const elapsed = useElapsed(status.running && !replay ? status.since : null);
  const runningNow = entries.filter((e) => 'status' in e && e.status === 'running');
  const shown = runningNow.length ? runningNow : [...entries].reverse().filter((e) => e.kind !== 'version' && e.kind !== 'hook').slice(0, 1);
  const current = shown[0];
  return (
    <div className="statuspill-wrap" ref={ref}>
      <button type="button" key={status.tone + status.who} className={`statuspill ${status.tone} ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-expanded={open}>
        <Face who={status.who} />
        <span className={`lbl ${status.who === 'claude' || status.who === 'kane' ? status.who : ''}`}>{status.running ? <span className="shimmer">{status.label}</span> : status.label}</span>
        {status.also ? (
          <>
            <span className="pill-sep" />
            <Face who={status.also.who} />
            <span className={`lbl ${status.also.who}`}>
              <span className="shimmer">{status.also.label}</span>
            </span>
          </>
        ) : null}
        {elapsed ? <span className="t">{elapsed}</span> : null}
        <span className="chev">
          <Icon name="down" size={14} />
        </span>
      </button>
      {open && current ? (
        <div className="pop ledger">
          {shown.map((e) => (
            <EntryView key={e.key} e={e} projectId={projectId} defaultOpen onZoom={() => undefined} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------- code card */

export function CodeCard({ typing }: { typing: { file: string; chars: number; tail: string } }) {
  const lines = typing.tail.split('\n').slice(-12);
  return (
    <div className="codecard" aria-live="off">
      <header>
        <Face who="claude" size={18} />
        writing <b>{typing.file}</b>
        <span>{typing.chars.toLocaleString()} chars</span>
      </header>
      <pre>
        {lines.map((l, i) => (
          <div key={i}>{l || ' '}</div>
        ))}
        <span className="caret" />
      </pre>
    </div>
  );
}

/* ------------------------------------------------------------ film strip */

/**
 * The frames Kane is judging, rendered from the version under review. While a
 * round runs they shimmer; verdicts pop onto the frames they concern.
 */
export function FilmStrip({
  comp,
  cut,
  frames,
  criteria,
  sb,
  cells,
  live,
  playhead,
  onClose,
  version,
  flagged = [],
}: {
  comp: LoadedComposition;
  cut: CutId;
  frames: SampleFrame[];
  criteria: Criterion[];
  sb: Storyboard;
  cells: Map<string, Cell>;
  live: LiveState['round'];
  playhead: Playhead;
  onClose: () => void;
  version: number | 'live' | null;
  /** frame labels the sheet's measurements named for a failing check */
  flagged?: string[];
}) {
  const spec = CUTS[cut];
  const [avail, setAvail] = useState(900);
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const host = ref.current?.parentElement;
    if (!host) return;
    const ro = new ResizeObserver(() => setAvail(host.clientWidth - 64));
    ro.observe(host);
    return () => ro.disconnect();
  }, []);
  const maxH = cut === '9x16' ? 104 : 64;
  const fitW = (avail - 16 - (frames.length - 1) * 6) / Math.max(1, frames.length);
  const w = Math.max(28, Math.floor(Math.min((maxH * spec.width) / spec.height, fitW)));
  const h = Math.round((w * spec.height) / spec.width);
  const f = useFrame(playhead);
  const judging = Boolean(live && !live.done && live.cuts.includes(cut));
  const perFrame = useMemo(() => {
    const m = new Map<string, { state: string; ac: string }[]>();
    for (const c of criteria.filter((x) => x.cuts.includes(cut))) {
      const k = checkKey(c.id, cut);
      const liveRes = live && !live.done ? live.results[k] : undefined;
      const state = liveRes?.verdict ?? (live && !live.done && live.checks.includes(k) ? 'running' : cells.get(k)?.state ?? 'owed');
      const reasonFrames = (liveRes?.frames ?? cells.get(k)?.frames ?? []) as string[];
      const fr = reasonFrames.length ? frames.filter((x) => reasonFrames.includes(x.label)) : framesForCriterion(c, frames, sb);
      for (const x of fr) m.set(x.label, [...(m.get(x.label) ?? []), { state, ac: c.id }]);
    }
    return m;
  }, [criteria, cut, live, cells, frames, sb]);

  return (
    <div className="filmstrip" role="group" aria-label="Frames Kane judges" ref={ref}>
      <span className="fs-head">
        {judging ? <span className="spinner" /> : <Icon name="frame" size={12} />}
        {judging ? `Kane is judging ${CUT_RATIO[cut]}` : `Kane’s frames · ${CUT_RATIO[cut]}${version !== null ? ` · v${version}` : ''}`}
      </span>
      <button type="button" className="fs-close" onClick={onClose} aria-label="Hide film strip">
        <Icon name="close" size={11} />
      </button>
      {frames.map((fr) => {
        const pins = perFrame.get(fr.label) ?? [];
        const isFlagged = !judging && flagged.includes(fr.label);
        const worst = isFlagged || pins.some((p) => p.state === 'fail') ? 'fail' : pins.length && pins.every((p) => p.state === 'pass') ? 'pass' : '';
        const nearest = frames.reduce((a, b) => (Math.abs(b.frame - f) < Math.abs(a.frame - f) ? b : a), frames[0]);
        return (
          <button
            type="button"
            key={fr.label}
            className={`fs-frame ${judging ? 'scan' : ''} ${worst} ${nearest?.label === fr.label ? 'at' : ''}`}
            style={{ width: w, height: h, animationDelay: `${(fr.frame % 7) * 0.08}s` }}
            onClick={() => playhead.seek(fr.frame)}
            title={`${fr.label} · ${fr.timecode} · ${pins.length} checks`}
          >
            <Thumbnail
              component={comp.Component}
              compositionWidth={spec.width}
              compositionHeight={spec.height}
              frameToDisplay={Math.min(fr.frame, comp.meta.durationInFrames - 1)}
              durationInFrames={comp.meta.durationInFrames}
              fps={comp.meta.fps}
              style={{ width: w, height: h }}
            />
            <span className="fs-tc">{fr.timecode}</span>
            {isFlagged || pins.some((p) => p.state === 'fail' || p.state === 'pass') ? (
              <span className="fs-pins">
                {worst === 'fail' ? <VMark state="fail" /> : <VMark state="pass" />}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/* ---------------------------------------------------------- score ring */

export function ScoreRing({ pass, total, fail, running }: { pass: number; total: number; fail: number; running?: boolean }) {
  const r = 36;
  const c = 2 * Math.PI * r;
  const pct = total ? pass / total : 0;
  return (
    <div className="ring" aria-label={`${pass} of ${total} checks pass`}>
      <svg width="86" height="86" viewBox="0 0 86 86">
        <circle className="bg" cx="43" cy="43" r={r} />
        <circle className={`fg ${fail ? 'hasfail' : ''} ${running ? 'running' : ''}`} cx="43" cy="43" r={r} strokeDasharray={c} strokeDashoffset={c * (1 - pct)} />
      </svg>
      <div className="ring-n">
        <div>
          <b>{total ? pass : '—'}</b>
          <small>of {total || '—'}</small>
        </div>
      </div>
    </div>
  );
}

export function CutBars({ cuts, cells, active, onCut }: { cuts: CutId[]; cells: Map<string, Cell>; active: CutId; onCut: (c: CutId) => void }) {
  return (
    <div className="cutbars">
      {cuts.map((cut) => {
        const s = summarize([...cells.entries()].filter(([k]) => k.endsWith(`@${cut}`)).map(([, v]) => v));
        const t = Math.max(1, s.total);
        return (
          <button key={cut} type="button" className={`cutbar ${cut === active ? 'on' : ''}`} onClick={() => onCut(cut)}>
            <span>
              <i className={`cut-glyph cut-${cut}`} /> {CUT_RATIO[cut]}
            </span>
            <span className="bar">
              <i className="p" style={{ width: `${(s.pass / t) * 100}%` }} />
              <i className="f" style={{ width: `${(s.fail / t) * 100}%` }} />
              <i className="u" style={{ width: `${(s.unknown / t) * 100}%` }} />
            </span>
            <span className="n">
              {s.pass}/{s.total}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/* -------------------------------------------------------- composer + gate */

const SUGGESTIONS = [
  'Make the caption a big, bold lower-third subtitle near the bottom of the frame.',
  'Make shot 1 punchier: the shoe slams in from the left with more overshoot.',
  'Put the price tag in a glowing pill in the bottom-right corner.',
];

export function Composer({ onSend, disabled }: { onSend: (t: string) => Promise<void>; disabled?: boolean }) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  return (
    <form
      className="composer"
      onSubmit={async (e) => {
        e.preventDefault();
        if (text.trim().length < 4) return;
        setSending(true);
        await onSend(text.trim());
        setSending(false);
        setText('');
      }}
    >
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="Ask Claude for a change — Kane re-judges the spot before Claude may stop" aria-label="Change request" disabled={disabled} />
      <div className="composer-row">
        <div className="sugs">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => setText(s)} title={s}>
              {s.split(/[:,.]/)[0].slice(0, 30)}…
            </button>
          ))}
        </div>
        <button type="submit" className="btn sm ink" disabled={disabled || sending || text.trim().length < 4}>
          {sending ? <span className="spinner" /> : <Icon name="spark" size={13} />} Send
        </button>
      </div>
    </form>
  );
}

export function GateRow({ project, onToggle }: { project: Project; onToggle: (on: boolean) => void }) {
  const [copied, setCopied] = useState(false);
  const cmd = `cd workspaces/${project.id} && claude`;
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1400);
    return () => clearTimeout(t);
  }, [copied]);
  return (
    <Coll
      icon={<Icon name="plug" size={15} />}
      title="Connect your own Claude Code"
      sub={project.gate ? 'Gate on — your session is Kane-gated' : 'Kane-gate an interactive claude session'}
      defaultOpen={Boolean(project.gate)}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button type="button" role="switch" aria-checked={Boolean(project.gate)} className={`switch ${project.gate ? 'on' : ''}`} onClick={() => onToggle(!project.gate)}>
          <i />
        </button>
        <span style={{ fontSize: 12 }}>Every time your session tries to stop, Kane judges the cut first.</span>
      </div>
      {project.gate ? (
        <button
          type="button"
          className="btn sm"
          onClick={() => {
            void navigator.clipboard?.writeText(cmd);
            setCopied(true);
          }}
          style={{ justifyContent: 'space-between' }}
        >
          <code style={{ fontSize: 11 }}>$ {cmd}</code>
          <span className="muted">{copied ? 'copied' : 'copy'}</span>
        </button>
      ) : null}
    </Coll>
  );
}

/* ------------------------------------------------ composing (both agents) */

/**
 * While there is nothing to play yet: Claude's code on one side, Kane's test
 * plan forming on the other — the two agents reading the same storyboard.
 */
export function ComposingStage({ state, entries, criteria }: { state: LiveState; entries: Entry[]; criteria: Criterion[] }) {
  const design = [...entries].reverse().find((e) => e.kind === 'design');
  const claude = [...entries].reverse().find((e) => e.kind === 'claude');
  const lines = state.typing ? state.typing.tail.split('\n').slice(-16) : [];
  const step = design && design.kind === 'design' ? design.steps.at(-1) : undefined;
  const committed = design && design.kind === 'design' ? design.steps.flatMap((s) => s.committed) : [];
  return (
    <div className="composing">
      <section className="cmp-card claude">
        <header>
          <Face who="claude" />
          <b>Claude Code</b>
          <span>{state.typing ? <span className="shimmer">writing {state.typing.file}</span> : <span className="shimmer">reading the storyboard</span>}</span>
          <em>{state.typing ? `${state.typing.chars.toLocaleString()} chars` : ''}</em>
        </header>
        <pre>
          {lines.length ? (
            lines.map((l, i) => <div key={i}>{l || ' '}</div>)
          ) : (
            <div className="muted">
              {claude && claude.kind === 'claude'
                ? claude.items
                    .filter((i) => i.type === 'read' || i.type === 'text')
                    .slice(-6)
                    .map((i, n) => <div key={n}>› {i.text.slice(0, 80)}</div>)
                : '› starting a session…'}
            </div>
          )}
          {state.typing ? <span className="caret" /> : null}
        </pre>
      </section>
      <section className="cmp-card kane">
        <header>
          <Face who="kane" />
          <b>Kane CLI</b>
          <span>
            {design?.kind === 'design' && design.status === 'running' ? <span className="shimmer">{step?.label ?? 'designing the tests'}</span> : criteria.length ? `${criteria.length} criteria designed` : 'waiting'}
          </span>
        </header>
        <div className="plan-list">
          {criteria.length ? (
            criteria.map((c, i) => (
              <div key={c.id} className="plan-item" style={{ animationDelay: `${Math.min(i, 20) * 0.05}s` }}>
                <VMark state="owed" size={14} />
                <span>{c.text}</span>
                <em>{c.cuts.map((x) => CUT_RATIO[x]).join(' ')}</em>
              </div>
            ))
          ) : (
            <>
              {step ? <pre className="codeblock">$ {step.cmd}</pre> : null}
              {(step?.activity ?? []).slice(-5).map((a, i) => (
                <div key={i} className="plan-item act">
                  <span className="dot" /> <span>{a}</span>
                </div>
              ))}
              {committed.length ? (
                <div className="card-meta">
                  {committed.slice(-24).map((c, i) => (
                    <span key={i} className="tag kane" style={{ animation: 'pop .3s var(--spring) both' }}>
                      {c}
                    </span>
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
