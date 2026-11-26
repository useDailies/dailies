import React from 'react';
import { AbsoluteFill, Easing, Img as RImg, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { BRAND } from '../../packages/shared/src/brand';

export const C = {
  ink: '#17161A',
  ink2: '#55535A',
  ink3: '#8B8990',
  paper: '#F7F7F5',
  canvas: '#F2F1EE',
  line: '#E7E5E1',
  white: '#FFFFFF',
  claude: '#D97757',
  claudeText: '#A9502F',
  claudeTint: '#FBEDE7',
  accent: '#5B4BDB',
  kane: '#3B82F6',
  kaneText: '#1D4ED8',
  kaneTint: '#E8EFFE',
  pass: '#22C55E',
  passText: '#166534',
  passTint: '#E8F5EC',
  fail: '#D92D20',
  failText: '#B42318',
  failTint: '#FDECEA',
};
export const F = {
  display: 'Bricolage, Geist, sans-serif',
  ui: 'Geist, sans-serif',
  mono: '"Geist Mono", ui-monospace, monospace',
};
export const GRAD = `linear-gradient(100deg, ${C.claude}, ${C.accent} 55%, ${C.kane})`;

const EASE = Easing.bezier(0.2, 0.8, 0.2, 1);
/** Clamped, eased interpolate. */
export const ease = (f: number, input: [number, number], output: [number, number], e = EASE) => interpolate(f, input, output, { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e });

export function useSpring(at: number, cfg: { damping?: number; stiffness?: number; mass?: number } = {}) {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  return spring({ frame: f - at, fps, config: { damping: 16, stiffness: 140, mass: 0.8, ...cfg } });
}

/** Fades/rises/unblurs children in at `at`; optionally out at `out`. */
export function Appear({ at, out, children, y = 26, blur = 10, scale = 1, style, dur = 16 }: { at: number; out?: number; children: React.ReactNode; y?: number; blur?: number; scale?: number; style?: React.CSSProperties; dur?: number }) {
  const f = useCurrentFrame();
  const p = ease(f, [at, at + dur], [0, 1]);
  const q = out !== undefined ? ease(f, [out, out + 12], [1, 0]) : 1;
  const o = p * q;
  return (
    <div
      style={{
        opacity: o,
        transform: `translateY(${(1 - p) * y + (1 - q) * -y * 0.5}px) scale(${scale + (1 - scale) * p})`,
        filter: blur ? `blur(${(1 - p) * blur + (1 - q) * blur * 0.6}px)` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Words that pop in one by one at given frames. */
export function Words({ words, ats, style, wordStyle }: { words: (string | { t: string; style?: React.CSSProperties })[]; ats: number[]; style?: React.CSSProperties; wordStyle?: React.CSSProperties }) {
  const f = useCurrentFrame();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 0.26em', ...style }}>
      {words.map((w, i) => {
        const at = ats[Math.min(i, ats.length - 1)];
        const p = ease(f, [at - 2, at + 9], [0, 1]);
        const t = typeof w === 'string' ? w : w.t;
        const st = typeof w === 'string' ? undefined : w.style;
        return (
          <span key={i} style={{ display: 'inline-block', opacity: p, transform: `translateY(${(1 - p) * 0.35}em)`, filter: `blur(${(1 - p) * 8}px)`, ...wordStyle, ...st }}>
            {t}
          </span>
        );
      })}
    </div>
  );
}

export const gradText: React.CSSProperties = { backgroundImage: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', paddingBottom: '0.08em' };

export function Bg({ dark, children }: { dark?: boolean; children?: React.ReactNode }) {
  return (
    <AbsoluteFill
      style={{
        background: dark ? `radial-gradient(120% 90% at 50% 30%, #24222b 0%, ${C.ink} 60%)` : C.paper,
        backgroundImage: dark ? undefined : 'radial-gradient(circle, rgba(23,22,26,0.075) 1.3px, transparent 1.5px)',
        backgroundSize: dark ? undefined : '26px 26px',
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

export function Face({ who, size = 28 }: { who: 'claude' | 'kane' | 'pass' | 'fail'; size?: number }) {
  const bg = who === 'claude' ? C.claude : who === 'kane' ? C.kane : who === 'pass' ? C.pass : C.fail;
  return (
    <span style={{ width: size, height: size, borderRadius: '50%', background: bg, color: '#fff', display: 'inline-grid', placeItems: 'center', font: `700 ${size * 0.46}px ${F.display}`, flex: 'none' }}>
      {who === 'claude' ? 'C' : who === 'kane' ? 'K' : who === 'pass' ? <Check size={size * 0.55} color="#fff" /> : <Cross size={size * 0.5} color="#fff" />}
    </span>
  );
}

export const Check = ({ size = 18, color = C.pass, w = 3 }: { size?: number; color?: string; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M5 12.5l4.5 4.5L19 7.5" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const Cross = ({ size = 18, color = C.fail, w = 3 }: { size?: number; color?: string; w?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" stroke={color} strokeWidth={w} strokeLinecap="round" />
  </svg>
);

/** A floating label chip. */
export function Chip({ at, out, who, children, tone = 'light', mono, style, size = 26 }: { at: number; out?: number; who?: 'claude' | 'kane' | 'pass' | 'fail'; children: React.ReactNode; tone?: 'light' | 'dark' | 'claude' | 'kane' | 'pass' | 'fail'; mono?: boolean; style?: React.CSSProperties; size?: number }) {
  const s = useSpring(at, { damping: 14, stiffness: 160 });
  const f = useCurrentFrame();
  const q = out !== undefined ? ease(f, [out, out + 10], [1, 0]) : 1;
  const bg = { light: C.white, dark: '#26242c', claude: C.claudeTint, kane: C.kaneTint, pass: C.passTint, fail: C.failTint }[tone];
  const fg = { light: C.ink, dark: '#fff', claude: C.claudeText, kane: C.kaneText, pass: C.passText, fail: C.failText }[tone];
  return (
    <div
      style={{
        position: 'absolute',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        padding: `${size * 0.42}px ${size * 0.7}px`,
        borderRadius: 999,
        background: bg,
        color: fg,
        font: `${mono ? 500 : 600} ${size}px ${mono ? F.mono : F.ui}`,
        letterSpacing: mono ? '-0.01em' : '-0.01em',
        boxShadow: tone === 'dark' ? '0 20px 50px -20px rgba(0,0,0,.6)' : '0 1px 2px rgba(23,22,26,.06), 0 18px 44px -18px rgba(23,22,26,.35)',
        border: tone === 'light' ? `1px solid ${C.line}` : 'none',
        opacity: Math.min(1, s * 1.4) * q,
        transform: `translateY(${(1 - s) * 18}px) scale(${0.86 + 0.14 * s})`,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {who ? <Face who={who} size={size * 1.12} /> : null}
      {children}
    </div>
  );
}

/** The step label in the top-left of walkthrough scenes. */
export function Step({ n, title, at = 0 }: { n: string; title: string; at?: number }) {
  return (
    <div style={{ position: 'absolute', left: 110, top: 62 }}>
      <Appear at={at} y={12} blur={6}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ font: `500 22px ${F.mono}`, color: C.accent, background: 'rgba(91,75,219,.1)', borderRadius: 999, padding: '6px 14px' }}>{n}</span>
          <span style={{ font: `700 40px ${F.display}`, letterSpacing: '-0.03em', color: C.ink }}>{title}</span>
        </div>
      </Appear>
    </div>
  );
}

/* ------------------------------------------------------------- brand */

export function Mark({ size = 120, variant = 'ink', draw = 1, corners = 1 }: { size?: number; variant?: 'ink' | 'light' | 'glyph-white' | 'glyph'; draw?: number; corners?: number }) {
  const tile = variant === 'ink' ? C.ink : variant === 'light' ? C.white : null;
  const frame = variant === 'ink' || variant === 'glyph-white' ? C.white : C.ink;
  const x0 = 15, x1 = 49, y0 = 19, y1 = 45, L = 7.5;
  const off = (1 - corners) * 9;
  const corner = (d: string, dx: number, dy: number) => (
    <path d={d} transform={`translate(${dx * off} ${dy * off})`} opacity={corners} fill="none" stroke={frame} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
  );
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="mk" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={C.claude} />
          <stop offset=".55" stopColor={C.accent} />
          <stop offset="1" stopColor={C.kane} />
        </linearGradient>
      </defs>
      {tile ? <rect width="64" height="64" rx="16" fill={tile} /> : null}
      {corner(`M${x0} ${y0 + L}V${y0 + 2}a2 2 0 0 1 2-2H${x0 + L}`, -1, -1)}
      {corner(`M${x1 - L} ${y0}H${x1 - 2}a2 2 0 0 1 2 2V${y0 + L}`, 1, -1)}
      {corner(`M${x1} ${y1 - L}V${y1 - 2}a2 2 0 0 1-2 2H${x1 - L}`, 1, 1)}
      {corner(`M${x0 + L} ${y1}H${x0 + 2}a2 2 0 0 1-2-2V${y1 - L}`, -1, 1)}
      <path d="M24.6 32.6L30.2 38.1L40.6 26.4" fill="none" stroke="url(#mk)" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30" strokeDashoffset={30 * (1 - draw)} />
    </svg>
  );
}

export function Wordmark({ height = 100, ink = C.ink, dots = [1, 1] }: { height?: number; ink?: string; dots?: [number, number] }) {
  const w = BRAND.wordmark;
  const h = w.bottom - w.top;
  return (
    <svg height={height} width={(height * w.width) / h} viewBox={`0 ${w.top} ${w.width} ${h}`} style={{ overflow: 'visible' }}>
      <path d={w.d} fill={ink} />
      {w.dots.map((d, i) => {
        const p = dots[i] ?? 1;
        return <rect key={i} x={d.x} y={d.y - (1 - p) * 60} width={d.w} height={d.w} rx={d.w * 0.28} fill={d.color} opacity={Math.min(1, p * 1.5)} />;
      })}
    </svg>
  );
}

/* ------------------------------------------------------------- screen */

export type Cam = { at: number; x: number; y: number; s: number };

function camAt(f: number, keys: Cam[]) {
  if (f <= keys[0].at) return keys[0];
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1];
    if (f <= b.at) {
      const t = ease(f, [a.at, b.at], [0, 1], Easing.bezier(0.45, 0, 0.2, 1));
      return { at: f, x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t, s: a.s + (b.s - a.s) * t };
    }
  }
  return keys[keys.length - 1];
}

/**
 * A recording in a window frame. `cam` keys are in recording pixels (1920×1080):
 * the point (x, y) is centred, zoomed by s.
 */
export function Screen({ src, from = 0, rate = 1, cam = [{ at: 0, x: 960, y: 540, s: 1 }], width = 1600, x = 960, y = 590, title = 'dailies', tilt = 0, children, style }: { src: string; from?: number; rate?: number; cam?: Cam[]; width?: number; x?: number; y?: number; title?: string; tilt?: number; children?: React.ReactNode; style?: React.CSSProperties }) {
  const f = useCurrentFrame();
  const H = (width * 9) / 16;
  const bar = Math.round(width * 0.026);
  const k = width / 1920;
  const c = camAt(f, cam);
  const s = Math.max(1, c.s);
  const cx = Math.min(1920 - 960 / s, Math.max(960 / s, c.x));
  const cy = Math.min(1080 - 540 / s, Math.max(540 / s, c.y));
  return (
    <div
      style={{
        position: 'absolute',
        left: x - width / 2,
        top: y - (H + bar) / 2,
        width,
        height: H + bar,
        borderRadius: width * 0.014,
        overflow: 'hidden',
        background: C.white,
        boxShadow: '0 2px 6px rgba(23,22,26,.06), 0 50px 120px -40px rgba(23,22,26,.45), 0 0 0 1px rgba(23,22,26,.08)',
        transform: tilt ? `perspective(2400px) rotateX(${tilt}deg)` : undefined,
        ...style,
      }}
    >
      <div style={{ height: bar, display: 'flex', alignItems: 'center', gap: bar * 0.28, padding: `0 ${bar * 0.6}px`, borderBottom: `1px solid ${C.line}`, background: '#FBFBFA' }}>
        {['#FF5F57', '#FEBC2E', '#28C840'].map((col) => (
          <i key={col} style={{ width: bar * 0.32, height: bar * 0.32, borderRadius: '50%', background: col, display: 'block' }} />
        ))}
        <span style={{ flex: 1, textAlign: 'center', font: `500 ${bar * 0.42}px ${F.ui}`, color: C.ink3, marginRight: bar * 1.2 }}>{title}</span>
      </div>
      <div style={{ position: 'relative', width, height: H, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, transformOrigin: '0 0', transform: `translate(${width / 2}px, ${H / 2}px) scale(${k * s}) translate(${-cx}px, ${-cy}px)` }}>
          <OffthreadVideo src={staticFile(src)} startFrom={Math.round(from * 30)} playbackRate={rate} muted style={{ width: 1920, height: 1080, display: 'block' }} />
        </div>
        {children}
      </div>
    </div>
  );
}

export function Img({ src, style }: { src: string; style?: React.CSSProperties }) {
  return <RImg src={staticFile(src)} style={{ display: 'block', ...style }} />;
}
