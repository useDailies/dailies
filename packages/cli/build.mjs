/** Bundles the CLI (and its MCP SDK) into one self-contained file, also copied into the Claude Code plugin. */
import { build } from 'esbuild';
import { chmodSync, copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const out = join(here, 'dist/dailies.mjs');
await build({
  entryPoints: [join(here, 'src/main.ts')],
  outfile: out,
  bundle: true,
  platform: 'node',
  format: 'esm',
  target: 'node20',
  minify: false,
  legalComments: 'none',
  banner: { js: "#!/usr/bin/env node\nimport { createRequire as __cr } from 'node:module'; const require = __cr(import.meta.url);" },
});
chmodSync(out, 0o755);
const plugin = join(here, '../../plugins/dailies/bin/dailies.mjs');
mkdirSync(dirname(plugin), { recursive: true });
copyFileSync(out, plugin);
chmodSync(plugin, 0o755);
console.log('built', out, '→', plugin);
