import { useEffect, useState, type ComponentType } from 'react';
import './deps';
import { moduleUrl } from './api';

export interface CompositionMeta {
  fps: number;
  durationInFrames: number;
  shots: { n: number; title: string; from: number; durationInFrames: number }[];
}

export interface LoadedComposition {
  Component: ComponentType;
  meta: CompositionMeta;
}

const cache = new Map<string, Promise<LoadedComposition>>();

/** Fetch a compiled composition module (server-compiled from what Claude wrote). */
export async function loadComposition(projectId: string, version: number | 'live', bust = 0): Promise<LoadedComposition> {
  const url = moduleUrl(projectId, version, bust);
  if (!cache.has(url)) {
    cache.set(
      url,
      (async () => {
        const res = await fetch(url);
        if (!res.ok) {
          const body = await res.json().catch(() => ({ error: res.statusText }));
          throw new Error(body.error ?? `module ${res.status}`);
        }
        const code = await res.text();
        const blob = URL.createObjectURL(new Blob([code], { type: 'text/javascript' }));
        try {
          const mod = await import(/* @vite-ignore */ blob);
          if (typeof mod.default !== 'function') throw new Error('src/Video.tsx has no default export component');
          const c = mod.composition ?? {};
          return {
            Component: mod.default as ComponentType,
            meta: {
              fps: Number(c.fps) || 30,
              durationInFrames: Number(c.durationInFrames) || 300,
              shots: Array.isArray(c.shots) ? c.shots : [],
            },
          };
        } finally {
          URL.revokeObjectURL(blob);
        }
      })(),
    );
    cache.get(url)!.catch(() => cache.delete(url));
  }
  return cache.get(url)!;
}

export function useComposition(projectId: string | undefined, version: number | 'live' | null, bust = 0) {
  const [state, setState] = useState<{ comp: LoadedComposition | null; error: string | null; loading: boolean }>({
    comp: null,
    error: null,
    loading: true,
  });
  useEffect(() => {
    if (!projectId || version === null) {
      setState({ comp: null, error: null, loading: false });
      return;
    }
    let alive = true;
    setState((s) => ({ ...s, loading: true }));
    loadComposition(projectId, version, bust)
      .then((comp) => alive && setState({ comp, error: null, loading: false }))
      // Keep showing the last good composition while Claude is mid-edit.
      .catch((e: Error) => alive && setState((s) => ({ comp: s.comp, error: e.message, loading: false })));
    return () => {
      alive = false;
    };
  }, [projectId, version, bust]);
  return state;
}
