/** `dailies login`: device authorization, so the token never passes through the terminal. */
import { spawn } from 'node:child_process';
import { hostname } from 'node:os';

/** A label for Connected agents: the machine's name when it has one, never an IP address. */
const machine = () => {
  const h = hostname().replace(/\.local$/, '');
  const os = process.platform === 'darwin' ? 'macOS' : process.platform === 'win32' ? 'Windows' : 'Linux';
  return /^[\d.:]+$/.test(h) || !h ? os : `${h} (${os})`;
};
import { DEFAULT_SERVER, clearCredentials, credentialsPath, loadCredentials, saveCredentials } from './config.ts';

export function openUrl(url: string) {
  if (process.env.DAILIES_NO_BROWSER) return;
  const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'cmd' : 'xdg-open';
  const args = process.platform === 'win32' ? ['/c', 'start', '', url] : [url];
  try {
    spawn(cmd, args, { stdio: 'ignore', detached: true }).unref();
  } catch {
    /* print the URL instead */
  }
}

export interface DeviceStart {
  server: string;
  device_code: string;
  user_code: string;
  verification_uri: string;
  verification_uri_complete: string;
  expires_in: number;
  interval: number;
  startedAt: number;
}

export async function beginLogin(server = DEFAULT_SERVER): Promise<DeviceStart> {
  server = server.replace(/\/$/, '');
  const r = await fetch(`${server}/api/auth/device`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ client: `dailies CLI · ${machine()}` }),
  }).catch((e) => {
    throw new Error(`Could not reach dailies at ${server} (${e.message}).`);
  });
  if (!r.ok) throw new Error(`Could not reach dailies at ${server} (${r.status}).`);
  return { ...(await r.json()), server, startedAt: Date.now() };
}

/** Poll until approved (or timeout). Saves the token. */
export async function finishLogin(d: DeviceStart, timeoutMs = d.expires_in * 1000) {
  const deadline = Math.min(d.startedAt + d.expires_in * 1000, Date.now() + timeoutMs);
  let interval = d.interval;
  while (Date.now() < deadline) {
    await new Promise((r) => setTimeout(r, interval * 1000));
    const res = await fetch(`${d.server}/api/auth/device/token`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ device_code: d.device_code }) });
    const body = (await res.json()) as { error?: string; access_token?: string; user?: { id: string; email: string; name: string } };
    if (body.access_token && body.user) {
      saveCredentials({ server: d.server, token: body.access_token, user: body.user, savedAt: new Date().toISOString() });
      return body.user;
    }
    if (body.error === 'slow_down') interval += 1;
    else if (body.error === 'access_denied') throw new Error('Sign-in was declined in the browser.');
    else if (body.error === 'expired_token') throw new Error('The sign-in code expired. Start again.');
  }
  return null;
}

export async function login(server = DEFAULT_SERVER) {
  const d = await beginLogin(server);
  process.stderr.write(`\n  Sign in to dailies\n\n  1. Open   ${d.verification_uri_complete}\n  2. Check  the code reads  ${d.user_code}\n  3. Approve, and come back here.\n\n`);
  openUrl(d.verification_uri_complete);
  const user = await finishLogin(d);
  if (!user) throw new Error('Timed out waiting for approval. Run `dailies login` again.');
  process.stderr.write(`  ✓ Signed in as ${user.name} <${user.email}>. Token saved to ${credentialsPath}\n\n`);
  return user;
}

export async function logout() {
  const c = loadCredentials();
  clearCredentials();
  process.stderr.write(c?.user?.email ? `Signed out ${c.user.email}. (Revoke the token in the studio under Connected agents.)\n` : 'Not signed in.\n');
}
