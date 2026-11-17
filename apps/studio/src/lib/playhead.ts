import { useSyncExternalStore } from 'react';
import type { PlayerRef } from '@remotion/player';

/**
 * The playhead lives outside React state: the Player reports 30 updates a
 * second, and only the timeline's playhead and the timecode readout need them.
 */
export class Playhead {
  frame = 0;
  playing = false;
  player: PlayerRef | null = null;
  followers: PlayerRef[] = [];
  private subs = new Set<() => void>();

  subscribe = (fn: () => void) => {
    this.subs.add(fn);
    return () => this.subs.delete(fn);
  };
  private notify() {
    for (const s of this.subs) s();
  }
  set(frame: number) {
    if (frame === this.frame) return;
    this.frame = frame;
    this.notify();
  }
  setPlaying(p: boolean) {
    this.playing = p;
    this.notify();
  }
  attach(p: PlayerRef | null) {
    this.player = p;
  }
  seek(frame: number) {
    const f = Math.max(0, Math.round(frame));
    this.player?.seekTo(f);
    for (const fp of this.followers) fp.seekTo(f);
    this.set(f);
  }
  toggle() {
    if (!this.player) return;
    if (this.player.isPlaying()) {
      this.player.pause();
      for (const fp of this.followers) fp.pause();
    } else {
      this.player.play();
      for (const fp of this.followers) {
        fp.seekTo(this.player.getCurrentFrame());
        fp.play();
      }
    }
  }
}

export function useFrame(ph: Playhead) {
  return useSyncExternalStore(ph.subscribe, () => ph.frame);
}
export function usePlaying(ph: Playhead) {
  return useSyncExternalStore(ph.subscribe, () => ph.playing);
}
