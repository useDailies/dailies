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
/* Tokens                                                              */
/* ------------------------------------------------------------------ */

const FONT = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
const INK = '#f8fafc';
const TEAL = '#14b8a6';
const ORANGE = '#f97316';
const EXPO = Easing.bezier(0.16, 1, 0.3, 1);
const SOFT = Easing.bezier(0.45, 0, 0.55, 1);

const ease = (f: number, a: number, b: number, from = 0, to = 1, e = EXPO) =>
  interpolate(f, [a, b], [from, to], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: e,
  });

// Deterministic hash in [0, 1): no Math.random anywhere.
const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};
const mod = (a: number, m: number) => ((a % m) + m) % m;

type Aspect = 'landscape' | 'portrait' | 'square';
const useLayout = () => {
  const { width: W, height: H, fps } = useVideoConfig();
  const r = H / W;
  const aspect: Aspect = r > 1.3 ? 'portrait' : r > 0.85 ? 'square' : 'landscape';
  const u = Math.min(W, H) / 1080;
  const pick = <T,>(l: T, p: T, s: T): T => (aspect === 'landscape' ? l : aspect === 'portrait' ? p : s);
  return { W, H, fps, aspect, u, pick };
};

/* ------------------------------------------------------------------ */
/* Shoe — drawn entirely in SVG, toe pointing right                    */
/* ------------------------------------------------------------------ */

const SHOE_RATIO = 300 / 640;
const UPPER =
  'M 40 166 C 30 120 36 72 62 52 C 82 38 108 42 122 60 C 140 84 178 92 212 84 C 232 62 258 46 282 50 C 300 54 306 76 314 96 C 400 118 512 138 596 168 C 626 180 638 194 620 194 C 520 204 420 206 330 202 C 220 198 120 184 40 166 Z';
const MIDSOLE =
  'M 30 160 C 24 196 28 226 46 238 L 598 238 C 624 236 640 220 640 204 C 640 194 634 190 620 192 C 520 204 420 206 330 202 C 220 198 120 182 30 160 Z';
const OUTSOLE =
  'M 40 232 C 42 254 62 266 92 266 L 560 266 C 600 266 626 250 636 222 C 628 232 614 238 598 238 L 46 238 Z';
const HEEL = 'M 40 166 C 30 120 36 72 62 52 C 72 90 84 140 120 180 C 90 176 62 172 40 166 Z';
const TOE =
  'M 520 146 C 560 156 600 168 616 180 C 630 188 632 194 620 194 C 590 198 556 200 528 200 C 516 184 512 164 520 146 Z';
const WING =
  'M 140 168 C 210 128 300 108 420 120 C 470 125 500 134 520 146 C 450 132 360 132 280 150 C 230 160 190 172 160 186 Z';
const WING2 = 'M 182 178 C 262 152 352 144 462 152 C 382 154 302 164 222 186 Z';

const Shoe: React.FC<{ id: string; width: number; sheen?: number; shadow?: boolean }> = ({
  id,
  width,
  sheen = -1,
  shadow = true,
}) => {
  const laces = [0, 1, 2, 3, 4].map((i) => {
    const x = 332 + i * 36;
    const y = 96 + 0.243 * (x - 314);
    return { x, y };
  });
  const sx = -120 + sheen * 880;
  return (
    <svg
      width={width}
      height={width * SHOE_RATIO}
      viewBox="0 0 640 300"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <linearGradient id={`${id}up`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="0.45" stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0f5f59" />
        </linearGradient>
        <linearGradient id={`${id}mid`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fed7aa" />
          <stop offset="0.25" stopColor="#fb923c" />
          <stop offset="0.75" stopColor="#f97316" />
          <stop offset="1" stopColor="#c2410c" />
        </linearGradient>
        <linearGradient id={`${id}out`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ea580c" />
          <stop offset="1" stopColor="#7c2d12" />
        </linearGradient>
        <linearGradient id={`${id}hl`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="0.35" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`${id}sh`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <pattern id={`${id}mesh`} width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="1.15" fill="#042f2e" opacity="0.35" />
        </pattern>
        <clipPath id={`${id}sole`}>
          <path d={MIDSOLE} />
          <path d={OUTSOLE} />
        </clipPath>
        <filter id={`${id}blur`} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {shadow && (
        <ellipse cx="335" cy="276" rx="300" ry="13" fill="#000" opacity="0.65" filter={`url(#${id}blur)`} />
      )}

      {/* Upper */}
      <path d={UPPER} fill={`url(#${id}up)`} />
      <path d={UPPER} fill={`url(#${id}mesh)`} />
      <path d={HEEL} fill="#0f766e" />
      <path d={TOE} fill="#0f766e" opacity="0.85" />
      <path d={TOE} fill={`url(#${id}mesh)`} />
      <path d="M 122 60 C 140 84 178 92 212 84 C 196 98 150 98 122 60 Z" fill="#042f2e" />
      <path
        d="M 212 84 C 232 62 258 46 282 50 C 290 52 296 60 300 72 C 280 66 250 72 230 92 Z"
        fill="#2dd4bf"
      />
      <path d="M 56 56 C 48 40 54 24 68 22 L 82 24 C 84 34 80 44 76 50 Z" fill={ORANGE} />
      <path d={WING} fill={ORANGE} />
      <path d={WING2} fill="#fdba74" />
      <path d={UPPER} fill={`url(#${id}hl)`} />

      {/* Lacing */}
      <path
        d="M 306 92 C 380 112 450 126 512 142"
        stroke="#134e4a"
        strokeWidth="18"
        strokeLinecap="round"
        fill="none"
      />
      {laces.map(({ x, y }, i) => (
        <g key={i}>
          <line x1={x - 15} y1={y + 9} x2={x + 13} y2={y - 4} stroke="#f8fafc" strokeWidth="6" strokeLinecap="round" />
          <circle cx={x - 15} cy={y + 12} r="2.6" fill="#0b3b38" />
        </g>
      ))}

      {/* Midsole + outsole */}
      <path d={MIDSOLE} fill={`url(#${id}mid)`} />
      <g opacity="0.35" stroke="#fff7ed" strokeWidth="1.6" fill="none">
        <path d="M 60 212 C 200 220 400 222 600 214" />
        <path d="M 52 226 C 200 232 400 233 610 226" opacity="0.6" />
      </g>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={70 + i * 34} y={200 + i * 1.5} width="24" height="24" rx="9" fill="#c2410c" opacity="0.55" />
      ))}
      <path d={OUTSOLE} fill={`url(#${id}out)`} />
      {Array.from({ length: 19 }).map((_, i) => (
        <rect key={i} x={84 + i * 25} y="258" width="13" height="7" rx="2" fill="#431407" opacity="0.7" />
      ))}
      {sheen >= 0 && (
        <g clipPath={`url(#${id}sole)`}>
          <rect x={sx} y="140" width="120" height="140" fill={`url(#${id}sh)`} transform={`skewX(-20)`} />
        </g>
      )}
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Night city background                                               */
/* ------------------------------------------------------------------ */

const LAYERS = [
  { base: 0.3, vary: 0.26, color: '#111c3a', speed: 0.25, win: 0.45 },
  { base: 0.18, vary: 0.24, color: '#0a1229', speed: 0.6, win: 0.7 },
  { base: 0.08, vary: 0.16, color: '#04070f', speed: 1.3, win: 0.9 },
];

const City: React.FC<{ id: string; dim?: number; blur?: number; drift?: number }> = ({
  id,
  dim = 0,
  blur = 0,
  drift = 1,
}) => {
  const f = useCurrentFrame();
  const { W, H, u, aspect } = useLayout();
  const gy = H * (aspect === 'portrait' ? 0.64 : 0.8);

  const layers = LAYERS.map((L, li) => {
    const out: { x: number; w: number; h: number; r: number }[] = [];
    let x = -60 * u;
    let i = 0;
    while (x < W * 1.5) {
      const w = (54 + rnd(li * 997 + i) * 120) * u * (1 + li * 0.35);
      const h = gy * (L.base + rnd(li * 557 + i * 3 + 1) * L.vary);
      out.push({ x, w, h, r: rnd(li * 31 + i * 7 + 2) });
      x += w + 3 * u;
      i++;
    }
    return out;
  });

  const trails = Array.from({ length: 9 }).map((_, k) => {
    const dir = k % 2 ? 1 : -1;
    const speed = (10 + rnd(k + 40) * 14) * u * dir * drift;
    const w = W * (0.12 + rnd(k + 60) * 0.2);
    const span = W * 1.6;
    const x = mod(rnd(k + 80) * span + f * speed, span) - W * 0.3;
    const y = gy + (H - gy) * (0.08 + (k / 9) * 0.5);
    return { x, y, w, warm: dir > 0, k };
  });

  return (
    <AbsoluteFill data-layer="background" style={{ filter: blur ? `blur(${blur}px)` : undefined }}>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ display: 'block' }}>
        <defs>
          <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#02040a" />
            <stop offset="0.55" stopColor="#0a1430" />
            <stop offset="0.8" stopColor="#1b2147" />
            <stop offset="1" stopColor="#2a1f3d" />
          </linearGradient>
          <radialGradient id={`${id}haze`} cx="0.5" cy="1" r="0.7">
            <stop offset="0" stopColor="#f97316" stopOpacity="0.32" />
            <stop offset="1" stopColor="#f97316" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`${id}moon`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#99f6e4" stopOpacity="0.5" />
            <stop offset="1" stopColor="#99f6e4" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}ground`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1226" />
            <stop offset="1" stopColor="#010205" />
          </linearGradient>
          <linearGradient id={`${id}fog`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2dd4bf" stopOpacity="0" />
            <stop offset="0.5" stopColor="#2dd4bf" stopOpacity="0.12" />
            <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${id}tw`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#fb923c" stopOpacity="0" />
            <stop offset="0.85" stopColor="#fb923c" stopOpacity="0.9" />
            <stop offset="1" stopColor="#fff7ed" stopOpacity="1" />
          </linearGradient>
          <linearGradient id={`${id}tc`} x1="1" y1="0" x2="0" y2="0">
            <stop offset="0" stopColor="#5eead4" stopOpacity="0" />
            <stop offset="0.85" stopColor="#99f6e4" stopOpacity="0.8" />
            <stop offset="1" stopColor="#ffffff" stopOpacity="1" />
          </linearGradient>
          {LAYERS.map((L, li) => (
            <React.Fragment key={li}>
              <pattern id={`${id}w${li}`} width={16 * u} height={22 * u} patternUnits="userSpaceOnUse">
                <rect x={4 * u} y={6 * u} width={7 * u} height={10 * u} fill="#fbbf24" opacity={0.16 * L.win} />
              </pattern>
              <pattern id={`${id}l${li}`} width={48 * u} height={66 * u} patternUnits="userSpaceOnUse">
                <rect x={4 * u} y={6 * u} width={7 * u} height={10 * u} fill="#fde68a" opacity={0.85 * L.win} />
                <rect x={36 * u} y={50 * u} width={7 * u} height={10 * u} fill="#5eead4" opacity={0.6 * L.win} />
                <rect x={20 * u} y={28 * u} width={7 * u} height={10 * u} fill="#fed7aa" opacity={0.5 * L.win} />
              </pattern>
            </React.Fragment>
          ))}
        </defs>

        <rect width={W} height={H} fill={`url(#${id}sky)`} />
        <circle cx={W * 0.8} cy={H * 0.16} r={260 * u} fill={`url(#${id}moon)`} />
        <circle cx={W * 0.8} cy={H * 0.16} r={34 * u} fill="#e6fffb" opacity="0.85" />
        <rect y={gy - H * 0.45} width={W} height={H * 0.45} fill={`url(#${id}haze)`} />

        {layers.map((bs, li) => (
          <g key={li} transform={`translate(${-f * LAYERS[li].speed * u * drift} 0)`}>
            {bs.map((b, bi) => (
              <g key={bi}>
                <rect x={b.x} y={gy - b.h} width={b.w} height={b.h + 2} fill={LAYERS[li].color} />
                {b.r > 0.82 && (
                  <rect
                    x={b.x + b.w * 0.45}
                    y={gy - b.h - 40 * u}
                    width={3 * u}
                    height={40 * u}
                    fill={LAYERS[li].color}
                  />
                )}
                {b.r > 0.82 && (
                  <circle
                    cx={b.x + b.w * 0.45 + 1.5 * u}
                    cy={gy - b.h - 42 * u}
                    r={4 * u}
                    fill="#f87171"
                    opacity={Math.floor((f + bi * 7) / 18) % 2 ? 0.95 : 0.25}
                  />
                )}
                <rect
                  x={b.x + 5 * u}
                  y={gy - b.h + 10 * u}
                  width={Math.max(0, b.w - 10 * u)}
                  height={Math.max(0, b.h - 10 * u)}
                  fill={`url(#${id}w${li})`}
                />
                {b.r > 0.3 && (
                  <rect
                    x={b.x + 5 * u}
                    y={gy - b.h + 10 * u}
                    width={Math.max(0, b.w - 10 * u)}
                    height={Math.max(0, b.h - 10 * u)}
                    fill={`url(#${id}l${li})`}
                  />
                )}
              </g>
            ))}
          </g>
        ))}

        <rect y={gy - 120 * u} width={W} height={200 * u} fill={`url(#${id}fog)`} />
        <rect y={gy} width={W} height={H - gy} fill={`url(#${id}ground)`} />
        <rect y={gy} width={W} height={2 * u} fill="#2dd4bf" opacity="0.35" />
        {trails.map((t) => (
          <rect
            key={t.k}
            x={t.x}
            y={t.y}
            width={t.w}
            height={(2 + (t.k % 3)) * u}
            rx={2 * u}
            fill={`url(#${id}${t.warm ? 'tw' : 'tc'})`}
            opacity={0.75}
          />
        ))}
      </svg>
      <AbsoluteFill style={{ background: '#02040a', opacity: dim }} />
    </AbsoluteFill>
  );
};

const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.6 }) => (
  <AbsoluteFill
    data-layer="vignette"
    style={{
      background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`,
      pointerEvents: 'none',
    }}
  />
);

/* ------------------------------------------------------------------ */
/* Shot 1 — Product hero                                              */
/* ------------------------------------------------------------------ */

const Shot1: React.FC = () => {
  const f = useCurrentFrame();
  const { W, H, u, pick } = useLayout();

  const shoeW = pick(W * 0.54, W * 0.88, W * 0.78);
  const shoeH = shoeW * SHOE_RATIO;
  const cy = pick(H * 0.44, H * 0.36, H * 0.42);

  // Slide in from the left, fully landed by frame 22 (< 0:01).
  const enter = ease(f, 0, 22);
  const vel = enter - ease(f - 1, 0, 22);
  const startX = -(W / 2 + shoeW / 2 + 80 * u);
  const x = (1 - enter) * startX;
  const skew = Math.min(vel * 70, 16);
  const rot = interpolate(enter, [0, 1], [-7, 0]);
  const settle = ease(f, 18, 40);
  const bob = Math.sin((f - 22) / 14) * 5 * u * settle;
  const push = interpolate(f, [22, 90], [1, 1.045], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SOFT });

  // Caption, fully visible by frame 24.
  const cap = ease(f, 6, 24);
  // Lower-third subtitle, fully visible by frame 24.
  const box = ease(f, 2, 16);
  const capBottom = pick(H * 0.07, H * 0.38, H * 0.07);
  const capSize = pick(120, 110, 100) * pick(u, 1, u);
  const bar = ease(f, 12, 30);

  const glow = ease(f, 10, 40);

  return (
    <AbsoluteFill style={{ background: '#02040a', overflow: 'hidden' }}>
      <City id="s1" dim={0.1} />
      {/* teal spotlight behind product */}
      <div
        style={{
          position: 'absolute',
          left: W / 2 - shoeW * 0.8,
          top: cy - shoeH * 1.1,
          width: shoeW * 1.6,
          height: shoeH * 2.2,
          background: 'radial-gradient(ellipse at center, rgba(20,184,166,0.35) 0%, rgba(20,184,166,0) 62%)',
          opacity: glow,
        }}
      />
      {/* speed streaks */}
      {[0.28, 0.44, 0.6, 0.74].map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: W / 2 - shoeW / 2 + x - shoeW * (0.5 + i * 0.12),
            top: cy - shoeH / 2 + shoeH * p,
            width: shoeW * (0.6 + i * 0.12),
            height: (3 + (i % 2) * 2) * u,
            borderRadius: 4 * u,
            background: `linear-gradient(90deg, rgba(45,212,191,0), ${i % 2 ? 'rgba(251,146,60,0.9)' : 'rgba(94,234,212,0.9)'})`,
            opacity: Math.min(1, vel * 12),
          }}
        />
      ))}
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left: W / 2 - shoeW / 2 + x,
          top: cy - shoeH / 2,
          width: shoeW,
          height: shoeH,
          transform: `translateY(${bob}px) rotate(${rot}deg) skewX(${-skew}deg) scale(${push})`,
          transformOrigin: '50% 80%',
        }}
      >
        <Shoe id="shoe1" width={shoeW} sheen={interpolate(f, [20, 70], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      </div>

      {/* Lower-third subtitle. On 9:16 it sits as low as the delivery rules allow
          (its bottom edge stays above the bottom-35% no-text zone). */}
      <div
        style={{
          position: 'absolute',
          bottom: capBottom,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            position: 'relative',
            padding: `${0.14 * capSize}px ${0.42 * capSize}px ${0.18 * capSize}px`,
            borderRadius: 0.16 * capSize,
            background: 'rgba(2,4,10,0.72)',
            backdropFilter: `blur(${18 * u}px)`,
            boxShadow: `0 ${18 * u}px ${60 * u}px rgba(0,0,0,0.55), inset 0 0 0 ${1.5 * u}px rgba(255,255,255,0.08)`,
            opacity: box,
            transform: `translateY(${(1 - box) * 24 * u}px) scale(${interpolate(box, [0, 1], [0.94, 1])})`,
            overflow: 'hidden',
          }}
        >
          <div
            data-layer="caption"
            style={{
              fontFamily: FONT,
              fontSize: capSize,
              fontWeight: 900,
              letterSpacing: '-0.03em',
              lineHeight: 1.05,
              color: INK,
              whiteSpace: 'nowrap',
              opacity: cap,
              transform: `translateY(${(1 - cap) * 60}%)`,
            }}
          >
            Run the city
          </div>
          <div
            data-layer="accent"
            style={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              width: `${bar * 100}%`,
              height: 6 * u,
              background: `linear-gradient(90deg, ${TEAL}, ${ORANGE})`,
            }}
          />
        </div>
      </div>
      <Vignette strength={0.55} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 2 — Detail                                                     */
/* ------------------------------------------------------------------ */

const Shot2: React.FC = () => {
  const f = useCurrentFrame();
  const { W, H, u, fps, aspect, pick } = useLayout();

  // Macro close-up of the sole, slow tracking move along the heel.
  const shoeW = pick(W * 2.3, W * 3.4, W * 2.7);
  const s = shoeW / 640;
  const ax = W / 2;
  const ay = pick(H * 0.64, H * 0.7, H * 0.68);
  const cx = interpolate(f, [0, 120], [150, 300], { easing: SOFT });
  const zoomS = spring({ frame: f, fps, config: { damping: 200 }, durationInFrames: 40 });
  const zoom = interpolate(zoomS, [0, 1], [1.14, 1]);
  const sheen = interpolate(f, [8, 90], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: SOFT });

  // Wordmark: absent at 0:03, fully visible by 0:04.5.
  const wm = ease(f, 14, 46);
  const wmSize = pick(150, Math.min(118, W * 0.11), 104 * u);
  const wmStyle: React.CSSProperties =
    aspect === 'landscape'
      ? { left: W * 0.07, top: H * 0.11 }
      : aspect === 'portrait'
        ? { left: 0, right: 0, top: H * 0.17, display: 'flex', justifyContent: 'center' }
        : { left: W * 0.08, top: H * 0.08 };

  // Price tag: in from 0:03.1, held to the cut.
  const tagIn = spring({ frame: f - 4, fps, config: { damping: 13, stiffness: 170, mass: 0.8 } });
  const tagOp = ease(f, 4, 12);
  const tagSize = pick(96, 100, 80 * u);
  const tagPos: React.CSSProperties =
    aspect === 'landscape'
      ? { right: W * 0.08, top: H * 0.3 }
      : aspect === 'portrait'
        ? { left: 0, right: 0, top: H * 0.43, display: 'flex', justifyContent: 'center' }
        : { right: W * 0.08, top: H * 0.34 };

  return (
    <AbsoluteFill style={{ background: '#02040a', overflow: 'hidden' }}>
      <City id="s2" dim={0.35} blur={14 * u} drift={0.6} />
      <AbsoluteFill
        style={{
          background:
            'radial-gradient(ellipse at 70% 75%, rgba(249,115,22,0.28) 0%, rgba(249,115,22,0) 55%), radial-gradient(ellipse at 20% 30%, rgba(20,184,166,0.22) 0%, rgba(20,184,166,0) 50%)',
        }}
      />
      <div style={{ position: 'absolute', left: ax, top: ay }}>
        <div
          data-layer="product"
          style={{
            transform: `rotate(-3deg) scale(${zoom}) translate(${-cx * s}px, ${-214 * s}px)`,
            transformOrigin: '0 0',
          }}
        >
          <Shoe id="shoe2" width={shoeW} sheen={sheen} shadow={false} />
        </div>
      </div>
      {/* legibility gradient at the top */}
      <AbsoluteFill
        style={{
          background: 'linear-gradient(180deg, rgba(2,4,10,0.75) 0%, rgba(2,4,10,0) 45%)',
        }}
      />

      <div style={{ position: 'absolute', ...wmStyle }}>
        <div
          data-layer="wordmark"
          style={{
            fontFamily: FONT,
            fontSize: wmSize,
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '0.2em',
            marginRight: aspect === 'portrait' ? '-0.2em' : 0,
            lineHeight: 1,
            color: INK,
            whiteSpace: 'nowrap',
            opacity: wm,
            filter: `blur(${(1 - wm) * 12}px)`,
            transform: `translateY(${(1 - wm) * 30 * u}px)`,
            clipPath: `inset(-20% ${(1 - wm) * 100}% -20% -5%)`,
            textShadow: '0 8px 50px rgba(0,0,0,0.6)',
          }}
        >
          KESTREL
        </div>
      </div>

      <div style={{ position: 'absolute', ...tagPos }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: tagSize * 0.28,
            padding: `${tagSize * 0.22}px ${tagSize * 0.42}px ${tagSize * 0.22}px ${tagSize * 0.62}px`,
            background: 'linear-gradient(180deg, #fb923c 0%, #ea580c 100%)',
            clipPath: `polygon(${tagSize * 0.36}px 0, 100% 0, 100% 100%, ${tagSize * 0.36}px 100%, 0 50%)`,
            borderRadius: tagSize * 0.08,
            opacity: tagOp,
            transform: `scale(${interpolate(tagIn, [0, 1], [0.6, 1])}) rotate(${interpolate(tagIn, [0, 1], [-8, -2])}deg)`,
            transformOrigin: '0% 50%',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          <div
            style={{
              width: tagSize * 0.16,
              height: tagSize * 0.16,
              borderRadius: '50%',
              background: '#0b1220',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)',
            }}
          />
          <div
            data-layer="price"
            style={{
              fontFamily: FONT,
              fontSize: tagSize,
              fontWeight: 800,
              letterSpacing: '-0.03em',
              lineHeight: 1,
              color: '#0b1220',
              whiteSpace: 'nowrap',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            €149
          </div>
        </div>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 3 — Call to action                                             */
/* ------------------------------------------------------------------ */

const Shot3: React.FC = () => {
  const f = useCurrentFrame();
  const { W, H, u, fps, aspect, pick } = useLayout();

  const shoeW = pick(W * 0.46, W * 0.72, W * 0.62);
  const shoeH = shoeW * SHOE_RATIO;
  const scx = pick(W * 0.71, W * 0.5, W * 0.5);
  const scy = pick(H * 0.5, H * 0.335, H * 0.37);
  const rise = spring({ frame: f, fps, config: { damping: 16, mass: 0.9 } });
  const float = Math.sin(f / 18) * 8 * u;
  const tilt = interpolate(rise, [0, 1], [-16, -6]) + Math.sin(f / 30) * 1.2;

  const head = ease(f, 8, 30);
  const btn = ease(f, 26, 48);
  const sheenT = f > 50 ? mod(f - 50, 60) / 60 : -1;
  const sx = sheenT < 0 ? -40 : interpolate(sheenT, [0, 1], [-30, 130]);
  const pulse = f > 48 ? 0.5 + 0.5 * Math.sin((f - 48) / 9) : 0;

  const wmSize = pick(68, 80, 60 * u);
  const headSize = pick(150, 100, 84 * u);
  const btnSize = pick(76, 72, 64 * u);
  // Full-width install bar. 16:9 and 1:1 pin it to the bottom edge; on 9:16 the
  // storyboard forbids text in the bottom 35%, so it pins to that line instead.
  const barInset = pick(W * 0.04, W * 0.05, W * 0.05);
  const barBottom = pick(H * 0.05, H * 0.37, H * 0.05);
  const open = ease(f, 26, 46);

  const colLeft = W * 0.07;
  const centered = aspect !== 'landscape';
  const wmTop = pick(H * 0.13, H * 0.16, H * 0.07);
  const headTop = pick(H * 0.3, H * 0.455, H * 0.63);

  const block = (top: number): React.CSSProperties =>
    centered
      ? { position: 'absolute', top, left: 0, right: 0, display: 'flex', justifyContent: 'center' }
      : { position: 'absolute', top, left: colLeft };

  return (
    <AbsoluteFill style={{ background: '#02040a', overflow: 'hidden' }}>
      <City id="s3" dim={0.55} blur={6 * u} drift={0.4} />
      <div
        style={{
          position: 'absolute',
          left: scx - shoeW,
          top: scy - shoeW * 0.75,
          width: shoeW * 2,
          height: shoeW * 1.5,
          background:
            'radial-gradient(ellipse at center, rgba(20,184,166,0.38) 0%, rgba(20,184,166,0.08) 40%, rgba(20,184,166,0) 65%)',
          opacity: rise,
        }}
      />
      {/* orbit ring */}
      <svg
        width={shoeW * 1.3}
        height={shoeW * 0.42}
        style={{
          position: 'absolute',
          left: scx - shoeW * 0.65,
          top: scy + shoeH * 0.18,
          overflow: 'visible',
          opacity: rise * 0.9,
        }}
        viewBox="0 0 100 32"
        preserveAspectRatio="none"
        data-layer="ring"
      >
        <ellipse cx="50" cy="16" rx="48" ry="12" fill="none" stroke={ORANGE} strokeWidth="0.5" opacity="0.7" />
        <ellipse
          cx="50"
          cy="16"
          rx="48"
          ry="12"
          fill="none"
          stroke="#fdba74"
          strokeWidth="1"
          strokeDasharray="30 270"
          strokeDashoffset={-f * 1.6}
        />
      </svg>
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left: scx - shoeW / 2,
          top: scy - shoeH / 2,
          width: shoeW,
          height: shoeH,
          opacity: interpolate(rise, [0, 0.4], [0, 1], { extrapolateRight: 'clamp' }),
          transform: `translateY(${(1 - rise) * H * 0.25 + float}px) rotate(${tilt}deg) scale(${interpolate(rise, [0, 1], [0.86, 1])})`,
        }}
      >
        <Shoe id="shoe3" width={shoeW} sheen={interpolate(f, [30, 110], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })} />
      </div>

      {/* Wordmark — on screen for the whole shot */}
      <div style={block(wmTop)}>
        <div
          data-layer="wordmark"
          style={{
            fontFamily: FONT,
            fontSize: wmSize,
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '0.2em',
            marginRight: centered ? '-0.2em' : 0,
            lineHeight: 1,
            color: INK,
            whiteSpace: 'nowrap',
          }}
        >
          KESTREL
        </div>
      </div>

      {/* Headline */}
      <div style={block(headTop)}>
        <div style={{ overflow: 'hidden', paddingBottom: headSize * 0.12 }}>
          <div
            data-layer="headline"
            style={{
              fontFamily: FONT,
              fontSize: headSize,
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: INK,
              maxWidth: pick(W * 0.46, W * 0.9, W * 0.9),
              textAlign: centered ? 'center' : 'left',
              whiteSpace: aspect === 'landscape' ? 'normal' : 'nowrap',
              opacity: head,
              transform: `translateY(${(1 - head) * 100}%)`,
              textShadow: '0 8px 50px rgba(0,0,0,0.6)',
            }}
          >
            Out 28 November
          </div>
        </div>
      </div>

      {/* Install-bar CTA — full width, fully visible by 0:08.6 */}
      {aspect !== 'portrait' && (
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: H * 0.32,
            background: 'linear-gradient(180deg, rgba(2,4,10,0) 0%, rgba(2,4,10,0.85) 100%)',
            opacity: btn,
          }}
        />
      )}
      <div
        style={{
          position: 'absolute',
          left: barInset,
          right: barInset,
          bottom: barBottom,
          opacity: btn,
          transform: `translateY(${(1 - btn) * 24 * u}px)`,
          clipPath: `inset(-40% ${(1 - open) * 30}% -40% ${(1 - open) * 30}% round ${btnSize * 0.5}px)`,
        }}
      >
        <div
          data-layer="button"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            boxSizing: 'border-box',
            fontFamily: FONT,
            fontSize: btnSize,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#0b1220',
            whiteSpace: 'nowrap',
            padding: `${btnSize * 0.5}px ${btnSize * 0.6}px`,
            borderRadius: btnSize * 0.42,
            background: `linear-gradient(100deg, rgba(255,255,255,0) ${sx - 10}%, rgba(255,255,255,0.6) ${sx}%, rgba(255,255,255,0) ${sx + 10}%), linear-gradient(180deg, #fdba74 0%, ${ORANGE} 45%, #ea580c 100%)`,
            boxShadow: `0 ${16 * u}px ${50 * u}px rgba(249,115,22,${0.3 + pulse * 0.3}), inset 0 ${2 * u}px 0 rgba(255,255,255,0.55), inset 0 -${4 * u}px 0 rgba(124,45,18,0.35)`,
          }}
        >
          Get early access
        </div>
      </div>
      <Vignette strength={0.5} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */

export default function Video() {
  const [s1, s2, s3] = composition.shots;
  return (
    <AbsoluteFill style={{ background: '#02040a', fontFamily: FONT }}>
      <Sequence from={s1.from} durationInFrames={s1.durationInFrames} name={s1.title}>
        <Shot1 />
      </Sequence>
      <Sequence from={s2.from} durationInFrames={s2.durationInFrames} name={s2.title}>
        <Shot2 />
      </Sequence>
      <Sequence from={s3.from} durationInFrames={s3.durationInFrames} name={s3.title}>
        <Shot3 />
      </Sequence>
    </AbsoluteFill>
  );
}
