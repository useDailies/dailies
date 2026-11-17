import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { api, STATIC, type Health } from '../lib/api';

export function Logo({ size = 22 }: { size?: number }) {
  return (
    <Link to="/" className="logo" aria-label="dailies home">
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
        <rect x="3" y="7" width="26" height="18" rx="3.5" fill="none" stroke="currentColor" strokeWidth="2.2" />
        <path d="M11 16.4l3.4 3.4L22 12.2" fill="none" stroke="var(--pass)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>dailies</span>
    </Link>
  );
}

let healthPromise: Promise<Health | null> | null = null;
export function useHealth() {
  const [h, setH] = useState<Health | null>(null);
  useEffect(() => {
    healthPromise ??= api.health();
    healthPromise.then(setH);
  }, []);
  return h;
}

export function AgentChips({ claudeActive, kaneActive, credits }: { claudeActive?: boolean; kaneActive?: boolean; credits?: number }) {
  const h = useHealth();
  if (STATIC)
    return (
      <div className="agents">
        <span className="chip chip-muted">Recorded run · replay</span>
      </div>
    );
  return (
    <div className="agents">
      <span className={`agent agent-claude ${claudeActive ? 'active' : ''}`} title={h?.claude.version ?? 'Claude Code not found'}>
        <i className={`dot ${h?.claude.installed ? 'ok' : 'bad'}`} />
        <b>Claude Code</b>
        <em>{h ? (h.claude.installed ? h.claude.model : 'not found') : '…'}</em>
      </span>
      <span className={`agent agent-kane ${kaneActive ? 'active' : ''}`} title={h?.kane.version ? `kane-cli ${h.kane.version}` : 'Kane CLI'}>
        <i className={`dot ${h?.kane.user ? 'ok' : 'bad'}`} />
        <b>Kane CLI</b>
        <em>
          {h?.kane.user ?? '…'}
          {h?.kane.credits != null ? ` · ${Math.round(h.kane.credits - (credits ?? 0)).toLocaleString()} cr` : ''}
        </em>
      </span>
    </div>
  );
}

export function TopBar({ children, right }: { children?: ReactNode; right?: ReactNode }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <Logo />
        <nav className="topnav">
          <NavLink to="/" end>
            Projects
          </NavLink>
          <NavLink to="/pitch">Pitch</NavLink>
        </nav>
        {children}
      </div>
      <div className="topbar-right">{right ?? <AgentChips />}</div>
    </header>
  );
}

export function Icon({ name, size = 16 }: { name: string; size?: number }) {
  const p: Record<string, ReactNode> = {
    play: <path d="M7 4.5v15l12-7.5z" fill="currentColor" />,
    pause: (
      <g fill="currentColor">
        <rect x="6" y="4.5" width="4" height="15" rx="1" />
        <rect x="14" y="4.5" width="4" height="15" rx="1" />
      </g>
    ),
    back: <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    fwd: <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    spark: <path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z" fill="currentColor" />,
    eye: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z" />
        <circle cx="12" cy="12" r="3" />
      </g>
    ),
    check: <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
    x: <path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />,
    seal: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round">
        <path d="M12 2.8l2.4 1.8 3-.2.9 2.9 2.4 1.8-1 2.8 1 2.8-2.4 1.8-.9 2.9-3-.2L12 21.2l-2.4-1.8-3 .2-.9-2.9L3.3 14.9l1-2.8-1-2.8 2.4-1.8.9-2.9 3 .2z" />
        <path d="M8.6 12.2l2.3 2.3 4.6-4.6" strokeLinecap="round" />
      </g>
    ),
    split: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M12 3v18" />
      </g>
    ),
    xray: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="4" width="16" height="16" rx="1.5" strokeDasharray="3 2.5" />
        <rect x="8" y="9" width="8" height="5" rx="1" />
      </g>
    ),
    zones: (
      <g fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="6" y="2.5" width="12" height="19" rx="2" />
        <path d="M6 6.5h12M6 15h12" />
      </g>
    ),
    stop: <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor" />,
    plus: <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />,
    replay: <path d="M4 12a8 8 0 1 0 2.4-5.7M4 4v4.5h4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
    code: <path d="M8.5 7L3.5 12l5 5M15.5 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className="icon">
      {p[name]}
    </svg>
  );
}
