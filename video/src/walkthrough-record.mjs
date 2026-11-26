/**
 * Records a complete, real dailies session on the hosted app for the walkthrough video:
 * sign up → install + sign in (terminal) → approve the device → Claude composes →
 * the spot live while Kane judges → verdicts and activity → the account page.
 *
 *   WT_PASSWORD=… node video/src/walkthrough-record.mjs <repoDir>
 *
 * Writes video/public/wt/*.mp4 (CDP screencast, 1920×1080) and video/public/wt/session.json
 * (the real terminal output and the Claude Code stream-json transcript).
 */
import { chromium } from 'playwright-core';
import { execFileSync, spawn } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'public/wt');
const TMP = join(ROOT, '.frames-wt');
const H = 'https://daohbofm7o9ia.cloudfront.net';
const REPO = process.argv[2];
const EMAIL = process.env.WT_EMAIL ?? 'walkthrough@dailies.dev';
const PASSWORD = process.env.WT_PASSWORD;
const HOME_DIR = join(REPO, '..', 'wt-home');
if (!REPO || !PASSWORD) throw new Error('usage: WT_PASSWORD=… node walkthrough-record.mjs <repoDir>');
mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (...a) => console.log(new Date().toISOString().slice(11, 19), ...a);
const session = { terminal: [], claude: [] };

const CURSOR = `(() => { if (window.__cursor) return; const c = document.createElement('div');
  c.innerHTML = '<svg width="26" height="26" viewBox="0 0 24 24"><path d="M5 3l14 8-6.2 1.6L9.6 19z" fill="#17161A" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  Object.assign(c.style, { position: 'fixed', left: 0, top: 0, zIndex: 2147483647, pointerEvents: 'none', transform: 'translate(-200px,-200px)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.25))' });
  const mount = () => document.body.appendChild(c); document.body ? mount() : addEventListener('DOMContentLoaded', mount);
  addEventListener('mousemove', (e) => { c.style.transform = 'translate(' + (e.clientX - 5) + 'px,' + (e.clientY - 3) + 'px)'; }, true); window.__cursor = c; })();`;

let mouse = { x: 720, y: 400 };
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
async function click(page, loc, ms = 700) {
  const b = await loc.first().boundingBox();
  await glide(page, b.x + b.width / 2, b.y + b.height / 2, ms);
  await sleep(120);
  await page.mouse.down();
  await sleep(60);
  await page.mouse.up();
}
async function typeInto(page, loc, text) {
  await click(page, loc, 500);
  await page.keyboard.type(text, { delay: 45 });
}

/** CDP screencast recorder for one page. */
async function recorder(ctx, page, name) {
  const dir = join(TMP, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  const frames = [];
  const cdp = await ctx.newCDPSession(page);
  let on = false;
  cdp.on('Page.screencastFrame', ({ data, metadata, sessionId }) => {
    cdp.send('Page.screencastFrameAck', { sessionId }).catch(() => {});
    if (!on) return;
    const f = join(dir, `f${String(frames.length).padStart(6, '0')}.jpg`);
    writeFileSync(f, Buffer.from(data, 'base64'));
    frames.push({ f, t: metadata.timestamp });
  });
  return {
    async start() {
      await page.mouse.move(mouse.x, mouse.y);
      await cdp.send('Page.startScreencast', { format: 'jpeg', quality: 90, maxWidth: 1920, maxHeight: 1080 });
      await sleep(150);
      on = true;
    },
    async stop() {
      const tEnd = Date.now() / 1000;
      on = false;
      await cdp.send('Page.stopScreencast');
      const lines = [];
      frames.forEach((fr, i) => {
        const next = frames[i + 1]?.t ?? Math.max(fr.t + 0.5, tEnd);
        lines.push(`file '${fr.f}'`, `duration ${Math.max(0.001, next - fr.t).toFixed(4)}`);
      });
      lines.push(`file '${frames.at(-1).f}'`);
      writeFileSync(join(dir, 'list.txt'), lines.join('\n'));
      const out = join(OUT, `${name}.mp4`);
      execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'concat', '-safe', '0', '-i', join(dir, 'list.txt'), '-vf', 'scale=1920:1080:flags=lanczos,fps=30', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', out]);
      rmSync(dir, { recursive: true, force: true });
      log(name, frames.length, 'frames →', out);
    },
  };
}

function sh(cmd, args, env = {}) {
  const out = execFileSync(cmd, args, { cwd: REPO, env: { ...process.env, ...env }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  return out;
}

const browser = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true, args: ['--hide-scrollbars'] });
const ctx = await browser.newContext({ viewport: { width: 1440, height: 810 }, deviceScaleFactor: 4 / 3 });
await ctx.addInitScript(CURSOR);
const page = await ctx.newPage();

/* 1. sign up */
{
  await page.goto(H + '/');
  await page.waitForTimeout(3500);
  const r = await recorder(ctx, page, 'wt-1-signup');
  await r.start();
  await sleep(1500);
  await click(page, page.getByRole('link', { name: 'Sign in' }), 1100);
  await page.waitForURL('**/login**');
  await sleep(700);
  await click(page, page.getByRole('button', { name: /Create an account/ }), 800);
  await sleep(500);
  await typeInto(page, page.locator('input[autocomplete=name]'), 'Walkthrough');
  await typeInto(page, page.locator('input[type=email]'), EMAIL);
  await click(page, page.locator('input[type=password]'), 500);
  await page.keyboard.type(PASSWORD.replace(/./g, (c) => c), { delay: 25 });
  await sleep(400);
  await click(page, page.getByRole('button', { name: 'Create account' }), 700);
  await page.waitForURL((u) => !u.pathname.startsWith('/login'), { timeout: 20000 });
  await sleep(1500);
  await click(page, page.locator('.acct-btn'), 900);
  await sleep(700);
  await click(page, page.getByRole('link', { name: /Your spots/ }), 700);
  await page.waitForURL('**/account', { timeout: 20000 });
  await sleep(3500);
  await r.stop();
}

/* 2. terminal: init, plugin, login */
rmSync(HOME_DIR, { recursive: true, force: true });
const env = { DAILIES_HOME: HOME_DIR, DAILIES_NO_BROWSER: '1' };
session.terminal.push({ cmd: 'npx @usedailies/cli init --plugin', out: sh('npx', ['-y', '@usedailies/cli@0.2.0', 'init', '--plugin'], env) });
session.terminal.push({ cmd: 'claude plugin marketplace add useDailies/dailies', out: sh('claude', ['plugin', 'marketplace', 'add', 'useDailies/dailies', '--scope', 'project']) });
session.terminal.push({ cmd: 'claude plugin install dailies@dailies', out: sh('claude', ['plugin', 'install', 'dailies@dailies', '-s', 'project']) });
const login = spawn('npx', ['-y', '@usedailies/cli@0.2.0', 'login'], { cwd: REPO, env: { ...process.env, ...env } });
let loginOut = '';
const loginExited = new Promise((r) => login.on('exit', r));
login.stderr.on('data', (d) => (loginOut += d));
login.stdout.on('data', (d) => (loginOut += d));
while (!/code reads\s+([A-Z]{4}-[A-Z]{4})/.test(loginOut)) await sleep(200);
const code = loginOut.match(/code reads\s+([A-Z]{4}-[A-Z]{4})/)[1];
log('device code', code);

/* 3. approve the device in the browser */
{
  await page.goto(`${H}/device?code=${code}`);
  await page.getByRole('button', { name: 'Approve' }).waitFor();
  await page.waitForTimeout(1200);
  const r = await recorder(ctx, page, 'wt-2-device');
  await r.start();
  await sleep(1200);
  await glide(page, 720, 330, 700);
  await sleep(900);
  await click(page, page.getByRole('button', { name: 'Approve' }), 900);
  await page.getByText('Your agent is connected').waitFor();
  await sleep(2500);
  await r.stop();
}
await loginExited;
session.terminal.push({ cmd: 'npx @usedailies/cli login', out: loginOut });
session.terminal.push({ cmd: 'cat video/storyboard.md', out: readFileSync(join(REPO, 'video/storyboard.md'), 'utf8') });
log('signed in');

/* 4. Claude composes; record the spot page live while Kane judges */
const token = JSON.parse(readFileSync(join(HOME_DIR, 'credentials.json'), 'utf8')).token;
const T = 'mcp__plugin_dailies_dailies';
const claudeLog = join(OUT, 'claude-run.ndjson');
const claude = spawn(
  'claude',
  ['-p', '/dailies:video', '--output-format', 'stream-json', '--verbose', '--model', 'opus', '--permission-mode', 'acceptEdits', '--allowedTools', ['dailies_start', 'dailies_review', 'dailies_criteria', 'dailies_status', 'dailies_whoami'].map((t) => `${T}__${t}`).concat(['Read', 'Write', 'Edit', 'Glob', 'Grep']).join(',')],
  { cwd: REPO, env: { ...process.env, DAILIES_HOME: HOME_DIR }, stdio: ['ignore', 'pipe', 'pipe'] },
);
let claudeOut = '';
claude.stdout.on('data', (d) => (claudeOut += d));
let claudeDone = false;
claude.on('exit', () => (claudeDone = true));
const t0 = Date.now();
let spot = null;
while (!spot && !claudeDone) {
  await sleep(2500);
  const r = await fetch(`${H}/api/agent/spots`, { headers: { authorization: `Bearer ${token}` } }).then((x) => x.json()).catch(() => []);
  spot = Array.isArray(r) ? r[0]?.id : null;
}
log('spot', spot, 'after', ((Date.now() - t0) / 1000).toFixed(0), 's');
session.spot = spot;
{
  await page.goto(`${H}/p/${spot}`);
  await page.waitForTimeout(2500);
  const r = await recorder(ctx, page, 'wt-3-live');
  await r.start();
  let played = false;
  const tLive = Date.now();
  while (!claudeDone && Date.now() - tLive < 25 * 60_000) {
    await sleep(1000);
    if (!played && (await page.locator('.ring').count())) {
      const hasVersion = await page.locator('.vchip').count();
      if (hasVersion) {
        await page.keyboard.press('Space');
        played = true;
      }
    }
  }
  await sleep(5000);
  await r.stop();
}
writeFileSync(claudeLog, claudeOut);
log('claude done in', ((Date.now() - t0) / 1000).toFixed(0), 's');

/* 5. the details: activity, conditions, before/after */
{
  await page.goto(`${H}/p/${spot}`);
  await page.locator('.ring').waitFor();
  await page.waitForTimeout(2500);
  await page.keyboard.press('Space');
  const r = await recorder(ctx, page, 'wt-4-detail');
  await r.start();
  await sleep(1500);
  await click(page, page.getByRole('button', { name: /Activity/ }), 900);
  await sleep(1800);
  const round = page.locator('.drawer-body .coll:has(> .coll-h .vmark)').nth(1);
  if (await round.count()) {
    await click(page, round.locator('> .coll-h'), 800);
    await sleep(1600);
    const call = round.locator('.coll-b .coll').first();
    if (await call.count()) {
      await click(page, call.locator('> .coll-h'), 700);
      await sleep(1600);
    }
    const conds = page.locator('.drawer').getByText(/Conditions and verdicts/).first();
    if (await conds.count()) {
      await click(page, conds, 700);
      await sleep(1500);
    }
  }
  await glide(page, 300, 500, 500);
  for (let i = 0; i < 40; i++) {
    await page.evaluate(() => document.querySelector('.drawer-body')?.scrollBy(0, 9));
    await sleep(30);
  }
  await sleep(2500);
  await r.stop();
}
{
  await page.goto(`${H}/account`);
  await page.waitForTimeout(3000);
  const r = await recorder(ctx, page, 'wt-5-account');
  await r.start();
  await sleep(1200);
  await glide(page, 400, 650, 1200);
  await sleep(2500);
  await r.stop();
}
await browser.close();
writeFileSync(join(OUT, 'session.json'), JSON.stringify(session, null, 2));
rmSync(TMP, { recursive: true, force: true });
log('done');
