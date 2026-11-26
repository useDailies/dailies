/** Where the CLI keeps the login, and how it finds the spot a repository is linked to. */
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';

export const VERSION = '0.2.0';
export const DEFAULT_SERVER = (process.env.DAILIES_SERVER ?? 'https://daohbofm7o9ia.cloudfront.net').replace(/\/$/, '');

export interface Credentials {
  server: string;
  token: string;
  user: { id: string; email: string; name: string };
  savedAt: string;
}

const HOME = process.env.DAILIES_HOME ?? join(homedir(), '.dailies');
const CRED = join(HOME, 'credentials.json');

export function loadCredentials(): Credentials | null {
  if (process.env.DAILIES_TOKEN) {
    return { server: (process.env.DAILIES_SERVER ?? DEFAULT_SERVER).replace(/\/$/, ''), token: process.env.DAILIES_TOKEN, user: { id: '', email: '', name: '' }, savedAt: '' };
  }
  if (!existsSync(CRED)) return null;
  try {
    const c = JSON.parse(readFileSync(CRED, 'utf8')) as Credentials;
    if (process.env.DAILIES_SERVER) c.server = process.env.DAILIES_SERVER.replace(/\/$/, '');
    return c;
  } catch {
    return null;
  }
}

export function saveCredentials(c: Credentials) {
  mkdirSync(HOME, { recursive: true, mode: 0o700 });
  writeFileSync(CRED, JSON.stringify(c, null, 2), { mode: 0o600 });
  chmodSync(CRED, 0o600);
}

export function clearCredentials() {
  if (existsSync(CRED)) writeFileSync(CRED, '{}', { mode: 0o600 });
}
export const credentialsPath = CRED;

/** A repository linked to a dailies spot carries .dailies/spot.json. */
export interface SpotLink {
  spot: string;
  server: string;
  dir: string;
  storyboard: string;
  studioUrl: string;
  title: string;
  createdAt: string;
}

export function projectRoot(hint?: string) {
  return resolve(hint ?? process.env.DAILIES_PROJECT_DIR ?? process.env.CLAUDE_PROJECT_DIR ?? process.cwd());
}

export function readLink(root: string): SpotLink | null {
  const f = join(root, '.dailies', 'spot.json');
  if (!existsSync(f)) return null;
  try {
    return JSON.parse(readFileSync(f, 'utf8')) as SpotLink;
  } catch {
    return null;
  }
}

export function writeLink(root: string, link: SpotLink) {
  const dir = join(root, '.dailies');
  mkdirSync(dir, { recursive: true });
  // Evidence and links are per-machine; keep them out of the user's commits.
  if (!existsSync(join(dir, '.gitignore'))) writeFileSync(join(dir, '.gitignore'), '*\n');
  writeFileSync(join(dir, 'spot.json'), JSON.stringify(link, null, 2));
}

export function ensureDir(f: string) {
  mkdirSync(dirname(f), { recursive: true });
}
