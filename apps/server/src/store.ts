import { createHash, randomBytes } from 'node:crypto';
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { enrichCriterion, parseStoryboard, type Project, type VersionMeta } from '@dailies/shared';
import { config } from './config.ts';
import { claudeMd, surfaceMd } from './templates.ts';

export const ws = (id: string, ...p: string[]) => join(config.workspaces, id, ...p);

const PLACEHOLDER = `import { AbsoluteFill } from 'remotion';

export const composition = { fps: 30, durationInFrames: 90, shots: [] };

export default function Video() {
  return (
    <AbsoluteFill style={{ background: '#09090b', alignItems: 'center', justifyContent: 'center' }}>
      <div data-layer="placeholder" style={{ color: '#52525b', font: '600 48px ui-sans-serif, system-ui' }}>
        Waiting for Claude Code
      </div>
    </AbsoluteFill>
  );
}
`;

export function hash(s: string) {
  return createHash('sha256').update(s).digest('hex').slice(0, 16);
}

function writeJsonAtomic(file: string, data: unknown) {
  const tmp = `${file}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(data, null, 2));
  renameSync(tmp, file);
}

export function listProjects(): Project[] {
  if (!existsSync(config.workspaces)) return [];
  return readdirSync(config.workspaces)
    .filter((d) => existsSync(ws(d, 'project.json')))
    .map((d) => getProject(d)!)
    .filter(Boolean)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getProject(id: string): Project | null {
  if (!/^[a-z0-9-]+$/.test(id)) return null;
  const f = ws(id, 'project.json');
  if (!existsSync(f)) return null;
  const p = JSON.parse(readFileSync(f, 'utf8')) as Project;
  // Criterion → cut/time/shot/line mapping is dailies' own reading of Kane's
  // text; recompute it so improvements apply to existing plans too.
  if (p.plan) {
    const sb = parseStoryboard(p.storyboard);
    p.plan.criteria = p.plan.criteria.map((c) => enrichCriterion({ id: c.id, text: c.text, risk: c.risk, expected: c.expected }, sb, p.plan!.tests));
  }
  return p;
}

export function saveProject(p: Project): Project {
  p.updatedAt = new Date().toISOString();
  writeJsonAtomic(ws(p.id, 'project.json'), p);
  return p;
}

export function updateProject(id: string, fn: (p: Project) => void): Project {
  const p = getProject(id);
  if (!p) throw new Error(`no project ${id}`);
  fn(p);
  return saveProject(p);
}

export function hookSettings() {
  return {
    hooks: {
      Stop: [{ hooks: [{ type: 'command', command: `node ${JSON.stringify(config.hookScript).slice(1, -1)}`, timeout: 1500 }] }],
    },
  };
}

/** Lay out a workspace: the folder Claude Code runs in and Kane CLI keeps its store in. */
export function createProject(storyboard: string, title?: string): Project {
  const sb = parseStoryboard(storyboard);
  const name = title?.trim() || sb.title;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 32) || 'spot';
  const id = `${slug}-${randomBytes(2).toString('hex')}`;
  const dir = ws(id);
  for (const d of ['src', 'versions', 'runs/rounds', 'runs/eye', '.claude', '.testmuai/variables']) mkdirSync(join(dir, d), { recursive: true });
  writeFileSync(join(dir, 'storyboard.md'), storyboard);
  writeFileSync(join(dir, 'CLAUDE.md'), claudeMd(sb.cuts));
  writeFileSync(join(dir, 'surface.md'), surfaceMd(sb.cuts));
  writeFileSync(join(dir, 'src', 'Video.tsx'), PLACEHOLDER);
  writeFileSync(join(dir, '.claude', 'settings.json'), JSON.stringify(hookSettings(), null, 2));
  writeFileSync(join(dir, '.gitignore'), '.context/\n.testmuai/evidence/\n.dailies-gate\n');
  const now = new Date().toISOString();
  const p: Project = {
    id,
    title: name,
    createdAt: now,
    updatedAt: now,
    phase: 'idle',
    storyboard,
    cuts: sb.cuts,
    claude: { costUsd: 0, turns: 0 },
    versions: [],
    rounds: [],
    credits: { plan: 0, verify: 0, seal: 0 },
    busy: null,
    error: null,
  };
  return saveProject(p);
}

export function setStoryboard(id: string, storyboard: string): Project {
  const sb = parseStoryboard(storyboard);
  writeFileSync(ws(id, 'storyboard.md'), storyboard);
  writeFileSync(ws(id, 'CLAUDE.md'), claudeMd(sb.cuts));
  writeFileSync(ws(id, 'surface.md'), surfaceMd(sb.cuts));
  return updateProject(id, (p) => {
    p.storyboard = storyboard;
    p.cuts = sb.cuts;
    p.title = p.versions.length ? p.title : sb.title;
  });
}

export function liveSource(id: string): string {
  return readFileSync(ws(id, 'src', 'Video.tsx'), 'utf8');
}

export function versionDir(id: string, n: number) {
  return ws(id, 'versions', `v${n}`);
}

export function versionSource(id: string, n: number | 'live'): string | null {
  const f = n === 'live' ? ws(id, 'src', 'Video.tsx') : join(versionDir(id, n), 'Video.tsx');
  return existsSync(f) ? readFileSync(f, 'utf8') : null;
}

export function versionEntry(id: string, n: number | 'live'): string {
  return n === 'live' ? ws(id, 'src', 'Video.tsx') : join(versionDir(id, n), 'Video.tsx');
}

/** Copy src/ into versions/vN/ — an immutable snapshot Kane's verdicts are pinned to. */
export function snapshotVersion(id: string, meta: Omit<VersionMeta, 'n' | 'createdAt' | 'lines'>): VersionMeta {
  const p = getProject(id)!;
  const n = (p.versions.at(-1)?.n ?? 0) + 1;
  const dir = versionDir(id, n);
  cpSync(ws(id, 'src'), dir, { recursive: true });
  const src = readFileSync(join(dir, 'Video.tsx'), 'utf8');
  const v: VersionMeta = { ...meta, n, createdAt: new Date().toISOString(), lines: src.split('\n').length };
  writeFileSync(join(dir, 'meta.json'), JSON.stringify(v, null, 2));
  updateProject(id, (pp) => {
    pp.versions.push(v);
  });
  return v;
}

/** True when src/ differs from the latest snapshot (Claude changed something). */
export function liveDiffersFromLatest(id: string): boolean {
  const p = getProject(id)!;
  const last = p.versions.at(-1);
  if (!last) return true;
  return versionSource(id, last.n) !== versionSource(id, 'live');
}

export function latestVersion(id: string): number | null {
  return getProject(id)?.versions.at(-1)?.n ?? null;
}

export function fileMtime(f: string): number {
  try {
    return statSync(f).mtimeMs;
  } catch {
    return 0;
  }
}
