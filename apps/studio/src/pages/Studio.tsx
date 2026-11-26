import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { checkKey, parseStoryboard, sampleFrames, formatTimecode, type Criterion, type CutId } from '@dailies/shared';
import { api, STATIC } from '../lib/api';
import { buildActivity } from '../lib/activity';
import { useComposition } from '../lib/composition';
import { Playhead, useFrame, usePlaying } from '../lib/playhead';
import { useProjectStream } from '../lib/stream';
import { CUT_RATIO, summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { AgentChips, Stepper, TopBar } from '../components/Chrome';
import { StagePlayer } from '../components/Stage';
import { Timeline } from '../components/Timeline';
import { ActivityList } from '../components/Activity';
import { CodeCard, ComposingStage, Composer, CutBars, FilmStrip, GateRow, ScoreRing, StatusPill, useAgentStatus } from '../components/Live';
import { CodeDiff, CorrectionCard, CriteriaList, ProofSummary, StoryboardPanel, corrections, sheetEvidence, type Correction } from '../components/Panels';
import { Coll, Icon, useDismiss } from '../components/ui';

type Drawer = 'storyboard' | 'activity' | 'criteria' | 'code' | null;

export default function Studio() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const mode = params.get('replay') === '1' || STATIC ? 'replay' : 'live';
  const { state, project, refetch, replay } = useProjectStream(id, mode);
  const playhead = useMemo(() => new Playhead(), []);
  const [cut, setCut] = useState<CutId>('16x9');
  const [pick, setPick] = useState<number | 'live' | null>(null);
  const [drawer, setDrawer] = useState<Drawer>(null);
  const [inspector, setInspector] = useState(true);
  const [tlOpen, setTlOpen] = useState(true);
  const [strip, setStrip] = useState(true);
  const [zones, setZones] = useState(false);
  const [xray, setXray] = useState(false);
  const [focus, setFocus] = useState<{ ac: string; cut: CutId } | null>(null);
  const [focusLine, setFocusLine] = useState<number | null>(null);
  const [toast, setToast] = useState<{ text: string; tone: string } | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [menu, setMenu] = useState(false);
  const closeMenu = useCallback(() => setMenu(false), []);
  const menuRef = useDismiss(menu, closeMenu);

  const sb = useMemo(() => parseStoryboard(project?.storyboard ?? '# …\n'), [project?.storyboard]);
  const frames = useMemo(() => sampleFrames(sb), [sb]);
  const entries = useMemo(() => buildActivity(state.events), [state.events]);
  // In a replay, "now" is the moment the playback has reached, not the wall clock.
  const now = mode === 'replay' ? (state.events.at(-1)?.ts ?? Date.now()) : Date.now();
  const status = useAgentStatus(state, entries, now);

  useEffect(() => {
    if (project && !project.cuts.includes(cut)) setCut(project.cuts[0]);
  }, [project, cut]);

  const latest = project?.versions.at(-1)?.n ?? null;
  const following = pick === null;
  const shown: number | 'live' | null = following ? (state.claudeWorking && !STATIC ? 'live' : (latest ?? (STATIC ? null : 'live'))) : pick;
  const bust = shown === 'live' ? state.liveBust : 0;
  const { comp, error: compError } = useComposition(id, shown, bust);
  const judgedVersion = shown === 'live' ? latest : shown;
  const cells = useMemo(() => verdictMap(project, judgedVersion), [project, judgedVersion]);
  const running = useMemo(() => {
    const r = state.round;
    if (!r || r.done) return new Set<string>();
    return new Set(r.checks.filter((k) => !r.results[k]));
  }, [state.round]);
  const score = useMemo(() => summarize(cells.values()), [cells]);
  const fixes = useMemo(() => corrections(project), [project]);
  const openFixes = fixes.filter((f) => !f.fixedIn).length;
  // Frames the sheet's measurements named for checks failing on the version on screen.
  const flagged = useMemo(() => {
    if (!project) return [];
    const out = new Set<string>();
    for (const [k, c] of cells) {
      if (c.state !== 'fail' || !k.endsWith(`@${cut}`) || !c.round) continue;
      for (const f of c.frames ?? []) out.add(f);
      const ev = sheetEvidence(project, c.round, cut, project.plan?.criteria.find((x) => x.id === c.ac)?.text ?? '');
      for (const m of (ev ?? '').matchAll(/\bF\d+\b/g)) out.add(m[0]);
    }
    return [...out];
  }, [project, cells, cut]);

  // Moments worth a toast.
  const lastSeq = useRef(0);
  useEffect(() => {
    const fresh = state.events.filter((e) => e.seq > lastSeq.current);
    if (!fresh.length) return;
    lastSeq.current = fresh.at(-1)!.seq;
    if (state.events.length - fresh.length < 1 && !replay) return;
    for (const e of fresh) {
      const d = e.data as Record<string, any>;
      if (e.type === 'version') setToast({ text: `v${d.n} pinned`, tone: '' });
      if (e.type === 'round.end') setToast({ text: d.fail ? `Kane: ${d.fail} check${d.fail > 1 ? 's' : ''} failed on v${d.version}` : `Kane: v${d.version} passes ${d.pass}/${d.pass + d.unknown}`, tone: d.fail ? 'fail' : 'pass' });
      if (e.type === 'plan.done') setToast({ text: `Kane designed ${d.criteria} criteria`, tone: '' });
    }
  }, [state.events, replay]);
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3600);
    return () => clearTimeout(t);
  }, [toast]);

  // When a round ends with failures, show the failing cut.
  const lastRoundSeen = useRef<string | null>(null);
  useEffect(() => {
    const r = state.round;
    if (!r?.done || lastRoundSeen.current === r.id) return;
    lastRoundSeen.current = r.id;
    const failing = Object.entries(r.results).find(([, v]) => v.verdict !== 'pass');
    if (failing) setCut(failing[0].split('@')[1] as CutId);
  }, [state.round]);

  // The strip comes back whenever Kane starts judging.
  useEffect(() => {
    if (state.round && !state.round.done) setStrip(true);
  }, [state.round?.id, state.round?.done]); // eslint-disable-line react-hooks/exhaustive-deps

  const act = async (a: 'draft' | 'review' | 'seal' | 'cancel') => {
    if (!id) return;
    setActionError(null);
    try {
      await api.action(id, a);
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
        setInspector(true);
        setTimeout(() => document.getElementById(`finding-${k}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
      } else setDrawer('criteria');
    },
    [project, fixes],
  );

  // Open on a representative frame (the cards' poster frame), not on frame 0,
  // which in most spots is still the empty opening.
  const postered = useRef(false);
  useEffect(() => {
    if (!comp || postered.current) return;
    postered.current = true;
    const t = setTimeout(() => {
      if (!playhead.playing && playhead.frame === 0) playhead.seek(Math.floor(comp.meta.durationInFrames * 0.28));
    }, 120);
    return () => clearTimeout(t);
  }, [comp, playhead]);

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
      else if (e.key.toLowerCase() === 'f') setStrip((s) => !s);
      else if (e.key.toLowerCase() === 'i') setInspector((s) => !s);
      else if (e.key === '[') setDrawer((d) => (d ? null : 'storyboard'));
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [comp, playhead, project]);

  if (!project) return <div className="boot" />;

  const busy = state.busy ?? project.busy ?? null;
  const reviewed = project.rounds.length > 0;
  const worstV = worstVersion(project);
  const before = worstV && worstV !== latest ? summarize(verdictMap(project, worstV).values()) : null;
  const sealed = Boolean(project.seal?.endedAt);
  const live = !STATIC && !project.recorded && mode !== 'replay';
  const lastHook = [...entries].reverse().find((e) => e.kind === 'hook');
  const mood: 'writing' | 'judging' | 'blocked' | 'verified' | null =
    state.round && !state.round.done
      ? 'judging'
      : lastHook?.kind === 'hook' && lastHook.state === 'block' && now - lastHook.ts < 8000
        ? 'blocked'
        : state.claudeWorking
          ? 'writing'
          : lastHook?.kind === 'hook' && lastHook.state === 'allow' && now - lastHook.ts < 4000
            ? 'verified'
            : null;
  const kaneCredits = project.credits.plan + project.credits.verify + project.credits.seal;
  const runningEntry = entries.some((e) => 'status' in e && e.status === 'running');

  return (
    <div className="studio">
      <TopBar
        right={
          <>
            <AgentChips claudeActive={state.claudeWorking} kaneActive={state.kaneWorking} />
            <PrimaryAction busy={busy} hasDraft={Boolean(latest)} reviewed={reviewed} sealed={sealed} hasTests={Boolean(project.plan?.tests.length)} onAct={act} live={live} agent={project.source === 'mcp' ? (project.agent?.client ?? 'your agent') : undefined} />
            <div style={{ position: 'relative' }} ref={menuRef}>
              <button type="button" className="iconbtn" onClick={() => setMenu(!menu)} aria-label="More" aria-expanded={menu}>
                <Icon name="more" />
              </button>
              {menu ? (
                <div className="pop menu">
                  {reviewed ? (
                    <Link to={`/p/${project.id}/compare${mode === 'replay' && !STATIC ? '?replay=1' : ''}`}>
                      <Icon name="split" />
                      <span>
                        Before vs after
                        <small>Wipe between the version Kane failed and the final cut</small>
                      </span>
                    </Link>
                  ) : null}
                  {live && reviewed && !busy ? (
                    <button type="button" onClick={() => (setMenu(false), act('review'))}>
                      <Icon name="replay" />
                      <span>
                        Review again
                        <small>Full Kane sweep of the latest version</small>
                      </span>
                    </button>
                  ) : null}
                  {live && reviewed && !busy && project.plan?.tests.length ? (
                    <button type="button" onClick={() => (setMenu(false), act('seal'))}>
                      <Icon name="seal" />
                      <span>
                        {sealed ? 'Seal again' : 'Seal proof'}
                        <small>Run Kane’s designed tests, measure coverage</small>
                      </span>
                    </button>
                  ) : null}
                  <a href={`/inspect/${project.id}/${latest ?? 'live'}/sheet?cut=${cut}&guides=1`} target="_blank" rel="noreferrer">
                    <Icon name="frame" />
                    <span>
                      Open Kane’s contact sheet
                      <small>The exact page Kane judges for {CUT_RATIO[cut]}</small>
                    </span>
                  </a>
                  <hr />
                  <Link to="/pitch">
                    <Icon name="book" />
                    <span>Pitch</span>
                  </Link>
                </div>
              ) : null}
            </div>
          </>
        }
      >
        <div className="crumb">
          <Link to="/">Projects</Link>
          <span>/</span>
          <b>{project.title}</b>
        </div>
        <Stepper hasDraft={Boolean(latest)} busy={busy} reviewed={reviewed} sealed={sealed} />
      </TopBar>

      {replay ? (
        <div className="replaybar">
          <span className="rec">
            <i /> Recorded run
          </span>
          <button type="button" className="btn sm" onClick={replay.playing ? replay.pause : replay.play}>
            <Icon name={replay.playing ? 'pause' : 'play'} size={13} /> {replay.playing ? 'Pause' : 'Play'}
          </button>
          <button type="button" className="btn sm ghost" onClick={replay.restart}>
            <Icon name="replay" size={13} /> Restart
          </button>
          <div className="seg">
            {[1, 3, 8, 20].map((s) => (
              <button key={s} type="button" className={replay.speed === s ? 'on' : ''} onClick={() => replay.setSpeed(s)}>
                {s}×
              </button>
            ))}
          </div>
          <div className="replay-track">
            <i style={{ width: `${(replay.progress / Math.max(1, replay.total)) * 100}%` }} />
          </div>
          <button type="button" className="btn sm" onClick={replay.skipToEnd}>
            Skip to result
          </button>
        </div>
      ) : null}

      <div className="studio-body">
        <nav className="rail" aria-label="Panels">
          <RailBtn icon="book" label="Storyboard ( [ )" on={drawer === 'storyboard'} onClick={() => setDrawer(drawer === 'storyboard' ? null : 'storyboard')} />
          <RailBtn
            icon="history"
            label="Activity — every Claude session and Kane run"
            on={drawer === 'activity'}
            onClick={() => setDrawer(drawer === 'activity' ? null : 'activity')}
            badge={runningEntry ? { text: '•', tone: 'live' } : entries.length ? { text: String(entries.filter((e) => e.kind === 'round' || e.kind === 'claude').length), tone: '' } : undefined}
          />
          <RailBtn icon="target" label="Criteria Kane designed" on={drawer === 'criteria'} onClick={() => setDrawer(drawer === 'criteria' ? null : 'criteria')} badge={project.plan ? { text: String(project.plan.criteria.length), tone: '' } : undefined} />
          <RailBtn icon="code" label="Code" on={drawer === 'code'} onClick={() => setDrawer(drawer === 'code' ? null : 'code')} />
          <span className="rail-sep" />
          <RailBtn icon="panel" label="Verdicts panel (I)" on={inspector} onClick={() => setInspector(!inspector)} badge={openFixes ? { text: String(openFixes), tone: 'fail' } : undefined} />
          <RailBtn icon="timeline" label="Timeline" on={tlOpen} onClick={() => setTlOpen(!tlOpen)} />
        </nav>

        <aside className={`drawer ${drawer ? 'open' : ''}`} aria-hidden={!drawer}>
          <div className="drawer-in">
            <div className="drawer-head">
              <h3>{drawer === 'storyboard' ? 'Storyboard' : drawer === 'activity' ? 'Activity' : drawer === 'criteria' ? 'Kane’s criteria' : 'Code'}</h3>
              <span>
                {drawer === 'storyboard'
                  ? `${sb.duration}s · ${sb.fps} fps · ${sb.shots.length} shots`
                  : drawer === 'activity'
                    ? `${entries.length} events`
                    : drawer === 'criteria'
                      ? `${project.plan?.criteria.length ?? 0} criteria`
                      : `${project.versions.length} versions`}
              </span>
              <button type="button" className="iconbtn" onClick={() => setDrawer(null)} aria-label="Close panel">
                <Icon name="close" size={14} />
              </button>
            </div>
            <div className="drawer-body">
              {drawer === 'storyboard' ? (
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
                  editable={!busy && live && !project.versions.length}
                  value={project.storyboard}
                  onSave={async (v) => {
                    await api.saveStoryboard(project.id, v);
                    refetch();
                  }}
                />
              ) : null}
              {drawer === 'activity' ? <ActivityList entries={entries} projectId={project.id} /> : null}
              {drawer === 'criteria' ? <CriteriaList project={project} cells={cells} focusAc={focus?.ac ?? null} onPick={pickCheck} /> : null}
              {drawer === 'code' ? <CodeDiff project={project} /> : null}
            </div>
          </div>
        </aside>

        <div className="center">
          <div className={`canvas ${comp && strip && project.plan && (reviewed || (state.round && !state.round.done)) ? `with-strip strip-${cut}` : ''}`}>
            {status ? <StatusPill status={status} entries={entries} projectId={project.id} replay={mode === 'replay'} /> : null}
            {comp && (latest || state.liveBust || !state.claudeWorking) ? (
              <StagePlayer
                comp={comp}
                cut={cut}
                playhead={playhead}
                zones={zones}
                xray={xray}
                mood={mood}
                badge={mood === 'judging' ? <div className="sweep" aria-hidden /> : null}
              />
            ) : state.claudeWorking && !latest ? (
              <ComposingStage state={state} entries={entries} criteria={project.plan?.criteria ?? []} />
            ) : (
              <EmptyStage drafting={state.claudeWorking} canGenerate={live && !busy} onGenerate={() => act('draft')} error={compError} hasVersion={Boolean(latest)} />
            )}
            {state.typing && now - state.typing.at < 20000 && (latest || state.liveBust) ? <CodeCard typing={state.typing} /> : null}
            {comp && strip && project.plan && (reviewed || (state.round && !state.round.done)) ? (
              <FilmStrip
                comp={comp}
                cut={cut}
                frames={frames}
                criteria={project.plan.criteria}
                sb={sb}
                cells={cells}
                live={state.round}
                playhead={playhead}
                onClose={() => setStrip(false)}
                version={state.round && !state.round.done ? state.round.version : judgedVersion}
                flagged={flagged}
              />
            ) : null}
            {compError && comp ? <div className="compile-err">Claude’s latest edit doesn’t compile yet — showing the last good frame</div> : null}
            {toast ? (
              <div className="toast" key={toast.text}>
                {toast.tone ? <span className={`vmark ${toast.tone}`}><Icon name={toast.tone === 'pass' ? 'check' : 'x'} size={10} stroke={3} /></span> : <Icon name="spark" size={14} />}
                {toast.text}
              </div>
            ) : null}
            <div className="toolbar">
              <div className="seg" role="tablist" aria-label="Cut">
                {project.cuts.map((c, i) => (
                  <button key={c} type="button" role="tab" aria-selected={c === cut} className={c === cut ? 'on' : ''} onClick={() => setCut(c)} title={`${CUT_RATIO[c]} · key ${i + 1}`}>
                    <span className={`cut-glyph cut-${c}`} />
                    {CUT_RATIO[c]}
                  </button>
                ))}
              </div>
              <span className="sep" />
              {project.versions.map((v) => {
                const s = summarize(verdictMap(project, v.n).values());
                const judged = project.rounds.some((r) => r.version === v.n);
                return (
                  <button key={v.n} type="button" className={`vchip ${shown === v.n ? 'on' : ''}`} onClick={() => setPick(v.n)} title={v.summary ?? ''}>
                    <span className={`vd ${judged ? (s.fail ? 'fail' : 'pass') : ''}`} />v{v.n}
                  </button>
                );
              })}
              {live ? (
                <button type="button" className={`vchip live ${shown === 'live' ? 'on' : ''}`} onClick={() => setPick(following ? 'live' : null)} title="Follow Claude’s working file">
                  <i className={state.claudeWorking ? 'pulse' : ''} /> live
                </button>
              ) : null}
              <span className="sep" />
              <button type="button" className={`iconbtn ${zones ? 'on' : ''}`} onClick={() => setZones(!zones)} title="Safe zones (Z)">
                <Icon name="zones" />
              </button>
              <button type="button" className={`iconbtn ${xray ? 'on' : ''}`} onClick={() => setXray(!xray)} title="Layer X-ray (X)">
                <Icon name="xray" />
              </button>
              <button type="button" className={`iconbtn ${strip ? 'on' : ''}`} onClick={() => setStrip(!strip)} title="Kane’s frames (F)">
                <Icon name="frame" />
              </button>
              {reviewed ? (
                <Link className="iconbtn" to={`/p/${project.id}/compare${mode === 'replay' && !STATIC ? '?replay=1' : ''}`} title="Before vs after">
                  <Icon name="split" />
                </Link>
              ) : null}
            </div>
          </div>

          <div className={`timeline-wrap ${tlOpen ? '' : 'collapsed'}`}>
            <Transport playhead={playhead} fps={comp?.meta.fps ?? sb.fps} total={comp?.meta.durationInFrames ?? sb.durationInFrames} score={score} before={before} onToggle={() => setTlOpen(!tlOpen)} open={tlOpen} />
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
          </div>
        </div>

        <aside className={`inspector ${inspector ? '' : 'closed'}`} aria-hidden={!inspector}>
          <div className="inspector-in">
            <div className="insp-head">
              <h3>Verdicts</h3>
              <button type="button" className="iconbtn" onClick={() => setInspector(false)} aria-label="Hide verdicts">
                <Icon name="close" size={14} />
              </button>
            </div>
            <div className="insp-scroll">
              <div className="scorebox">
                <ScoreRing pass={score.pass} total={score.total} fail={score.fail} running={Boolean(state.round && !state.round.done)} />
                <div className="score-meta">
                  <h4>
                    {!project.plan
                      ? 'No tests yet'
                      : !reviewed
                        ? 'Not judged yet'
                        : score.fail
                          ? `${score.fail} check${score.fail > 1 ? 's' : ''} failing`
                          : score.owed
                            ? `${score.owed} not judged`
                            : 'Every check passes'}
                  </h4>
                  <p>
                    {judgedVersion ? `v${judgedVersion}` : 'no version'} · {project.cuts.length} cuts · {project.plan?.criteria.length ?? 0} criteria
                  </p>
                  {before ? (
                    <p>
                      before Kane: <b style={{ color: 'var(--fail-text)' }}>{before.pass}/{before.total}</b>
                    </p>
                  ) : null}
                </div>
              </div>
              {project.plan ? <CutBars cuts={project.cuts} cells={cells} active={cut} onCut={setCut} /> : null}
              {actionError || project.error ? <p className="err">{actionError ?? project.error}</p> : null}

              <div className="sec-title">
                <span>Corrections</span>
                <span>{fixes.length ? `${fixes.filter((f) => f.fixedIn).length}/${fixes.length} fixed` : ''}</span>
              </div>
              {fixes.length ? (
                fixes.map((x) => <CorrectionCard key={checkKey(x.ac, x.cut)} project={project} sb={sb} x={x} focus={focus ? checkKey(focus.ac, focus.cut) === checkKey(x.ac, x.cut) : false} onShow={showCorrection} />)
              ) : (
                <p className="empty">{reviewed ? 'Kane judged every criterion on every cut and found nothing to correct.' : 'When Kane fails a check, the finding, Claude’s fix and Kane’s re-check appear here.'}</p>
              )}

              {project.seal ? <ProofSummary project={project} /> : null}

              {live && latest && project.plan ? (
                <>
                  <div className="sec-title">
                    <span>Change</span>
                  </div>
                  <Composer
                    disabled={Boolean(busy)}
                    onSend={async (text) => {
                      setActionError(null);
                      try {
                        await api.revise(project.id, text);
                        setPick(null);
                        refetch();
                      } catch (e) {
                        setActionError((e as Error).message);
                      }
                    }}
                  />
                  <GateRow
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
                </>
              ) : null}

              {kaneCredits ? (
                <Coll icon={<Icon name="bolt" size={15} />} title={`${kaneCredits.toFixed(0)} Kane credits`} sub={`Claude Code $${project.claude.costUsd.toFixed(2)} · ${project.claude.model ?? ''}`}>
                  <div className="credits-bar">
                    <i className="c-plan" style={{ flex: project.credits.plan }} />
                    <i className="c-verify" style={{ flex: project.credits.verify }} />
                    <i className="c-seal" style={{ flex: project.credits.seal || 0.0001 }} />
                  </div>
                  <dl className="kv">
                    <dt>Design</dt>
                    <dd>{project.credits.plan.toFixed(1)} cr · context ingest, review, design tests</dd>
                    <dt>Judge</dt>
                    <dd>
                      {project.credits.verify.toFixed(1)} cr · {project.rounds.reduce((n, r) => n + r.conditions, 0)} checks in {project.rounds.reduce((n, r) => n + r.calls, 0)} analyzer calls
                    </dd>
                    <dt>Seal</dt>
                    <dd>{project.credits.seal.toFixed(1)} cr · testmd run, cover</dd>
                  </dl>
                </Coll>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function RailBtn({ icon, label, on, onClick, badge }: { icon: string; label: string; on: boolean; onClick: () => void; badge?: { text: string; tone: string } }) {
  return (
    <button type="button" className={`iconbtn ${on ? 'on' : ''}`} onClick={onClick} title={label} aria-label={label} aria-pressed={on}>
      <Icon name={icon} size={17} />
      {badge ? <span className={`badge ${badge.tone}`}>{badge.text}</span> : null}
    </button>
  );
}

function PrimaryAction({
  busy,
  hasDraft,
  reviewed,
  sealed,
  hasTests,
  onAct,
  live,
  agent,
}: {
  busy: string | null;
  hasDraft: boolean;
  reviewed: boolean;
  sealed: boolean;
  hasTests: boolean;
  onAct: (a: 'draft' | 'review' | 'seal' | 'cancel') => void;
  live: boolean;
  /** set for spots an external agent drives over MCP: the agent writes and asks for reviews */
  agent?: string;
}) {
  if (!live) return <span className="tag">recorded run</span>;
  if (agent) {
    if (busy === 'agent' || busy === 'plan')
      return (
        <span className="agent-pill live">
          <span className="spinner" /> {busy === 'plan' ? 'Kane is designing the tests' : `Kane is judging for ${agent}`}
        </span>
      );
    if (busy === 'seal')
      return (
        <button type="button" className="btn" onClick={() => onAct('cancel')}>
          <span className="spinner" /> Stop
        </button>
      );
    if (!hasDraft)
      return (
        <span className="agent-pill">
          <Icon name="plug" size={13} /> Waiting for {agent} to write the composition
        </span>
      );
    if (reviewed && !sealed && hasTests)
      return (
        <button type="button" className="btn seal" onClick={() => onAct('seal')}>
          <Icon name="seal" size={14} /> Seal proof
        </button>
      );
    return (
      <span className="agent-pill">
        <Icon name="plug" size={13} /> via {agent} · MCP
      </span>
    );
  }
  if (busy)
    return (
      <button type="button" className="btn" onClick={() => onAct('cancel')}>
        <span className="spinner" /> Stop
      </button>
    );
  if (!hasDraft)
    return (
      <button type="button" className="btn ink" onClick={() => onAct('draft')}>
        <Icon name="spark" size={14} /> Generate draft
      </button>
    );
  if (!reviewed)
    return (
      <button type="button" className="btn kane" onClick={() => onAct('review')}>
        <Icon name="eye" size={14} /> Run Kane review
      </button>
    );
  if (!sealed && hasTests)
    return (
      <button type="button" className="btn seal" onClick={() => onAct('seal')}>
        <Icon name="seal" size={14} /> Seal proof
      </button>
    );
  return (
    <button type="button" className="btn" onClick={() => onAct('review')}>
      <Icon name="replay" size={14} /> Review again
    </button>
  );
}

function Transport({
  playhead,
  fps,
  total,
  score,
  before,
  onToggle,
  open,
}: {
  playhead: Playhead;
  fps: number;
  total: number;
  score: ReturnType<typeof summarize>;
  before: ReturnType<typeof summarize> | null;
  onToggle: () => void;
  open: boolean;
}) {
  const f = useFrame(playhead);
  const playing = usePlaying(playhead);
  return (
    <div className="transport">
      <button type="button" className="iconbtn" onClick={() => playhead.seek(f - 1)} aria-label="Previous frame">
        <Icon name="prev" />
      </button>
      <button type="button" className="iconbtn play" onClick={() => playhead.toggle()} aria-label={playing ? 'Pause' : 'Play'}>
        <Icon name={playing ? 'pause' : 'play'} size={14} />
      </button>
      <button type="button" className="iconbtn" onClick={() => playhead.seek(f + 1)} aria-label="Next frame">
        <Icon name="next" />
      </button>
      <span className="tc">
        {formatTimecode(f / fps)} <em>/ {formatTimecode(total / fps)}</em>
      </span>
      <span className="tag">f{String(f).padStart(3, '0')}</span>
      <span className="spacer" />
      {score.total ? (
        <span className="scoremini">
          {before ? (
            <>
              <s>
                {before.pass}/{before.total}
              </s>
              <Icon name="next" size={12} />
            </>
          ) : null}
          <span className={`vmark ${score.fail ? 'fail' : score.owed === score.total ? 'owed' : 'pass'}`}>{score.fail ? <Icon name="x" size={10} stroke={3} /> : score.owed === score.total ? null : <Icon name="check" size={10} stroke={3} />}</span>
          {score.pass}/{score.total}
        </span>
      ) : null}
      <button type="button" className="iconbtn" onClick={onToggle} aria-label={open ? 'Collapse timeline' : 'Expand timeline'}>
        <Icon name="down" size={14} />
      </button>
    </div>
  );
}

function EmptyStage({ drafting, canGenerate, onGenerate, error, hasVersion }: { drafting: boolean; canGenerate: boolean; onGenerate: () => void; error: string | null; hasVersion: boolean }) {
  if (drafting)
    return (
      <div className="empty-stage">
        <div className="orb" />
        <h2>Claude Code is composing</h2>
        <p>Kane CLI is reading the same storyboard and designing the tests this draft has to pass.</p>
      </div>
    );
  if (hasVersion || error)
    return (
      <div className="empty-stage">
        <p>{error ? `Composition error: ${error.split('\n')[0]}` : 'Loading composition…'}</p>
      </div>
    );
  return (
    <div className="empty-stage">
      <h2>Nothing on screen yet</h2>
      <p>Claude Code writes the composition from your storyboard. At the same time, Kane CLI turns the storyboard into the tests every frame has to pass.</p>
      {canGenerate ? (
        <button type="button" className="btn ink lg" onClick={onGenerate}>
          <Icon name="spark" /> Generate draft
        </button>
      ) : null}
    </div>
  );
}
