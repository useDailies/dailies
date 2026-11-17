import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { checkKey, type Criterion, type CutId, type Project, type Storyboard } from '@dailies/shared';
import { api, fileUrl } from '../lib/api';
import type { FeedItem, LiveState } from '../lib/stream';
import { CUT_RATIO, type Cell } from '../lib/verdicts';
import { Icon } from './Chrome';

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
      <div className="sb sb-edit">
        <textarea value={draft} onChange={(e) => setDraft(e.target.value)} spellCheck={false} aria-label="Storyboard markdown" />
        <div className="sb-edit-bar">
          <button type="button" className="btn ghost" onClick={() => setEditing(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="btn"
            onClick={async () => {
              await onSave(draft);
              setEditing(false);
            }}
          >
            Save storyboard
          </button>
        </div>
      </div>
    );

  return (
    <div className="sb">
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
            <li
              key={l.n}
              className={`sb-line sb-${l.kind} ${focusLine === l.n ? 'focus' : ''} ${acs.length ? 'has' : ''}`}
              onClick={() => acs.length && onLine(l.n, acs)}
            >
              <span className="sb-n">{l.n}</span>
              <span className="sb-t">{l.text.replace(/^#+\s*/, '').replace(/^[-*]\s+/, '')}</span>
              {acs.length ? (
                <span className={`sb-dot sb-dot-${st}`} title={`${acs.length} criteria · ${acs.map((a) => a.id).join(', ')}`}>
                  {acs.length}
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>
      {editable ? (
        <button type="button" className="btn ghost sb-editbtn" onClick={() => setEditing(true)}>
          Edit storyboard
        </button>
      ) : null}
    </div>
  );
}

/* ---------------------------------------------------------------- live feed */

function useStickyScroll(dep: unknown) {
  const ref = useRef<HTMLDivElement>(null);
  const stick = useRef(true);
  useEffect(() => {
    const el = ref.current;
    if (el && stick.current) el.scrollTop = el.scrollHeight;
  }, [dep]);
  return {
    ref,
    onScroll: () => {
      const el = ref.current;
      if (el) stick.current = el.scrollHeight - el.scrollTop - el.clientHeight < 40;
    },
  };
}

function FeedRow({ f }: { f: FeedItem }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`feed-row tone-${f.tone ?? 'plain'} kind-${f.kind}`} onClick={() => f.detail && setOpen(!open)}>
      <time>{new Date(f.ts).toLocaleTimeString([], { hour12: false })}</time>
      <div className="feed-body">
        <span className="feed-text">{f.text}</span>
        {f.meta?.added !== undefined ? (
          <span className="feed-diff">
            <b className="add">+{f.meta.added}</b>
            {f.meta.removed ? <b className="rem">−{f.meta.removed}</b> : null}
          </span>
        ) : null}
        {f.detail ? <span className="feed-more">{open ? '▾' : '▸'}</span> : null}
        {open && f.detail ? <pre className="feed-detail">{f.detail}</pre> : null}
      </div>
    </div>
  );
}

export function AgentFeeds({ state }: { state: LiveState }) {
  const claude = state.feed.filter((f) => f.who === 'claude' || (f.who === 'dailies' && f.kind === 'version'));
  const kane = state.feed.filter((f) => f.who === 'kane' || (f.who === 'dailies' && f.kind !== 'version'));
  const a = useStickyScroll(claude.length);
  const b = useStickyScroll(kane.length);
  return (
    <div className="feeds">
      <section className={`feed feed-claude ${state.claudeWorking ? 'working' : ''}`}>
        <header>
          <i className="dot" /> Claude Code <span>{state.claudeWorking ? (state.editing ? `editing ${state.editing.file ?? ''}` : 'thinking') : 'idle'}</span>
        </header>
        <div className="feed-scroll" ref={a.ref} onScroll={a.onScroll}>
          {claude.length ? claude.map((f) => <FeedRow key={f.seq} f={f} />) : <p className="feed-empty">Claude Code’s edits and messages stream here.</p>}
        </div>
      </section>
      <section className={`feed feed-kane ${state.kaneWorking ? 'working' : ''}`}>
        <header>
          <i className="dot" /> Kane CLI <span>{state.kaneWorking ? (state.round && !state.round.done ? `judging v${state.round.version}` : 'designing tests') : 'idle'}</span>
        </header>
        <div className="feed-scroll" ref={b.ref} onScroll={b.onScroll}>
          {kane.length ? kane.map((f) => <FeedRow key={f.seq} f={f} />) : <p className="feed-empty">Kane’s test design, judgements and verdicts stream here.</p>}
        </div>
      </section>
    </div>
  );
}

/* --------------------------------------------------------------- round board */

export function RoundBoard({ state, criteria }: { state: LiveState; criteria: Criterion[] }) {
  const r = state.round;
  if (!r) return null;
  const keys = new Set(r.checks);
  const rows = criteria.filter((c) => r.cuts.some((cut) => keys.has(checkKey(c.id, cut))));
  const done = Object.keys(r.results).length;
  const pass = Object.values(r.results).filter((x) => x.verdict === 'pass').length;
  const fail = Object.values(r.results).filter((x) => x.verdict === 'fail').length;
  return (
    <div className={`roundboard ${r.done ? 'done' : 'live'}`}>
      <header>
        <div>
          <b>{r.kind === 'sweep' ? 'Full sweep' : r.kind === 'targeted' ? 'Targeted re-check' : 'Regression sweep'}</b>
          <span>
            v{r.version} · {r.cuts.map((c) => CUT_RATIO[c]).join(' · ')}
          </span>
        </div>
        <div className="rb-stats">
          <span className="ok">{pass} pass</span>
          <span className="bad">{fail} fail</span>
          <span>
            {done}/{r.checks.length}
          </span>
          {r.credits ? <span>{r.credits.toFixed(1)} cr</span> : null}
        </div>
      </header>
      <div className="rb-progress">
        <i style={{ width: `${(done / Math.max(1, r.checks.length)) * 100}%` }} />
      </div>
      <div className="rb-grid" style={{ gridTemplateColumns: `minmax(0,1fr) repeat(${r.cuts.length}, 44px)` }}>
        <span />
        {r.cuts.map((c) => (
          <span key={c} className="rb-h">
            {CUT_RATIO[c]}
          </span>
        ))}
        {rows.map((c) => (
          <Fragment key={c.id}>
            <span className="rb-ac" title={c.text}>
              <b>{c.id}</b> {c.text}
            </span>
            {r.cuts.map((cut) => {
              const k = checkKey(c.id, cut);
              const res = r.results[k];
              const st = !keys.has(k) ? 'na' : res ? res.verdict : r.done ? 'unknown' : 'running';
              return <span key={cut} className={`rb-cell rb-${st}`} title={res?.reason ?? ''} />;
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- findings */

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

export function Findings({
  project,
  sb,
  onShow,
  focus,
}: {
  project: Project | null;
  sb: Storyboard;
  onShow: (c: Correction, version: number) => void;
  focus: string | null;
}) {
  const list = corrections(project);
  if (!project?.rounds.length) return <p className="empty">Run Kane review to see what it catches. Every failed check, Claude’s fix and Kane’s re-verification lands here.</p>;
  if (!list.length) return <p className="empty ok">Kane judged every criterion on every cut and found nothing to correct.</p>;
  const fixed = list.filter((x) => x.fixedIn).length;
  return (
    <div className="findings">
      <div className="findings-sum">
        <b>{list.length}</b> problems Kane caught · <b className="ok">{fixed}</b> corrected by Claude and re-verified{list.length - fixed ? <> · <b className="bad">{list.length - fixed}</b> open</> : null}
      </div>
      {list.map((x) => {
        const first = x.history.find((h) => h.verdict !== 'pass')!;
        const fixV = x.fixedIn ? project.versions.find((v) => v.n === x.fixedIn) : null;
        const line = x.c?.line ? sb.lines.find((l) => l.n === x.c!.line) : null;
        const k = checkKey(x.ac, x.cut);
        return (
          <article key={k} className={`finding ${x.fixedIn ? 'fixed' : 'open'} ${focus === k ? 'focus' : ''}`} id={`finding-${k}`}>
            <header>
              <span className={`badge ${x.fixedIn ? 'pass' : 'fail'}`}>{x.fixedIn ? 'Corrected' : 'Open'}</span>
              <b>{x.ac}</b>
              <span className="cutpill">{CUT_RATIO[x.cut]}</span>
            </header>
            <p className="f-crit">{x.c?.text}</p>
            {line ? (
              <p className="f-cite">
                storyboard.md L{line.n} · <q>{line.text.replace(/^[-*]\s+/, '')}</q>
              </p>
            ) : null}
            <div className="f-steps">
              <div className="f-step kane">
                <span className="f-who">Kane · v{first.version}</span>
                <p>{first.reason || 'Could not be judged'}</p>
                {first.frames.length ? <span className="f-frames">{first.frames.join(' · ')}</span> : null}
                {(() => {
                  const ev = sheetEvidence(project, first.round, x.cut, x.c?.text ?? '');
                  return ev ? <p className="f-evidence">Sheet it judged: {ev}</p> : null;
                })()}
              </div>
              {fixV ? (
                <div className="f-step claude">
                  <span className="f-who">
                    Claude · v{fixV.n}
                    {fixV.added !== undefined ? (
                      <em>
                        +{fixV.added} −{fixV.removed}
                      </em>
                    ) : null}
                  </span>
                  <p>{firstSentences(fixV.summary)}</p>
                </div>
              ) : null}
              {x.fixedIn ? (
                <div className="f-step verified">
                  <span className="f-who">Kane · v{x.fixedIn}</span>
                  <p>{x.history.find((h) => h.version === x.fixedIn && h.verdict === 'pass')?.reason}</p>
                </div>
              ) : null}
            </div>
            <div className="f-actions">
              <button type="button" className="btn ghost sm" onClick={() => onShow(x, first.version)}>
                <Icon name="eye" size={14} /> Before (v{first.version})
              </button>
              {x.fixedIn ? (
                <button type="button" className="btn ghost sm" onClick={() => onShow(x, x.fixedIn!)}>
                  <Icon name="check" size={14} /> After (v{x.fixedIn})
                </button>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  );
}

/** The line of the sheet's measured placement report that bears on this criterion. */
export function sheetEvidence(project: Project, roundId: string, cut: CutId, text: string): string | null {
  const report = project.rounds.find((r) => r.id === roundId)?.reports?.[cut];
  if (!report) return null;
  const lines = report.split('\n');
  const t = text.toLowerCase();
  const pick = /bottom/.test(t) ? 'bottom' : /top/.test(t) ? 'top' : /side/.test(t) ? 'side' : /inside the frame|outside the frame|within the frame/.test(t) ? 'outside the frame' : null;
  if (!pick) return null;
  return lines.find((l) => l.toLowerCase().includes(pick)) ?? null;
}

function firstSentences(s?: string) {
  if (!s) return 'Edited src/Video.tsx';
  const t = s.replace(/\s+/g, ' ').trim();
  const cut = t.split(/(?<=[.!?])\s/).slice(0, 2).join(' ');
  return cut.length > 280 ? `${cut.slice(0, 277)}…` : cut;
}

/* ---------------------------------------------------------------- criteria */

export function CriteriaList({
  project,
  cells,
  sb,
  focusAc,
  onPick,
}: {
  project: Project | null;
  cells: Map<string, Cell>;
  sb: Storyboard;
  focusAc: string | null;
  onPick: (ac: string, cut: CutId) => void;
}) {
  const plan = project?.plan;
  if (!plan) return <p className="empty">Kane designs the acceptance criteria from your storyboard while Claude drafts.</p>;
  return (
    <div className="criteria">
      <div className="crit-sum">
        <span>
          <b>{plan.criteria.length}</b> criteria
        </span>
        <span>
          <b>{plan.scenarios.length}</b> scenarios
        </span>
        <span>
          <b>{plan.tests.length}</b> tests
        </span>
        <span>
          <b>{plan.credits.toFixed(1)}</b> cr to design
        </span>
      </div>
      {plan.usecases.length ? (
        <div className="crit-ucs">
          {plan.usecases.map((u) => (
            <div key={u.id} className="uc">
              <b>{u.id}</b> {u.title}
              {u.anchors.length ? <span className="anchors">cites {u.anchors.join(', ')}</span> : null}
            </div>
          ))}
        </div>
      ) : null}
      {plan.criteria.map((c) => (
        <div key={c.id} className={`crit ${focusAc === c.id ? 'focus' : ''}`}>
          <div className="crit-top">
            <b>{c.id}</b>
            {c.risk ? <span className={`risk risk-${c.risk}`}>{c.risk}</span> : null}
            <span className="crit-cuts">
              {c.cuts.map((cut) => {
                const st = cells.get(checkKey(c.id, cut))?.state ?? 'owed';
                return (
                  <button key={cut} type="button" className={`vpill v-${st}`} onClick={() => onPick(c.id, cut)} title={cells.get(checkKey(c.id, cut))?.reason ?? st}>
                    {CUT_RATIO[cut]}
                  </button>
                );
              })}
            </span>
          </div>
          <p>{c.text}</p>
          <div className="crit-meta">
            {c.expected ? (
              <span>
                oracle: {c.expected.operator} <code>{String(c.expected.operand)}</code>
              </span>
            ) : null}
            {c.line ? <span>L{c.line}</span> : null}
            {c.tests.length ? <span>verified by {c.tests.join(', ')}</span> : null}
            {c.shot ? <span>shot {c.shot}</span> : null}
            {c.times.length ? <span>{c.times.map((t) => `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, '0')}`).join(', ')}</span> : null}
          </div>
        </div>
      ))}
      <TestFiles project={project!} />
    </div>
  );
}

function TestFiles({ project }: { project: Project }) {
  const [files, setFiles] = useState<{ file: string; body: string }[] | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  useEffect(() => {
    api.tests(project.id).then(setFiles).catch(() => setFiles([]));
  }, [project.id, project.plan?.createdAt]);
  if (!files?.length) return null;
  return (
    <div className="testfiles">
      <h4>Kane-designed test files</h4>
      {files.map((f) => (
        <div key={f.file} className="tf">
          <button type="button" onClick={() => setOpen(open === f.file ? null : f.file)}>
            <Icon name="code" size={14} /> .testmuai/tests/{f.file}
          </button>
          {open === f.file ? <pre>{f.body}</pre> : null}
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------- kane's eye */

export function KaneEye({ project, state, cut }: { project: Project | null; state: LiveState; cut: CutId }) {
  const [zoom, setZoom] = useState<string | null>(null);
  if (!project) return null;
  const rounds = [...project.rounds].reverse();
  const live = state.round && !state.round.done ? state.round : null;
  return (
    <div className="eye">
      <p className="eye-intro">
        The exact page Kane CLI judged: one contact sheet per cut, every storyboard timecode in a single screenshot, facts measured from the browser below the fold.
      </p>
      {live ? (
        <div className="eye-live">
          <b>Judging now · v{live.version}</b>
          <div className="eye-grid">
            {live.cuts.map((c) => (
              <figure key={c} className={c === cut ? 'on' : ''}>
                {live.eye[c] ? <img src={fileUrl(project.id, live.eye[c]!)} alt={`Kane's view of the ${CUT_RATIO[c]} sheet`} onClick={() => setZoom(fileUrl(project.id, live.eye[c]!))} /> : <div className="eye-wait">opening sheet…</div>}
                <figcaption>
                  {CUT_RATIO[c]} · <span>{live.steps[c] ?? 'waiting for Kane'}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      ) : null}
      {rounds.map((r) => (
        <div key={r.id} className="eye-round">
          <b>
            {r.id} · {r.kind} · v{r.version}
          </b>
          <span>
            {r.results.filter((x) => x.verdict === 'pass').length} pass · {r.results.filter((x) => x.verdict !== 'pass').length} fail · {r.credits.toFixed(1)} cr · {(r.durationMs / 1000).toFixed(0)}s
          </span>
          <div className="eye-grid">
            {Object.entries(r.eye).map(([c, src]) => (
              <figure key={c}>
                <img src={fileUrl(project.id, src!)} alt={`Kane's view of the ${CUT_RATIO[c]} sheet in ${r.id}`} loading="lazy" onClick={() => setZoom(fileUrl(project.id, src!))} />
                <figcaption>{CUT_RATIO[c]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      ))}
      {zoom ? (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-label="Kane's view">
          <img src={zoom} alt="" />
        </div>
      ) : null}
    </div>
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
      setA((x) => x ?? versions[0].n);
      setB(versions.at(-1)!.n);
    } else if (versions.length === 1) {
      setA(versions[0].n);
      setB(versions[0].n);
    }
  }, [versions.length]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!project || a === null || b === null) return;
    setParts(null);
    api.diff(project.id, a, b).then(setParts).catch(() => setParts([]));
  }, [project, a, b]);
  if (!versions.length) return <p className="empty">Claude’s code appears here once the first draft is pinned.</p>;
  let ln = 0;
  return (
    <div className="diff">
      <div className="diff-pick">
        <select value={a ?? ''} onChange={(e) => setA(Number(e.target.value))} aria-label="From version">
          {versions.map((v) => (
            <option key={v.n} value={v.n}>
              v{v.n} {v.kind}
            </option>
          ))}
        </select>
        <span>→</span>
        <select value={b ?? ''} onChange={(e) => setB(Number(e.target.value))} aria-label="To version">
          {versions.map((v) => (
            <option key={v.n} value={v.n}>
              v{v.n} {v.kind}
            </option>
          ))}
        </select>
        <span className="diff-file">src/Video.tsx</span>
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

/* -------------------------------------------------------------------- proof */

export function ProofPanel({ project }: { project: Project | null }) {
  const seal = project?.seal;
  if (!seal)
    return (
      <p className="empty">
        Seal runs Kane’s own designed <code>_test.md</code> files against the final cut in a real browser, writes an evidence pack per test and measures coverage with <code>kane-cli cover</code>. The first run authors each test (credits); every
        replay after that is free.
      </p>
    );
  const cov = seal.coverage as
    | { pct?: number; criteria?: { total: number; proven: number }; perAc?: Record<string, { state: string }> }
    | null
    | undefined;
  const states = cov?.perAc ? Object.entries(cov.perAc) : [];
  return (
    <div className="proof">
      <div className="proof-head">
        <div>
          <b>Sealed on v{seal.version}</b>
          <span>
            {seal.tests.filter((t) => t.status === 'passed').length}/{seal.tests.length} designed tests passed · {seal.credits.toFixed(0)} cr
          </span>
        </div>
        {cov?.criteria ? (
          <div className="proof-cov">
            <b>
              {cov.criteria.proven}/{cov.criteria.total}
            </b>
            <span>criteria proven (kane-cli cover)</span>
          </div>
        ) : null}
      </div>
      {states.length ? (
        <div className="ac-states">
          {states.map(([ac, v]) => (
            <span key={ac} className={`acs acs-${v.state}`} title={v.state}>
              {ac}
            </span>
          ))}
        </div>
      ) : null}
      {seal.tests.map((t) => (
        <div key={t.id} className={`ptest pt-${t.status}`}>
          <div className="pt-top">
            <span className={`badge ${t.status === 'passed' ? 'pass' : t.status === 'running' || t.status === 'queued' ? '' : 'fail'}`}>{t.status}</span>
            <b>{t.id}</b>
            <span className="pt-title">{t.title ?? t.file}</span>
            {t.share ? (
              <a href={t.share} target="_blank" rel="noreferrer" className="pt-link">
                TestMu run ↗
              </a>
            ) : null}
          </div>
          {t.reason ? (
            <p className="pt-reason">
              {t.failedStep ? <em>{t.failedStep}: </em> : null}
              {t.reason}
            </p>
          ) : null}
        </div>
      ))}
      <p className="muted small">
        A failing designed test is Kane’s verdict on its own test, not only on the video: open the run to see whether the cut or the test design is at fault. Replays of these tests are free.
      </p>
    </div>
  );
}

export function GateCard({ project, onToggle }: { project: Project; onToggle: (on: boolean) => void }) {
  const [copied, setCopied] = useState(false);
  const cmd = `cd workspaces/${project.id} && claude`;
  return (
    <div className={`gate ${project.gate ? 'on' : ''}`}>
      <div className="gate-top">
        <div>
          <b>Connect your Claude Code</b>
          <span>Every time your own session tries to stop, Kane judges the cut first.</span>
        </div>
        <button type="button" role="switch" aria-checked={Boolean(project.gate)} className={`switch ${project.gate ? 'on' : ''}`} onClick={() => onToggle(!project.gate)}>
          <i />
        </button>
      </div>
      {project.gate ? (
        <button
          type="button"
          className="gate-cmd"
          onClick={() => {
            void navigator.clipboard?.writeText(cmd);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
          }}
        >
          <code>$ {cmd}</code>
          <span>{copied ? 'copied' : 'copy'}</span>
        </button>
      ) : null}
    </div>
  );
}
