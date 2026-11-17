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

const FPS = 30;

export const composition = {
  fps: FPS,
  durationInFrames: 300,
  shots: [
    { n: 1, title: 'Hook', from: 0, durationInFrames: 90 },
    { n: 2, title: 'Proof', from: 90, durationInFrames: 120 },
    { n: 3, title: 'Call to action', from: 210, durationInFrames: 90 },
  ],
};

/* ------------------------------------------------------------------ */
/* Design tokens                                                       */
/* ------------------------------------------------------------------ */

const FONT = 'ui-sans-serif, system-ui, -apple-system, "SF Pro Display", "Helvetica Neue", Arial, sans-serif';
const MONO = 'ui-monospace, "SF Mono", Menlo, Consolas, monospace';

const NAVY_DEEP = '#060D22';
const NAVY = '#0B1736';
const NAVY_LIFT = '#13245A';
const LIME = '#C8F53C';
const LIME_DEEP = '#9BCB12';
const INK = '#0B1533';
const PAPER = '#FFFFFF';
const MUTED = '#6B7593';
const RULE = '#E7EAF2';
const TEXT_ON_NAVY = '#F3F6FC';

const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' } as const;

const formatThousands = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

type Layout = {
  portrait: boolean;
  width: number;
  height: number;
  // Safe content box (portrait honours 14% top, 35% bottom, 6% sides).
  safe: { top: number; left: number; width: number; height: number };
};

const useLayout = (): Layout => {
  const { width, height } = useVideoConfig();
  const portrait = height > width;
  const safe = portrait
    ? {
        top: height * 0.14,
        left: width * 0.06,
        width: width * 0.88,
        height: height * (1 - 0.14 - 0.35),
      }
    : {
        top: height * 0.1,
        left: width * 0.08,
        width: width * 0.84,
        height: height * 0.8,
      };
  return { portrait, width, height, safe };
};

const SafeBox: React.FC<{ layout: Layout; children: React.ReactNode }> = ({ layout, children }) => (
  <div
    style={{
      position: 'absolute',
      top: layout.safe.top,
      left: layout.safe.left,
      width: layout.safe.width,
      height: layout.safe.height,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------ */
/* Background                                                          */
/* ------------------------------------------------------------------ */

const Background: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const drift = interpolate(frame, [0, 300], [0, 1], clamp);
  const glowX = 50 + Math.sin(drift * Math.PI) * 8;
  const glowY = layout.portrait ? 36 : 42;
  const gridOffset = drift * 60;

  return (
    <AbsoluteFill
      data-layer="background"
      style={{
        background: `radial-gradient(ellipse 70% 60% at ${glowX}% ${glowY}%, ${NAVY_LIFT} 0%, ${NAVY} 45%, ${NAVY_DEEP} 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* fine ledger grid */}
      <AbsoluteFill
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
          backgroundPosition: `${gridOffset}px ${gridOffset * 0.5}px`,
          maskImage: `radial-gradient(ellipse 65% 55% at 50% ${glowY}%, black 0%, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(ellipse 65% 55% at 50% ${glowY}%, black 0%, transparent 80%)`,
        }}
      />
      {/* vignette for depth */}
      <AbsoluteFill
        style={{
          background: 'radial-gradient(ellipse 120% 90% at 50% 40%, transparent 55%, rgba(2,6,18,0.65) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

const LogoGlyph: React.FC<{ size: number }> = ({ size }) => (
  <svg data-layer="logo" width={size} height={size} viewBox="0 0 48 48" fill="none">
    <rect x="1" y="1" width="46" height="46" rx="12" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
    <rect x="11" y="13" width="26" height="3.5" rx="1.75" fill="rgba(243,246,252,0.55)" />
    <rect x="11" y="22" width="20" height="3.5" rx="1.75" fill="rgba(243,246,252,0.8)" />
    <rect x="11" y="31" width="26" height="4" rx="2" fill={LIME} />
  </svg>
);

const AccentLine: React.FC<{ progress: number; width: number; thickness: number; tail?: number }> = ({
  progress,
  width,
  thickness,
  tail = 0,
}) => {
  const head = Math.max(0, Math.min(1, progress));
  const start = Math.max(0, Math.min(head, tail));
  return (
    <div data-layer="accent-line" style={{ position: 'relative', width, height: thickness }}>
      <div
        style={{
          position: 'absolute',
          left: start * width,
          width: (head - start) * width,
          top: 0,
          height: thickness,
          borderRadius: thickness,
          background: `linear-gradient(90deg, ${LIME_DEEP}, ${LIME})`,
          boxShadow: `0 0 ${thickness * 6}px rgba(200,245,60,0.45)`,
        }}
      />
      {head > 0.001 && head < 0.999 ? (
        <div
          style={{
            position: 'absolute',
            left: head * width - thickness * 2,
            top: -thickness * 1.5,
            width: thickness * 4,
            height: thickness * 4,
            borderRadius: '50%',
            background: '#F4FFD6',
            boxShadow: `0 0 ${thickness * 10}px ${thickness * 3}px rgba(200,245,60,0.6)`,
          }}
        />
      ) : null}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 1 — Hook                                                       */
/* ------------------------------------------------------------------ */

const ShotHook: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = layout;

  const rise = spring({ frame, fps, config: { damping: 200, mass: 0.9 } });
  const y = interpolate(rise, [0, 1], [38, 0]);
  const tracking = interpolate(rise, [0, 1], [-0.01, -0.04]);

  const draw = interpolate(frame, [8, 52], [0, 1], { ...clamp, easing: Easing.bezier(0.65, 0, 0.25, 1) });

  // Exit: headline lifts away, line retracts from the left — handing off to the proof.
  const exit = interpolate(frame, [74, 90], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const tail = exit;

  const fontSize = portrait ? 128 : 136;
  const lineWidth = portrait ? 760 : 1180;

  const eyebrow = spring({ frame: frame - 4, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill>
      <SafeBox layout={layout}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginBottom: portrait ? 64 : 52,
            opacity: interpolate(eyebrow, [0, 1], [0, 1]) * (1 - exit),
            transform: `translateY(${interpolate(eyebrow, [0, 1], [14, 0]) - exit * 24}px)`,
          }}
        >
          <LogoGlyph size={portrait ? 56 : 52} />
          <div
            data-layer="wordmark"
            style={{
              fontFamily: FONT,
              fontSize: portrait ? 38 : 34,
              fontWeight: 600,
              letterSpacing: '-0.01em',
              color: 'rgba(243,246,252,0.82)',
            }}
          >
            Ledgerline
          </div>
        </div>

        <div
          data-layer="headline"
          style={{
            fontFamily: FONT,
            fontSize,
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: `${tracking}em`,
            color: TEXT_ON_NAVY,
            textAlign: 'center',
            maxWidth: portrait ? 900 : 1600,
            transform: `translateY(${y - exit * 48}px)`,
            opacity: 1 - exit,
            textShadow: '0 20px 60px rgba(0,0,0,0.35)',
          }}
        >
          Exports in one click
        </div>

        <div style={{ marginTop: portrait ? 72 : 64 }}>
          <AccentLine progress={draw} tail={tail} width={lineWidth} thickness={portrait ? 7 : 6} />
        </div>
      </SafeBox>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 2 — Proof                                                      */
/* ------------------------------------------------------------------ */

const ROWS = [
  { date: 'May 21', payee: 'Northwind Supply', amount: '$12,480.00' },
  { date: 'May 22', payee: 'Halcyon Studio', amount: '$3,215.50' },
  { date: 'May 23', payee: 'Arbor Freight', amount: '$8,902.75' },
];

const CLICK_AT = 16; // local frame the cursor presses the button
const COUNT_START = 20;
const COUNT_END = 80; // local 80 => global 170, before 0:06

const Cursor: React.FC<{ press: number }> = ({ press }) => (
  <svg
    data-layer="cursor"
    width="44"
    height="52"
    viewBox="0 0 22 26"
    style={{
      transform: `scale(${1 - press * 0.14})`,
      transformOrigin: '2px 2px',
      filter: 'drop-shadow(0 6px 10px rgba(6,13,34,0.35))',
    }}
  >
    <path d="M2 2 L2 21 L7.2 16.4 L10.6 24 L14 22.5 L10.7 15 L18 15 Z" fill={INK} stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
  </svg>
);

const ShotProof: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = layout;

  // Card is fully opaque from the first frame of the shot; it settles in depth.
  const settle = spring({ frame, fps, config: { damping: 18, stiffness: 120, mass: 0.9 } });
  const cardScale = interpolate(settle, [0, 1], [0.9, 1]);
  const cardY = interpolate(settle, [0, 1], [80, 0]);
  const cardTilt = interpolate(settle, [0, 1], [10, 0]);

  const exit = interpolate(frame, [106, 120], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });

  // Cursor travels in and presses the button.
  const travel = interpolate(frame, [0, CLICK_AT - 2], [0, 1], { ...clamp, easing: Easing.bezier(0.33, 0, 0.15, 1) });
  const press = interpolate(frame, [CLICK_AT - 2, CLICK_AT, CLICK_AT + 5], [0, 1, 0], clamp);
  const cursorX = interpolate(travel, [0, 1], [portrait ? 180 : 320, 0]);
  const cursorY = interpolate(travel, [0, 1], [portrait ? 260 : 220, 0]);
  const cursorOut = interpolate(frame, [CLICK_AT + 18, CLICK_AT + 30], [0, 1], clamp);

  // Ripple from the click.
  const ripple = interpolate(frame, [CLICK_AT, CLICK_AT + 22], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) });

  // Counter: 0 at shot start, exactly 10,000 by local frame 80.
  const countT = interpolate(frame, [COUNT_START, COUNT_END], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.45, 0, 0.2, 1),
  });
  const count = Math.round(countT * 10000);
  const done = interpolate(frame, [COUNT_END, COUNT_END + 10], [0, 1], clamp);
  const donePop = spring({ frame: frame - COUNT_END, fps, config: { damping: 12, stiffness: 180 } });

  const cardWidth = portrait ? 900 : 1180;
  const pad = portrait ? 48 : 56;
  const cell = portrait ? 28 : 28;
  const rowH = portrait ? 92 : 84;

  return (
    <AbsoluteFill style={{ perspective: 1800 }}>
      <SafeBox layout={layout}>
        <div
          data-layer="product"
          style={{
            width: cardWidth,
            background: PAPER,
            borderRadius: 32,
            padding: pad,
            boxSizing: 'border-box',
            fontFamily: FONT,
            color: INK,
            transform: `translateY(${cardY - exit * 30}px) scale(${cardScale * (1 - exit * 0.04)}) rotateX(${cardTilt}deg)`,
            transformOrigin: '50% 100%',
            opacity: 1 - exit,
            boxShadow:
              '0 2px 0 rgba(255,255,255,0.6) inset, 0 50px 120px -20px rgba(0,0,0,0.6), 0 18px 40px -10px rgba(3,8,24,0.5), 0 0 0 1px rgba(255,255,255,0.08)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: portrait ? 40 : 36 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div data-layer="card-title" style={{ fontSize: portrait ? 40 : 38, fontWeight: 700, letterSpacing: '-0.02em' }}>
                Transactions
              </div>
              <div data-layer="card-subtitle" style={{ fontSize: portrait ? 24 : 22, color: MUTED, fontWeight: 500 }}>
                Q2 · Operating account
              </div>
            </div>

            <div style={{ position: 'relative' }}>
              {/* ripple */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 999,
                  border: `3px solid ${LIME}`,
                  opacity: ripple > 0 ? 1 - ripple : 0,
                  transform: `scale(${1 + ripple * 0.35})`,
                }}
              />
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  background: LIME,
                  borderRadius: 999,
                  padding: portrait ? '22px 34px' : '20px 32px',
                  transform: `scale(${1 - press * 0.06})`,
                  boxShadow: `0 10px 24px -8px rgba(155,203,18,0.7), inset 0 -3px 0 rgba(0,0,0,0.08)`,
                }}
              >
                <svg width={portrait ? 28 : 26} height={portrait ? 28 : 26} viewBox="0 0 24 24" fill="none">
                  {done > 0 ? (
                    <path
                      d="M5 12.5 L10 17 L19 7"
                      stroke={INK}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="24"
                      strokeDashoffset={24 * (1 - done)}
                    />
                  ) : (
                    <>
                      <path d="M12 4 V15" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
                      <path d="M7 10.5 L12 15.5 L17 10.5" stroke={INK} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M5 20 H19" stroke={INK} strokeWidth="2.6" strokeLinecap="round" />
                    </>
                  )}
                </svg>
                <span data-layer="button" style={{ fontSize: portrait ? 30 : 28, fontWeight: 700, letterSpacing: '-0.01em', color: INK }}>
                  Export CSV
                </span>
              </div>
              {/* cursor */}
              <div
                style={{
                  position: 'absolute',
                  left: '62%',
                  top: '58%',
                  opacity: 1 - cursorOut,
                  transform: `translate(${cursorX + cursorOut * 40}px, ${cursorY + cursorOut * 60}px)`,
                }}
              >
                <Cursor press={press} />
              </div>
            </div>
          </div>

          {/* Table */}
          <div style={{ borderTop: `1px solid ${RULE}` }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: portrait ? 64 : 60,
                fontSize: portrait ? 20 : 19,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: MUTED,
                borderBottom: `1px solid ${RULE}`,
              }}
            >
              <div data-layer="table-header-date" style={{ width: portrait ? 160 : 220 }}>Date</div>
              <div data-layer="table-header-payee" style={{ flex: 1 }}>Payee</div>
              <div data-layer="table-header-amount" style={{ width: 240, textAlign: 'right' }}>Amount</div>
            </div>

            {ROWS.map((row, i) => {
              const enter = spring({ frame: frame - 3 - i * 4, fps, config: { damping: 200 } });
              const x = interpolate(enter, [0, 1], [28, 0]);
              // Highlight sweeps each row as the export runs.
              const sweep = interpolate(countT, [i / 3, (i + 1) / 3], [0, 1], clamp);
              const lit = sweep > 0 && sweep < 1 ? 1 : 0;
              const n = i + 1;
              return (
                <div
                  key={row.payee}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    height: rowH,
                    fontSize: cell,
                    borderBottom: i < ROWS.length - 1 ? `1px solid ${RULE}` : 'none',
                    transform: `translateX(${x}px)`,
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: -pad / 2,
                      right: -pad / 2,
                      top: 4,
                      bottom: 4,
                      borderRadius: 14,
                      background: `linear-gradient(90deg, rgba(200,245,60,0.28) ${sweep * 100}%, rgba(200,245,60,0.0) ${sweep * 100}%)`,
                      opacity: lit ? 1 : sweep >= 1 ? interpolate(frame, [COUNT_END, COUNT_END + 14], [0.5, 0], clamp) : 0,
                    }}
                  />
                  <div data-layer={`row-${n}-date`} style={{ position: 'relative', width: portrait ? 160 : 220, color: MUTED, fontWeight: 500 }}>
                    {row.date}
                  </div>
                  <div data-layer={`row-${n}-payee`} style={{ position: 'relative', flex: 1, fontWeight: 600 }}>
                    {row.payee}
                  </div>
                  <div
                    data-layer={`row-${n}-amount`}
                    style={{ position: 'relative', width: 240, textAlign: 'right', fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}
                  >
                    {row.amount}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Export status */}
          <div
            style={{
              marginTop: portrait ? 36 : 32,
              padding: portrait ? '30px 34px' : '28px 32px',
              borderRadius: 22,
              background: '#F4F6FB',
              border: `1px solid ${RULE}`,
              display: 'flex',
              flexDirection: 'column',
              gap: 20,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <div
                data-layer="counter"
                style={{
                  fontSize: portrait ? 68 : 64,
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1,
                  color: INK,
                  transform: `scale(${1 + (done > 0 ? (1 - donePop) * 0.04 : 0)})`,
                  transformOrigin: 'left bottom',
                }}
              >
                {`${formatThousands(count)} rows`}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <svg width="26" height="30" viewBox="0 0 20 24" fill="none">
                  <path d="M3 1.5 H12.5 L17.5 6.5 V22.5 H3 Z" fill="#fff" stroke={MUTED} strokeWidth="1.5" strokeLinejoin="round" />
                  <path d="M12.5 1.5 V6.5 H17.5" stroke={MUTED} strokeWidth="1.5" strokeLinejoin="round" />
                  <rect x="5.5" y="12" width="9.5" height="2" rx="1" fill={LIME_DEEP} />
                  <rect x="5.5" y="16" width="7" height="2" rx="1" fill={MUTED} opacity="0.5" />
                </svg>
                <span data-layer="filename" style={{ fontFamily: MONO, fontSize: portrait ? 22 : 21, color: MUTED }}>
                  ledger-q2.csv
                </span>
              </div>
            </div>
            <div data-layer="progress" style={{ height: 10, borderRadius: 10, background: '#E3E7F0', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${countT * 100}%`,
                  height: '100%',
                  borderRadius: 10,
                  background: `linear-gradient(90deg, ${LIME_DEEP}, ${LIME})`,
                  boxShadow: '0 0 12px rgba(200,245,60,0.6)',
                }}
              />
            </div>
          </div>
        </div>
      </SafeBox>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Shot 3 — Call to action                                             */
/* ------------------------------------------------------------------ */

const URL_IN = 12; // local frame; URL fully visible by local 26 (global 236) < 0:08

const ShotCTA: React.FC<{ layout: Layout }> = ({ layout }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { portrait } = layout;

  const rise = spring({ frame, fps, config: { damping: 200, mass: 0.8 } });
  const headY = interpolate(rise, [0, 1], [44, 0]);
  const tracking = interpolate(rise, [0, 1], [-0.015, -0.04]);

  const logo = spring({ frame: frame - 2, fps, config: { damping: 14, stiffness: 160 } });
  const draw = interpolate(frame, [4, 30], [0, 1], { ...clamp, easing: Easing.bezier(0.65, 0, 0.25, 1) });

  const urlIn = spring({ frame: frame - URL_IN, fps, config: { damping: 16, stiffness: 170 } });
  const urlOpacity = interpolate(frame, [URL_IN, URL_IN + 8], [0, 1], clamp);
  const pulse = 0.5 + 0.5 * Math.sin((frame / fps) * Math.PI * 2 * 0.8);

  const fontSize = portrait ? 116 : 124;

  return (
    <AbsoluteFill>
      <SafeBox layout={layout}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginBottom: portrait ? 56 : 48,
            transform: `scale(${interpolate(logo, [0, 1], [0.85, 1])})`,
            opacity: interpolate(frame, [0, 6], [0.0, 1], clamp),
          }}
        >
          <LogoGlyph size={portrait ? 64 : 60} />
          <div
            data-layer="wordmark"
            style={{ fontFamily: FONT, fontSize: portrait ? 44 : 40, fontWeight: 650, letterSpacing: '-0.015em', color: TEXT_ON_NAVY }}
          >
            Ledgerline
          </div>
        </div>

        <div
          data-layer="headline"
          style={{
            fontFamily: FONT,
            fontSize,
            fontWeight: 700,
            lineHeight: 1.02,
            letterSpacing: `${tracking}em`,
            color: TEXT_ON_NAVY,
            textAlign: 'center',
            maxWidth: portrait ? 900 : 1600,
            transform: `translateY(${headY}px)`,
            textShadow: '0 20px 60px rgba(0,0,0,0.35)',
          }}
        >
          Live today for every plan
        </div>

        <div style={{ marginTop: portrait ? 52 : 44 }}>
          <AccentLine progress={draw} width={portrait ? 300 : 360} thickness={6} />
        </div>

        <div
          style={{
            marginTop: portrait ? 56 : 48,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: portrait ? '22px 40px' : '20px 38px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.16)',
            boxShadow: '0 24px 60px -20px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)',
            opacity: urlOpacity,
            transform: `translateY(${interpolate(urlIn, [0, 1], [26, 0])}px) scale(${interpolate(urlIn, [0, 1], [0.94, 1])})`,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              background: LIME,
              boxShadow: `0 0 ${8 + pulse * 14}px rgba(200,245,60,${0.5 + pulse * 0.4})`,
            }}
          />
          <span
            data-layer="url"
            style={{ fontFamily: FONT, fontSize: portrait ? 42 : 40, fontWeight: 600, letterSpacing: '-0.01em', color: TEXT_ON_NAVY }}
          >
            ledgerline.app
          </span>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M6 12 H18 M13 7 L18 12 L13 17" stroke={LIME} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </SafeBox>
    </AbsoluteFill>
  );
};

/* ------------------------------------------------------------------ */
/* Root                                                                */
/* ------------------------------------------------------------------ */

export default function Video() {
  const layout = useLayout();
  const [s1, s2, s3] = composition.shots;

  return (
    <AbsoluteFill style={{ background: NAVY_DEEP, fontFamily: FONT }}>
      <Background layout={layout} />
      <Sequence from={s1.from} durationInFrames={s1.durationInFrames} name="Shot 1 · Hook">
        <ShotHook layout={layout} />
      </Sequence>
      <Sequence from={s2.from} durationInFrames={s2.durationInFrames} name="Shot 2 · Proof">
        <ShotProof layout={layout} />
      </Sequence>
      <Sequence from={s3.from} durationInFrames={s3.durationInFrames} name="Shot 3 · Call to action">
        <ShotCTA layout={layout} />
      </Sequence>
    </AbsoluteFill>
  );
}
