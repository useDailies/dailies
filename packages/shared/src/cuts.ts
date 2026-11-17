/**
 * Delivery cuts. A cut is one aspect ratio of the same composition.
 *
 * Safe zones are the bands a platform covers with its own UI. The 9:16 numbers
 * follow the Meta Reels guidance (keep ~14% top, ~35% bottom and ~6% sides clear);
 * 16:9 and 1:1 use the broadcast "title safe" convention of 5% on every side.
 */
export type CutId = '16x9' | '9x16' | '1x1' | '4x5';

export interface SafeZone {
  /** Percent of frame height reserved at the top. */
  top: number;
  /** Percent of frame height reserved at the bottom. */
  bottom: number;
  /** Percent of frame width reserved on the left. */
  left: number;
  /** Percent of frame width reserved on the right. */
  right: number;
  /** How the zone is described on the inspection sheet. */
  label: string;
}

export interface Cut {
  id: CutId;
  /** "9:16" */
  ratio: string;
  /** "Vertical" */
  name: string;
  width: number;
  height: number;
  safe: SafeZone;
}

const TITLE_SAFE: SafeZone = { top: 5, bottom: 5, left: 5, right: 5, label: 'title-safe 5% on every side' };

export const CUTS: Record<CutId, Cut> = {
  '16x9': { id: '16x9', ratio: '16:9', name: 'Landscape', width: 1920, height: 1080, safe: TITLE_SAFE },
  '9x16': {
    id: '9x16',
    ratio: '9:16',
    name: 'Vertical',
    width: 1080,
    height: 1920,
    safe: { top: 14, bottom: 35, left: 6, right: 6, label: 'platform UI bands: top 14%, bottom 35%, sides 6%' },
  },
  '1x1': { id: '1x1', ratio: '1:1', name: 'Square', width: 1080, height: 1080, safe: TITLE_SAFE },
  '4x5': { id: '4x5', ratio: '4:5', name: 'Portrait feed', width: 1080, height: 1350, safe: TITLE_SAFE },
};

export const ALL_CUT_IDS: CutId[] = ['16x9', '9x16', '1x1', '4x5'];

export function isCutId(v: unknown): v is CutId {
  return typeof v === 'string' && (ALL_CUT_IDS as string[]).includes(v);
}

/** "16:9" | "16x9" | "16 : 9" → "16x9" */
export function cutFromRatio(text: string): CutId | null {
  const m = text.match(/(\d{1,2})\s*[:x×]\s*(\d{1,2})/);
  if (!m) return null;
  const id = `${m[1]}x${m[2]}`;
  return isCutId(id) ? id : null;
}
