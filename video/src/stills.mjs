/** Native-size stills of the showcase run for the ad.  node video/src/stills.mjs */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const OUT = join(dirname(fileURLToPath(import.meta.url)), '../public/stills');
mkdirSync(OUT, { recursive: true });
const ID = 'kestrel-runner-launch-spot-a3eb';
const SHOTS = [
  ['v1-9x16-f7', 1, '9x16', 135],
  ['v2-9x16-f7', 2, '9x16', 135],
  ['v2-16x9-hero', 2, '16x9', 40],
  ['v2-16x9-detail', 2, '16x9', 150],
  ['v2-16x9-cta', 2, '16x9', 300],
  ['v2-1x1-cta', 2, '1x1', 300],
  ['v2-9x16-hero', 2, '9x16', 40],
  ['v2-9x16-cta', 2, '9x16', 300],
];
const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
for (const [name, v, cut, frame] of SHOTS) {
  const [w, h] = cut === '16x9' ? [1920, 1080] : cut === '9x16' ? [1080, 1920] : [1080, 1080];
  const p = await b.newPage({ viewport: { width: w, height: h } });
  await p.goto(`http://localhost:5173/still/${ID}/${v}?cut=${cut}&frame=${frame}`);
  await p.locator('[data-ready]').waitFor();
  await p.waitForTimeout(1500);
  await p.screenshot({ path: join(OUT, name + '.png') });
  await p.close();
  console.log(name);
}
await b.close();
