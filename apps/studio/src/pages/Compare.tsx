import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkKey, CUTS, formatTimecode, parseStoryboard, sampleFrames, framesForCriterion, type CutId, type Project } from '@dailies/shared';
import { api } from '../lib/api';
import { useComposition } from '../lib/composition';
import { Playhead, useFrame, usePlaying } from '../lib/playhead';
import { CUT_RATIO, summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { AgentChips, TopBar } from '../components/Chrome';
import { StagePlayer } from '../components/Stage';
import { corrections, sheetEvidence } from '../components/Panels';
import { Icon, VMark } from '../components/ui';

/**
 * Before vs after: the version Kane scored lowest and the version the loop
 * ended on, in lock-step under a wipe, with every criterion's verdict on both.
 */
export default function Compare() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [cut, setCut] = useState<CutId>('16x9');
  const [mode, setMode] = useState<'wipe' | 'side'>('wipe');
  const [split, setSplit] = useState(100);
  const [intro, setIntro] = useState(true);
  const [zones, setZones] = useState(false);
  const playhead = useMemo(() => new Playhead(), []);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) api.project(id).then(setProject);
  }, [id]);

  const opened = useRef(false);
  useEffect(() => {
    if (!project || opened.current) return;
    opened.current = true;
    const fixed = corrections(project).filter((f) => f.fixedIn);
    const counts = new Map<CutId, number>();
    for (const f of fixed) counts.set(f.cut, (counts.get(f.cut) ?? 0) + 1);
    const best = [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
    setCut(best ?? (project.cuts.includes('9x16') ? '9x16' : project.cuts[0]));
  }, [project]);

  const a = worstVersion(project) ?? project?.versions[0]?.n ?? null;
  const b = project?.versions.at(-1)?.n ?? null;
  const A = useComposition(id, a);
  const B = useComposition(id, b);
  const sb = useMemo(() => parseStoryboard(project?.storyboard ?? '# …'), [project]);
  const frames = useMemo(() => sampleFrames(sb), [sb]);
  const before = useMemo(() => verdictMap(project, a), [project, a]);
  const after = useMemo(() => verdictMap(project, b), [project, b]);
  const sa = summarize(before.values());
  const sbb = summarize(after.values());
  const fixes = corrections(project).filter((f) => f.fixedIn);

  // Seek to the frame Kane flagged, then sweep the wipe across once.
  const sought = useRef(false);
  useEffect(() => {
    if (sought.current || !A.comp || !B.comp || !project) return;
    sought.current = true;
    const f = corrections(project).find((x) => x.fixedIn && x.cut === cut);
    const firstFail = f?.history.find((h) => h.verdict !== 'pass');
    const ev = f && firstFail ? (sheetEvidence(project, firstFail.round, f.cut, f.c?.text ?? '') ?? '') : '';
    const named = [...(firstFail?.frames ?? []), ...[...ev.matchAll(/\bF\d+\b/g)].map((m) => m[0])];
    const fr = frames.find((x) => named.includes(x.label)) ?? (f?.c ? (framesForCriterion(f.c, frames, sb)[0] ?? frames.find((x) => x.shot === f.c!.shot)) : null);
    setTimeout(() => playhead.seek(fr ? fr.frame : Math.floor(B.comp!.meta.durationInFrames * 0.3)), 150);
    setTimeout(() => setSplit(50), 500);
    setTimeout(() => setIntro(false), 1800);
  }, [A.comp, B.comp, project, cut, frames, sb, playhead]);

  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        playhead.toggle();
      } else if (e.key === 'ArrowRight') playhead.seek(playhead.frame + (e.shiftKey ? 30 : 1));
      else if (e.key === 'ArrowLeft') playhead.seek(playhead.frame - (e.shiftKey ? 30 : 1));
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [playhead]);

  if (!project) return <div className="boot" />;
  const crits = (project.plan?.criteria ?? []).filter((c) => c.cuts.includes(cut));
  const rows = crits
    .map((c) => ({ c, b: before.get(checkKey(c.id, cut)), a: after.get(checkKey(c.id, cut)) }))
    .sort((x, y) => Number(x.b?.state === 'pass') - Number(y.b?.state === 'pass'));
  const tall = CUTS[cut].height > CUTS[cut].width;
  const move = (clientX: number) => {
    const r = wipeRef.current!.getBoundingClientRect();
    setIntro(false);
    setSplit(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <div className="page">
      <TopBar right={<AgentChips />}>
        <div className="crumb">
          <Link to="/">Projects</Link>
          <span>/</span>
          <Link to={`/p/${project.id}`}>{project.title}</Link>
          <span>/</span>
          <b>Before vs after</b>
        </div>
      </TopBar>
      <div className="cmp">
        <div className="cmp-head">
          <div className="cmp-score">
            <div className="cs before">
              <span>Before Kane · v{a}</span>
              <b>
                {sa.pass}
                <small>/{sa.total}</small>
              </b>
            </div>
            <div className="cs-arrow">
              <Icon name="next" size={22} />
              <span>
                {fixes.length} fix{fixes.length === 1 ? '' : 'es'}
              </span>
            </div>
            <div className="cs after">
              <span>After Kane · v{b}</span>
              <b>
                {sbb.pass}
                <small>/{sbb.total}</small>
              </b>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="seg">
              {project.cuts.map((c) => (
                <button key={c} type="button" className={c === cut ? 'on' : ''} onClick={() => setCut(c)}>
                  <span className={`cut-glyph cut-${c}`} />
                  {CUT_RATIO[c]}
                </button>
              ))}
            </div>
            <div className="seg">
              <button type="button" className={mode === 'wipe' ? 'on' : ''} onClick={() => setMode('wipe')}>
                Wipe
              </button>
              <button type="button" className={mode === 'side' ? 'on' : ''} onClick={() => setMode('side')}>
                2-up
              </button>
            </div>
            <button type="button" className={`iconbtn ${zones ? 'on' : ''}`} onClick={() => setZones(!zones)} title="Safe zones">
              <Icon name="zones" />
            </button>
          </div>
        </div>

        <section className={`cmp-stage ${tall ? 'tall' : ''}`}>
          {A.comp && B.comp ? (
            mode === 'wipe' ? (
              <div
                className={`wipe ${intro ? 'intro' : ''}`}
                ref={wipeRef}
                onPointerDown={(e) => {
                  (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                  move(e.clientX);
                }}
                onPointerMove={(e) => e.buttons === 1 && move(e.clientX)}
              >
                <div className="wipe-layer">
                  <StagePlayer comp={B.comp} cut={cut} playhead={playhead} zones={zones} maxHeight={tall ? 600 : 500} />
                </div>
                <div className="wipe-layer top" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                  <StagePlayer comp={A.comp} cut={cut} playhead={playhead} zones={zones} follower maxHeight={tall ? 600 : 500} />
                </div>
                <div className="wipe-handle" style={{ left: `${split}%` }}>
                  <span>
                    <Icon name="prev" size={12} />
                    <Icon name="next" size={12} />
                  </span>
                </div>
                <span className="wipe-tag l">before · v{a}</span>
                <span className="wipe-tag r">after · v{b}</span>
              </div>
            ) : (
              <div className="side">
                <figure>
                  <figcaption>before · v{a}</figcaption>
                  <StagePlayer comp={A.comp} cut={cut} playhead={playhead} zones={zones} follower maxHeight={tall ? 600 : 360} />
                </figure>
                <figure>
                  <figcaption>after · v{b}</figcaption>
                  <StagePlayer comp={B.comp} cut={cut} playhead={playhead} zones={zones} maxHeight={tall ? 600 : 360} />
                </figure>
              </div>
            )
          ) : (
            <p className="muted">{A.error ?? B.error ?? 'Loading both versions…'}</p>
          )}
          <CmpTransport playhead={playhead} fps={B.comp?.meta.fps ?? 30} total={B.comp?.meta.durationInFrames ?? sb.durationInFrames} />
        </section>

        <div className="cmp-list coll" style={{ animation: 'none' }}>
          <div className="coll-h" style={{ cursor: 'default' }}>
            <span className="ttl">
              <b>Every criterion on the {CUT_RATIO[cut]} cut</b>
              <small>Kane CLI’s verdicts on both versions · click to jump to the frame</small>
            </span>
            <span className="meta">before · after</span>
          </div>
          {rows.map(({ c, b: x, a: y }) => {
            const fr = framesForCriterion(c, frames, sb)[0];
            return (
              <button key={c.id} type="button" className={`cmp-row ${x?.state !== 'pass' && y?.state === 'pass' ? 'fixed' : ''}`} onClick={() => fr && playhead.seek(fr.frame)}>
                <span>
                  {c.text} {fr ? <span className="tag">{formatTimecode(fr.seconds)}</span> : null}
                </span>
                <span className="vm" title={x?.reason}>
                  <VMark state={x?.state ?? 'owed'} />
                </span>
                <span className="vm" title={y?.reason}>
                  <VMark state={y?.state ?? 'owed'} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CmpTransport({ playhead, fps, total }: { playhead: Playhead; fps: number; total: number }) {
  const f = useFrame(playhead);
  const playing = usePlaying(playhead);
  return (
    <div className="cmp-transport">
      <button type="button" className="iconbtn play" onClick={() => playhead.toggle()} aria-label={playing ? 'Pause' : 'Play'}>
        <Icon name={playing ? 'pause' : 'play'} size={14} />
      </button>
      <input type="range" min={0} max={total - 1} value={f} onChange={(e) => playhead.seek(Number(e.target.value))} aria-label="Scrub" />
      <span className="tc">
        {formatTimecode(f / fps)} <em>/ {formatTimecode(total / fps)}</em>
      </span>
    </div>
  );
}
