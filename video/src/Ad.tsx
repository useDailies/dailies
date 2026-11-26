import React from 'react';
import { AbsoluteFill, Audio, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FPS, SCENES, TOTAL, at, scene, voEnd, wi, type Scene } from './timeline';
import { GUIDE_VIEWS } from './Guide';
import { Appear, Bg, C, Check, Chip, Cross, F, Face, Img, Mark, Screen, Step, Words, Wordmark, ease, gradText, useSpring } from './ui';

/* Real lines from Claude Code's composition for the showcase run (src/Video.tsx, v2). */
const CODE = [
  ['k', 'const '],
  ['p', 'settle = '],
  ['f', 'spring'],
  ['p', '({ frame: f, fps, config: { damping: 200 } });'],
  ['n', ''],
  ['k', 'const '],
  ['p', 'wm = '],
  ['f', 'interpolate'],
  ['p', '(f, [18, 48], [0, 1], { ...clamp });'],
  ['n', ''],
  ['t', '<div '],
  ['a', 'data-layer'],
  ['p', '="wordmark" style={{'],
  ['n', ''],
  ['p', '  fontSize: W.wmSize, letterSpacing: `${spacing}em`,'],
  ['n', ''],
  ['p', '  opacity: wm, filter: `blur(${(1 - wm) * 14}px)`,'],
  ['n', ''],
  ['p', '}}>'],
  ['s', 'KESTREL'],
  ['t', '</div>'],
] as const;

/* ======================================================= pitch (dark) */

function Hook({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const words = ['This', 'autumn,', 'AI', 'learned', 'to', 'make', { t: 'video.', style: gradText }];
  const vid = wi(sc, 6);
  const stills = ['stills/v2-16x9-hero.png', 'stills/v2-9x16-cta.png', 'stills/v2-16x9-detail.png', 'stills/v2-1x1-cta.png', 'stills/v2-16x9-cta.png', 'stills/v2-9x16-hero.png'];
  return (
    <Bg dark>
      {stills.map((s, i) => {
        const tall = s.includes('9x16');
        const sq = s.includes('1x1');
        const w = tall ? 230 : sq ? 300 : 420;
        const xs = [140, 1440, 260, 1500, 1180, 720];
        const ys = [120, 90, 700, 660, 760, 820];
        const drift = (f / FPS) * (12 + i * 3);
        const o = ease(f, [8 + i * 4, 30 + i * 4], [0, 1]) * (f > vid ? 0.55 : 0.2);
        return (
          <div key={s} style={{ position: 'absolute', left: xs[i], top: ys[i] - drift, width: w, borderRadius: 14, overflow: 'hidden', opacity: o, transform: `rotate(${(i % 2 ? 1 : -1) * (3 + i)}deg)`, boxShadow: '0 30px 80px -30px rgba(0,0,0,.8)' }}>
            <Img src={s} style={{ width: '100%' }} />
          </div>
        );
      })}
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center' }}>
        <Words words={words} ats={sc.vo.words.map((_, i) => wi(sc, i))} style={{ font: `700 128px/1.04 ${F.display}`, letterSpacing: '-0.045em', color: '#fff', maxWidth: 1500, justifyContent: 'center' }} />
      </AbsoluteFill>
    </Bg>
  );
}

function CodeScene({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tPrompt = at(sc, 'prompt');
  const tVideo = at(sc, 'video', 0);
  const tweets = ['tweets/tweet-1.png', 'tweets/tweet-2.png', 'tweets/tweet-3.png', 'tweets/tweet-4.png'];
  const away = ease(f, [tPrompt - 6, tPrompt + 14], [0, 1]);
  // characters of code typed
  const flat = CODE.map((c) => c[1]).join('');
  const typed = Math.floor(ease(f, [tPrompt + 6, tVideo - 4], [0, flat.length], (x) => x));
  let left = typed;
  return (
    <Bg dark>
      {/* tweets fan */}
      <AbsoluteFill style={{ opacity: 1 - away, transform: `translateY(${-away * 80}px)` }}>
        <div style={{ position: 'absolute', left: 110, top: 80 }}>
          <Appear at={2}>
            <span style={{ font: `500 24px ${F.mono}`, color: 'rgba(255,255,255,.6)' }}>September 2026 · Claude Opus 5.5</span>
          </Appear>
        </div>
        {tweets.map((t, i) => {
          const s = useSpring(4 + i * 7, { damping: 15, stiffness: 90 });
          const rot = [-9, -3, 3, 9][i];
          const x = [260, 690, 1120, 1550][i];
          return (
            <div key={t} style={{ position: 'absolute', left: x - 210, top: 230 + Math.abs(rot) * 4, width: 420, borderRadius: 22, overflow: 'hidden', boxShadow: '0 40px 90px -30px rgba(0,0,0,.85)', transform: `translateY(${(1 - s) * 700}px) rotate(${rot * s}deg)`, opacity: Math.min(1, s * 2) }}>
              <Img src={t} style={{ width: '100%' }} />
            </div>
          );
        })}
      </AbsoluteFill>
      {/* prompt → code → frame */}
      <AbsoluteFill style={{ opacity: away }}>
        <div style={{ position: 'absolute', left: 120, top: 150, width: 820 }}>
          <Appear at={tPrompt}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, background: '#26242c', color: '#fff', borderRadius: 999, padding: '14px 24px', font: `500 26px ${F.ui}` }}>
              <Face who="claude" size={30} /> “Make a 12-second launch spot for Kestrel.”
            </div>
          </Appear>
          <Appear at={tPrompt + 8} style={{ marginTop: 26 }}>
            <div style={{ background: '#1f1d24', border: '1px solid rgba(255,255,255,.08)', borderRadius: 20, padding: '26px 30px', font: `400 23px/1.6 ${F.mono}`, color: '#d9d6e0', minHeight: 330, whiteSpace: 'pre-wrap' }}>
              {CODE.map(([k, txt], i) => {
                if (left <= 0) return null;
                const shown = txt.slice(0, left);
                left -= txt.length;
                if (k === 'n') return <br key={i} />;
                const col = { k: '#c4a7ff', f: '#7cc4ff', p: '#d9d6e0', t: '#ff9d7a', a: '#ffd27a', s: '#fff' }[k];
                return (
                  <span key={i} style={{ color: col, fontWeight: k === 's' ? 600 : 400 }}>
                    {shown}
                  </span>
                );
              })}
              <span style={{ display: 'inline-block', width: 12, height: 26, background: C.claude, verticalAlign: -4, opacity: Math.floor(f / 8) % 2 }} />
            </div>
          </Appear>
        </div>
        <div style={{ position: 'absolute', left: 1010, top: 210, width: 800 }}>
          <Appear at={tPrompt + 26} scale={0.94}>
            <div style={{ borderRadius: 18, overflow: 'hidden', boxShadow: '0 40px 100px -30px rgba(0,0,0,.9)' }}>
              <Img src="stills/v2-16x9-hero.png" style={{ width: '100%' }} />
            </div>
          </Appear>
        </div>
        <div style={{ position: 'absolute', left: 0, right: 0, top: 790, textAlign: 'center' }}>
          <Words words={['Video', 'became', { t: 'code.', style: gradText }]} ats={[tVideo, at(sc, 'became'), at(sc, 'code', 0)]} style={{ justifyContent: 'center', font: `700 112px ${F.display}`, letterSpacing: '-0.045em', color: '#fff' }} />
        </div>
      </AbsoluteFill>
    </Bg>
  );
}

function Vibes({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tTests = at(sc, 'tests');
  const tVid = at(sc, 'a.i', 1);
  const tVibes = at(sc, 'vibes');
  const tScrub = at(sc, 'scrubs');
  const tGood = at(sc, 'looks');
  const tShip = at(sc, 'ships');
  const head = (t: string, a: number) => (
    <Appear at={a}>
      <div style={{ font: `700 64px ${F.display}`, letterSpacing: '-0.04em', color: '#fff', marginBottom: 36 }}>{t}</div>
    </Appear>
  );
  const rows = ['typecheck', 'unit tests · 214 passed', 'e2e · kane-cli run'];
  const play = ease(f, [tScrub, tGood], [0.08, 0.86]);
  return (
    <Bg dark>
      <div style={{ position: 'absolute', left: 150, top: 200, width: 740 }}>
        {head('AI code got tests.', wi(sc, 1))}
        {rows.map((r, i) => (
          <Appear key={r} at={tTests + i * 5} y={14}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '22px 26px', borderRadius: 18, background: '#211f27', border: '1px solid rgba(255,255,255,.07)', marginBottom: 16, font: `500 30px ${F.mono}`, color: '#e8e6ee' }}>
              <Face who="pass" size={38} /> {r}
            </div>
          </Appear>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 1030, top: 200, width: 740 }}>
        {head('AI video got vibes.', tVid)}
        <Appear at={tVibes - 4}>
          <div style={{ borderRadius: 18, overflow: 'hidden', position: 'relative', background: '#000' }}>
            <Img src="stills/v1-9x16-f7.png" style={{ width: '100%', height: 300, objectFit: 'cover', objectPosition: 'center 70%', opacity: 0.9 }} />
          </div>
          <div style={{ height: 14, borderRadius: 7, background: '#2b2931', marginTop: 22, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${play * 100}%`, borderRadius: 7, background: 'rgba(255,255,255,.25)' }} />
            <div style={{ position: 'absolute', left: `${play * 100}%`, top: -10, width: 6, height: 34, marginLeft: -3, borderRadius: 3, background: '#fff' }} />
          </div>
        </Appear>
        <div style={{ position: 'relative', height: 140 }}>
          <Chip at={tGood} tone="dark" style={{ left: 0, top: 40 }} size={30}>
            “looks good 👍”
          </Chip>
          <Chip at={tShip} tone="light" style={{ left: 380, top: 40 }} size={30}>
            Ship it →
          </Chip>
        </div>
      </div>
    </Bg>
  );
}

function Defects({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const t1 = at(sc, 'wordmark');
  const t2 = at(sc, 'price');
  const t3 = at(sc, 'caption');
  const card = (a: number, label: string, body: React.ReactNode, x: number) => (
    <div style={{ position: 'absolute', left: x, top: 150, width: 520 }}>
      <Appear at={a - 4} scale={0.95}>
        <div style={{ height: 680, borderRadius: 26, background: '#1f1d24', border: '1px solid rgba(255,255,255,.08)', overflow: 'hidden', position: 'relative', display: 'grid', placeItems: 'center' }}>{body}</div>
        <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 14, font: `600 30px ${F.ui}`, color: '#fff' }}>
          <Face who="fail" size={34} /> {label}
        </div>
      </Appear>
    </div>
  );
  const late = ease(f, [t2 + 6, t2 + 34], [0, 1]);
  const off = ease(f, [t3 + 4, t3 + 30], [0, 1]);
  return (
    <Bg dark>
      {card(
        t1,
        'Wordmark under the Reels buttons',
        <div style={{ position: 'relative', width: 340, height: 604, borderRadius: 20, overflow: 'hidden' }}>
          <Img src="stills/v1-9x16-f7.png" style={{ width: '100%', height: '100%' }} />
          {/* platform UI */}
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '35%', background: 'repeating-linear-gradient(135deg, rgba(217,45,32,.28) 0 10px, rgba(217,45,32,.12) 10px 20px)', borderTop: `2px dashed ${C.fail}`, opacity: ease(f, [t1 + 10, t1 + 22], [0, 1]) }} />
          <div style={{ position: 'absolute', right: 14, bottom: 120, display: 'flex', flexDirection: 'column', gap: 22, alignItems: 'center' }}>
            {['♥', '💬', '↗'].map((i) => (
              <span key={i} style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,.9)', display: 'grid', placeItems: 'center', fontSize: 22, color: C.ink }}>
                {i}
              </span>
            ))}
          </div>
          <div style={{ position: 'absolute', left: 16, bottom: 26, right: 80, font: `600 19px ${F.ui}`, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.6)' }}>@kestrel · Run the city ♫</div>
          <div style={{ position: 'absolute', left: '14%', right: '14%', top: '64%', height: '8%', border: `3px solid ${C.fail}`, borderRadius: 8, opacity: ease(f, [t1 + 16, t1 + 26], [0, 1]) }} />
        </div>,
        150,
      )}
      {card(
        t2,
        'Price lands a second late',
        <div style={{ width: 440 }}>
          <div style={{ position: 'relative', height: 130 }}>
            <div style={{ position: 'absolute', left: '33%', top: 0, bottom: 34, borderLeft: `3px dashed ${C.pass}` }} />
            <span style={{ position: 'absolute', left: '33%', top: 0, transform: 'translateX(-50%)', font: `500 20px ${F.mono}`, color: C.pass, background: '#1f1d24', padding: '0 6px' }}>needed 0:04</span>
            <div style={{ position: 'absolute', left: `${33 + late * 9}%`, top: 46, transform: 'translateX(-50%)', background: '#fff', color: C.ink, font: `700 30px ${F.ui}`, padding: '8px 16px', borderRadius: 10, boxShadow: '0 12px 30px -10px rgba(0,0,0,.6)' }}>€149</div>
          </div>
          <div style={{ height: 10, borderRadius: 5, background: '#2b2931', position: 'relative' }}>
            {[0, 3, 7].map((s) => (
              <i key={s} style={{ position: 'absolute', left: `${(s / 12) * 100}%`, top: -6, width: 2, height: 22, background: 'rgba(255,255,255,.3)' }} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', font: `500 18px ${F.mono}`, color: 'rgba(255,255,255,.5)', marginTop: 12 }}>
            <span>0:00</span>
            <span>0:06</span>
            <span>0:12</span>
          </div>
          <div style={{ marginTop: 28, font: `600 26px ${F.mono}`, color: C.fail, opacity: late }}>+1.0 s</div>
        </div>,
        700,
      )}
      {card(
        t3,
        'Caption runs off the square cut',
        <div style={{ width: 440, height: 440, borderRadius: 16, background: 'linear-gradient(160deg,#0b1220,#122035 60%,#0f766e)', position: 'relative', overflow: 'hidden', boxShadow: `inset -4px 0 0 ${off > 0.5 ? C.fail : 'transparent'}` }}>
          <div style={{ position: 'absolute', top: 180, left: 40 + off * 120, font: `800 64px ${F.display}`, color: '#fff', whiteSpace: 'nowrap', letterSpacing: '-0.03em' }}>Run the city</div>
        </div>,
        1250,
      )}
    </Bg>
  );
}

function KaneScene({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tLeave = at(sc, 'leave');
  const tAgents = at(sc, 'when');
  const tCheck = at(sc, 'check');
  const steps = ['Open /login', 'Type the email and password', 'Submit the form', 'Billing page is visible'];
  const pull = ease(f, [tLeave - 4, tLeave + 26], [0, 1]);
  const scan = ease(f, [tCheck, tCheck + 40], [0, 1]);
  const things = [
    { src: 'stills/v2-9x16-cta.png', w: 190, x: 250, y: 250, label: 'video' },
    { src: 'stills/v2-16x9-detail.png', w: 360, x: 1350, y: 260, label: 'launch film' },
    { src: null, w: 330, x: 210, y: 690, label: 'design', kind: 'design' },
    { src: 'stills/v2-1x1-cta.png', w: 250, x: 1460, y: 650, label: 'social cut' },
    { src: null, w: 300, x: 820, y: 800, label: 'deck', kind: 'deck' },
  ];
  return (
    <Bg dark>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center' }}>
        <Appear at={wi(sc, 0)} out={tLeave - 6}>
          <div style={{ font: `700 76px ${F.display}`, letterSpacing: '-0.04em', color: '#fff' }}>
            Everyone tests their <span style={gradText}>code</span> with Kane CLI.
          </div>
        </Appear>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 80, textAlign: 'center' }}>
        <Appear at={tAgents}>
          <div style={{ font: `700 76px ${F.display}`, letterSpacing: '-0.04em', color: '#fff' }}>
            Who checks what the <span style={gradText}>code makes?</span>
          </div>
        </Appear>
      </div>
      {/* the terminal */}
      <div style={{ position: 'absolute', left: 960, top: 560, width: 900, transform: `translate(-50%,-50%) scale(${1 - pull * 0.42})`, transformOrigin: 'center' }}>
        <Appear at={wi(sc, 1)} scale={0.96}>
          <div style={{ background: '#121115', border: '1px solid rgba(255,255,255,.1)', borderRadius: 22, padding: '28px 34px', font: `400 26px/1.7 ${F.mono}`, color: '#e8e6ee', boxShadow: '0 40px 100px -40px rgba(0,0,0,.9)' }}>
            <div style={{ color: 'rgba(255,255,255,.55)' }}>
              $ <span style={{ color: '#fff' }}>kane-cli run</span> <span style={{ color: '#ffd27a' }}>"sign in and open billing"</span> --agent
            </div>
            {steps.map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: ease(f, [wi(sc, 3) + i * 7, wi(sc, 3) + i * 7 + 6], [0, 1]) }}>
                <Check size={26} /> {s}
              </div>
            ))}
            <div style={{ marginTop: 6, color: C.pass, fontWeight: 500, opacity: ease(f, [wi(sc, 3) + 32, wi(sc, 3) + 38], [0, 1]) }}>PASSED · 4/4 steps</div>
          </div>
        </Appear>
      </div>
      {/* what agents make */}
      {things.map((t, i) => {
        const p = ease(f, [tLeave + 8 + i * 5, tLeave + 26 + i * 5], [0, 1]);
        const lit = scan > (i + 1) / (things.length + 1);
        return (
          <div key={t.label} style={{ position: 'absolute', left: t.x, top: t.y, width: t.w, opacity: p, transform: `translateY(${(1 - p) * 40}px) scale(${0.9 + 0.1 * p})` }}>
            <div style={{ borderRadius: 16, overflow: 'hidden', boxShadow: lit ? `0 0 0 4px ${C.kane}, 0 30px 80px -30px rgba(59,130,246,.7)` : '0 30px 80px -30px rgba(0,0,0,.9)', transition: 'none', background: '#fff' }}>
              {t.src ? (
                <Img src={t.src} style={{ width: '100%' }} />
              ) : t.kind === 'design' ? (
                <div style={{ height: 210, padding: 22, background: '#fff' }}>
                  <div style={{ height: 22, width: '50%', borderRadius: 6, background: C.ink }} />
                  <div style={{ height: 12, width: '80%', borderRadius: 6, background: C.line, marginTop: 16 }} />
                  <div style={{ height: 12, width: '70%', borderRadius: 6, background: C.line, marginTop: 10 }} />
                  <div style={{ height: 46, width: 150, borderRadius: 12, background: C.accent, marginTop: 30 }} />
                </div>
              ) : (
                <div style={{ height: 170, padding: 22, background: C.paper }}>
                  <div style={{ font: `700 30px ${F.display}`, color: C.ink }}>Q4 launch</div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 22, alignItems: 'flex-end', height: 70 }}>
                    {[40, 65, 50, 90].map((h, j) => (
                      <i key={j} style={{ width: 36, height: h * 0.7, background: j === 3 ? C.kane : C.line, borderRadius: 6, display: 'block' }} />
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 12, display: 'flex', alignItems: 'center', gap: 10, font: `500 22px ${F.mono}`, color: lit ? '#9cc0ff' : 'rgba(255,255,255,.6)' }}>
              {lit ? <Face who="kane" size={24} /> : null} {t.label}
            </div>
          </div>
        );
      })}
    </Bg>
  );
}

function Frontier({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const g = ease(f, [wi(sc, 2), wi(sc, 2) + 20], [0, 1]);
  return (
    <Bg dark>
      <AbsoluteFill style={{ background: `radial-gradient(50% 50% at 50% 55%, rgba(59,130,246,${0.28 * g}), transparent 70%)` }} />
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <Words words={['That', 'is', 'Kane’s', 'next', { t: 'frontier.', style: { color: '#8fb6ff' } }]} ats={sc.vo.words.map((_, i) => wi(sc, i))} style={{ justifyContent: 'center', font: `700 140px ${F.display}`, letterSpacing: '-0.05em', color: '#fff' }} />
        </div>
      </AbsoluteFill>
    </Bg>
  );
}

function Intro({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const draw = ease(f, [14, 40], [0, 1]);
  const corners = ease(f, [0, 22], [0, 1]);
  const pop = useSpring(0, { damping: 13, stiffness: 120 });
  const wipe = ease(f, [44, 70], [0, 1]);
  const slide = ease(f, [52, 76], [0, 1]);
  const d1 = ease(f, [70, 84], [0, 1]);
  const d2 = ease(f, [76, 90], [0, 1]);
  const tTag = at(sc, 'test');
  return (
    <AbsoluteFill>
      <Bg dark />
      <AbsoluteFill style={{ clipPath: `circle(${wipe * 130}% at 50% 46%)` }}>
        <Bg />
      </AbsoluteFill>
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 56 * slide, transform: `translateY(-40px)` }}>
          <div style={{ transform: `scale(${pop})` }}>
            <Mark size={200} variant={wipe > 0.5 ? 'ink' : 'light'} draw={draw} corners={corners} />
          </div>
          <div style={{ width: 590 * slide, overflow: 'hidden', opacity: slide }}>
            <Wordmark height={150} dots={[d1, d2]} />
          </div>
        </div>
      </AbsoluteFill>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 720, textAlign: 'center' }}>
        <Words words={['Test-driven', 'video.']} ats={[tTag, at(sc, 'video')]} style={{ justifyContent: 'center', font: `600 64px ${F.display}`, letterSpacing: '-0.035em', color: C.ink }} />
        <Appear at={at(sc, 'video') + 10} y={10}>
          <div style={{ marginTop: 26, display: 'inline-flex', gap: 30, font: `500 26px ${F.mono}`, color: C.ink2 }}>
            <span style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
              <Face who="claude" size={30} /> Claude Code writes it
            </span>
            <span style={{ display: 'inline-flex', gap: 12, alignItems: 'center' }}>
              <Face who="kane" size={30} /> Kane CLI proves it
            </span>
          </div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
}

/* ================================================== walkthrough (light) */

function StoryboardScene({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tClick = at(sc, 'one');
  const home = f >= tClick - 8;
  return (
    <Bg>
      <Step n="01" title="Write the storyboard" />
      {!home ? (
        <Screen src="rec/newspot.mp4" from={1.2} rate={1} cam={[{ at: 0, x: 960, y: 560, s: 1.05 }, { at: 70, x: 620, y: 600, s: 1.32 }, { at: 200, x: 620, y: 620, s: 1.32 }]} width={1500} y={600} title="dailies · new spot" />
      ) : (
        <Sequence from={tClick - 8} layout="none">
          <Screen src="rec/home.mp4" from={1.0} rate={1} cam={[{ at: 0, x: 600, y: 560, s: 1.25 }, { at: 40, x: 520, y: 600, s: 1.45 }]} width={1500} y={600} title="dailies">
            <ClickRipple at={30} x={363} y={673} cam={{ x: 520, y: 600, s: 1.45 }} width={1500} />
          </Screen>
        </Sequence>
      )}
      <Chip at={at(sc, 'shots')} out={tClick - 8} mono style={{ right: 120, top: 260 }}>
        ## Shot 2 (0:03–0:07) Detail
      </Chip>
      <Chip at={at(sc, 'timecodes')} out={tClick - 8} mono style={{ right: 160, top: 360 }}>
        visible at 0:04 and at 0:06
      </Chip>
      <Chip at={at(sc, 'exact')} out={tClick - 8} mono style={{ right: 100, top: 460 }}>
        reads exactly: €149
      </Chip>
      <Chip at={at(sc, 'platform')} out={tClick - 8} mono tone="kane" style={{ right: 140, top: 560 }}>
        9:16 · nothing in the bottom 35%
      </Chip>
    </Bg>
  );
}

function ClickRipple({ at: a, x, y, cam, width }: { at: number; x: number; y: number; cam: { x: number; y: number; s: number }; width: number }) {
  const f = useCurrentFrame();
  const k = (width / 1920) * cam.s;
  const H = (width * 9) / 16;
  const px = width / 2 + (x - cam.x) * k;
  const py = H / 2 + (y - cam.y) * k;
  const p = ease(f, [a, a + 16], [0, 1]);
  if (f < a) return null;
  return <div style={{ position: 'absolute', left: px - 40, top: py - 40, width: 80, height: 80, borderRadius: '50%', border: `4px solid ${C.accent}`, opacity: 1 - p, transform: `scale(${0.4 + p * 1.2})` }} />;
}

function Compose({ sc }: { sc: Scene }) {
  const tClaude = at(sc, 'claude');
  const tKane = at(sc, 'while');
  const t24 = at(sc, 'twenty');
  return (
    <Bg>
      <Step n="02" title="Claude composes · Kane designs the tests" />
      <Screen
        src="rec/replay.mp4"
        from={3.0}
        rate={1.65}
        width={1560}
        y={600}
        title="dailies · Kestrel Runner — launch spot"
        cam={[
          { at: 0, x: 960, y: 520, s: 1.0 },
          { at: tClaude + 6, x: 470, y: 440, s: 1.6 },
          { at: tKane, x: 520, y: 440, s: 1.6 },
          { at: tKane + 22, x: 1130, y: 440, s: 1.6 },
          { at: t24 + 6, x: 1130, y: 470, s: 1.45 },
        ]}
      />
      <Chip at={tClaude + 8} who="claude" tone="claude" style={{ left: 150, top: 880 }}>
        Claude Code · writing src/Video.tsx in Remotion
      </Chip>
      <Chip at={tKane + 14} who="kane" tone="kane" mono style={{ right: 150, top: 880 }}>
        kane-cli design tests
      </Chip>
      <Chip at={t24 + 4} tone="light" style={{ right: 150, top: 970 }}>
        24 acceptance criteria · each cited to a storyboard line
      </Chip>
    </Bg>
  );
}

function Judge({ sc }: { sc: Scene }) {
  const tEvery = at(sc, 'every');
  const tBrowser = at(sc, 'browser');
  return (
    <Bg>
      <Step n="03" title="Kane judges every frame" />
      <Screen
        src="rec/replay.mp4"
        from={22.4}
        rate={2.0}
        width={1560}
        y={600}
        title="dailies · Kestrel Runner — launch spot"
        cam={[
          { at: 0, x: 960, y: 520, s: 1.05 },
          { at: 40, x: 770, y: 430, s: 1.45 },
          { at: 160, x: 770, y: 470, s: 1.55 },
        ]}
      />
      <Chip at={tEvery} who="kane" tone="kane" mono style={{ left: 150, top: 900 }}>
        kane-cli run --analyzer-only --cdp-endpoint :9342 --condition ×14
      </Chip>
      <Chip at={tBrowser} tone="light" style={{ right: 150, top: 980 }}>
        One analyzer call per contact sheet · real Chrome · cuts in parallel
      </Chip>
    </Bg>
  );
}

function Catch({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tDis = at(sc, 'kane');
  const tVert = at(sc, 'on');
  const tFrames = at(sc, 'frames');
  const tFail = at(sc, 'fail');
  const showStill = f >= tVert - 4 && f < tFrames - 4;
  const showStrip = f >= tFrames - 4;
  const stamp = useSpring(tFail, { damping: 10, stiffness: 180 });
  return (
    <Bg>
      <Step n="04" title="Kane catches what the draft got wrong" />
      {!showStill && !showStrip ? (
        <Screen src="rec/replay.mp4" from={37.0} rate={1.0} width={1560} y={600} title="dailies · Kestrel Runner — launch spot" cam={[{ at: 0, x: 900, y: 480, s: 1.1 }, { at: tDis, x: 1300, y: 420, s: 1.35 }, { at: tDis + 30, x: 1560, y: 360, s: 1.7 }]} />
      ) : null}
      {showStill ? (
        <Sequence from={tVert - 4} layout="none">
          <VerticalBand sc={sc} offset={tVert - 4} />
        </Sequence>
      ) : null}
      {showStrip ? (
        <Sequence from={tFrames - 4} layout="none">
          <Screen src="rec/replay.mp4" from={41.0} rate={0.25} width={1560} y={600} title="dailies · Kestrel Runner — launch spot" cam={[{ at: 0, x: 860, y: 560, s: 1.6 }, { at: 40, x: 860, y: 590, s: 2.25 }]} />
        </Sequence>
      ) : null}
      {showStrip && f >= tFail ? (
        <div style={{ position: 'absolute', left: 960, top: 400, transform: `translate(-50%,-50%) rotate(-6deg) scale(${0.6 + 0.4 * stamp})`, opacity: Math.min(1, stamp * 1.5), border: `8px solid ${C.fail}`, color: C.fail, borderRadius: 18, padding: '6px 34px', font: `800 120px ${F.display}`, letterSpacing: '0.02em', background: 'rgba(255,255,255,.86)' }}>
          FAIL
        </div>
      ) : null}
    </Bg>
  );
}

function VerticalBand({ sc, offset }: { sc: Scene; offset: number }) {
  const f = useCurrentFrame();
  const tBand = at(sc, 'bottom') - offset;
  const tTik = at(sc, 'tiktok') - offset;
  return (
    <AbsoluteFill>
      <div style={{ position: 'absolute', left: 300, top: 150, width: 430, height: 764, borderRadius: 34, overflow: 'hidden', boxShadow: '0 50px 120px -40px rgba(23,22,26,.6), 0 0 0 10px #17161A' }}>
        <Img src="stills/v1-9x16-f7.png" style={{ width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: '35%', background: 'repeating-linear-gradient(135deg, rgba(217,45,32,.32) 0 12px, rgba(217,45,32,.14) 12px 24px)', borderTop: `3px dashed ${C.fail}`, opacity: ease(f, [tBand, tBand + 10], [0, 1]) }} />
        <div style={{ position: 'absolute', right: 16, bottom: 150, display: 'flex', flexDirection: 'column', gap: 26, alignItems: 'center', opacity: ease(f, [tTik, tTik + 10], [0, 1]) }}>
          {['♥', '💬', '↗', '♫'].map((i) => (
            <span key={i} style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'grid', placeItems: 'center', fontSize: 26, color: C.ink }}>
              {i}
            </span>
          ))}
        </div>
        <div style={{ position: 'absolute', left: 20, bottom: 34, right: 100, font: `600 22px ${F.ui}`, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,.7)', opacity: ease(f, [tTik, tTik + 10], [0, 1]) }}>@kestrel · Run the city</div>
        <div style={{ position: 'absolute', left: '13%', right: '13%', top: '63.5%', height: '9%', border: `4px solid ${C.fail}`, borderRadius: 10, opacity: ease(f, [tBand + 6, tBand + 14], [0, 1]) }} />
      </div>
      <div style={{ position: 'absolute', left: 840, top: 230, width: 900 }}>
        <Appear at={4}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, font: `600 30px ${F.mono}`, color: C.failText }}>
            <Face who="fail" size={40} /> r1 · v1 · ac-24 @ 9:16
          </div>
          <div style={{ marginTop: 22, font: `700 54px/1.12 ${F.display}`, letterSpacing: '-0.035em', color: C.ink }}>No text or button occupies the bottom 35% of the 9:16 cut’s frame.</div>
        </Appear>
        <Appear at={tBand + 4}>
          <div style={{ marginTop: 40, background: C.white, border: `1px solid ${C.line}`, borderRadius: 18, padding: '22px 26px', font: `500 24px/1.55 ${F.mono}`, color: C.ink2, boxShadow: '0 20px 50px -24px rgba(23,22,26,.3)' }}>
            <div style={{ color: C.ink3, fontSize: 20 }}>TEXT PLACEMENT REPORT · 9:16</div>
            <div>
              Visible text in the bottom 35% band: wordmark <b style={{ color: C.failText }}>“KESTREL”</b> at F6, F7, F8, F9
            </div>
          </div>
        </Appear>
        <Appear at={tTik + 6}>
          <div style={{ marginTop: 24, font: `500 24px ${F.ui}`, color: C.ink3 }}>Storyboard line 20 · Claude Code’s one-shot draft, Opus 5.5</div>
        </Appear>
      </div>
    </AbsoluteFill>
  );
}

function LoopScene({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tStop = at(sc, 'stop', 0);
  const tHook = at(sc, 'hook');
  const tReason = at(sc, 'reason');
  const tMoves = at(sc, 'moves');
  const tAgain = at(sc, 'again');
  const tFailed = at(sc, 'failed');
  const tEvery = at(sc, 'everything');
  // token position around the loop: 0 Claude → 1 Stop hook → 2 Kane → 3 back to Claude
  const nodes = [
    { x: 340, y: 330, who: 'claude' as const, label: 'Claude edits' },
    { x: 570, y: 560, who: null, label: 'tries to stop' },
    { x: 340, y: 790, who: 'kane' as const, label: 'Kane re-judges' },
    { x: 120, y: 560, who: 'fail' as const, label: 'block: reason' },
  ];
  const seg = (a: number, b: number) => ease(f, [a, b], [0, 1]);
  const pos = f < tHook ? seg(tStop, tHook) : f < tReason ? 1 + seg(tHook, tReason - 8) : f < tMoves ? 2 + seg(tReason - 8, tMoves - 4) : f < tAgain ? 3 + seg(tMoves - 4, tAgain) : f < tFailed ? 4 + seg(tAgain, tFailed) : 5 + seg(tFailed, tEvery);
  const p = pos % 4;
  const i0 = Math.floor(p), t = p - i0;
  const A = nodes[i0], B = nodes[(i0 + 1) % 4];
  const tok = { x: A.x + (B.x - A.x) * t, y: A.y + (B.y - A.y) * t };
  return (
    <Bg>
      <Step n="05" title="Claude can’t stop until Kane passes it" />
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width={900} height={1080}>
        <ellipse cx={345} cy={560} rx={225} ry={230} fill="none" stroke={C.line} strokeWidth={4} strokeDasharray="10 12" />
      </svg>
      <div style={{ position: 'absolute', left: tok.x - 14, top: tok.y - 14, width: 28, height: 28, borderRadius: '50%', background: f < tEvery ? C.accent : C.pass, boxShadow: `0 0 0 8px ${f < tEvery ? 'rgba(91,75,219,.18)' : 'rgba(34,197,94,.2)'}`, opacity: f > tStop ? 1 : 0 }} />

      {nodes.map((n, i) => (
        <div key={i} style={{ position: 'absolute', left: n.x, top: n.y, transform: 'translate(-50%,-50%)' }}>
          <Appear at={4 + i * 4} y={10}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 22px', borderRadius: 999, background: C.white, border: `1px solid ${C.line}`, boxShadow: '0 16px 40px -20px rgba(23,22,26,.4)', font: `600 26px ${F.ui}`, color: C.ink, whiteSpace: 'nowrap' }}>
              {n.who ? <Face who={n.who} size={32} /> : <span style={{ width: 32, height: 32, borderRadius: 8, background: C.ink, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 18 }}>⏹</span>}
              {n.label}
            </div>
          </Appear>
        </div>
      ))}
      <Screen src="rec/replay.mp4" from={40.2} rate={0.72} width={1120} x={1330} y={500} title="dailies · Kestrel Runner — launch spot" cam={[{ at: 0, x: 1150, y: 420, s: 1.45 }, { at: tMoves, x: 1150, y: 430, s: 1.45 }, { at: tFailed, x: 1250, y: 380, s: 1.5 }]} />
      <Chip at={tReason - 2} out={tMoves + 30} mono tone="fail" size={22} style={{ left: 820, top: 860 }}>
        {'{"decision":"block","reason":"ac-24 fails on 9:16: KESTREL at F6–F9 …"}'}
      </Chip>
      <Chip at={tMoves + 2} out={tFailed - 2} who="claude" tone="claude" mono size={24} style={{ left: 940, top: 950 }}>
        v2 · +4 −2 · wordmark moved out of the band
      </Chip>
      <Chip at={tFailed} who="kane" tone="kane" mono size={24} style={{ left: 820, top: 870 }}>
        targeted re-check · 1 check · 5.6 cr
      </Chip>
      <Chip at={tEvery} who="pass" tone="pass" mono size={24} style={{ left: 1200, top: 950 }}>
        regression sweep · 62/62
      </Chip>
    </Bg>
  );
}

function Proof({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tHidden = at(sc, 'and', 0);
  const tEvery = at(sc, 'every', 0);
  const tCmd = at(sc, 'every', 1);
  const tCond = at(sc, 'exact');
  const tFrames = at(sc, 'frames');
  return (
    <Bg>
      <Step n="06" title="Every decision, on the record" />
      {f < tHidden - 4 ? (
        <Screen src="rec/replay.mp4" from={59.0} rate={0.5} width={1560} y={600} title="dailies · Kestrel Runner — launch spot" cam={[{ at: 0, x: 1300, y: 300, s: 1.4 }, { at: 30, x: 1600, y: 260, s: 1.9 }]} />
      ) : f < tEvery - 2 ? (
        <Sequence from={tHidden - 4} layout="none">
          <Screen src="rec/details.mp4" from={2.6} rate={1} width={1560} y={600} title="dailies · live trace" cam={[{ at: 0, x: 700, y: 330, s: 1.45 }]} />
        </Sequence>
      ) : (
        <Sequence from={tEvery - 2} layout="none">
          <Screen src="rec/activity.mp4" from={2.2} rate={2.0} width={1560} y={600} title="dailies · activity" cam={[{ at: 0, x: 520, y: 420, s: 1.45 }, { at: 70, x: 420, y: 560, s: 1.6 }, { at: 140, x: 420, y: 640, s: 1.6 }]} />
        </Sequence>
      )}
      {f < tHidden - 4 ? (
        <div style={{ position: 'absolute', right: 160, top: 400 }}>
          <Appear at={2} scale={0.9}>
            <div style={{ font: `700 200px ${F.display}`, letterSpacing: '-0.06em', color: C.passText, background: 'rgba(247,247,245,.9)', borderRadius: 30, padding: '0 30px' }}>62/62</div>
          </Appear>
        </div>
      ) : null}
      <Chip at={tEvery} who="claude" tone="claude" style={{ right: 130, top: 300 }}>
        every Claude session · prompt, edits, cost
      </Chip>
      <Chip at={tCmd} who="kane" tone="kane" mono style={{ right: 130, top: 400 }}>
        every kane-cli command
      </Chip>
      <Chip at={tCond} mono tone="light" style={{ right: 130, top: 500 }}>
        --condition "[ac-24] No text or button…" → false
      </Chip>
      <Chip at={tFrames} tone="light" style={{ right: 130, top: 600 }}>
        the contact sheet Kane actually saw
      </Chip>
    </Bg>
  );
}

function Seal({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tWhen = at(sc, 'when');
  const tProves = at(sc, 'proves');
  return (
    <Bg>
      <Step n="07" title={f < tWhen ? 'Before, and after' : 'Seal: Kane’s own tests'} />
      {f < tWhen - 2 ? (
        <Screen src="rec/compare.mp4" from={0.2} rate={1.25} width={1560} y={600} title="dailies · before vs after" cam={[{ at: 0, x: 960, y: 560, s: 1.1 }]} />
      ) : (
        <Sequence from={tWhen - 2} layout="none">
          <Screen src="rec/sealed.mp4" from={1.4} rate={1.4} width={1560} y={600} title="dailies · sealed run" cam={[{ at: 0, x: 1300, y: 520, s: 1.25 }, { at: 40, x: 1620, y: 640, s: 1.75 }]} />
        </Sequence>
      )}
      <Chip at={tWhen + 10} who="kane" tone="kane" mono style={{ left: 150, top: 880 }}>
        kane-cli testmd run · 7/7 designed tests
      </Chip>
      <Chip at={tProves} who="pass" tone="pass" mono style={{ left: 150, top: 970 }}>
        kane-cli cover → 25/25 criteria proven
      </Chip>
    </Bg>
  );
}

function Numbers({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const t1 = at(sc, 'one');
  const t2 = at(sc, 'five');
  const n1 = ease(f, [t1 - 6, t1 + 14], [0, 1]);
  const n2 = ease(f, [t2 - 10, t2 + 10], [0, 5.6]);
  const stat = (a: number, big: string, label: string, sub: string, tone: string) => (
    <Appear at={a - 8} scale={0.94}>
      <div style={{ width: 640, padding: '46px 50px', borderRadius: 30, background: C.white, border: `1px solid ${C.line}`, boxShadow: '0 30px 70px -36px rgba(23,22,26,.35)' }}>
        <div style={{ font: `700 180px/1 ${F.display}`, letterSpacing: '-0.06em', color: tone }}>{big}</div>
        <div style={{ font: `600 38px ${F.ui}`, color: C.ink, marginTop: 18, letterSpacing: '-0.02em' }}>{label}</div>
        <div style={{ font: `500 24px ${F.mono}`, color: C.ink3, marginTop: 12 }}>{sub}</div>
      </div>
    </Appear>
  );
  return (
    <Bg>
      <AbsoluteFill style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 60 }}>
        {stat(t1, `≈${n1.toFixed(0)}`, 'credit per check', 'full sweep · 62 checks · 6 Kane calls · 40 s', C.kaneText)}
        {stat(t2, n2.toFixed(1), 'credits · targeted re-check', 'only what failed, then one regression sweep', C.passText)}
      </AbsoluteFill>
    </Bg>
  );
}

function Close({ sc }: { sc: Scene }) {
  const tNow = at(sc, 'now');
  return (
    <Bg>
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <Words words={['Kane', 'made', 'code', 'testable.']} ats={[0, 1, 2, 3].map((i) => wi(sc, i))} style={{ justifyContent: 'center', font: `700 104px/1.08 ${F.display}`, letterSpacing: '-0.045em', color: C.ink3 }} />
          <Words words={['Now', 'it', 'proves', { t: 'what', style: gradText }, { t: 'the', style: gradText }, { t: 'code', style: gradText }, { t: 'makes.', style: gradText }]} ats={[4, 5, 6, 7, 8, 9, 10].map((i) => wi(sc, i))} style={{ justifyContent: 'center', font: `700 104px/1.08 ${F.display}`, letterSpacing: '-0.045em', color: C.ink, marginTop: 10 }} />
        </div>
      </AbsoluteFill>
      <div style={{ opacity: 0 }}>{tNow}</div>
    </Bg>
  );
}

function Tag({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const pop = useSpring(0, { damping: 14, stiffness: 110 });
  const d1 = ease(f, [8, 22], [0, 1]);
  const d2 = ease(f, [14, 28], [0, 1]);
  const draw = ease(f, [4, 26], [0, 1]);
  return (
    <Bg>
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center' }}>
        <div style={{ textAlign: 'center', transform: `scale(${0.9 + 0.1 * pop})`, opacity: Math.min(1, pop * 1.6) }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 44 }}>
            <Mark size={170} draw={draw} />
            <Wordmark height={128} dots={[d1, d2]} />
          </div>
          <Words words={['Every', 'frame,', { t: 'proven.', style: gradText }]} ats={[wi(sc, 1), wi(sc, 2), wi(sc, 3)]} style={{ justifyContent: 'center', font: `700 76px ${F.display}`, letterSpacing: '-0.04em', color: C.ink, marginTop: 46 }} />
          <Appear at={voEnd(sc) + 6} y={10}>
            <div style={{ marginTop: 40, font: `500 26px ${F.mono}`, color: C.ink3, display: 'inline-flex', gap: 24, alignItems: 'center' }}>
              <Face who="kane" size={28} /> Built on Kane CLI <span style={{ color: C.line }}>·</span> <Face who="claude" size={28} /> with Claude Code
            </div>
          </Appear>
          <Appear at={voEnd(sc) + 18} y={8}>
            <div style={{ marginTop: 22, font: `600 30px ${F.mono}`, color: C.accent }}>daohbofm7o9ia.cloudfront.net</div>
          </Appear>
        </div>
      </AbsoluteFill>
    </Bg>
  );
}

const VIEWS: Record<string, (p: { sc: Scene }) => React.ReactElement> = {
  hook: Hook,
  code: CodeScene,
  vibes: Vibes,
  defects: Defects,
  kane: KaneScene,
  frontier: Frontier,
  intro: Intro,
  storyboard: StoryboardScene,
  compose: Compose,
  judge: Judge,
  catch: Catch,
  loop: LoopScene,
  proof: Proof,
  seal: Seal,
  ...GUIDE_VIEWS,
  numbers: Numbers,
  close: Close,
  tag: Tag,
};

/** Scene with a short entrance (and exit) so cuts feel deliberate. */
function SceneFrame({ sc, children }: { sc: Scene; children: React.ReactNode }) {
  const f = useCurrentFrame();
  const inP = ease(f, [0, 10], [0, 1]);
  const outP = ease(f, [sc.dur - 8, sc.dur], [0, 1]);
  const last = sc.id === 'tag';
  return <AbsoluteFill style={{ opacity: last ? 1 - ease(f, [sc.dur - 20, sc.dur], [0, 1]) : 1, transform: `scale(${1.02 - 0.02 * inP + 0.01 * outP})`, filter: `blur(${(1 - inP) * 6 + outP * 4}px)` }}>{children}</AbsoluteFill>;
}

export function Ad() {
  const s = (id: string) => scene(id);
  const intro = s('intro');
  const sfx = (file: string, from: number, volume: number) => (
    <Sequence from={from} durationInFrames={FPS * 8} key={`${file}-${from}`}>
      <Audio src={staticFile(`sfx/${file}.mp3`)} volume={volume} />
    </Sequence>
  );
  const whooshAt = ['code', 'vibes', 'defects', 'kane', 'storyboard', 'compose', 'judge', 'catch', 'loop', 'proof', 'seal', 'guide1', 'guide2', 'guide3', 'guide4', 'numbers', 'close'];
  return (
    <AbsoluteFill style={{ background: C.ink }}>
      {SCENES.map((sc) => {
        const V = VIEWS[sc.id];
        return (
          <Sequence key={sc.id} from={sc.from} durationInFrames={sc.dur} name={sc.id}>
            <SceneFrame sc={sc}>
              <V sc={sc} />
            </SceneFrame>
            <Sequence from={sc.voAt} name={`vo:${sc.id}`}>
              <Audio src={staticFile(`vo/${sc.id === 'catch' ? 'catch' : sc.vo.id}.mp3`)} volume={1} />
            </Sequence>
          </Sequence>
        );
      })}
      {/* music */}
      <Sequence from={0} durationInFrames={intro.from + 40}>
        <Audio src={staticFile('sfx/bed-tension.mp3')} loop volume={(fr) => 0.2 * interpolate(fr, [0, 20, intro.from, intro.from + 40], [0, 1, 1, 0], { extrapolateRight: 'clamp' })} />
      </Sequence>
      <Sequence from={intro.from + 36} durationInFrames={TOTAL - intro.from - 36}>
        <Audio src={staticFile('sfx/bed-main.mp3')} loop volume={(fr) => 0.15 * interpolate(fr, [0, 30, TOTAL - intro.from - 36 - 150, TOTAL - intro.from - 36 - 30], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      </Sequence>
      {sfx('riser', intro.from - 6, 0.55)}
      {sfx('outro', s('tag').from, 0.5)}
      {whooshAt.map((id) => sfx('whoosh', s(id).from - 3, 0.22))}
      {sfx('typing', s('code').from + at(s('code'), 'prompt') + 6, 0.25)}
      {sfx('fail', s('catch').from + at(s('catch'), 'kane'), 0.35)}
      {sfx('fail', s('catch').from + at(s('catch'), 'fail'), 0.45)}
      {sfx('pass', s('loop').from + at(s('loop'), 'everything'), 0.35)}
      {sfx('pass', s('proof').from + 2, 0.4)}
    </AbsoluteFill>
  );
}
