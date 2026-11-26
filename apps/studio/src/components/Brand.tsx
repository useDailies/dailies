import { useId } from 'react';
import { BRAND } from '@dailies/shared';

/**
 * The dailies mark: a viewfinder (the frame Claude Code composes) holding a
 * check (Kane CLI proving it). Geometry matches brand/svg/mark.svg.
 */
export function Mark({ size = 24, variant = 'ink', radius = 16 }: { size?: number; variant?: 'ink' | 'light' | 'glyph' | 'mono-white'; radius?: number }) {
  const uid = useId().replace(/:/g, '');
  const tile = variant === 'ink' ? BRAND.colors.ink : variant === 'light' ? BRAND.colors.white : null;
  const frame = variant === 'ink' || variant === 'mono-white' ? BRAND.colors.white : BRAND.colors.ink;
  const check = variant === 'mono-white' ? BRAND.colors.white : `url(#g${uid})`;
  const x0 = 15, x1 = 49, y0 = 19, y1 = 45, L = 7.5;
  const corner = (d: string) => <path d={d} fill="none" stroke={frame} strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />;
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden className="brand-mark">
      <defs>
        <linearGradient id={`g${uid}`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor={BRAND.colors.claude} />
          <stop offset=".55" stopColor={BRAND.colors.accent} />
          <stop offset="1" stopColor={BRAND.colors.kane} />
        </linearGradient>
      </defs>
      {tile ? <rect width="64" height="64" rx={radius} fill={tile} /> : null}
      {corner(`M${x0} ${y0 + L}V${y0 + 2}a2 2 0 0 1 2-2H${x0 + L}`)}
      {corner(`M${x1 - L} ${y0}H${x1 - 2}a2 2 0 0 1 2 2V${y0 + L}`)}
      {corner(`M${x1} ${y1 - L}V${y1 - 2}a2 2 0 0 1-2 2H${x1 - L}`)}
      {corner(`M${x0 + L} ${y1}H${x0 + 2}a2 2 0 0 1-2-2V${y1 - L}`)}
      <path className="brand-check" d="M24.6 32.6L30.2 38.1L40.6 26.4" fill="none" stroke={check} strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** The wordmark as outlines; its i-dots are the two agents (clay = Claude Code, cobalt = Kane CLI). */
export function Wordmark({ height = 20, ink = BRAND.colors.ink, dots = true }: { height?: number; ink?: string; dots?: boolean }) {
  const w = BRAND.wordmark;
  const h = w.bottom - w.top;
  return (
    <svg height={height} viewBox={`0 ${w.top} ${w.width} ${h}`} aria-label="dailies" role="img" className="brand-wordmark">
      <path d={w.d} fill={ink} />
      {w.dots.map((d, i) => (
        <rect key={i} className={`brand-dot d${i}`} x={d.x} y={d.y} width={d.w} height={d.w} rx={d.w * 0.28} fill={dots ? d.color : ink} />
      ))}
    </svg>
  );
}

export function Lockup({ height = 28, ink = BRAND.colors.ink, mark = 'ink' as const }: { height?: number; ink?: string; mark?: 'ink' | 'light' }) {
  return (
    <span className="brand-lockup" style={{ gap: height * 0.3 }}>
      <Mark size={height} variant={mark} />
      <Wordmark height={height * 0.74} ink={ink} />
    </span>
  );
}
