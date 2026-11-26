import { useEffect, useState } from 'react';
import { auth, type Me } from './api';

/** The signed-in account, shared by every header and page. */
let current: Me | null = null;
let pending: Promise<Me> | null = null;
const subs = new Set<(m: Me) => void>();

export function refreshMe() {
  pending = auth.me().then((m) => {
    current = m;
    subs.forEach((f) => f(m));
    return m;
  });
  return pending;
}

export function setMe(m: Me) {
  current = m;
  subs.forEach((f) => f(m));
}

/** null while loading; { user: null } when signed out. */
export function useMe(): Me | null {
  const [me, set] = useState<Me | null>(current);
  useEffect(() => {
    subs.add(set);
    if (!current) (pending ?? refreshMe()).then(set);
    return () => void subs.delete(set);
  }, []);
  return me;
}
