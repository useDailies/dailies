import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { checkKey, CUTS, parseStoryboard, sampleFrames, formatTimecode, type Criterion, type CutId } from '@dailies/shared';
import { api, STATIC } from '../lib/api';
import { useComposition } from '../lib/composition';
import { Playhead, useFrame, usePlaying } from '../lib/playhead';
import { useProjectStream } from '../lib/stream';
import { CUT_RATIO, summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { AgentChips, Icon, TopBar } from '../components/Chrome';
import { StagePlayer } from '../components/Stage';
import { Timeline } from '../components/Timeline';
import { AgentFeeds, CodeDiff, CriteriaList, Findings, GateCard, KaneEye, ProofPanel, RoundBoard, StoryboardPanel, corrections, sheetEvidence, type Correction } from '../components/Panels';

type Tab = 'live' | 'findings' | 'criteria' | 'proof' | 'eye' | 'code';

export default function Studio() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const mode = params.get('replay') === '1' || STATIC ? 'replay' : 'live';
  const { state, project, refetch, replay } = useProjectStream(id, mode);
  const playhead = useMemo(() => new Playhead(), []);
  const [cut, setCut] = useState<CutId>('16x9');
  const [pick, setPick] = useState<number | 'live' | null>(null);
  const [tab, setTab] = useState<Tab>('live');
  const [zones, setZones] = useState(false);
  const [xray, setXray] = useState(false);
  const [focus, setFocus] = useState<{ ac: string; cut: CutId } | null>(null);
  const [focusLine, setFocusLine] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const sb = useMemo(() => parseStoryboard(project?.storyboard ?? '# …\n'), [project?.storyboard]);
  const frames = useMemo(() => sampleFrames(sb), [sb]);
  useEffect(() => {
    if (project && !project.cuts.includes(cut)) setCut(project.cuts[0]);
  }, [project, cut]);

  const latest = project?.versions.at(-1)?.n ?? null;
  // Follow Claude live while it edits; otherwise show the newest pinned version.
  const following = pick === null;
  const shown: number | 'live' | null = following ? (state.claudeWorking && !STATIC ? 'live' : latest ?? (STATIC ? null : 'live')) : pick;
  const bust = shown === 'live' ? state.liveBust : 0;
  const { comp, error: compError } = useComposition(id, shown, bust);

  const cells = useMemo(() => verdictMap(project, shown === 'live' ? latest : shown), [project, shown, latest]);
  const running = useMemo(() => {
    const r = state.round;
    if (!r || r.done) return new Set<string>();
    return new Set(r.checks.filter((k) => !r.results[k]));
  }, [state.round]);
  const score = useMemo(() => summarize(cells.values()), [cells]);
  const fixes = useMemo(() => corrections(project), [project]);

  // Toast when a version is pinned.
  const lastVersionSeen = useRef<number | null>(null);
  useEffect(() => {
    if (latest && lastVersionSeen.current !== null && latest > lastVersionSeen.current) {
      setToast(`v${latest} pinned — Kane is next`);
      const t = setTimeout(() => setToast(null), 3200);
      return () => clearTimeout(t);
    }
    lastVersionSeen.current = latest;
  }, [latest]);

  // When a round ends with failures, put the failing cut on screen.
  const lastRoundSeen = useRef<string | null>(null);
  useEffect(() => {
    const r = state.round;
    if (!r?.done || lastRoundSeen.current === r.id) return;
    lastRoundSeen.current = r.id;
    const failing = Object.entries(r.results).find(([, v]) => v.verdict !== 'pass');
    if (failing) setCut(failing[0].split('@')[1] as CutId);
  }, [state.round]);

  // Jump to the findings tab when a review completes.
  useEffect(() => {
    if (state.hook.state === 'allowed' || project?.phase === 'reviewed') setTab((t) => (t === 'live' && fixes.length ? 'findings' : t));
  }, [state.hook.state, project?.phase, fixes.length]);

  const act = async (a: 'draft' | 'review' | 'seal' | 'cancel') => {
    if (!id) return;
    setActionError(null);
    try {
      await api.action(id, a);
      if (a !== 'cancel') setTab('live');
      setPick(null);
      refetch();
    } catch (e) {
      setActionError((e as Error).message);
    }
  };

  const pickCheck = useCallback(
    (ac: string, c: CutId) => {
      setFocus({ ac, cut: c });
      setCut(c);
      const crit = project?.plan?.criteria.find((x) => x.id === ac);
      setFocusLine(crit?.line ?? null);
      const k = checkKey(ac, c);
      if (fixes.some((f) => checkKey(f.ac, f.cut) === k)) {
        setTab('findings');
        setTimeout(() => document.getElementById(`finding-${k}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 60);
      } else setTab('criteria');
    },
    [project, fixes],
  );

  const showCorrection = (x: Correction, version: number) => {
    setPick(version);
    setCut(x.cut);
    setFocus({ ac: x.ac, cut: x.cut });
    const fail = x.history.find((h) => h.verdict !== 'pass');
    const ev = fail && project ? (sheetEvidence(project, fail.round, x.cut, x.c?.text ?? '') ?? '') : '';
    const named = [...(fail?.frames ?? []), ...[...ev.matchAll(/\bF\d+\b/g)].map((m) => m[0])];
    const frame = frames.find((f) => named.includes(f.label)) ?? frames.find((f) => x.c && f.shot === x.c.shot);
    if (frame) setTimeout(() => playhead.seek(frame.frame), 80);
  };

  // Keyboard: space play/pause, arrows step, 1-4 cut, Z zones, X x-ray.
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (t.closest('input, textarea, select, [contenteditable]')) return;
      const fps = comp?.meta.fps ?? 30;
      if (e.code === 'Space') {
        e.preventDefault();
        playhead.toggle();
      } else if (e.key === 'ArrowRight') playhead.seek(playhead.frame + (e.shiftKey ? fps : 1));
      else if (e.key === 'ArrowLeft') playhead.seek(playhead.frame - (e.shiftKey ? fps : 1));
      else if (e.key === 'Home') playhead.seek(0);
      else if (/^[1-4]$/.test(e.key) && project?.cuts[Number(e.key) - 1]) setCut(project.cuts[Number(e.key) - 1]);
      else if (e.key.toLowerCase() === 'z') setZones((z) => !z);
      else if (e.key.toLowerCase() === 'x') setXray((x) => !x);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [comp, playhead, project]);

  if (!project) return <div className="boot" />;

  const busy = state.busy ?? project.busy ?? null;
  const reviewed = project.rounds.length > 0;
  const worstV = worstVersion(project);
  const firstScore = worstV ? summarize(verdictMap(project, worstV).values()) : null;

  return (
    <div className={`studio ${busy ? 'is-busy' : ''}`}>
      <TopBar right={<AgentChips claudeActive={state.claudeWorking} kaneActive={state.kaneWorking} />}>
        <div className="crumb">
          <span>/</span>
          <b>{project.title}</b>
          <PhaseRail phase={project.phase} busy={busy} hasDraft={Boolean(latest)} reviewed={reviewed} sealed={Boolean(project.seal?.endedAt)} />
        </div>
      </TopBar>

      {replay ? (
        <div className="replaybar">
          <span className="rec">● Recorded run</span>
          <button type="button" className="btn ghost sm" onClick={replay.playing ? replay.pause : replay.play}>
            <Icon name={replay.playing ? 'pause' : 'play'} size={14} /> {replay.playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="btn ghost sm" onClick={replay.restart}>
            <Icon name="replay" size={14} /> Restart
          </button>
          {[1, 3, 8, 20].map((s) => (
            <button key={s} type="button" className={`btn ghost sm ${replay.speed === s ? 'on' : ''}`} onClick={() => replay.setSpeed(s)}>
              {s}×
            </button>
          ))}
          <div className="replay-track">
            <i style={{ width: `${(replay.progress / Math.max(1, replay.total)) * 100}%` }} />
          </div>
          <button type="button" className="btn ghost sm" onClick={replay.skipToEnd}>
            Skip to result
          </button>
        </div>
      ) : null}

      <main className="studio-grid">
        <aside className="col-left panel">
          <div className="panel-head">
            <h3>Storyboard</h3>
            <span className="muted">
              {sb.duration}s · {sb.fps} fps · {sb.shots.length} shots
            </span>
          </div>
          <StoryboardPanel
            sb={sb}
            criteria={project.plan?.criteria ?? []}
            cells={cells}
            focusLine={focusLine}
            onLine={(n, acs) => {
              setFocusLine(n);
              const failing = acs.find((a) => a.cuts.some((c) => cells.get(checkKey(a.id, c))?.state === 'fail'));
              const c = (failing ?? acs[0]) as Criterion;
              pickCheck(c.id, c.cuts.includes(cut) ? cut : c.cuts[0]);
            }}
            editable={!busy && !STATIC && !project.recorded}
            value={project.storyboard}
            onSave={async (v) => {
              await api.saveStoryboard(project.id, v);
              refetch();
            }}
          />
        </aside>

        <section className="col-stage">
          <div className="stage-bar">
            <div className="seg" role="tablist" aria-label="Cut">
              {project.cuts.map((c, i) => (
                <button key={c} type="button" role="tab" aria-selected={c === cut} className={c === cut ? 'on' : ''} onClick={() => setCut(c)} title={`${CUTS[c].name} · key ${i + 1}`}>
                  <span className={`cut-glyph cut-${c}`} />
                  {CUT_RATIO[c]}
                </button>
              ))}
            </div>
            <div className="versions" aria-label="Version">
              {project.versions.map((v) => (
                <button key={v.n} type="button" className={`vchip ${shown === v.n ? 'on' : ''} ${v.kind}`} onClick={() => setPick(v.n)} title={v.summary ?? ''}>
                  v{v.n}
                  <small>{v.kind === 'draft' ? 'draft' : 'fix'}</small>
                </button>
              ))}
              {!STATIC ? (
                <button type="button" className={`vchip live ${shown === 'live' ? 'on' : ''}`} onClick={() => setPick(following ? 'live' : null)} title="Follow Claude's working file">
                  <i className={state.claudeWorking ? 'pulse' : ''} /> LIVE
                </button>
              ) : null}
            </div>
            <div className="toggles">
              <button type="button" className={`tbtn ${zones ? 'on' : ''}`} onClick={() => setZones(!zones)} title="Safe zones (Z)">
                <Icon name="zones" />
              </button>
              <button type="button" className={`tbtn ${xray ? 'on' : ''}`} onClick={() => setXray(!xray)} title="Layer X-ray (X)">
                <Icon name="xray" />
              </button>
              {reviewed ? (
                <Link className="btn ghost sm" to={`/p/${project.id}/compare${mode === 'replay' && !STATIC ? '?replay=1' : ''}`}>
                  <Icon name="split" size={14} /> Draft vs final
                </Link>
              ) : null}
            </div>
          </div>

          <div className="stage">
            <HookBanner state={state} />
            {comp ? (
              <StagePlayer
                comp={comp}
                cut={cut}
                playhead={playhead}
                zones={zones}
                xray={xray}
                badge={
                  <>
                    {shown === 'live' && state.claudeWorking ? (
                      <div className="live-badge">
                        <i /> Claude is writing {state.editing?.file ?? 'src/Video.tsx'}
                      </div>
                    ) : null}
                    {state.kaneWorking && state.round && !state.round.done ? <div className="scanbeam" aria-hidden /> : null}
                  </>
                }
              />
            ) : (
              <div className="stage-empty">
                {state.claudeWorking && !latest ? (
                  <div className="empty-stage drafting">
                    <span className="spinner big" />
                    <h2>
                      Claude Code is <em>composing.</em>
                    </h2>
                    <p>Kane CLI is reading the same storyboard and designing the tests this draft will have to pass.</p>
                  </div>
                ) : latest || state.claudeWorking ? (
                  <p>{compError ? `Composition error: ${compError}` : 'Loading composition…'}</p>
                ) : (
                  <EmptyStage onGenerate={() => act('draft')} busy={Boolean(busy)} disabled={STATIC || Boolean(project.recorded)} />
                )}
              </div>
            )}
            {state.typing && Date.now() - state.typing.at < 20000 ? <CodeStream typing={state.typing} /> : null}
            {compError && comp ? <div className="compile-err">Claude’s latest edit does not compile yet — showing the last good frame. {compError.split('\n')[0]}</div> : null}
            {toast ? <div className="toast">{toast}</div> : null}
          </div>

          <Transport playhead={playhead} fps={comp?.meta.fps ?? sb.fps} total={comp?.meta.durationInFrames ?? sb.durationInFrames} score={score} firstScore={firstScore} shown={shown} />
        </section>

        <aside className="col-right panel">
          <div className="actions">
            <PrimaryAction busy={busy} hasDraft={Boolean(latest)} reviewed={reviewed} sealed={Boolean(project.seal?.endedAt)} hasTests={Boolean(project.plan?.tests.length)} onAct={act} disabled={STATIC || Boolean(project.recorded)} />
            {actionError || project.error ? <p className="err">{actionError ?? project.error}</p> : null}
            <CreditMeter project={project} />
            {!STATIC && !project.recorded && latest && !busy && project.plan ? (
              <ReviseBox
                onSend={async (text) => {
                  setActionError(null);
                  try {
                    await api.revise(project.id, text);
                    setTab('live');
                    setPick(null);
                    refetch();
                  } catch (e) {
                    setActionError((e as Error).message);
                  }
                }}
              />
            ) : null}
            {!STATIC && !project.recorded && latest ? (
              <GateCard
                project={project}
                onToggle={async (on) => {
                  try {
                    await api.patch(project.id, { gate: on });
                    refetch();
                  } catch (e) {
                    setActionError((e as Error).message);
                  }
                }}
              />
            ) : null}
          </div>
          <nav className="tabs" role="tablist">
            {(
              [
                ['live', 'Live'],
                ['findings', `Corrections${fixes.length ? ` ${fixes.length}` : ''}`],
                ['criteria', `Criteria${project.plan ? ` ${project.plan.criteria.length}` : ''}`],
                ['proof', 'Proof'],
                ['eye', 'Kane’s eye'],
                ['code', 'Code'],
              ] as [Tab, string][]
            ).map(([t, label]) => (
              <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? 'on' : ''} onClick={() => setTab(t)}>
                {label}
              </button>
            ))}
          </nav>
          <div className="tab-body">
            {tab === 'live' ? (
              <>
                <RoundBoard state={state} criteria={project.plan?.criteria ?? []} />
                <AgentFeeds state={state} />
              </>
            ) : null}
            {tab === 'findings' ? <Findings project={project} sb={sb} onShow={showCorrection} focus={focus ? checkKey(focus.ac, focus.cut) : null} /> : null}
            {tab === 'criteria' ? <CriteriaList project={project} cells={cells} sb={sb} focusAc={focus?.ac ?? null} onPick={pickCheck} /> : null}
            {tab === 'proof' ? <ProofPanel project={project} /> : null}
            {tab === 'eye' ? <KaneEye project={project} state={state} cut={cut} /> : null}
            {tab === 'code' ? <CodeDiff project={project} /> : null}
          </div>
        </aside>

        <section className="col-timeline">
          <Timeline
            meta={comp?.meta ?? null}
            sb={sb}
            frames={frames}
            criteria={project.plan?.criteria ?? []}
            cuts={project.cuts}
            cells={cells}
            running={running}
            playhead={playhead}
            activeCut={cut}
            onCut={setCut}
            onPick={pickCheck}
            focusAc={focus?.ac ?? null}
          />
        </section>
      </main>
    </div>
  );
}

function PhaseRail({ phase, busy, hasDraft, reviewed, sealed }: { phase: string; busy: string | null; hasDraft: boolean; reviewed: boolean; sealed: boolean }) {
  const steps = [
    { k: 'board', label: 'Storyboard', done: true, live: false },
    { k: 'draft', label: 'Claude drafts · Kane designs', done: hasDraft && busy !== 'draft', live: busy === 'draft' || busy === 'plan' },
    { k: 'review', label: 'Kane review loop', done: reviewed && busy !== 'review', live: busy === 'review' },
    { k: 'seal', label: 'Sealed proof', done: sealed, live: busy === 'seal' },
  ];
  return (
    <ol className="phaserail" aria-label={`Phase: ${phase}`}>
      {steps.map((s) => (
        <li key={s.k} className={`${s.done ? 'done' : ''} ${s.live ? 'live' : ''}`}>
          <i />
          {s.label}
        </li>
      ))}
    </ol>
  );
}

function PrimaryAction({
  busy,
  hasDraft,
  reviewed,
  sealed,
  hasTests,
  onAct,
  disabled,
}: {
  busy: string | null;
  hasDraft: boolean;
  reviewed: boolean;
  sealed: boolean;
  hasTests: boolean;
  onAct: (a: 'draft' | 'review' | 'seal' | 'cancel') => void;
  disabled: boolean;
}) {
  if (disabled) return <div className="action-note">Recorded run — create a new project to run Claude Code and Kane CLI live.</div>;
  if (busy)
    return (
      <div className="action-row">
        <div className="action-busy">
          <span className="spinner" />
          {busy === 'draft'
            ? 'Claude is drafting · Kane is designing tests'
            : busy === 'plan'
              ? 'Kane is finishing the test plan'
              : busy === 'review'
                ? 'Kane review loop running'
                : busy === 'revise'
                  ? 'Claude is making your change · Kane gates it'
                  : busy === 'gate'
                    ? 'Kane is judging your Claude Code session'
                    : 'Sealing evidence'}
        </div>
        <button type="button" className="btn ghost sm" onClick={() => onAct('cancel')}>
          <Icon name="stop" size={12} /> Stop
        </button>
      </div>
    );
  if (!hasDraft)
    return (
      <button type="button" className="btn primary big" onClick={() => onAct('draft')}>
        <Icon name="spark" /> Generate draft
      </button>
    );
  if (!reviewed)
    return (
      <button type="button" className="btn kane big" onClick={() => onAct('review')}>
        <Icon name="eye" /> Run Kane review
      </button>
    );
  return (
    <div className="action-row">
      {!sealed && hasTests ? (
        <button type="button" className="btn seal big" onClick={() => onAct('seal')}>
          <Icon name="seal" /> Seal proof
        </button>
      ) : null}
      <button type="button" className="btn ghost" onClick={() => onAct('review')}>
        <Icon name="replay" size={14} /> Review again
      </button>
    </div>
  );
}

function CreditMeter({ project }: { project: import('@dailies/shared').Project }) {
  const c = project.credits;
  const total = c.plan + c.verify + c.seal;
  if (!total) return null;
  const rounds = project.rounds;
  const conditions = rounds.reduce((n, r) => n + r.conditions, 0);
  const calls = rounds.reduce((n, r) => n + r.calls, 0);
  return (
    <div className="credits" title="Kane CLI credits spent on this project">
      <div className="credits-bar">
        <i className="c-plan" style={{ flex: c.plan }} />
        <i className="c-verify" style={{ flex: c.verify }} />
        <i className="c-seal" style={{ flex: c.seal }} />
      </div>
      <div className="credits-legend">
        <span>
          <b>{total.toFixed(1)}</b> Kane credits
        </span>
        <span className="c-plan">design {c.plan.toFixed(1)}</span>
        <span className="c-verify">
          judge {c.verify.toFixed(1)} · {conditions} checks in {calls} calls
        </span>
        {c.seal ? <span className="c-seal">seal {c.seal.toFixed(1)}</span> : null}
      </div>
    </div>
  );
}

function HookBanner({ state }: { state: ReturnType<typeof useProjectStream>['state'] }) {
  const h = state.hook;
  if (h.state === 'idle') return null;
  const recent = h.at ? Date.now() - h.at < 1000 * 60 * 10 : true;
  if (!recent && h.state === 'allowed') return null;
  return (
    <div className={`hookbanner hb-${h.state}`}>
      {h.state === 'judging' ? (
        <>
          <span className="spinner" /> Claude tried to stop · Stop hook → Kane CLI is re-judging the new version
        </>
      ) : h.state === 'blocked' ? (
        <>
          <Icon name="x" size={14} /> Stop blocked by Kane — findings sent back to Claude Code
        </>
      ) : (
        <>
          <Icon name="check" size={14} /> {h.text}
        </>
      )}
    </div>
  );
}

function Transport({
  playhead,
  fps,
  total,
  score,
  firstScore,
  shown,
}: {
  playhead: Playhead;
  fps: number;
  total: number;
  score: ReturnType<typeof summarize>;
  firstScore: ReturnType<typeof summarize> | null;
  shown: number | 'live' | null;
}) {
  const f = useFrame(playhead);
  const playing = usePlaying(playhead);
  return (
    <div className="transport">
      <div className="tp-ctl">
        <button type="button" className="tbtn" onClick={() => playhead.seek(f - 1)} aria-label="Previous frame">
          <Icon name="back" />
        </button>
        <button type="button" className="tbtn play" onClick={() => playhead.toggle()} aria-label={playing ? 'Pause' : 'Play'}>
          <Icon name={playing ? 'pause' : 'play'} />
        </button>
        <button type="button" className="tbtn" onClick={() => playhead.seek(f + 1)} aria-label="Next frame">
          <Icon name="fwd" />
        </button>
        <span className="tc">
          {formatTimecode(f / fps)} <em>/ {formatTimecode(total / fps)}</em>
        </span>
        <span className="fn">f {String(f).padStart(3, '0')}</span>
      </div>
      {score.total ? (
        <div className="scorecard" title={`Verdicts for ${shown === 'live' ? 'the latest pinned version' : `v${shown}`}`}>
          {firstScore && shown !== null && firstScore.pass !== score.pass ? (
            <span className="from">
              draft {firstScore.pass}/{firstScore.total} →
            </span>
          ) : null}
          <span className="ok">{score.pass}</span>
          <span className="sep">/</span>
          <span>{score.total}</span>
          <span className="lbl">checks pass</span>
          {score.fail ? <span className="bad">{score.fail} fail</span> : null}
          {score.owed ? <span className="owed">{score.owed} not yet judged</span> : null}
        </div>
      ) : null}
    </div>
  );
}

function EmptyStage({ onGenerate, busy, disabled }: { onGenerate: () => void; busy: boolean; disabled: boolean }) {
  return (
    <div className="empty-stage">
      <h2>
        Nothing on screen <em>yet.</em>
      </h2>
      <p>Claude Code writes the composition from your storyboard. In parallel, Kane CLI reads the same storyboard and designs the tests every frame has to pass.</p>
      {!disabled ? (
        <button type="button" className="btn primary big" onClick={onGenerate} disabled={busy}>
          <Icon name="spark" /> Generate draft
        </button>
      ) : null}
    </div>
  );
}

function CodeStream({ typing }: { typing: { file: string; chars: number; tail: string } }) {
  const lines = typing.tail.split('\n').slice(-16);
  return (
    <div className="codestream" aria-live="off">
      <header>
        <i /> Claude Code is typing <b>{typing.file}</b> <span>{typing.chars.toLocaleString()} chars</span>
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

const SUGGESTIONS = [
  'Make the caption a big, bold lower-third subtitle near the bottom of the frame, like social video captions.',
  'Make shot 1 punchier: the shoe slams in from the left with more overshoot.',
  'Put the price tag in a glowing pill in the bottom-right corner.',
];

function ReviseBox({ onSend }: { onSend: (text: string) => Promise<void> }) {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  return (
    <form
      className="revise"
      onSubmit={async (e) => {
        e.preventDefault();
        if (text.trim().length < 4) return;
        setSending(true);
        await onSend(text.trim());
        setSending(false);
        setText('');
      }}
    >
      <label htmlFor="revise-text">
        <b>Ask Claude for a change</b>
        <span>Kane re-judges the whole spot before Claude may stop.</span>
      </label>
      <textarea id="revise-text" value={text} onChange={(e) => setText(e.target.value)} rows={2} placeholder="e.g. make the caption a big lower-third subtitle" />
      <div className="revise-row">
        <div className="sugs">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" onClick={() => setText(s)} title={s}>
              {s.split(':')[0].split(',')[0].slice(0, 34)}…
            </button>
          ))}
        </div>
        <button type="submit" className="btn sm" disabled={sending || text.trim().length < 4}>
          {sending ? 'Sending…' : 'Send'}
        </button>
      </div>
    </form>
  );
}
