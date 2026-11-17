import { useMemo, useRef, useState } from 'react';
import {
  checkKey,
  formatTimecode,
  framesForCriterion,
  type Criterion,
  type CutId,
  type SampleFrame,
  type Storyboard,
} from '@dailies/shared';
import type { CompositionMeta } from '../lib/composition';
import { useFrame, type Playhead } from '../lib/playhead';
import { CUT_RATIO, type Cell } from '../lib/verdicts';

/**
 * A timeline built for review, not editing. Rows, top to bottom:
 *   ruler · storyboard shots (as written) · composition shots (as Claude
 *   declared them) · Kane's sampled frames · one lane of check pins per cut.
 * A pin sits on the frame Kane judged; its colour is the verdict.
 */
export function Timeline({
  meta,
  sb,
  frames,
  criteria,
  cuts,
  cells,
  running,
  playhead,
  activeCut,
  onCut,
  onPick,
  focusAc,
}: {
  meta: CompositionMeta | null;
  sb: Storyboard;
  frames: SampleFrame[];
  criteria: Criterion[];
  cuts: CutId[];
  cells: Map<string, Cell>;
  running: Set<string>;
  playhead: Playhead;
  activeCut: CutId;
  onCut: (c: CutId) => void;
  onPick: (ac: string, cut: CutId) => void;
  focusAc?: string | null;
}) {
  const fps = meta?.fps ?? sb.fps;
  // The storyboard sets the scale; a composition that runs long or short shows against it.
  const total = Math.max(sb.durationInFrames, meta?.shots.length ? meta.durationInFrames : 0, 1);
  const pct = (f: number) => `${(Math.min(f, total) / total) * 100}%`;
  const track = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<{ x: number; y: number; items: { c: Criterion; cell: Cell | undefined; cut: CutId }[] } | null>(null);

  const scrub = (clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (!r) return;
    const f = ((clientX - r.left) / r.width) * total;
    playhead.seek(Math.max(0, Math.min(total - 1, f)));
  };

  const seconds = Math.ceil(total / fps);
  const ticks = useMemo(() => Array.from({ length: seconds + 1 }, (_, s) => s), [seconds]);

  // Group pins per cut by the frame they point at.
  const lanes = useMemo(() => {
    return cuts.map((cut) => {
      const groups = new Map<string, { at: number | null; label: string; items: Criterion[] }>();
      for (const c of criteria.filter((x) => x.cuts.includes(cut))) {
        const fr = framesForCriterion(c, frames, sb);
        const targets = fr.length ? fr : [null];
        for (const f of targets) {
          const key = f ? f.label : 'all';
          if (!groups.has(key)) groups.set(key, { at: f ? f.frame : null, label: f ? `${f.label} · ${f.timecode}` : 'Whole cut', items: [] });
          groups.get(key)!.items.push(c);
        }
      }
      return { cut, groups: [...groups.values()] };
    });
  }, [cuts, criteria, frames, sb]);

  const stateOf = (c: Criterion, cut: CutId): string => {
    const k = checkKey(c.id, cut);
    if (running.has(k)) return 'running';
    return cells.get(k)?.state ?? 'owed';
  };
  const worst = (items: Criterion[], cut: CutId) => {
    const s = items.map((c) => stateOf(c, cut));
    for (const w of ['fail', 'running', 'unknown', 'owed', 'pass']) if (s.includes(w)) return w;
    return 'owed';
  };

  return (
    <div className="timeline" onMouseLeave={() => setHover(null)}>
      <div className="tl-labels">
        <div className="tl-l tl-l-ruler">{formatTimecode(0)}</div>
        <div className="tl-l">Storyboard</div>
        <div className="tl-l">Composed</div>
        <div className="tl-l">Kane frames</div>
        {lanes.map(({ cut, groups }) => {
          const g = groups.find((x) => x.at === null);
          const st = g ? worst(g.items, cut) : null;
          return (
            <button key={cut} type="button" className={`tl-l tl-l-cut ${cut === activeCut ? 'on' : ''}`} onClick={() => onCut(cut)}>
              <span className={`cut-glyph cut-${cut}`} />
              {CUT_RATIO[cut]}
              {g ? (
                <span
                  className={`lane-all pin-${st}`}
                  onMouseEnter={(e) => {
                    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setHover({ x: r.left + r.width / 2, y: r.top, items: g.items.map((c) => ({ c, cell: cells.get(checkKey(c.id, cut)), cut })) });
                  }}
                  onMouseLeave={() => setHover(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCut(cut);
                    const failing = g.items.find((c) => stateOf(c, cut) === 'fail') ?? g.items[0];
                    onPick(failing.id, cut);
                  }}
                  title="Checks that apply to the whole cut"
                >
                  all {g.items.length}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        className="tl-tracks"
        ref={track}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest('.pin')) return;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          scrub(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons === 1 && !(e.target as HTMLElement).closest('.pin')) scrub(e.clientX);
        }}
      >
        <div className="tl-row tl-ruler">
          {ticks.map((s) => (
            <div key={s} className="tick" style={{ left: pct(s * fps) }}>
              <span>{formatTimecode(s)}</span>
            </div>
          ))}
          {Array.from({ length: Math.floor(total / (fps / 2)) }, (_, i) => (
            <i key={i} className="tick-minor" style={{ left: pct((i * fps) / 2) }} />
          ))}
        </div>

        <div className="tl-row tl-shots">
          {sb.shots.map((s) => (
            <div key={s.n} className={`shot shot-${(s.n - 1) % 6}`} style={{ left: pct(s.start * fps), width: pct((s.end - s.start) * fps) }} title={`Shot ${s.n} · ${formatTimecode(s.start)}–${formatTimecode(s.end)} · ${s.title}`}>
              <b>{s.n}</b> {s.title}
            </div>
          ))}
        </div>

        <div className="tl-row tl-shots composed">
          {meta?.shots.length ? (
            meta.shots.map((s) => {
              const planned = sb.shots.find((x) => x.n === s.n);
              const off = planned ? Math.abs(planned.start * fps - s.from) > 1 || Math.abs(planned.end * fps - (s.from + s.durationInFrames)) > 1 : false;
              return (
                <div
                  key={s.n}
                  className={`shot shot-${(s.n - 1) % 6} ${off ? 'off' : ''}`}
                  style={{ left: pct(s.from), width: pct(s.durationInFrames) }}
                  title={`Composed shot ${s.n}: frames ${s.from}–${s.from + s.durationInFrames}${off ? ' · differs from storyboard' : ''}`}
                >
                  <b>{s.n}</b> {s.title}
                </div>
              );
            })
          ) : (
            <span className="tl-empty">No shots declared yet</span>
          )}
        </div>

        <div className="tl-row tl-frames">
          {frames.map((f) => (
            <button key={f.label} type="button" className="fmark" style={{ left: pct(f.frame) }} onClick={() => playhead.seek(f.frame)} title={`${f.label} · ${f.timecode} · ${f.reason}`}>
              <i />
              <span>{f.label}</span>
            </button>
          ))}
        </div>

        {lanes.map(({ cut, groups }) => (
          <div key={cut} className={`tl-row tl-lane ${cut === activeCut ? 'on' : ''}`}>
            {groups.some((g) => g.at === null) ? <i className={`lane-wash wash-${worst(groups.find((g) => g.at === null)!.items, cut)}`} /> : null}
            {groups.filter((g) => g.at !== null).map((g) => {
              const st = worst(g.items, cut);
              const focused = focusAc ? g.items.some((c) => c.id === focusAc) : false;
              return (
                <button
                  key={g.label}
                  type="button"
                  className={`pin pin-${st} ${g.at === null ? 'pin-global' : ''} ${focused ? 'focus' : ''}`}
                  style={g.at === null ? undefined : { left: pct(g.at) }}
                  onMouseEnter={(e) => {
                    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                    setHover({ x: r.left + r.width / 2, y: r.top, items: g.items.map((c) => ({ c, cell: cells.get(checkKey(c.id, cut)), cut })) });
                  }}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => {
                    if (g.at !== null) playhead.seek(g.at);
                    onCut(cut);
                    const failing = g.items.find((c) => stateOf(c, cut) === 'fail') ?? g.items[0];
                    onPick(failing.id, cut);
                  }}
                  aria-label={`${g.items.length} checks at ${g.label} on ${CUT_RATIO[cut]}: ${st}`}
                >
                  <span className="pin-count">{g.items.length}</span>
                </button>
              );
            })}
          </div>
        ))}

        <Head playhead={playhead} total={total} fps={fps} />
      </div>

      {hover ? (
        <div className="tl-tip" style={{ left: hover.x, top: hover.y }}>
          {hover.items.slice(0, 6).map(({ c, cell, cut }) => (
            <div key={c.id} className={`tip-row tip-${running.has(checkKey(c.id, cut)) ? 'running' : (cell?.state ?? 'owed')}`}>
              <b>{c.id}</b>
              <span>{c.text}</span>
              {cell?.reason && cell.state !== 'pass' ? <em>{cell.reason}</em> : null}
            </div>
          ))}
          {hover.items.length > 6 ? <div className="tip-more">+{hover.items.length - 6} more</div> : null}
        </div>
      ) : null}
    </div>
  );
}

function Head({ playhead, total, fps }: { playhead: Playhead; total: number; fps: number }) {
  const f = useFrame(playhead);
  return (
    <div className="playhead" style={{ left: `${(Math.min(f, total) / total) * 100}%` }}>
      <span>{formatTimecode(f / fps)}</span>
    </div>
  );
}
