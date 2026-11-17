import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { Project } from '@dailies/shared';
import { api, fileUrl } from '../lib/api';
import { summarize, verdictMap, worstVersion } from '../lib/verdicts';
import { corrections } from '../components/Panels';
import { Logo } from '../components/Chrome';

/**
 * The pitch. Numbers on the result slides are read from the showcase project
 * (the most-reviewed spot in this install), never typed in by hand.
 */
const TWEETS = [
  { file: 'tweet-2.png', handle: '@steventey', quote: 'Claude Opus 5.5 feels like the first model to have truly solved video animation.', url: 'https://x.com/steventey/status/2103625902211088880' },
  { file: 'tweet-1.png', handle: '@stephanlivera', quote: 'Opus 5.5 on Max effort — one prompt, a 15-second motion-graphics showreel.', url: 'https://x.com/stephanlivera/status/2103315922098470926' },
  { file: 'tweet-3.png', handle: '@ajith_io', quote: 'WTF? Made with claude OPUS 5.5 … That’s it..', url: 'https://x.com/ajith_io/status/2103449416325890146' },
  { file: 'tweet-4.png', handle: '@MengTo', quote: 'Opus 5.5 sculpted every part of this ship in code … But it still needs steering.', url: 'https://x.com/MengTo/status/2103122947133309311' },
];

function useShowcase() {
  const [p, setP] = useState<Project | null>(null);
  useEffect(() => {
    api
      .projects()
      .then((list) => {
        const best = [...list].sort((a, b) => corrections(b).length - corrections(a).length || b.rounds.length - a.rounds.length)[0];
        if (best?.rounds.length) return api.project(best.id).then(setP);
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
    return {
      id: showcase.id,
      title: showcase.title,
      criteria: showcase.plan?.criteria.length ?? 0,
      tests: showcase.plan?.tests.length ?? 0,
      first,
      last,
      fixes: fixes.length,
      fixed: fixes.filter((f) => f.fixedIn).length,
      versions: showcase.versions.length,
      planCredits: showcase.credits.plan,
      verifyCredits,
      conditions,
      calls: rounds.reduce((n, r) => n + r.calls, 0),
      perCheck: conditions ? verifyCredits / conditions : 0,
      examples: fixes.filter((f) => f.fixedIn).slice(0, 4),
      caught: (() => {
        const r = rounds.find((x) => x.results.some((y) => y.verdict !== 'pass')) ?? rounds[0];
        const failed = r.results.filter((x) => x.verdict !== 'pass');
        const cut = failed[0]?.cut;
        return {
          cut,
          eye: cut && r.eye[cut] ? fileUrl(showcase.id, r.eye[cut]!) : null,
          report: cut ? (r.reports?.[cut] ?? '').split('\n').filter((l) => l.trim() && !/: none$/.test(l)) : [],
          items: failed.map((x) => ({ ac: x.ac, cut: x.cut, text: showcase.plan?.criteria.find((c) => c.id === x.ac)?.text ?? x.ac })),
        };
      })(),
    };
  }, [showcase]);

  const slides: { id: string; node: ReactNode }[] = [
    {
      id: 'open',
      node: (
        <div className="s-center">
          <p className="eyebrow">dailies · Kane CLI hackathon</p>
          <h1 className="s-huge">
            Video is <em>code</em> now.
          </h1>
          <p className="s-sub">And nobody is reviewing it.</p>
        </div>
      ),
    },
    {
      id: 'tweets',
      node: (
        <div className="s-split">
          <div>
            <p className="eyebrow">September 2026</p>
            <h2 className="s-h">
              Opus 5.5 learned <em>motion design.</em>
            </h2>
            <p className="s-p">One prompt. A 15-second showreel, a product promo, a 3D ship sculpted in code. The posts went viral because the output is genuinely good.</p>
            <blockquote className="s-quote">
              “Claude Opus 5.5 feels like the first model to have truly solved video animation.”
              <cite>— Steven Tey, founder of Dub</cite>
            </blockquote>
          </div>
          <div className="tweet-fan">
            {TWEETS.map((t, i) => (
              <a key={t.file} href={t.url} target="_blank" rel="noreferrer" className={`tweet t${i}`} title={t.quote}>
                <img src={`/pitch/tweets/${t.file}`} alt={`${t.handle}: ${t.quote}`} />
              </a>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'shift',
      node: (
        <div className="s-center">
          <p className="eyebrow">The paradigm shift</p>
          <h2 className="s-h big">
            A launch video used to be a week in a timeline.
            <br />
            <em>Now it’s a React file.</em>
          </h2>
          <div className="flow-row">
            <span className="pillx">storyboard</span>
            <i>→</i>
            <span className="pillx claude">Claude Code</span>
            <i>→</i>
            <span className="pillx mono">src/Video.tsx</span>
            <i>→</i>
            <span className="pillx">every cut, every platform</span>
          </div>
          <p className="s-sub">And we’re only getting started.</p>
        </div>
      ),
    },
    {
      id: 'gap',
      node: (
        <div className="s-center">
          <h2 className="s-h big">
            AI-written code got <em>tests.</em>
            <br />
            AI-written video got <span className="strike">vibes</span>.
          </h2>
          <div className="vs">
            <div>
              <b>Code an agent writes</b>
              <span>type-checked · unit-tested · reviewed · Kane verifies the UI</span>
            </div>
            <div className="bad">
              <b>Video an agent writes</b>
              <span>someone scrubs the timeline and says “looks good”</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'breaks',
      node: stats?.caught.items.length ? (
        <div className="s-split">
          <div>
            <p className="eyebrow">What Kane caught</p>
            <h2 className="s-h">
              It looked finished.
              <br />
              <em>It wasn’t.</em>
            </h2>
            <ul className="breaks">
              {stats.caught.items.map((x) => (
                <li key={x.ac + x.cut}>
                  <b>{x.text}</b> <span className="muted">({x.cut.replace('x', ':')} cut)</span>
                </li>
              ))}
            </ul>
            {stats.caught.report.length ? (
              <pre className="caught-report">{stats.caught.report.join('\n')}</pre>
            ) : null}
          </div>
          {stats.caught.eye ? (
            <figure className="caught-eye">
              <img src={stats.caught.eye} alt="The contact sheet Kane CLI judged for the failing cut" />
              <figcaption>The exact page Kane CLI judged — every storyboard timecode of the {stats.caught.cut?.replace('x', ':')} cut, measured in Chrome.</figcaption>
            </figure>
          ) : null}
        </div>
      ) : (
        <div className="s-split narrow">
          <div>
            <p className="eyebrow">What a one-shot gets wrong</p>
            <h2 className="s-h">
              It looks finished.
              <br />
              <em>It isn’t.</em>
            </h2>
            <p className="s-p">Motion code is unforgiving in exactly the ways a glance misses. And every spot ships in three aspect ratios.</p>
          </div>
          <ul className="breaks">
            <li>
              <b>The call to action sits under the Reels buttons</b> on the 9:16 cut.
            </li>
            <li>
              <b>The wordmark lands late</b> — the storyboard said fully visible by 0:05.
            </li>
            <li>
              <b>Exact copy, one letter off.</b>
            </li>
            <li>
              <b>The caption runs off the square frame</b> because it was laid out for 16:9.
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 'designer',
      node: (
        <div className="s-center">
          <p className="eyebrow">The polarizing part</p>
          <h2 className="s-h big">
            Everyone used Kane to test <em>their code.</em>
          </h2>
          <h2 className="s-h big dim">I’m a designer. I used it to test what the code makes.</h2>
        </div>
      ),
    },
    {
      id: 'reveal',
      node: (
        <div className="s-center reveal">
          <p className="s-sub">That’s why I built</p>
          <div className="reveal-logo">
            <Logo size={84} />
            {Array.from({ length: 14 }, (_, i) => (
              <i key={i} className="spark" style={{ ['--a' as string]: `${(i / 14) * 360}deg`, ['--d' as string]: `${(i % 4) * 0.12}s` }} />
            ))}
          </div>
          <p className="s-p center">Test-driven video. Claude Code composes. Kane CLI proves every frame against the storyboard — and won’t let Claude stop until it holds.</p>
        </div>
      ),
    },
    {
      id: 'how',
      node: (
        <div className="s-wide">
          <p className="eyebrow">How it works</p>
          <div className="how">
            <div className="hstep">
              <span className="hn">1</span>
              <b>Storyboard</b>
              <p>Shots, timecodes, exact copy, cuts and safe zones in plain markdown.</p>
            </div>
            <div className="hpar">
              <div className="hstep claude">
                <span className="hn">2a</span>
                <b>Claude Code drafts</b>
                <p>Headless, in a sandboxed workspace. Writes src/Video.tsx in Remotion.</p>
              </div>
              <div className="hstep kane">
                <span className="hn">2b</span>
                <b>Kane designs the tests</b>
                <p>context ingest → review → design tests: acceptance criteria and _test.md, cited to the storyboard.</p>
              </div>
            </div>
            <div className="hstep kane">
              <span className="hn">3</span>
              <b>Kane judges every frame</b>
              <p>One contact sheet per cut in real Chrome. All criteria in one analyzer call per cut.</p>
            </div>
            <div className="hstep hook">
              <span className="hn">4</span>
              <b>Stop hook</b>
              <p>Claude tries to finish → Kane re-judges → failures go back as the block reason.</p>
            </div>
            <div className="hstep seal">
              <span className="hn">5</span>
              <b>Sealed proof</b>
              <p>Kane runs its own designed tests, writes evidence packs, reports coverage.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'kane',
      node: (
        <div className="s-wide">
          <p className="eyebrow">Kane CLI is the reviewer, not a bolt-on</p>
          <div className="kgrid">
            {[
              ['context ingest', 'storyboard.md and the inspection-surface contract become cited use-cases'],
              ['context review', 'use-cases promoted to trusted, headless'],
              ['design tests', 'acceptance criteria with oracles, scenarios, one _test.md per scenario'],
              ['run --analyzer-only --cdp-endpoint', 'every criterion judged on the contact sheet dailies opened'],
              ['--agent NDJSON', 'every step streams live into the studio'],
              ['Claude Code Stop hook', 'Kane’s verdict is the block reason Claude reads'],
              ['testmd run', 'Kane’s own tests replayed against the final cut → evidence packs'],
              ['cover --json', 'proven vs owed, per acceptance criterion'],
              ['maintain reconcile', 'storyboard changes reconcile the suite, not rewrite it'],
            ].map(([c, d]) => (
              <div key={c} className="kcmd">
                <code>kane-cli {c}</code>
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
        <div className="s-center">
          <p className="eyebrow">Accuracy without burning credits</p>
          <h2 className="s-h">
            One screenshot per cut. <em>Every criterion in one call.</em>
          </h2>
          <div className="budget">
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
              <b>{stats ? (stats.planCredits + stats.verifyCredits).toFixed(0) : '—'}</b>
              <span>credits, design + review</span>
            </div>
          </div>
          <p className="s-p center">
            Exact text and positions come from a facts table measured in the browser, so Kane reads strings, not pixels. After a fix only the failed checks are re-judged; a full regression sweep runs once they pass.
          </p>
        </div>
      ),
    },
    {
      id: 'result',
      node: (
        <div className="s-center">
          <p className="eyebrow">{stats ? stats.title : 'A real run'}</p>
          {stats ? (
            <>
              <div className="bigscore">
                <div className="bad">
                  <b>
                    {stats.first.pass}
                    <small>/{stats.first.total}</small>
                  </b>
                  <span>before Kane</span>
                </div>
                <i>→</i>
                <div className="ok">
                  <b>
                    {stats.last.pass}
                    <small>/{stats.last.total}</small>
                  </b>
                  <span>after the Kane loop</span>
                </div>
              </div>
              <ul className="examples">
                {stats.examples.map((e) => (
                  <li key={`${e.ac}${e.cut}`}>
                    <b>{e.c?.text}</b> <span>({e.cut.replace('x', ':')})</span>
                  </li>
                ))}
              </ul>
              <Link to={`/p/${stats.id}/compare`} className="btn kane big">
                See draft vs final
              </Link>
            </>
          ) : (
            <p className="s-p center">Run a spot through Kane review and its numbers appear here.</p>
          )}
        </div>
      ),
    },
    {
      id: 'close',
      node: (
        <div className="s-center">
          <h1 className="s-huge">
            Every frame, <em>proven.</em>
          </h1>
          <p className="s-sub">“If an agent can write the video, an agent should have to prove it.”</p>
          <div className="close-cta">
            <Link to="/" className="btn primary big">
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
    <div className="pitch" onClick={(e) => !(e.target as HTMLElement).closest('a,button') && setI((x) => Math.min(slides.length - 1, x + 1))}>
      <div className="pitch-top">
        <Logo />
        <span>
          {i + 1} / {slides.length}
        </span>
      </div>
      {slides.map((s, n) => (
        <section key={s.id} className={`slide ${n === i ? 'on' : n < i ? 'past' : ''}`} aria-hidden={n !== i}>
          {s.node}
        </section>
      ))}
      <div className="pitch-dots">
        {slides.map((s, n) => (
          <button key={s.id} type="button" className={n === i ? 'on' : ''} onClick={() => setI(n)} aria-label={`Slide ${n + 1}`} />
        ))}
      </div>
    </div>
  );
}
