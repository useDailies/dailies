/**
 * Renders the ad:  node video/src/render.mjs [--frames=a-b] [--still=frame]
 * Writes video/out/dailies-ad.mp4 (mastered to -14 LUFS).
 */
import { bundle } from '@remotion/bundler';
import { renderMedia, renderStill, selectComposition } from '@remotion/renderer';
import { execFileSync } from 'node:child_process';
import { mkdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT = join(ROOT, 'out');
mkdirSync(OUT, { recursive: true });
const arg = (k) => process.argv.find((a) => a.startsWith(`--${k}=`))?.split('=')[1];

const serveUrl = await bundle({ entryPoint: join(ROOT, 'src/index.ts'), publicDir: join(ROOT, 'public') });
const browserExecutable = process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const ID = arg('id') ?? 'Ad';
const composition = await selectComposition({ serveUrl, id: ID, browserExecutable });
console.log('duration', (composition.durationInFrames / composition.fps).toFixed(1) + 's');

const stills = arg('still');
if (stills) {
  for (const fr of stills.split(',').map(Number)) {
    await renderStill({ serveUrl, composition, frame: fr, output: join(OUT, `${ID === 'Ad' ? 'still' : ID}-${fr}.png`), browserExecutable });
    console.log('still', fr);
  }
  process.exit(0);
}
const range = arg('frames')?.split('-').map(Number);
const raw = join(OUT, 'raw.mp4');
let last = 0;
await renderMedia({
  serveUrl,
  composition,
  codec: 'h264',
  crf: 16,
  audioBitrate: '320k',
  outputLocation: raw,
  browserExecutable,
  frameRange: range ? [range[0], range[1]] : undefined,
  concurrency: Number(process.env.CONCURRENCY ?? 6),
  onProgress: ({ progress }) => {
    const p = Math.floor(progress * 20);
    if (p !== last) (last = p), console.log(`${p * 5}%`);
  },
});
const final = join(OUT, range ? 'preview.mp4' : ID === 'Ad' ? 'dailies-ad.mp4' : `dailies-${ID.toLowerCase()}.mp4`);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-c:v', 'copy', '-af', 'loudnorm=I=-14:TP=-1.0:LRA=11', '-c:a', 'aac', '-b:a', '320k', '-movflags', '+faststart', final]);
rmSync(raw);
console.log('wrote', final);
