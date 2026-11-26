/** Scene timing, derived from the voiceover clips (video/public/vo/*.json). */
import hook from '../public/vo/hook.json';
import code from '../public/vo/code.json';
import vibes from '../public/vo/vibes.json';
import defects from '../public/vo/defects.json';
import kane from '../public/vo/kane.json';
import frontier from '../public/vo/frontier.json';
import intro from '../public/vo/intro.json';
import storyboard from '../public/vo/storyboard.json';
import compose from '../public/vo/compose.json';
import judge from '../public/vo/judge.json';
import katch from '../public/vo/catch.json';
import loop from '../public/vo/loop.json';
import proof from '../public/vo/proof.json';
import seal from '../public/vo/seal.json';
import numbers from '../public/vo/numbers.json';
import close from '../public/vo/close.json';
import tag from '../public/vo/tag.json';

export const FPS = 30;

export type Vo = { id: string; text: string; duration: number; speechEnd: number; words: { text: string; start: number; end: number }[] };

const PLAN: { id: string; vo: Vo; pre: number; post: number; dark?: boolean }[] = [
  { id: 'hook', vo: hook, pre: 0.7, post: 0.35, dark: true },
  { id: 'code', vo: code, pre: 0.15, post: 0.45, dark: true },
  { id: 'vibes', vo: vibes, pre: 0.3, post: 0.35, dark: true },
  { id: 'defects', vo: defects, pre: 0.2, post: 0.6, dark: true },
  { id: 'kane', vo: kane, pre: 0.35, post: 0.25, dark: true },
  { id: 'frontier', vo: frontier, pre: 0.1, post: 0.55, dark: true },
  { id: 'intro', vo: intro, pre: 2.0, post: 0.9 },
  { id: 'storyboard', vo: storyboard, pre: 0.35, post: 0.3 },
  { id: 'compose', vo: compose, pre: 0.2, post: 0.3 },
  { id: 'judge', vo: judge, pre: 0.2, post: 0.35 },
  { id: 'catch', vo: katch, pre: 0.2, post: 0.6 },
  { id: 'loop', vo: loop, pre: 0.3, post: 0.5 },
  { id: 'proof', vo: proof, pre: 0.2, post: 0.4 },
  { id: 'seal', vo: seal, pre: 0.2, post: 0.5 },
  { id: 'numbers', vo: numbers, pre: 0.3, post: 0.6 },
  { id: 'close', vo: close, pre: 0.4, post: 0.6 },
  { id: 'tag', vo: tag, pre: 0.3, post: 3.6 },
];

export type Scene = { id: string; from: number; dur: number; voAt: number; vo: Vo; dark: boolean };

export const SCENES: Scene[] = (() => {
  let t = 0;
  return PLAN.map((p) => {
    const dur = Math.round((p.pre + p.vo.duration + p.post) * FPS);
    const s = { id: p.id, from: t, dur, voAt: Math.round(p.pre * FPS), vo: p.vo, dark: Boolean(p.dark) };
    t += dur;
    return s;
  });
})();

export const TOTAL = SCENES.reduce((a, s) => a + s.dur, 0);
export const scene = (id: string) => SCENES.find((s) => s.id === id)!;

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9']/g, '');

/** Frame (relative to the scene) at which the n-th occurrence of `word` starts. */
export function at(sc: Scene, word: string, nth = 0, edge: 'start' | 'end' = 'start') {
  const target = norm(word);
  let k = 0;
  for (const w of sc.vo.words) {
    if (norm(w.text).startsWith(target)) {
      if (k === nth) return sc.voAt + Math.round((edge === 'start' ? w.start : w.end) * FPS);
      k++;
    }
  }
  throw new Error(`word "${word}" not found in ${sc.id}`);
}
/** Frame at which word index i starts (relative to the scene). */
export const wi = (sc: Scene, i: number) => sc.voAt + Math.round(sc.vo.words[Math.min(i, sc.vo.words.length - 1)].start * FPS);
export const voEnd = (sc: Scene) => sc.voAt + Math.round(sc.vo.speechEnd * FPS);
