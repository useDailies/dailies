import { appendFileSync, existsSync, mkdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import type { DailiesEvent } from '@dailies/shared';
import { config } from './config.ts';

type Listener = (e: DailiesEvent) => void;

/**
 * Per-project event log. Every event is appended to
 * workspaces/<id>/runs/events.ndjson, so a run can be replayed later with its
 * real timing — that file is what the hosted studio plays back.
 */
class Bus {
  private seq = new Map<string, number>();
  private listeners = new Map<string, Set<Listener>>();

  private file(projectId: string) {
    return join(config.workspaces, projectId, 'runs', 'events.ndjson');
  }

  history(projectId: string, since = 0): DailiesEvent[] {
    const f = this.file(projectId);
    if (!existsSync(f)) return [];
    const out: DailiesEvent[] = [];
    for (const line of readFileSync(f, 'utf8').split('\n')) {
      if (!line) continue;
      try {
        const e = JSON.parse(line) as DailiesEvent;
        if (e.seq > since) out.push(e);
      } catch {
        /* torn line */
      }
    }
    return out;
  }

  private nextSeq(projectId: string): number {
    if (!this.seq.has(projectId)) {
      const h = this.history(projectId);
      this.seq.set(projectId, h.length ? h[h.length - 1].seq : 0);
    }
    const n = this.seq.get(projectId)! + 1;
    this.seq.set(projectId, n);
    return n;
  }

  emit<T extends Record<string, unknown>>(projectId: string, type: string, data: T = {} as T): DailiesEvent<T> {
    const e: DailiesEvent<T> = { seq: this.nextSeq(projectId), ts: Date.now(), type, data };
    const f = this.file(projectId);
    mkdirSync(dirname(f), { recursive: true });
    appendFileSync(f, JSON.stringify(e) + '\n');
    for (const l of this.listeners.get(projectId) ?? []) {
      try {
        l(e as DailiesEvent);
      } catch {
        /* a dead SSE socket must not break the pipeline */
      }
    }
    return e;
  }

  subscribe(projectId: string, l: Listener): () => void {
    if (!this.listeners.has(projectId)) this.listeners.set(projectId, new Set());
    this.listeners.get(projectId)!.add(l);
    return () => this.listeners.get(projectId)?.delete(l);
  }
}

export const bus = new Bus();
