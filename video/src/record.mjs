/**
 * Records the app for the ad: Chrome's CDP screencast (JPEG q92, 1920×1080)
 * with an injected cursor, assembled into constant-30fps H.264.
 *
 *   node video/src/record.mjs [clip…]      (studio on :5173, API on :4100)
 *
 * Writes video/public/rec/<clip>.mp4.
 */
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public/rec');
const TMP = join(ROOT, '.frames');
const BASE = process.env.STUDIO ?? 'http://localhost:5173';
const SHOW = 'kestrel-runner-launch-spot-a3eb';
const SEALED = 'kestrel-runner-launch-spot-30d2';
mkdirSync(OUT, { recursive: true });

const CURSOR = `
(() => {
  if (window.__cursor) return;
  const c = document.createElement('div');
  c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 3l14 8-6.2 1.6L9.6 19z" fill="#17161A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  Object.assign(c.style, { position: 'fixed', left: '0', top: '0', zIndex: 2147483647, pointerEvents: 'none', transform: 'translate(-200px,-200px)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.25))', transition: 'transform .02s linear' });
  const ring = document.createElement('div');
  Object.assign(ring.style, { position: 'fixed', width: '34px', height: '34px', marginLeft: '-17px', marginTop: '-17px', borderRadius: '50%', border: '2px solid #5B4BDB', zIndex: 2147483646, pointerEvents: 'none', opacity: '0', left: '0', top: '0' });
  const mount = () => { document.body.appendChild(c); document.body.appendChild(ring); };
  document.body ? mount() : addEventListener('DOMContentLoaded', mount);
  addEventListener('mousemove', (e) => { c.style.transform = 'translate(' + (e.clientX - 5) + 'px,' + (e.clientY - 3) + 'px)'; }, true);
  addEventListener('mousedown', (e) => {
    ring.style.left = e.clientX + 'px'; ring.style.top = e.clientY + 'px';
    ring.animate([{ opacity: .9, transform: 'scale(.4)' }, { opacity: 0, transform: 'scale(1.4)' }], { duration: 450, easing: 'ease-out' });
  }, true);
  window.__cursor = c;
})();`;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let mouse = { x: 720, y: 400 };

/** Smooth, eased cursor move. */
async function glide(page, x, y, ms = 700) {
  const steps = Math.max(8, Math.round(ms / 16));
  const from = { ...mouse };
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    await page.mouse.move(from.x + (x - from.x) * e, from.y + (y - from.y) * e);
    await sleep(ms / steps);
  }
  mouse = { x, y };
}
async function glideTo(page, locator, ms = 700, dx = 0.5, dy = 0.5) {
  const b = await locator.first().boundingBox();
  if (!b) throw new Error('no box for ' + locator);
  await glide(page, b.x + b.width * dx, b.y + b.height * dy, ms);
}
async function click(page, locator, ms = 700) {
  await glideTo(page, locator, ms);
  await sleep(120);
  await page.mouse.down();
  await sleep(70);
  await page.mouse.up();
}
async function smoothScroll(page, dy, ms = 1200, sel = null) {
  const steps = Math.round(ms / 16);
  for (let i = 0; i < steps; i++) {
    const t0 = i / steps, t1 = (i + 1) / steps;
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const d = dy * (ease(t1) - ease(t0));
    if (sel) await page.evaluate(([s, d]) => document.querySelector(s)?.scrollBy(0, d), [sel, d]);
    else await page.mouse.wheel(0, d);
    await sleep(16);
  }
}

async function record(browser, name, fn) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 4 / 3 });
  await ctx.addInitScript(CURSOR);
  const page = await ctx.newPage();
  mouse = { x: 720, y: 400 };
  const dir = join(TMP, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const frames = [];
  let recording = false;
  const cdp = await ctx.newCDPSession(page);
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
    if (!recording) return;
    const f = join(dir, `f${String(frames.length).padStart(6, '0')}.jpg`);
    writeFileSync(f, Buffer.from(data, 'base64'));
    frames.push({ f, t: metadata.timestamp });
  });
  const start = async () => {
    await page.mouse.move(mouse.x, mouse.y);
    await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 92, maxWidth: 1920, maxHeight: 1080, everyNthFrame: 1 });
    await sleep(150);
    recording = true;
  };
  await fn(page, start);
  const tEnd = Date.now() / 1000;
  recording = false;
  await cdp.send('Page.stopScreencast');
  await ctx.close();
  if (!frames.length) throw new Error(name + ': no frames');
  // durations from screencast timestamps; hold the last frame until the end
  const lines = [];
  frames.forEach((fr, i) => {
    const next = frames[i + 1]?.t ?? Math.max(fr.t + 0.5, tEnd - (Date.now() / 1000 - tEnd));
    lines.push(`file '${fr.f}'`, `duration ${Math.max(0.001, next - fr.t).toFixed(4)}`);
  });
  lines.push(`file '${frames.at(-1).f}'`);
  writeFileSync(join(dir, 'list.txt'), lines.join('\n'));
  const out = join(OUT, `${name}.mp4`);
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(dir, 'list.txt'), '-vf', 'scale=1920:1080:flags=lanczos,fps=30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out]);
  const dur = execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', out]).toString().trim();
  console.log(`${name}: ${frames.length} frames, ${dur}s`);
  rmSync(dir, { recursive: true, force: true });
}

const settle = (page) => page.evaluate(() => document.fonts.ready).then(() => sleep(900));

/** Sign the recording browser in as the demo account (cookie session). */
async function signIn(page) {
  const r = await page.request.post(BASE + '/api/auth/login', { data: { email: process.env.DEMO_EMAIL ?? 'demo@dailies.dev', password: process.env.DEMO_PASSWORD ?? '' } });
  if (!r.ok()) throw new Error('demo sign-in failed: ' + r.status());
}

const CLIPS = {
  async device(page, start) {
    // A real pending `dailies login`, approved on camera.
    const d = await (await fetch(BASE + '/api/auth/device', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ client: 'dailies CLI · macOS' }) })).json();
    console.log('   device code', d.user_code, d.verification_uri_complete);
    await signIn(page);
    await page.goto(d.verification_uri_complete);
    await page.getByRole('button', { name: 'Approve' }).waitFor();
    await settle(page);
    await start();
    await sleep(900);
    await glideTo(page, page.locator('.device-code'), 900);
    await sleep(900);
    await click(page, page.getByRole('button', { name: 'Approve' }), 900);
    await page.getByText('Your agent is connected').waitFor();
    await sleep(2600);
  },
  async account(page, start) {
    await signIn(page);
    await page.goto(BASE + '/account');
    await page.locator('.card').first().waitFor();
    await settle(page);
    await start();
    await sleep(1200);
    await glideTo(page, page.locator('.card').first(), 1100);
    await sleep(1300);
    await smoothScroll(page, 360, 1300);
    await sleep(1400);
  },
  async mcpspot(page, start) {
    await signIn(page);
    const spot = process.env.MCP_SPOT;
    await page.goto(BASE + `/p/${spot}`);
    await page.locator('.ring').waitFor();
    await settle(page);
    await page.keyboard.press('Space');
    await start();
    await sleep(900);
    await click(page, page.getByRole('button', { name: /Activity/ }), 900);
    await sleep(2400);
    await glide(page, 300, 420, 700);
    await smoothScroll(page, 260, 1400, '.drawer-body');
    await sleep(2200);
  },
  async home(page, start) {
    await page.goto(BASE + '/');
    await page.locator('.demo-card img, .demo-card canvas, .demo-card div').first().waitFor();
    await settle(page);
    await sleep(1200);
    await start();
    await sleep(600);
    await glideTo(page, page.getByRole('button', { name: /Try the demo storyboard/ }), 1300);
    await sleep(1600);
    await glideTo(page, page.locator('.demo-card'), 1100, 0.45, 0.4);
    await sleep(2200);
    await smoothScroll(page, 560, 1700);
    await sleep(1800);
  },
  async newspot(page, start) {
    await page.goto(BASE + '/new?template=demo');
    await settle(page);
    await start();
    await sleep(500);
    await glideTo(page, page.locator('textarea').first(), 1000, 0.3, 0.35);
    await sleep(700);
    await smoothScroll(page, 200, 1300, 'textarea');
    await sleep(500);
    await smoothScroll(page, -200, 900, 'textarea');
    await glideTo(page, page.getByRole('button', { name: /Create and generate/ }), 1200);
    await sleep(1400);
  },
  async replay(page, start) {
    await page.goto(BASE + `/p/${SHOW}?replay=1`);
    await page.waitForFunction(() => window.__dailiesReplay);
    await page.evaluate(() => window.__dailiesReplay.setSpeed(20));
    await start();
    // phase-aware speed ramp, cued by event index (first claude.typing, v1, r1 end, stop hook, r2 end, allow)
    const plan = [
      { at: 0, speed: 20 },
      { at: 119, speed: 6 },
      { at: 406, speed: 1.5 },
      { at: 562, speed: 2 },
      { at: 583, speed: 1.5 },
      { at: 593, speed: 3 },
    ];
    let k = -1;
    let played = false;
    const t0 = Date.now();
    while (Date.now() - t0 < 240000) {
      const r = await page.evaluate(() => ({ cursor: window.__dailiesReplay.cursor, total: window.__dailiesReplay.total }));
      if (r.cursor >= r.total) break;
      if (!played && r.cursor >= 408) {
        played = true;
        await sleep(400);
        await page.keyboard.press('Space');
      }
      while (k + 1 < plan.length && r.cursor >= plan[k + 1].at) {
        k++;
        await page.evaluate((s) => window.__dailiesReplay.setSpeed(s), plan[k].speed);
        console.log('  ', ((Date.now() - t0) / 1000).toFixed(1) + 's', 'event', r.cursor, '→', plan[k].speed + '×');
      }
      await sleep(40);
    }
    await sleep(3500);
  },
  async details(page, start) {
    await page.goto(BASE + `/p/${SHOW}?replay=1`);
    await page.waitForFunction(() => window.__dailiesReplay);
    await page.getByRole('button', { name: 'Skip to result' }).click();
    await page.locator('.statuspill').waitFor();
    await settle(page);
    await page.keyboard.press('Space');
    await start();
    await sleep(500);
    // the status pill opens the live trace
    await click(page, page.locator('.statuspill'), 1000);
    await sleep(2600);
    await page.keyboard.press('Escape');
    await click(page, page.locator('.canvas'), 400);
    await sleep(300);
    // correction: Kane's verdict and Claude's fix
    await click(page, page.getByText('Kane’s verdict and Claude’s fix'), 1100);
    await sleep(2800);
    await click(page, page.getByRole('button', { name: /Before/ }).first(), 900);
    await sleep(2800);
    await click(page, page.getByRole('button', { name: /After/ }).first(), 700);
    await sleep(2200);
  },
  async activity(page, start) {
    await page.goto(BASE + `/p/${SHOW}`);
    await page.locator('.ring').waitFor();
    await settle(page);
    await page.keyboard.press('Space');
    await start();
    await sleep(400);
    await click(page, page.getByRole('button', { name: /Activity/ }), 900);
    await sleep(1300);
    // the first full sweep (r1), its 9:16 call, its conditions
    const r1 = page.locator('.drawer-body .coll:has(> .coll-h .vmark.fail)').first();
    await click(page, r1.locator('> .coll-h'), 900);
    await sleep(1500);
    const call = r1.locator('.coll-b .coll').filter({ hasText: /9:16/ }).first();
    if (await call.count()) {
      await click(page, call.locator('> .coll-h'), 800);
      await sleep(1500);
    }
    const conds = page.locator('.drawer').getByText(/Conditions and verdicts/).first();
    if (await conds.count()) {
      await click(page, conds, 800);
      await sleep(1200);
    }
    await glide(page, 300, 500, 500);
    await smoothScroll(page, 420, 1800, '.drawer-body');
    await sleep(2500);
  },
  async compare(page, start) {
    await page.goto(BASE + `/p/${SHOW}/compare`);
    await page.locator('.wipe').waitFor();
    await sleep(300);
    await start();
    await sleep(3400);
    const w = await page.locator('.wipe').first().boundingBox();
    if (w) {
      await glide(page, w.x + w.width * 0.5, w.y + w.height * 0.5, 800);
      await page.mouse.down();
      await glide(page, w.x + w.width * 0.78, w.y + w.height * 0.5, 1100);
      await glide(page, w.x + w.width * 0.3, w.y + w.height * 0.5, 1400);
      await glide(page, w.x + w.width * 0.5, w.y + w.height * 0.5, 800);
      await page.mouse.up();
    }
    await sleep(1500);
  },
  async sheet(page, start) {
    await page.goto(BASE + `/inspect/${SHOW}/1/sheet?cut=9x16`);
    await page.locator('[data-ready="true"]').waitFor({ timeout: 30000 });
    await sleep(600);
    await start();
    await sleep(1800);
    await smoothScroll(page, 700, 2400);
    await sleep(1800);
  },
  async sealed(page, start) {
    await page.goto(BASE + `/p/${SEALED}`);
    await page.locator('.ring').waitFor();
    await settle(page);
    await page.keyboard.press('Space');
    await start();
    await sleep(600);
    const seal = page.locator('.inspector').getByText(/Sealed/).first();
    await click(page, seal, 1100);
    await sleep(1500);
    await glide(page, 1300, 600, 600);
    await smoothScroll(page, 360, 1600, '.inspector-body, .inspector');
    await sleep(2200);
  },
};

const want = process.argv.slice(2);
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars', '--force-color-profile=srgb'] });
for (const [name, fn] of Object.entries(CLIPS)) {
  if (want.length && !want.includes(name)) continue;
  try {
    await record(browser, name, fn);
  } catch (e) {
    console.error(name, 'FAILED', e.message.split('\n')[0]);
  }
}
await browser.close();
rmSync(TMP, { recursive: true, force: true });
