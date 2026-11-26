/**
 * Raster brand assets, rendered from HTML in headless Chrome:
 *   brand/png/  logo PNGs, X avatar + banner, Open Graph card, video end card.
 *   node brand/src/social.mjs
 */
import { chromium } from 'playwright-core';
import { copyFileSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SVG = join(ROOT, 'svg');
const PNG = join(ROOT, 'png');
const WEB = join(ROOT, '..', 'apps/studio/public/brand');
mkdirSync(PNG, { recursive: true });
const svg = (f) => `data:image/svg+xml;base64,${Buffer.from(readFileSync(join(SVG, f))).toString('base64')}`;
const font = (f) => `data:font/ttf;base64,${readFileSync(join(ROOT, 'fonts', f)).toString('base64')}`;

const base = `<style>
@font-face{font-family:B;src:url(${font('bricolage-700.ttf')})}
@font-face{font-family:G;src:url(${font('geist-500.ttf')})}
@font-face{font-family:M;src:url(${font('geistmono-500.ttf')})}
*{box-sizing:border-box;margin:0}
body{width:100vw;height:100vh;overflow:hidden;font-family:G,sans-serif;color:#17161A}
.paper{background:#F7F7F5;background-image:radial-gradient(circle,rgba(23,22,26,.08) 1.2px,transparent 1.4px);background-size:22px 22px}
.ink{background:#17161A;color:#fff}
.grad{background:linear-gradient(100deg,#D97757,#5B4BDB 55%,#3B82F6);-webkit-background-clip:text;background-clip:text;color:transparent}
.frame{border-radius:10px;position:relative;overflow:hidden;box-shadow:0 2px 6px rgba(23,22,26,.06),0 24px 50px -20px rgba(23,22,26,.35)}
.v{position:absolute;right:8px;bottom:8px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;color:#fff;font:700 13px G}
.pass{background:#22C55E}.fail{background:#D92D20}
.chip{display:inline-flex;align-items:center;gap:8px;font:500 15px M;padding:6px 12px;border-radius:99px;background:rgba(91,75,219,.1);color:#5B4BDB}
.face{width:20px;height:20px;border-radius:50%;display:inline-grid;place-items:center;font:700 10px B;color:#fff}
</style>`;

const KANE = readFileSync(join(ROOT, 'svg/agent-kane-cli.svg'), 'utf8').replace(/width="16" height="16"/, 'width="20" height="20"').replace('stroke="#111111"', 'stroke="#2563EB" stroke-width="1.25"');
const CLAUDE = readFileSync(join(ROOT, 'svg/agent-claude.svg'), 'utf8').replace('<svg ', '<svg width="19" height="19" ');
const shoeFrame = (hue, w, h, verdict) => `<div class="frame" style="width:${w}px;height:${h}px;background:linear-gradient(160deg,#0b1220 0%,#111a2e 48%,${hue} 49%,#f07c3e 72%,#2a1a14 73%)">${
  verdict ? `<span class="v ${verdict}">${verdict === 'pass' ? '✓' : '✕'}</span>` : ''
}</div>`;

const pages = {
  'x-avatar.png': {
    w: 400,
    h: 400,
    html: `<body class="ink" style="display:grid;place-items:center;background:radial-gradient(90% 90% at 50% 40%,#2a2833,#17161A 70%)"><img src="${svg('mark-glyph-white.svg')}" style="width:330px;height:330px"></body>`,
  },
  'avatar-1000.png': {
    w: 1000,
    h: 1000,
    html: `<body class="ink" style="display:grid;place-items:center;background:radial-gradient(90% 90% at 50% 40%,#2a2833,#17161A 70%)"><img src="${svg('mark-glyph-white.svg')}" style="width:820px;height:820px"></body>`,
  },
  'x-banner.png': {
    w: 1500,
    h: 500,
    html: `<body class="paper" style="display:flex;align-items:center;justify-content:space-between;padding:0 110px 0 120px">
      <div>
        <img src="${svg('lockup.svg')}" style="height:92px;display:block">
        <div style="font:700 54px/1.02 B;letter-spacing:-.04em;margin-top:30px">Every frame, <span class="grad">proven.</span></div>
        <div style="margin-top:18px;display:flex;gap:10px"><span class="chip">${CLAUDE}Claude Code writes it</span><span class="chip">${KANE}Kane CLI proves it</span></div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,170px);gap:14px;transform:rotate(-4deg)">
        ${shoeFrame('#14b8a6', 170, 96, 'pass')}${shoeFrame('#0d9488', 170, 96, 'pass')}${shoeFrame('#14b8a6', 170, 96, 'fail')}
        ${shoeFrame('#0f766e', 170, 96, 'pass')}${shoeFrame('#14b8a6', 170, 96, 'pass')}${shoeFrame('#0d9488', 170, 96, 'pass')}
      </div></body>`,
  },
  'og-image.png': {
    w: 1200,
    h: 630,
    html: `<body class="paper" style="padding:84px 90px;display:flex;flex-direction:column;justify-content:space-between">
      <img src="${svg('lockup.svg')}" style="height:68px;align-self:flex-start">
      <div>
        <div style="font:700 104px/.95 B;letter-spacing:-.05em">Every frame,<br><span class="grad">proven.</span></div>
        <div style="font:500 26px/1.4 G;color:#55535A;margin-top:26px;max-width:880px">Test-driven video. Claude Code writes the motion design; Kane CLI judges every frame against the storyboard.</div>
      </div></body>`,
  },
  'end-card.png': {
    w: 1920,
    h: 1080,
    html: `<body class="paper" style="display:grid;place-items:center;text-align:center"><div><img src="${svg('lockup.svg')}" style="height:170px"><div style="font:700 64px B;letter-spacing:-.04em;margin-top:44px">Every frame, <span class="grad">proven.</span></div></div></body>`,
  },
  'mark-1024.png': { w: 1024, h: 1024, html: `<body style="background:transparent"><img src="${svg('mark.svg')}" style="width:1024px;height:1024px"></body>`, transparent: true },
  'mark-light-1024.png': { w: 1024, h: 1024, html: `<body style="background:transparent"><img src="${svg('mark-light.svg')}" style="width:1024px;height:1024px"></body>`, transparent: true },
  'lockup-2000.png': { w: 2000, h: 520, html: `<body style="background:transparent;display:grid;place-items:center"><img src="${svg('lockup.svg')}" style="height:420px"></body>`, transparent: true },
  'lockup-white-2000.png': { w: 2000, h: 520, html: `<body style="background:transparent;display:grid;place-items:center"><img src="${svg('lockup-white.svg')}" style="height:420px"></body>`, transparent: true },
};

const b = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const [name, pg] of Object.entries(pages)) {
  const p = await b.newPage({ viewport: { width: pg.w, height: pg.h }, deviceScaleFactor: 1 });
  await p.setContent(`<!doctype html><html><head>${base}</head>${pg.html}</html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(300);
  await p.screenshot({ path: join(PNG, name), omitBackground: Boolean(pg.transparent) });
  await p.close();
  console.log('png', name);
}
await b.close();
for (const f of readdirSync(PNG)) copyFileSync(join(PNG, f), join(WEB, f));
