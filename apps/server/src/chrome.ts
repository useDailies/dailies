import { chromium, type Browser, type Page } from 'playwright-core';
import type { CutId } from '@dailies/shared';
import { config } from './config.ts';

/**
 * Kane's eyes. One headless Chrome per cut, each with a CDP port. dailies
 * navigates the page to an inspection sheet and waits for it to report ready;
 * `kane-cli run --analyzer-only --cdp-endpoint` then judges that exact page.
 * Separate browsers per cut let the three cuts be judged in parallel.
 */
const ORDER: CutId[] = ['16x9', '9x16', '1x1', '4x5'];

interface Slot {
  browser: Browser;
  page: Page;
  port: number;
}
const slots = new Map<string, Promise<Slot>>();

function portFor(cut: CutId, lane = 0) {
  return config.cdpBasePort + ORDER.indexOf(cut) + lane * 10;
}

async function launch(port: number): Promise<Slot> {
  const browser = await chromium.launch({
    executablePath: config.chromePath,
    headless: true,
    args: [`--remote-debugging-port=${port}`, '--hide-scrollbars', '--force-color-profile=srgb', '--no-first-run'],
  });
  const ctx = await browser.newContext({ viewport: config.sheetViewport, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  browser.on('disconnected', () => {
    for (const [k, v] of slots) v.then((s) => s.port === port && slots.delete(k)).catch(() => slots.delete(k));
  });
  return { browser, page, port };
}

export async function slot(cut: CutId, lane = 0): Promise<Slot> {
  const key = `${cut}:${lane}`;
  if (!slots.has(key)) {
    const p = launch(portFor(cut, lane));
    slots.set(key, p);
    p.catch(() => slots.delete(key));
  }
  return slots.get(key)!;
}

export async function openSheet(cut: CutId, url: string, screenshotPath: string, lane = 0): Promise<{ port: number; facts: number; report: string }> {
  const s = await slot(cut, lane);
  await s.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await s.page.waitForSelector('[data-ready="true"]', { timeout: 45000 });
  const error = await s.page.$('[data-sheet-error]');
  if (error) throw new Error(`sheet failed to render: ${(await error.textContent())?.slice(0, 400)}`);
  await s.page.screenshot({ path: screenshotPath, type: 'png' });
  // A compact copy for agents (MCP image results, the Stop hook's evidence).
  await s.page.screenshot({ path: screenshotPath.replace(/\.png$/, '.jpg'), type: 'jpeg', quality: 72 }).catch(() => undefined);
  const facts = await s.page.$$eval('[data-fact-row]', (r) => r.length);
  const report = await s.page
    .$eval('[data-fact="placement"]', (el) => [...el.querySelectorAll('span')].map((x) => (x.textContent ?? '').trim()).join('\n'))
    .catch(() => '');
  return { port: s.port, facts, report };
}

export async function closeAll() {
  await Promise.all([...slots.values()].map((p) => p.then((s) => s.browser.close()).catch(() => undefined)));
  slots.clear();
}
