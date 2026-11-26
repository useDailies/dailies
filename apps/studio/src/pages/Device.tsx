import { useEffect, useState } from 'react';
import { Link, Navigate, useLocation, useSearchParams } from 'react-router-dom';
import { auth } from '../lib/api';
import { useMe } from '../lib/session';
import { Lockup } from '../components/Brand';
import { Face, Icon } from '../components/ui';

/** Approve `dailies login` from a terminal: the device-code half of the sign-in. */
export default function Device() {
  const [q] = useSearchParams();
  const loc = useLocation();
  const me = useMe();
  const [code, setCode] = useState((q.get('code') ?? '').toUpperCase());
  const [info, setInfo] = useState<{ client: string; user_code: string } | null>(null);
  const [state, setState] = useState<'idle' | 'checking' | 'approved' | 'denied' | 'error'>('idle');
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!me?.user || code.replace(/[^A-Z]/g, '').length !== 8) return;
    setState('checking');
    auth
      .deviceInfo(code)
      .then((i) => (setInfo(i), setState('idle'), setErr(null)))
      .catch((e) => (setInfo(null), setState('error'), setErr(e.message)));
  }, [me?.user, code]);

  if (me && !me.user) return <Navigate to={`/login?next=${encodeURIComponent(loc.pathname + loc.search)}`} replace />;
  const act = async (approve: boolean) => {
    try {
      await auth.approve(code, approve);
      setState(approve ? 'approved' : 'denied');
    } catch (e) {
      setErr((e as Error).message);
      setState('error');
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo" aria-label="dailies home">
        <Lockup height={30} />
      </Link>
      <div className="auth-card device-card">
        {state === 'approved' ? (
          <>
            <div className="device-done">
              <Face who="pass" size={44} />
            </div>
            <h1>Your agent is connected</h1>
            <p className="muted">
              Go back to your terminal: <code>dailies login</code> has finished. Spots your agent makes will appear in <Link to="/account">your account</Link>.
            </p>
          </>
        ) : state === 'denied' ? (
          <>
            <h1>Sign-in declined</h1>
            <p className="muted">Nothing was connected. You can close this tab.</p>
          </>
        ) : (
          <>
            <span className="eyebrow">
              <Icon name="terminal" size={12} /> Connect a coding agent
            </span>
            <h1>Approve this sign-in?</h1>
            <p className="muted">
              Check the code matches the one in your terminal. Approving lets <b>{info?.client ?? 'the dailies CLI'}</b> create spots and run Kane reviews in{' '}
              <b>{me?.user?.email}</b>.
            </p>
            <label>
              Code
              <input className="device-code" value={code} onChange={(e) => setCode(e.target.value.toUpperCase())} placeholder="ABCD-EFGH" maxLength={9} autoFocus />
            </label>
            {err ? <p className="err">{err}</p> : null}
            <div className="device-actions">
              <button type="button" className="btn ink lg" disabled={!info || state === 'checking'} onClick={() => act(true)}>
                {state === 'checking' ? <span className="spinner" /> : <Icon name="check" size={14} />} Approve
              </button>
              <button type="button" className="btn lg ghost" disabled={!info} onClick={() => act(false)}>
                Decline
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
