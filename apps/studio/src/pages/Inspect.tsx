import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { setInspectKey } from '../lib/api';
import { Thumbnail } from '@remotion/player';
import { CUTS, isCutId, parseStoryboard, sampleFrames, formatTimecode, type CutId, type Project } from '@dailies/shared';
import { api } from '../lib/api';
import { useComposition } from '../lib/composition';
import { measureLayers, type LayerFact } from '../lib/facts';
import '../sheet.css';

/**
 * The inspection surface Kane CLI looks at. Its contract is written to
 * surface.md and ingested by Kane, so every designed test knows exactly what
 * this page shows:
 *  - a header with the cut's measured size, fps, duration and shot list;
 *  - one frame per storyboard timecode, labelled "F4 · 0:03";
 *  - a "Show safe zones" toggle;
 *  - a facts table of every named layer, measured from real browser layout;
 *  - "ready" once every frame has rendered (dailies waits for data-ready).
 */
export default function Inspect() {
  const { id, v, key } = useParams();
  setInspectKey(key);
  const [params, setParams] = useSearchParams();
  const cutParam = params.get('cut') ?? '16x9';
  const cut: CutId = isCutId(cutParam) ? cutParam : '16x9';
  const guides = params.get('guides') === '1';
  const [project, setProject] = useState<Project | null>(null);
  const [projectError, setProjectError] = useState<string | null>(null);

  useEffect(() => {
    document.title = `Contact sheet · ${CUTS[cut].ratio}`;
    if (id) api.project(id).then(setProject).catch((e) => setProjectError(e.message));
  }, [id, cut]);

  const version = useMemo<number | 'live' | null>(() => {
    if (!project) return null;
    if (v === 'live') return 'live';
    if (v === 'latest' || !v) return project.versions.at(-1)?.n ?? 'live';
    return Number(v.replace(/^v/, ''));
  }, [project, v]);

  const { comp, error } = useComposition(id, version);
  const sb = useMemo(() => (project ? parseStoryboard(project.storyboard) : null), [project]);
  const frames = useMemo(() => (sb ? sampleFrames(sb) : []), [sb]);
  const spec = CUTS[cut];
  const [facts, setFacts] = useState<Record<string, LayerFact[]>>({});
  const [ready, setReady] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fit every frame into one viewport so a single screenshot covers the cut.
  const [vp, setVp] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    const on = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const layout = useMemo(() => fit(frames.length, spec.width / spec.height, vp.w - 40, vp.h - 196), [frames.length, spec, vp]);

  useLayoutEffect(() => {
    if (!comp || !gridRef.current || !frames.length) return;
    let alive = true;
    setReady(false);
    // Two frames for layout + fonts, then measure from real geometry.
    const run = async () => {
      await document.fonts.ready;
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      if (!alive || !gridRef.current) return;
      const out: Record<string, LayerFact[]> = {};
      for (const f of frames) {
        const el = gridRef.current.querySelector<HTMLElement>(`[data-frame-box="${f.label}"]`);
        out[f.label] = el ? measureLayers(el, spec.safe) : [];
      }
      setFacts(out);
      setReady(true);
    };
    void run();
    return () => {
      alive = false;
    };
  }, [comp, frames, cut, spec.safe, layout.frameW]);

  const fatal = projectError ?? (!comp && error ? error : null);
  const durationS = comp ? comp.meta.durationInFrames / comp.meta.fps : 0;
  const vertical = spec.safe.bottom > spec.safe.top;
  const report = useMemo(() => {
    const groups: Record<'outside' | 'top' | 'bottom' | 'side', Map<string, string[]>> = { outside: new Map(), top: new Map(), bottom: new Map(), side: new Map() };
    for (const f of frames) {
      for (const l of facts[f.label] ?? []) {
        if (l.kind !== 'text' || !l.visible) continue;
        const key = `${l.layer} “${l.text}”`;
        const add = (g: keyof typeof groups) => groups[g].set(key, [...(groups[g].get(key) ?? []), f.label]);
        if (!l.inFrame) add('outside');
        if (l.bands.top) add('top');
        if (l.bands.bottom) add('bottom');
        if (l.bands.side) add('side');
      }
    }
    const fmt = (m: Map<string, string[]>) => (m.size ? [...m.entries()].map(([k, v]) => `${k} at ${v.join(', ')}`).join('; ') : 'none');
    let smallest: { key: string; px: number; frames: string[] } | null = null;
    for (const f of frames)
      for (const l of facts[f.label] ?? []) {
        if (l.kind !== 'text' || !l.visible || !l.fontPx) continue;
        const key = `${l.layer} “${l.text}”`;
        if (!smallest || l.fontPx < smallest.px) smallest = { key, px: l.fontPx, frames: [f.label] };
        else if (l.fontPx === smallest.px && smallest.key === key && !smallest.frames.includes(f.label)) smallest.frames.push(f.label);
      }
    return {
      outside: fmt(groups.outside),
      top: fmt(groups.top),
      bottom: fmt(groups.bottom),
      side: fmt(groups.side),
      smallest: smallest ? `${smallest.key} at ${smallest.px}px (${smallest.frames.join(', ')})` : 'none',
    };
  }, [facts, frames]);

  return (
    <div className="sheet" data-ready={ready && !fatal ? 'true' : fatal ? 'true' : 'false'}>
      <header className="sheet-head">
        <div className="sheet-title">
          <strong>{project?.title ?? 'Contact sheet'}</strong>
          <span>
            Cut {spec.ratio} · {spec.name} · {version === "live" ? "live working copy" : `v${version ?? "–"}`}
          </span>
        </div>
        <dl className="sheet-meta">
          <div>
            <dt>Measured size</dt>
            <dd data-fact="size">
              {spec.width}x{spec.height} px
            </dd>
          </div>
          <div>
            <dt>Frame rate</dt>
            <dd data-fact="fps">{comp ? `${comp.meta.fps} fps` : '–'}</dd>
          </div>
          <div>
            <dt>Duration</dt>
            <dd data-fact="duration">{comp ? `${durationS.toFixed(1)} s · ${comp.meta.durationInFrames} frames` : '–'}</dd>
          </div>
          <div className="sheet-shots">
            <dt>Shots (as composed)</dt>
            <dd data-fact="shots">
              {comp?.meta.shots.length
                ? comp.meta.shots.map((s) => (
                    <span key={s.n}>
                      Shot {s.n} {formatTimecode(s.from / comp.meta.fps)}–{formatTimecode((s.from + s.durationInFrames) / comp.meta.fps)} {s.title}
                    </span>
                  ))
                : 'none declared'}
            </dd>
          </div>
        </dl>
        <button
          type="button"
          className={`sheet-toggle ${guides ? 'on' : ''}`}
          aria-pressed={guides}
          onClick={() => {
            const n = new URLSearchParams(params);
            if (guides) n.delete('guides');
            else n.set('guides', '1');
            setParams(n, { replace: true });
          }}
        >
          {guides ? 'Hide safe zones' : 'Show safe zones'}
        </button>
        <span className={`sheet-ready ${ready ? 'ok' : ''}`}>{fatal ? 'error' : ready ? 'ready' : 'rendering…'}</span>
      </header>

      {ready && !fatal ? (
        <section className="sheet-report" data-fact="placement">
          <b>Text placement report · {spec.ratio}</b>
          <span>
            Visible text outside the frame: <em data-fact="outside">{report.outside}</em>
          </span>
          <span>
            Visible text in the top {spec.safe.top}% band{vertical ? '' : ' (title-safe margin)'}: <em data-fact="top-band">{report.top}</em>
          </span>
          <span>
            Visible text in the bottom {spec.safe.bottom}% band{vertical ? '' : ' (title-safe margin)'}: <em data-fact="bottom-band">{report.bottom}</em>
          </span>
          <span>
            Visible text in the side {spec.safe.left}% bands{vertical ? '' : ' (title-safe margin)'}: <em data-fact="side-band">{report.side}</em>
          </span>
          <span>
            Smallest visible text (font size at {spec.width}x{spec.height}): <em data-fact="smallest-text">{report.smallest}</em>
          </span>
        </section>
      ) : null}

      {fatal ? (
        <pre className="sheet-error" data-sheet-error>
          {fatal}
        </pre>
      ) : null}

      {comp && !fatal ? (
        <div className="sheet-grid" ref={gridRef} style={{ gridTemplateColumns: `repeat(${layout.cols}, ${layout.frameW}px)` }}>
          {frames.map((f) => (
            <figure key={f.label} className="sheet-frame">
              <figcaption>
                <b>
                  {f.label} · {f.timecode}
                </b>
                <span>frame {f.frame}</span>
              </figcaption>
              <div className="sheet-box" data-frame-box={f.label} style={{ width: layout.frameW, height: layout.frameW / (spec.width / spec.height) }}>
                <Thumbnail
                  component={comp.Component}
                  compositionWidth={spec.width}
                  compositionHeight={spec.height}
                  frameToDisplay={Math.min(f.frame, comp.meta.durationInFrames - 1)}
                  durationInFrames={comp.meta.durationInFrames}
                  fps={comp.meta.fps}
                  style={{ width: layout.frameW, height: layout.frameW / (spec.width / spec.height) }}
                />
                {guides ? <SafeBands safe={spec.safe} /> : null}
              </div>
              <FrameFlags facts={facts[f.label]} />
            </figure>
          ))}
        </div>
      ) : null}

      <section className="sheet-facts">
        <h2>Facts · every named layer, measured in this browser</h2>
        <p>
          Reserved bands for this cut: {spec.safe.label}. Positions are percent of the frame. Text is the layer’s rendered text. Position columns apply to visible text layers only (— otherwise).
        </p>
        <table>
          <thead>
            <tr>
              <th>Frame</th>
              <th>Timecode</th>
              <th>Layer</th>
              <th>Kind</th>
              <th>Text</th>
              <th>Visible</th>
              <th>Fully inside frame</th>
              <th>Touches top band</th>
              <th>Touches bottom band</th>
              <th>Touches side band</th>
              <th>Font size (px)</th>
              <th>Box (x, y, w, h %)</th>
            </tr>
          </thead>
          <tbody>
            {frames.flatMap((f) =>
              (facts[f.label] ?? []).map((l, i) => (
                <tr key={`${f.label}-${i}`} data-fact-row>
                  <td>{f.label}</td>
                  <td>{f.timecode}</td>
                  <td>{l.layer}</td>
                  <td>{l.kind}</td>
                  <td className="t">{l.text || '—'}</td>
                  <td>{l.visible ? 'yes' : 'no'}</td>
                  {l.visible && l.kind === 'text' ? (
                    <>
                      <td>{l.inFrame ? 'yes' : 'no'}</td>
                      <td>{l.bands.top ? 'yes' : 'no'}</td>
                      <td>{l.bands.bottom ? 'yes' : 'no'}</td>
                      <td>{l.bands.side ? 'yes' : 'no'}</td>
                      <td>{l.fontPx}</td>
                    </>
                  ) : (
                    <>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>—</td>
                      <td>{l.fontPx || '—'}</td>
                    </>
                  )}
                  <td className="n">
                    {l.box.map((n) => n.toFixed(1)).join(', ')}
                  </td>
                </tr>
              )),
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
}

function FrameFlags({ facts }: { facts?: LayerFact[] }) {
  const bad = (facts ?? []).filter((l) => l.kind === 'text' && l.visible && (!l.inFrame || l.bands.top || l.bands.bottom || l.bands.side));
  if (!bad.length) return <div className="sheet-flags ok">text placement ok</div>;
  return (
    <div className="sheet-flags bad">
      {bad
        .map((l) => `${l.layer}: ${[!l.inFrame && 'off frame', l.bands.top && 'top band', l.bands.bottom && 'bottom band', l.bands.side && 'side band'].filter(Boolean).join(', ')}`)
        .join(' · ')}
    </div>
  );
}

export function SafeBands({ safe }: { safe: { top: number; bottom: number; left: number; right: number } }) {
  return (
    <div className="safe-bands" aria-hidden>
      <i style={{ top: 0, left: 0, right: 0, height: `${safe.top}%` }} />
      <i style={{ bottom: 0, left: 0, right: 0, height: `${safe.bottom}%` }} />
      <i style={{ top: `${safe.top}%`, bottom: `${safe.bottom}%`, left: 0, width: `${safe.left}%` }} />
      <i style={{ top: `${safe.top}%`, bottom: `${safe.bottom}%`, right: 0, width: `${safe.right}%` }} />
    </div>
  );
}

function fit(n: number, aspect: number, W: number, H: number) {
  const gap = 14;
  const label = 40;
  let best = { cols: 1, frameW: 100 };
  for (let cols = 1; cols <= Math.max(1, n); cols++) {
    const rows = Math.ceil(n / cols);
    const byW = (W - gap * (cols - 1)) / cols;
    const byH = ((H - rows * label - gap * (rows - 1)) / rows) * aspect;
    const frameW = Math.floor(Math.min(byW, byH));
    if (frameW > best.frameW) best = { cols, frameW };
  }
  return best;
}
