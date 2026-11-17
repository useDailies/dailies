import { checkKey, type CheckResult, type CutId, type Project } from '@dailies/shared';

export type CellState = 'pass' | 'fail' | 'unknown' | 'owed' | 'running';

export interface Cell extends Partial<CheckResult> {
  state: CellState;
  /** version the verdict was judged on */
  judgedOn?: number;
  round?: string;
}

/** Latest verdict for every criterion × cut, judged on or before `version`. */
export function verdictMap(project: Project | null, version: number | 'live' | null): Map<string, Cell> {
  const out = new Map<string, Cell>();
  if (!project?.plan) return out;
  for (const c of project.plan.criteria) for (const cut of c.cuts) out.set(checkKey(c.id, cut), { state: 'owed' });
  const limit = version === 'live' || version === null ? Infinity : version;
  for (const r of project.rounds) {
    if (r.version > limit) continue;
    for (const res of r.results) out.set(checkKey(res.ac, res.cut), { ...res, state: res.verdict, judgedOn: r.version, round: r.id });
  }
  return out;
}

export function summarize(cells: Iterable<Cell>) {
  let pass = 0,
    fail = 0,
    owed = 0,
    unknown = 0,
    total = 0;
  for (const c of cells) {
    total++;
    if (c.state === 'pass') pass++;
    else if (c.state === 'fail') fail++;
    else if (c.state === 'unknown') unknown++;
    else owed++;
  }
  return { pass, fail, owed, unknown, total };
}

export function cellsForCut(map: Map<string, Cell>, cut: CutId) {
  return [...map.entries()].filter(([k]) => k.endsWith(`@${cut}`)).map(([, v]) => v);
}

export const CUT_RATIO: Record<string, string> = { '16x9': '16:9', '9x16': '9:16', '1x1': '1:1', '4x5': '4:5' };

/** The judged version Kane scored lowest — "before Kane" on compare views. */
export function worstVersion(project: Project | null): number | null {
  if (!project?.rounds.length) return null;
  let worst: { v: number; pass: number } | null = null;
  for (const v of [...new Set(project.rounds.map((r) => r.version))]) {
    const s = summarize(verdictMap(project, v).values());
    if (!worst || s.pass < worst.pass) worst = { v, pass: s.pass };
  }
  return worst?.v ?? null;
}
