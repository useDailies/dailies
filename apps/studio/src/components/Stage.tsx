import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Player, type PlayerRef } from '@remotion/player';
import { CUTS, type CutId } from '@dailies/shared';
import type { LoadedComposition } from '../lib/composition';
import type { Playhead } from '../lib/playhead';
import { SafeBands } from '../pages/Inspect';
import { measureLayers, type LayerFact } from '../lib/facts';
import { useFrame } from '../lib/playhead';

/**
 * The viewer: a Remotion Player sized to the cut, with optional overlays —
 * safe-zone bands and an X-ray of every named layer (the same geometry Kane
 * reads from the contact sheet).
 */
export function StagePlayer({
  comp,
  cut,
  playhead,
  zones,
  xray,
  follower,
  maxHeight,
  badge,
  dim,
  mood,
}: {
  comp: LoadedComposition;
  cut: CutId;
  playhead: Playhead;
  zones?: boolean;
  xray?: boolean;
  follower?: boolean;
  maxHeight?: number;
  badge?: React.ReactNode;
  dim?: boolean;
  /** what the agents are doing to this frame right now */
  mood?: 'writing' | 'judging' | 'blocked' | 'verified' | null;
}) {
  const ref = useRef<PlayerRef>(null);
  const box = useRef<HTMLDivElement>(null);
  const spec = CUTS[cut];
  const [size, setSize] = useState({ w: 0, h: 0 });

  useLayoutEffect(() => {
    if (!box.current) return;
    const ro = new ResizeObserver(([e]) => {
      const W = e.contentRect.width;
      const H = maxHeight ?? e.contentRect.height;
      const ar = spec.width / spec.height;
      let w = W;
      let h = W / ar;
      if (h > H) {
        h = H;
        w = H * ar;
      }
      setSize({ w: Math.floor(w), h: Math.floor(h) });
    });
    ro.observe(box.current);
    return () => ro.disconnect();
  }, [spec, maxHeight]);

  useEffect(() => {
    const p = ref.current;
    if (!p) return;
    if (follower) {
      playhead.followers.push(p);
      p.seekTo(playhead.frame);
      return () => {
        playhead.followers = playhead.followers.filter((x) => x !== p);
      };
    }
    playhead.attach(p);
    p.seekTo(Math.min(playhead.frame, comp.meta.durationInFrames - 1));
    const onFrame = (e: { detail: { frame: number } }) => playhead.set(e.detail.frame);
    const onPlay = () => playhead.setPlaying(true);
    const onPause = () => playhead.setPlaying(false);
    p.addEventListener('frameupdate', onFrame);
    p.addEventListener('seeked', onFrame);
    p.addEventListener('play', onPlay);
    p.addEventListener('pause', onPause);
    return () => {
      p.removeEventListener('frameupdate', onFrame);
      p.removeEventListener('seeked', onFrame);
      p.removeEventListener('play', onPlay);
      p.removeEventListener('pause', onPause);
      if (playhead.player === p) playhead.attach(null);
    };
  }, [comp, cut, follower, playhead, size.w > 0]);

  return (
    <div className="stage-box" ref={box}>
      {size.w > 0 ? (
        <div className={`stage-frame ${dim ? 'dim' : ''} ${mood ?? ''}`} style={{ width: size.w, height: size.h }}>
          <Player
            ref={ref}
            component={comp.Component}
            compositionWidth={spec.width}
            compositionHeight={spec.height}
            durationInFrames={comp.meta.durationInFrames}
            fps={comp.meta.fps}
            style={{ width: size.w, height: size.h }}
            loop
            clickToPlay={false}
            doubleClickToFullscreen
            spaceKeyToPlayOrPause={false}
            acknowledgeRemotionLicense
          />
          {zones ? <SafeBands safe={spec.safe} /> : null}
          {xray ? <XRay host={box} playhead={playhead} safe={spec.safe} /> : null}
          {badge}
        </div>
      ) : null}
    </div>
  );
}

function XRay({ host, playhead, safe }: { host: React.RefObject<HTMLDivElement | null>; playhead: Playhead; safe: (typeof CUTS)['16x9']['safe'] }) {
  const frame = useFrame(playhead);
  const [layers, setLayers] = useState<LayerFact[]>([]);
  useEffect(() => {
    const el = host.current?.querySelector<HTMLElement>('.stage-frame');
    if (!el) return;
    const raf = requestAnimationFrame(() => setLayers(measureLayers(el, safe)));
    return () => cancelAnimationFrame(raf);
  }, [frame, host, safe]);
  return (
    <div className="xray" aria-hidden>
      {layers
        .filter((l) => l.visible)
        .map((l, i) => (
          <div
            key={i}
            className={`xray-box ${l.inSafe ? '' : 'out'}`}
            style={{ left: `${l.box[0]}%`, top: `${l.box[1]}%`, width: `${l.box[2]}%`, height: `${l.box[3]}%` }}
          >
            <span>{l.layer}</span>
          </div>
        ))}
    </div>
  );
}
