/**
 * The dailies MCP server (stdio). Works in Claude Code, Cursor, Codex, Windsurf…
 *
 * Tools: start · criteria · review · status · seal · whoami
 * Prompt: make_video (shows up as a slash command in clients that support prompts)
 */
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { call, creds } from './api.ts';
import { VERSION, projectRoot, readLink } from './config.ts';
import { linked, review, startSpot, summary } from './ops.ts';
import { beginLogin, finishLogin, openUrl, type DeviceStart } from './login.ts';
import { DEFAULT_SERVER, loadCredentials } from './config.ts';

const INSTRUCTIONS = `dailies is test-driven video. You write a motion-design video as a Remotion composition in this repository; Kane CLI (TestMu AI) judges every cut, frame by frame, in a real browser against acceptance criteria it derives from the storyboard.

Workflow:
1. dailies_start registers the storyboard (default video/storyboard.md) and returns the composition contract. Follow the contract exactly.
2. Write the composition at <dir>/Video.tsx (default video/Video.tsx).
3. dailies_review uploads it and has Kane judge it. Fix every failing check it reports, then review again.
4. When you stop, the dailies Stop hook (if installed) re-verifies; your turn cannot end while a check fails.
Never edit the storyboard to make a check pass.`;

type Content = { type: 'text'; text: string } | { type: 'image'; data: string; mimeType: string };
const text = (t: string): { content: Content[] } => ({ content: [{ type: 'text', text: t }] });
const failure = (e: unknown) => ({ content: [{ type: 'text' as const, text: `dailies: ${(e as Error).message}` }], isError: true });

export async function runMcp() {
  const server = new McpServer({ name: 'dailies', version: VERSION }, { instructions: INSTRUCTIONS });
  const client = () => {
    const v = server.server.getClientVersion();
    return { name: v?.name ?? 'MCP client', version: v?.version };
  };
  const root = () => projectRoot();

  // @ts-ignore TS2589: the SDK's zod generics are too deep for tsc; runtime is unaffected.
  server.registerTool(
    'dailies_start',
    {
      title: 'Start a dailies spot',
      description:
        'Register a storyboard with dailies (stored in your dailies account). Kane CLI starts designing acceptance criteria from it in the background. Returns the composition contract, the cuts, and the frames Kane will judge. Reuses the linked spot unless fresh is true.',
      inputSchema: {
        storyboard_path: z.string().optional().describe('Path to the storyboard markdown, relative to the project root. Default: <dir>/storyboard.md'),
        dir: z.string().optional().describe('Directory that holds the composition (Video.tsx). Default: video'),
        title: z.string().optional(),
        fresh: z.boolean().optional().describe('Start a new spot even if this repository is already linked to one'),
      },
    },
    async (a) => {
      try {
        const c = client();
        const { info, reused } = await startSpot(root(), { storyboard: a.storyboard_path, dir: a.dir, title: a.title, fresh: a.fresh, client: c.name, clientVersion: c.version });
        const frames = info.framesKaneJudges.map((f) => `${f.label} ${f.timecode}`).join(' · ');
        return text(
          [
            `${reused ? 'Linked spot' : 'Started spot'} "${info.title}" (${info.id}) in your dailies account.`,
            `Watch it live: ${info.studioUrl}`,
            '',
            `Cuts: ${info.cuts.map((c) => `${c.ratio} ${c.width}×${c.height}`).join(', ')} · ${info.durationSeconds}s at ${info.fps} fps · ${info.shots.length} shots`,
            `Kane judges these frames on every cut: ${frames}`,
            `Kane CLI criteria: ${info.plan.criteria ? `${info.plan.criteria} designed` : (info.plan.status ?? 'pending')} (dailies_criteria lists them).`,
            '',
            `Next: write ${info.dir}/Video.tsx following the contract below, then call dailies_review.`,
            '',
            info.contract,
          ].join('\n'),
        );
      } catch (e) {
        return failure(e);
      }
    },
  );

  server.registerTool(
    'dailies_criteria',
    {
      title: 'Kane CLI acceptance criteria',
      description: 'List the acceptance criteria Kane CLI designed from the storyboard (each mapped to cuts, timecodes and a storyboard line). Waits for Kane if it is still designing them.',
      inputSchema: { wait_seconds: z.number().int().min(0).max(600).optional().describe('How long to wait for Kane to finish designing. Default 240') },
    },
    async (a) => {
      try {
        const l = linked(root());
        const r = await call<{ ready: boolean; status?: string; criteria?: { id: string; text: string; cuts: string[]; atSeconds: number[]; storyboardLine: number | null }[]; tests?: { id: string; title: string }[] }>(
          `/api/agent/spots/${l.spot}/criteria?wait=${a.wait_seconds ?? 240}`,
          { timeoutMs: ((a.wait_seconds ?? 240) + 30) * 1000 },
        );
        if (!r.ready) return text(`Kane CLI has not finished designing the criteria yet: ${r.status}`);
        return text(
          [
            `Kane CLI designed ${r.criteria!.length} acceptance criteria and ${r.tests!.length} tests from the storyboard:`,
            ...r.criteria!.map((c) => `- [${c.id}] ${c.text}  (cuts: ${c.cuts.join(', ')}${c.atSeconds.length ? ` · at ${c.atSeconds.join('s, ')}s` : ''}${c.storyboardLine ? ` · storyboard L${c.storyboardLine}` : ''})`),
          ].join('\n'),
        );
      } catch (e) {
        return failure(e);
      }
    },
  );

  server.registerTool(
    'dailies_review',
    {
      title: 'Have Kane CLI judge the video',
      description:
        'Upload the composition (<dir>/**/*.tsx), pin it as a new version and have Kane CLI judge every criterion on every cut in a real browser. Returns verdicts, Kane’s reasons, measured text placement, and the contact sheets Kane looked at. Takes about a minute. Re-checks only what failed (then everything) after a fix.',
      inputSchema: { note: z.string().optional().describe('One line on what you changed (shown in the dailies activity log)') },
    },
    async (a) => {
      try {
        const { result, images } = await review(root(), 'mcp', client().name, a.note);
        const content: Content[] = [{ type: 'text', text: summary(result) }];
        if (result.status === 'fail' || result.status === 'compile_error' || result.status === 'capped') content.push({ type: 'text', text: result.feedback });
        for (const img of images.slice(0, 3)) {
          content.push({ type: 'text', text: `Contact sheet Kane judged for the ${img.ratio} cut (saved at ${img.path}):` });
          content.push({ type: 'image', data: img.bytes.toString('base64'), mimeType: img.path.endsWith('.jpg') ? 'image/jpeg' : 'image/png' });
        }
        return { content };
      } catch (e) {
        return failure(e);
      }
    },
  );

  server.registerTool(
    'dailies_status',
    { title: 'Spot status', description: 'The linked spot: versions, every Kane round, seal progress, and its studio link.', inputSchema: {} },
    async () => {
      try {
        const l = linked(root());
        const s = await call<{ phase: string; busy: string | null; versions: number; rounds: { id: string; version: number; kind: string; pass: number; total: number; credits: number }[]; seal: unknown; studioUrl: string }>(`/api/agent/spots/${l.spot}/status`);
        return text(
          [
            `"${l.title}" (${l.spot}) · ${s.phase}${s.busy ? ` · busy: ${s.busy}` : ''} · ${s.versions} version(s)`,
            ...s.rounds.map((r) => `- ${r.id} v${r.version} ${r.kind}: ${r.pass}/${r.total} pass · ${r.credits.toFixed(1)} cr`),
            s.seal ? `Seal: ${JSON.stringify(s.seal)}` : 'Not sealed.',
            `Studio: ${s.studioUrl}`,
          ].join('\n'),
        );
      } catch (e) {
        return failure(e);
      }
    },
  );

  server.registerTool(
    'dailies_seal',
    {
      title: 'Seal with Kane’s own tests',
      description: 'Run the tests Kane CLI designed (kane-cli testmd run) against the latest version and report coverage (kane-cli cover). Runs in the background for several minutes and costs several hundred Kane credits; check progress with dailies_status. Only seal a version that passes review.',
      inputSchema: {},
    },
    async () => {
      try {
        const l = linked(root());
        const r = await call<{ studioUrl: string }>(`/api/agent/spots/${l.spot}/seal`, { method: 'POST', body: '{}' });
        return text(`Sealing started: Kane CLI is running its designed tests against the latest version. Follow it at ${r.studioUrl} or with dailies_status.`);
      } catch (e) {
        return failure(e);
      }
    },
  );

  server.registerTool('dailies_whoami', { title: 'dailies account', description: 'The dailies account this MCP server is signed in to, and the spot this repository is linked to.', inputSchema: {} }, async () => {
    try {
      const c = creds();
      const me = await call<{ user: { email: string; name: string }; server: string }>('/api/agent/whoami');
      const l = readLink(root());
      return text(`Signed in to ${c.server} as ${me.user.name} <${me.user.email}>.${l ? `\nThis repository is linked to "${l.title}" (${l.spot}): ${l.studioUrl}` : '\nThis repository is not linked to a spot yet.'}`);
    } catch (e) {
      return failure(e);
    }
  });

  let pendingLogin: DeviceStart | null = null;
  server.registerTool(
    'dailies_login',
    {
      title: 'Sign in to dailies',
      description:
        'Connect this agent to the user’s dailies account (device sign-in in the browser). The first call returns a link and a code for the user to approve; call it again after they approve to finish. Spots and Kane runs are then saved to that account.',
      inputSchema: { server: z.string().optional().describe(`dailies server URL. Default ${DEFAULT_SERVER}`) },
    },
    async (a) => {
      try {
        const existing = loadCredentials();
        if (existing?.token && !pendingLogin) {
          try {
            const me = await call<{ user: { email: string; name: string } }>('/api/agent/whoami');
            return text(`Already signed in to ${existing.server} as ${me.user.name} <${me.user.email}>.`);
          } catch {
            /* expired or revoked: sign in again */
          }
        }
        if (pendingLogin && Date.now() < pendingLogin.startedAt + pendingLogin.expires_in * 1000) {
          const user = await finishLogin(pendingLogin, 90_000);
          if (user) {
            pendingLogin = null;
            return text(`Signed in as ${user.name} <${user.email}>. Spots you make now are saved to this account.`);
          }
          return text(`Still waiting for approval. Ask the user to open ${pendingLogin.verification_uri_complete} and approve code ${pendingLogin.user_code}, then call dailies_login again.`);
        }
        pendingLogin = await beginLogin(a.server ?? DEFAULT_SERVER);
        openUrl(pendingLogin.verification_uri_complete);
        return text(
          `To connect dailies, the user approves this sign-in in their browser (opened automatically if possible):\n\n  ${pendingLogin.verification_uri_complete}\n  code: ${pendingLogin.user_code}\n\nShow the user this link and code, and once they say it is approved, call dailies_login again to finish.`,
        );
      } catch (e) {
        pendingLogin = null;
        return failure(e);
      }
    },
  );

  server.registerPrompt(
    'make_video',
    {
      title: 'Make a video with dailies',
      description: 'Compose the storyboard as a Remotion video and have Kane CLI prove every frame.',
      argsSchema: { storyboard: z.string().optional().describe('Path to the storyboard (default video/storyboard.md)') },
    },
    (a) => ({
      messages: [
        {
          role: 'user',
          content: {
            type: 'text',
            text: makeVideoPrompt(a.storyboard),
          },
        },
      ],
    }),
  );

  await server.connect(new StdioServerTransport());
}

export function makeVideoPrompt(storyboard?: string) {
  return `Make the video described in ${storyboard ?? 'video/storyboard.md'} with dailies.

1. Call dailies_start${storyboard ? ` with storyboard_path "${storyboard}"` : ''} and read the composition contract it returns.
2. Write the composition at video/Video.tsx exactly as the contract says: every cut from one component, named data-layer text layers, deterministic animation, only react and remotion. Make it look like a premium launch spot.
3. Call dailies_review. Kane CLI judges every cut frame by frame. If anything fails, read Kane's findings and the contact sheet, fix the composition, and review again until every check passes.
4. Finish with a short summary: the studio link, the final score, and what Kane caught along the way.`;
}
