import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Thumbnail } from '@remotion/player';
import { CUTS, type Project } from '@dailies/shared';
import { api, STATIC } from '../lib/api';
import { useComposition } from '../lib/composition';
import { summarize, verdictMap } from '../lib/verdicts';
import { Icon, TopBar } from '../components/Chrome';
import { corrections } from '../components/Panels';

export default function Home() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  useEffect(() => {
    api.projects().then(setProjects).catch(() => setProjects([]));
  }, []);

  return (
    <div className="page home">
      <TopBar />
      <section className="hero">
        <p className="eyebrow">Test-driven video · Claude Code × Kane CLI</p>
        <h1>
          Every frame, <em>proven.</em>
        </h1>
        <p className="lede">
          Agents now write motion design as code. dailies hands your storyboard to Claude Code to compose — and to Kane CLI to turn into tests. Kane judges every cut, frame by frame, in a real browser, and Claude can’t call it done until the
          storyboard holds.
        </p>
        <div className="hero-cta">
          {!STATIC ? (
            <Link to="/new" className="btn primary big">
              <Icon name="plus" /> New spot
            </Link>
          ) : null}
          <Link to="/pitch" className="btn ghost big">
            Why this exists
          </Link>
        </div>
      </section>

      <section className="gallery">
        <div className="gallery-head">
          <h2>Projects</h2>
          <span className="muted">{projects ? `${projects.length} spot${projects.length === 1 ? '' : 's'}` : ''}</span>
        </div>
        {projects && !projects.length ? (
          <div className="gallery-empty">
            <p>No spots yet. Start from a storyboard template — the launch spot is a good first run.</p>
            {!STATIC ? (
              <Link to="/new" className="btn">
                Create the first one
              </Link>
            ) : null}
          </div>
        ) : null}
        <div className="cards">
          {projects?.map((p) => <Card key={p.id} p={p} />)}
        </div>
      </section>
    </div>
  );
}

function Card({ p }: { p: Project }) {
  const latest = p.versions.at(-1)?.n ?? null;
  const first = p.versions[0]?.n ?? null;
  const { comp } = useComposition(latest ? p.id : undefined, latest);
  const final = summarize(verdictMap(p, latest).values());
  const draft = first && p.rounds.length ? summarize(verdictMap(p, p.rounds[0].version).values()) : null;
  const fixes = corrections(p);
  const spec = CUTS['16x9'];
  return (
    <Link to={`/p/${p.id}`} className="card">
      <div className="poster">
        {comp ? (
          <Thumbnail
            component={comp.Component}
            compositionWidth={spec.width}
            compositionHeight={spec.height}
            frameToDisplay={Math.floor(comp.meta.durationInFrames * 0.28)}
            durationInFrames={comp.meta.durationInFrames}
            fps={comp.meta.fps}
            style={{ width: '100%', aspectRatio: '16 / 9' }}
          />
        ) : (
          <div className="poster-empty">{p.busy ? 'Generating…' : 'No draft yet'}</div>
        )}
        {p.recorded ? <span className="ribbon">Recorded run</span> : null}
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <div className="card-meta">
          <span>{p.versions.length ? `${p.versions.length} version${p.versions.length > 1 ? 's' : ''}` : 'storyboard only'}</span>
          <span>{p.cuts.map((c) => CUTS[c].ratio).join(' · ')}</span>
        </div>
        {final.total && p.rounds.length ? (
          <div className="card-score">
            {draft && draft.pass !== final.pass ? (
              <span className="from">
                draft {draft.pass}/{draft.total}
              </span>
            ) : null}
            <span className={final.fail ? 'bad' : 'ok'}>
              {final.pass}/{final.total} checks
            </span>
            {fixes.length ? <span>{fixes.filter((f) => f.fixedIn).length} corrected by Kane loop</span> : null}
          </div>
        ) : (
          <div className="card-score muted">{p.plan ? `${p.plan.criteria.length} criteria designed` : 'Not reviewed yet'}</div>
        )}
      </div>
    </Link>
  );
}
