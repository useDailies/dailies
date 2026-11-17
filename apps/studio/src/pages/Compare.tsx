import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { checkKey, CUTS, formatTimecode, parseStoryboard, sampleFrames, framesForCriterion, type CutId, type Project } from '@dailies/shared';
import { api } from '../lib/api';
import { useComposition } from '../lib/composition';
import { Playhead, useFrame, usePlaying } from '../lib/playhead';
import { CUT_RATIO, summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { Icon, TopBar } from '../components/Chrome';
import { StagePlayer } from '../components/Stage';
import { corrections } from '../components/Panels';

/**
 * Draft vs final. The first draft Claude handed over, and the version Kane's
 * review loop ended on, playing in lock-step under a wipe — with every
 * criterion's verdict before and after.
 */
export default function Compare() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [cut, setCut] = useState<CutId>('16x9');
  const [mode, setMode] = useState<'wipe' | 'side'>('wipe');
  const [split, setSplit] = useState(50);
  const [zones, setZones] = useState(false);
  const playhead = useMemo(() => new Playhead(), []);
  const wipeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) api.project(id).then(setProject);
  }, [id]);
  // Open on the cut and frame where Kane's loop changed the most.
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

  // "Before" is the version Kane scored lowest (a one-shot draft, or a revision that broke the storyboard).
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

  const sought = useRef(false);
  useEffect(() => {
    if (sought.current || !A.comp || !B.comp || !project) return;
    sought.current = true;
    const f = corrections(project).find((x) => x.fixedIn && x.cut === cut);
    const fr = f?.c ? framesForCriterion(f.c, frames, sb)[0] ?? frames.find((x) => x.shot === f.c!.shot) : null;
    setTimeout(() => playhead.seek(fr ? fr.frame : Math.floor(B.comp!.meta.durationInFrames * 0.2)), 150);
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
  const spec = CUTS[cut];
  const tall = spec.height > spec.width;

  return (
    <div className="page compare">
      <TopBar>
        <div className="crumb">
          <span>/</span>
          <Link to={`/p/${project.id}`}>{project.title}</Link>
          <span>/</span>
          <b>Draft vs final</b>
        </div>
      </TopBar>

      <section className="cmp-hero">
        <div className="cmp-score">
          <div className="cs draft">
            <span>Before Kane · v{a}</span>
            <b>
              {sa.pass}
              <small>/{sa.total}</small>
            </b>
            <em>
              {sa.fail} check{sa.fail === 1 ? '' : 's'} failed
            </em>
          </div>
          <div className="cs-arrow">
            <span>
              {fixes.length} correction{fixes.length === 1 ? '' : 's'}
            </span>
            <svg viewBox="0 0 120 24" aria-hidden>
              <path d="M2 12h110M100 3l12 9-12 9" fill="none" stroke="currentColor" strokeWidth="2" />
            </svg>
            <span>
              {Math.max(0, project.versions.length - 1)} Kane-driven revision{project.versions.length - 1 === 1 ? '' : 's'}
            </span>
          </div>
          <div className="cs final">
            <span>After Kane · v{b}</span>
            <b>
              {sbb.pass}
              <small>/{sbb.total}</small>
            </b>
            <em>{sbb.fail ? `${sbb.fail} still failing` : 'every check passes'}</em>
          </div>
        </div>
        <div className="cmp-bar">
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
              Side by side
            </button>
          </div>
          <button type="button" className={`tbtn ${zones ? 'on' : ''}`} onClick={() => setZones(!zones)} title="Safe zones">
            <Icon name="zones" />
          </button>
        </div>
      </section>

      <section className={`cmp-stage mode-${mode} ${tall ? 'tall' : ''}`}>
        {A.comp && B.comp ? (
          mode === 'wipe' ? (
            <div
              className="wipe"
              ref={wipeRef}
              onPointerMove={(e) => {
                if (e.buttons !== 1) return;
                const r = wipeRef.current!.getBoundingClientRect();
                setSplit(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
              }}
              onPointerDown={(e) => {
                (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
                const r = wipeRef.current!.getBoundingClientRect();
                setSplit(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
              }}
            >
              <div className="wipe-layer">
                <StagePlayer comp={B.comp} cut={cut} playhead={playhead} zones={zones} maxHeight={tall ? 620 : 520} />
              </div>
              <div className="wipe-layer top" style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}>
                <StagePlayer comp={A.comp} cut={cut} playhead={playhead} zones={zones} follower maxHeight={tall ? 620 : 520} />
              </div>
              <div className="wipe-handle" style={{ left: `${split}%` }}>
                <span>
                  <Icon name="back" size={12} />
                  <Icon name="fwd" size={12} />
                </span>
              </div>
              <span className="wipe-tag l">Before Kane v{a}</span>
              <span className="wipe-tag r">After Kane v{b}</span>
            </div>
          ) : (
            <div className="side">
              <figure>
                <figcaption>Before Kane v{a}</figcaption>
                <StagePlayer comp={A.comp} cut={cut} playhead={playhead} zones={zones} follower maxHeight={tall ? 600 : 360} />
              </figure>
              <figure>
                <figcaption>After Kane v{b}</figcaption>
                <StagePlayer comp={B.comp} cut={cut} playhead={playhead} zones={zones} maxHeight={tall ? 600 : 360} />
              </figure>
            </div>
          )
        ) : (
          <p className="muted">{A.error ?? B.error ?? 'Loading both versions…'}</p>
        )}
        <CmpTransport playhead={playhead} fps={B.comp?.meta.fps ?? 30} total={B.comp?.meta.durationInFrames ?? sb.durationInFrames} />
      </section>

      <section className="cmp-table">
        <h3>
          Every criterion on the {CUT_RATIO[cut]} cut <span className="muted">· verdicts by Kane CLI</span>
        </h3>
        <div className="ct">
          <div className="ct-h">
            <span>Criterion</span>
            <span>Before v{a}</span>
            <span>Final v{b}</span>
          </div>
          {rows.map(({ c, b: x, a: y }) => {
            const fr = framesForCriterion(c, frames, sb)[0];
            return (
              <button key={c.id} type="button" className={`ct-r ${x?.state !== 'pass' && y?.state === 'pass' ? 'fixed' : ''}`} onClick={() => fr && playhead.seek(fr.frame)}>
                <span className="ct-c">
                  <b>{c.id}</b> {c.text}
                  {fr ? <em>{fr.label} · {formatTimecode(fr.seconds)}</em> : null}
                </span>
                <span className={`vpill v-${x?.state ?? 'owed'}`} title={x?.reason}>
                  {x?.state ?? 'owed'}
                </span>
                <span className={`vpill v-${y?.state ?? 'owed'}`} title={y?.reason}>
                  {y?.state ?? 'owed'}
                </span>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function CmpTransport({ playhead, fps, total }: { playhead: Playhead; fps: number; total: number }) {
  const f = useFrame(playhead);
  const playing = usePlaying(playhead);
  return (
    <div className="cmp-transport">
      <button type="button" className="tbtn play" onClick={() => playhead.toggle()} aria-label={playing ? 'Pause' : 'Play'}>
        <Icon name={playing ? 'pause' : 'play'} />
      </button>
      <input type="range" min={0} max={total - 1} value={f} onChange={(e) => playhead.seek(Number(e.target.value))} aria-label="Scrub" />
      <span className="tc">
        {formatTimecode(f / fps)} <em>/ {formatTimecode(total / fps)}</em>
      </span>
    </div>
  );
}
