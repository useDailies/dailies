/**
 * The plain walkthrough: one real session on the hosted app, recorded as it happened,
 * with a straightforward voiceover. Clips: video/public/wt (walkthrough-record.mjs).
 */
import React from 'react';
import { AbsoluteFill, Audio, OffthreadVideo, Sequence, staticFile } from 'remotion';
import session from '../public/wt/session.json';
import w1 from '../public/wt/vo/w1.json';
import w2 from '../public/wt/vo/w2.json';
import w3 from '../public/wt/vo/w3.json';
import w4 from '../public/wt/vo/w4.json';
import w5 from '../public/wt/vo/w5.json';
import w6 from '../public/wt/vo/w6.json';
import w7 from '../public/wt/vo/w7.json';
import w8 from '../public/wt/vo/w8.json';
import w9 from '../public/wt/vo/w9.json';
import w10 from '../public/wt/vo/w10.json';
import w11 from '../public/wt/vo/w11.json';
import { Terminal, type TLine } from './Guide';
import { C, F, Mark, Wordmark } from './ui';

const FPS = 30;
const s = (sec: number) => Math.round(sec * FPS);
const VO = { w1, w2, w3, w4, w5, w6, w7, w8, w9, w10, w11 } as Record<string, { duration: number }>;

type Seg = { label: string; dur: number; vo: { id: string; at: number }[]; body: React.ReactNode };

const term = (session as { terminal: { cmd: string; out: string }[] }).terminal;
const outLines = (i: number, at: number, step = 4): TLine[] => [
  { kind: 'cmd', t: term[i].cmd, at },
  ...term[i].out
    .replace(/\r/g, '')
    .split('\n')
    .filter((l) => l.trim())
    .map((l, k) => ({ kind: (/✔|✓|Successfully/.test(l) ? 'ok' : 'out') as TLine['kind'], t: l, at: at + 24 + k * step })),
];

function Clip({ src, from = 0, to, rate = 1 }: { src: string; from?: number; to?: number; rate?: number }) {
  return <OffthreadVideo src={staticFile(src)} startFrom={s(from)} endAt={to ? s(to) : undefined} playbackRate={rate} muted style={{ width: 1920, height: 1080 }} />;
}

function Label({ n, text, badge }: { n: number; text: string; badge?: string }) {
  return (
    <div style={{ position: 'absolute', left: 36, bottom: 32, display: 'flex', gap: 10, alignItems: 'center' }}>
      <span style={{ background: 'rgba(23,22,26,.86)', color: '#fff', font: `600 24px ${F.ui}`, padding: '10px 18px', borderRadius: 999 }}>
        {n} · {text}
      </span>
      {badge ? <span style={{ background: C.kaneTint, color: C.kaneText, font: `600 22px ${F.mono}`, padding: '9px 14px', borderRadius: 999 }}>{badge}</span> : null}
    </div>
  );
}

const TermFrame = ({ lines, title, size = 30 }: { lines: TLine[]; title: string; size?: number }) => (
  <AbsoluteFill style={{ background: C.canvas }}>
    <Terminal lines={lines} x={90} y={70} w={1740} h={900} title={title} size={size} />
  </AbsoluteFill>
);

const sb = term[4].out.split('\n').map((l, k) => ({ kind: (l.startsWith('#') ? 'tool' : 'out') as TLine['kind'], t: l || ' ', at: 20 + k * 3 }));
const claudeLines: TLine[] = [
  { kind: 'cmd', t: 'claude "/dailies:video"', at: 4 },
  { kind: 'tool', t: '⏺ dailies · dailies_start', at: 40 },
  { kind: 'dim', t: `  ⎿ Started spot "Orbit — smartwatch launch spot" in your dailies account`, at: 60 },
  { kind: 'tool', t: '⏺ dailies · dailies_criteria', at: 100 },
  { kind: 'dim', t: '  ⎿ Kane CLI designed 23 acceptance criteria from the storyboard', at: 120 },
  { kind: 'tool', t: '⏺ Write(video/Video.tsx)', at: 170 },
  { kind: 'tool', t: '⏺ dailies · dailies_review', at: 230 },
  { kind: 'dim', t: '  ⎿ Kane CLI is judging both cuts in a real browser…', at: 250 },
];

const SEGS: Seg[] = [
  { label: 'Create an account', dur: 22, vo: [{ id: 'w1', at: 0.5 }, { id: 'w2', at: 15.4 }], body: <Clip src="wt/wt-1-signup.mp4" /> },
  {
    label: 'Install the CLI and the plugin',
    dur: 13.5,
    vo: [{ id: 'w3', at: 0.4 }],
    body: <TermFrame title="~/orbit-launch — zsh" lines={[...outLines(0, 4, 3), ...outLines(1, 120, 3), ...outLines(2, 230, 3)]} />,
  },
  {
    label: 'Sign in the agent',
    dur: 12.6,
    vo: [{ id: 'w4', at: 0.3 }],
    body: (
      <>
        <Sequence durationInFrames={s(3.8)}>
          <TermFrame title="~/orbit-launch — zsh" lines={outLines(3, 2, 5)} />
        </Sequence>
        <Sequence from={s(3.8)}>
          <Clip src="wt/wt-2-device.mp4" />
          {/* privacy: the recording machine's hostname, shown only until the card changes */}
          <Sequence durationInFrames={s(4.4)}>
            <div style={{ position: 'absolute', left: 940, top: 514, width: 262, height: 32, background: '#fff', display: 'flex', alignItems: 'center', font: `600 18.5px ${F.ui}`, color: '#2c2a33' }}>macOS</div>
          </Sequence>
        </Sequence>
      </>
    ),
  },
  { label: 'The storyboard', dur: 10, vo: [{ id: 'w5', at: 0.4 }], body: <TermFrame title="~/orbit-launch — video/storyboard.md" lines={[{ kind: 'cmd', t: 'cat video/storyboard.md', at: 2 }, ...sb]} size={24} /> },
  { label: 'Ask Claude Code to make the video', dur: 11.5, vo: [{ id: 'w6', at: 0.4 }], body: <TermFrame title="~/orbit-launch — claude" lines={claudeLines} /> },
  {
    label: 'Live in the studio',
    dur: 12.2 + 17.8 + 20.5,
    vo: [{ id: 'w7', at: 0.3 }, { id: 'w8', at: 12.2 + 17.8 + 0.2 }, { id: 'w9', at: 12.2 + 17.8 + 5.4 }],
    body: (
      <>
        <Sequence durationInFrames={s(12.2)}>
          <Clip src="wt/wt-3-live.mp4" from={0} to={245} rate={20} />
          <Label n={6} text="Kane designs the tests, Claude composes" badge="time-lapse 20×" />
        </Sequence>
        <Sequence from={s(12.2)} durationInFrames={s(17.8)}>
          <Clip src="wt/wt-3-live.mp4" from={245} to={352} rate={6} />
          <Label n={6} text="Kane judges v1 on both cuts" badge="time-lapse 6×" />
        </Sequence>
        <Sequence from={s(30)}>
          <Clip src="wt/wt-3-live.mp4" from={352} rate={6} />
          <Label n={6} text="40/40 · Claude refines · Kane re-judges v2" badge="time-lapse 6×" />
        </Sequence>
      </>
    ),
  },
  { label: 'Everything on the record', dur: 20.3, vo: [{ id: 'w10', at: 0.6 }], body: <Clip src="wt/wt-4-detail.mp4" /> },
  {
    label: 'Saved to your account',
    dur: 11.6,
    vo: [{ id: 'w11', at: 0.3 }],
    body: (
      <>
        <Sequence durationInFrames={s(7.1)}>
          <Clip src="wt/wt-5-account.mp4" />
        </Sequence>
        <Sequence from={s(7.1)}>
          <AbsoluteFill style={{ background: C.paper, display: 'grid', placeItems: 'center', textAlign: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 30 }}>
                <Mark size={110} />
                <Wordmark height={84} />
              </div>
              <div style={{ marginTop: 40, font: `500 30px ${F.mono}`, color: C.ink2 }}>claude plugin install dailies@dailies · npx @usedailies/cli login</div>
              <div style={{ marginTop: 14, font: `600 30px ${F.mono}`, color: C.accent }}>daohbofm7o9ia.cloudfront.net/docs/mcp</div>
            </div>
          </AbsoluteFill>
        </Sequence>
      </>
    ),
  },
];

let t = 0;
const PLACED = SEGS.map((g) => {
  const from = t;
  t += s(g.dur);
  return { ...g, from };
});
export const WALKTHROUGH_FRAMES = t;

export function Walkthrough() {
  return (
    <AbsoluteFill style={{ background: C.canvas }}>
      {PLACED.map((g, i) => (
        <Sequence key={g.label} from={g.from} durationInFrames={s(g.dur)} name={g.label}>
          {g.body}
          {g.label !== 'Live in the studio' ? <Label n={i + 1} text={g.label} /> : null}
          {g.vo.map((v) => (
            <Sequence key={v.id} from={s(v.at)} durationInFrames={s(VO[v.id].duration + 0.3)}>
              <Audio src={staticFile(`wt/vo/${v.id}.mp3`)} />
            </Sequence>
          ))}
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}
