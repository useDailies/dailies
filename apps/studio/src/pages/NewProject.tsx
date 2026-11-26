import { useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CUTS, formatTimecode, parseStoryboard, sampleFrames } from '@dailies/shared';
import { api, STATIC } from '../lib/api';
import { TEMPLATES } from '../lib/templates';
import { TopBar, useHealth } from '../components/Chrome';
import { Cmd } from './Account';
import { Face, Icon } from '../components/ui';

export default function NewProject() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const initial = TEMPLATES.find((t) => t.id === params.get('template')) ?? TEMPLATES[0];
  const [tpl, setTpl] = useState(initial.id);
  const [body, setBody] = useState(initial.body);
  const [saving, setSaving] = useState<null | 'create' | 'go'>(null);
  const [err, setErr] = useState<string | null>(null);
  const health = useHealth();
  const mcpOnly = health?.drafting === false;
  const sb = useMemo(() => parseStoryboard(body), [body]);
  const frames = useMemo(() => sampleFrames(sb), [sb]);

  const create = async (start: boolean) => {
    setSaving(start ? 'go' : 'create');
    setErr(null);
    try {
      const p = await api.create(body);
      if (start) await api.action(p.id, 'draft');
      nav(`/p/${p.id}`);
    } catch (e) {
      setErr((e as Error).message);
      setSaving(null);
    }
  };

  return (
    <div className="page">
      <TopBar />
      <div className="newp">
        <section>
          <h1>Write the storyboard</h1>
          <p className="lede">Plain markdown: shots with timecodes, exact copy, cuts and rules. Claude Code composes from it. Kane CLI derives its acceptance criteria from the same lines.</p>
          <div className="tpls" role="radiogroup" aria-label="Start from">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                role="radio"
                aria-checked={tpl === t.id}
                className={`tpl ${tpl === t.id ? 'on' : ''}`}
                onClick={() => {
                  setTpl(t.id);
                  setBody(t.body);
                }}
                title={t.blurb}
              >
                {t.id === 'demo' ? <span className="star">★</span> : null}
                {t.name}
              </button>
            ))}
          </div>
          <div className="editor">
            <div className="gutter" aria-hidden>
              {body.split('\n').map((_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </div>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} spellCheck={false} aria-label="Storyboard markdown" />
          </div>
        </section>

        <aside className="preview">
          <h3>{sb.title}</h3>
          <div className="card-meta">
            <span className="tag">
              {sb.duration}s · {sb.fps} fps
            </span>
            {sb.cuts.map((c) => (
              <span key={c} className="tag">
                <i className={`cut-glyph cut-${c}`} /> {CUTS[c].ratio}
              </span>
            ))}
            <span className="tag">{sb.shots.length} shots</span>
          </div>
          <div className="mini-tl">
            {sb.shots.map((s) => (
              <div key={s.n} className={`shot shot-${(s.n - 1) % 6}`} style={{ left: `${(s.start / sb.duration) * 100}%`, width: `${((s.end - s.start) / sb.duration) * 100}%` }}>
                <b>{s.n}</b> {s.title}
              </div>
            ))}
            {frames.map((f) => (
              <i key={f.label} className="mini-f" style={{ left: `${(f.seconds / sb.duration) * 100}%` }} title={`${f.label} · ${f.timecode} · ${f.reason}`} />
            ))}
          </div>
          <p className="muted" style={{ fontSize: 12, margin: 0 }}>
            Kane judges {frames.length} frames per cut: {frames.map((f) => formatTimecode(f.seconds)).join(' · ')}
          </p>
          <ol className="steps">
            <li>
              <b>Claude Code</b> writes <code>src/Video.tsx</code>.
            </li>
            <li>
              <b>Kane CLI</b> designs the criteria and <code>_test.md</code> files at the same time.
            </li>
            <li>
              <b>Kane review</b> judges every criterion on every cut. Claude can’t stop until they pass.
            </li>
          </ol>
          {err ? <p className="err">{err}</p> : null}
          {mcpOnly ? (
            <div className="mcp-note">
              <b>
                <Face who="claude" size={15} /> Compose it with your own agent
              </b>
              <span className="muted">This dailies server judges with Kane CLI; your Claude Code (or Cursor) writes the video. Save this storyboard as video/storyboard.md in your repo, then:</span>
              <Cmd>claude plugin install dailies@dailies</Cmd>
              <Cmd>{'claude "/dailies:video"'}</Cmd>
              <a className="btn" href="/docs/mcp">
                Full quickstart
              </a>
            </div>
          ) : (
            <>
              <button type="button" className="btn ink lg" disabled={Boolean(saving) || STATIC || !sb.shots.length} onClick={() => create(true)}>
                {saving === 'go' ? <span className="spinner" /> : <Icon name="spark" />} Create and generate
              </button>
              <button type="button" className="btn" disabled={Boolean(saving) || STATIC || !sb.shots.length} onClick={() => create(false)}>
                Create only
              </button>
              <p className="muted" style={{ fontSize: 12, margin: 0, display: 'flex', gap: 6, alignItems: 'center' }}>
                <Face who="claude" size={14} /> Claude Code and <Face who="kane" size={14} /> Kane CLI run on this machine.
              </p>
            </>
          )}
          {!sb.shots.length ? <p className="err">Add at least one “## Shot N (0:00–0:03) Title” heading.</p> : null}
        </aside>
      </div>
    </div>
  );
}
