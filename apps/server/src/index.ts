import Fastify from 'fastify';
import { createReadStream, existsSync } from 'node:fs';
import { join, normalize } from 'node:path';
import { diffLines } from 'diff';
import { bus } from './bus.ts';
import { closeAll } from './chrome.ts';
import { claudeVersion } from './claude.ts';
import { compileComposition } from './compile.ts';
import { config } from './config.ts';
import { kaneIdentity, killAllKane } from './kane.ts';
import { cancel, onStopHook, setGate, startDraft, startReview, startRevise, startSeal } from './pipeline.ts';
import { randomBytes } from 'node:crypto';
const inspectKey = () => randomBytes(12).toString('base64url');
import { createProject, getProject, listProjects, setStoryboard, updateProject, versionEntry, versionSource, ws } from './store.ts';
import type { FastifyRequest } from 'fastify';
import type { Project } from '@dailies/shared';
import {
  AuthError,
  approveDevice,
  clearSessionCookie,
  deviceByUserCode,
  issueToken,
  listTokens,
  pollDevice,
  publicUser,
  requestUser,
  revokeSecret,
  revokeToken,
  sessionSecret,
  setSessionCookie,
  signup,
  startDevice,
  verifyPassword,
} from './auth.ts';
import { criteriaFor, describeSpot, startAgentSpot, submit } from './agent.ts';

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? 'warn' }, bodyLimit: 2 * 1024 * 1024 });

const fail = (status: number, message: string) => Object.assign(new Error(message), { statusCode: status });

/**
 * Access: a spot with an owner is private to that account. Kane's inspection
 * browsers carry no login, so a spot's read-only inspect key (embedded in its
 * sheet URLs) also grants read access. Unowned spots (local runs, recorded
 * examples) are readable by everyone.
 */
type Access = 'read' | 'write';
function canAccess(req: FastifyRequest, p: Project, mode: Access) {
  if (!p.owner) return true;
  const u = requestUser(req);
  if (u?.user.id === p.owner) return true;
  if (mode === 'read' && p.inspectKey && req.headers['x-dailies-key'] === p.inspectKey) return true;
  return false;
}
function projectFor(req: FastifyRequest, id: string, mode: Access = 'read') {
  const p = getProject(id);
  if (!p || !canAccess(req, p, mode)) throw fail(404, `No project ${id}`);
  return p;
}
function redact(req: FastifyRequest, p: Project): Project {
  if (!p.owner || requestUser(req)?.user.id === p.owner) return p;
  const { inspectKey: _k, ...rest } = p;
  return rest as Project;
}
function needUser(req: FastifyRequest) {
  const u = requestUser(req);
  if (!u) throw fail(401, 'Sign in first: run `dailies login`, or sign in at the studio.');
  return u;
}
const secureCookies = config.publicUrl.startsWith('https://');

function version(raw: string): number | 'live' {
  if (raw === 'live') return 'live';
  const n = Number(raw.replace(/^v/, ''));
  if (!Number.isInteger(n) || n < 1) throw fail(400, `Bad version ${raw}`);
  return n;
}

/* ------------------------------------------------------------- health */

let identity: { at: number; value: Awaited<ReturnType<typeof kaneIdentity>> } | null = null;
let claudeV: string | null | undefined;

app.get('/api/health', async () => {
  if (!identity || Date.now() - identity.at > 60_000) identity = { at: Date.now(), value: await kaneIdentity() };
  if (claudeV === undefined) claudeV = await claudeVersion();
  return {
    ok: true,
    claude: { installed: Boolean(claudeV), version: claudeV, model: config.claude.model },
    kane: identity.value,
    studioUrl: config.studioUrl,
  };
});

/* ----------------------------------------------------------- projects */

app.get('/api/projects', async (req) => {
  const u = requestUser(req);
  return listProjects().filter((p) => !p.owner || p.owner === u?.user.id).map((p) => redact(req, p));
});

app.post<{ Body: { storyboard: string; title?: string } }>('/api/projects', async (req) => {
  if (!req.body?.storyboard?.trim()) throw fail(400, 'storyboard is required');
  const u = requestUser(req);
  const p = createProject(req.body.storyboard, req.body.title);
  if (!u) return p;
  return updateProject(p.id, (pp) => {
    pp.owner = u.user.id;
    pp.source = 'studio';
    pp.inspectKey = inspectKey();
  });
});

app.get<{ Params: { id: string } }>('/api/projects/:id', async (req) => redact(req, projectFor(req, req.params.id)));

app.put<{ Params: { id: string }; Body: { storyboard: string } }>('/api/projects/:id/storyboard', async (req) => {
  const p = projectFor(req, req.params.id, 'write');
  if (p.busy) throw fail(409, `busy: ${p.busy}`);
  return setStoryboard(p.id, req.body.storyboard);
});

app.patch<{ Params: { id: string }; Body: { title?: string; gate?: boolean } }>('/api/projects/:id', async (req) => {
  const p = projectFor(req, req.params.id, 'write');
  if (typeof req.body.gate === 'boolean') {
    if (p.recorded) throw fail(403, 'Recorded runs cannot be gated.');
    setGate(p.id, req.body.gate);
  }
  return updateProject(req.params.id, (pp) => {
    if (req.body.title) pp.title = req.body.title.slice(0, 80);
  });
});

for (const [route, fn] of [
  ['draft', startDraft],
  ['review', startReview],
  ['seal', startSeal],
] as const) {
  app.post<{ Params: { id: string } }>(`/api/projects/:id/${route}`, async (req, reply) => {
    const p = projectFor(req, req.params.id, 'write');
    if (p.recorded) throw fail(403, 'This is a recorded run. Create a new project to run live.');
    try {
      fn(p.id);
    } catch (e) {
      const err = e as Error & { status?: number };
      throw fail(err.status ?? 500, err.message);
    }
    reply.code(202);
    return { ok: true };
  });
}

app.post<{ Params: { id: string }; Body: { request?: string } }>('/api/projects/:id/revise', async (req, reply) => {
  const p = projectFor(req, req.params.id, 'write');
  if (p.recorded) throw fail(403, 'This is a recorded run. Create a new project to run live.');
  const request = String(req.body?.request ?? '').trim();
  if (request.length < 4) throw fail(400, 'Describe the change you want');
  try {
    startRevise(p.id, request.slice(0, 2000));
  } catch (e) {
    const err = e as Error & { status?: number };
    throw fail(err.status ?? 500, err.message);
  }
  reply.code(202);
  return { ok: true };
});

app.post<{ Params: { id: string } }>('/api/projects/:id/cancel', async (req) => {
  cancel(projectFor(req, req.params.id, 'write').id);
  return { ok: true };
});

/* -------------------------------------------------------------- events */

app.get<{ Params: { id: string }; Querystring: { since?: string } }>('/api/projects/:id/events.json', async (req) => {
  projectFor(req, req.params.id);
  return bus.history(req.params.id, Number(req.query.since ?? 0));
});

app.get<{ Params: { id: string }; Querystring: { since?: string } }>('/api/projects/:id/events', (req, reply) => {
  const id = projectFor(req, req.params.id).id;
  reply.raw.writeHead(200, {
    'content-type': 'text/event-stream',
    'cache-control': 'no-cache, no-transform',
    connection: 'keep-alive',
    'x-accel-buffering': 'no',
  });
  const send = (e: unknown) => reply.raw.write(`data: ${JSON.stringify(e)}\n\n`);
  const lastId = Number(req.headers['last-event-id'] ?? req.query.since ?? 0);
  for (const e of bus.history(id, lastId)) send(e);
  const off = bus.subscribe(id, send);
  const ping = setInterval(() => reply.raw.write(': ping\n\n'), 15_000);
  req.raw.on('close', () => {
    off();
    clearInterval(ping);
  });
});

/* ------------------------------------------------------------ versions */

app.get<{ Params: { id: string; v: string } }>('/api/projects/:id/module/:v', async (req, reply) => {
  const p = projectFor(req, req.params.id);
  const v = version(req.params.v.replace(/\.js$/, ''));
  const r = await compileComposition(versionEntry(p.id, v));
  reply.header('cache-control', v === 'live' ? 'no-store' : 'public, max-age=31536000, immutable');
  if (!r.ok) {
    reply.code(422).type('application/json');
    return { error: r.error };
  }
  reply.type('text/javascript');
  return r.code;
});

app.get<{ Params: { id: string; v: string } }>('/api/projects/:id/source/:v', async (req, reply) => {
  const src = versionSource(projectFor(req, req.params.id).id, version(req.params.v));
  if (src === null) throw fail(404, 'no such version');
  reply.type('text/plain; charset=utf-8');
  return src;
});

app.get<{ Params: { id: string; a: string; b: string } }>('/api/projects/:id/diff/:a/:b', async (req) => {
  const id = projectFor(req, req.params.id).id;
  const a = versionSource(id, version(req.params.a)) ?? '';
  const b = versionSource(id, version(req.params.b)) ?? '';
  return diffLines(a, b).map((p) => ({ added: Boolean(p.added), removed: Boolean(p.removed), value: p.value, count: p.count ?? 0 }));
});

app.get<{ Params: { id: string; '*': string } }>('/api/projects/:id/files/*', async (req, reply) => {
  const id = projectFor(req, req.params.id).id;
  const rel = normalize(req.params['*']).replace(/^(\.\.(\/|\\|$))+/, '');
  if (!/^(eye\/|rounds\/)/.test(rel)) throw fail(404, 'not found');
  const f = join(ws(id, 'runs'), rel);
  if (!existsSync(f)) throw fail(404, 'not found');
  reply.header('cache-control', 'public, max-age=31536000, immutable');
  reply.type(f.endsWith('.png') ? 'image/png' : f.endsWith('.jpg') ? 'image/jpeg' : 'application/json');
  return reply.send(createReadStream(f));
});

app.get<{ Params: { id: string } }>('/api/projects/:id/tests', async (req) => {
  const p = projectFor(req, req.params.id);
  const { readFileSync, readdirSync } = await import('node:fs');
  const dir = ws(p.id, '.testmuai', 'tests');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('_test.md'))
    .map((f) => ({ file: f, body: readFileSync(join(dir, f), 'utf8') }));
});


/* ------------------------------------------------------------ accounts */

app.post<{ Body: { email: string; password: string; name?: string } }>('/api/auth/signup', async (req, reply) => {
  const u = signup(req.body?.email, req.body?.password, req.body?.name);
  setSessionCookie(reply, issueToken(u.id, 'web', String(req.headers['user-agent'] ?? 'browser'), 30), secureCookies);
  return { user: publicUser(u) };
});

app.post<{ Body: { email: string; password: string } }>('/api/auth/login', async (req, reply) => {
  const u = verifyPassword(req.body?.email, req.body?.password);
  setSessionCookie(reply, issueToken(u.id, 'web', String(req.headers['user-agent'] ?? 'browser'), 30), secureCookies);
  return { user: publicUser(u) };
});

app.post('/api/auth/logout', async (req, reply) => {
  const s = sessionSecret(req);
  if (s) revokeSecret(s);
  clearSessionCookie(reply);
  return { ok: true };
});

app.get('/api/auth/me', async (req) => {
  const u = requestUser(req);
  if (!u) return { user: null };
  const spots = listProjects().filter((p) => p.owner === u.user.id);
  return { user: publicUser(u.user), via: u.via, spots: spots.length, agentSpots: spots.filter((p) => p.source === 'mcp').length };
});

app.get('/api/auth/tokens', async (req) => listTokens(needUser(req).user.id));
app.delete<{ Params: { id: string } }>('/api/auth/tokens/:id', async (req) => {
  if (!revokeToken(needUser(req).user.id, req.params.id)) throw fail(404, 'No such token');
  return { ok: true };
});

/* Device authorization (RFC 8628 shape) for `dailies login`. */
app.post<{ Body: { client?: string } }>('/api/auth/device', async (req) => {
  const d = startDevice(req.body?.client ?? 'dailies CLI');
  return {
    device_code: d.deviceCode,
    user_code: d.userCode,
    verification_uri: `${config.publicUrl}/device`,
    verification_uri_complete: `${config.publicUrl}/device?code=${d.userCode}`,
    expires_in: Math.round((d.expiresAt - Date.now()) / 1000),
    interval: d.interval,
  };
});
app.post<{ Body: { device_code: string } }>('/api/auth/device/token', async (req, reply) => {
  const r = pollDevice(req.body?.device_code);
  if (r.error) reply.code(400);
  return r;
});
app.get<{ Querystring: { code: string } }>('/api/auth/device/info', async (req) => {
  needUser(req);
  const d = deviceByUserCode(req.query.code);
  if (!d) throw fail(404, 'That code has expired or was already used. Run `dailies login` again.');
  return { user_code: d.userCode, client: d.label, expires_in: Math.round((d.expiresAt - Date.now()) / 1000) };
});
app.post<{ Body: { code: string; approve: boolean } }>('/api/auth/device/approve', async (req) => {
  const u = needUser(req);
  const d = approveDevice(req.body?.code, u.user, req.body?.approve !== false);
  return { ok: true, client: d.label, approved: !d.denied };
});

/* ---------------------------------------------------- external agents */

app.get('/api/agent/whoami', async (req) => {
  const u = needUser(req);
  return { user: publicUser(u.user), server: config.publicUrl, token: { label: u.token.label, createdAt: u.token.createdAt } };
});

app.get('/api/agent/spots', async (req) => {
  const u = needUser(req);
  return listProjects()
    .filter((p) => p.owner === u.user.id)
    .map((p) => ({ id: p.id, title: p.title, source: p.source ?? 'studio', client: p.agent?.client, phase: p.phase, versions: p.versions.length, updatedAt: p.updatedAt, studioUrl: `${config.publicUrl}/p/${p.id}` }));
});

app.post<{ Body: { storyboard: string; title?: string; client?: string; clientVersion?: string; dir?: string; repo?: string } }>('/api/agent/spots', async (req, reply) => {
  const u = needUser(req);
  reply.code(201);
  return startAgentSpot(u.user.id, req.body);
});

app.get<{ Params: { id: string } }>('/api/agent/spots/:id', async (req) => describeSpot(projectFor(req, req.params.id, 'write').id));

app.get<{ Params: { id: string }; Querystring: { wait?: string } }>('/api/agent/spots/:id/criteria', async (req) =>
  criteriaFor(projectFor(req, req.params.id, 'write').id, Math.min(600, Number(req.query.wait ?? 0))),
);

app.post<{ Params: { id: string }; Body: { files: Record<string, string>; summary?: string; trigger?: 'mcp' | 'hook'; client?: string } }>(
  '/api/agent/spots/:id/submit',
  async (req) => {
    const p = projectFor(req, req.params.id, 'write');
    if (p.busy && p.busy !== 'plan' && p.busy !== 'agent') throw fail(409, `This spot is busy (${p.busy}).`);
    return submit(p.id, req.body);
  },
);

app.post<{ Params: { id: string } }>('/api/agent/spots/:id/seal', async (req, reply) => {
  const p = projectFor(req, req.params.id, 'write');
  try {
    startSeal(p.id);
  } catch (e) {
    const err = e as Error & { status?: number };
    throw fail(err.status ?? 500, err.message);
  }
  reply.code(202);
  return { ok: true, studioUrl: `${config.publicUrl}/p/${p.id}` };
});

app.get<{ Params: { id: string } }>('/api/agent/spots/:id/status', async (req) => {
  const p = projectFor(req, req.params.id, 'write');
  return {
    id: p.id,
    phase: p.phase,
    busy: p.busy ?? null,
    error: p.error ?? null,
    versions: p.versions.length,
    rounds: p.rounds.map((r) => ({ id: r.id, version: r.version, kind: r.kind, pass: r.results.filter((x) => x.verdict === 'pass').length, total: r.results.length, credits: r.credits })),
    seal: p.seal
      ? { version: p.seal.version, done: Boolean(p.seal.endedAt), tests: p.seal.tests.map((t) => ({ id: t.id, title: t.title, status: t.status, reason: t.reason ?? null })), coverage: p.seal.coverage ?? null }
      : null,
    studioUrl: `${config.publicUrl}/p/${p.id}`,
  };
});

/* ---------------------------------------------------------------- hook */

app.post<{ Body: { project: string; mode?: string; session_id?: string; stop_hook_active?: boolean; last_assistant_message?: string } }>(
  '/api/hook/stop',
  async (req) => {
    const p = getProject(req.body?.project ?? '');
    if (!p) return {};
    return onStopHook(p.id, req.body);
  },
);

/* ------------------------------------------------------------- startup */

app.setErrorHandler((err, _req, reply) => {
  const status = err instanceof AuthError ? err.statusCode : ((err as { statusCode?: number }).statusCode ?? 500);
  reply.code(status).send({ error: (err as Error).message });
});

const shutdown = async () => {
  killAllKane();
  await closeAll();
  process.exit(0);
};
process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

// A process restart cannot resume a half-finished run; clear stale locks.
for (const p of listProjects()) {
  if (p.busy) updateProject(p.id, (pp) => {
    pp.busy = null;
    pp.error = 'Interrupted by a server restart';
  });
}

await app.listen({ port: config.port, host: '127.0.0.1' });
console.log(`dailies server on http://127.0.0.1:${config.port} · studio ${config.studioUrl} · workspaces ${config.workspaces}`);
