import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame } from 'remotion';
import session from '../public/guide/session.json';
import { at, type Scene } from './timeline';
import { Appear, Bg, C, Chip, F, Face, Screen, Step, ease, gradText } from './ui';

/** One terminal line: typed (`$ cmd`) or printed output; `who` tints tool calls. */
export type TLine = { t: string; kind: 'cmd' | 'out' | 'ok' | 'fail' | 'tool' | 'dim' | 'claude'; at: number };

export function Terminal({ lines, x, y, w, h, title, from = 0, size = 24 }: { lines: TLine[]; x: number; y: number; w: number; h: number; title: string; from?: number; size?: number }) {
  const f = useCurrentFrame() - from;
  const shown = lines.filter((l) => f >= l.at);
  const maxRows = Math.floor((h - 70) / (size * 1.55));
  const rows = shown.slice(-maxRows);
  return (
    <div style={{ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: 20, background: '#121115', boxShadow: '0 50px 120px -40px rgba(23,22,26,.6), 0 0 0 1px rgba(255,255,255,.06)', overflow: 'hidden' }}>
      <div style={{ height: 44, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', borderBottom: '1px solid rgba(255,255,255,.07)' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((c) => (
          <i key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, display: 'block' }} />
        ))}
        <span style={{ flex: 1, textAlign: 'center', font: `500 17px ${F.mono}`, color: 'rgba(255,255,255,.45)', marginRight: 50 }}>{title}</span>
      </div>
      <div style={{ padding: '18px 26px', font: `400 ${size}px/1.55 ${F.mono}`, color: '#e8e6ee' }}>
        {rows.map((l, i) => {
          const age = f - l.at;
          const typed = l.kind === 'cmd' ? l.t.slice(0, Math.max(0, Math.floor(age * 1.6))) : l.t;
          const color = { cmd: '#fff', out: '#c9c6d2', ok: '#4ade80', fail: '#f87171', tool: '#a5b4fc', dim: 'rgba(255,255,255,.42)', claude: '#f3b49a' }[l.kind];
          return (
            <div key={i + l.t} style={{ color, whiteSpace: 'pre', overflow: 'hidden', textOverflow: 'ellipsis', opacity: l.kind === 'cmd' ? 1 : ease(age, [0, 6], [0, 1]) }}>
              {l.kind === 'cmd' ? <span style={{ color: '#8b8990' }}>$ </span> : null}
              {typed}
              {l.kind === 'cmd' && typed.length < l.t.length ? <span style={{ background: C.claude, color: C.claude }}>_</span> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Guide1({ sc }: { sc: Scene }) {
  return (
    <Bg>
      <Step n="08" title="Bring your own agent" />
      <AbsoluteFill style={{ display: 'grid', placeItems: 'center', textAlign: 'center' }}>
        <div>
          <Appear at={sc.voAt}>
            <div style={{ font: `700 112px/1.02 ${F.display}`, letterSpacing: '-0.05em', color: C.ink }}>
              Never leave <span style={gradText}>your editor.</span>
            </div>
          </Appear>
          <div style={{ position: 'relative', height: 120, marginTop: 40 }}>
            <Chip at={sc.voAt + 10} who="claude" tone="claude" style={{ left: 330, top: 20 }} size={30}>
              Claude Code
            </Chip>
            <Chip at={sc.voAt + 16} tone="light" style={{ left: 700, top: 20 }} size={30}>
              Cursor
            </Chip>
            <Chip at={sc.voAt + 22} tone="light" mono style={{ left: 930, top: 20 }} size={28}>
              any MCP client
            </Chip>
          </div>
        </div>
      </AbsoluteFill>
    </Bg>
  );
}

export function Guide2({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const tSign = at(sc, 'sign');
  const tApprove = at(sc, 'approve');
  const tConnected = at(sc, 'connected');
  const L: TLine[] = [
    { kind: 'cmd', t: 'claude plugin marketplace add useDailies/dailies', at: 4 },
    { kind: 'ok', t: '✔ Successfully added marketplace: dailies', at: 30 },
    { kind: 'cmd', t: 'claude plugin install dailies@dailies', at: 40 },
    { kind: 'ok', t: '✔ Successfully installed plugin: dailies@dailies', at: 66 },
    { kind: 'cmd', t: 'npx @usedailies/cli login', at: tSign - 6 },
    { kind: 'out', t: '  Sign in to dailies', at: tSign + 10 },
    { kind: 'dim', t: `  1. Open   ${session.login.url}`, at: tSign + 14 },
    { kind: 'out', t: `  2. Check  the code reads  ${session.login.code}`, at: tSign + 18 },
    { kind: 'ok', t: `  ✓ Signed in as ${session.login.user}`, at: tConnected },
  ];
  const showBrowser = f >= tApprove - 18;
  return (
    <Bg>
      <Step n="08" title="Install once, sign in once" />
      <Terminal lines={L} x={110} y={170} w={showBrowser ? 860 : 1700} h={760} title="~/halo-launch — zsh" size={showBrowser ? 22 : 28} />
      {showBrowser ? (
        <Sequence from={tApprove - 18} layout="none">
          <Screen src="rec/device.mp4" from={0.4} rate={1.05} width={860} x={1420} y={550} title="dailies · approve sign-in" cam={[{ at: 0, x: 954, y: 560, s: 1.9 }]} />
        </Sequence>
      ) : null}
      <Chip at={tConnected + 2} who="pass" tone="pass" mono style={{ left: 110, top: 960 }} size={24}>
        token saved · spots now belong to your dailies account
      </Chip>
    </Bg>
  );
}

export function Guide3({ sc }: { sc: Scene }) {
  const lines = (session.claude as { kind: TLine['kind']; t: string; at: number }[]).map((l) => ({ ...l, at: sc.voAt + Math.round(l.at * (sc.dur - sc.voAt - 20)) }));
  return (
    <Bg>
      <Step n="08" title="Claude writes it · Kane proves it" />
      <Terminal lines={lines} x={110} y={170} w={1700} h={780} title="~/halo-launch — claude" size={25} />
      <Chip at={at(sc, 'kane') + 4} who="kane" tone="kane" mono style={{ right: 140, top: 190 }} size={24}>
        dailies_review → Kane CLI, every cut, real Chrome
      </Chip>
      <Chip at={at(sc, 'before') + 2} who="claude" tone="claude" style={{ right: 140, top: 270 }} size={24}>
        Stop hook: can’t finish while a check fails
      </Chip>
    </Bg>
  );
}

export function Guide4({ sc }: { sc: Scene }) {
  const f = useCurrentFrame();
  const cut = sc.voAt + 44;
  return (
    <Bg>
      <Step n="08" title="Saved to your account, live" />
      {f < cut ? (
        <Screen src="rec/account.mp4" from={0.8} rate={1.1} width={1560} y={600} title="dailies · your spots" cam={[{ at: 0, x: 820, y: 560, s: 1.15 }, { at: 34, x: 560, y: 720, s: 1.55 }]} />
      ) : (
        <Sequence from={cut} layout="none">
          <Screen src="rec/mcpspot.mp4" from={2.2} rate={1.2} width={1560} y={600} title="dailies · Lumen — focus headphones launch spot" cam={[{ at: 0, x: 900, y: 520, s: 1.1 }, { at: 40, x: 500, y: 560, s: 1.35 }]} />
        </Sequence>
      )}
      <Chip at={sc.voAt + 14} who="claude" tone="claude" style={{ right: 140, top: 900 }} size={26}>
        via Claude Code · 40/44 → {session.result.score} · saved to your account
      </Chip>
    </Bg>
  );
}

export const GUIDE_VIEWS = { guide1: Guide1, guide2: Guide2, guide3: Guide3, guide4: Guide4 };
export { Face };
