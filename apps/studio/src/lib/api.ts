import type { Project } from '@dailies/shared';

/**
 * API base. In dev Vite proxies /api to the server. A static build of the
 * studio (hosted demo) reads recorded runs from /recorded/<id>/… instead.
 */
export const STATIC = import.meta.env.VITE_DAILIES_STATIC === '1';

/** Set by an inspection sheet: the spot's read-only key, for Kane's login-less browsers. */
let inspectKey: string | null = null;
export function setInspectKey(k: string | null | undefined) {
  inspectKey = k ?? null;
}
export const readHeaders = (): Record<string, string> => (inspectKey ? { 'x-dailies-key': inspectKey } : {});

async function j<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'content-type': 'application/json', ...readHeaders(), ...(init?.headers ?? {}) } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `${res.status} ${res.statusText}`);
  return body as T;
}

export interface Health {
  ok: boolean;
  claude: { installed: boolean; version: string | null; model: string };
  kane: { version: string | null; user: string | null; credits: number | null; ready?: boolean };
  studioUrl: string;
  /** false on an MCP-only (hosted) server: agents compose, the server only judges */
  drafting?: boolean;
}

export interface Me {
  user: { id: string; email: string; name: string; createdAt: string } | null;
  spots?: number;
  agentSpots?: number;
}
export interface CliToken {
  id: string;
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}

export const auth = {
  me: () => (STATIC ? Promise.resolve<Me>({ user: null }) : j<Me>('/api/auth/me').catch(() => ({ user: null }) as Me)),
  signup: (email: string, password: string, name?: string) => j<Me>('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
  login: (email: string, password: string) => j<Me>('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => j<{ ok: true }>('/api/auth/logout', { method: 'POST', body: '{}' }),
  deviceInfo: (code: string) => j<{ user_code: string; client: string; expires_in: number }>(`/api/auth/device/info?code=${encodeURIComponent(code)}`),
  approve: (code: string, approve: boolean) => j<{ ok: true; client: string; approved: boolean }>('/api/auth/device/approve', { method: 'POST', body: JSON.stringify({ code, approve }) }),
  tokens: () => j<CliToken[]>('/api/auth/tokens'),
  revoke: (id: string) => j<{ ok: true }>(`/api/auth/tokens/${id}`, { method: 'DELETE' }),
};

export const api = {
  health: () => (STATIC ? Promise.resolve(null) : j<Health>('/api/health').catch(() => null)),
  projects: () => (STATIC ? j<Project[]>('/recorded/index.json') : j<Project[]>('/api/projects')),
  project: (id: string) => (STATIC ? j<Project>(`/recorded/${id}/project.json`) : j<Project>(`/api/projects/${id}`)),
  create: (storyboard: string, title?: string) => j<Project>('/api/projects', { method: 'POST', body: JSON.stringify({ storyboard, title }) }),
  revise: (id: string, request: string) => j<{ ok: true }>(`/api/projects/${id}/revise`, { method: 'POST', body: JSON.stringify({ request }) }),
  patch: (id: string, body: { title?: string; gate?: boolean }) => j<Project>(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  saveStoryboard: (id: string, storyboard: string) => j<Project>(`/api/projects/${id}/storyboard`, { method: 'PUT', body: JSON.stringify({ storyboard }) }),
  action: (id: string, action: 'draft' | 'review' | 'seal' | 'cancel') => j<{ ok: true }>(`/api/projects/${id}/${action}`, { method: 'POST', body: '{}' }),
  events: (id: string) => (STATIC ? j<any[]>(`/recorded/${id}/events.json`) : j<any[]>(`/api/projects/${id}/events.json`)),
  diff: (id: string, a: number | 'live', b: number | 'live') =>
    STATIC
      ? j<{ added: boolean; removed: boolean; value: string; count: number }[]>(`/recorded/${id}/diff-${a}-${b}.json`)
      : j<{ added: boolean; removed: boolean; value: string; count: number }[]>(`/api/projects/${id}/diff/${a}/${b}`),
  source: async (id: string, v: number | 'live') => {
    const res = await fetch(STATIC ? `/recorded/${id}/v${v}/Video.tsx` : `/api/projects/${id}/source/${v}`, { headers: readHeaders() });
    return res.ok ? res.text() : '';
  },
  tests: (id: string) => (STATIC ? j<{ file: string; body: string }[]>(`/recorded/${id}/tests.json`) : j<{ file: string; body: string }[]>(`/api/projects/${id}/tests`)),
};

export function moduleUrl(id: string, v: number | 'live', bust = 0) {
  if (STATIC) return `/recorded/${id}/v${v}/module.js`;
  return `/api/projects/${id}/module/${v}${v === 'live' ? `?t=${bust}` : ''}`;
}

export function fileUrl(id: string, rel: string) {
  return STATIC ? `/recorded/${id}/${rel}` : `/api/projects/${id}/files/${rel}`;
}
