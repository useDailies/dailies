/**
 * dailies brand kit generator.
 *
 *   node brand/src/build.mjs
 *
 * Writes every vector asset to brand/svg/ and copies the web set to
 * apps/studio/public/brand/. The wordmark is real outlines (Bricolage
 * Grotesque 700, opentype.js), so it renders identically everywhere.
 *
 * The idea: a viewfinder (the frame Claude Code composes) holding a check
 * (Kane CLI proving it). In the wordmark, the two i-dots are the two agents:
 * clay for Claude Code, cobalt for Kane CLI.
 */
import { mkdirSync, writeFileSync, copyFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'svg');
const WEB = join(ROOT, '..', 'apps/studio/public/brand');
mkdirSync(OUT, { recursive: true });
mkdirSync(WEB, { recursive: true });

export const C = {
  ink: '#17161A',
  paper: '#F7F7F5',
  canvas: '#F2F1EE',
  white: '#FFFFFF',
  claude: '#D97757',
  accent: '#5B4BDB',
  kane: '#3B82F6',
  pass: '#22C55E',
  fail: '#D92D20',
};

const grad = (id) =>
  `<linearGradient id="${id}" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${C.claude}"/><stop offset=".55" stop-color="${C.accent}"/><stop offset="1" stop-color="${C.kane}"/></linearGradient>`;

/* ------------------------------------------------------------------ mark */

/** The mark on a 64-unit grid. `tile` = background colour or null for none. */
function markInner({ frame, check, uid }) {
  const corner = (d) => `<path d="${d}" fill="none" stroke="${frame}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>`;
  const x0 = 15, x1 = 49, y0 = 19, y1 = 45, L = 7.5;
  return [
    corner(`M${x0} ${y0 + L}V${y0 + 2}a2 2 0 0 1 2-2H${x0 + L}`),
    corner(`M${x1 - L} ${y0}H${x1 - 2}a2 2 0 0 1 2 2V${y0 + L}`),
    corner(`M${x1} ${y1 - L}V${y1 - 2}a2 2 0 0 1-2 2H${x1 - L}`),
    corner(`M${x0 + L} ${y1}H${x0 + 2}a2 2 0 0 1-2-2V${y1 - L}`),
    `<path d="M24.6 32.6L30.2 38.1L40.6 26.4" fill="none" stroke="${check === 'grad' ? `url(#${uid})` : check}" stroke-width="4.8" stroke-linecap="round" stroke-linejoin="round"/>`,
  ].join('');
}

function markSvg({ tile = C.ink, frame = C.white, check = 'grad', size = 64, radius = 16, uid = 'dg' } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" fill="none"><defs>${grad(uid)}</defs>${
    tile ? `<rect width="64" height="64" rx="${radius}" fill="${tile}"/>` : ''
  }${markInner({ frame, check, uid })}</svg>`;
}

/* -------------------------------------------------------------- wordmark */

const font = opentype.loadSync(join(ROOT, 'fonts/bricolage-700.ttf'));

/**
 * "dailies" as outlines with the i-dots replaced by agent squares.
 * Returns { d, dots, width, top, bottom } in font units scaled to `size`.
 */
function wordmark(size = 200, tracking = -0.004) {
  const text = 'dailies';
  let x = 0;
  const glyphs = font.stringToGlyphs(text);
  const pieces = [];
  const dots = [];
  let iCount = 0;
  glyphs.forEach((g, i) => {
    const path = g.getPath(x, 0, size);
    const ch = text[i];
    if (ch === 'i') {
      // split contours; the topmost contour is the tittle
      const contours = [];
      let cur = [];
      for (const c of path.commands) {
        if (c.type === 'M' && cur.length) {
          contours.push(cur);
          cur = [];
        }
        cur.push(c);
      }
      if (cur.length) contours.push(cur);
      const box = (cmds) => {
        const ys = cmds.flatMap((c) => [c.y, c.y1, c.y2].filter((v) => v !== undefined));
        const xs = cmds.flatMap((c) => [c.x, c.x1, c.x2].filter((v) => v !== undefined));
        return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
      };
      const boxes = contours.map(box);
      const top = boxes.reduce((a, b, k) => (b.y0 < boxes[a].y0 ? k : a), 0);
      const tb = boxes[top];
      const stem = boxes[top === 0 ? 1 : 0];
      const w = (stem.x1 - stem.x0) * 1.12;
      const cx = (stem.x0 + stem.x1) / 2;
      const cy = (tb.y0 + tb.y1) / 2;
      dots.push({ x: cx - w / 2, y: cy - w / 2, w, color: iCount === 0 ? C.claude : C.kane });
      iCount++;
      const keep = new opentype.Path();
      contours.filter((_, k) => k !== top).forEach((cmds) => cmds.forEach((c) => keep.commands.push(c)));
      pieces.push(keep.toPathData(2));
    } else {
      pieces.push(path.toPathData(2));
    }
    const next = glyphs[i + 1];
    const kern = next ? font.getKerningValue(g, next) : 0;
    x += ((g.advanceWidth + kern) / font.unitsPerEm) * size + (next ? tracking * size : 0);
  });
  const bb = font.getPath(text, 0, 0, size).getBoundingBox();
  return { d: pieces.join(''), dots, width: x, top: bb.y1, bottom: bb.y2 };
}

function wordmarkSvg({ ink = C.ink, size = 200, pad = 0 } = {}) {
  const w = wordmark(size);
  const h = w.bottom - w.top;
  const vb = `${-pad} ${w.top - pad} ${w.width + pad * 2} ${h + pad * 2}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${Math.round(w.width + pad * 2)}" height="${Math.round(h + pad * 2)}"><path d="${w.d}" fill="${ink}"/>${w.dots
    .map((d) => `<rect x="${d.x.toFixed(2)}" y="${d.y.toFixed(2)}" width="${d.w.toFixed(2)}" height="${d.w.toFixed(2)}" rx="${(d.w * 0.28).toFixed(2)}" fill="${d.color}"/>`)
    .join('')}</svg>`;
}

/** Mark + wordmark, horizontal. Mark height = H; wordmark x-height optically matched. */
function lockupSvg({ ink = C.ink, tile = C.ink, frame = C.white, H = 120, uid = 'lg' } = {}) {
  const size = H * 1.18;
  const w = wordmark(size);
  const gap = H * 0.26;
  const wh = w.bottom - w.top;
  const ty = (H - wh) / 2 - w.top + H * 0.02;
  const width = H + gap + w.width;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width.toFixed(1)} ${H}" width="${Math.round(width)}" height="${H}" fill="none"><defs>${grad(uid)}</defs>
<g transform="scale(${H / 64})"><rect width="64" height="64" rx="16" fill="${tile}"/>${markInner({ frame, check: 'grad', uid })}</g>
<g transform="translate(${(H + gap).toFixed(2)} ${ty.toFixed(2)})"><path d="${w.d}" fill="${ink}"/>${w.dots
    .map((d) => `<rect x="${d.x.toFixed(2)}" y="${d.y.toFixed(2)}" width="${d.w.toFixed(2)}" height="${d.w.toFixed(2)}" rx="${(d.w * 0.28).toFixed(2)}" fill="${d.color}"/>`)
    .join('')}</g></svg>`;
}

/* ----------------------------------------------------------------- write */

const files = {
  'mark.svg': markSvg(),
  'mark-light.svg': markSvg({ tile: C.white, frame: C.ink, uid: 'dgl' }),
  'mark-mono-ink.svg': markSvg({ tile: null, frame: C.ink, check: C.ink, uid: 'm1' }),
  'mark-mono-white.svg': markSvg({ tile: null, frame: C.white, check: C.white, uid: 'm2' }),
  'mark-glyph.svg': markSvg({ tile: null, frame: C.ink, uid: 'm3' }),
  'mark-glyph-white.svg': markSvg({ tile: null, frame: C.white, uid: 'm4' }),
  'wordmark.svg': wordmarkSvg(),
  'wordmark-white.svg': wordmarkSvg({ ink: C.white }),
  'lockup.svg': lockupSvg(),
  'lockup-white.svg': lockupSvg({ ink: C.white, tile: C.white, frame: C.ink, uid: 'lw' }),
  'favicon.svg': markSvg({ size: 32, radius: 15 }),
};
for (const [name, svg] of Object.entries(files)) writeFileSync(join(OUT, name), svg);
for (const f of readdirSync(OUT)) copyFileSync(join(OUT, f), join(WEB, f));
copyFileSync(join(OUT, 'favicon.svg'), join(ROOT, '..', 'apps/studio/public/favicon.svg'));

// The wordmark geometry, for components that draw the logo inline (studio, pitch, video).
const wm = wordmark(100);
writeFileSync(
  join(ROOT, '..', 'packages/shared/src/brand.ts'),
  `// Generated by brand/src/build.mjs — do not edit by hand.
export const BRAND = ${JSON.stringify({ colors: C, wordmark: { d: wm.d, dots: wm.dots.map((d) => ({ ...d, x: +d.x.toFixed(2), y: +d.y.toFixed(2), w: +d.w.toFixed(2) })), width: +wm.width.toFixed(2), top: +wm.top.toFixed(2), bottom: +wm.bottom.toFixed(2) } }, null, 2)} as const;
`,
);
console.log('wrote', Object.keys(files).join(', '));
