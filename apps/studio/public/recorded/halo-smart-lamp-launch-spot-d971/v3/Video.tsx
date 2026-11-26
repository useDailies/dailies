import React from 'react';
import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';

export const composition = {
  fps: 30,
  durationInFrames: 300,
  shots: [
    {n: 1, title: 'Product hero', from: 0, durationInFrames: 90},
    {n: 2, title: 'Colour', from: 90, durationInFrames: 90},
    {n: 3, title: 'Call to action', from: 180, durationInFrames: 120},
  ],
};

/* ------------------------------------------------------------------ */
/* Palette + helpers                                                   */
/* ------------------------------------------------------------------ */

type RGB = [number, number, number];
const AMBER: RGB = [255, 166, 72];
const BLUE: RGB = [128, 178, 255];
const WHITE: RGB = [255, 255, 255];
const INK: RGB = [8, 8, 11];

const mix = (a: RGB, b: RGB, t: number): RGB =>
  [0, 1, 2].map((i) => Math.round(a[i] + (b[i] - a[i]) * t)) as RGB;
const rgba = (c: RGB, a = 1) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

const CLAMP = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const FONT =
  '"SF Pro Display", ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';

/* ------------------------------------------------------------------ */
/* Layout per aspect ratio                                             */
/* ------------------------------------------------------------------ */

type Layout = ReturnType<typeof getLayout>;

function getLayout(width: number, height: number) {
  const portrait = height > width;
  if (portrait) {
    // 9:16 — text lives in the safe band (14%..65% of height); the lamp
    // sits low and throws its light up into the copy.
    const D = Math.round(width * 0.44);
    return {
      portrait,
      width,
      height,
      D,
      lampX: width / 2,
      lampY: height * 0.665,
      textX: width / 2,
      captionY: height * 0.4,
      priceY: height * 0.4,
      wordmarkY: height * 0.355,
      buttonY: height * 0.475,
      captionSize: 92,
      priceSize: 84,
      wordmarkSize: 150,
      buttonSize: 46,
      footerHeight: 0,
      footerSize: 0,
    };
  }
  // 16:9 — lamp on the left third, copy on the right.
  const D = Math.round(height * 0.35);
  return {
    portrait,
    width,
    height,
    D,
    lampX: width * 0.31,
    lampY: height * 0.46,
    textX: width * 0.555,
    captionY: height * 0.46,
    priceY: height * 0.46,
    wordmarkY: height * 0.44,
    buttonY: height * 0.585,
    captionSize: 104,
    priceSize: 96,
    wordmarkSize: 176,
    buttonSize: 40,
    footerHeight: Math.round(height * 0.13),
    footerSize: 50,
  };
}

/* ------------------------------------------------------------------ */
/* Timeline values                                                     */
/* ------------------------------------------------------------------ */

function useTimeline() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  // Lamp switches on: already glowing on frame 0, fully lit by ~0.6s.
  const switchOn = spring({frame, fps, config: {damping: 14, stiffness: 90}, durationInFrames: 22});
  const breath = 1 + 0.035 * Math.sin((frame / fps) * Math.PI * 0.9);
  const intensity = (0.5 + 0.5 * Math.min(switchOn, 1.08)) * breath;

  // Amber → soft blue during shot 2.
  const hueT = interpolate(frame, [96, 158], [0, 1], {
    ...CLAMP,
    easing: Easing.bezier(0.65, 0, 0.35, 1),
  });
  const color = mix(AMBER, BLUE, hueT);

  return {frame, fps, intensity, hueT, color};
}

/* ------------------------------------------------------------------ */
/* Room                                                                */
/* ------------------------------------------------------------------ */

const Room: React.FC<{L: Layout; color: RGB; intensity: number}> = ({L, color, intensity}) => {
  const {width, height, D, lampX, lampY, portrait} = L;
  const baseBottom = lampY + D / 2 + D * 0.07;
  const consoleH = D * (portrait ? 0.3 : 0.26);
  const floorY = baseBottom + consoleH;
  const consoleLeft = portrait ? lampX - width * 0.42 : -40;
  const consoleRight = portrait ? lampX + width * 0.42 : lampX + D * 1.05;
  const I = intensity;

  return (
    <AbsoluteFill data-layer="background">
      {/* wall */}
      <AbsoluteFill
        style={{
          background: `linear-gradient(180deg, #0a090c 0%, #100e11 ${(floorY / height) * 100}%, #060507 ${
            (floorY / height) * 100
          }%, #030304 100%)`,
        }}
      />
      {/* wall panels */}
      {[0.12, 0.5, 0.88].map((x, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: width * x,
            top: 0,
            width: 1,
            height: floorY,
            background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.035) 60%, rgba(255,255,255,0) 100%)`,
          }}
        />
      ))}
      {/* light washing the wall */}
      <div
        style={{
          position: 'absolute',
          left: lampX - D * 4,
          top: lampY - D * 3.2,
          width: D * 8,
          height: D * 6.4,
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${rgba(color, 0.2 * I)} 0%, ${rgba(
            color,
            0.08 * I
          )} 45%, rgba(0,0,0,0) 100%)`,
        }}
      />
      {/* low console the lamp stands on */}
      <div
        style={{
          position: 'absolute',
          left: consoleLeft,
          top: baseBottom,
          width: consoleRight - consoleLeft,
          height: consoleH,
          borderRadius: 4,
          background: `linear-gradient(180deg, ${rgba(mix(color, [40, 36, 34], 0.55), 0.9)} 0px, #1a181b 3px, #121013 40%, #0a090b 100%)`,
          boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
        }}
      />
      {/* pool of light on the console top */}
      <div
        style={{
          position: 'absolute',
          left: lampX - D * 1.1,
          top: baseBottom - D * 0.08,
          width: D * 2.2,
          height: D * 0.22,
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${rgba(color, 0.35 * I)}, rgba(0,0,0,0))`,
        }}
      />
      {/* floor reflection */}
      <div
        style={{
          position: 'absolute',
          left: lampX - D * 1.8,
          top: floorY,
          width: D * 3.6,
          height: D * 0.5,
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${rgba(color, 0.12 * I)}, rgba(0,0,0,0))`,
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* The lamp                                                            */
/* ------------------------------------------------------------------ */

const Lamp: React.FC<{L: Layout; color: RGB; intensity: number; frame: number; fps: number}> = ({
  L,
  color,
  intensity,
  frame,
  fps,
}) => {
  const {D, lampX, lampY} = L;
  const r = D / 2;
  const I = Math.min(intensity, 1.1);
  const rise = spring({frame, fps, config: {damping: 200}, durationInFrames: 24});
  const y = interpolate(rise, [0, 1], [D * 0.06, 0]);

  const core = mix(WHITE, color, 0.12);
  const mid = mix(WHITE, color, 0.55);
  const rim = mix(color, INK, 0.18);

  return (
    <>
      {/* bloom behind the lamp */}
      <div
        data-layer="glow"
        style={{
          position: 'absolute',
          left: lampX - D * 2.4,
          top: lampY - D * 2.4 + y,
          width: D * 4.8,
          height: D * 4.8,
          borderRadius: '50%',
          background: `radial-gradient(closest-side, ${rgba(color, 0.42 * I)} 0%, ${rgba(
            color,
            0.16 * I
          )} 38%, rgba(0,0,0,0) 100%)`,
        }}
      />
      <div
        data-layer="product"
        style={{
          position: 'absolute',
          left: lampX - r,
          top: lampY - r + y,
          width: D,
          height: D * 1.07,
        }}
      >
        {/* base puck */}
        <div
          style={{
            position: 'absolute',
            left: D * 0.27,
            top: D * 0.94,
            width: D * 0.46,
            height: D * 0.13,
            borderRadius: `${D * 0.03}px ${D * 0.03}px ${D * 0.05}px ${D * 0.05}px`,
            background: 'linear-gradient(180deg, #4a4749 0%, #222023 40%, #121113 100%)',
            boxShadow: `inset 0 2px 0 ${rgba(color, 0.55 * I)}, 0 18px 30px rgba(0,0,0,0.55)`,
          }}
        />
        {/* unlit sphere: matte white glass */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            height: D,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 38% 30%, #f6f4f1 0%, #d8d5d1 40%, #8a8784 78%, #3f3d3b 100%)',
          }}
        />
        {/* lit sphere */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            height: D,
            borderRadius: '50%',
            opacity: Math.min(1, I),
            background: `radial-gradient(circle at 50% 40%, #ffffff 0%, ${rgba(core)} 20%, ${rgba(
              mid
            )} 58%, ${rgba(color)} 84%, ${rgba(rim)} 100%)`,
            boxShadow: `0 0 ${D * 0.18}px ${rgba(color, 0.6 * I)}, 0 0 ${D * 0.6}px ${rgba(
              color,
              0.35 * I
            )}, inset 0 -${D * 0.06}px ${D * 0.12}px ${rgba(rim, 0.6)}`,
          }}
        />
        {/* specular sheen */}
        <div
          style={{
            position: 'absolute',
            left: D * 0.2,
            top: D * 0.1,
            width: D * 0.34,
            height: D * 0.2,
            borderRadius: '50%',
            transform: 'rotate(-28deg)',
            background: 'radial-gradient(closest-side, rgba(255,255,255,0.75), rgba(255,255,255,0))',
          }}
        />
      </div>
    </>
  );
};

/* ------------------------------------------------------------------ */
/* Shot-specific graphics                                              */
/* ------------------------------------------------------------------ */

// Shot 1: soft rings "listening" outward from the lamp.
const ListenRings: React.FC<{L: Layout; color: RGB; frame: number}> = ({L, color, frame}) => {
  const {D, lampX, lampY} = L;
  const shotFade = interpolate(frame, [14, 26, 76, 88], [0, 1, 1, 0], CLAMP);
  if (shotFade <= 0) return null;
  const period = 42;
  return (
    <AbsoluteFill data-layer="listen-rings">
      {[0, 1, 2].map((i) => {
        const local = frame - 14 - i * 14;
        if (local < 0) return null;
        const t = (local % period) / period;
        const s = 1.04 + Easing.out(Easing.cubic)(t) * 0.75;
        const o = (1 - t) * 0.55 * shotFade;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: lampX - D / 2,
              top: lampY - D / 2,
              width: D,
              height: D,
              borderRadius: '50%',
              border: `2px solid ${rgba(mix(WHITE, color, 0.5), o)}`,
              transform: `scale(${s})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// Shot 2: a colour dial that sweeps amber → blue around the lamp.
const ColourDial: React.FC<{L: Layout; frame: number; hueT: number; color: RGB}> = ({
  L,
  frame,
  hueT,
  color,
}) => {
  const {D, lampX, lampY} = L;
  const o = interpolate(frame, [90, 102, 166, 178], [0, 1, 1, 0], CLAMP);
  if (o <= 0) return null;
  const R = D * 0.66;
  const size = R * 2 + 40;
  const circ = 2 * Math.PI * R;
  const sweep = Math.max(0.001, hueT);
  const angle = -90 + sweep * 360;
  const kx = size / 2 + R * Math.cos((angle * Math.PI) / 180);
  const ky = size / 2 + R * Math.sin((angle * Math.PI) / 180);
  return (
    <svg
      data-layer="colour-dial"
      width={size}
      height={size}
      style={{position: 'absolute', left: lampX - size / 2, top: lampY - size / 2, opacity: o}}
    >
      <defs>
        <linearGradient id="dialGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={rgba(AMBER)} />
          <stop offset="100%" stopColor={rgba(BLUE)} />
        </linearGradient>
      </defs>
      <circle cx={size / 2} cy={size / 2} r={R} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={2} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={R}
        fill="none"
        stroke="url(#dialGrad)"
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray={`${circ * sweep} ${circ}`}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <circle cx={kx} cy={ky} r={9} fill={rgba(mix(WHITE, color, 0.3))} />
      <circle cx={kx} cy={ky} r={20} fill={rgba(color, 0.25)} />
    </svg>
  );
};

/* ------------------------------------------------------------------ */
/* Copy                                                                */
/* ------------------------------------------------------------------ */

const anchor = (L: Layout, y: number, dy: number, scale = 1): React.CSSProperties => ({
  position: 'absolute',
  left: L.textX,
  top: y,
  whiteSpace: 'nowrap',
  width: 'max-content',
  fontFamily: FONT,
  transformOrigin: L.portrait ? '50% 50%' : '0% 50%',
  transform: `translate(${L.portrait ? '-50%' : '0'}, calc(-50% + ${dy}px)) scale(${scale})`,
});

const Copy: React.FC<{L: Layout; frame: number; fps: number; color: RGB}> = ({L, frame, fps, color}) => {
  // Shot 1 caption — fully in by ~0:00.7, out at the cut.
  const capIn = spring({frame: frame - 4, fps, config: {damping: 200}, durationInFrames: 18});
  const capOut = interpolate(frame, [84, 90], [0, 1], CLAMP);
  const capOpacity = interpolate(capIn, [0, 0.6], [0, 1], CLAMP) * (1 - capOut);
  const capBlur = interpolate(capIn, [0, 1], [10, 0]) + capOut * 8;

  // Shot 2 price tag — in by 0:03.7, holds through 0:05.6.
  const priceIn = spring({frame: frame - 98, fps, config: {damping: 15, stiffness: 120}, durationInFrames: 22});
  const priceOut = interpolate(frame, [166, 173], [0, 1], CLAMP);
  const priceOpacity = interpolate(frame, [98, 108], [0, 1], CLAMP) * (1 - priceOut);

  // Shot 3 wordmark — fully present from the cut at 0:06.
  const wmIn = spring({frame: frame - 172, fps, config: {damping: 200}, durationInFrames: 30});
  const wmOpacity = interpolate(frame, [173, 179], [0, 1], CLAMP);
  const wmTracking = interpolate(wmIn, [0, 1], [0.5, 0.34]);

  // Shot 3 button — fully in by ~0:07.
  const btnIn = spring({frame: frame - 196, fps, config: {damping: 16, stiffness: 110}, durationInFrames: 24});
  const btnOpacity = interpolate(frame, [196, 206], [0, 1], CLAMP);
  const shine = interpolate(frame, [228, 262], [-60, 160], CLAMP);

  const textColor = '#F6F2EC';

  return (
    <AbsoluteFill>
      {capOpacity > 0 && (
        <div
          data-layer="caption"
          style={{
            ...anchor(L, L.captionY, interpolate(capIn, [0, 1], [28, 0]) - capOut * 12),
            fontSize: L.captionSize,
            fontWeight: 500,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: textColor,
            opacity: capOpacity,
            filter: `blur(${capBlur}px)`,
            textShadow: `0 0 40px ${rgba(AMBER, 0.25)}`,
          }}
        >
          Light that listens
        </div>
      )}

      {priceOpacity > 0 && (
        <div
          data-layer="price"
          style={{
            ...anchor(L, L.priceY, interpolate(priceIn, [0, 1], [24, 0]) - priceOut * 10, interpolate(priceIn, [0, 1], [0.92, 1])),
            fontSize: L.priceSize,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1,
            color: rgba(mix(WHITE, color, 0.12)),
            padding: '0.26em 0.55em 0.26em 1.05em',
            borderRadius: '0.22em 0.5em 0.5em 0.22em',
            border: `2px solid ${rgba(mix(WHITE, color, 0.4), 0.45)}`,
            background: `radial-gradient(circle at 0.5em 50%, rgba(6,6,9,0.95) 0.09em, ${rgba(
              mix(WHITE, color, 0.6),
              0.7
            )} 0.1em, ${rgba(mix(WHITE, color, 0.6), 0.0)} 0.16em), linear-gradient(135deg, ${rgba(
              color,
              0.22
            )} 0%, rgba(255,255,255,0.05) 100%)`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.45), 0 0 50px ${rgba(color, 0.18)}`,
            opacity: priceOpacity,
          }}
        >
          $89
        </div>
      )}

      {wmOpacity > 0 && (
        <div
          data-layer="wordmark"
          style={{
            ...anchor(L, L.wordmarkY, interpolate(wmIn, [0, 1], [18, 0])),
            fontSize: L.wordmarkSize,
            fontWeight: 300,
            letterSpacing: `${wmTracking}em`,
            paddingLeft: L.portrait ? `${wmTracking}em` : 0,
            lineHeight: 1,
            color: textColor,
            opacity: wmOpacity,
            textShadow: `0 0 60px ${rgba(color, 0.35)}`,
          }}
        >
          HALO
        </div>
      )}

      {/* 16:9 — the CTA is a full-width buy bar docked to the bottom edge.
          It reveals with a clip from its top edge, so its box and text never
          leave the frame. (9:16 keeps the pill: the storyboard forbids any
          button in the bottom 35% of that cut.) */}
      {!L.portrait && btnOpacity > 0 && (
        <div
          data-layer="button"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: L.footerHeight,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            whiteSpace: 'nowrap',
            fontFamily: FONT,
            fontSize: L.footerSize,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1,
            color: '#0b0c10',
            background: `linear-gradient(105deg, rgba(255,255,255,0) ${shine - 12}%, rgba(255,255,255,0.9) ${shine}%, rgba(255,255,255,0) ${
              shine + 12
            }%), linear-gradient(180deg, #ffffff 0%, ${rgba(mix(WHITE, color, 0.28))} 100%)`,
            boxShadow: `0 -24px 80px ${rgba(color, 0.3)}, inset 0 1px 0 rgba(255,255,255,0.9)`,
            clipPath: `inset(${(1 - Math.min(1, btnIn)) * 100}% 0 0 0)`,
            opacity: btnOpacity,
          }}
        >
          Pre-order now
        </div>
      )}

      {L.portrait && btnOpacity > 0 && (
        <div
          data-layer="button"
          style={{
            ...anchor(L, L.buttonY, interpolate(btnIn, [0, 1], [26, 0]), interpolate(btnIn, [0, 1], [0.94, 1])),
            fontSize: L.buttonSize,
            fontWeight: 600,
            letterSpacing: '-0.005em',
            lineHeight: 1,
            color: '#0b0c10',
            padding: '0.78em 1.7em',
            borderRadius: 999,
            background: `linear-gradient(105deg, rgba(255,255,255,0) ${shine - 20}%, rgba(255,255,255,0.95) ${shine}%, rgba(255,255,255,0) ${
              shine + 20
            }%), linear-gradient(180deg, #ffffff 0%, ${rgba(mix(WHITE, color, 0.22))} 100%)`,
            boxShadow: `0 18px 50px ${rgba(color, 0.35)}, inset 0 -2px 0 rgba(0,0,0,0.08)`,
            opacity: btnOpacity,
          }}
        >
          Pre-order now
        </div>
      )}
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Finishing: vignette + grain                                         */
/* ------------------------------------------------------------------ */

const Finish: React.FC = () => (
  <AbsoluteFill style={{pointerEvents: 'none'}}>
    <AbsoluteFill
      style={{background: 'radial-gradient(ellipse at 50% 48%, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55) 100%)'}}
    />
    <svg width="100%" height="100%" style={{position: 'absolute', inset: 0, opacity: 0.07, mixBlendMode: 'overlay'}}>
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves={2} seed={7} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  </AbsoluteFill>
);

/* ------------------------------------------------------------------ */
/* Composition                                                         */
/* ------------------------------------------------------------------ */

export default function Video() {
  const {width, height} = useVideoConfig();
  const L = getLayout(width, height);
  const {frame, fps, intensity, hueT, color} = useTimeline();

  // Slow camera push into the lamp across the whole spot.
  const push = interpolate(frame, [0, 300], [1, 1.045], {...CLAMP, easing: Easing.inOut(Easing.sin)});

  return (
    <AbsoluteFill style={{backgroundColor: '#050406', overflow: 'hidden'}}>
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: `${L.lampX}px ${L.lampY}px`}}>
        <Room L={L} color={color} intensity={intensity} />
        <ListenRings L={L} color={color} frame={frame} />
        <ColourDial L={L} frame={frame} hueT={hueT} color={color} />
        <Lamp L={L} color={color} intensity={intensity} frame={frame} fps={fps} />
      </AbsoluteFill>
      <Finish />
      <Copy L={L} frame={frame} fps={fps} color={color} />
    </AbsoluteFill>
  );
}
