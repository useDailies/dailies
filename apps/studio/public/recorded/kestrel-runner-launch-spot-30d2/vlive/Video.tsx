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

/* ──────────────────────────────────────────────────────────────────────────
   Kestrel Runner — launch spot
   12s @ 30fps · 16:9 / 9:16 / 1:1 from one component
   ────────────────────────────────────────────────────────────────────────── */

export const composition = {
  fps: 30,
  durationInFrames: 360,
  shots: [
    { n: 1, title: 'Product hero', from: 0, durationInFrames: 90 },
    { n: 2, title: 'Detail', from: 90, durationInFrames: 120 },
    { n: 3, title: 'Call to action', from: 210, durationInFrames: 150 },
  ],
};

const C = {
  teal: '#14b8a6',
  tealBright: '#2dd4bf',
  tealLight: '#99f6e4',
  tealDeep: '#0f766e',
  tealInk: '#083a37',
  orange: '#f97316',
  orangeLight: '#fdba74',
  orangeDeep: '#c2410c',
  orangeBurnt: '#7c2d12',
  ink: '#0b0f19',
  paper: '#f8fafc',
};

const FONT = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';
const EASE_OUT = Easing.bezier(0.16, 1, 0.3, 1);
const CLAMP = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

// Deterministic hash, no Math.random.
const rand = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Layout = 'landscape' | 'portrait' | 'square';
const useLayout = () => {
  const { width, height } = useVideoConfig();
  const r = width / height;
  const layout: Layout = r > 1.2 ? 'landscape' : r < 0.83 ? 'portrait' : 'square';
  const u = Math.min(width, height) / 1080;
  return { width, height, layout, u };
};

const pick = <T,>(layout: Layout, v: { landscape: T; portrait: T; square: T }) => v[layout];

/* ── Shoe ──────────────────────────────────────────────────────────────── */

// viewBox 0 0 600 300 — sole bottom sits at y≈262 (SOLE_BOTTOM).
const SOLE_BOTTOM = 262 / 300;

const UPPER =
  'M 64 198 C 50 160 56 118 86 96 C 100 86 120 84 136 92 C 158 104 190 106 214 94 L 246 64 C 256 56 270 58 274 70 L 292 114 C 344 132 414 142 474 152 C 530 162 566 182 578 206 C 540 202 420 200 300 200 L 64 200 Z';
const MIDSOLE =
  'M 46 202 C 40 226 60 250 94 250 L 540 246 C 570 244 588 230 586 214 C 584 200 568 194 548 196 L 300 200 L 110 194 C 76 192 50 190 46 202 Z';
const OUTSOLE =
  'M 58 238 C 64 254 80 262 100 262 L 536 258 C 560 257 578 248 584 232 C 570 244 552 248 540 248 L 94 252 C 78 252 66 248 58 238 Z';

const Shoe: React.FC<{ id: string; width: number; shadow?: number }> = ({ id, width, shadow = 1 }) => {
  const lugs = Array.from({ length: 19 }, (_, i) => 96 + i * 24);
  const laces = Array.from({ length: 5 }, (_, i) => i);
  const pods = [150, 230, 310, 390, 470];
  return (
    <svg
      data-layer="product"
      width={width}
      height={width / 2}
      viewBox="0 0 600 300"
      style={{ overflow: 'visible', display: 'block' }}
    >
      <defs>
        <linearGradient id={`${id}-up`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.tealBright} />
          <stop offset="55%" stopColor={C.teal} />
          <stop offset="100%" stopColor={C.tealDeep} />
        </linearGradient>
        <linearGradient id={`${id}-side`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#000" stopOpacity="0.35" />
          <stop offset="30%" stopColor="#000" stopOpacity="0" />
          <stop offset="75%" stopColor="#fff" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-sole`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.orangeLight} />
          <stop offset="35%" stopColor={C.orange} />
          <stop offset="100%" stopColor={C.orangeDeep} />
        </linearGradient>
        <linearGradient id={`${id}-tongue`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.tealLight} />
          <stop offset="100%" stopColor={C.teal} />
        </linearGradient>
        <pattern id={`${id}-mesh`} width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="3.5" cy="3.5" r="1.25" fill={C.tealInk} opacity="0.45" />
        </pattern>
        <clipPath id={`${id}-clip`}>
          <path d={UPPER} />
        </clipPath>
        <filter id={`${id}-blur`} x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="8" />
        </filter>
      </defs>

      {/* contact shadow */}
      <ellipse cx="318" cy="268" rx="290" ry="14" fill="#000" opacity={0.65 * shadow} filter={`url(#${id}-blur)`} />

      {/* upper */}
      <path d={UPPER} fill={`url(#${id}-up)`} />
      <g clipPath={`url(#${id}-clip)`}>
        <rect x="0" y="0" width="600" height="300" fill={`url(#${id}-mesh)`} />
        <rect x="0" y="0" width="600" height="300" fill={`url(#${id}-side)`} />
        {/* heel counter */}
        <path d="M 40 200 C 44 150 56 110 86 92 C 100 130 108 168 116 200 Z" fill={C.tealDeep} />
        {/* toe cap */}
        <path d="M 466 150 C 530 160 568 182 580 210 L 466 210 C 452 190 452 166 466 150 Z" fill={C.tealDeep} opacity="0.9" />
        {/* kestrel wing stripes */}
        <path d="M 150 188 C 220 150 310 128 420 146 L 440 156 C 330 146 248 166 172 198 Z" fill={C.orange} />
        <path d="M 200 192 C 260 168 330 156 410 164 L 424 172 C 340 168 272 180 214 200 Z" fill={C.orangeLight} opacity="0.9" />
        {/* top-edge highlight */}
        <path d="M 92 100 C 120 88 150 104 200 100 L 210 104 C 160 112 124 98 96 108 Z" fill="#fff" opacity="0.25" />
        <path d="M 296 118 C 360 136 430 144 480 156 C 520 164 552 178 566 194 C 540 176 500 166 470 160 C 410 150 350 140 296 124 Z" fill="#fff" opacity="0.22" />
      </g>

      {/* collar lining */}
      <path d="M 90 98 C 110 86 128 90 140 96 C 160 108 192 110 214 98 L 210 110 C 186 120 156 116 136 106 C 120 98 104 100 90 106 Z" fill={C.tealInk} />
      {/* heel pull tab */}
      <path d="M 78 100 L 70 80 C 70 74 78 72 82 76 L 94 96 Z" fill={C.orange} />
      {/* tongue */}
      <path d="M 214 96 L 246 64 C 256 56 270 58 274 70 L 290 114 L 236 118 Z" fill={`url(#${id}-tongue)`} />
      {/* laces */}
      {laces.map((i) => {
        const x = 238 + i * 21;
        const y = 106 + i * 6.5;
        return (
          <g key={i}>
            <line x1={x - 12} y1={y - 7} x2={x + 12} y2={y + 9} stroke="#e2e8f0" strokeWidth="5" strokeLinecap="round" />
            <line x1={x - 12} y1={y + 9} x2={x + 12} y2={y - 7} stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
          </g>
        );
      })}

      {/* midsole */}
      <path d={MIDSOLE} fill={`url(#${id}-sole)`} />
      {pods.map((x, i) => (
        <ellipse key={x} cx={x} cy={226 + (i % 2) * 2} rx="26" ry="9" fill={C.orangeDeep} opacity="0.55" />
      ))}
      <path d="M 64 220 C 160 210 240 232 320 222 S 480 210 570 220" stroke={C.orangeLight} strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M 60 206 C 200 198 400 202 560 204" stroke="#fff" strokeWidth="2.5" fill="none" opacity="0.4" />

      {/* outsole + lugs */}
      <path d={OUTSOLE} fill={C.orangeBurnt} />
      {lugs.map((x) => (
        <rect key={x} x={x} y="251" width="12" height="9" rx="2" fill={C.orangeDeep} />
      ))}
    </svg>
  );
};

/* ── Night city ────────────────────────────────────────────────────────── */

type Building = { x: number; w: number; h: number; lit: number; i: number };
const makeBuildings = (seed: number, width: number, u: number, minH: number, maxH: number) => {
  const out: Building[] = [];
  let x = -60 * u;
  let i = 0;
  while (x < width + 500 * u) {
    const w = (70 + rand(seed + i * 3) * 150) * u;
    const h = minH + Math.pow(rand(seed + i * 3 + 1), 1.4) * (maxH - minH);
    out.push({ x, w, h, lit: rand(seed + i * 3 + 2), i });
    x += w + (6 + rand(seed + i * 7) * 18) * u;
    i++;
  }
  return out;
};

const NightCity: React.FC<{
  groundY: number;
  drift: number;
  blur?: number;
  glowX?: number;
  glowY?: number;
  warm?: number;
}> = ({ groundY, drift, blur = 0, glowX = 0.5, glowY, warm = 0.5 }) => {
  const frame = useCurrentFrame();
  const { width, height, u } = useLayout();
  const far = makeBuildings(11, width, u, height * 0.08, groundY * 0.5);
  const near = makeBuildings(97, width, u, height * 0.05, groundY * 0.34);
  const g = (groundY / height) * 100;
  const stars = Array.from({ length: 60 }, (_, i) => ({
    x: rand(i * 5.1) * width,
    y: rand(i * 9.7) * groundY * 0.55,
    r: (0.6 + rand(i * 2.3) * 1.4) * u,
    o: 0.2 + rand(i * 4.4) * 0.5,
  }));
  const blink = 0.4 + 0.6 * Math.max(0, Math.sin(frame / 5));
  const gy = glowY ?? groundY * 0.85;

  return (
    <AbsoluteFill
      data-layer="background"
      style={{
        background: `linear-gradient(180deg, #03050d 0%, #08102a ${g * 0.5}%, #171a48 ${g * 0.85}%, #3b1f3f ${g}%, #06070d ${g}%, #020308 100%)`,
      }}
    >
      <svg
        width={width}
        height={height}
        style={{ position: 'absolute', inset: 0, filter: blur ? `blur(${blur}px)` : undefined }}
      >
        <defs>
          <pattern id="win-far" width={12 * u} height={18 * u} patternUnits="userSpaceOnUse">
            <rect x={3 * u} y={5 * u} width={5 * u} height={7 * u} fill="#93a5ff" />
          </pattern>
          <pattern id="win-near" width={16 * u} height={24 * u} patternUnits="userSpaceOnUse">
            <rect x={4 * u} y={7 * u} width={7 * u} height={10 * u} fill="#ffc77a" />
          </pattern>
          <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3b2a6b" stopOpacity="0" />
            <stop offset="100%" stopColor="#ff7a3d" stopOpacity={0.18 * warm + 0.06} />
          </linearGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#141428" />
            <stop offset="100%" stopColor="#020308" />
          </linearGradient>
        </defs>

        {stars.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#cbd5ff" opacity={s.o} />
        ))}

        <g transform={`translate(${-drift * 0.35},0)`}>
          {far.map((b) => (
            <g key={b.i}>
              <rect x={b.x} y={groundY - b.h} width={b.w} height={b.h} fill="#11183a" />
              <rect
                x={b.x + 4 * u}
                y={groundY - b.h + 12 * u}
                width={Math.max(0, b.w - 8 * u)}
                height={Math.max(0, b.h - 12 * u)}
                fill="url(#win-far)"
                opacity={0.06 + b.lit * 0.2}
              />
            </g>
          ))}
        </g>

        <rect x={0} y={groundY * 0.45} width={width} height={groundY * 0.55} fill="url(#haze)" />

        <g transform={`translate(${-drift},0)`}>
          {near.map((b) => (
            <g key={b.i}>
              <rect x={b.x} y={groundY - b.h} width={b.w} height={b.h} fill="#070a17" />
              <rect
                x={b.x + 6 * u}
                y={groundY - b.h + 14 * u}
                width={Math.max(0, b.w - 12 * u)}
                height={Math.max(0, b.h - 14 * u)}
                fill="url(#win-near)"
                opacity={b.lit > 0.35 ? 0.12 + b.lit * 0.4 : 0.05}
              />
              {b.lit > 0.82 ? (
                <>
                  <rect x={b.x + b.w / 2 - 1.5 * u} y={groundY - b.h - 40 * u} width={3 * u} height={40 * u} fill="#070a17" />
                  <circle cx={b.x + b.w / 2} cy={groundY - b.h - 40 * u} r={3.5 * u} fill="#ff3b3b" opacity={blink} />
                </>
              ) : null}
            </g>
          ))}
        </g>

        <rect x={0} y={groundY} width={width} height={height - groundY} fill="url(#ground)" />
        <rect x={0} y={groundY - 1 * u} width={width} height={2 * u} fill={C.tealBright} opacity={0.35} />
        {Array.from({ length: 6 }, (_, i) => {
          const y = groundY + (18 + i * i * 14) * u;
          return y < height ? (
            <rect key={i} x={0} y={y} width={width} height={(1 + i * 0.6) * u} fill="#6b7cff" opacity={0.08 - i * 0.01} />
          ) : null;
        })}
      </svg>

      {/* key-light glow behind the product */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse ${width * 0.5}px ${height * 0.35}px at ${glowX * 100}% ${gy}px, rgba(45,212,191,0.28), rgba(45,212,191,0.06) 55%, transparent 75%)`,
        }}
      />
    </AbsoluteFill>
  );
};

const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.7 }) => (
  <AbsoluteFill
    data-layer="vignette"
    style={{
      pointerEvents: 'none',
      background: `radial-gradient(ellipse at 50% 50%, transparent 45%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);

/* ── Brand mark ────────────────────────────────────────────────────────── */

const LogoMark: React.FC<{ size: number }> = ({ size }) => (
  <svg data-layer="logo-mark" width={size} height={size * 0.75} viewBox="0 0 40 30" style={{ display: 'block' }}>
    <path d="M 0 22 L 26 2 L 19 15 L 40 8 L 12 30 L 18 19 Z" fill={C.orange} />
  </svg>
);

/* ── Shot 1 · Product hero ─────────────────────────────────────────────── */

const ShotHero: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height, layout, u } = useLayout();

  const shoeW = width * pick(layout, { landscape: 0.5, portrait: 0.9, square: 0.78 });
  const groundY = height * pick(layout, { landscape: 0.84, portrait: 0.62, square: 0.86 });
  const cx = width * pick(layout, { landscape: 0.58, portrait: 0.5, square: 0.5 });
  const shoeLeft = cx - shoeW / 2;
  const shoeTop = groundY - SOLE_BOTTOM * (shoeW / 2);

  // Slide: fully in frame by frame 26 (< 0:01).
  const p = interpolate(f, [0, 26], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const startX = -(shoeLeft + shoeW + 120 * u);
  const x = interpolate(p, [0, 1], [startX, 0]);
  const tilt = interpolate(p, [0, 0.7, 1], [-9, 2, 0]);
  const land = spring({ frame: f - 22, fps: 30, config: { damping: 12, stiffness: 180 } });
  const squash = 1 - 0.035 * Math.sin(Math.min(1, land) * Math.PI);
  const float = f > 30 ? Math.sin((f - 30) / 11) * 5 * u : 0;

  const camera = interpolate(f, [0, 90], [1, 1.045], { easing: Easing.inOut(Easing.quad) });

  // Light trails behind the shoe, fading once it lands.
  const trailFade = interpolate(f, [0, 22, 40], [1, 0.8, 0.18], CLAMP);
  const trails = Array.from({ length: 8 }, (_, i) => {
    const len = (260 + rand(i * 3.3) * 520) * u;
    const speed = (38 + rand(i * 1.7) * 30) * u;
    const span = width + len;
    const xx = ((f * speed + rand(i * 8.1) * span) % span) - len;
    const yy = groundY - (12 + rand(i * 6.2) * 0.9 * (shoeW / 2)) * 1;
    return { len, xx, yy, color: i % 3 === 0 ? C.orange : C.tealBright, h: (2 + rand(i) * 3) * u };
  });

  // Impact ripple
  const rip = interpolate(f, [22, 50], [0, 1], { ...CLAMP, easing: Easing.out(Easing.cubic) });

  // Caption: fully visible by frame 24 (< 0:01).
  const c = interpolate(f, [4, 24], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const capSize = pick(layout, { landscape: 136, portrait: 124, square: 112 }) * u;
  const capTop = height * pick(layout, { landscape: 0.12, portrait: 0.2, square: 0.1 });
  const capAlign = layout === 'landscape' ? 'left' : 'center';
  const barW = interpolate(f, [2, 20], [0, 96 * u], { ...CLAMP, easing: EASE_OUT });

  return (
    <AbsoluteFill style={{ backgroundColor: '#03050d', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${camera})` }}>
        <NightCity groundY={groundY} drift={f * 3 * u} glowX={cx / width} glowY={groundY - shoeW * 0.2} warm={0.6} />

        {trails.map((t, i) => (
          <div
            key={i}
            data-layer="light-trail"
            style={{
              position: 'absolute',
              left: t.xx,
              top: t.yy,
              width: t.len,
              height: t.h,
              borderRadius: t.h,
              opacity: trailFade * 0.85,
              background: `linear-gradient(90deg, transparent, ${t.color})`,
              boxShadow: `0 0 ${14 * u}px ${t.color}`,
            }}
          />
        ))}

        <div
          data-layer="ground-ripple"
          style={{
            position: 'absolute',
            left: cx - shoeW * 0.55 * (0.6 + rip * 0.6),
            top: groundY - 12 * u,
            width: shoeW * 1.1 * (0.6 + rip * 0.6),
            height: 24 * u,
            borderRadius: '50%',
            border: `${2 * u}px solid ${C.tealBright}`,
            opacity: (1 - rip) * (f >= 22 ? 0.7 : 0),
            boxShadow: `0 0 ${24 * u}px ${C.teal}`,
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: shoeLeft,
            top: shoeTop + float,
            transform: `translateX(${x}px) rotate(${tilt}deg) scaleY(${squash})`,
            transformOrigin: '50% 90%',
            filter: `drop-shadow(0 ${30 * u}px ${40 * u}px rgba(0,0,0,0.55))`,
          }}
        >
          <Shoe id="hero" width={shoeW} />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: layout === 'landscape' ? width * 0.07 : 0,
          right: layout === 'landscape' ? undefined : 0,
          top: capTop,
          display: 'flex',
          flexDirection: 'column',
          alignItems: layout === 'landscape' ? 'flex-start' : 'center',
        }}
      >
        <div data-layer="accent" style={{ width: barW, height: 8 * u, borderRadius: 4 * u, background: C.orange, marginBottom: 28 * u }} />
        <div
          data-layer="caption"
          style={{
            fontFamily: FONT,
            fontSize: capSize,
            fontWeight: 800,
            letterSpacing: '-0.045em',
            lineHeight: 1,
            color: C.paper,
            whiteSpace: 'nowrap',
            textAlign: capAlign,
            opacity: c,
            transform: `translateY(${(1 - c) * 50 * u}px)`,
            filter: `blur(${(1 - c) * 10 * u}px)`,
            textShadow: `0 ${6 * u}px ${30 * u}px rgba(0,0,0,0.5)`,
          }}
        >
          Run the city
        </div>
      </div>

      <Vignette strength={0.65} />
    </AbsoluteFill>
  );
};

/* ── Shot 2 · Detail ───────────────────────────────────────────────────── */

const ShotDetail: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height, layout, u } = useLayout();

  const shoeW = width * pick(layout, { landscape: 2.3, portrait: 3.0, square: 2.6 });
  const shoeH = shoeW / 2;
  const fx = width * 0.5;
  const fy = height * pick(layout, { landscape: 0.5, portrait: 0.6, square: 0.52 });
  // focus point on the midsole (svg 330,222)
  const pan = interpolate(f, [0, 120], [0.06, -0.06], { easing: Easing.inOut(Easing.sin) }) * width;
  const shoeLeft = fx - (330 / 600) * shoeW + pan;
  const shoeTop = fy - (222 / 300) * shoeH;
  const push = interpolate(f, [0, 120], [1.08, 1.0], { easing: Easing.out(Easing.quad) });
  const enter = interpolate(f, [0, 10], [0, 1], { ...CLAMP, easing: EASE_OUT });

  // light sweep across the sole
  const sweep = interpolate(f, [16, 76], [-0.6, 1.4], { ...CLAMP, easing: Easing.inOut(Easing.cubic) });

  // Wordmark: absent at 0:03 (f=0), fully visible by f=52 (< 0:05).
  const w = interpolate(f, [20, 52], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const wmSize = pick(layout, { landscape: 96, portrait: 92, square: 84 }) * u;
  const ls = interpolate(w, [0, 1], [0.75, 0.34]);

  // Price tag: in by f=22, held through the end (0:04 and 0:06 both covered).
  const t = interpolate(f, [6, 22], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const swing = f > 6 ? 9 * Math.exp(-(f - 6) / 12) * Math.cos((f - 6) / 3.2) : 9;
  const priceSize = pick(layout, { landscape: 72, portrait: 76, square: 64 }) * u;

  const wmStyle: React.CSSProperties = pick(layout, {
    landscape: { left: width * 0.07, top: height * 0.8 },
    portrait: { left: 0, right: 0, top: height * 0.17, justifyContent: 'center' },
    square: { left: 0, right: 0, top: height * 0.82, justifyContent: 'center' },
  });
  const tagStyle: React.CSSProperties = pick(layout, {
    landscape: { right: width * 0.08, top: height * 0.1 },
    portrait: { right: width * 0.1, top: height * 0.3 },
    square: { right: width * 0.08, top: height * 0.08 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#03050d', overflow: 'hidden' }}>
      <NightCity groundY={height * 0.9} drift={f * 1.2 * u} blur={18 * u} glowX={0.5} glowY={fy} warm={0.9} />
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% ${(fy / height) * 100}%, rgba(249,115,22,0.22), transparent 60%)`,
        }}
      />

      <AbsoluteFill style={{ transform: `scale(${push})`, transformOrigin: `${fx}px ${fy}px`, opacity: enter }}>
        <div
          style={{
            position: 'absolute',
            left: shoeLeft,
            top: shoeTop,
            filter: `drop-shadow(0 ${40 * u}px ${60 * u}px rgba(0,0,0,0.6))`,
          }}
        >
          <Shoe id="detail" width={shoeW} shadow={0.6} />
        </div>
      </AbsoluteFill>

      <AbsoluteFill
        data-layer="light-sweep"
        style={{
          mixBlendMode: 'screen',
          background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,237,213,0.35) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`,
        }}
      />
      <Vignette strength={0.75} />

      {/* Wordmark */}
      <div style={{ position: 'absolute', display: 'flex', alignItems: 'center', gap: 22 * u, ...wmStyle }}>
        <div style={{ opacity: w, transform: `translateX(${(1 - w) * -20 * u}px)` }}>
          <LogoMark size={wmSize * 0.8} />
        </div>
        <div
          data-layer="wordmark"
          style={{
            fontFamily: FONT,
            fontSize: wmSize,
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: `${ls}em`,
            marginRight: `-${ls}em`,
            lineHeight: 1,
            color: C.paper,
            whiteSpace: 'nowrap',
            opacity: w,
            filter: `blur(${(1 - w) * 12 * u}px)`,
            textShadow: `0 ${4 * u}px ${24 * u}px rgba(0,0,0,0.6)`,
          }}
        >
          KESTREL
        </div>
      </div>

      {/* Price tag */}
      <div
        style={{
          position: 'absolute',
          ...tagStyle,
          opacity: t,
          transform: `translateY(${(1 - t) * -60 * u}px) rotate(${-4 + swing}deg)`,
          transformOrigin: '12% 50%',
        }}
      >
        <div
          data-layer="price"
          style={{
            fontFamily: FONT,
            fontSize: priceSize,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            color: C.ink,
            padding: `${22 * u}px ${38 * u}px ${22 * u}px ${70 * u}px`,
            borderRadius: 16 * u,
            background: `linear-gradient(135deg, #fff7ed, ${C.orangeLight})`,
            boxShadow: `0 ${20 * u}px ${50 * u}px rgba(0,0,0,0.45), inset 0 ${-4 * u}px 0 rgba(194,65,12,0.25)`,
          }}
        >
          €149
        </div>
        <div
          data-layer="tag-eyelet"
          style={{
            position: 'absolute',
            left: 26 * u,
            top: '50%',
            width: 18 * u,
            height: 18 * u,
            marginTop: -9 * u,
            borderRadius: '50%',
            background: '#1a1205',
            boxShadow: `0 0 0 ${4 * u}px rgba(255,255,255,0.7)`,
          }}
        />
      </div>
    </AbsoluteFill>
  );
};

/* ── Shot 3 · Call to action ───────────────────────────────────────────── */

const ShotCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height, layout, u } = useLayout();

  const shoeW = width * pick(layout, { landscape: 0.42, portrait: 0.88, square: 0.62 });
  const groundY = height * pick(layout, { landscape: 0.8, portrait: 0.86, square: 0.58 });
  const cx = width * pick(layout, { landscape: 0.74, portrait: 0.5, square: 0.5 });
  const shoeLeft = cx - shoeW / 2;
  const shoeTop = groundY - SOLE_BOTTOM * (shoeW / 2);

  // Background + product camera settle (text stays outside the camera so it never drifts).
  const camera = interpolate(f, [0, 36], [1.08, 1], { ...CLAMP, easing: EASE_OUT });
  const drop = spring({ frame: f, fps: 30, config: { damping: 14, stiffness: 120 } });
  const float = Math.sin(f / 13) * 7 * u;
  const tilt = -7 + Math.sin(f / 20) * 1.2;
  const halo = interpolate(f, [0, 150], [0, 40]);

  // Wordmark: visible from the very first frame of the shot.
  const wmSize = pick(layout, { landscape: 56, portrait: 56, square: 48 }) * u;
  const wmLs = interpolate(f, [0, 30], [0.42, 0.34], { ...CLAMP, easing: EASE_OUT });

  // Headline
  const h = interpolate(f, [4, 26], [0, 1], { ...CLAMP, easing: EASE_OUT });
  const hSize = pick(layout, { landscape: 96, portrait: 104, square: 88 }) * u;

  // Button: fully visible by f=40 (frame 250, < 0:09).
  const bo = interpolate(f, [16, 30], [0, 1], CLAMP);
  const bs = interpolate(f, [16, 40], [0.86, 1], { ...CLAMP, easing: Easing.out(Easing.back(1.7)) });
  const sheen = interpolate(f % 75, [0, 40], [-60, 160], CLAMP);
  const pulse = f > 40 ? 0.5 + 0.5 * Math.sin((f - 40) / 9) : 0;
  const bSize = pick(layout, { landscape: 38, portrait: 42, square: 36 }) * u;

  const wmTop = height * pick(layout, { landscape: 0.1, portrait: 0.15, square: 0.07 });
  const hTop = height * pick(layout, { landscape: 0.36, portrait: 0.24, square: 0.64 });
  const bTop = hTop + hSize * 1.05 + pick(layout, { landscape: 70, portrait: 80, square: 40 }) * u;

  const textBox: React.CSSProperties =
    layout === 'landscape'
      ? { position: 'absolute', left: width * 0.07, display: 'flex', justifyContent: 'flex-start' }
      : { position: 'absolute', left: 0, right: 0, display: 'flex', justifyContent: 'center' };

  return (
    <AbsoluteFill style={{ backgroundColor: '#03050d', overflow: 'hidden' }}>
      <AbsoluteFill style={{ transform: `scale(${camera})` }}>
        <NightCity groundY={groundY} drift={f * 1.6 * u} glowX={cx / width} glowY={groundY - shoeW * 0.2} warm={0.7} />

        <svg
          data-layer="halo"
          width={width}
          height={height}
          style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
        >
          <ellipse
            cx={cx}
            cy={groundY}
            rx={shoeW * 0.62}
            ry={shoeW * 0.07}
            fill="none"
            stroke={C.tealBright}
            strokeWidth={2 * u}
            strokeDasharray={`${shoeW * 0.9} ${shoeW * 0.4}`}
            strokeDashoffset={-halo * shoeW * 0.05}
            opacity={0.55}
          />
          <ellipse cx={cx} cy={groundY} rx={shoeW * 0.5} ry={shoeW * 0.05} fill={C.teal} opacity={0.12} />
        </svg>

        <div
          style={{
            position: 'absolute',
            left: shoeLeft,
            top: shoeTop + float,
            transform: `translateY(${(1 - drop) * -80 * u}px) rotate(${tilt}deg)`,
            transformOrigin: '50% 90%',
            filter: `drop-shadow(0 ${30 * u}px ${40 * u}px rgba(0,0,0,0.55))`,
          }}
        >
          <Shoe id="cta" width={shoeW} />
        </div>
      </AbsoluteFill>

      <Vignette strength={0.6} />

      {/* Wordmark */}
      <div style={{ ...textBox, top: wmTop, alignItems: 'center', gap: 18 * u }}>
        <LogoMark size={wmSize * 0.85} />
        <div
          data-layer="wordmark"
          style={{
            fontFamily: FONT,
            fontSize: wmSize,
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: `${wmLs}em`,
            marginRight: `-${wmLs}em`,
            lineHeight: 1,
            color: C.paper,
            whiteSpace: 'nowrap',
          }}
        >
          KESTREL
        </div>
      </div>

      {/* Headline */}
      <div style={{ ...textBox, top: hTop }}>
        <div
          data-layer="headline"
          style={{
            fontFamily: FONT,
            fontSize: hSize,
            fontWeight: 800,
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            color: C.paper,
            whiteSpace: 'nowrap',
            opacity: h,
            transform: `translateY(${(1 - h) * 40 * u}px)`,
            filter: `blur(${(1 - h) * 8 * u}px)`,
            textShadow: `0 ${6 * u}px ${30 * u}px rgba(0,0,0,0.55)`,
          }}
        >
          Out 28 November
        </div>
      </div>

      {/* Button */}
      <div style={{ ...textBox, top: bTop }}>
        <div
          data-layer="button"
          style={{
            fontFamily: FONT,
            fontSize: bSize,
            fontWeight: 700,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            whiteSpace: 'nowrap',
            color: C.ink,
            padding: `${28 * u}px ${56 * u}px`,
            borderRadius: 999,
            backgroundImage: `linear-gradient(105deg, transparent ${sheen - 20}%, rgba(255,255,255,0.45) ${sheen}%, transparent ${sheen + 20}%), linear-gradient(180deg, ${C.orangeLight}, ${C.orange})`,
            boxShadow: `0 ${16 * u}px ${40 * u}px rgba(249,115,22,${0.3 + pulse * 0.2}), 0 0 0 ${(2 + pulse * 6) * u}px rgba(249,115,22,${0.35 - pulse * 0.25}), inset 0 ${-3 * u}px 0 rgba(124,45,18,0.35)`,
            opacity: bo,
            transform: `scale(${bs})`,
            transformOrigin: layout === 'landscape' ? '0% 50%' : '50% 50%',
          }}
        >
          Get early access
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ── Composition ───────────────────────────────────────────────────────── */

export default function Video() {
  const [s1, s2, s3] = composition.shots;
  return (
    <AbsoluteFill style={{ backgroundColor: '#03050d', fontFamily: FONT }}>
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
