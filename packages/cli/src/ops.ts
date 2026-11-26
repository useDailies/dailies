/** What the MCP tools, the Stop hook and the CLI all do: start a spot, have Kane judge it. */
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { call, collectComposition, creds, fetchBytes, type JudgeResult } from './api.ts';
import { ensureDir, readLink, writeLink, type SpotLink } from './config.ts';

export interface SpotInfo {
  id: string;
  title: string;
  studioUrl: string;
  dir: string;
  cuts: { id: string; ratio: string; width: number; height: number }[];
  durationSeconds: number;
  fps: number;
  shots: { n: number; title: string; start: number; end: number }[];
  framesKaneJudges: { label: string; timecode: string; frame: number; why: string }[];
  contract: string;
  plan: { criteria?: number; tests?: number; status?: string };
  versions: number;
  lastVerdict: unknown;
}

export async function startSpot(root: string, opts: { storyboard?: string; title?: string; dir?: string; client?: string; clientVersion?: string; fresh?: boolean }) {
  const dir = (opts.dir ?? 'video').replace(/^\.?\/+|\/+$/g, '') || 'video';
  const sbPath = opts.storyboard ?? join(dir, 'storyboard.md');
  const abs = join(root, sbPath);
  if (!existsSync(abs)) throw new Error(`No storyboard at ${sbPath}. Write one (shots with timecodes, exact copy, cuts and rules), or run \`dailies init\` for a template.`);
  const storyboard = readFileSync(abs, 'utf8');
  const c = creds();
  const existing = readLink(root);
  if (existing && !opts.fresh && existing.server === c.server && existing.storyboard === sbPath) {
    try {
      const info = await call<SpotInfo>(`/api/agent/spots/${existing.spot}`);
      return { info, reused: true };
    } catch {
      /* the linked spot is gone or belongs to another account: start fresh */
    }
  }
  const info = await call<SpotInfo>('/api/agent/spots', {
    method: 'POST',
    body: JSON.stringify({ storyboard, title: opts.title, client: opts.client, clientVersion: opts.clientVersion, dir, repo: root.split('/').pop() }),
  });
  const link: SpotLink = { spot: info.id, server: c.server, dir, storyboard: sbPath, studioUrl: info.studioUrl, title: info.title, createdAt: new Date().toISOString() };
  writeLink(root, link);
  return { info, reused: false };
}

export function linked(root: string): SpotLink {
  const l = readLink(root);
  if (!l) throw new Error('This repository is not linked to a dailies spot yet. Call dailies_start (or run `dailies start`) first.');
  return l;
}

export async function review(root: string, trigger: 'mcp' | 'hook' | 'cli', client?: string, summary?: string): Promise<{ result: JudgeResult; images: { cut: string; ratio: string; path: string; bytes: Buffer }[] }> {
  const l = linked(root);
  const dir = join(root, l.dir);
  if (!existsSync(join(dir, 'Video.tsx'))) throw new Error(`No composition yet: write ${l.dir}/Video.tsx first.`);
  const files = collectComposition(dir);
  const result = await call<JudgeResult>(`/api/agent/spots/${l.spot}/submit`, {
    method: 'POST',
    body: JSON.stringify({ files, trigger: trigger === 'cli' ? 'mcp' : trigger, client, summary }),
    timeoutMs: 590_000,
  });
  // Bring the contact sheets Kane judged next to the code, so the agent can look at them.
  const images: { cut: string; ratio: string; path: string; bytes: Buffer }[] = [];
  let feedback = result.feedback;
  for (const s of result.sheets) {
    if (!s.image) continue;
    // On a pass, show every cut Kane judged (up to 3); on a failure, the cuts that failed.
    const want = result.status === 'pass' ? images.length < 3 : result.failing.some((f) => f.cut === s.cut);
    if (!want) continue;
    const bytes = await fetchBytes(s.image);
    if (!bytes) continue;
    const rel = `.dailies/eye/v${result.version}-${s.cut}${s.image.endsWith('.jpg') ? '.jpg' : '.png'}`;
    ensureDir(join(root, rel));
    writeFileSync(join(root, rel), bytes);
    images.push({ cut: s.cut, ratio: s.ratio, path: rel, bytes });
    feedback = feedback.split(s.image.replace(/\.jpg$/, '.png')).join(rel).split(s.image).join(rel);
  }
  return { result: { ...result, feedback }, images };
}

export function summary(r: JudgeResult) {
  const head =
    r.status === 'pass'
      ? `✅ ${r.message}`
      : r.status === 'compile_error'
        ? `⛔ Compile error in v${r.version}: Kane could not look at it.`
        : r.status === 'capped'
          ? `⚠️ ${r.message}`
          : r.status === 'error'
            ? `⚠️ ${r.message}`
            : `❌ ${r.message} ${r.pass}/${r.total} checks pass.`;
  return `${head}\nStudio: ${r.studioUrl}`;
}
