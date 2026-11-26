import { useEffect, useMemo, useState } from 'react';
import { checkKey, type Criterion, type CutId, type Project, type Storyboard } from '@dailies/shared';
import { api } from '../lib/api';
import { CUT_RATIO, type Cell } from '../lib/verdicts';
import { AgentLogo, Coll, Icon, VMark } from './ui';

/* -------------------------------------------------------------- storyboard */

export function StoryboardPanel({
  sb,
  criteria,
  cells,
  focusLine,
  onLine,
  editable,
  value,
  onSave,
}: {
  sb: Storyboard;
  criteria: Criterion[];
  cells: Map<string, Cell>;
  focusLine: number | null;
  onLine: (n: number, acs: Criterion[]) => void;
  editable: boolean;
  value: string;
  onSave: (v: string) => Promise<void>;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  useEffect(() => setDraft(value), [value]);
  const byLine = useMemo(() => {
    const m = new Map<number, Criterion[]>();
    for (const c of criteria) if (c.line) m.set(c.line, [...(m.get(c.line) ?? []), c]);
    return m;
  }, [criteria]);

  if (editing)
    return (
      <div className="sb-edit">
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} spellCheck={false} aria-label="Storyboard markdown" />
        <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end', marginTop: 8 }}>
          <button type="button" className="btn sm" onClick={() => setEditing(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="btn sm ink"
            onClick={async () => {
              await onSave(draft);
              setEditing(false);
            }}
          >
            Save
          </button>
        </div>
      </div>
    );

  return (
    <>
      <ol className="sb-lines">
        {sb.lines.map((l) => {
          const acs = byLine.get(l.n) ?? [];
          let st = '';
          if (acs.length) {
            const states = acs.flatMap((c) => c.cuts.map((cut) => cells.get(checkKey(c.id, cut))?.state ?? 'owed'));
            st = states.includes('fail') ? 'fail' : states.includes('unknown') ? 'unknown' : states.every((s) => s === 'pass') ? 'pass' : 'owed';
          }
          if (l.kind === 'blank') return <li key={l.n} className="sb-blank" />;
          return (
            <li key={l.n} className={`sb-line sb-${l.kind} ${focusLine === l.n ? 'focus' : ''} ${acs.length ? 'has' : ''}`} onClick={() => acs.length && onLine(l.n, acs)}>
              <span className="sb-n">{l.n}</span>
              <span className="sb-t">{l.text.replace(/^#+\s*/, '').replace(/^[-*]\s+/, '')}</span>
              {acs.length ? (
                <span title={`${acs.length} criteria: ${acs.map((a) => a.id).join(', ')}`}>
                  <VMark state={st} size={15} />
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      {editable ? (
        <button type="button" className="btn sm" style={{ marginTop: 12 }} onClick={() => setEditing(true)}>
          Edit storyboard
        </button>
      ) : null}
    </>
  );
}

/* ------------------------------------------------------------- corrections */

export interface Correction {
  ac: string;
  cut: CutId;
  c: Criterion | undefined;
  history: { round: string; version: number; kind: string; verdict: string; reason: string; frames: string[] }[];
  fixedIn: number | null;
}

export function corrections(project: Project | null): Correction[] {
  if (!project?.plan) return [];
  const hist = new Map<string, Correction>();
  for (const r of project.rounds) {
    for (const res of r.results) {
      const k = checkKey(res.ac, res.cut);
      if (!hist.has(k)) hist.set(k, { ac: res.ac, cut: res.cut, c: project.plan.criteria.find((x) => x.id === res.ac), history: [], fixedIn: null });
      hist.get(k)!.history.push({ round: r.id, version: r.version, kind: r.kind, verdict: res.verdict, reason: res.reason, frames: res.frames });
    }
  }
  const out = [...hist.values()].filter((h) => h.history.some((x) => x.verdict !== 'pass'));
  for (const h of out) {
    const lastFail = h.history.map((x) => x.verdict !== 'pass').lastIndexOf(true);
    const after = h.history.slice(lastFail + 1).find((x) => x.verdict === 'pass');
    h.fixedIn = after ? after.version : null;
  }
  return out.sort((a, b) => Number(Boolean(a.fixedIn)) - Number(Boolean(b.fixedIn)) || a.ac.localeCompare(b.ac, undefined, { numeric: true }));
}

/** The line of the sheet's measured placement report that bears on this criterion. */
export function sheetEvidence(project: Project, roundId: string, cut: CutId, text: string): string | null {
  const report = project.rounds.find((r) => r.id === roundId)?.reports?.[cut];
  if (!report) return null;
  const t = text.toLowerCase();
  const pick = /bottom/.test(t)
    ? 'bottom'
    : /top/.test(t)
      ? 'top'
      : /side/.test(t)
        ? 'side'
        : /inside the frame|outside the frame|within the frame/.test(t)
          ? 'outside the frame'
          : /px|font|legib|type size/.test(t)
            ? 'smallest'
            : null;
  if (!pick) return null;
  return report.split('\n').find((l) => l.toLowerCase().includes(pick)) ?? null;
}

function firstSentences(s?: string, n = 2) {
  if (!s) return 'Edited src/Video.tsx';
  const t = s.replace(/[*`#]/g, '').replace(/\s+/g, ' ').trim();
  const cut = t.split(/(?<=[.!?])\s/).slice(0, n).join(' ');
  return cut.length > 260 ? `${cut.slice(0, 257)}…` : cut;
}

export function CorrectionCard({
  project,
  sb,
  x,
  focus,
  onShow,
}: {
  project: Project;
  sb: Storyboard;
  x: Correction;
  focus: boolean;
  onShow: (x: Correction, version: number) => void;
}) {
  const first = x.history.find((h) => h.verdict !== 'pass')!;
  const fixV = x.fixedIn ? project.versions.find((v) => v.n === x.fixedIn) : null;
  const line = x.c?.line ? sb.lines.find((l) => l.n === x.c!.line) : null;
  const ev = sheetEvidence(project, first.round, x.cut, x.c?.text ?? '');
  const verified = x.history.find((h) => h.version === x.fixedIn && h.verdict === 'pass');
  return (
    <article className={`fix ${focus ? 'focus' : ''}`} id={`finding-${checkKey(x.ac, x.cut)}`}>
      <div className="fix-main">
        <div className="fix-top">
          <VMark state={x.fixedIn ? 'pass' : 'fail'} />
          <p>{x.c?.text ?? x.ac}</p>
        </div>
        <div className="fix-flow">
          <span className="tag fail">v{first.version} failed</span>
          {fixV ? (
            <>
              <i>→</i>
              <span className="tag claude">
                v{fixV.n} Claude {fixV.added !== undefined ? `+${fixV.added} −${fixV.removed}` : ''}
              </span>
              <i>→</i>
              <span className="tag pass">Kane ✓</span>
            </>
          ) : (
            <span className="tag">open</span>
          )}
          <span className="tag">{CUT_RATIO[x.cut]}</span>
        </div>
        <div className="fix-actions">
          <button type="button" className="btn sm" onClick={() => onShow(x, first.version)}>
            <Icon name="eye" size={13} /> Before
          </button>
          {x.fixedIn ? (
            <button type="button" className="btn sm" onClick={() => onShow(x, x.fixedIn!)}>
              <Icon name="check" size={13} /> After
            </button>
          ) : null}
        </div>
      </div>
      <Coll title="Kane’s verdict and Claude’s fix" sub={`${x.ac} · ${first.round}`} flat>
        {line ? (
          <dl className="kv">
            <dt>Storyboard</dt>
            <dd>
              L{line.n} · {line.text.replace(/^[-*]\s+/, '')}
            </dd>
          </dl>
        ) : null}
        <div className="line">
          <VMark state="fail" />
          <span className="txt">
            <b>Kane on v{first.version}:</b> {first.reason || 'could not be judged'}
          </span>
        </div>
        {ev ? <pre className="codeblock">{ev}</pre> : null}
        {fixV ? (
          <div className="line">
            <span className="sglyph logo"><AgentLogo who="claude" size={13} /></span>
            <span className="txt">
              <b>Claude, v{fixV.n}:</b> {firstSentences(fixV.summary)}
            </span>
          </div>
        ) : null}
        {verified ? (
          <div className="line">
            <VMark state="pass" />
            <span className="txt">
              <b>Kane on v{x.fixedIn}:</b> {verified.reason}
            </span>
          </div>
        ) : null}
      </Coll>
    </article>
  );
}

/* ---------------------------------------------------------------- criteria */

export function CriteriaList({
  project,
  cells,
  focusAc,
  onPick,
}: {
  project: Project | null;
  cells: Map<string, Cell>;
  focusAc: string | null;
  onPick: (ac: string, cut: CutId) => void;
}) {
  const plan = project?.plan;
  if (!plan) return <p className="empty">Kane CLI designs the acceptance criteria from your storyboard while Claude drafts.</p>;
  return (
    <div>
      <div className="card-meta" style={{ marginBottom: 8 }}>
        <span className="tag kane">{plan.criteria.length} criteria</span>
        <span className="tag">{plan.scenarios.length} scenarios</span>
        <span className="tag">{plan.tests.length} tests</span>
        <span className="tag">{plan.credits.toFixed(1)} cr</span>
      </div>
      {plan.criteria.map((c) => (
        <div key={c.id} className={`crit ${focusAc === c.id ? 'focus' : ''}`}>
          <div className="crit-top">
            <p>{c.text}</p>
            <span className="crit-cuts">
              {c.cuts.map((cut) => {
                const cell = cells.get(checkKey(c.id, cut));
                return (
                  <button key={cut} type="button" onClick={() => onPick(c.id, cut)} title={`${CUT_RATIO[cut]} · ${cell?.state ?? 'owed'}${cell?.reason ? ` — ${cell.reason}` : ''}`}>
                    <VMark state={cell?.state ?? 'owed'} size={15} />
                  </button>
                );
              })}
            </span>
          </div>
          <div className="card-meta" style={{ marginTop: 4 }}>
            <span className="tag">{c.id}</span>
            {c.risk ? <span className={`tag ${c.risk === 'high' ? 'fail' : c.risk === 'med' ? 'unknown' : ''}`}>{c.risk}</span> : null}
            {c.expected ? (
              <span className="tag">
                {c.expected.operator} {String(c.expected.operand).slice(0, 24)}
              </span>
            ) : null}
            {c.line ? <span className="tag">L{c.line}</span> : null}
            {c.tests.length ? <span className="tag kane">{c.tests.join(' ')}</span> : null}
          </div>
        </div>
      ))}
      <TestFiles project={project!} />
    </div>
  );
}

function TestFiles({ project }: { project: Project }) {
  const [files, setFiles] = useState<{ file: string; body: string }[] | null>(null);
  useEffect(() => {
    api.tests(project.id).then(setFiles).catch(() => setFiles([]));
  }, [project.id, project.plan?.createdAt]);
  if (!files?.length) return null;
  return (
    <div style={{ marginTop: 14 }}>
      <div className="sec-title" style={{ marginBottom: 8 }}>
        Kane-designed test files
      </div>
      {files.map((f) => (
        <Coll key={f.file} icon={<Icon name="code" size={14} />} title={f.file} sub=".testmuai/tests">
          <pre className="codeblock">{f.body}</pre>
        </Coll>
      ))}
    </div>
  );
}

/* -------------------------------------------------------------------- proof */

export function ProofSummary({ project }: { project: Project }) {
  const seal = project.seal;
  if (!seal) return null;
  const cov = seal.coverage as { criteria?: { total: number; proven: number }; perAc?: Record<string, { state: string }> } | null | undefined;
  const passed = seal.tests.filter((t) => t.status === 'passed').length;
  return (
    <Coll
      icon={<span className="sglyph seal"><Icon name="seal" size={12} stroke={2} /></span>}
      title={`Sealed v${seal.version} · ${passed}/${seal.tests.length} tests`}
      sub={cov?.criteria ? `kane-cli cover: ${cov.criteria.proven}/${cov.criteria.total} criteria proven` : 'Kane’s own designed tests'}
      meta={`${seal.credits.toFixed(0)} cr`}
    >
      {cov?.perAc ? (
        <div className="card-meta">
          {Object.entries(cov.perAc).map(([ac, v]) => (
            <span key={ac} className={`tag ${v.state === 'proven' ? 'pass' : v.state === 'failing' ? 'fail' : ''}`}>
              {ac}
            </span>
          ))}
        </div>
      ) : null}
      {seal.tests.map((t) => (
        <div key={t.id} className="line">
          <VMark state={t.status === 'passed' ? 'pass' : t.status === 'running' ? 'running' : t.status === 'queued' ? 'owed' : 'fail'} />
          <span className="txt">
            <b>{t.id}</b> {t.title ?? t.file}
            {t.reason ? <span style={{ display: 'block', color: 'var(--fail-text)' }}>{t.failedStep ? `${t.failedStep}: ` : ''}{t.reason}</span> : null}
          </span>
          {t.share ? (
            <a className="meta" href={t.share} target="_blank" rel="noreferrer">
              run ↗
            </a>
          ) : null}
        </div>
      ))}
    </Coll>
  );
}

/* --------------------------------------------------------------------- diff */

export function CodeDiff({ project }: { project: Project | null }) {
  const versions = project?.versions ?? [];
  const [a, setA] = useState<number | null>(null);
  const [b, setB] = useState<number | null>(null);
  const [parts, setParts] = useState<{ added: boolean; removed: boolean; value: string }[] | null>(null);
  useEffect(() => {
    if (versions.length >= 2) {
      setA((x) => x ?? versions.at(-2)!.n);
      setB(versions.at(-1)!.n);
    } else if (versions.length === 1) {
      setA(versions[0].n);
      setB(versions[0].n);
    }
  }, [versions.length]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!project || a === null || b === null) return;
    setParts(null);
    api.diff(project.id, Math.min(a, b), Math.max(a, b)).then(setParts).catch(() => setParts([]));
  }, [project, a, b]);
  if (!versions.length) return <p className="empty">Claude’s code appears here once the first draft is pinned.</p>;
  let ln = 0;
  return (
    <div>
      <div className="diff-pick">
        <select value={a ?? ''} onChange={(e) => setA(Number(e.target.value))} aria-label="From version">
          {versions.map((v) => (
            <option key={v.n} value={v.n}>
              v{v.n} {v.kind}
            </option>
          ))}
        </select>
        <Icon name="next" size={14} />
        <select value={b ?? ''} onChange={(e) => setB(Number(e.target.value))} aria-label="To version">
          {versions.map((v) => (
            <option key={v.n} value={v.n}>
              v{v.n} {v.kind}
            </option>
          ))}
        </select>
        <span className="tag">src/Video.tsx</span>
      </div>
      <pre className="diff-body">
        {parts?.map((p, i) => {
          const lines = p.value.replace(/\n$/, '').split('\n');
          const collapse = !p.added && !p.removed && lines.length > 8 && a !== b;
          const shown = collapse ? [...lines.slice(0, 3), `⋯ ${lines.length - 6} unchanged lines`, ...lines.slice(-3)] : lines;
          return shown.map((l, j) => {
            if (!p.removed) ln++;
            const isGap = collapse && j === 3;
            if (isGap) ln += lines.length - 7;
            return (
              <div key={`${i}-${j}`} className={`dl ${p.added ? 'add' : p.removed ? 'rem' : ''} ${isGap ? 'gap' : ''}`}>
                <span className="dn">{p.removed || isGap ? '' : ln}</span>
                <span className="dm">{p.added ? '+' : p.removed ? '−' : ' '}</span>
                <span className="dt">{l}</span>
              </div>
            );
          });
        })}
      </pre>
    </div>
  );
}
