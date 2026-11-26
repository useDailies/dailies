/**
 * End-to-end checks for dailies accounts, device login and spot privacy.
 *   node apps/server/test/accounts.e2e.mjs [base]   (server running; base defaults to the studio proxy)
 * No Kane credits: never triggers a review.
 */
import assert from 'node:assert/strict';

const B = process.argv[2] ?? 'http://localhost:5173';
const stamp = Date.now().toString(36);
const results = [];
const step = async (name, fn) => {
  try {
    await fn();
    results.push(['✓', name]);
  } catch (e) {
    results.push(['✗', name, e.message]);
  }
};
async function req(path, { method = 'GET', body, cookie, token, headers = {} } = {}) {
  const res = await fetch(B + path, {
    method,
    headers: { ...(body ? { 'content-type': 'application/json' } : {}), ...(cookie ? { cookie } : {}), ...(token ? { authorization: `Bearer ${token}` } : {}), ...headers },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {}
  return { status: res.status, json, cookie: res.headers.get('set-cookie') };
}
const sessionOf = (setCookie) => setCookie?.split(';')[0];

const alice = { email: `alice-${stamp}@dailies.dev`, password: 'correct-horse-1', name: 'Alice' };
const bob = { email: `bob-${stamp}@dailies.dev`, password: 'battery-staple-2', name: 'Bob' };
let aliceCookie, bobCookie, aliceToken, aliceSpot;

await step('rejects a bad email and a short password', async () => {
  assert.equal((await req('/api/auth/signup', { method: 'POST', body: { email: 'nope', password: 'longenough' } })).status, 400);
  assert.equal((await req('/api/auth/signup', { method: 'POST', body: { email: alice.email, password: 'short' } })).status, 400);
});
await step('signs up and sets an httpOnly session cookie', async () => {
  const r = await req('/api/auth/signup', { method: 'POST', body: alice });
  assert.equal(r.status, 200);
  assert.equal(r.json.user.email, alice.email);
  assert.match(r.cookie, /HttpOnly/);
  assert.match(r.cookie, /SameSite=Lax/);
  aliceCookie = sessionOf(r.cookie);
});
await step('refuses a duplicate account', async () => {
  assert.equal((await req('/api/auth/signup', { method: 'POST', body: alice })).status, 409);
});
await step('/me knows the session; anonymous is null', async () => {
  assert.equal((await req('/api/auth/me', { cookie: aliceCookie })).json.user.email, alice.email);
  assert.equal((await req('/api/auth/me')).json.user, null);
});
await step('wrong password is 401, right one signs in', async () => {
  assert.equal((await req('/api/auth/login', { method: 'POST', body: { email: alice.email, password: 'wrong-pass' } })).status, 401);
  const r = await req('/api/auth/login', { method: 'POST', body: { email: alice.email.toUpperCase(), password: alice.password } });
  assert.equal(r.status, 200);
});
await step('agent API needs a token', async () => {
  assert.equal((await req('/api/agent/spots')).status, 401);
  assert.equal((await req('/api/agent/whoami', { token: 'dly_not-a-token' })).status, 401);
});

let device;
await step('device flow: start, pending, slow_down', async () => {
  const r = await req('/api/auth/device', { method: 'POST', body: { client: 'e2e test' } });
  assert.equal(r.status, 200);
  device = r.json;
  assert.match(device.user_code, /^[A-Z]{4}-[A-Z]{4}$/);
  assert.ok(device.verification_uri_complete.endsWith(`/device?code=${device.user_code}`));
  const p1 = await req('/api/auth/device/token', { method: 'POST', body: { device_code: device.device_code } });
  assert.equal(p1.json.error, 'authorization_pending');
  const p2 = await req('/api/auth/device/token', { method: 'POST', body: { device_code: device.device_code } });
  assert.equal(p2.json.error, 'slow_down');
});
await step('device approval needs a signed-in browser', async () => {
  assert.equal((await req('/api/auth/device/approve', { method: 'POST', body: { code: device.user_code } })).status, 401);
  const info = await req(`/api/auth/device/info?code=${device.user_code.toLowerCase()}`, { cookie: aliceCookie });
  assert.equal(info.json.client, 'e2e test');
});
await step('approve → the CLI receives a token once', async () => {
  const a = await req('/api/auth/device/approve', { method: 'POST', body: { code: device.user_code }, cookie: aliceCookie });
  assert.equal(a.json.approved, true);
  await new Promise((r) => setTimeout(r, 2100));
  const t = await req('/api/auth/device/token', { method: 'POST', body: { device_code: device.device_code } });
  assert.ok(t.json.access_token?.startsWith('dly_'));
  assert.equal(t.json.user.email, alice.email);
  aliceToken = t.json.access_token;
  await new Promise((r) => setTimeout(r, 2100));
  const again = await req('/api/auth/device/token', { method: 'POST', body: { device_code: device.device_code } });
  assert.equal(again.json.error, 'expired_token');
});
await step('a denied device gets access_denied', async () => {
  const d = (await req('/api/auth/device', { method: 'POST', body: { client: 'deny me' } })).json;
  await req('/api/auth/device/approve', { method: 'POST', body: { code: d.user_code, approve: false }, cookie: aliceCookie });
  await new Promise((r) => setTimeout(r, 2100));
  assert.equal((await req('/api/auth/device/token', { method: 'POST', body: { device_code: d.device_code } })).json.error, 'access_denied');
});
await step('token works for the agent API and shows in Connected agents', async () => {
  const w = await req('/api/agent/whoami', { token: aliceToken });
  assert.equal(w.json.user.email, alice.email);
  const toks = await req('/api/auth/tokens', { cookie: aliceCookie });
  assert.ok(toks.json.some((t) => t.label === 'e2e test'));
  assert.ok(toks.json.every((t) => !('hash' in t)));
});
await step('an agent spot is created in the account (Kane plan starts, no review)', async () => {
  const r = await req('/api/agent/spots', {
    method: 'POST',
    token: aliceToken,
    body: { storyboard: '# Privacy check\n\nLength 4 seconds at 30 fps. Deliver one cut: 16:9 (1920x1080).\n\n## Shot 1 (0:00–0:04) Title\n- Caption reads exactly: Hello\n', client: 'e2e', dir: 'video' },
  });
  assert.equal(r.status, 201);
  aliceSpot = r.json;
  assert.match(aliceSpot.contract, /external agent/);
  assert.ok(aliceSpot.studioUrl.endsWith(`/p/${aliceSpot.id}`));
});
await step("the spot is listed for its owner, private to everyone else", async () => {
  const mine = await req('/api/projects', { cookie: aliceCookie });
  assert.ok(mine.json.some((p) => p.id === aliceSpot.id && p.source === 'mcp'));
  const r = await req('/api/auth/signup', { method: 'POST', body: bob });
  bobCookie = sessionOf(r.cookie);
  const theirs = await req('/api/projects', { cookie: bobCookie });
  assert.ok(!theirs.json.some((p) => p.id === aliceSpot.id));
  assert.equal((await req(`/api/projects/${aliceSpot.id}`, { cookie: bobCookie })).status, 404);
  assert.equal((await req(`/api/projects/${aliceSpot.id}`)).status, 404);
  assert.equal((await req(`/api/projects/${aliceSpot.id}/events.json`, { cookie: bobCookie })).status, 404);
  assert.equal((await req(`/api/agent/spots/${aliceSpot.id}/submit`, { method: 'POST', cookie: bobCookie, body: { files: { 'Video.tsx': 'x' } } })).status, 404);
});
await step('the inspect key grants read-only access (Kane’s browsers)', async () => {
  const full = await req(`/api/projects/${aliceSpot.id}`, { cookie: aliceCookie });
  const key = full.json.inspectKey;
  assert.ok(key);
  const viaKey = await req(`/api/projects/${aliceSpot.id}`, { headers: { 'x-dailies-key': key } });
  assert.equal(viaKey.status, 200);
  assert.equal(viaKey.json.inspectKey, undefined);
  assert.equal((await req(`/api/projects/${aliceSpot.id}/storyboard`, { method: 'PUT', headers: { 'x-dailies-key': key }, body: { storyboard: 'x' } })).status, 404);
});
await step('upload paths are sandboxed', async () => {
  const r = await req(`/api/agent/spots/${aliceSpot.id}/submit`, { method: 'POST', token: aliceToken, body: { files: { '../../evil.tsx': 'x', 'Video.tsx': 'x' } } });
  assert.equal(r.status, 400);
  const r2 = await req(`/api/agent/spots/${aliceSpot.id}/submit`, { method: 'POST', token: aliceToken, body: { files: { 'Helper.tsx': 'x' } } });
  assert.equal(r2.status, 400);
});
await step('revoking the token locks the agent out; logout ends the session', async () => {
  const toks = await req('/api/auth/tokens', { cookie: aliceCookie });
  const t = toks.json.find((x) => x.label === 'e2e test');
  assert.equal((await req(`/api/auth/tokens/${t.id}`, { method: 'DELETE', cookie: aliceCookie })).status, 200);
  assert.equal((await req('/api/agent/whoami', { token: aliceToken })).status, 401);
  await req('/api/auth/logout', { method: 'POST', cookie: aliceCookie });
  assert.equal((await req('/api/auth/me', { cookie: aliceCookie })).json.user, null);
});

for (const r of results) console.log(r[0], r[1], r[2] ? `\n    ${r[2]}` : '');
console.log(`\n${results.filter((r) => r[0] === '✓').length}/${results.length} passed · spot ${aliceSpot?.id ?? '-'}`);
process.exit(results.some((r) => r[0] === '✗') ? 1 : 0);
