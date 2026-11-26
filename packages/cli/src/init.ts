/** `dailies init`: wire this repository to dailies for Claude Code and/or Cursor. */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

export const STORYBOARD_TEMPLATE = `# Halo — smart lamp launch spot

Length 10 seconds at 30 fps. Deliver two cuts: 16:9 (1920x1080), 9:16 (1080x1920).

## Shot 1 (0:00–0:03) Product hero
- A round white smart lamp glows warm amber in a dark, minimal living room.
- The lamp is fully inside the frame by 0:01.
- Caption reads exactly: Light that listens
- The caption is fully visible by 0:01.

## Shot 2 (0:03–0:06) Colour
- The lamp's glow shifts from amber to soft blue.
- A price tag reads exactly: $89 and is visible at 0:04 and at 0:05.

## Shot 3 (0:06–0:10) Call to action
- The HALO wordmark is visible throughout shot 3.
- A button labelled exactly: Pre-order now, fully visible by 0:08.
- On the 9:16 cut, no text or button sits in the bottom 35% or the top 14% of the frame.
- On every cut, all text stays fully inside the frame.
`;

const CURSOR_RULE = `---
description: Making a video with dailies (Remotion composition judged by Kane CLI)
globs: video/**
alwaysApply: false
---
When asked to make or change the video:
1. Call the dailies_start tool (storyboard: video/storyboard.md) and follow the composition contract it returns.
2. Write video/Video.tsx: one Remotion component for every cut, data-layer names on every text layer, deterministic animation, only react and remotion.
3. Call dailies_review. Fix everything Kane CLI reports and review again until every check passes. Never edit the storyboard to make a check pass.
`;

function mergeJson(file: string, fn: (j: any) => void) {
  let j: any = {};
  if (existsSync(file)) {
    try {
      j = JSON.parse(readFileSync(file, 'utf8'));
    } catch {
      throw new Error(`${file} is not valid JSON; fix or remove it and run dailies init again.`);
    }
  }
  fn(j);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, JSON.stringify(j, null, 2) + '\n');
}

export function init(root: string, opts: { agents: ('claude' | 'cursor')[]; dir: string; cli: string; plugin: boolean }) {
  const done: string[] = [];
  const cli = opts.cli;
  // Run through npx (or from node_modules)? Then point configs at the package, not at npx's temporary cache.
  const viaPackage = /[\\/](_npx|node_modules)[\\/]/.test(cli);
  const mcpServer = viaPackage ? { command: 'npx', args: ['-y', '@usedailies/cli', 'mcp'] } : { command: 'node', args: [cli, 'mcp'] };
  const hookCmd = (extra = '') => (viaPackage ? `npx -y @usedailies/cli hook stop${extra}` : `node "${cli}" hook stop${extra}`);
  const sb = join(root, opts.dir, 'storyboard.md');
  if (!existsSync(sb)) {
    mkdirSync(dirname(sb), { recursive: true });
    writeFileSync(sb, STORYBOARD_TEMPLATE);
    done.push(`${relative(root, sb)} (a template storyboard: edit it)`);
  }
  const gi = join(root, '.gitignore');
  const giText = existsSync(gi) ? readFileSync(gi, 'utf8') : '';
  if (!/^\.dailies\/?$/m.test(giText)) {
    writeFileSync(gi, `${giText}${giText && !giText.endsWith('\n') ? '\n' : ''}.dailies/\n`);
    done.push('.gitignore (+ .dailies/)');
  }

  if (opts.agents.includes('claude') && !opts.plugin) {
    mergeJson(join(root, '.mcp.json'), (j) => {
      j.mcpServers ??= {};
      j.mcpServers.dailies = mcpServer;
    });
    mergeJson(join(root, '.claude', 'settings.json'), (j) => {
      j.hooks ??= {};
      const cmd = hookCmd();
      const list: any[] = (j.hooks.Stop ??= []);
      if (!list.some((g) => g.hooks?.some((h: any) => String(h.command).includes('hook stop') && String(h.command).includes('dailies')))) {
        list.push({ hooks: [{ type: 'command', command: cmd, timeout: 600 }] });
      }
      j.enabledMcpjsonServers = [...new Set([...(j.enabledMcpjsonServers ?? []), 'dailies'])];
    });
    done.push('.mcp.json (dailies MCP server)', '.claude/settings.json (Kane-gated Stop hook)');
  }
  if (opts.agents.includes('cursor')) {
    mergeJson(join(root, '.cursor', 'mcp.json'), (j) => {
      j.mcpServers ??= {};
      j.mcpServers.dailies = { ...mcpServer, env: { DAILIES_PROJECT_DIR: '${workspaceFolder}' } };
    });
    mergeJson(join(root, '.cursor', 'hooks.json'), (j) => {
      j.version ??= 1;
      j.hooks ??= {};
      const list: any[] = (j.hooks.stop ??= []);
      if (!list.some((h) => String(h.command).includes('hook stop'))) list.push({ command: hookCmd(' --cursor'), timeout: 600, loop_limit: 4 });
    });
    mkdirSync(join(root, '.cursor', 'rules'), { recursive: true });
    writeFileSync(join(root, '.cursor', 'rules', 'dailies.mdc'), CURSOR_RULE);
    done.push('.cursor/mcp.json', '.cursor/hooks.json (Kane-gated stop → follow-up)', '.cursor/rules/dailies.mdc');
  }
  return done;
}
