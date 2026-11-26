import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@dailies/shared';
import { api, fileUrl } from '../lib/api';
import { summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { corrections } from '../components/Panels';
import { Logo } from '../components/Chrome';
import { Face, Icon, VMark } from '../components/ui';

/**
 * The pitch. Every number on the result slides is read from the showcase run,
 * never typed in by hand.
 */
const SHOWCASE_ID = 'kestrel-runner-launch-spot-a3eb';

const TWEETS = [
  { file: 'tweet-2.png', handle: '@steventey', url: 'https://x.com/steventey/status/2103625902211088880' },
  { file: 'tweet-1.png', handle: '@stephanlivera', url: 'https://x.com/stephanlivera/status/2103315922098470926' },
  { file: 'tweet-3.png', handle: '@ajith_io', url: 'https://x.com/ajith_io/status/2103449416325890146' },
  { file: 'tweet-4.png', handle: '@MengTo', url: 'https://x.com/MengTo/status/2103122947133309311' },
];

function useShowcase() {
  const [p, setP] = useState<Project | null>(null);
  useEffect(() => {
    api
      .projects()
      .then((list) => {
        const pick =
          list.find((x) => x.id === SHOWCASE_ID) ??
          [...list].filter((x) => x.rounds.length).sort((a, b) => corrections(b).filter((f) => f.fixedIn).length - corrections(a).filter((f) => f.fixedIn).length)[0];
        if (pick) return api.project(pick.id).then(setP);
      })
      .catch(() => undefined);
  }, []);
  return p;
}

export default function Pitch() {
  const showcase = useShowcase();
  const stats = useMemo(() => {
    if (!showcase?.rounds.length) return null;
    const first = summarize(verdictMap(showcase, worstVersion(showcase)).values());
    const last = summarize(verdictMap(showcase, showcase.versions.at(-1)?.n ?? null).values());
    const fixes = corrections(showcase);
    const rounds = showcase.rounds;
    const verifyCredits = rounds.reduce((n, r) => n + r.credits, 0);
    const conditions = rounds.reduce((n, r) => n + r.conditions, 0);
    const r = rounds.find((x) => x.results.some((y) => y.verdict !== 'pass')) ?? rounds[0];
    const failed = r.results.filter((x) => x.verdict !== 'pass');
    const cut = failed[0]?.cut;
    return {
      id: showcase.id,
      title: showcase.title,
      criteria: showcase.plan?.criteria.length ?? 0,
      first,
      last,
      fixed: fixes.filter((f) => f.fixedIn).length,
      planCredits: showcase.credits.plan,
      verifyCredits,
      conditions,
      calls: rounds.reduce((n, x) => n + x.calls, 0),
      perCheck: conditions ? verifyCredits / conditions : 0,
      targeted: rounds.find((x) => x.kind === 'targeted'),
      caught: {
        cut,
        eye: cut && r.eye[cut] ? fileUrl(showcase.id, r.eye[cut]!) : null,
        report: cut ? (r.reports?.[cut] ?? '').split('\n').filter((l) => l.trim() && !/: none$/.test(l) && !/^Smallest/.test(l)) : [],
        items: failed.map((x) => ({ ac: x.ac, cut: x.cut, text: showcase.plan?.criteria.find((c) => c.id === x.ac)?.text ?? x.ac })),
      },
    };
  }, [showcase]);

  const slides: { id: string; tone?: string; node: ReactNode }[] = [
    {
      id: 'open',
      node: (
        <div className="p-center">
          <span className="p-chip">
            <Face who="claude" size={18} /> Claude Code <span className="p-x">×</span> <Face who="kane" size={18} /> Kane CLI
          </span>
          <h1 className="p-huge">
            Video is <span className="p-grad">code</span> now.
          </h1>
          <p className="p-sub">And nobody is reviewing it.</p>
        </div>
      ),
    },
    {
      id: 'tweets',
      node: (
        <div className="p-split">
          <div>
            <span className="p-kicker">September 2026</span>
            <h2 className="p-h">Opus 5.5 learned motion design.</h2>
            <p className="p-p">One prompt became a 15-second showreel. A founder shipped a product promo the model wrote in one pass. A 3D ship, sculpted in code. They went viral because the output is genuinely good.</p>
            <blockquote className="p-quote">
              “Claude Opus 5.5 feels like the first model to have truly solved video animation.”
              <cite>Steven Tey, founder of Dub</cite>
            </blockquote>
          </div>
          <div className="p-fan">
            {TWEETS.map((t, i) => (
              <a key={t.file} href={t.url} target="_blank" rel="noreferrer" className={`p-tweet t${i}`}>
                <img src={`/pitch/tweets/${t.file}`} alt={`Post by ${t.handle} about Opus 5.5`} />
              </a>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'shift',
      node: (
        <div className="p-center">
          <span className="p-kicker">The paradigm shift</span>
          <h2 className="p-h big">
            A launch video used to be a week in a timeline.
            <br />
            <span className="p-grad">Now it’s a React file.</span>
          </h2>
          <div className="p-flow">
            <span className="p-node">
              <Icon name="book" /> storyboard
            </span>
            <i />
            <span className="p-node claude">
              <Face who="claude" size={20} /> Claude Code
            </span>
            <i />
            <span className="p-node mono">src/Video.tsx</span>
            <i />
            <span className="p-node">16:9 · 9:16 · 1:1</span>
          </div>
          <p className="p-sub small">and we’re only getting started</p>
        </div>
      ),
    },
    {
      id: 'gap',
      node: (
        <div className="p-center">
          <h2 className="p-h big">
            AI-written code got tests.
            <br />
            AI-written video got <span className="p-strike">vibes</span>.
          </h2>
          <div className="p-vs">
            <div className="good">
              <VMark state="pass" size={22} />
              <b>Code an agent writes</b>
              <span>type-checked, tested, reviewed. Kane clicks through the UI.</span>
            </div>
            <div className="bad">
              <VMark state="fail" size={22} />
              <b>Video an agent writes</b>
              <span>someone scrubs the timeline and says “looks good”.</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'caught',
      node: stats?.caught.items.length ? (
        <div className="p-split">
          <div>
            <span className="p-kicker">A real run · {stats.title}</span>
            <h2 className="p-h">
              It looked finished.
              <br />
              It wasn’t.
            </h2>
            {stats.caught.items.map((x) => (
              <div key={x.ac + x.cut} className="p-fail">
                <VMark state="fail" size={20} />
                <span>
                  {x.text} <em>{x.cut.replace('x', ':')} cut</em>
                </span>
              </div>
            ))}
            {stats.caught.report.length ? <pre className="p-report">{stats.caught.report.join('\n')}</pre> : null}
            <p className="p-p small">Claude Opus 5.5’s one-shot draft put the wordmark where Reels and TikTok draw their buttons. Nothing was planted.</p>
          </div>
          {stats.caught.eye ? (
            <figure className="p-eye">
              <img src={stats.caught.eye} alt="The contact sheet Kane CLI judged" />
              <figcaption>
                <Face who="kane" size={16} /> The exact page Kane judged: every storyboard timecode of the cut, measured in Chrome
              </figcaption>
            </figure>
          ) : null}
        </div>
      ) : (
        <div className="p-center">
          <h2 className="p-h big">It looks finished. It isn’t.</h2>
        </div>
      ),
    },
    {
      id: 'designer',
      tone: 'ink',
      node: (
        <div className="p-center">
          <h2 className="p-h big">Everyone used Kane to test their code.</h2>
          <h2 className="p-h big p-dim">I’m a designer. I used it to test what the code makes.</h2>
        </div>
      ),
    },
    {
      id: 'reveal',
      node: (
        <div className="p-center p-reveal">
          <p className="p-sub">So I built</p>
          <div className="p-logo">
            <Logo />
            {Array.from({ length: 16 }, (_, i) => (
              <i key={i} className="p-spark" style={{ ['--a' as string]: `${(i / 16) * 360}deg`, ['--d' as string]: `${(i % 4) * 0.1}s` }} />
            ))}
          </div>
          <p className="p-p center">Test-driven video. Claude Code composes. Kane CLI proves every frame against the storyboard, and won’t let Claude stop until it holds.</p>
        </div>
      ),
    },
    {
      id: 'how',
      node: (
        <div className="p-wide">
          <span className="p-kicker">How it works</span>
          <div className="p-how">
            {[
              { n: '1', who: null, t: 'Storyboard', d: 'Shots, timecodes, exact copy, cuts and safe zones, in markdown.' },
              { n: '2', who: 'claude', t: 'Claude Code drafts', d: 'Headless in a sandboxed workspace. Writes one Remotion composition for every cut.' },
              { n: '2', who: 'kane', t: 'Kane designs tests', d: 'context ingest → review → design tests: criteria and _test.md, cited to the storyboard.' },
              { n: '3', who: 'kane', t: 'Kane judges every frame', d: 'One contact sheet per cut in real Chrome. Every criterion in one call.' },
              { n: '4', who: 'fail', t: 'Stop hook', d: 'Claude tries to finish, Kane re-judges, and the failure comes back as the block reason.' },
              { n: '5', who: 'pass', t: 'Sealed proof', d: 'Kane replays its own designed tests. cover reports proven vs owed.' },
            ].map((s, i) => (
              <div key={i} className={`p-step ${s.who ?? ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <span className="p-step-n">{s.who ? <Face who={s.who as 'claude'} size={22} /> : <Icon name="book" />}</span>
                <b>{s.t}</b>
                <span>{s.d}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'kane',
      node: (
        <div className="p-wide">
          <span className="p-kicker">Kane CLI is the reviewer, not a bolt-on</span>
          <div className="p-cmds">
            {[
              ['context ingest', 'the storyboard and the inspection-surface contract become cited use-cases'],
              ['context review', 'use-cases promoted to trusted, headless'],
              ['design tests', 'criteria with oracles, scenarios, one _test.md per scenario'],
              ['run --analyzer-only --cdp-endpoint', 'every criterion judged on the sheet dailies opened'],
              ['--agent NDJSON', 'every step streams live into the studio'],
              ['Stop hook', 'Kane’s verdict is the block reason Claude reads'],
              ['testmd run', 'Kane’s own tests replayed against the final cut'],
              ['cover --json', 'proven vs owed, per acceptance criterion'],
              ['maintain reconcile', 'a storyboard edit reconciles the suite'],
            ].map(([c, d]) => (
              <div key={c} className="p-cmd">
                <code>{c}</code>
                <span>{d}</span>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'budget',
      node: (
        <div className="p-center">
          <span className="p-kicker">Accuracy without burning credits</span>
          <h2 className="p-h">One screenshot per cut. Every criterion in one call.</h2>
          <div className="p-stats">
            <div>
              <b>{stats ? stats.conditions : '—'}</b>
              <span>checks judged</span>
            </div>
            <div>
              <b>{stats ? stats.calls : '—'}</b>
              <span>Kane calls</span>
            </div>
            <div>
              <b>{stats ? stats.perCheck.toFixed(2) : '—'}</b>
              <span>credits per check</span>
            </div>
            <div>
              <b>{stats?.targeted ? stats.targeted.credits.toFixed(1) : '—'}</b>
              <span>credits to re-check a fix</span>
            </div>
          </div>
          <p className="p-p center">Exact text and positions come from a facts table measured in the browser, so Kane reads strings, not pixels. After a fix only the failed check is re-judged, then one regression sweep.</p>
        </div>
      ),
    },
    {
      id: 'result',
      node: (
        <div className="p-center">
          <span className="p-kicker">{stats ? stats.title : 'A real run'}</span>
          {stats ? (
            <>
              <div className="p-score">
                <div className="bad">
                  <b>
                    {stats.first.pass}
                    <small>/{stats.first.total}</small>
                  </b>
                  <span>before Kane</span>
                </div>
                <Icon name="next" size={40} />
                <div className="good">
                  <b>
                    {stats.last.pass}
                    <small>/{stats.last.total}</small>
                  </b>
                  <span>after the loop</span>
                </div>
              </div>
              <Link to={`/p/${stats.id}/compare`} className="btn ink lg">
                <Icon name="split" /> See before vs after
              </Link>
            </>
          ) : (
            <p className="p-p center">Run a spot through Kane review and its numbers appear here.</p>
          )}
        </div>
      ),
    },
    {
      id: 'close',
      node: (
        <div className="p-center">
          <h1 className="p-huge">
            Every frame, <span className="p-grad">proven.</span>
          </h1>
          <p className="p-sub">If an agent can write the video, an agent should have to prove it.</p>
          <div className="hero-cta" style={{ justifyContent: 'center' }}>
            <Link to="/" className="btn ink lg">
              Open the studio
            </Link>
          </div>
        </div>
      ),
    },
  ];

  const [i, setI] = useState(0);
  useEffect(() => {
    const on = (e: KeyboardEvent) => {
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        setI((x) => Math.min(slides.length - 1, x + 1));
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) setI((x) => Math.max(0, x - 1));
      else if (e.key === 'Home') setI(0);
    };
    window.addEventListener('keydown', on);
    return () => window.removeEventListener('keydown', on);
  }, [slides.length]);

  return (
    <div className={`pitch ${slides[i].tone ?? ''}`} onClick={(e) => !(e.target as HTMLElement).closest('a,button') && setI((x) => Math.min(slides.length - 1, x + 1))}>
      <div className="p-top">
        <Logo />
        <span>
          {String(i + 1).padStart(2, '0')} / {slides.length}
        </span>
      </div>
      {slides.map((s, n) => (
        <section key={s.id} className={`slide ${n === i ? 'on' : n < i ? 'past' : ''}`} aria-hidden={n !== i}>
          {s.node}
        </section>
      ))}
      <div className="p-progress">
        <i style={{ width: `${((i + 1) / slides.length) * 100}%` }} />
      </div>
      <div className="p-nav">
        <button type="button" className="iconbtn" onClick={() => setI((x) => Math.max(0, x - 1))} aria-label="Previous slide">
          <Icon name="prev" />
        </button>
        <button type="button" className="iconbtn" onClick={() => setI((x) => Math.min(slides.length - 1, x + 1))} aria-label="Next slide">
          <Icon name="next" />
        </button>
      </div>
    </div>
  );
}
