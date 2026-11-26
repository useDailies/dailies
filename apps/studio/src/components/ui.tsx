import { LOGOS, LOGO_COLORS } from '@dailies/shared';
import { useEffect, useRef, useState, type ReactNode } from 'react';

/** Lucide-style line icons (16px, 1.6 stroke). */
const PATHS: Record<string, ReactNode> = {
  play: <path d="M7 4.8v14.4l12-7.2z" fill="currentColor" stroke="none" />,
  pause: (
    <g fill="currentColor" stroke="none">
      <rect x="6.5" y="5" width="3.6" height="14" rx="1" />
      <rect x="13.9" y="5" width="3.6" height="14" rx="1" />
    </g>
  ),
  prev: <path d="M15 6l-6 6 6 6" />,
  next: <path d="M9 6l6 6-6 6" />,
  chev: <path d="M9 6l6 6-6 6" />,
  down: <path d="M6 9l6 6 6-6" />,
  check: <path d="M5 12.5l4.2 4.2L19 7" />,
  x: <path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />,
  spark: <path d="M12 3.5l2 5.5 5.5 2-5.5 2-2 5.5-2-5.5-5.5-2 5.5-2z" />,
  download: <path d="M12 4v11M7 10.5l5 5 5-5M5 20h14" />,
  copy: <path d="M9 9h10v11H9zM5 15V4h10" />,
  user: <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20a7.5 7.5 0 0 1 15 0" />,
  logout: <path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10" />,
  terminal: <path d="M4 5h16v14H4zM8 10l2.5 2L8 14M12.5 14H16" />,
  key: <path d="M14.5 9.5a4 4 0 1 1-1.2 2.8L4 21.6V19h2.5v-2.5H9l2.2-2.2M16.5 7.5h.01" />,
  doc: <path d="M7 3h7l4 4v14H7zM14 3v4h4M9.5 12h6M9.5 16h6" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
      <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5" />
    </>
  ),
  list: <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />,
  history: (
    <>
      <path d="M3.5 12a8.5 8.5 0 1 0 2.5-6" />
      <path d="M3.5 4v4h4M12 8v4.5l3 2" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" />,
  zones: (
    <>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2" />
      <path d="M6.5 6.5h11M6.5 15h11" />
    </>
  ),
  xray: (
    <>
      <path d="M4 8V5.5A1.5 1.5 0 0 1 5.5 4H8M16 4h2.5A1.5 1.5 0 0 1 20 5.5V8M20 16v2.5a1.5 1.5 0 0 1-1.5 1.5H16M8 20H5.5A1.5 1.5 0 0 1 4 18.5V16" />
      <rect x="8.5" y="9.5" width="7" height="5" rx="1" />
    </>
  ),
  split: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M12 3v18" />
    </>
  ),
  seal: (
    <>
      <path d="M12 3l2.3 1.7 2.9-.2.9 2.8 2.3 1.7-1 2.7 1 2.7-2.3 1.7-.9 2.8-2.9-.2L12 21l-2.3-1.7-2.9.2-.9-2.8-2.3-1.7 1-2.7-1-2.7 2.3-1.7.9-2.8 2.9.2z" />
      <path d="M9 12.2l2.1 2.1 4-4" />
    </>
  ),
  stop: <rect x="6.5" y="6.5" width="11" height="11" rx="2" fill="currentColor" stroke="none" />,
  plus: <path d="M12 5v14M5 12h14" />,
  replay: (
    <>
      <path d="M4 12a8 8 0 1 0 2.4-5.7" />
      <path d="M4 4.5V8.5h4" />
    </>
  ),
  more: (
    <g fill="currentColor" stroke="none">
      <circle cx="5.5" cy="12" r="1.6" />
      <circle cx="12" cy="12" r="1.6" />
      <circle cx="18.5" cy="12" r="1.6" />
    </g>
  ),
  panel: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M15 4v16" />
    </>
  ),
  timeline: (
    <>
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M6 10h7M9 6h9" />
    </>
  ),
  bolt: <path d="M13 3L5 13.5h6L10 21l8-10.5h-6z" />,
  plug: <path d="M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5" />,
  chat: <path d="M4.5 5.5h15v10h-9l-4 3.5v-3.5h-2z" />,
  frame: (
    <>
      <rect x="3" y="6" width="18" height="12" rx="1.5" />
      <path d="M7 6V3.5M17 6V3.5M7 20.5V18M17 20.5V18" />
    </>
  ),
  link: <path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6L11.5 7M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1.5-1.5" />,
  close: <path d="M7 7l10 10M17 7L7 17" />,
  dot: <circle cx="12" cy="12" r="4" fill="currentColor" stroke="none" />,
};

export function Icon({ name, size = 16, stroke = 1.6 }: { name: string; size?: number; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" aria-hidden className="icon">
      {PATHS[name]}
    </svg>
  );
}

/** A verdict is colour *and* glyph. */
export function VMark({ state, size }: { state: string; size?: number }) {
  const s = state === 'pass' || state === 'fail' || state === 'unknown' || state === 'running' ? state : 'owed';
  const glyph = s === 'pass' ? 'check' : s === 'fail' ? 'x' : s === 'unknown' ? 'dot' : null;
  return (
    <span className={`vmark ${s}`} style={size ? { width: size, height: size } : undefined} aria-label={s} role="img">
      {glyph ? <Icon name={glyph} size={size ? size * 0.62 : 10} stroke={3} /> : null}
    </span>
  );
}

/** The real agent logos: the Claude spark (clay) and the Kane CLI mark (cobalt, or `color`). */
export function AgentLogo({ who, size = 18, color }: { who: 'claude' | 'kane'; size?: number; color?: string }) {
  const l = LOGOS[who];
  const c = color ?? LOGO_COLORS[who];
  return l.stroke ? (
    <svg width={size} height={size} viewBox={l.viewBox} fill="none" aria-hidden className={`agent-logo ${who}`}>
      <path d={l.d} stroke={c} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg width={size} height={size} viewBox={l.viewBox} aria-hidden className={`agent-logo ${who}`}>
      <path d={l.d} fill={c} />
    </svg>
  );
}

export function Face({ who, size = 22, color }: { who: 'claude' | 'kane' | 'fail' | 'pass'; size?: number; color?: string }) {
  if (who === 'claude' || who === 'kane')
    return (
      <span className={`face logo ${who}`} style={{ width: size, height: size }} aria-hidden>
        <AgentLogo who={who} size={Math.round(size * (who === 'claude' ? 0.92 : 0.96))} color={color} />
      </span>
    );
  const letter = who === 'pass' ? '✓' : '!';
  return (
    <span className={`face ${who}`} style={{ width: size, height: size, fontSize: size * 0.48 }} aria-hidden>
      {letter}
    </span>
  );
}

/** Collapsible row: closed by default, details only on demand. */
export function Coll({
  icon,
  title,
  sub,
  meta,
  children,
  open: openProp,
  defaultOpen = false,
  flat,
  className = '',
  onToggle,
}: {
  icon?: ReactNode;
  title: ReactNode;
  sub?: ReactNode;
  meta?: ReactNode;
  children?: ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  flat?: boolean;
  className?: string;
  onToggle?: (o: boolean) => void;
}) {
  const [inner, setInner] = useState(defaultOpen);
  const open = openProp ?? inner;
  return (
    <div className={`coll ${open ? 'open' : ''} ${flat ? 'flat' : ''} ${className}`}>
      <button
        type="button"
        className="coll-h"
        aria-expanded={open}
        onClick={() => {
          setInner(!open);
          onToggle?.(!open);
        }}
      >
        {icon}
        <span className="ttl">
          <b>{title}</b>
          {sub ? <small>{sub}</small> : null}
        </span>
        {meta ? <span className="meta">{meta}</span> : null}
        {children ? (
          <span className="chev">
            <Icon name="chev" size={14} />
          </span>
        ) : null}
      </button>
      {children ? (
        <div className="coll-b">
          <div>
            <div className="coll-b-in">{open ? children : null}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

/** Close a popover on outside click / Escape. */
export function useDismiss(open: boolean, close: () => void) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('mousedown', onDown);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);
  return ref;
}

/** Elapsed m:ss since a timestamp, ticking every second. */
export function useElapsed(since: number | null | undefined) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    if (!since) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [since]);
  if (!since) return '';
  const s = Math.max(0, Math.round((now - since) / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
