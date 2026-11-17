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
import { createProject, getProject, listProjects, setStoryboard, updateProject, versionEntry, versionSource, ws } from './store.ts';

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? 'warn' }, bodyLimit: 2 * 1024 * 1024 });

const fail = (status: number, message: string) => Object.assign(new Error(message), { statusCode: status });

function project(id: string) {
  const p = getProject(id);
  if (!p) throw fail(404, `No project ${id}`);
  return p;
}

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

app.get('/api/projects', async () => listProjects());

app.post<{ Body: { storyboard: string; title?: string } }>('/api/projects', async (req) => {
  if (!req.body?.storyboard?.trim()) throw fail(400, 'storyboard is required');
  return createProject(req.body.storyboard, req.body.title);
});

app.get<{ Params: { id: string } }>('/api/projects/:id', async (req) => project(req.params.id));

app.put<{ Params: { id: string }; Body: { storyboard: string } }>('/api/projects/:id/storyboard', async (req) => {
  const p = project(req.params.id);
  if (p.busy) throw fail(409, `busy: ${p.busy}`);
  return setStoryboard(p.id, req.body.storyboard);
});

app.patch<{ Params: { id: string }; Body: { title?: string; gate?: boolean } }>('/api/projects/:id', async (req) => {
  const p = project(req.params.id);
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
    const p = project(req.params.id);
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
  const p = project(req.params.id);
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
  cancel(project(req.params.id).id);
  return { ok: true };
});

/* -------------------------------------------------------------- events */

app.get<{ Params: { id: string }; Querystring: { since?: string } }>('/api/projects/:id/events.json', async (req) => {
  project(req.params.id);
  return bus.history(req.params.id, Number(req.query.since ?? 0));
});

app.get<{ Params: { id: string }; Querystring: { since?: string } }>('/api/projects/:id/events', (req, reply) => {
  const id = project(req.params.id).id;
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
  const p = project(req.params.id);
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
  const src = versionSource(project(req.params.id).id, version(req.params.v));
  if (src === null) throw fail(404, 'no such version');
  reply.type('text/plain; charset=utf-8');
  return src;
});

app.get<{ Params: { id: string; a: string; b: string } }>('/api/projects/:id/diff/:a/:b', async (req) => {
  const id = project(req.params.id).id;
  const a = versionSource(id, version(req.params.a)) ?? '';
  const b = versionSource(id, version(req.params.b)) ?? '';
  return diffLines(a, b).map((p) => ({ added: Boolean(p.added), removed: Boolean(p.removed), value: p.value, count: p.count ?? 0 }));
});

app.get<{ Params: { id: string; '*': string } }>('/api/projects/:id/files/*', async (req, reply) => {
  const id = project(req.params.id).id;
  const rel = normalize(req.params['*']).replace(/^(\.\.(\/|\\|$))+/, '');
  if (!/^(eye\/|rounds\/)/.test(rel)) throw fail(404, 'not found');
  const f = join(ws(id, 'runs'), rel);
  if (!existsSync(f)) throw fail(404, 'not found');
  reply.header('cache-control', 'public, max-age=31536000, immutable');
  reply.type(f.endsWith('.png') ? 'image/png' : 'application/json');
  return reply.send(createReadStream(f));
});

app.get<{ Params: { id: string } }>('/api/projects/:id/tests', async (req) => {
  const p = project(req.params.id);
  const { readFileSync, readdirSync } = await import('node:fs');
  const dir = ws(p.id, '.testmuai', 'tests');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('_test.md'))
    .map((f) => ({ file: f, body: readFileSync(join(dir, f), 'utf8') }));
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
  const status = (err as { statusCode?: number }).statusCode ?? 500;
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
