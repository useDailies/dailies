import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import type { Project } from '@dailies/shared';
import { api, auth, type CliToken } from '../lib/api';
import { useMe } from '../lib/session';
import { SiteHeader } from '../components/Chrome';
import { Face, Icon } from '../components/ui';
import { Card } from './Home';

const ago = (iso: string | null) => {
  if (!iso) return 'never';
  const s = (Date.now() - Date.parse(iso)) / 1000;
  return s < 90 ? 'just now' : s < 5400 ? `${Math.round(s / 60)} min ago` : s < 129600 ? `${Math.round(s / 3600)} h ago` : `${Math.round(s / 86400)} days ago`;
};

function Copy({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button type="button" className="iconbtn" aria-label="Copy" onClick={() => navigator.clipboard.writeText(text).then(() => (setDone(true), setTimeout(() => setDone(false), 1200)))}>
      <Icon name={done ? 'check' : 'copy'} size={14} />
    </button>
  );
}
export function Cmd({ children }: { children: string }) {
  return (
    <div className="cmd">
      <code>
        <span className="cmd-p">$</span> {children}
      </code>
      <Copy text={children} />
    </div>
  );
}

/** Your account: the spots your agents made, and the agents you connected. */
export default function Account() {
  const me = useMe();
  const [spots, setSpots] = useState<Project[] | null>(null);
  const [tokens, setTokens] = useState<CliToken[] | null>(null);
  const load = () => {
    api.projects().then((ps) => setSpots(ps.filter((p) => p.owner && p.owner === me?.user?.id)));
    auth.tokens().then(setTokens).catch(() => setTokens([]));
  };
  useEffect(() => {
    if (me?.user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [me?.user?.id]);
  if (me && !me.user) return <Navigate to="/login?next=/account" replace />;
  if (!me?.user) return null;
  const agentSpots = spots?.filter((p) => p.source === 'mcp').length ?? 0;
  return (
    <div className="page">
      <SiteHeader />
      <section className="acct-page">
        <div className="acct-top">
          <div>
            <span className="eyebrow">
              <Icon name="user" size={12} /> {me.user.email}
            </span>
            <h1>Hi {me.user.name.split(' ')[0]}.</h1>
            <p className="lede">
              {spots ? `${spots.length} spot${spots.length === 1 ? '' : 's'} · ${agentSpots} made by your coding agents through the dailies MCP server.` : '…'}
            </p>
          </div>
          <div className="acct-connect">
            <h3>
              <Face who="claude" size={18} /> Connect Claude Code
            </h3>
            <Cmd>claude plugin marketplace add &lt;dailies repo&gt;</Cmd>
            <Cmd>claude plugin install dailies@dailies</Cmd>
            <Cmd>dailies login</Cmd>
            <p className="muted">
              Then ask Claude: <i>“make the video in video/storyboard.md with dailies”</i>. Cursor, Codex and others: see the <Link to="/docs/mcp">MCP docs</Link>.
            </p>
          </div>
        </div>

        <div className="gallery-head">
          <h2>Your spots</h2>
          <span className="muted">{spots?.length ?? ''}</span>
        </div>
        {spots && !spots.length ? (
          <div className="empty-spots">
            <Icon name="spark" size={18} />
            <div>
              <b>No spots yet.</b>
              <span>Connect your agent above, or make one in the studio.</span>
            </div>
            <Link to="/new" className="btn sm">
              <Icon name="plus" size={13} /> New spot
            </Link>
          </div>
        ) : (
          <div className="cards">{spots?.map((p) => <Card key={p.id} p={p} />)}</div>
        )}

        <div className="gallery-head">
          <h2>Connected agents</h2>
          <span className="muted">tokens issued by `dailies login`</span>
        </div>
        <div className="tokens">
          {tokens?.length ? (
            tokens.map((t) => (
              <div key={t.id} className="token-row">
                <Icon name="key" size={15} />
                <div>
                  <b>{t.label}</b>
                  <span>
                    connected {ago(t.createdAt)} · last used {ago(t.lastUsedAt)}
                    {t.expiresAt ? ` · expires ${new Date(t.expiresAt).toLocaleDateString()}` : ''}
                  </span>
                </div>
                <button type="button" className="btn sm ghost" onClick={() => auth.revoke(t.id).then(load)}>
                  Revoke
                </button>
              </div>
            ))
          ) : (
            <p className="muted">No agents connected yet. Run <code>dailies login</code> in a terminal.</p>
          )}
        </div>
      </section>
    </div>
  );
}
