import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Thumbnail } from '@remotion/player';
import { CUTS, parseStoryboard, sampleFrames, type Project } from '@dailies/shared';
import { api, STATIC } from '../lib/api';
import { useComposition } from '../lib/composition';
import { DEMO_STORYBOARD } from '../lib/templates';
import { summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { SiteHeader } from '../components/Chrome';
import { corrections } from '../components/Panels';
import { Face, Icon, VMark } from '../components/ui';
import { useMe } from '../lib/session';
import { useHealth } from '../components/Chrome';

const FILM = import.meta.env.VITE_FILM_URL as string | undefined;

export default function Home() {
  const nav = useNavigate();
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [creating, setCreating] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const me = useMe();
  const health = useHealth();
  // MCP-only server (the hosted one): your own agent composes; there is no server-side draft.
  const mcpOnly = STATIC || health?.drafting === false;
  useEffect(() => {
    api.projects().then(setProjects).catch(() => setProjects([]));
  }, [me?.user?.id]);
  const mine = (projects ?? []).filter((p) => me?.user && p.owner === me.user.id);
  const examples = (projects ?? []).filter((p) => !p.owner);
  // The run that best shows the loop: most corrections, then most rounds.
  const showcase = useMemo(
    () => (projects ?? []).filter((p) => !p.owner && p.source !== 'mcp' && p.versions.length && p.rounds.length).sort((a, b) => corrections(b).filter((x) => x.fixedIn).length - corrections(a).filter((x) => x.fixedIn).length || b.rounds.length - a.rounds.length)[0],
    [projects],
  );

  const tryDemo = async () => {
    if (STATIC) {
      if (showcase) nav(`/p/${showcase.id}`);
      return;
    }
    setCreating(true);
    setErr(null);
    try {
      const p = await api.create(DEMO_STORYBOARD);
      await api.action(p.id, 'draft');
      nav(`/p/${p.id}`);
    } catch (e) {
      setErr((e as Error).message);
      setCreating(false);
    }
  };

  return (
    <div className="page">
      <SiteHeader onDemo={mcpOnly && !STATIC ? () => nav('/docs/mcp') : tryDemo} demoLabel={STATIC ? 'Watch the demo' : mcpOnly ? 'Get started' : 'Try the demo'} busy={creating} />
      <section className="hero">
        <div>
          <span className="eyebrow">
            <Face who="claude" size={16} />
            Claude Code writes it
            <Face who="kane" size={16} />
            Kane CLI proves it
          </span>
          <h1>
            Every frame, <em>proven.</em>
          </h1>
          <p className="lede">Agents write motion design as code now. dailies hands your storyboard to Claude Code to compose, and to Kane CLI to turn into tests. Kane judges every cut, frame by frame, in a real browser. Claude can’t call it done until the storyboard holds.</p>
          <div className="hero-cta">
            {mcpOnly && !STATIC ? (
              <Link to="/docs/mcp" className="btn ink lg">
                <Face who="claude" size={16} color="#fff" /> Connect your Claude Code
              </Link>
            ) : (
              <button type="button" className="btn ink lg" onClick={tryDemo} disabled={creating}>
                {creating ? <span className="spinner" /> : <Icon name="spark" />} {STATIC ? 'Watch the demo run' : 'Try the demo storyboard'}
              </button>
            )}
            {!mcpOnly ? (
              <Link to="/new" className="btn lg">
                <Icon name="plus" /> New spot
              </Link>
            ) : null}
            {FILM ? (
              <a href={FILM} className="btn lg" target="_blank" rel="noreferrer">
                <Icon name="play" /> Watch the film · 2 min
              </a>
            ) : null}
            {showcase && mcpOnly && !STATIC ? (
              <Link to={`/p/${showcase.id}?replay=1`} className="btn lg">
                <Icon name="replay" /> Watch a recorded run
              </Link>
            ) : null}
            {showcase && !STATIC && !mcpOnly ? (
              <Link to={`/p/${showcase.id}?replay=1`} className="btn lg ghost">
                <Icon name="replay" /> Replay a recorded run
              </Link>
            ) : null}
          </div>
          <p className="hero-note">
            {STATIC
              ? 'A recorded run, replayed with its real timing.'
              : mcpOnly
                ? 'Install the dailies plugin, sign in, and ask Claude to make the video. Kane CLI judges it here; every run is saved to your account.'
                : 'One click: creates the demo spot and starts Claude Code and Kane CLI. About 4 minutes to a reviewed cut.'}
          </p>
          {err ? <p className="err">{err}</p> : null}
        </div>
        <DemoCard project={showcase ?? null} />
      </section>

      <section className="how" id="how">
        {[
          { n: '01', who: null, t: 'Write the storyboard', d: 'Shots, timecodes, exact copy, cuts and platform rules, in markdown.' },
          { n: '02', who: 'claude', t: 'Claude Code composes', d: 'A Remotion composition for every cut, streamed into the editor as it is typed.' },
          { n: '03', who: 'kane', t: 'Kane CLI designs and judges', d: 'Criteria from the same storyboard, judged on every frame of every cut in real Chrome.' },
          { n: '04', who: 'pass', t: 'Claude can’t stop until it holds', d: 'Claude Code’s Stop hook sends every failure back to Claude. Kane re-checks every fix.' },
        ].map((s) => (
          <div key={s.n} className="how-step">
            <span className="how-n">
              {s.who ? <Face who={s.who as 'claude'} size={16} /> : <Icon name="book" size={14} />} {s.n}
            </span>
            <b>{s.t}</b>
            <span>{s.d}</span>
          </div>
        ))}
      </section>

      {me?.user ? (
        <section className="gallery" id="your-spots">
          <div className="gallery-head">
            <h2>Your spots</h2>
            <span className="muted">
              {mine.length} · <Link to="/account">account &amp; connected agents</Link>
            </span>
          </div>
          {mine.length ? (
            <div className="cards">
              {mine.map((p) => (
                <Card key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <div className="empty-spots">
              <Icon name="terminal" size={18} />
              <div>
                <b>Nothing yet.</b>
                <span>Connect Claude Code or Cursor and ask it to make a video. It shows up here, live.</span>
              </div>
              <Link to="/docs/mcp" className="btn sm">
                MCP quickstart
              </Link>
            </div>
          )}
        </section>
      ) : null}

      <section className="gallery" id="spots">
        <div className="gallery-head">
          <h2>{me?.user ? 'Examples' : 'Spots'}</h2>
          <span className="muted">{projects ? `${examples.length} project${examples.length === 1 ? '' : 's'}` : ''}</span>
        </div>
        <div className="cards">
          {examples.map((p) => (
            <Card key={p.id} p={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

/** A tiny living editor: the real composition, Kane's frames, a fail that turns into a pass. */
function DemoCard({ project }: { project: Project | null }) {
  const latest = project?.versions.at(-1)?.n ?? null;
  const { comp } = useComposition(latest ? project!.id : undefined, latest);
  const frames = useMemo(() => (project ? sampleFrames(parseStoryboard(project.storyboard)).slice(0, 8) : []), [project]);
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % 14), 700);
    return () => clearInterval(t);
  }, []);
  const spec = CUTS['16x9'];
  const at = frames.length ? frames[Math.min(step, frames.length - 1) % frames.length] : null;
  return (
    <div className="demo-card" aria-hidden>
      <div className="dc-stage">
        {comp && at ? (
          <div style={{ width: '78%', borderRadius: 8, overflow: 'hidden', boxShadow: 'var(--shadow-3)', position: 'relative' }} className={step < 8 ? 'stage-frame judging' : 'stage-frame'}>
            <Thumbnail component={comp.Component} compositionWidth={spec.width} compositionHeight={spec.height} frameToDisplay={at.frame} durationInFrames={comp.meta.durationInFrames} fps={comp.meta.fps} style={{ width: '100%', aspectRatio: '16 / 9' }} />
            {step < 8 ? <div className="sweep" /> : null}
          </div>
        ) : (
          <div className="orb" />
        )}
        <div className="statuspill" style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)' }}>
          {step < 8 ? <Face who="kane" /> : step < 11 ? <Face who="claude" /> : <Face who="pass" />}
          <span className={`lbl ${step < 8 ? 'kane' : step < 11 ? 'claude' : ''}`}>
            {step < 8 ? <span className="shimmer">Kane is judging every frame</span> : step < 11 ? <span className="shimmer">Claude is fixing the 9:16 cut</span> : 'Kane verified · every check passes'}
          </span>
        </div>
      </div>
      <div className="dc-frames">
        {Array.from({ length: 8 }, (_, i) => {
          const fr = frames[i];
          const state = i > step && step < 8 ? 'owed' : i === 5 && step < 11 ? 'fail' : 'pass';
          return (
            <div key={i} className="dc-frame" style={{ background: 'var(--canvas)' }}>
              {comp && fr ? (
                <Thumbnail component={comp.Component} compositionWidth={spec.width} compositionHeight={spec.height} frameToDisplay={fr.frame} durationInFrames={comp.meta.durationInFrames} fps={comp.meta.fps} style={{ width: '100%', height: '100%' }} />
              ) : null}
              {state !== 'owed' ? <VMark state={state} /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Card({ p }: { p: Project }) {
  const latest = p.versions.at(-1)?.n ?? null;
  const { comp } = useComposition(latest ? p.id : undefined, latest);
  const final = summarize(verdictMap(p, latest).values());
  const wv = worstVersion(p);
  const was = wv && wv !== latest ? summarize(verdictMap(p, wv).values()) : null;
  const before = was && was.fail ? was : null;
  const fixed = corrections(p).filter((f) => f.fixedIn).length;
  const spec = CUTS['16x9'];
  return (
    <Link to={`/p/${p.id}`} className="card">
      <div className="poster">
        {comp ? (
          <Thumbnail component={comp.Component} compositionWidth={spec.width} compositionHeight={spec.height} frameToDisplay={Math.floor(comp.meta.durationInFrames * 0.28)} durationInFrames={comp.meta.durationInFrames} fps={comp.meta.fps} style={{ width: '100%', aspectRatio: '16 / 9' }} />
        ) : (
          <div className="poster-empty">{p.busy ? <span className="spinner" /> : 'No draft yet'}</div>
        )}
        {p.source === 'mcp' ? <span className="ribbon agent">{p.recorded ? 'recorded · ' : ''}via {p.agent?.client ?? 'agent'} · MCP</span> : p.recorded ? <span className="ribbon">recorded run</span> : null}
      </div>
      <div className="card-body">
        <h3>{p.title}</h3>
        <div className="card-meta">
          {p.rounds.length && final.total ? (
            <>
              {before ? (
                <span className="tag fail">
                  {before.pass}/{before.total}
                </span>
              ) : null}
              {before ? <Icon name="next" size={12} /> : null}
              <span className={`tag ${final.fail ? 'fail' : 'pass'}`}>
                {final.pass}/{final.total} checks
              </span>
              {fixed ? <span className="tag claude">{fixed} fixed by the loop</span> : null}
              {p.seal?.endedAt ? <span className="tag seal">sealed</span> : null}
            </>
          ) : (
            <span className="tag">{p.plan ? `${p.plan.criteria.length} criteria` : 'storyboard'}</span>
          )}
          <span className="tag">{p.cuts.map((c) => CUTS[c].ratio).join(' ')}</span>
        </div>
      </div>
    </Link>
  );
}
