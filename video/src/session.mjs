/**
 * Builds video/public/guide/session.json — the terminal transcript the film's
 * guide replays — from real Claude Code stream-json logs of a dailies MCP run.
 *   node video/src/session.mjs <run1.ndjson> [<run-with-hook-block.ndjson>] [--login-code CODE --login-url URL --user NAME]
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (k, d) => (args.includes(`--${k}`) ? args[args.indexOf(`--${k}`) + 1] : d);
const logs = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));

const lines = [];
const push = (kind, t) => lines.push({ kind, t: t.length > 92 ? t.slice(0, 91) + '…' : t });
let score = '';

for (const [i, f] of logs.entries()) {
  const ev = readFileSync(f, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
  const prompt = i === 0 ? '/dailies:video' : (opt(`prompt${i}`) ?? 'Quick one: add a comment block documenting the shots.');
  push('claude', `> ${prompt}`);
  const pending = new Map();
  for (const e of ev) {
    if (e.type === 'assistant') {
      for (const c of e.message.content) {
        if (c.type !== 'tool_use') continue;
        const name = c.name.replace('mcp__plugin_dailies_dailies__', '');
        if (name.startsWith('dailies_')) push('tool', `⏺ dailies · ${name}${name === 'dailies_review' && c.input?.note ? ` — ${c.input.note}` : ''}`);
        else if (name === 'Write' || name === 'Edit') push('tool', `⏺ ${name}(${String(c.input.file_path).split('/').slice(-2).join('/')})`);
        else continue;
        pending.set(c.id, name);
      }
    }
    if (e.type === 'user' && Array.isArray(e.message?.content)) {
      for (const c of e.message.content) {
        if (c.type !== 'tool_result' || !pending.has(c.tool_use_id)) continue;
        const name = pending.get(c.tool_use_id);
        const text = typeof c.content === 'string' ? c.content : (c.content ?? []).filter((x) => x.type === 'text').map((x) => x.text).join('\n');
        const first = text.split('\n').find((l) => l.trim()) ?? '';
        if (name === 'dailies_start') push('dim', `  ⎿ ${first.replace(/ in your dailies account\./, '')}`);
        else if (name === 'dailies_criteria') push('dim', `  ⎿ ${first}`);
        else if (name === 'dailies_review') {
          push(first.startsWith('✅') ? 'ok' : 'fail', `  ⎿ ${first}`);
          const m = first.match(/\((\d+\/\d+)\)/);
          if (m) score = m[1];
        } else if (name === 'Write') push('dim', `  ⎿ Wrote ${text.match(/(\d+) lines/)?.[1] ?? ''} lines`.replace('Wrote  lines', 'Wrote the composition'));
        else push('dim', '  ⎿ Updated');
      }
    }
    if (e.type === 'system' && e.subtype === 'hook_response' && e.hook_event === 'Stop') {
      const out = (() => {
        try {
          return JSON.parse(e.stdout || e.output || '{}');
        } catch {
          return {};
        }
      })();
      if (out.decision === 'block') {
        push('dim', '⏺ Stop hook · dailies → Kane CLI re-judges every cut');
        const reason = String(out.reason ?? '');
        push('fail', `  ⎿ Blocked: ${reason.split('\n')[0]}`);
        const crit = reason.match(/- \[(ac-\d+)\] ([^\n]+)/);
        if (crit) push('fail', `     [${crit[1]}] ${crit[2]}`);
      } else if (out.systemMessage) {
        push('dim', '⏺ Stop hook · dailies');
        push('ok', `  ⎿ ${out.systemMessage.replace(/^dailies · /, '').replace(/ http\S+$/, '')}`);
        const m = out.systemMessage.match(/\((\d+\/\d+)\)/);
        if (m) score = m[1];
      }
    }
    if (e.type === 'result') push('claude', `✻ Done · $${Number(e.total_cost_usd).toFixed(2)} · ${e.num_turns} turns`);
  }
}
// Spread the lines over the scene (fractions 0..1).
const out = lines.map((l, i) => ({ ...l, at: +(i / Math.max(1, lines.length - 1)).toFixed(3) }));
const session = {
  login: { url: opt('login-url', 'http://localhost:5173/device?code=NVTM-GWSQ'), code: opt('login-code', 'NVTM-GWSQ'), user: opt('user', 'Demo Designer <demo@dailies.dev>') },
  claude: out,
  result: { score: score || '28/28' },
};
mkdirSync(join(ROOT, 'public/guide'), { recursive: true });
writeFileSync(join(ROOT, 'public/guide/session.json'), JSON.stringify(session, null, 2));
console.log(out.map((l) => `${l.kind.padEnd(6)} ${l.t}`).join('\n'));
