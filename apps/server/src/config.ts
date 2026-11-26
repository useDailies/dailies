import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../../..');

/** Minimal .env loader (no dependency): KEY=value lines, existing env wins. */
function loadEnv(file: string) {
  if (!existsSync(file)) return;
  for (const line of readFileSync(file, 'utf8').split('\n')) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^['"]|['"]$/g, '');
  }
}
loadEnv(join(ROOT, '.env'));

const num = (v: string | undefined, d: number) => (v && !Number.isNaN(Number(v)) ? Number(v) : d);

export const config = {
  port: num(process.env.DAILIES_PORT, 4100),
  /** Where Kane's Chrome opens the inspection sheets. */
  studioUrl: process.env.DAILIES_STUDIO_URL ?? 'http://localhost:5173',
  /** The address users and their agents reach dailies at (links, sheet images, device login). */
  publicUrl: (process.env.DAILIES_PUBLIC_URL ?? process.env.DAILIES_STUDIO_URL ?? 'http://localhost:5173').replace(/\/$/, ''),
  apiUrl: process.env.DAILIES_API_URL ?? `http://127.0.0.1:${num(process.env.DAILIES_PORT, 4100)}`,
  workspaces: join(ROOT, 'workspaces'),
  hookScript: join(ROOT, 'packages/hook/stop.mjs'),
  chromePath:
    process.env.CHROME_PATH ??
    (process.platform === 'darwin'
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : '/usr/bin/google-chrome'),
  /** First CDP port; one Chrome per cut. */
  cdpBasePort: num(process.env.DAILIES_CDP_PORT, 9341),
  sheetViewport: { width: 1680, height: 1050 },
  claude: {
    bin: process.env.CLAUDE_BIN ?? 'claude',
    model: process.env.DAILIES_CLAUDE_MODEL ?? 'opus',
  },
  kane: {
    bin: process.env.KANE_BIN ?? 'kane-cli',
    username: process.env.KANE_USERNAME,
    accessKey: process.env.KANE_ACCESS_KEY,
    /** conditions per analyzer call before we split the sheet into two calls */
    maxConditionsPerCall: num(process.env.DAILIES_MAX_CONDITIONS, 14),
    analyzeTimeoutSec: num(process.env.DAILIES_ANALYZE_TIMEOUT, 300),
  },
  /** Stop-hook rounds before dailies hands the shot back to a human. */
  maxFixRounds: num(process.env.DAILIES_MAX_FIX_ROUNDS, 4),
};
