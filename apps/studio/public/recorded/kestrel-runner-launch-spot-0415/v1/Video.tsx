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
/*  Composition                                                        */
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
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const SANS = 'ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

const C = {
  night0: '#03050b',
  night1: '#08101f',
  night2: '#0f1c33',
  teal: '#12b5a6',
  tealDeep: '#0a6f6a',
  tealLight: '#5ff3df',
  orange: '#ff6a1a',
  orangeLight: '#ffa04d',
  orangeDeep: '#c2410c',
  ink: '#f4fbfa',
};

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Deterministic hash in [0, 1). */
const hash = (n: number) => {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

type Kind = 'landscape' | 'portrait' | 'square';

const useLayout = () => {
  const { width, height, fps } = useVideoConfig();
  const ratio = width / height;
  const kind: Kind = ratio > 1.2 ? 'landscape' : ratio < 0.83 ? 'portrait' : 'square';
  const pick = <T,>(l: T, p: T, s: T): T => (kind === 'landscape' ? l : kind === 'portrait' ? p : s);
  return { width, height, fps, kind, pick };
};

/* ------------------------------------------------------------------ */
/*  Shared graphics                                                    */
/* ------------------------------------------------------------------ */

const Shoe: React.FC<{ width: number; id: string }> = ({ width, id }) => {
  const g = (name: string) => `${id}-${name}`;
  const eyelets = [0, 1, 2, 3, 4];
  return (
    <svg
      viewBox="0 0 800 400"
      width={width}
      height={width / 2}
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        <linearGradient id={g('upper')} x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0" stopColor={C.tealLight} />
          <stop offset="0.45" stopColor={C.teal} />
          <stop offset="1" stopColor={C.tealDeep} />
        </linearGradient>
        <linearGradient id={g('sole')} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.orangeLight} />
          <stop offset="0.55" stopColor={C.orange} />
          <stop offset="1" stopColor={C.orangeDeep} />
        </linearGradient>
        <linearGradient id={g('sheen')} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={g('shadow')} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#000" stopOpacity="0.75" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* contact shadow */}
      <ellipse cx="410" cy="362" rx="380" ry="26" fill={`url(#${g('shadow')})`} />

      {/* upper */}
      <path
        d="M92 270 C 76 214 92 160 140 132 C 172 114 206 106 238 110 L 262 120 C 284 150 318 162 352 156 C 402 150 442 160 482 178 C 562 210 642 222 702 236 C 744 246 770 264 766 288 L 700 272 C 560 276 420 276 300 270 Z"
        fill={`url(#${g('upper')})`}
      />
      {/* heel counter */}
      <path d="M92 270 C 80 214 96 166 140 138 L 172 130 C 160 182 166 232 184 270 Z" fill={C.tealDeep} opacity="0.85" />
      {/* collar */}
      <path d="M140 132 C 180 110 226 104 262 120 C 248 132 214 130 172 142 Z" fill="#06302f" />
      {/* tongue */}
      <path d="M262 120 C 266 90 298 74 330 82 C 346 108 354 136 352 156 C 318 162 284 150 262 120 Z" fill={C.tealLight} opacity="0.9" />
      {/* toe cap */}
      <path d="M592 214 C 660 226 742 242 766 286 L 700 272 L 586 268 C 600 250 602 232 592 214 Z" fill={C.tealLight} opacity="0.35" />
      {/* kestrel wing mark */}
      <path d="M352 246 C 430 240 512 222 584 190 C 540 226 476 250 400 258 Z" fill={C.ink} opacity="0.92" />
      <path d="M392 262 C 452 260 512 250 566 230 C 530 254 482 266 430 268 Z" fill={C.orange} />
      {/* laces */}
      {eyelets.map((i) => {
        const x = 286 + i * 40;
        const y = 150 + i * 9;
        return (
          <g key={i}>
            <circle cx={x} cy={y + 16} r="5" fill="#06302f" />
            <path d={`M${x - 8} ${y + 2} L ${x + 30} ${y + 18}`} stroke={C.ink} strokeWidth="7" strokeLinecap="round" />
          </g>
        );
      })}
      {/* top sheen */}
      <path
        d="M150 140 C 210 118 250 124 270 140 C 320 170 420 166 500 196 C 580 222 680 236 740 256"
        stroke={`url(#${g('sheen')})`}
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />

      {/* outsole */}
      <path d="M58 300 C 58 334 88 352 132 352 L 662 352 C 724 352 762 334 766 304 L 766 298 L 58 298 Z" fill={C.orangeDeep} />
      {[...Array(14)].map((_, i) => (
        <rect key={i} x={110 + i * 44} y={340} width="18" height="10" rx="3" fill="#8a2c07" />
      ))}
      {/* midsole */}
      <path
        d="M62 300 C 56 272 70 256 94 258 L 300 266 C 420 272 560 272 702 264 C 746 262 770 278 766 302 C 760 322 740 328 700 328 L 120 328 C 82 328 64 320 62 300 Z"
        fill={`url(#${g('sole')})`}
      />
      <path d="M96 300 C 250 308 500 308 744 292" stroke="#fff" strokeOpacity="0.4" strokeWidth="3" fill="none" />
      <path d="M140 316 C 300 320 520 318 700 312" stroke="#7c2d12" strokeOpacity="0.45" strokeWidth="3" fill="none" />
    </svg>
  );
};

const SoleDetail: React.FC<{ sweep: number }> = ({ sweep }) => (
  <svg viewBox="0 0 1600 700" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block', overflow: 'visible' }}>
    <defs>
      <linearGradient id="sd-upper" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.tealDeep} />
        <stop offset="0.6" stopColor={C.teal} />
        <stop offset="1" stopColor={C.tealLight} />
      </linearGradient>
      <linearGradient id="sd-mid" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={C.orangeLight} />
        <stop offset="0.5" stopColor={C.orange} />
        <stop offset="1" stopColor={C.orangeDeep} />
      </linearGradient>
      <linearGradient id="sd-sweep" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#fff" stopOpacity="0" />
        <stop offset="0.5" stopColor="#fff" stopOpacity="0.42" />
        <stop offset="1" stopColor="#fff" stopOpacity="0" />
      </linearGradient>
      <pattern id="sd-mesh" width="22" height="22" patternUnits="userSpaceOnUse">
        <circle cx="11" cy="11" r="4" fill="#043c39" opacity="0.55" />
      </pattern>
      <clipPath id="sd-clip">
        <path d="M0 0 H1600 V250 C 1400 262 1200 268 800 268 C 400 268 200 262 0 250 Z" />
        <path d="M0 250 C 200 262 400 268 800 268 C 1200 268 1400 262 1600 250 V 620 C 1400 640 200 640 0 620 Z" />
      </clipPath>
      <radialGradient id="sd-shadow" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#000" stopOpacity="0.8" />
        <stop offset="1" stopColor="#000" stopOpacity="0" />
      </radialGradient>
    </defs>

    <ellipse cx="800" cy="660" rx="820" ry="40" fill="url(#sd-shadow)" />

    {/* upper mesh */}
    <path d="M0 0 H1600 V250 C 1400 262 1200 268 800 268 C 400 268 200 262 0 250 Z" fill="url(#sd-upper)" />
    <path d="M0 0 H1600 V250 C 1400 262 1200 268 800 268 C 400 268 200 262 0 250 Z" fill="url(#sd-mesh)" />
    <path d="M0 236 C 200 248 400 254 800 254 C 1200 254 1400 248 1600 236" stroke={C.ink} strokeOpacity="0.7" strokeWidth="4" strokeDasharray="16 12" fill="none" />

    {/* midsole */}
    <path d="M0 250 C 200 262 400 268 800 268 C 1200 268 1400 262 1600 250 V 540 H 0 Z" fill="url(#sd-mid)" />
    {[0, 1, 2, 3].map((i) => (
      <path
        key={i}
        d={`M0 ${330 + i * 50} C 300 ${300 + i * 50} 520 ${380 + i * 50} 800 ${340 + i * 50} C 1080 ${300 + i * 50} 1300 ${370 + i * 50} 1600 ${320 + i * 50}`}
        stroke={i % 2 ? '#7c2d12' : '#fff'}
        strokeOpacity={i % 2 ? 0.35 : 0.28}
        strokeWidth={i % 2 ? 6 : 4}
        fill="none"
      />
    ))}

    {/* outsole + lugs */}
    <path d="M0 540 H 1600 V 620 C 1400 640 200 640 0 620 Z" fill={C.orangeDeep} />
    {[...Array(27)].map((_, i) => (
      <rect key={i} x={10 + i * 60} y={560} width="38" height="54" rx="8" fill="#8a2c07" />
    ))}

    {/* light sweep */}
    <g clipPath="url(#sd-clip)">
      <rect x={sweep * 2200 - 600} y="-20" width="420" height="700" fill="url(#sd-sweep)" transform="skewX(-18)" />
    </g>
  </svg>
);

const Skyline: React.FC<{ frame: number }> = ({ frame }) => {
  const layer = (seed: number, count: number, minH: number, maxH: number, fill: string, lit: number, drift: number) => {
    let x = -200;
    const items: React.ReactNode[] = [];
    for (let i = 0; i < count; i++) {
      const w = 70 + hash(seed + i) * 110;
      const h = minH + hash(seed + i * 3.7) * (maxH - minH);
      const y = 900 - h;
      items.push(
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill={fill} />
          <rect x={x + 8} y={y + 14} width={w - 16} height={h - 14} fill={`url(#win-${seed})`} opacity={lit * (0.25 + hash(seed + i * 9.1) * 0.75)} />
          {hash(seed + i * 5.3) > 0.8 ? (
            <rect x={x + w / 2 - 2} y={y - 40} width="4" height="40" fill={fill} />
          ) : null}
        </g>,
      );
      x += w + 6;
    }
    return <g transform={`translate(${-frame * drift} 0)`}>{items}</g>;
  };
  return (
    <svg viewBox="0 0 2400 900" width="100%" height="100%" preserveAspectRatio="xMidYMax slice" style={{ position: 'absolute', inset: 0 }}>
      <defs>
        <pattern id="win-11" width="22" height="30" patternUnits="userSpaceOnUse">
          <rect x="6" y="6" width="9" height="12" fill="#7fb6d6" opacity="0.35" />
        </pattern>
        <pattern id="win-47" width="26" height="34" patternUnits="userSpaceOnUse">
          <rect x="7" y="7" width="11" height="14" fill="#ffc48a" opacity="0.55" />
        </pattern>
        <linearGradient id="haze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={C.night0} stopOpacity="0" />
          <stop offset="1" stopColor={C.night0} stopOpacity="0.9" />
        </linearGradient>
      </defs>
      {layer(11, 30, 260, 620, '#0e1a30', 0.6, 0.25)}
      {layer(47, 26, 140, 420, '#060b16', 1, 0.7)}
      <rect x="0" y="600" width="2400" height="300" fill="url(#haze)" />
    </svg>
  );
};

/** Diagonal wipe that hands one shot to the next. */
const CutWipe: React.FC<{ color: string }> = ({ color }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, 12], [0, 1], { ...clamp, easing: easeInOut });
  if (p >= 1) return null;
  return (
    <AbsoluteFill
      style={{
        background: color,
        transform: `translateX(${p * 130}%) skewX(-12deg)`,
        transformOrigin: 'center',
        width: '130%',
        left: '-15%',
      }}
    />
  );
};

const Vignette: React.FC = () => (
  <AbsoluteFill
    style={{
      pointerEvents: 'none',
      background: 'radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.6) 100%)',
    }}
  />
);

/* ------------------------------------------------------------------ */
/*  Shot 1 — Product hero                                              */
/* ------------------------------------------------------------------ */

const ShotHero: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height, fps, pick } = useLayout();

  const slide = spring({ frame: f, fps, config: { damping: 16, stiffness: 80, mass: 1.1 } });
  const shoeW = pick(width * 0.5, width * 0.88, width * 0.74);
  const shoeX = interpolate(slide, [0, 1], [-width * 0.5 - shoeW, 0]);
  const tilt = interpolate(slide, [0, 1], [-7, 0]);
  const float = Math.sin(f / 11) * 5 * interpolate(f, [20, 40], [0, 1], clamp);
  const shoeCenterY = height * pick(0.44, 0.42, 0.42);
  const speed = interpolate(slide, [0, 0.85, 1], [1, 0.4, 0], clamp);

  const cap = spring({ frame: f - 30, fps, config: { damping: 200 } });
  const capSize = pick(132, 112, 104);
  const capTop = height * pick(0.72, 0.64, 0.74);
  const rule = interpolate(f, [26, 50], [0, 1], { ...clamp, easing: easeOut });

  const camera = interpolate(f, [0, 90], [1.04, 1], { ...clamp, easing: easeOut });

  return (
    <AbsoluteFill style={{ background: C.night0, overflow: 'hidden' }}>
      <AbsoluteFill data-layer="background" style={{ transform: `scale(${camera})` }}>
        <AbsoluteFill
          style={{
            background: `radial-gradient(ellipse at 70% 20%, ${C.night2} 0%, ${C.night1} 40%, ${C.night0} 80%)`,
          }}
        />
        <AbsoluteFill
          style={{
            background: `radial-gradient(circle at 50% ${pick(70, 55, 62)}%, rgba(18,181,166,0.22), rgba(18,181,166,0) 45%)`,
          }}
        />
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: height * 0.62 }}>
          <Skyline frame={f} />
        </div>
        {/* wet street */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: height * 0.62,
            bottom: 0,
            background: `linear-gradient(180deg, #0a1426 0%, ${C.night0} 70%)`,
          }}
        />
        {/* passing light streaks */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = height * (0.64 + hash(i + 3) * 0.3);
          const len = width * (0.12 + hash(i + 9) * 0.2);
          const x = ((width * 1.6 * hash(i + 21) - f * (10 + hash(i) * 14)) % (width * 1.6) + width * 1.6) % (width * 1.6) - width * 0.3;
          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: len,
                height: 3,
                borderRadius: 3,
                background: `linear-gradient(90deg, rgba(255,255,255,0), ${i % 2 ? C.orange : C.tealLight})`,
                opacity: 0.45,
                filter: 'blur(1px)',
              }}
            />
          );
        })}
      </AbsoluteFill>

      {/* speed lines trailing the shoe */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          width: width / 2 + shoeX,
          top: shoeCenterY - shoeW * 0.12,
          height: shoeW * 0.26,
          opacity: speed * 0.8,
          background: `repeating-linear-gradient(180deg, rgba(95,243,223,0) 0px, rgba(95,243,223,0) 14px, rgba(95,243,223,0.5) 14px, rgba(95,243,223,0.5) 16px)`,
          maskImage: 'linear-gradient(90deg, transparent, black)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black)',
        }}
      />

      {/* product */}
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left: (width - shoeW) / 2,
          top: shoeCenterY - shoeW / 4,
          width: shoeW,
          transform: `translate(${shoeX}px, ${float}px) rotate(${tilt}deg)`,
          filter: `drop-shadow(0 ${shoeW * 0.04}px ${shoeW * 0.05}px rgba(0,0,0,0.6)) drop-shadow(0 0 ${shoeW * 0.08}px rgba(18,181,166,0.25))`,
        }}
      >
        <Shoe width={shoeW} id="hero" />
      </div>
      {/* reflection */}
      <div
        style={{
          position: 'absolute',
          left: (width - shoeW) / 2,
          top: shoeCenterY + shoeW / 4 - shoeW * 0.06,
          width: shoeW,
          transform: `translate(${shoeX}px, 0) scaleY(-1)`,
          opacity: 0.16,
          filter: 'blur(4px)',
          maskImage: 'linear-gradient(0deg, black, transparent 45%)',
          WebkitMaskImage: 'linear-gradient(0deg, black, transparent 45%)',
        }}
      >
        <Shoe width={shoeW} id="hero-reflect" />
      </div>

      {/* caption */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: capTop,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <div style={{ width: 140 * rule, height: 4, borderRadius: 2, background: C.orange }} />
        <div style={{ overflow: 'hidden', padding: '0 0 12px' }}>
          <div
            data-layer="caption"
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: capSize,
              letterSpacing: '-0.035em',
              lineHeight: 1,
              color: C.ink,
              whiteSpace: 'nowrap',
              transform: `translateY(${(1 - cap) * 110}%)`,
              opacity: cap,
              textShadow: '0 8px 40px rgba(0,0,0,0.6)',
            }}
          >
            Run the city
          </div>
        </div>
      </div>
      <Vignette />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Shot 2 — Detail                                                    */
/* ------------------------------------------------------------------ */

const ShotDetail: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height, fps, pick } = useLayout();

  const push = interpolate(f, [0, 120], [1.12, 1.0], { ...clamp, easing: easeOut });
  const pan = interpolate(f, [0, 120], [3, -3], clamp);
  const sweep = interpolate(f, [8, 80], [0, 1], { ...clamp, easing: easeInOut });

  const soleW = pick(width * 1.12, width * 1.9, width * 1.35);
  const soleH = soleW * (700 / 1600);
  const soleCY = height * pick(0.6, 0.5, 0.56);

  // Wordmark: absent at the cut (local 0), fully visible by local 48 (0:04.6).
  const wmOpacity = interpolate(f, [14, 40], [0, 1], { ...clamp, easing: easeOut });
  // Ends at a negative inset so the italic overhang is never clipped once revealed.
  const wmReveal = interpolate(f, [14, 46], [100, -10], { ...clamp, easing: easeOut });
  const wmTrack = interpolate(f, [14, 60], [0.42, 0.22], { ...clamp, easing: easeOut });
  const wmSize = pick(200, 132, 132);
  const wmTop = height * pick(0.1, 0.16, 0.1);

  const tag = spring({ frame: f - 44, fps, config: { damping: 11, stiffness: 120 } });
  const swing = interpolate(tag, [0, 1], [-18, -4]);
  const priceSize = pick(104, 96, 88);
  const tagPos = pick(
    { left: width * 0.66, top: height * 0.68 },
    { left: width * 0.5 - 170, top: height * 0.72 },
    { left: width * 0.56, top: height * 0.76 },
  );

  return (
    <AbsoluteFill style={{ background: C.night0, overflow: 'hidden' }}>
      <AbsoluteFill
        data-layer="background"
        style={{
          background: `radial-gradient(ellipse at 50% ${pick(60, 50, 56)}%, #2a1408 0%, #120a08 40%, ${C.night0} 75%)`,
        }}
      />
      <AbsoluteFill
        style={{
          background: `radial-gradient(circle at 50% ${pick(40, 40, 40)}%, rgba(18,181,166,0.18), rgba(0,0,0,0) 55%)`,
        }}
      />

      {/* product: orange sole close-up */}
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left: (width - soleW) / 2,
          top: soleCY - soleH / 2,
          width: soleW,
          height: soleH,
          transform: `scale(${push}) translateX(${pan}%) rotate(-2deg)`,
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
        }}
      >
        <SoleDetail sweep={sweep} />
      </div>

      {/* wordmark */}
      <div style={{ position: 'absolute', left: 0, right: 0, top: wmTop, display: 'flex', justifyContent: 'center' }}>
        <div
          data-layer="wordmark"
          style={{
            fontFamily: SANS,
            fontWeight: 900,
            fontStyle: 'italic',
            fontSize: wmSize,
            lineHeight: 1,
            letterSpacing: `${wmTrack}em`,
            marginRight: `-${wmTrack}em`,
            color: C.ink,
            whiteSpace: 'nowrap',
            opacity: wmOpacity,
            clipPath: `inset(-20% ${wmReveal}% -20% -10%)`,
            textShadow: '0 10px 50px rgba(0,0,0,0.55)',
          }}
        >
          KESTREL
        </div>
      </div>

      {/* price tag */}
      <div
        style={{
          position: 'absolute',
          ...tagPos,
          transformOrigin: '24px 50%',
          transform: `rotate(${swing}deg) scale(${interpolate(tag, [0, 1], [0.6, 1])})`,
          opacity: interpolate(tag, [0, 0.3], [0, 1], clamp),
          display: 'flex',
          alignItems: 'center',
          gap: 22,
          padding: `${priceSize * 0.22}px ${priceSize * 0.42}px ${priceSize * 0.22}px ${priceSize * 0.34}px`,
          borderRadius: `${priceSize * 0.5}px ${priceSize * 0.18}px ${priceSize * 0.18}px ${priceSize * 0.5}px`,
          background: `linear-gradient(135deg, ${C.ink}, #d9f5f1)`,
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ width: 18, height: 18, borderRadius: 9, background: C.night0, boxShadow: `0 0 0 4px ${C.teal}` }} />
        <div
          data-layer="price"
          style={{
            fontFamily: SANS,
            fontWeight: 800,
            fontSize: priceSize,
            lineHeight: 1,
            letterSpacing: '-0.03em',
            color: C.night0,
            fontVariantNumeric: 'tabular-nums',
            whiteSpace: 'nowrap',
          }}
        >
          €149
        </div>
      </div>

      <Vignette />
      <CutWipe color={C.orange} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Shot 3 — Call to action                                            */
/* ------------------------------------------------------------------ */

const ShotCTA: React.FC = () => {
  const f = useCurrentFrame();
  const { width, height, fps, pick, kind } = useLayout();

  const shoeIn = spring({ frame: f - 2, fps, config: { damping: 18, stiffness: 90 } });
  const head = spring({ frame: f - 16, fps, config: { damping: 200 } });
  const btn = spring({ frame: f - 34, fps, config: { damping: 13, stiffness: 140 } });
  const shimmer = interpolate((f - 50) % 60, [0, 30], [-60, 160], clamp);
  const ring = interpolate(f, [0, 150], [0, 40]);
  const breathe = 1 + Math.sin(f / 9) * 0.012 * interpolate(f, [60, 80], [0, 1], clamp);

  const shoeW = pick(620, width * 0.66, 520);
  const headSize = pick(150, 104, 100);
  const btnSize = pick(44, 42, 38);

  // 9:16 safe band: text lives between 14% and 65% of frame height.
  const band = kind === 'portrait'
    ? { top: height * 0.15, bottom: height * 0.36 }
    : { top: height * 0.06, bottom: height * 0.06 };

  return (
    <AbsoluteFill style={{ background: C.night0, overflow: 'hidden' }}>
      <AbsoluteFill
        data-layer="background"
        style={{
          background: `radial-gradient(ellipse at 50% ${pick(36, 30, 34)}%, #0d4a47 0%, #072426 35%, ${C.night0} 75%)`,
        }}
      />
      {/* orbit ring */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            position: 'absolute',
            top: kind === 'portrait' ? height * 0.27 - width * 0.45 : height * pick(0.3, 0.3, 0.27) - Math.min(width, height) * 0.36,
            width: kind === 'portrait' ? width * 0.9 : Math.min(width, height) * 0.72,
            aspectRatio: '1',
            borderRadius: '50%',
            border: `2px solid rgba(95,243,223,0.18)`,
            transform: `rotate(${ring}deg) scale(${interpolate(shoeIn, [0, 1], [0.7, 1])})`,
            opacity: shoeIn,
            background: 'radial-gradient(circle, rgba(255,106,26,0.12), rgba(0,0,0,0) 60%)',
          }}
        >
          <div style={{ position: 'absolute', top: -7, left: '50%', width: 14, height: 14, borderRadius: 7, background: C.orange, boxShadow: `0 0 20px ${C.orange}` }} />
        </div>
      </AbsoluteFill>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: band.top,
          bottom: band.bottom,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: pick(44, 56, 34),
        }}
      >
        <div
          data-layer="product"
          style={{
            width: shoeW,
            transform: `translateY(${(1 - shoeIn) * -40}px) rotate(${interpolate(shoeIn, [0, 1], [-14, -6])}deg) scale(${interpolate(shoeIn, [0, 1], [0.85, 1]) * breathe})`,
            opacity: shoeIn,
            filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.55))',
          }}
        >
          <Shoe width={shoeW} id="cta" />
        </div>

        <div style={{ overflow: 'hidden', padding: '0.06em 0.1em 0.12em' }}>
          <div
            data-layer="headline"
            style={{
              fontFamily: SANS,
              fontWeight: 800,
              fontSize: headSize,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: C.ink,
              whiteSpace: 'nowrap',
              transform: `translateY(${(1 - head) * 110}%)`,
              opacity: head,
            }}
          >
            Out 28 November
          </div>
        </div>

        <div
          data-layer="button"
          style={{
            fontFamily: SANS,
            fontWeight: 700,
            fontSize: btnSize,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            color: C.night0,
            whiteSpace: 'nowrap',
            padding: `${btnSize * 0.7}px ${btnSize * 1.3}px`,
            borderRadius: 999,
            backgroundImage: `linear-gradient(105deg, rgba(255,255,255,0) ${shimmer - 20}%, rgba(255,255,255,0.6) ${shimmer}%, rgba(255,255,255,0) ${shimmer + 20}%), linear-gradient(135deg, ${C.orangeLight}, ${C.orange})`,
            boxShadow: `0 18px 50px rgba(255,106,26,${0.45 * btn}), inset 0 1px 0 rgba(255,255,255,0.5)`,
            transform: `translateY(${(1 - btn) * 30}px) scale(${interpolate(btn, [0, 1], [0.8, 1])})`,
            opacity: interpolate(btn, [0, 0.4], [0, 1], clamp),
          }}
        >
          Get early access
        </div>
      </div>

      <Vignette />
      <CutWipe color={C.teal} />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/*  Root                                                               */
/* ------------------------------------------------------------------ */

export default function Video() {
  const [s1, s2, s3] = composition.shots;
  return (
    <AbsoluteFill style={{ background: C.night0, fontFamily: SANS }}>
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
