import { useParams, useSearchParams } from 'react-router-dom';
import { Thumbnail } from '@remotion/player';
import { CUTS, type CutId } from '@dailies/shared';
import { useComposition } from '../lib/composition';

/** One frame of one version at native size, for stills in the ad (video/src/stills.mjs). */
export default function Still() {
  const { id, v } = useParams();
  const [q] = useSearchParams();
  const cut = CUTS[(q.get('cut') as CutId) ?? '16x9'];
  const frame = Number(q.get('frame') ?? 0);
  const { comp } = useComposition(id, v === 'live' ? 'live' : Number(v));
  if (!comp) return null;
  return (
    <div style={{ width: cut.width, height: cut.height, overflow: 'hidden' }} data-ready="true">
      <Thumbnail component={comp.Component} compositionWidth={cut.width} compositionHeight={cut.height} frameToDisplay={frame} durationInFrames={comp.meta.durationInFrames} fps={comp.meta.fps} style={{ width: cut.width, height: cut.height }} />
    </div>
  );
}
