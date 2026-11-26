import { useState, type FormEvent } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { auth } from '../lib/api';
import { setMe } from '../lib/session';
import { Lockup } from '../components/Brand';
import { Face, Icon } from '../components/ui';

/** Sign in / create an account. Spots made by your agents through the MCP server land here. */
export default function Login() {
  const [q] = useSearchParams();
  const nav = useNavigate();
  const [mode, setMode] = useState<'in' | 'up'>(q.get('mode') === 'signup' ? 'up' : 'in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const next = q.get('next') || '/account';

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const me = mode === 'up' ? await auth.signup(email, password, name) : await auth.login(email, password);
      setMe(me);
      nav(next.startsWith('/') ? next : '/account', { replace: true });
    } catch (e) {
      setErr((e as Error).message);
      setBusy(false);
    }
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-logo" aria-label="dailies home">
        <Lockup height={30} />
      </Link>
      <form className="auth-card" onSubmit={submit}>
        <h1>{mode === 'up' ? 'Create your dailies account' : 'Sign in to dailies'}</h1>
        <p className="muted">
          {next.startsWith('/device') ? 'Sign in to connect your coding agent.' : 'Every video your agent makes through the dailies MCP server is saved to your account.'}
        </p>
        {mode === 'up' ? (
          <label>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Ada Lovelace" />
          </label>
        ) : null}
        <label>
          Email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" placeholder="you@studio.com" />
        </label>
        <label>
          Password
          <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete={mode === 'up' ? 'new-password' : 'current-password'} placeholder={mode === 'up' ? 'At least 8 characters' : ''} />
        </label>
        {err ? <p className="err">{err}</p> : null}
        <button type="submit" className="btn ink lg" disabled={busy}>
          {busy ? <span className="spinner" /> : null} {mode === 'up' ? 'Create account' : 'Sign in'}
        </button>
        <button type="button" className="auth-switch" onClick={() => (setMode(mode === 'up' ? 'in' : 'up'), setErr(null))}>
          {mode === 'up' ? 'Already have an account? Sign in' : 'New to dailies? Create an account'}
        </button>
      </form>
      <p className="auth-foot">
        <Face who="claude" size={16} /> Claude Code writes it <Face who="kane" size={16} /> Kane CLI proves it ·{' '}
        <Link to="/docs/mcp">
          <Icon name="terminal" size={12} /> MCP docs
        </Link>
      </p>
    </div>
  );
}
