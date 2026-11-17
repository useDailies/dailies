import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CUTS, formatTimecode, parseStoryboard, sampleFrames } from '@dailies/shared';
import { api, STATIC } from '../lib/api';
import { TEMPLATES } from '../lib/templates';
import { Icon, TopBar } from '../components/Chrome';

export default function NewProject() {
  const nav = useNavigate();
  const [tpl, setTpl] = useState(TEMPLATES[0].id);
  const [body, setBody] = useState(TEMPLATES[0].body);
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const sb = useMemo(() => parseStoryboard(body), [body]);
  const frames = useMemo(() => sampleFrames(sb), [sb]);

  const create = async () => {
    setSaving(true);
    setErr(null);
    try {
      const p = await api.create(body);
      nav(`/p/${p.id}`);
    } catch (e) {
      setErr((e as Error).message);
      setSaving(false);
    }
  };

  return (
    <div className="page newp">
      <TopBar />
      <div className="newp-grid">
        <section className="newp-edit">
          <header>
            <p className="eyebrow">New spot</p>
            <h1>
              Write the storyboard. <em>It becomes the test suite.</em>
            </h1>
            <p className="lede">Plain markdown. Shots with timecodes, exact copy, cuts and constraints. Claude Code composes from it; Kane CLI derives the acceptance criteria from the same lines.</p>
          </header>
          <div className="tpls" role="radiogroup" aria-label="Start from a template">
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
              >
                <b>{t.name}</b>
                <span>{t.blurb}</span>
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

        <aside className="newp-preview">
          <h3>What dailies reads</h3>
          <dl className="kv">
            <div>
              <dt>Title</dt>
              <dd>{sb.title}</dd>
            </div>
            <div>
              <dt>Length</dt>
              <dd>
                {sb.duration}s · {sb.fps} fps · {sb.durationInFrames} frames
              </dd>
            </div>
            <div>
              <dt>Cuts</dt>
              <dd className="cuts">
                {sb.cuts.map((c) => (
                  <span key={c}>
                    <i className={`cut-glyph cut-${c}`} /> {CUTS[c].ratio} <small>{CUTS[c].width}×{CUTS[c].height}</small>
                  </span>
                ))}
              </dd>
            </div>
          </dl>
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
          <p className="muted small">
            Kane will judge {frames.length} frames per cut: {frames.map((f) => formatTimecode(f.seconds)).join(' · ')}
          </p>
          <ol className="steps">
            <li>
              <b>Claude Code</b> writes <code>src/Video.tsx</code> in a sandboxed workspace.
            </li>
            <li>
              <b>Kane CLI</b> ingests the storyboard and designs acceptance criteria and <code>_test.md</code> files — at the same time.
            </li>
            <li>
              <b>Run Kane review</b>: every criterion judged on every cut in a real browser; Claude’s Stop hook won’t release it until they pass.
            </li>
          </ol>
          {err ? <p className="err">{err}</p> : null}
          <button type="button" className="btn primary big" disabled={saving || STATIC || !sb.shots.length} onClick={create}>
            <Icon name="plus" /> {saving ? 'Creating…' : 'Create project'}
          </button>
          {!sb.shots.length ? <p className="err">Add at least one “## Shot N (0:00–0:03) Title” heading.</p> : null}
        </aside>
      </div>
    </div>
  );
}
