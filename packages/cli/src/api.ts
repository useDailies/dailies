/** A small client for the dailies server, authenticated with the device-login token. */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { loadCredentials, type Credentials } from './config.ts';

export class NotSignedIn extends Error {
  constructor() {
    super('Not signed in to dailies. Call the dailies_login tool (or run `dailies login` in a terminal), approve it in the browser, then try again.');
  }
}

export function creds(): Credentials {
  const c = loadCredentials();
  if (!c?.token) throw new NotSignedIn();
  return c;
}

export async function call<T>(path: string, init: RequestInit & { timeoutMs?: number } = {}, c: Credentials = creds()): Promise<T> {
  const res = await fetch(`${c.server}${path}`, {
    ...init,
    headers: { 'content-type': 'application/json', authorization: `Bearer ${c.token}`, ...(init.headers ?? {}) },
    signal: AbortSignal.timeout(init.timeoutMs ?? 60_000),
  });
  const text = await res.text();
  let body: unknown = null;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    body = { error: text.slice(0, 300) };
  }
  if (res.status === 401) throw new NotSignedIn();
  if (!res.ok) throw new Error((body as { error?: string })?.error ?? `${res.status} ${res.statusText}`);
  return body as T;
}

export async function fetchBytes(url: string, c: Credentials = creds()): Promise<Buffer | null> {
  try {
    const res = await fetch(url, { headers: { authorization: `Bearer ${c.token}` }, signal: AbortSignal.timeout(30_000) });
    if (!res.ok) return null;
    return Buffer.from(await res.arrayBuffer());
  } catch {
    return null;
  }
}

/** The composition: every .ts/.tsx/.js/.jsx/.css/.json file under the spot's directory. */
export function collectComposition(dir: string): Record<string, string> {
  const out: Record<string, string> = {};
  const walk = (d: string) => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (e.name.startsWith('.') || e.name === 'node_modules') continue;
      const f = join(d, e.name);
      if (e.isDirectory()) walk(f);
      else if (/\.(tsx?|jsx?|css|json)$/.test(e.name) && statSync(f).size < 400_000) out[relative(dir, f).split('\\').join('/')] = readFileSync(f, 'utf8');
    }
  };
  walk(dir);
  return out;
}

export interface JudgeResult {
  status: 'pass' | 'fail' | 'compile_error' | 'capped' | 'error';
  version: number | null;
  unchanged?: boolean;
  round?: string;
  kind?: string;
  pass: number;
  total: number;
  failing: { ac: string; cut: string; ratio: string; criterion: string; reason: string; frames: string; storyboardLine: number | null; storyboardText: string | null }[];
  feedback: string;
  sheets: { cut: string; ratio: string; image: string | null; report: string | null }[];
  credits: number;
  fixRounds: number;
  studioUrl: string;
  message: string;
}
