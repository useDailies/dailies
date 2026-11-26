import { useState } from 'react';
import { checkKey } from '@dailies/shared';
import { fileUrl } from '../lib/api';
import { dur, type Entry, type RoundRun } from '../lib/activity';
import { CUT_RATIO } from '../lib/verdicts';
import { Coll, Icon, VMark } from './ui';

const ROUND_LABEL: Record<string, string> = { sweep: 'Full sweep', targeted: 'Targeted re-check', regression: 'Regression sweep' };
const STAGE_LABEL: Record<string, string> = { draft: 'Drafted from the storyboard', review: 'Corrected Kane’s findings', revise: 'Made your change' };

function Running({ text }: { text: string }) {
  return <span className="shimmer">{text}</span>;
}

/** Trace-line grammar: past tense when done, present tense + shimmer while running. */
export function EntryView({ e, projectId, defaultOpen = false, onZoom }: { e: Entry; projectId: string; defaultOpen?: boolean; onZoom: (src: string) => void }) {
  switch (e.kind) {
    case 'claude': {
      const edits = e.items.filter((i) => i.type === 'edit');
      const added = edits.reduce((n, i) => n + (i.added ?? 0), 0);
      const removed = edits.reduce((n, i) => n + (i.removed ?? 0), 0);
      const label = e.status === 'running' ? `Claude Code is ${e.stage === 'draft' ? 'drafting' : e.stage === 'revise' ? 'making your change' : 'fixing'}` : STAGE_LABEL[e.stage] ?? 'Claude Code session';
      return (
        <Coll
          defaultOpen={defaultOpen}
          icon={<span className="sglyph claude">C</span>}
          title={e.status === 'running' ? <Running text={label} /> : label}
          sub={`${e.model ?? 'Claude Code'}${e.resume ? ' · resumed session' : ''} · ${edits.length} edit${edits.length === 1 ? '' : 's'}${added ? ` · +${added} −${removed}` : ''}`}
          meta={e.status === 'running' ? '' : [e.durationMs ? dur(e.durationMs) : '', e.costUsd ? `$${e.costUsd.toFixed(2)}` : ''].filter(Boolean).join(' · ')}
        >
          <dl className="kv">
            <dt>Session</dt>
            <dd className="mono">{e.sessionId?.slice(0, 8) ?? '—'}</dd>
            {e.turns ? (
              <>
                <dt>Turns</dt>
                <dd>{e.turns}</dd>
              </>
            ) : null}
          </dl>
          <Coll title="Prompt" sub="what dailies sent Claude Code" flat>
            <pre className="codeblock">{e.prompt}</pre>
          </Coll>
          {e.items
            .filter((i) => i.type !== 'read')
            .map((i, n) => (
              <div key={n} className="line">
                {i.type === 'edit' ? (
                  <span className="sglyph claude">
                    <Icon name="code" size={9} stroke={2.4} />
                  </span>
                ) : i.type === 'hook' ? (
                  <span className="sglyph hook block">
                    <Icon name="stop" size={8} />
                  </span>
                ) : (
                  <span className="sglyph done">
                    <Icon name="chat" size={9} stroke={2.2} />
                  </span>
                )}
                <span className="txt">
                  {i.text}
                  {i.added !== undefined ? (
                    <span className="meta">
                      {' '}
                      +{i.added} −{i.removed ?? 0}
                    </span>
                  ) : null}
                  {i.detail ? (
                    <Coll title="Block reason Claude received" flat>
                      <pre className="codeblock">{i.detail}</pre>
                    </Coll>
                  ) : null}
                </span>
              </div>
            ))}
          {e.items.some((i) => i.type === 'read') ? <span className="muted">{e.items.filter((i) => i.type === 'read').length} files read</span> : null}
        </Coll>
      );
    }
    case 'design': {
      const label = e.cached ? 'Test plan unchanged' : e.status === 'running' ? 'Kane CLI is designing the tests' : e.status === 'failed' ? 'Test design failed' : 'Designed the tests from the storyboard';
      return (
        <Coll
          defaultOpen={defaultOpen}
          icon={<span className="sglyph kane">K</span>}
          title={e.status === 'running' ? <Running text={label} /> : label}
          sub={e.result ? `${e.result.criteria} criteria · ${e.result.scenarios} scenarios · ${e.result.tests} tests` : e.error ?? `${e.steps.length} Kane commands`}
          meta={e.result?.credits ? `${e.result.credits.toFixed(1)} cr` : ''}
        >
          {e.steps.map((s, n) => (
            <Coll
              key={n}
              flat
              icon={s.ms === undefined ? <span className="sglyph running"><span className="spinner" /></span> : <VMark state={s.code ? 'fail' : 'pass'} size={14} />}
              title={s.label}
              meta={s.ms !== undefined ? `${dur(s.ms)} · ${(s.credits ?? 0).toFixed(1)} cr` : ''}
            >
              <pre className="codeblock">$ {s.cmd}</pre>
              {s.committed.length ? <div className="card-meta">{s.committed.map((c, i) => <span key={i} className="tag kane">{c}</span>)}</div> : null}
              {s.activity.length ? (
                <div>
                  {s.activity.map((a, i) => (
                    <div key={i} className="line">
                      <span className="txt muted">{a}</span>
                    </div>
                  ))}
                </div>
              ) : null}
            </Coll>
          ))}
        </Coll>
      );
    }
    case 'round':
      return <RoundView r={e} projectId={projectId} defaultOpen={defaultOpen} onZoom={onZoom} />;
    case 'hook': {
      const cls = e.state === 'block' ? 'block' : e.state === 'allow' ? 'allow' : e.state === 'agent' ? 'agent' : '';
      return (
        <Coll
          icon={
            <span className={`sglyph hook ${cls}`}>
              <Icon name={e.state === 'allow' ? 'check' : e.state === 'block' ? 'x' : e.state === 'agent' ? 'plug' : 'stop'} size={9} stroke={3} />
            </span>
          }
          title={e.text}
          sub={e.state === 'stop' ? 'Stop hook' : e.state === 'block' ? 'decision: block' : e.state === 'allow' ? 'decision: allow' : e.state === 'agent' ? 'dailies MCP' : 'failed open'}
        >
          {e.detail ? <pre className="codeblock">{e.detail}</pre> : null}
        </Coll>
      );
    }
    case 'version':
      return (
        <Coll
          icon={<span className="sglyph ver">v{e.n}</span>}
          title={`Pinned v${e.n}${e.vkind === 'draft' ? ' · draft' : ''}`}
          sub={e.compiles ? `${e.lines} lines${e.added !== undefined ? ` · +${e.added} −${e.removed}` : ''}` : 'does not compile'}
        >
          {e.summary ? <p className="empty" style={{ color: 'var(--ink-2)' }}>{e.summary}</p> : null}
        </Coll>
      );
    case 'request':
      return <Coll icon={<span className="sglyph req"><Icon name="chat" size={9} stroke={2.2} /></span>} title={`You asked: “${e.text}”`} sub="change request" />;
    case 'seal': {
      const passed = e.tests.filter((t) => t.status === 'passed').length;
      return (
        <Coll
          defaultOpen={defaultOpen}
          icon={<span className="sglyph seal"><Icon name="seal" size={11} stroke={2} /></span>}
          title={e.status === 'running' ? <Running text="Kane is running its designed tests" /> : `Sealed · ${passed}/${e.tests.length} designed tests passed`}
          sub="kane-cli testmd run · kane-cli cover"
          meta={`${e.tests.reduce((n, t) => n + (t.credits ?? 0), 0).toFixed(0)} cr`}
        >
          {e.tests.map((t) => (
            <Coll
              key={t.id}
              flat
              icon={<VMark state={t.status === 'passed' ? 'pass' : t.status === 'running' ? 'running' : 'fail'} size={14} />}
              title={`${t.id} · ${t.file.replace(/_test\.md$/, '')}`}
              meta={t.credits !== undefined ? `${t.credits.toFixed(0)} cr` : ''}
            >
              <pre className="codeblock">$ kane-cli testmd run .testmuai/tests/{t.file} --agent --headless</pre>
              {t.steps.map((s, i) => (
                <div key={i} className="line">
                  <VMark state={s.status === 'failed' ? 'fail' : s.status === 'done' ? 'pass' : 'running'} size={12} />
                  <span className="txt">{s.text}</span>
                </div>
              ))}
              {t.reason ? <pre className="codeblock" style={{ color: 'var(--fail-text)' }}>{t.reason}</pre> : null}
              {t.share ? (
                <a className="btn sm" href={t.share} target="_blank" rel="noreferrer">
                  <Icon name="link" size={13} /> TestMu run
                </a>
              ) : null}
            </Coll>
          ))}
        </Coll>
      );
    }
  }
}

function RoundView({ r, projectId, defaultOpen, onZoom }: { r: RoundRun; projectId: string; defaultOpen: boolean; onZoom: (src: string) => void }) {
  const done = r.checks.length;
  const fails = r.checks.filter((c) => c.verdict !== 'pass');
  const label = r.status === 'running' ? `Kane CLI is judging v${r.version}` : `${ROUND_LABEL[r.rkind] ?? 'Round'} of v${r.version}`;
  return (
    <Coll
      defaultOpen={defaultOpen}
      icon={r.status === 'running' ? <span className="sglyph running"><span className="spinner" /></span> : <VMark state={fails.length ? 'fail' : 'pass'} size={18} />}
      title={r.status === 'running' ? <Running text={label} /> : label}
      sub={`${r.status === 'running' ? `${done}/${r.total}` : `${r.summary?.pass ?? 0}/${r.total} pass`} · ${r.cuts.map((c) => CUT_RATIO[c]).join(' · ')}${r.trigger === 'hook' ? ' · via Stop hook' : ''}`}
      meta={r.summary ? `${dur(r.summary.ms)} · ${r.summary.credits.toFixed(1)} cr` : ''}
    >
      {fails.length ? (
        <div>
          {fails.map((f) => (
            <div key={checkKey(f.ac, f.cut)} className="cond fail">
              <VMark state={f.verdict} />
              <div>
                <b>{f.ac}</b>
                <span className="tag">{CUT_RATIO[f.cut]}</span>
                <p>{f.reason}</p>
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {r.calls.map((c) => (
        <Coll
          key={`${c.cut}-${c.lane}`}
          flat
          icon={c.done ? <VMark state={r.checks.some((x) => x.cut === c.cut && x.verdict !== 'pass') ? 'fail' : 'pass'} size={14} /> : <span className="sglyph running"><span className="spinner" /></span>}
          title={`${CUT_RATIO[c.cut]} sheet${c.lane ? ` · part ${c.lane + 1}` : ''} · ${c.conditions.length} conditions`}
          meta={c.done ? `${dur(c.done.ms)} · ${c.done.credits.toFixed(1)} cr` : c.error ? 'error' : ''}
        >
          {c.eye ? <img className="eyeimg" src={fileUrl(projectId, c.eye)} alt={`The ${CUT_RATIO[c.cut]} contact sheet Kane judged`} loading="lazy" onClick={() => onZoom(fileUrl(projectId, c.eye!))} /> : null}
          {c.url ? (
            <div className="line">
              <span className="sglyph done">
                <Icon name="frame" size={9} stroke={2.2} />
              </span>
              <span className="txt">
                Chrome over CDP opened <span className="mono">{c.url.replace(/^https?:\/\/[^/]+/, '')}</span>
              </span>
            </div>
          ) : null}
          {c.cmd ? <pre className="codeblock">$ {c.cmd}</pre> : null}
          {c.error ? <pre className="codeblock" style={{ color: 'var(--fail-text)' }}>{c.error}</pre> : null}
          <Coll title={`Conditions and verdicts (${c.conditions.length})`} flat>
            {c.conditions.map((cond) => {
              const res = r.checks.find((x) => x.ac === cond.ac && x.cut === c.cut);
              return (
                <div key={cond.ac} className={`cond ${res?.verdict === 'fail' ? 'fail' : ''}`}>
                  <VMark state={res?.verdict ?? 'running'} />
                  <div>
                    <b>{cond.ac}</b>
                    <span className="muted">{cond.text.replace(/^\[ac-\d+\]\s*/, '')}</span>
                    {res ? <p>{res.reason}</p> : null}
                  </div>
                </div>
              );
            })}
          </Coll>
          {c.steps.length ? (
            <Coll title={`Kane’s NDJSON steps (${c.steps.length})`} flat>
              {c.steps.map((s, i) => (
                <div key={i} className="line">
                  <VMark state={s.status === 'failed' ? 'fail' : s.status === 'done' ? 'pass' : 'running'} size={12} />
                  <span className="txt">{s.text}</span>
                </div>
              ))}
            </Coll>
          ) : null}
        </Coll>
      ))}
    </Coll>
  );
}

export function ActivityList({ entries, projectId }: { entries: Entry[]; projectId: string }) {
  const [zoom, setZoom] = useState<string | null>(null);
  if (!entries.length) return <p className="empty">Every Claude Code session, every Kane CLI command and verdict, and every Stop-hook decision for this spot lands here.</p>;
  const lastRunning = [...entries].reverse().find((e) => 'status' in e && e.status === 'running');
  return (
    <div>
      {[...entries].reverse().map((e) => (
        <EntryView key={e.key} e={e} projectId={projectId} defaultOpen={e === lastRunning} onZoom={setZoom} />
      ))}
      {zoom ? (
        <div className="lightbox" onClick={() => setZoom(null)} role="dialog" aria-label="Kane’s view">
          <img src={zoom} alt="" />
        </div>
      ) : null}
    </div>
  );
}
