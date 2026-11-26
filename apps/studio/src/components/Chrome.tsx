import { useEffect, useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { api, auth, STATIC, type Health } from '../lib/api';
import { refreshMe, useMe } from '../lib/session';
import { useDismiss } from './ui';
import { Face, Icon } from './ui';
import { Lockup } from './Brand';

export { Icon } from './ui';

export function Logo({ height = 24 }: { height?: number }) {
  return (
    <Link to="/" className="logo" aria-label="dailies home">
      <Lockup height={height} />
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
      <div className="topbar-r">
        {right ?? <AgentChips />}
        <AccountMenu compact />
      </div>
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

/** Landing-only header: floating glass bar, centred nav, the full lockup. */
export function SiteHeader({ onDemo, demoLabel = 'Try the demo', busy }: { onDemo?: () => void; demoLabel?: string; busy?: boolean }) {
  const h = useHealth();
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return (
    <div className={`site-header-wrap ${scrolled ? 'scrolled' : ''}`}>
      <header className="site-header">
        <Link to="/" className="logo" aria-label="dailies home">
          <Lockup height={28} />
        </Link>
        <nav className="site-nav" aria-label="Main">
          <a href="#how">How it works</a>
          <a href="#spots">Spots</a>
          <NavLink to="/docs/mcp">MCP</NavLink>
          <NavLink to="/pitch">Pitch</NavLink>
          <NavLink to="/brand">Brand</NavLink>
        </nav>
        <div className="site-right">
          {!STATIC ? (
            <span className="site-agents" title={`Claude Code ${h?.claude.version ?? ''} · Kane CLI ${h?.kane.version ?? ''}`}>
              <Face who="claude" size={18} />
              <Face who="kane" size={18} />
              <i className={`dot ${h?.claude.installed && h?.kane.user ? 'ok' : h ? 'bad' : ''}`} />
              <span>{h ? (h.claude.installed && h.kane.user ? 'agents ready' : 'agent missing') : 'checking'}</span>
            </span>
          ) : null}
          <AccountMenu />
          {onDemo ? (
            <button type="button" className="btn ink" onClick={onDemo} disabled={busy}>
              {busy ? <span className="spinner" /> : <Icon name="spark" size={14} />} {demoLabel}
            </button>
          ) : null}
        </div>
      </header>
    </div>
  );
}

/** Sign in, or the account's avatar with its menu. Hidden in the static replay site. */
export function AccountMenu({ compact }: { compact?: boolean }) {
  const me = useMe();
  const [open, setOpen] = useState(false);
  const ref = useDismiss(open, () => setOpen(false));
  const nav = useNavigate();
  const loc = useLocation();
  if (STATIC || !me) return null;
  if (!me.user)
    return (
      <Link to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} className={`btn ${compact ? 'sm ghost' : 'ghost'}`}>
        <Icon name="user" size={14} /> Sign in
      </Link>
    );
  const initials = me.user.name
    .split(/\s+/)
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div className="acct" ref={ref as React.RefObject<HTMLDivElement>}>
      <button type="button" className="acct-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Account">
        <span className="acct-av">{initials}</span>
        {compact ? null : <span className="acct-name">{me.user.name}</span>}
      </button>
      {open ? (
        <div className="pop menu acct-menu">
          <div className="acct-head">
            <b>{me.user.name}</b>
            <span>{me.user.email}</span>
          </div>
          <Link to="/account" onClick={() => setOpen(false)}>
            <Icon name="user" size={14} /> Your spots &amp; agents
          </Link>
          <Link to="/docs/mcp" onClick={() => setOpen(false)}>
            <Icon name="terminal" size={14} /> Connect Claude Code / Cursor
          </Link>
          <button
            type="button"
            onClick={async () => {
              await auth.logout();
              await refreshMe();
              setOpen(false);
              nav('/');
            }}
          >
            <Icon name="logout" size={14} /> Sign out
          </button>
        </div>
      ) : null}
    </div>
  );
}
