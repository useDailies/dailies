import type { Project } from '@dailies/shared';

/**
 * API base. In dev Vite proxies /api to the server. A static build of the
 * studio (hosted demo) reads recorded runs from /recorded/<id>/… instead.
 */
export const STATIC = import.meta.env.VITE_DAILIES_STATIC === '1';

async function j<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers ?? {}) } });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((body as { error?: string }).error ?? `${res.status} ${res.statusText}`);
  return body as T;
}

export interface Health {
  ok: boolean;
  claude: { installed: boolean; version: string | null; model: string };
  kane: { version: string | null; user: string | null; credits: number | null };
  studioUrl: string;
}

export const api = {
  health: () => (STATIC ? Promise.resolve(null) : j<Health>('/api/health').catch(() => null)),
  projects: () => (STATIC ? j<Project[]>('/recorded/index.json') : j<Project[]>('/api/projects')),
  project: (id: string) => (STATIC ? j<Project>(`/recorded/${id}/project.json`) : j<Project>(`/api/projects/${id}`)),
  create: (storyboard: string, title?: string) => j<Project>('/api/projects', { method: 'POST', body: JSON.stringify({ storyboard, title }) }),
  patch: (id: string, body: { title?: string; gate?: boolean }) => j<Project>(`/api/projects/${id}`, { method: 'PATCH', body: JSON.stringify(body) }),
  saveStoryboard: (id: string, storyboard: string) => j<Project>(`/api/projects/${id}/storyboard`, { method: 'PUT', body: JSON.stringify({ storyboard }) }),
  action: (id: string, action: 'draft' | 'review' | 'seal' | 'cancel') => j<{ ok: true }>(`/api/projects/${id}/${action}`, { method: 'POST', body: '{}' }),
  events: (id: string) => (STATIC ? j<any[]>(`/recorded/${id}/events.json`) : j<any[]>(`/api/projects/${id}/events.json`)),
  diff: (id: string, a: number | 'live', b: number | 'live') =>
    STATIC
      ? j<{ added: boolean; removed: boolean; value: string; count: number }[]>(`/recorded/${id}/diff-${a}-${b}.json`)
      : j<{ added: boolean; removed: boolean; value: string; count: number }[]>(`/api/projects/${id}/diff/${a}/${b}`),
  source: async (id: string, v: number | 'live') => {
    const res = await fetch(STATIC ? `/recorded/${id}/v${v}/Video.tsx` : `/api/projects/${id}/source/${v}`);
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
