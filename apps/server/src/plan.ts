import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { enrichCriterion, parseDesignedTest, parseStoryboard, type Criterion, type DesignedTest, type KanePlan } from '@dailies/shared';
import { bus } from './bus.ts';
import { kane } from './kane.ts';
import { getProject, hash, updateProject, ws } from './store.ts';
import { config } from './config.ts';

/**
 * Kane CLI's assurance lifecycle, driven headless:
 *
 *   context ingest storyboard.md   → use-cases, each citing storyboard lines
 *   context ingest surface.md      → where the cuts can be observed
 *   context review --approve       → promote use-cases to trusted
 *   design tests --use-case …      → acceptance criteria, scenarios, *_test.md
 *
 * dailies then reads the criteria and tests back so it can judge every draft
 * against them and show which storyboard lines are proven.
 */
function relay(projectId: string, stage: string) {
  return (e: any) => {
    if (e.type === 'agent_activity') bus.emit(projectId, 'kane.activity', { stage, kind: e.kind, label: e.label, verb: e.verb });
    else if (e.type === 'usage') bus.emit(projectId, 'kane.usage', { stage, credits: e.credits, total: e.total_credits });
    else if (e.type === 'commit') bus.emit(projectId, 'kane.commit', { stage, source: e.source_id, minted: e.minted?.map((m: any) => m.logical_id) ?? [] });
    else if (e.type === 'receipt') bus.emit(projectId, 'kane.receipt', { stage, phase: e.phase, committed: e.committed?.map((m: any) => m.logical_id) ?? [], parity: e.parity });
    else if (e.type === 'session_paused') bus.emit(projectId, 'kane.paused', { stage, questions: e.pending_questions });
    else if (e.type === 'error') bus.emit(projectId, 'kane.error', { stage, code: e.code, message: e.message });
  };
}

async function listGraph(cwd: string): Promise<any[]> {
  const r = await kane(['context', 'list', '--all', '--json'], { cwd, timeoutSec: 60 });
  return r.stdout
    .split('\n')
    .map((l) => {
      try {
        return JSON.parse(l);
      } catch {
        return null;
      }
    })
    .filter(Boolean);
}

/** Optional enrichment from the local store: AC oracle + risk, use-case citation anchors. */
function readStore(cwd: string) {
  const out = { nodes: new Map<string, any>(), anchors: new Map<string, string[]>() };
  try {
    const idx = JSON.parse(readFileSync(join(cwd, '.context/derived/index.json'), 'utf8'));
    for (const edges of Object.values(idx.forward ?? {}) as any[]) {
      for (const e of edges) {
        if (e.type === 'DERIVES' && e.props?.anchor) out.anchors.set(e.dst, [...(out.anchors.get(e.dst) ?? []), `${e.props.source_id}#${e.props.anchor}`]);
      }
    }
    for (const cid of Object.keys(idx.nodeLabel ?? {})) {
      const h = cid.replace('sha256:', '');
      const f = join(cwd, '.context/derived/nodes', h.slice(0, 2), `${h.slice(2)}.json`);
      if (existsSync(f)) out.nodes.set(cid, JSON.parse(readFileSync(f, 'utf8')));
    }
  } catch {
    /* the store layout is Kane's; if it moves, we lose enrichment, not the plan */
  }
  return out;
}

export function readTests(cwd: string): DesignedTest[] {
  const dir = join(cwd, '.testmuai/tests');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('_test.md'))
    .map((f) => parseDesignedTest(f, readFileSync(join(dir, f), 'utf8')));
}

export async function buildPlan(projectId: string, opts: { force?: boolean } = {}): Promise<KanePlan> {
  const p = getProject(projectId)!;
  const cwd = ws(projectId);
  const storyboardHash = hash(p.storyboard);
  if (p.plan && p.plan.storyboardHash === storyboardHash && !opts.force && p.plan.criteria.length) {
    bus.emit(projectId, 'plan.cached', { criteria: p.plan.criteria.length, tests: p.plan.tests.length });
    return p.plan;
  }
  bus.emit(projectId, 'plan.start', {});
  let credits = 0;
  const step = async (label: string, args: string[], timeoutSec = 600) => {
    bus.emit(projectId, 'plan.step', { label, cmd: `kane-cli ${args.join(' ')}` });
    const r = await kane(args, { cwd, timeoutSec, onEvent: relay(projectId, label) });
    credits += r.credits;
    bus.emit(projectId, 'plan.step.done', { label, code: r.code, credits: r.credits, ms: r.durationMs });
    return r;
  };

  const isReplan = Boolean(p.plan);
  if (isReplan && existsSync(join(cwd, '.context'))) {
    // The storyboard changed under an existing suite: let Kane say what moved.
    const rec = await step('reconcile', ['maintain', 'reconcile', '--from', 'storyboard.md', '--source-id', 'storyboard', '--mode', 'agent'], 900);
    const plan = rec.events.find((e) => e.type === 'reconcile_plan' || e.type === 'summary');
    if (plan) bus.emit(projectId, 'plan.changeset', { plan });
  }

  const ingested: Record<string, string[]> = {};
  for (const [file, id] of [
    ['storyboard.md', 'storyboard'],
    ['surface.md', 'surface'],
  ] as const) {
    const r = await step(`ingest ${file}`, ['context', 'ingest', file, '--as', id, '--mode', 'agent'], 600);
    ingested[id] = r.events.filter((e) => e.type === 'commit').flatMap((e) => e.minted?.map((m: any) => m.logical_id) ?? []);
  }

  let graph = await listGraph(cwd);
  const derivedUcs = graph.filter((n) => n.label === 'usecase' && n.trust === 'derived').map((n) => n.id);
  if (derivedUcs.length) await step('review', ['context', 'review', '--approve', ...derivedUcs, '--mode', 'agent'], 120);

  // Design every use-case that came from the storyboard (the surface only tells Kane where to look).
  graph = await listGraph(cwd);
  const ucs = graph.filter((n) => n.label === 'usecase');
  const storyUcs = ingested.storyboard.length ? ucs.filter((u) => ingested.storyboard.includes(u.id)) : ucs.filter((u) => !ingested.surface.includes(u.id));
  for (const uc of storyUcs.length ? storyUcs : ucs) {
    const args = ['design', 'tests', '--use-case', uc.id, '--mode', 'agent', '--max', '8'];
    if (isReplan || opts.force) args.push('--force');
    let r = await step(`design ${uc.id}`, args, 1200);
    // A headless design can pause on a high-risk question; answer with Kane's own recommendation.
    for (let i = 0; i < 2 && r.code === 3; i++) {
      const paused = r.events.find((e) => e.type === 'session_paused');
      if (!paused?.sid) break;
      r = await step(`design ${uc.id} (resume)`, ['design', 'tests', '--resume', paused.sid, '--message', 'Use your recommended default for every open question.', '--mode', 'agent'], 1200);
    }
  }

  graph = await listGraph(cwd);
  const store = readStore(cwd);
  const sb = parseStoryboard(p.storyboard);
  const tests = readTests(cwd);
  const criteria: Criterion[] = graph
    .filter((n) => n.label === 'ac' && n.trust !== 'archived')
    .map((n) => {
      const node = store.nodes.get(n.cid)?.content;
      const exp = node?.expected_answer;
      return enrichCriterion(
        {
          id: n.id,
          text: node?.text ?? n.title,
          risk: node?.risk,
          expected: exp?.operator ? { operator: exp.operator, operand: exp.operand } : undefined,
        },
        sb,
        tests,
      );
    })
    .sort((a, b) => Number(a.id.split('-')[1]) - Number(b.id.split('-')[1]));

  const plan: KanePlan = {
    createdAt: new Date().toISOString(),
    storyboardHash,
    usecases: ucs.map((u) => ({ id: u.id, title: u.title, anchors: store.anchors.get(u.cid) ?? [] })),
    criteria,
    tests,
    scenarios: graph.filter((n) => n.label === 'scenario').map((n) => ({ id: n.id, title: n.title })),
    gaps: graph.filter((n) => n.label === 'gap').map((n) => ({ id: n.id, title: n.title })),
    credits,
  };
  setSheetUrl(projectId, 'latest');
  updateProject(projectId, (pp) => {
    pp.plan = plan;
    pp.credits.plan += credits;
  });
  bus.emit(projectId, 'plan.done', {
    criteria: criteria.length,
    tests: tests.length,
    scenarios: plan.scenarios.length,
    gaps: plan.gaps.length,
    credits,
  });
  return plan;
}

/** Point the designed tests' {{sheet_url}} at a version's inspection sheet. */
export function setSheetUrl(projectId: string, version: number | 'latest') {
  const f = join(ws(projectId), '.testmuai/variables/assurance.json');
  let vars: Record<string, any> = {};
  try {
    vars = JSON.parse(readFileSync(f, 'utf8'));
  } catch {
    /* first write */
  }
  const url = `${config.studioUrl}/inspect/${projectId}/${version}/sheet`;
  vars.sheet_url = { ...(vars.sheet_url ?? {}), value: url, secret: false };
  writeFileSync(f, JSON.stringify(vars, null, 2));
  return url;
}
