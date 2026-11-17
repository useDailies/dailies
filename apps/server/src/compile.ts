import { build, type Plugin } from 'esbuild';
import { statSync } from 'node:fs';

/**
 * Compile a composition (the file Claude Code writes) into an ES module the
 * studio can import at runtime.
 *
 * The browser already holds React and Remotion (the Player needs them), so the
 * composition must use those exact instances. Bare imports are therefore
 * rewritten to `globalThis.__DAILIES_DEPS__[name]`, and anything outside the
 * allow-list fails the compile with a message Claude can act on.
 */
const ALLOWED = new Set(['react', 'react/jsx-runtime', 'react/jsx-dev-runtime', 'remotion']);

const depShim: Plugin = {
  name: 'dailies-deps',
  setup(b) {
    b.onResolve({ filter: /^[^./]/ }, (args) => {
      if (ALLOWED.has(args.path)) return { path: args.path, namespace: 'dailies-dep' };
      return {
        errors: [{ text: `"${args.path}" cannot be imported in a dailies composition. Only "react" and "remotion" are available.` }],
      };
    });
    b.onLoad({ filter: /.*/, namespace: 'dailies-dep' }, (args) => ({
      contents: `module.exports = globalThis.__DAILIES_DEPS__[${JSON.stringify(args.path)}];`,
      loader: 'js',
    }));
  },
};

export type CompileResult = { ok: true; code: string } | { ok: false; error: string };

const cache = new Map<string, { mtime: number; result: CompileResult }>();

export async function compileComposition(entry: string): Promise<CompileResult> {
  let mtime = 0;
  try {
    mtime = statSync(entry).mtimeMs;
  } catch {
    return { ok: false, error: `No composition at ${entry}` };
  }
  const hit = cache.get(entry);
  if (hit && hit.mtime === mtime) return hit.result;

  let result: CompileResult;
  try {
    const r = await build({
      entryPoints: [entry],
      bundle: true,
      write: false,
      format: 'esm',
      jsx: 'automatic',
      target: 'es2020',
      platform: 'browser',
      logLevel: 'silent',
      sourcemap: 'inline',
      plugins: [depShim],
    });
    result = { ok: true, code: r.outputFiles[0].text };
  } catch (e) {
    const errs = (e as { errors?: { text: string; location?: { file: string; line: number; column: number; lineText: string } }[] }).errors;
    result = {
      ok: false,
      error: errs?.length
        ? errs
            .map((x) =>
              x.location ? `${x.location.file.split('/').slice(-2).join('/')}:${x.location.line}:${x.location.column} ${x.text}\n    ${x.location.lineText}` : x.text,
            )
            .join('\n')
        : String(e),
    };
  }
  cache.set(entry, { mtime, result });
  return result;
}
