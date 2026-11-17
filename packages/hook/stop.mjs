#!/usr/bin/env node
/**
 * Claude Code Stop hook for a dailies workspace.
 *
 * Claude Code runs this every time the agent tries to end its turn. Outside a
 * Kane review it allows the stop. During a review it hands the attempt to the
 * dailies server, which pins the version, has Kane CLI re-judge it, and
 * answers with Claude Code's hook contract:
 *
 *   {"decision":"block","reason":"<what Kane saw>"}  → Claude keeps working
 *   {} / {"systemMessage": "..."}                    → Claude may stop
 *
 * Fails open: if the server is unreachable the agent is never trapped.
 */
const chunks = [];
for await (const c of process.stdin) chunks.push(c);
let payload = {};
try {
  payload = JSON.parse(Buffer.concat(chunks).toString() || '{}');
} catch {
  /* empty payload */
}

import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Two ways to be gated:
//  1. dailies spawned this Claude Code session for a Kane review (env vars);
//  2. the user switched on "Gate my Claude Code" in the studio, which writes
//     .dailies-gate into the workspace — any session opened there is gated.
let { DAILIES_PHASE, DAILIES_PROJECT, DAILIES_API } = process.env;
if (DAILIES_PHASE !== 'review') {
  try {
    const gate = JSON.parse(readFileSync(join(payload.cwd ?? process.cwd(), '.dailies-gate'), 'utf8'));
    DAILIES_PROJECT = gate.project;
    DAILIES_API = gate.api;
    DAILIES_PHASE = 'gate';
  } catch {
    process.exit(0);
  }
}
if (!DAILIES_PROJECT || !DAILIES_API) process.exit(0);

try {
  const res = await fetch(`${DAILIES_API}/api/hook/stop`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ project: DAILIES_PROJECT, mode: DAILIES_PHASE, ...payload }),
    signal: AbortSignal.timeout(1450_000),
  });
  const out = await res.json();
  process.stdout.write(JSON.stringify(out ?? {}));
} catch (e) {
  process.stderr.write(`dailies stop hook: could not reach ${DAILIES_API} (${e.message}); allowing stop.\n`);
}
process.exit(0);
