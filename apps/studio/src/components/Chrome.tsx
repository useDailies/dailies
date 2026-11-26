import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { api, STATIC, type Health } from '../lib/api';
import { Face, Icon } from './ui';

export { Icon } from './ui';

export function Logo() {
  return (
    <Link to="/" className="logo" aria-label="dailies home">
      <span className="logo-mark">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect x="3" y="6" width="18" height="12" rx="2.5" stroke="#fff" strokeWidth="2" />
          <path d="M8.6 12.2l2.4 2.4 4.6-4.6" stroke="#22c55e" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      dailies
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

/** The two agents, as collaborators in the top bar. */
export function AgentChips({ claudeActive, kaneActive }: { claudeActive?: boolean; kaneActive?: boolean }) {
  const h = useHealth();
  if (STATIC)
    return (
      <div className="agents">
        <span className={`avatar claude ${claudeActive ? 'active' : ''}`}>
          <Face who="claude" /> Claude Code
        </span>
        <span className={`avatar kane ${kaneActive ? 'active' : ''}`}>
          <Face who="kane" /> Kane CLI
        </span>
      </div>
    );
  return (
    <div className="agents">
      <span className={`avatar claude ${claudeActive ? 'active' : ''}`} title={h?.claude.version ?? 'Claude Code not found'}>
        <Face who="claude" />
        Claude Code
        <em>{h ? (h.claude.installed ? h.claude.model : 'missing') : '…'}</em>
      </span>
      <span className={`avatar kane ${kaneActive ? 'active' : ''}`} title={h?.kane.version ? `kane-cli ${h.kane.version} · ${h.kane.user}` : 'Kane CLI'}>
        <Face who="kane" />
        Kane CLI
        <em>{h?.kane.credits != null ? `${Math.round(h.kane.credits).toLocaleString()} cr` : h ? 'logged out' : '…'}</em>
      </span>
    </div>
  );
}

export function TopBar({ children, right }: { children?: ReactNode; right?: ReactNode }) {
  return (
    <header className="topbar">
      <div className="topbar-l">
        <Logo />
        {children ?? (
          <nav className="topnav">
            <NavLink to="/" end>
              Projects
            </NavLink>
            <NavLink to="/pitch">Pitch</NavLink>
          </nav>
        )}
      </div>
      <div className="topbar-r">{right ?? <AgentChips />}</div>
    </header>
  );
}

export function Stepper({ hasDraft, busy, reviewed, sealed }: { hasDraft: boolean; busy: string | null; reviewed: boolean; sealed: boolean }) {
  const steps = [
    { k: 'sb', label: 'Storyboard', done: true, live: false },
    { k: 'draft', label: 'Draft', done: hasDraft && busy !== 'draft', live: busy === 'draft' || busy === 'plan' },
    { k: 'review', label: 'Kane review', done: reviewed && !['review', 'revise', 'gate'].includes(busy ?? ''), live: ['review', 'revise', 'gate'].includes(busy ?? '') },
    { k: 'seal', label: 'Sealed', done: sealed, live: busy === 'seal' },
  ];
  return (
    <ol className="stepper" aria-label="Progress">
      {steps.map((s) => (
        <li key={s.k} className={`${s.done && !s.live ? 'done' : ''} ${s.live ? 'live' : ''}`}>
          <i />
          <span>{s.label}</span>
        </li>
      ))}
    </ol>
  );
}

export function IconLink({ to, icon, label }: { to: string; icon: string; label: string }) {
  return (
    <Link to={to} className="btn ghost sm">
      <Icon name={icon} size={14} /> {label}
    </Link>
  );
}
