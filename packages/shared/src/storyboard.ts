import { ALL_CUT_IDS, type CutId } from './cuts.ts';

/**
 * A storyboard is plain markdown. dailies reads only what it needs to sample
 * frames; Kane CLI reads the whole document to derive acceptance criteria.
 *
 *   Length 12 seconds at 30 fps. Deliver three cuts: 16:9, 9:16, 1:1.
 *   ## Shot 1 (0:00–0:03) Product hero
 *   - Caption reads exactly: Run the city
 */
export interface StoryboardLine {
  /** 1-based line number in the source file (what Kane cites as L4-L4). */
  n: number;
  text: string;
  /** Shot this line belongs to, if any. */
  shot: number | null;
  kind: 'title' | 'heading' | 'bullet' | 'text' | 'blank';
}

export interface StoryboardShot {
  n: number;
  title: string;
  /** seconds */
  start: number;
  /** seconds */
  end: number;
  line: number;
}

export interface Storyboard {
  title: string;
  fps: number;
  /** seconds */
  duration: number;
  durationInFrames: number;
  cuts: CutId[];
  shots: StoryboardShot[];
  lines: StoryboardLine[];
  /** Explicit timecodes mentioned anywhere (seconds), e.g. "absent at 0:03". */
  moments: number[];
}

const TIME = /(\d{1,2}):(\d{2}(?:\.\d+)?)/g;

export function parseTimecode(tc: string): number {
  const m = tc.match(/(\d{1,2}):(\d{2}(?:\.\d+)?)/);
  if (!m) return Number.NaN;
  return Number(m[1]) * 60 + Number(m[2]);
}

/** 3.5 → "0:03.5", 3 → "0:03" */
export function formatTimecode(seconds: number): string {
  const s = Math.max(0, seconds);
  const min = Math.floor(s / 60);
  const rest = s - min * 60;
  const whole = Math.floor(rest + 1e-9);
  const frac = rest - whole;
  const base = `${min}:${String(whole).padStart(2, '0')}`;
  if (frac < 0.05) return base;
  return `${base}.${Math.round(frac * 10) % 10}`;
}

export function parseStoryboard(md: string): Storyboard {
  const raw = md.replace(/\r\n/g, '\n').split('\n');
  const lines: StoryboardLine[] = [];
  const shots: StoryboardShot[] = [];
  let title = '';
  let currentShot: number | null = null;
  const moments = new Set<number>();

  raw.forEach((text, i) => {
    const n = i + 1;
    const trimmed = text.trim();
    let kind: StoryboardLine['kind'] = 'text';
    if (!trimmed) kind = 'blank';
    else if (/^#\s/.test(trimmed)) {
      kind = 'title';
      if (!title) title = trimmed.replace(/^#\s+/, '');
    } else if (/^#{2,}\s/.test(trimmed)) {
      kind = 'heading';
      const shot = trimmed.match(/shot\s+(\d+)/i);
      const times = [...trimmed.matchAll(TIME)].map((m) => Number(m[1]) * 60 + Number(m[2]));
      if (shot && times.length >= 2) {
        currentShot = Number(shot[1]);
        const after = trimmed.replace(/^#+\s*/, '').replace(/shot\s+\d+\s*/i, '').replace(/\([^)]*\)/, '').trim();
        shots.push({ n: currentShot, title: after || `Shot ${currentShot}`, start: times[0], end: times[1], line: n });
      } else {
        currentShot = null;
      }
    } else if (/^[-*]\s/.test(trimmed)) {
      kind = 'bullet';
      for (const m of trimmed.matchAll(TIME)) moments.add(Number(m[1]) * 60 + Number(m[2]));
    }
    lines.push({ n, text, shot: kind === 'heading' || kind === 'title' ? (kind === 'heading' ? currentShot : null) : currentShot, kind });
  });

  const header = raw.slice(0, 12).join(' ');
  const fps = Number(header.match(/(\d{2,3})\s*fps/i)?.[1] ?? 30);
  const lastShotEnd = shots.length ? Math.max(...shots.map((s) => s.end)) : 0;
  const durationMatch = header.match(/(\d+(?:\.\d+)?)\s*(?:seconds?|secs?|s)\b/i);
  const duration = durationMatch ? Number(durationMatch[1]) : lastShotEnd || 10;

  const cuts: CutId[] = [];
  for (const m of header.matchAll(/(\d{1,2})\s*:\s*(\d{1,2})/g)) {
    const id = `${m[1]}x${m[2]}` as CutId;
    if (ALL_CUT_IDS.includes(id) && !cuts.includes(id)) cuts.push(id);
  }

  return {
    title: title || 'Untitled storyboard',
    fps,
    duration,
    durationInFrames: Math.round(duration * fps),
    cuts: cuts.length ? cuts : ['16x9'],
    shots,
    lines,
    moments: [...moments].filter((t) => t <= duration).sort((a, b) => a - b),
  };
}

export interface SampleFrame {
  /** "F4" */
  label: string;
  frame: number;
  seconds: number;
  timecode: string;
  shot: number | null;
  /** why this frame is on the sheet */
  reason: string;
}

/**
 * Choose the frames Kane looks at. Coverage comes from the storyboard, not from
 * a fixed stride: the first frame, middle and last frame of every shot, plus
 * every moment the storyboard names. Capped so one sheet stays one screenshot.
 */
export function sampleFrames(sb: Storyboard, max = 12): SampleFrame[] {
  const fps = sb.fps;
  const last = sb.durationInFrames - 1;
  const picks = new Map<number, string>();
  const add = (frame: number, reason: string) => {
    const f = Math.min(last, Math.max(0, Math.round(frame)));
    if (!picks.has(f)) picks.set(f, reason);
  };

  for (const m of sb.moments) add(m * fps, 'named in storyboard');
  for (const s of sb.shots) {
    add(s.start * fps + Math.min(6, (s.end - s.start) * fps * 0.1), `shot ${s.n} opens`);
    add(((s.start + s.end) / 2) * fps, `shot ${s.n} middle`);
    add(s.end * fps - Math.min(6, (s.end - s.start) * fps * 0.1), `shot ${s.n} closes`);
  }
  if (!sb.shots.length) {
    for (let i = 0; i <= 4; i++) add((last * i) / 4, 'even sample');
  }

  let frames = [...picks.entries()].sort((a, b) => a[0] - b[0]);
  // Merge picks closer than 4 frames apart (keeps the earlier, named one).
  frames = frames.filter((f, i) => i === 0 || f[0] - frames[i - 1][0] >= 4);
  if (frames.length > max) {
    // Keep what the storyboard names and where each shot opens and closes; thin the middles.
    const must = (r: string) => r === 'named in storyboard' || / (opens|closes)$/.test(r);
    const named = frames.filter((f) => must(f[1]));
    const rest = frames.filter((f) => !must(f[1]));
    const room = Math.max(0, max - named.length);
    const step = rest.length / Math.max(1, room);
    const kept = Array.from({ length: room }, (_, i) => rest[Math.floor(i * step)]);
    frames = [...named, ...kept].sort((a, b) => a[0] - b[0]);
  }

  return frames.map(([frame, reason], i) => {
    const seconds = frame / fps;
    const shot = sb.shots.find((s) => seconds >= s.start && seconds < s.end)?.n ?? null;
    return { label: `F${i + 1}`, frame, seconds, timecode: formatTimecode(seconds), shot, reason };
  });
}
