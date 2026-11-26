import { CUTS, type CutId } from '@dailies/shared';

/** CLAUDE.md written into every workspace: the contract Claude Code composes against. */
export function claudeMd(cuts: CutId[]): string {
  const sizes = cuts.map((c) => `${CUTS[c].ratio} (${CUTS[c].width}x${CUTS[c].height})`).join(', ');
  return `# dailies composition contract

You are a motion designer writing a video as code. dailies plays your composition with
Remotion 4 in the browser and Kane CLI tests every cut of it against \`storyboard.md\`.

## The one file you own

\`src/Video.tsx\`. You may add helper files inside \`src/\`. Do not touch anything else:
not \`storyboard.md\`, \`surface.md\`, this file, \`versions/\`, \`.testmuai/\` or \`.context/\`.

## Exports

\`\`\`tsx
export const composition = {
  fps: 30,
  durationInFrames: 360,
  shots: [
    { n: 1, title: 'Product hero', from: 0, durationInFrames: 90 },
    // one entry per storyboard shot, in frames
  ],
};
export default function Video() { /* … */ }
\`\`\`

## Rules

1. **Imports:** only \`react\` and \`remotion\`. No other packages, no image or font files,
   no network. Draw everything with JSX, CSS, gradients and inline SVG.
2. **Every cut from one component.** The same component renders ${sizes}. Read
   \`width\` and \`height\` from \`useVideoConfig()\` and lay out for each aspect ratio.
   Never hard-code one frame size.
3. **Name your layers.** Every element that renders text carries \`data-layer="<name>"\`
   (for example \`caption\`, \`headline\`, \`button\`, \`wordmark\`) and contains only that text.
   Main graphics carry a \`data-layer\` too (\`product\`, \`background\`). Kane reads these.
4. **Deterministic.** Animate only from \`useCurrentFrame()\`, \`interpolate()\`, \`spring()\`
   and \`<Sequence>\`. No \`Math.random\`, \`Date\`, timers, effects or state.
5. **Fonts:** system stacks only, e.g. \`ui-sans-serif, system-ui, "Helvetica Neue", Arial\`.
6. **Craft.** This is a premium spot: considered typography, easing with \`spring\` or
   \`Easing\`, depth, motion that serves the story. The storyboard's exact words are exact.
`;
}

/**
 * surface.md is ingested by Kane next to the storyboard. Without it, Kane's test
 * design correctly reports "no surface to observe the cuts on" and writes gaps
 * instead of tests. With it, every designed test opens a real page.
 */
export function surfaceMd(cuts: CutId[]): string {
  const urls = cuts.map((c) => `{{sheet_url}}?cut=${c}`).join(' , ');
  const vertical = cuts.includes('9x16') ? ' (for 9:16: top 14%, bottom 35% and 6% at each side)' : '';
  return `# dailies inspection surface

The video described in the storyboard is a code-based composition. It is never inspected as an
MP4; every cut is inspected as a web page in a real browser.

## Contact sheet per cut
- URL: ${urls}
- The sheet shows one frame per storyboard timecode, labelled with a frame label and timecode, for example "F4 · 0:03".
- The header shows the cut's measured width and height in pixels, its frames per second, and its total duration in seconds and frames.
- The header also lists every shot with its start and end timecode as the composition declares it.
- A "Show safe zones" toggle shades the reserved bands of the cut${vertical}.
- Below the frames, a facts table lists every named layer in every frame: frame label, layer name, exact rendered text, whether it is visible, whether it is fully inside the frame, and whether it is inside the safe zone.
- The page shows "ready" in the header once every frame has rendered.
`;
}

export function draftPrompt(): string {
  return `Read storyboard.md and CLAUDE.md, then write src/Video.tsx.

This is the first draft of a premium motion-design spot. Follow the storyboard shot by shot,
honour the contract in CLAUDE.md, and make it look like work a studio would ship.
Write it in one pass and finish when the file is complete.`;
}

export interface FailedCheck {
  ac: string;
  text: string;
  cut: string;
  reason: string;
  where: string;
  line: number | null;
  lineText: string | null;
}

export interface SheetEvidence {
  cut: string;
  ratio: string;
  /** workspace-relative path to the screenshot Kane judged */
  screenshot?: string;
  report?: string;
}

export function correctionPrompt(
  fails: FailedCheck[],
  round: number,
  intro = true,
  evidence: SheetEvidence[] = [],
  opts: { file?: string; external?: boolean } = {},
): string {
  const file = opts.file ?? 'src/Video.tsx';
  const byAc = new Map<string, FailedCheck[]>();
  for (const f of fails) byAc.set(f.ac, [...(byAc.get(f.ac) ?? []), f]);
  const blocks = [...byAc.values()].map((group) => {
    const g = group[0];
    const cuts = group.map((x) => `${x.cut}: ${x.reason}${x.where ? ` (${x.where})` : ''}`).join('\n    ');
    const cite = g.line ? `\n  storyboard.md L${g.line}: ${g.lineText?.trim()}` : '';
    return `- [${g.ac}] ${g.text}${cite}\n  Kane CLI saw:\n    ${cuts}`;
  });
  const head = intro
    ? `Kane CLI reviewed your draft in a real browser, frame by frame, against acceptance criteria it derived from storyboard.md.
${fails.length} check${fails.length === 1 ? '' : 's'} failed:`
    : `Kane CLI re-ran the checks after your change (review round ${round}). These still fail:`;
  const ev = evidence.length
    ? `\n\nWhat Kane looked at (one contact sheet per cut, every storyboard timecode, measured in a real browser):\n${evidence
        .map((e) => `- ${e.ratio}: ${e.screenshot ? `screenshot ${e.screenshot} (${opts.external ? 'view it' : 'open it with Read'} to see exactly what Kane saw)` : 'no screenshot'}${e.report ? `\n    ${e.report.split('\n').join('\n    ')}` : ''}`)
        .join('\n')}`
    : '';
  return `${head}

${blocks.join('\n\n')}${ev}

Fix ${file} so every one of these holds in every listed cut, without breaking what
already passes. Do not edit the storyboard${opts.external ? '' : ', the tests or anything outside src/'}. When you
are done, ${opts.external ? 'call dailies_review again (or simply stop: the dailies Stop hook re-verifies before your turn can end)' : 'stop: Kane CLI re-verifies automatically before your turn can end'}.`;
}

/**
 * The contract an external agent (Claude Code, Cursor… through the dailies MCP
 * server) composes against. Same rules as the hosted workspace; the files live in
 * the user's own repository under `dir`.
 */
export function agentContract(cuts: CutId[], dir = 'video'): string {
  return claudeMd(cuts)
    .replace('# dailies composition contract', '# dailies composition contract (external agent)')
    .replace(/## The one file you own[\s\S]*?## Exports/, `## Your files

\`${dir}/Video.tsx\` is the composition. Helper files may sit next to it in \`${dir}/\` and be imported
with relative paths. dailies uploads \`${dir}/**/*.ts(x)\` each time Kane judges, so keep the composition
self-contained there. The storyboard is \`${dir}/storyboard.md\`: never edit it to make a check pass.

## How Kane CLI judges you

1. \`dailies_start\` registered the storyboard; Kane CLI derived acceptance criteria from it
   (\`dailies_criteria\` lists them, each mapped to cuts and frames).
2. \`dailies_review\` uploads ${dir}/, pins a version and has Kane judge every criterion on every cut
   in a real browser. It answers with verdicts, Kane's reasons, measured text placement and the
   contact sheets Kane looked at.
3. Fix what failed and review again. When you stop, the dailies Stop hook re-verifies: your turn
   cannot end while a check Kane judged is failing.

## Exports`);
}
