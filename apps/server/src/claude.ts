import { spawn, type ChildProcess } from 'node:child_process';
import { relative } from 'node:path';
import { config } from './config.ts';

/**
 * Claude Code, headless. dailies spawns the user's own `claude` CLI inside the
 * project workspace, streams its JSON events to the studio, and lets the
 * workspace's Stop hook decide when Claude may finish.
 */
export type ClaudeEvent =
  | { kind: 'init'; sessionId: string; model: string }
  | { kind: 'text'; text: string }
  | { kind: 'thinking' }
  | { kind: 'tool'; id: string; tool: string; file?: string; summary: string; added?: number; removed?: number }
  | { kind: 'tool_result'; id: string; ok: boolean; summary: string }
  | { kind: 'hook_feedback'; text: string }
  | { kind: 'typing'; file: string; chars: number; tail: string }
  | { kind: 'result'; ok: boolean; costUsd: number; turns: number; durationMs: number; text: string };

export interface ClaudeRun {
  child: ChildProcess;
  done: Promise<{ code: number | null; sessionId?: string; lastText: string; costUsd: number; turns: number }>;
}

function countLines(s: unknown) {
  return typeof s === 'string' && s.length ? s.split('\n').length : 0;
}

export function runClaude(opts: {
  cwd: string;
  prompt: string;
  resume?: string;
  model?: string;
  env?: Record<string, string>;
  onEvent: (e: ClaudeEvent) => void;
}): ClaudeRun {
  const args = [
    '-p',
    opts.prompt,
    '--output-format',
    'stream-json',
    '--verbose',
    // Partial messages let the studio show the code while Claude is still typing it.
    '--include-partial-messages',
    '--permission-mode',
    'acceptEdits',
    '--tools',
    'Read,Edit,Write,Glob,Grep',
    // Only the workspace's own settings (its Stop hook); never the user's global hooks or MCP servers.
    '--setting-sources',
    'project',
    '--strict-mcp-config',
    '--model',
    opts.model ?? config.claude.model,
  ];
  if (opts.resume) args.push('--resume', opts.resume);

  const child = spawn(config.claude.bin, args, {
    cwd: opts.cwd,
    env: { ...process.env, ...opts.env },
    stdio: ['ignore', 'pipe', 'pipe'],
  });

  let sessionId: string | undefined;
  let lastText = '';
  let costUsd = 0;
  let turns = 0;
  let buf = '';
  const rel = (f?: string) => (f ? relative(opts.cwd, f) || f : undefined);

  // Streaming tool input: reassemble the partial JSON of a Write/Edit and emit
  // the tail of the code being typed, at most ~3 times a second.
  const partial = new Map<number, { tool: string; json: string }>();
  let lastTyping = 0;
  const emitTyping = (blk: { tool: string; json: string }, force = false) => {
    const now = Date.now();
    if (!force && now - lastTyping < 320) return;
    lastTyping = now;
    const file = rel(blk.json.match(/"file_path"\s*:\s*"([^"]+)"/)?.[1]) ?? 'src/Video.tsx';
    const key = blk.tool === 'Edit' ? 'new_string' : 'content';
    const at = blk.json.indexOf(`"${key}"`);
    if (at < 0) return;
    const start = blk.json.indexOf('"', blk.json.indexOf(':', at) + 1);
    if (start < 0) return;
    const text = unescapePartial(blk.json.slice(start + 1));
    opts.onEvent({ kind: 'typing', file, chars: text.length, tail: text.slice(-1800) });
  };

  const handle = (o: any) => {
    if (o.type === 'stream_event') {
      const ev = o.event ?? {};
      if (ev.type === 'content_block_start' && ev.content_block?.type === 'tool_use' && /^(Write|Edit)$/.test(ev.content_block.name)) {
        partial.set(ev.index, { tool: ev.content_block.name, json: '' });
      } else if (ev.type === 'content_block_delta' && ev.delta?.type === 'input_json_delta' && partial.has(ev.index)) {
        const blk = partial.get(ev.index)!;
        blk.json += ev.delta.partial_json ?? '';
        emitTyping(blk);
      } else if (ev.type === 'content_block_stop' && partial.has(ev.index)) {
        emitTyping(partial.get(ev.index)!, true);
        partial.delete(ev.index);
      }
      return;
    }
    if (o.type === 'system' && o.subtype === 'init') {
      sessionId = o.session_id;
      opts.onEvent({ kind: 'init', sessionId: o.session_id, model: o.model ?? '' });
    } else if (o.type === 'assistant') {
      for (const c of o.message?.content ?? []) {
        if (c.type === 'text' && c.text?.trim()) {
          lastText = c.text;
          opts.onEvent({ kind: 'text', text: c.text });
        } else if (c.type === 'thinking') {
          opts.onEvent({ kind: 'thinking' });
        } else if (c.type === 'tool_use') {
          const i = c.input ?? {};
          const file = rel(i.file_path ?? i.path);
          let summary = c.name;
          let added: number | undefined;
          let removed: number | undefined;
          if (c.name === 'Write') {
            added = countLines(i.content);
            summary = `Write ${file} (${added} lines)`;
          } else if (c.name === 'Edit') {
            added = countLines(i.new_string);
            removed = countLines(i.old_string);
            summary = `Edit ${file}`;
          } else if (c.name === 'Read') summary = `Read ${file}`;
          else if (c.name === 'Glob' || c.name === 'Grep') summary = `${c.name} ${i.pattern ?? ''}`;
          opts.onEvent({ kind: 'tool', id: c.id, tool: c.name, file, summary, added, removed });
        }
      }
    } else if (o.type === 'user') {
      const content = o.message?.content;
      if (Array.isArray(content)) {
        for (const c of content) {
          if (c.type === 'tool_result') {
            const txt = Array.isArray(c.content) ? c.content.map((x: any) => x.text ?? '').join(' ') : String(c.content ?? '');
            opts.onEvent({ kind: 'tool_result', id: c.tool_use_id, ok: !c.is_error, summary: txt.slice(0, 240) });
          } else if (c.type === 'text' && /hook feedback/i.test(c.text ?? '')) {
            opts.onEvent({ kind: 'hook_feedback', text: c.text });
          }
        }
      } else if (typeof content === 'string' && /hook feedback/i.test(content)) {
        opts.onEvent({ kind: 'hook_feedback', text: content });
      }
    } else if (o.type === 'result') {
      costUsd = o.total_cost_usd ?? 0;
      turns = o.num_turns ?? 0;
      opts.onEvent({
        kind: 'result',
        ok: o.subtype === 'success' && !o.is_error,
        costUsd,
        turns,
        durationMs: o.duration_ms ?? 0,
        text: o.result ?? '',
      });
    }
  };

  child.stdout!.on('data', (d) => {
    buf += d.toString();
    let i: number;
    while ((i = buf.indexOf('\n')) >= 0) {
      const line = buf.slice(0, i).trim();
      buf = buf.slice(i + 1);
      if (!line) continue;
      try {
        handle(JSON.parse(line));
      } catch {
        /* non-JSON noise */
      }
    }
  });
  let stderr = '';
  child.stderr!.on('data', (d) => {
    stderr += d.toString();
    if (stderr.length > 8000) stderr = stderr.slice(-8000);
  });

  const done = new Promise<{ code: number | null; sessionId?: string; lastText: string; costUsd: number; turns: number }>((resolve) => {
    child.on('close', (code) => {
      if (code && !lastText) lastText = stderr.trim().split('\n').slice(-3).join(' ');
      resolve({ code, sessionId, lastText, costUsd, turns });
    });
    child.on('error', (err) => {
      lastText = `could not start claude: ${err.message}`;
      resolve({ code: -1, sessionId, lastText, costUsd, turns });
    });
  });
  return { child, done };
}

export async function claudeVersion(): Promise<string | null> {
  return new Promise((resolve) => {
    const c = spawn(config.claude.bin, ['--version']);
    let out = '';
    c.stdout.on('data', (d) => (out += d));
    c.on('close', (code) => resolve(code === 0 ? out.trim() : null));
    c.on('error', () => resolve(null));
  });
}

/** Decode a JSON string body that may be cut off mid-escape. */
function unescapePartial(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"') break;
    if (c !== '\\') {
      out += c;
      continue;
    }
    const n = s[++i];
    if (n === undefined) break;
    if (n === 'n') out += '\n';
    else if (n === 't') out += '  ';
    else if (n === 'r') continue;
    else if (n === 'u') {
      const hex = s.slice(i + 1, i + 5);
      if (hex.length < 4) break;
      out += String.fromCharCode(parseInt(hex, 16));
      i += 4;
    } else out += n;
  }
  return out;
}
