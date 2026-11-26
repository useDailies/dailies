/**
 * dailies — your coding agent writes the video, Kane CLI proves every frame.
 *
 *   dailies login [--server URL]      sign in (device code, opens the browser)
 *   dailies logout | whoami
 *   dailies init [--cursor] [--claude] [--plugin] [--dir video]
 *   dailies start [storyboard.md]     link this repo to a new spot
 *   dailies review                    have Kane CLI judge video/Video.tsx now
 *   dailies status | open
 *   dailies mcp                       the MCP server (stdio) — for agent configs
 *   dailies hook stop [--cursor]      the Kane-gated Stop hook — for agent configs
 */
import { fileURLToPath } from 'node:url';
import { call, creds, NotSignedIn } from './api.ts';
import { DEFAULT_SERVER, VERSION, projectRoot, readLink } from './config.ts';
import { runStopHook } from './hook.ts';
import { init } from './init.ts';
import { login, logout, openUrl } from './login.ts';
import { runMcp } from './mcp.ts';
import { review, startSpot, summary } from './ops.ts';

const argv = process.argv.slice(2);
const flag = (n: string) => argv.includes(`--${n}`);
const opt = (n: string) => {
  const i = argv.indexOf(`--${n}`);
  return i >= 0 ? argv[i + 1] : undefined;
};
const positional = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--') && ['server', 'dir', 'title'].includes(argv[i - 1].slice(2))));
const say = (s: string) => process.stdout.write(s + '\n');

const HELP = `dailies ${VERSION} — your coding agent writes the video, Kane CLI proves every frame.

  dailies login [--server URL]     Sign in (opens your browser). Default server: ${DEFAULT_SERVER}
  dailies whoami | logout
  dailies init [--claude] [--cursor] [--plugin] [--dir video]
                                   Wire this repo: storyboard template, MCP server, Kane-gated stop hook
  dailies start [storyboard.md]    Link this repo to a new spot in your account
  dailies review                   Have Kane CLI judge the composition now
  dailies status | open            Show / open the linked spot
  dailies mcp                      Run the MCP server (stdio)
  dailies hook stop [--cursor]     The Stop hook (Claude Code / Cursor contract)
`;

async function main() {
  const [cmd, sub] = positional;
  switch (cmd) {
    case undefined:
    case 'help':
      return say(HELP);
    case '--version':
    case 'version':
      return say(VERSION);
    case 'login':
      await login(opt('server') ?? DEFAULT_SERVER);
      return;
    case 'logout':
      return logout();
    case 'whoami': {
      const c = creds();
      const me = await call<{ user: { email: string; name: string } }>('/api/agent/whoami');
      const l = readLink(projectRoot());
      return say(`${me.user.name} <${me.user.email}> on ${c.server}${l ? `\nThis repo → "${l.title}" ${l.studioUrl}` : ''}`);
    }
    case 'init': {
      const agents = [flag('claude') && 'claude', flag('cursor') && 'cursor'].filter(Boolean) as ('claude' | 'cursor')[];
      const done = init(projectRoot(), { agents: agents.length ? agents : ['claude'], dir: opt('dir') ?? 'video', cli: fileURLToPath(import.meta.url), plugin: flag('plugin') });
      say(`dailies init:\n${done.map((d) => `  + ${d}`).join('\n') || '  (already set up)'}\n\nNext: \`dailies login\`, edit the storyboard, then ask your agent to make the video.`);
      return;
    }
    case 'start': {
      const { info, reused } = await startSpot(projectRoot(), { storyboard: positional[1], dir: opt('dir'), title: opt('title'), fresh: flag('fresh'), client: 'dailies CLI' });
      return say(`${reused ? 'Linked' : 'Started'} "${info.title}" (${info.id})\n${info.studioUrl}\nKane criteria: ${info.plan.criteria ?? info.plan.status}`);
    }
    case 'review': {
      const { result, images } = await review(projectRoot(), 'cli', 'dailies CLI');
      say(summary(result));
      if (result.feedback) say(`\n${result.feedback}`);
      for (const i of images) say(`sheet ${i.ratio}: ${i.path}`);
      process.exitCode = result.status === 'pass' ? 0 : 1;
      return;
    }
    case 'status': {
      const l = readLink(projectRoot());
      if (!l) return say('This repository is not linked to a spot. Run `dailies start`.');
      const s = await call<{ phase: string; rounds: { id: string; version: number; kind: string; pass: number; total: number }[] }>(`/api/agent/spots/${l.spot}/status`);
      return say(`"${l.title}" · ${s.phase}\n${s.rounds.map((r) => `  ${r.id} v${r.version} ${r.kind} ${r.pass}/${r.total}`).join('\n')}\n${l.studioUrl}`);
    }
    case 'open': {
      const l = readLink(projectRoot());
      const url = l?.studioUrl ?? creds().server;
      openUrl(url);
      return say(url);
    }
    case 'mcp':
      return runMcp();
    case 'hook':
      if (sub !== 'stop') throw new Error('Usage: dailies hook stop [--cursor]');
      return runStopHook(flag('cursor') ? 'cursor' : 'claude');
    default:
      throw new Error(`Unknown command "${cmd}".\n\n${HELP}`);
  }
}

main().catch((e) => {
  process.stderr.write(`${e instanceof NotSignedIn ? '' : 'dailies: '}${(e as Error).message}\n`);
  process.exit(1);
});
