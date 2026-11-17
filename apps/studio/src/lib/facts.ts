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
  /** rendered font size at full composition resolution (px); 0 for graphics */
  fontPx: number;
  /** x, y, w, h in percent of the frame */
  box: [number, number, number, number];
}

/**
 * The box a viewer perceives. A text layer laid out full-width with centred
 * words occupies only the glyphs, so measure the text itself (a DOM Range over
 * its contents). A layer with its own background or border (a button, a price
 * tag) is perceived as that shape, so keep the element box.
 */
function inkRect(el: HTMLElement): DOMRect {
  const box = el.getBoundingClientRect();
  const cs = getComputedStyle(el);
  const painted =
    (cs.backgroundColor && !/rgba\(0, 0, 0, 0\)|transparent/.test(cs.backgroundColor)) ||
    cs.backgroundImage !== 'none' ||
    (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none') ||
    cs.boxShadow !== 'none';
  if (painted || !(el.textContent ?? '').trim()) return box;
  const range = document.createRange();
  range.selectNodeContents(el);
  const rects = [...range.getClientRects()].filter((r) => r.width > 0.5 && r.height > 0.5);
  if (!rects.length) return box;
  const left = Math.min(...rects.map((r) => r.left));
  const top = Math.min(...rects.map((r) => r.top));
  const right = Math.max(...rects.map((r) => r.right));
  const bottom = Math.max(...rects.map((r) => r.bottom));
  return new DOMRect(left, top, right - left, bottom - top);
}

/**
 * Font size as composed (CSS px at the composition's full resolution). The
 * thumbnail is scaled with a transform, which does not change computed
 * font-size, so this is the size a viewer gets in the delivered video.
 * A layer's size is that of its largest run of text.
 */
function fontPx(el: HTMLElement): number {
  let max = 0;
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!n.textContent?.trim() || !n.parentElement) continue;
    max = Math.max(max, parseFloat(getComputedStyle(n.parentElement).fontSize) || 0);
  }
  return Math.round(max);
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
    const r = inkRect(el);
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
    out.push({ layer: el.dataset.layer || '(unnamed)', text, kind: text ? 'text' : 'graphic', visible, inFrame, inSafe, bands, fontPx: text ? fontPx(el) : 0, box: [x, y, w, h] });
  });
  return out;
}
