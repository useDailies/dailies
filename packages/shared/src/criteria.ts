import { CUTS, type CutId } from './cuts.ts';
import { formatTimecode, type SampleFrame, type Storyboard } from './storyboard.ts';
import type { CheckResult, Criterion, DesignedTest } from './types.ts';

const STOP = new Set(
  'the a an of and or in on at to by is are be with from for every each all cut cuts frame shot that this its it as no not exactly reads'.split(
    ' ',
  ),
);

function words(s: string): Set<string> {
  return new Set(
    s
      .toLowerCase()
      .replace(/[“”"'’]/g, ' ')
      .split(/[^a-z0-9:%.]+/)
      .filter((w) => w.length > 1 && !STOP.has(w)),
  );
}

/** Which cuts a criterion applies to, read from its own words. */
export function cutsForText(text: string, available: CutId[]): CutId[] {
  const t = text.toLowerCase();
  const hit: CutId[] = [];
  // "a portrait frame", "the vertical cut", "9:16"; Kane words cuts in many ways.
  if (/9\s*:\s*16|vertical|portrait|tall cut|stories|reels|tiktok|shorts\b/.test(t)) hit.push('9x16');
  if (/16\s*:\s*9|landscape|widescreen|wide cut|horizontal/.test(t)) hit.push('16x9');
  if (/1\s*:\s*1|square/.test(t)) hit.push('1x1');
  if (/4\s*:\s*5/.test(t)) hit.push('4x5');
  const scoped = hit.filter((c) => available.includes(c));
  return scoped.length ? scoped : [...available];
}

const RATIOS = new Set(['16:9', '9:16', '1:1', '4:5', '4:3', '21:9']);

/** Timecodes named in a sentence ("by 0:05"), ignoring aspect ratios like 9:16. */
export function timesForText(text: string, maxSeconds = Infinity): number[] {
  return [...text.matchAll(/(\d{1,2}):(\d{2}(?:\.\d+)?)/g)]
    .filter((m) => !RATIOS.has(`${Number(m[1])}:${Number(m[2])}`) && /^\d{2}/.test(m[2]))
    .map((m) => Number(m[1]) * 60 + Number(m[2]))
    .filter((t) => t <= maxSeconds);
}

/**
 * Which shot a criterion talks about: "shot 2", "the second shot", "the opening
 * shot", or a shot named by its storyboard title ("the hero shot" → "Product hero").
 */
export function shotForText(text: string, sb?: Storyboard): number | null {
  const t = text.toLowerCase();
  const n = t.match(/shot\s+(\d+)/);
  if (n) return Number(n[1]);
  const ord = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth'];
  const o = t.match(/\b(first|second|third|fourth|fifth|sixth)\s+shot/);
  if (o) return ord.indexOf(o[1]) + 1;
  if (!sb?.shots.length) return null;
  if (/\b(opening|intro)\s+shot/.test(t)) return sb.shots[0].n;
  if (/\b(closing|final|last|end)\s+shot/.test(t)) return sb.shots.at(-1)!.n;
  const named = t.match(/\b([a-z-]+(?:\s+[a-z-]+)?)\s+shot\b/);
  if (named) {
    const want = named[1].split(/[\s-]+/).filter((w) => w.length > 2 && !STOP.has(w));
    for (const s of sb.shots) {
      const title = s.title.toLowerCase();
      if (want.some((w) => title.includes(w))) return s.n;
    }
    if (/call.to.action|cta/.test(t)) return sb.shots.find((s) => /call to action|cta/i.test(s.title))?.n ?? null;
  }
  return null;
}

/** Best storyboard line for a criterion by content-word overlap (dailies' mapping, not Kane's citation). */
export function lineForText(text: string, sb: Storyboard, shot: number | null): number | null {
  const want = words(text);
  let best: { n: number; score: number } | null = null;
  for (const l of sb.lines) {
    if (l.kind !== 'bullet' && l.kind !== 'text') continue;
    const have = words(l.text);
    let inter = 0;
    for (const w of want) if (have.has(w)) inter++;
    let score = inter / Math.max(1, Math.min(want.size, have.size));
    if (shot !== null && l.shot === shot) score += 0.15;
    if (!best || score > best.score) best = { n: l.n, score };
  }
  return best && best.score >= 0.34 ? best.n : null;
}

export function enrichCriterion(
  base: Pick<Criterion, 'id' | 'text'> & Partial<Criterion>,
  sb: Storyboard,
  tests: DesignedTest[],
): Criterion {
  const shot = shotForText(base.text, sb);
  return {
    risk: base.risk,
    expected: base.expected,
    id: base.id,
    text: base.text,
    cuts: cutsForText(base.text, sb.cuts),
    times: timesForText(base.text, sb.duration),
    shot,
    line: lineForText(base.text, sb, shot),
    tests: tests.filter((t) => t.steps.some((s) => s.verifies.includes(base.id))).map((t) => t.id),
  };
}

/** The frames on a sheet that matter for this criterion. */
export function framesForCriterion(c: Criterion, frames: SampleFrame[], sb: Storyboard): SampleFrame[] {
  if (c.times.length) {
    const near = frames.filter((f) => c.times.some((t) => Math.abs(f.seconds - t) < 0.2));
    if (near.length) return near;
  }
  if (c.shot !== null) {
    const s = sb.shots.find((x) => x.n === c.shot);
    if (s) return frames.filter((f) => f.seconds >= s.start && f.seconds < s.end);
  }
  return [];
}

/**
 * The condition string handed to `kane-cli run --analyzer-only --condition`.
 * Kane is told where to look (frame labels) and which instrument to trust for
 * exact values (the facts table), so one screenshot answers the whole criterion.
 */
export function conditionFor(c: Criterion, cut: CutId, frames: SampleFrame[], sb: Storyboard): string {
  const spec = CUTS[cut];
  const rel = framesForCriterion(c, frames, sb);
  const parts: string[] = [`[${c.id}] ${c.text}`];
  parts.push(
    `This sheet shows only the ${spec.ratio} cut (${spec.width}x${spec.height}). Judge only what the criterion requires of this cut; ignore any part about other cuts.`,
  );
  if (rel.length) parts.push(`Relevant frame${rel.length > 1 ? 's' : ''}: ${rel.map((f) => `${f.label} (${f.timecode})`).join(', ')}.`);
  if (/exactly|reads|label|spelled|wording|copy/i.test(c.text))
    parts.push('Read exact wording from the facts table Text column (the rendered text), not from the pixels.');
  if (/band|bottom \d|top \d|safe|reserved|inside the frame|within the frame|outside the frame|occup/i.test(c.text))
    parts.push(
      'Decide position from the Text placement report above the frames (it lists every visible text layer that leaves the frame or touches a reserved band; "none" means none) and the per-frame flags under each frame.',
    );
  if (/(fully )?(inside|within) the frame|in frame|cropped|cut off/i.test(c.text) && !/text|caption|headline|button|label|wordmark|price/i.test(c.text))
    parts.push(
      'Whether a graphic is fully inside the frame is measured in the facts table "Fully inside frame" column for that layer (from its box). The hatched safe-zone shading is only a guide; it is not the frame edge.',
    );
  if (/visible|absent|appear|hidden|not shown|by \d|at \d/i.test(c.text) && !/inside the frame/i.test(c.text))
    parts.push('Whether a layer can be seen in a frame is in the facts table Visible column and in the picture.');
  if (/\bpx\b|font|type size|legib|point size|text size|set at/i.test(c.text))
    parts.push('Font sizes are in the facts table Font size column (px at full resolution) and in the report line for the smallest visible text.');
  if (/fps|frames per second|seconds|lasts|duration|dimension|declares|shot at|occupies \d/i.test(c.text))
    parts.push('Duration, frame rate, pixel size and the declared shot timings are in the sheet header.');
  const rule = placementRule(c.text);
  if (rule)
    parts.push(
      `The criterion is violated if the report line "${rule.line}" names any layer; it holds only if that line reads "none".`,
    );
  parts.push('Answer true only if the criterion, as written, holds on this cut; answer false if it is violated.');
  return parts.join(' ');
}

/**
 * A placement rule the sheet measures directly: "no text in the bottom 35%",
 * "…top 14%…", "…side bands…", "all text stays inside the frame". Returns the
 * placement-report line that decides it.
 */
export function placementRule(text: string): { band: 'bottom' | 'top' | 'side' | 'outside'; line: string } | null {
  const t = text.toLowerCase();
  const negative = /\b(no|never|not|nothing|without|free of|clear of|stays?|remains?|kept)\b/.test(t);
  if (!negative) return null;
  const pct = (re: RegExp) => t.match(re)?.[1];
  if (/bottom\s*\d+\s*%|bottom band|bottom reserved/.test(t)) return { band: 'bottom', line: `Visible text in the bottom ${pct(/bottom\s*(\d+)\s*%/) ?? '35'}% band` };
  if (/top\s*\d+\s*%|top band|top reserved/.test(t)) return { band: 'top', line: `Visible text in the top ${pct(/top\s*(\d+)\s*%/) ?? '14'}% band` };
  if (/side\s*(\d+\s*%|band)/.test(t)) return { band: 'side', line: 'Visible text in the side' };
  if (/(inside|within) the frame|leaves? the frame|outside the frame|off[- ]frame|cropped/.test(t)) return { band: 'outside', line: 'Visible text outside the frame' };
  return null;
}

/**
 * The sheet's measured placement report vs a placement rule. Returns the report
 * line when it shows a violation ("…: button “Pre-order now” at F11, F12").
 */
export function measuredViolation(text: string, report: string | undefined): string | null {
  const rule = placementRule(text);
  if (!rule || !report) return null;
  const line = report.split('\n').find((l) => l.startsWith(rule.line));
  if (!line) return null;
  const value = line.slice(line.indexOf(':') + 1).trim();
  return value && value !== 'none' ? line.trim() : null;
}

/** "Reading the F4 frame caption…" → ["F4"] */
export function framesInReason(reason: string): string[] {
  return [...new Set([...reason.matchAll(/\bF(\d{1,2})\b/g)].map((m) => `F${m[1]}`))];
}

export interface Tally {
  pass: number;
  fail: number;
  unknown: number;
  owed: number;
  total: number;
}

export function tally(results: CheckResult[], expected: number): Tally {
  const pass = results.filter((r) => r.verdict === 'pass').length;
  const fail = results.filter((r) => r.verdict === 'fail').length;
  const unknown = results.filter((r) => r.verdict === 'unknown').length;
  return { pass, fail, unknown, owed: Math.max(0, expected - results.length), total: expected };
}

export function checkKey(ac: string, cut: CutId): string {
  return `${ac}@${cut}`;
}

export { formatTimecode };
