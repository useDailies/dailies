import React from 'react';
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

export const composition = {
  fps: 30,
  durationInFrames: 360,
  shots: [
    { n: 1, title: 'Product hero', from: 0, durationInFrames: 90 },
    { n: 2, title: 'Detail', from: 90, durationInFrames: 120 },
    { n: 3, title: 'Call to action', from: 210, durationInFrames: 150 },
  ],
};

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const FONT = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

const C = {
  night0: '#03060d',
  night1: '#07111f',
  night2: '#0c1a2e',
  teal: '#14b8a6',
  tealLight: '#5eead4',
  tealDeep: '#0f766e',
  tealInk: '#042f2e',
  orange: '#f97316',
  orangeLight: '#fdba74',
  orangeDeep: '#c2410c',
  ink: '#f8fafc',
};

const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

/** Deterministic hash in [0, 1). */
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Mode = 'land' | 'port' | 'square';

const useLayout = () => {
  const { width: w, height: h } = useVideoConfig();
  const aspect = w / h;
  const mode: Mode = aspect > 1.3 ? 'land' : aspect < 0.8 ? 'port' : 'square';
  const s = Math.min(w, h) / 1080;
  return { w, h, mode, s };
};

/* ------------------------------------------------------------------ */
/* Shoe artwork (viewBox 0 0 600 300, toe pointing right)              */
/* ------------------------------------------------------------------ */

const MIDSOLE =
  'M30 214 C30 196 48 188 76 188 L300 194 C400 197 480 196 530 200 C566 203 590 216 590 234 C590 244 586 248 578 248 L60 248 C40 248 30 234 30 214 Z';
const OUTSOLE = 'M34 236 L590 236 C590 254 566 268 530 268 L86 268 C56 268 36 256 34 236 Z';
const UPPER =
  'M54 200 C48 160 52 116 72 86 C84 68 108 60 128 66 C140 70 146 82 160 92 C178 104 200 108 226 106 C270 104 312 116 352 134 C410 160 470 170 522 178 C560 184 584 196 582 206 L60 206 Z';

const Shoe: React.FC<{
  id: string;
  viewBox?: string;
  sheen?: number; // -0.2 .. 1.2 position of the light sweep across the sole
  style?: React.CSSProperties;
  preserve?: string;
}> = ({ id, viewBox = '0 0 600 300', sheen = -1, style, preserve = 'xMidYMid meet' }) => {
  const eyelets = [0, 1, 2, 3, 4].map((i) => {
    const t = i / 4;
    return { x: 214 + t * 150, y: 110 + t * 34 };
  });
  const treads = Array.from({ length: 22 }, (_, i) => 74 + i * 22);
  return (
    <svg viewBox={viewBox} preserveAspectRatio={preserve} style={{ display: 'block', overflow: 'visible', ...style }}>
      <defs>
        <linearGradient id={`${id}-upper`} x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0" stopColor="#2dd4bf" />
          <stop offset="0.55" stopColor={C.teal} />
          <stop offset="1" stopColor={C.tealDeep} />
        </linearGradient>
        <linearGradient id={`${id}-mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.orangeLight} />
          <stop offset="0.35" stopColor={C.orange} />
          <stop offset="1" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id={`${id}-out`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ea580c" />
          <stop offset="1" stopColor={C.orangeDeep} />
        </linearGradient>
        <linearGradient id={`${id}-sheen`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}-mesh`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="2" cy="2" r="1.1" fill="#ecfeff" opacity="0.22" />
        </pattern>
        <clipPath id={`${id}-sole`}>
          <path d={MIDSOLE} />
          <path d={OUTSOLE} />
        </clipPath>
        <clipPath id={`${id}-upperclip`}>
          <path d={UPPER} />
        </clipPath>
      </defs>

      {/* tongue */}
      <path d="M196 106 C196 82 214 68 238 72 C252 75 260 90 266 112 Z" fill="#115e59" />
      {/* upper */}
      <path d={UPPER} fill={`url(#${id}-upper)`} />
      <g clipPath={`url(#${id}-upperclip)`}>
        <rect x="0" y="0" width="600" height="300" fill={`url(#${id}-mesh)`} />
        {/* heel counter */}
        <path d="M40 210 C44 160 50 120 68 90 C84 120 104 160 134 210 Z" fill={C.tealDeep} opacity="0.85" />
        {/* toe cap */}
        <path d="M440 158 C490 168 546 176 574 192 C588 200 588 210 584 214 L424 214 C414 192 418 170 440 158 Z" fill="#0d9488" />
        {/* wing stripes */}
        <path d="M128 192 C220 150 330 136 470 170 C350 152 240 166 150 204 Z" fill={C.tealLight} opacity="0.9" />
        <path d="M168 200 C250 172 340 164 440 184 C350 176 260 184 186 208 Z" fill={C.orange} opacity="0.95" />
        {/* gloss */}
        <path d="M86 112 C150 108 230 118 320 140" stroke="#fff" strokeOpacity="0.28" strokeWidth="4" fill="none" strokeLinecap="round" />
      </g>
      {/* collar opening */}
      <path d="M84 80 C100 64 126 62 140 74 C150 84 158 92 172 98 C150 104 120 102 100 94 C92 90 86 86 84 80 Z" fill={C.tealInk} />
      {/* heel pull tab */}
      <path d="M58 96 C56 80 62 68 74 62 L82 76 C72 80 66 88 66 98 Z" fill={C.orange} />
      {/* laces */}
      {eyelets.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y + 4} r="4" fill={C.tealInk} />
          <path d={`M${p.x - 6} ${p.y - 12} L${p.x + 10} ${p.y + 12}`} stroke="#ecfeff" strokeWidth="7" strokeLinecap="round" />
        </g>
      ))}

      {/* midsole + outsole */}
      <path d={OUTSOLE} fill={`url(#${id}-out)`} />
      <path d={MIDSOLE} fill={`url(#${id}-mid)`} />
      <path d="M58 208 C200 214 400 216 566 220" stroke={C.orangeLight} strokeOpacity="0.8" strokeWidth="3" fill="none" />
      <path d="M48 230 C200 234 420 236 584 238" stroke="#9a3412" strokeOpacity="0.45" strokeWidth="2" fill="none" />
      {/* foam pods */}
      {[110, 190, 270, 350, 430, 510].map((x) => (
        <ellipse key={x} cx={x} cy="226" rx="22" ry="6" fill="#ea580c" opacity="0.45" />
      ))}
      {/* tread */}
      {treads.map((x) => (
        <rect key={x} x={x} y="256" width="11" height="10" rx="2" fill="#7c2d12" opacity="0.75" />
      ))}
      {/* light sweep over the sole */}
      <g clipPath={`url(#${id}-sole)`}>
        <rect x={-120 + sheen * 720} y="180" width="110" height="100" fill={`url(#${id}-sheen)`} transform={`skewX(-20)`} />
      </g>
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Night city background                                               */
/* ------------------------------------------------------------------ */

type Building = { x: number; w: number; h: number; lit: number; antenna: boolean };

const buildRow = (seed: number, total: number, minH: number, maxH: number, minW: number, maxW: number) => {
  const out: Building[] = [];
  let x = -40;
  let i = 0;
  while (x < total) {
    const bw = minW + rand(seed + i) * (maxW - minW);
    const bh = minH + Math.pow(rand(seed + i + 500), 1.4) * (maxH - minH);
    out.push({ x, w: bw, h: bh, lit: rand(seed + i + 900), antenna: rand(seed + i + 77) > 0.82 });
    x += bw + rand(seed + i + 1300) * 6;
    i++;
  }
  return out;
};

const City: React.FC<{
  id: string;
  horizon: number; // px from top
  globalFrame: number;
  dim?: number;
  glow?: string;
  glowY?: number;
}> = ({ id, horizon, globalFrame, dim = 0, glow = C.teal, glowY = 0.45 }) => {
  const { w, h, s } = useLayout();
  const extra = 600 * s;
  const far = buildRow(11, w + extra, horizon * 0.22, horizon * 0.62, 50 * s, 150 * s);
  const near = buildRow(57, w + extra, horizon * 0.12, horizon * 0.42, 70 * s, 190 * s);
  const farShift = -globalFrame * 0.35 * s;
  const nearShift = -globalFrame * 0.9 * s;
  const stars = Array.from({ length: 40 }, (_, i) => ({
    x: rand(i + 3000) * w,
    y: rand(i + 4000) * horizon * 0.5,
    r: (0.6 + rand(i + 5000) * 1.4) * s,
    tw: 0.35 + 0.65 * Math.abs(Math.sin(globalFrame / 18 + i)),
  }));
  const cell = 14 * s;

  return (
    <AbsoluteFill data-layer="background">
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, ${C.night0} 0%, ${C.night1} ${(horizon / h) * 55}%, ${C.night2} ${(horizon / h) * 100}%, ${C.night0} 100%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${w * 0.7}px ${h * 0.45}px at 50% ${glowY * 100}%, ${glow}33 0%, transparent 70%)`,
        }}
      />
      <svg width={w} height={h} style={{ position: 'absolute', inset: 0 }}>
        <defs>
          <pattern id={`${id}-winA`} width={cell} height={cell * 1.4} patternUnits="userSpaceOnUse">
            <rect x={cell * 0.3} y={cell * 0.35} width={cell * 0.35} height={cell * 0.55} fill="#fcd34d" opacity="0.55" />
          </pattern>
          <pattern id={`${id}-winB`} width={cell * 1.3} height={cell * 1.7} patternUnits="userSpaceOnUse">
            <rect x={cell * 0.4} y={cell * 0.5} width={cell * 0.4} height={cell * 0.6} fill={C.tealLight} opacity="0.4" />
          </pattern>
          <linearGradient id={`${id}-haze`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={C.orange} stopOpacity="0" />
            <stop offset="1" stopColor={C.orange} stopOpacity="0.22" />
          </linearGradient>
        </defs>
        {stars.map((st, i) => (
          <circle key={i} cx={st.x} cy={st.y} r={st.r} fill="#e2e8f0" opacity={st.tw * 0.6} />
        ))}
        <g transform={`translate(${farShift % (extra * 0.5)} 0)`}>
          {far.map((b, i) => (
            <rect key={i} x={b.x} y={horizon - b.h} width={b.w} height={b.h} fill="#0e1d33" />
          ))}
        </g>
        <rect x={0} y={horizon * 0.55} width={w} height={horizon * 0.45} fill={`url(#${id}-haze)`} />
        <g transform={`translate(${nearShift % (extra * 0.8)} 0)`}>
          {near.map((b, i) => (
            <g key={i}>
              <rect x={b.x} y={horizon - b.h} width={b.w} height={b.h} fill="#08111f" />
              <rect
                x={b.x + 6 * s}
                y={horizon - b.h + 10 * s}
                width={Math.max(0, b.w - 12 * s)}
                height={Math.max(0, b.h - 10 * s)}
                fill={`url(#${id}-${b.lit > 0.5 ? 'winA' : 'winB'})`}
                opacity={0.25 + b.lit * 0.6}
              />
              {b.antenna && (
                <>
                  <rect x={b.x + b.w / 2 - 1.5 * s} y={horizon - b.h - 40 * s} width={3 * s} height={40 * s} fill="#08111f" />
                  <circle
                    cx={b.x + b.w / 2}
                    cy={horizon - b.h - 40 * s}
                    r={4 * s}
                    fill="#ef4444"
                    opacity={Math.floor(globalFrame / 15 + i) % 2 === 0 ? 0.95 : 0.25}
                  />
                </>
              )}
            </g>
          ))}
        </g>
        {/* street / ground plane */}
        <rect x={0} y={horizon} width={w} height={h - horizon} fill="#04080f" />
        <rect x={0} y={horizon} width={w} height={2 * s} fill={C.orange} opacity="0.35" />
      </svg>
      <AbsoluteFill style={{ background: C.night0, opacity: dim }} />
    </AbsoluteFill>
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse 85% 75% at 50% 50%, transparent 55%, rgba(0,0,0,0.6) 100%)',
    }}
  />
);

/* ------------------------------------------------------------------ */
/* Shot 1 — Product hero                                               */
/* ------------------------------------------------------------------ */

const ShotHero: React.FC = () => {
  const f = useCurrentFrame();
  const { w, h, mode, s } = useLayout();

  const L = {
    land: { shoeW: 1100 * s, shoeLeft: 450 * s, shoeTop: 250 * s, capTop: 880 * s, capSize: 112 * s, capAlign: 'left' as const, capLeft: 140 * s },
    port: { shoeW: 960 * s, shoeLeft: 50 * s, shoeTop: h * 0.3, capTop: h * 0.3 + 520 * s, capSize: 112 * s, capAlign: 'center' as const, capLeft: 0 },
    square: { shoeW: 880 * s, shoeLeft: 90 * s, shoeTop: 190 * s, capTop: 740 * s, capSize: 108 * s, capAlign: 'center' as const, capLeft: 0 },
  }[mode];

  const shoeH = L.shoeW / 2;
  const horizon = L.shoeTop + shoeH * 0.893;

  const p = interpolate(f, [0, 26], [0, 1], { ...clamp, easing: EASE_OUT });
  const drift = interpolate(f, [26, 90], [0, 22 * s], clamp);
  const left = interpolate(p, [0, 1], [-L.shoeW - 160 * s, L.shoeLeft]) + drift;
  const tilt = (1 - p) * -9;
  const skew = (1 - p) * -14;
  const blur = (1 - p) * 10;
  const bob = Math.sin(f / 14) * 3 * s * p;

  const capP = interpolate(f, [8, 26], [0, 1], { ...clamp, easing: EASE_OUT });

  const streaks = Array.from({ length: 9 }, (_, i) => {
    const y = L.shoeTop + shoeH * (0.15 + rand(i + 60) * 0.7);
    const len = (240 + rand(i + 70) * 420) * s;
    const speed = 70 + rand(i + 80) * 50;
    const x = -len + ((f * speed * s + rand(i + 90) * w) % (w + len));
    return { y, len, x, o: interpolate(f, [0, 20, 40], [0.9, 0.6, 0.12], clamp) * (0.4 + rand(i + 99) * 0.6) };
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <City id="c1" horizon={horizon} globalFrame={f} glowY={horizon / h - 0.1} />

      {streaks.map((st, i) => (
        <div
          key={i}
          data-layer="speed-lines"
          style={{
            position: 'absolute',
            left: st.x,
            top: st.y,
            width: st.len,
            height: 2 * s,
            borderRadius: 2,
            background: `linear-gradient(90deg, transparent, ${i % 3 === 0 ? C.orange : C.tealLight})`,
            opacity: st.o,
          }}
        />
      ))}

      {/* contact shadow */}
      <div
        style={{
          position: 'absolute',
          left: left + L.shoeW * 0.06,
          top: horizon - 14 * s,
          width: L.shoeW * 0.9,
          height: 30 * s,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.85), transparent 70%)',
          opacity: p,
        }}
      />
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left,
          top: L.shoeTop + bob,
          width: L.shoeW,
          height: shoeH,
          transform: `rotate(${tilt}deg) skewX(${skew}deg)`,
          transformOrigin: '80% 90%',
          filter: `blur(${blur}px) drop-shadow(0 ${30 * s}px ${40 * s}px rgba(20,184,166,0.25))`,
        }}
      >
        <Shoe id="s1" style={{ width: '100%', height: '100%' }} sheen={interpolate(f, [30, 70], [-0.2, 1.2], clamp)} />
      </div>

      <div
        style={{
          position: 'absolute',
          top: L.capTop,
          left: L.capLeft,
          right: L.capAlign === 'center' ? 0 : undefined,
          textAlign: L.capAlign,
        }}
      >
        <div
          data-layer="caption"
          style={{
            display: 'inline-block',
            fontFamily: FONT,
            fontWeight: 800,
            fontSize: L.capSize,
            lineHeight: 1,
            letterSpacing: `${interpolate(capP, [0, 1], [0.04, -0.035])}em`,
            color: C.ink,
            whiteSpace: 'nowrap',
            opacity: capP,
            transform: `translateY(${(1 - capP) * 40 * s}px)`,
            textShadow: `0 ${6 * s}px ${30 * s}px rgba(0,0,0,0.6)`,
          }}
        >
          Run the city
        </div>
      </div>
      <Vignette />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 2 — Detail                                                     */
/* ------------------------------------------------------------------ */

const ShotDetail: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { w, h, mode, s } = useLayout();
  const global = f + 90;

  const baseVW = { land: 300, port: 230, square: 260 }[mode];
  const settle = spring({ frame: f, fps, config: { damping: 200, stiffness: 90 } });
  const vw = baseVW * interpolate(settle, [0, 1], [1.25, 1]) * interpolate(f, [0, 120], [1, 0.93]);
  const vh = vw * (h / w);
  const cx = interpolate(f, [0, 120], [425, 450]);
  const cy = 228;
  const viewBox = `${cx - vw / 2} ${cy - vh / 2} ${vw} ${vh}`;

  // Wordmark: absent at local 0, fully visible by local 48 (< 0:05).
  const wm = interpolate(f, [18, 48], [0, 1], { ...clamp, easing: EASE_OUT });

  // Price tag: drops in, fully visible by local 16, stays through the shot.
  const tagIn = interpolate(f, [4, 16], [0, 1], { ...clamp, easing: EASE_OUT });
  const swing = f < 4 ? 0 : 9 * Math.exp(-(f - 4) / 16) * Math.cos((f - 4) / 3.6);

  const W = {
    land: { wmTop: 850 * s, wmSize: 150 * s, wmAlign: 'left' as const, wmLeft: 130 * s, tagRight: 170 * s, tagTop: 120 * s },
    // 9:16 safe band is 14%–65% of the height: wordmark sits on the dark sky above the shoe,
    // the tag hangs on a short string just below it.
    port: { wmTop: h * 0.16, wmSize: 128 * s, wmAlign: 'center' as const, wmLeft: 0, tagRight: 90 * s, tagTop: h * 0.3 },
    square: { wmTop: 790 * s, wmSize: 118 * s, wmAlign: 'center' as const, wmLeft: 0, tagRight: 80 * s, tagTop: 100 * s },
  }[mode];

  const spacing = interpolate(wm, [0, 1], [0.32, 0.14]);
  const stringLen = mode === 'port' ? 110 * s : W.tagTop + 20 * s;

  return (
    <AbsoluteFill style={{ overflow: 'hidden', background: C.night0 }}>
      <City id="c2" horizon={h * 0.86} globalFrame={global} dim={0.55} glow={C.orange} glowY={0.55} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${w * 0.6}px ${h * 0.35}px at 55% 58%, ${C.orange}40, transparent 70%)`,
        }}
      />
      <AbsoluteFill data-layer="product">
        <Shoe
          id="s2"
          viewBox={viewBox}
          preserve="xMidYMid slice"
          sheen={interpolate(f, [14, 80], [-0.2, 1.2], { ...clamp, easing: Easing.inOut(Easing.cubic) })}
          style={{ width: w, height: h, filter: `drop-shadow(0 ${24 * s}px ${50 * s}px rgba(0,0,0,0.6))` }}
        />
      </AbsoluteFill>
      {/* floor fade so the wordmark sits on clean dark */}
      <AbsoluteFill
        style={{ background: 'linear-gradient(180deg, transparent 58%, rgba(3,6,13,0.85) 82%, rgba(3,6,13,0.95) 100%)' }}
      />

      {/* hang tag */}
      <div
        style={{
          position: 'absolute',
          right: W.tagRight,
          top: W.tagTop - stringLen,
          transformOrigin: `50% 0`,
          transform: `translateY(${(1 - tagIn) * -260 * s}px) rotate(${swing}deg)`,
          opacity: tagIn,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={{ width: 2 * s, height: stringLen, background: 'linear-gradient(180deg, transparent, #e2e8f0)' }} />
        <div
          style={{
            position: 'relative',
            padding: `${34 * s}px ${44 * s}px ${26 * s}px`,
            background: 'linear-gradient(160deg, #ffffff, #e2e8f0)',
            borderRadius: 16 * s,
            boxShadow: `0 ${20 * s}px ${50 * s}px rgba(0,0,0,0.5)`,
            borderTop: `${8 * s}px solid ${C.orange}`,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 10 * s,
              left: '50%',
              width: 14 * s,
              height: 14 * s,
              marginLeft: -7 * s,
              borderRadius: '50%',
              background: '#94a3b8',
            }}
          />
          <span
            data-layer="price"
            style={{
              display: 'block',
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: 84 * s,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#0b1220',
              fontVariantNumeric: 'tabular-nums',
              whiteSpace: 'nowrap',
            }}
          >
            €149
          </span>
        </div>
      </div>

      <div
        style={{
          position: 'absolute',
          top: W.wmTop,
          left: W.wmLeft,
          right: W.wmAlign === 'center' ? 0 : undefined,
          textAlign: W.wmAlign,
        }}
      >
        <div
          data-layer="wordmark"
          style={{
            display: 'inline-block',
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: W.wmSize,
            lineHeight: 1,
            letterSpacing: `${spacing}em`,
            marginRight: W.wmAlign === 'center' ? `-${spacing}em` : 0,
            color: C.ink,
            whiteSpace: 'nowrap',
            opacity: wm,
            filter: `blur(${(1 - wm) * 14 * s}px)`,
            textShadow: `0 0 ${40 * s}px ${C.orange}55`,
          }}
        >
          KESTREL
        </div>
      </div>
      <AbsoluteFill
        style={{ background: C.orange, opacity: interpolate(f, [0, 8], [0.35, 0], clamp), mixBlendMode: 'screen' }}
      />
      <Vignette />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 3 — Call to action                                             */
/* ------------------------------------------------------------------ */

const ShotCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { w, h, mode, s } = useLayout();
  const global = f + 210;

  const L = {
    land: {
      align: 'left' as const,
      left: 140 * s,
      wmTop: 250 * s,
      wmSize: 44 * s,
      hlTop: 340 * s,
      hlSize: 112 * s,
      btnTop: 540 * s,
      shoeW: 820 * s,
      shoeLeft: w - 860 * s,
      shoeTop: 330 * s,
    },
    port: {
      align: 'center' as const,
      left: 0,
      wmTop: h * 0.17,
      wmSize: 40 * s,
      hlTop: h * 0.455,
      hlSize: 96 * s,
      btnTop: h * 0.54,
      shoeW: 860 * s,
      shoeLeft: (w - 860 * s) / 2,
      shoeTop: h * 0.215,
    },
    square: {
      align: 'center' as const,
      left: 0,
      wmTop: 80 * s,
      wmSize: 38 * s,
      hlTop: 600 * s,
      hlSize: 96 * s,
      btnTop: 760 * s,
      shoeW: 780 * s,
      shoeLeft: (w - 780 * s) / 2,
      shoeTop: 150 * s,
    },
  }[mode];

  const shoeH = L.shoeW / 2;
  const shoeIn = spring({ frame: f, fps, config: { damping: 18, stiffness: 110, mass: 0.9 } });
  const float = Math.sin(f / 20) * 8 * s;

  const hl = spring({ frame: f - 6, fps, config: { damping: 200, stiffness: 120 } });
  const bar = interpolate(f, [16, 40], [0, 1], { ...clamp, easing: EASE_OUT });
  const btn = spring({ frame: f - 26, fps, config: { damping: 16, stiffness: 140 }, durationInFrames: 22 });
  const btnOpacity = interpolate(f, [26, 38], [0, 1], clamp);
  const shine = interpolate(f, [60, 95], [130, -30], { ...clamp, easing: Easing.inOut(Easing.cubic) });
  const wmSpacing = interpolate(f, [0, 40], [0.62, 0.48], { ...clamp, easing: EASE_OUT });

  const block = (top: number): React.CSSProperties => ({
    position: 'absolute',
    top,
    left: L.left,
    right: L.align === 'center' ? 0 : undefined,
    textAlign: L.align,
  });

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      <City id="c3" horizon={h * 0.94} globalFrame={global} dim={0.62} glow={C.teal} glowY={0.4} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle ${Math.max(w, h) * 0.38}px at ${((L.shoeLeft + L.shoeW / 2) / w) * 100}% ${((L.shoeTop + shoeH / 2) / h) * 100}%, ${C.teal}38, transparent 70%)`,
        }}
      />

      {/* product */}
      <div
        style={{
          position: 'absolute',
          left: L.shoeLeft + L.shoeW * 0.1,
          top: L.shoeTop + shoeH * 0.95,
          width: L.shoeW * 0.8,
          height: 26 * s,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8), transparent 70%)',
          opacity: shoeIn,
          transform: `scaleX(${1 - float / (80 * s)})`,
        }}
      />
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left: L.shoeLeft,
          top: L.shoeTop + float,
          width: L.shoeW,
          height: shoeH,
          opacity: interpolate(shoeIn, [0, 0.3], [0, 1], clamp),
          transform: `translateY(${(1 - shoeIn) * 80 * s}px) rotate(${interpolate(shoeIn, [0, 1], [8, -4])}deg) scale(${interpolate(shoeIn, [0, 1], [0.86, 1])})`,
          filter: `drop-shadow(0 ${30 * s}px ${50 * s}px rgba(20,184,166,0.35))`,
        }}
      >
        <Shoe id="s3" style={{ width: '100%', height: '100%' }} sheen={interpolate(f, [40, 90], [-0.2, 1.2], clamp)} />
      </div>

      {/* wordmark — visible from the first frame of the shot */}
      <div style={block(L.wmTop)}>
        <div
          data-layer="wordmark"
          style={{
            display: 'inline-block',
            fontFamily: FONT,
            fontWeight: 900,
            fontSize: L.wmSize,
            lineHeight: 1,
            letterSpacing: `${wmSpacing}em`,
            marginRight: L.align === 'center' ? `-${wmSpacing}em` : 0,
            color: C.tealLight,
            whiteSpace: 'nowrap',
          }}
        >
          KESTREL
        </div>
      </div>

      {/* headline */}
      <div style={{ ...block(L.hlTop), paddingBottom: 12 * s }}>
        <div style={{ display: 'inline-block', overflow: 'hidden', padding: `${8 * s}px ${4 * s}px` }}>
          <div
            data-layer="headline"
            style={{
              fontFamily: FONT,
              fontWeight: 800,
              fontSize: L.hlSize,
              lineHeight: 1.05,
              letterSpacing: '-0.035em',
              color: C.ink,
              whiteSpace: 'nowrap',
              transform: `translateY(${(1 - hl) * 110}%)`,
            }}
          >
            Out 28 November
          </div>
        </div>
        <div
          data-layer="accent"
          style={{
            height: 6 * s,
            width: 140 * s,
            marginTop: 10 * s,
            marginLeft: L.align === 'center' ? 'auto' : 4 * s,
            marginRight: L.align === 'center' ? 'auto' : undefined,
            borderRadius: 3 * s,
            background: `linear-gradient(90deg, ${C.orange}, ${C.orangeLight})`,
            transform: `scaleX(${bar})`,
            transformOrigin: L.align === 'center' ? '50% 50%' : '0 50%',
          }}
        />
      </div>

      {/* button */}
      <div style={block(L.btnTop)}>
        <div
          data-layer="button"
          style={{
            display: 'inline-block',
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 44 * s,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: '#1c0a02',
            whiteSpace: 'nowrap',
            padding: `${32 * s}px ${60 * s}px`,
            borderRadius: 999,
            backgroundImage: `linear-gradient(110deg, transparent 40%, rgba(255,255,255,0.65) 50%, transparent 60%), linear-gradient(180deg, ${C.orangeLight}, ${C.orange})`,
            backgroundSize: '250% 100%, 100% 100%',
            backgroundPosition: `${shine}% 0, 0 0`,
            backgroundRepeat: 'no-repeat',
            boxShadow: `0 ${18 * s}px ${44 * s}px rgba(249,115,22,0.4), inset 0 ${2 * s}px 0 rgba(255,255,255,0.5)`,
            opacity: btnOpacity,
            transform: `translateY(${(1 - btn) * 30 * s}px) scale(${interpolate(btn, [0, 1], [0.86, 1])})`,
            transformOrigin: L.align === 'center' ? '50% 50%' : '0 50%',
          }}
        >
          Get early access
        </div>
      </div>
      <Vignette />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export default function Video() {
  const [s1, s2, s3] = composition.shots;
  return (
    <AbsoluteFill style={{ background: C.night0, fontFamily: FONT }}>
      <Sequence from={s1.from} durationInFrames={s1.durationInFrames} name={s1.title}>
        <ShotHero />
      </Sequence>
      <Sequence from={s2.from} durationInFrames={s2.durationInFrames} name={s2.title}>
        <ShotDetail />
      </Sequence>
      <Sequence from={s3.from} durationInFrames={s3.durationInFrames} name={s3.title}>
        <ShotCTA />
      </Sequence>
    </AbsoluteFill>
  );
}
