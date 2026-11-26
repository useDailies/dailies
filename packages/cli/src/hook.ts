/**
 * `dailies hook stop` — the closed loop for external agents.
 *
 * Runs when the agent tries to end its turn. In a repository linked to a
 * dailies spot it uploads the composition and has Kane CLI judge it:
 *
 *   Claude Code: {"decision":"block","reason":"<Kane's findings>"} keeps Claude working
 *   Cursor:      {"followup_message":"<Kane's findings>"} sends the agent back in
 *
 * Anywhere else it does nothing. It fails open: an unreachable server, a missing
 * login or any error lets the agent stop, with a note.
 */
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { projectRoot, readLink } from './config.ts';
import { review } from './ops.ts';

interface StopPayload {
  cwd?: string;
  session_id?: string;
  stop_hook_active?: boolean;
  last_assistant_message?: string;
  // Cursor
  workspace_roots?: string[];
  status?: string;
  loop_count?: number;
}

async function stdin(): Promise<StopPayload> {
  if (process.stdin.isTTY) return {};
  const chunks: Buffer[] = [];
  for await (const c of process.stdin) chunks.push(c as Buffer);
  try {
    return JSON.parse(Buffer.concat(chunks).toString() || '{}');
  } catch {
    return {};
  }
}

export async function runStopHook(flavour: 'claude' | 'cursor') {
  const p = await stdin();
  const root = projectRoot(flavour === 'cursor' ? (p.workspace_roots?.[0] ?? p.cwd) : (process.env.CLAUDE_PROJECT_DIR ?? p.cwd));
  const link = readLink(root);
  const out = (o: object) => process.stdout.write(JSON.stringify(o));
  // Not a dailies repository, or nothing composed yet: stay out of the way.
  if (!link || !existsSync(join(root, link.dir, 'Video.tsx'))) return out({});
  // Cursor: a cancelled or failed turn is not an attempt to finish.
  if (flavour === 'cursor' && p.status && p.status !== 'completed') return out({});
  try {
    const { result } = await review(root, 'hook', flavour === 'cursor' ? 'Cursor' : 'Claude Code', p.last_assistant_message?.slice(0, 600));
    const blocking = result.status === 'fail' || result.status === 'compile_error';
    if (!blocking) {
      const note = result.status === 'pass' ? `dailies · ${result.message}` : `dailies · ${result.message}`;
      return out(flavour === 'cursor' ? {} : { systemMessage: `${note} ${result.studioUrl}` });
    }
    const reason = `${result.message} (${result.pass}/${result.total} checks pass)\n\n${result.feedback}\n\nStudio: ${result.studioUrl}`;
    return out(flavour === 'cursor' ? { followup_message: reason } : { decision: 'block', reason });
  } catch (e) {
    process.stderr.write(`dailies stop hook: ${(e as Error).message} — allowing the stop (not verified by Kane).\n`);
    return out(flavour === 'cursor' ? {} : { systemMessage: `dailies could not verify this turn: ${(e as Error).message}` });
  }
}
