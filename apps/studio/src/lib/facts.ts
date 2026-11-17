import type { SafeZone } from '@dailies/shared';

export interface LayerFact {
  layer: string;
  text: string;
  /** text layers carry words; graphic layers don't */
  kind: 'text' | 'graphic';
  visible: boolean;
  inFrame: boolean;
  inSafe: boolean;
  /** which reserved bands the layer's box overlaps */
  bands: { top: boolean; bottom: boolean; side: boolean };
  /** x, y, w, h in percent of the frame */
  box: [number, number, number, number];
}

/** Opacity as the viewer sees it: the product of every ancestor's opacity up to the frame. */
function effectiveOpacity(el: Element, stop: Element): number {
  let o = 1;
  for (let n: Element | null = el; n && n !== stop; n = n.parentElement) {
    const cs = getComputedStyle(n);
    if (cs.display === 'none' || cs.visibility === 'hidden') return 0;
    o *= Number(cs.opacity);
  }
  return o;
}

/**
 * Measure every `data-layer` element inside one rendered frame. This is the
 * browser's own layout (getBoundingClientRect), the same geometry the pixels
 * come from — Kane reads it from the facts table for exact values.
 */
export function measureLayers(frame: HTMLElement, safe: SafeZone): LayerFact[] {
  const fr = frame.getBoundingClientRect();
  const tol = 0.4;
  const out: LayerFact[] = [];
  frame.querySelectorAll<HTMLElement>('[data-layer]').forEach((el) => {
    const r = el.getBoundingClientRect();
    const x = ((r.left - fr.left) / fr.width) * 100;
    const y = ((r.top - fr.top) / fr.height) * 100;
    const w = (r.width / fr.width) * 100;
    const h = (r.height / fr.height) * 100;
    const inFrame = x >= -tol && y >= -tol && x + w <= 100 + tol && y + h <= 100 + tol;
    const inSafe = x >= safe.left - tol && y >= safe.top - tol && x + w <= 100 - safe.right + tol && y + h <= 100 - safe.bottom + tol;
    const onScreen = r.width > 0.5 && r.height > 0.5 && x < 100 && y < 100 && x + w > 0 && y + h > 0;
    const visible = onScreen && effectiveOpacity(el, frame) > 0.08;
    const text = (el.innerText ?? el.textContent ?? '').replace(/\s+/g, ' ').trim();
    const bands = {
      top: y < safe.top - tol,
      bottom: y + h > 100 - safe.bottom + tol,
      side: x < safe.left - tol || x + w > 100 - safe.right + tol,
    };
    out.push({ layer: el.dataset.layer || '(unnamed)', text, kind: text ? 'text' : 'graphic', visible, inFrame, inSafe, bands, box: [x, y, w, h] });
  });
  return out;
}
