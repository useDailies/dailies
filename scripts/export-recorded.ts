/**
 * Export finished runs as static recordings for the hosted studio.
 *
 *   npx tsx scripts/export-recorded.ts <projectId> [<projectId> …]
 *
 * Writes apps/studio/public/recorded/<id>/ with everything the studio reads
 * from the API in live mode: project.json (marked recorded), the full event
 * log, each version's compiled module and source, diffs, Kane's-eye
 * screenshots and the designed test files. `VITE_DAILIES_STATIC=1 npm run build`
 * then produces a site that replays the real run with its real timing.
 */
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { diffLines } from 'diff';
import { compileComposition } from '../apps/server/src/compile.ts';
import { bus } from '../apps/server/src/bus.ts';
import { getProject, versionEntry, versionSource, ws } from '../apps/server/src/store.ts';
import { ROOT } from '../apps/server/src/config.ts';

const OUT = join(ROOT, 'apps/studio/public/recorded');
const ids = process.argv.slice(2);
if (!ids.length) {
  console.error('usage: tsx scripts/export-recorded.ts <projectId> …');
  process.exit(2);
}

mkdirSync(OUT, { recursive: true });
const index: unknown[] = existsSync(join(OUT, 'index.json')) ? JSON.parse(readFileSync(join(OUT, 'index.json'), 'utf8')) : [];
const keep = (index as { id: string }[]).filter((p) => !ids.includes(p.id));

for (const id of ids) {
  const p = getProject(id);
  if (!p) throw new Error(`no project ${id}`);
  const dir = join(OUT, id);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });

  const project = { ...p, recorded: true, busy: null };
  writeFileSync(join(dir, 'project.json'), JSON.stringify(project));
  writeFileSync(join(dir, 'events.json'), JSON.stringify(bus.history(id)));

  for (const v of p.versions) {
    const vd = join(dir, `v${v.n}`);
    mkdirSync(vd, { recursive: true });
    const c = await compileComposition(versionEntry(id, v.n));
    if (!c.ok) throw new Error(`v${v.n} does not compile: ${c.error}`);
    writeFileSync(join(vd, 'module.js'), c.code);
    writeFileSync(join(vd, 'Video.tsx'), versionSource(id, v.n) ?? '');
  }
  // The live working copy at export time is the last version.
  const last = p.versions.at(-1)?.n;
  if (last) cpSync(join(dir, `v${last}`), join(dir, 'vlive'), { recursive: true });

  for (const a of p.versions)
    for (const b of p.versions) {
      if (a.n > b.n) continue;
      const parts = diffLines(versionSource(id, a.n) ?? '', versionSource(id, b.n) ?? '').map((x) => ({
        added: Boolean(x.added),
        removed: Boolean(x.removed),
        value: x.value,
        count: x.count ?? 0,
      }));
      writeFileSync(join(dir, `diff-${a.n}-${b.n}.json`), JSON.stringify(parts));
    }

  if (existsSync(ws(id, 'runs', 'eye'))) cpSync(ws(id, 'runs', 'eye'), join(dir, 'eye'), { recursive: true });
  const testsDir = ws(id, '.testmuai', 'tests');
  const tests = existsSync(testsDir)
    ? readdirSync(testsDir)
        .filter((f) => f.endsWith('_test.md'))
        .map((f) => ({ file: f, body: readFileSync(join(testsDir, f), 'utf8') }))
    : [];
  writeFileSync(join(dir, 'tests.json'), JSON.stringify(tests));
  keep.unshift(project);
  console.log(`exported ${id}: ${p.versions.length} versions, ${p.rounds.length} rounds, ${tests.length} tests`);
}

writeFileSync(join(OUT, 'index.json'), JSON.stringify(keep));
