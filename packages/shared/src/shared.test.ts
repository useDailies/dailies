import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  conditionFor,
  cutsForText,
  enrichCriterion,
  formatTimecode,
  framesInReason,
  parseDesignedTest,
  parseStoryboard,
  sampleFrames,
} from './index.ts';

const SB = `# Kestrel Runner — launch spot

Length 12 seconds at 30 fps. Deliver three cuts: 16:9 (1920x1080), 9:16 (1080x1920), 1:1 (1080x1080).

## Shot 1 (0:00–0:03) Product hero
- A teal running shoe with an orange sole slides in from the left.
- Caption reads exactly: Run the city

## Shot 2 (0:03–0:07) Detail
- The KESTREL wordmark is absent at 0:03 and fully visible by 0:05.

## Shot 3 (0:07–0:12) Call to action
- Headline reads exactly: Out 28 November
- On the 9:16 cut, no text or button sits in the bottom 35% or the top 14% of the frame.
`;

test('parses header, cuts and shots', () => {
  const sb = parseStoryboard(SB);
  assert.equal(sb.fps, 30);
  assert.equal(sb.duration, 12);
  assert.equal(sb.durationInFrames, 360);
  assert.deepEqual(sb.cuts, ['16x9', '9x16', '1x1']);
  assert.equal(sb.shots.length, 3);
  assert.deepEqual(
    sb.shots.map((s) => [s.n, s.start, s.end]),
    [
      [1, 0, 3],
      [2, 3, 7],
      [3, 7, 12],
    ],
  );
  assert.deepEqual(sb.moments, [3, 5]);
  assert.equal(sb.lines.find((l) => l.text.includes('Run the city'))?.shot, 1);
});

test('samples named moments and shot boundaries, capped', () => {
  const sb = parseStoryboard(SB);
  const frames = sampleFrames(sb, 12);
  assert.ok(frames.length <= 12);
  assert.ok(frames.some((f) => f.frame === 90), 'frame at 0:03');
  assert.ok(frames.some((f) => f.frame === 150), 'frame at 0:05');
  assert.equal(frames[0].label, 'F1');
  assert.ok(frames.every((f, i) => i === 0 || f.frame > frames[i - 1].frame));
});

test('maps criteria to cuts, times and lines', () => {
  const sb = parseStoryboard(SB);
  assert.deepEqual(cutsForText('No text occupies the bottom 35% of the 9:16 frame.', sb.cuts), ['9x16']);
  assert.deepEqual(cutsForText('Caption reads exactly “Run the city” in every cut.', sb.cuts), ['16x9', '9x16', '1x1']);
  const c = enrichCriterion({ id: 'ac-9', text: 'The shot 1 caption reads exactly “Run the city” in every cut.' }, sb, []);
  assert.equal(c.shot, 1);
  assert.equal(c.line, sb.lines.find((l) => l.text.includes('Run the city'))?.n);
  const w = enrichCriterion({ id: 'ac-13', text: 'The KESTREL wordmark is fully visible by 0:05 in every cut.' }, sb, []);
  assert.deepEqual(w.times, [5]);
  const cond = conditionFor(w, '9x16', sampleFrames(sb), sb);
  assert.match(cond, /^\[ac-13\]/);
  assert.match(cond, /0:05/);
});

test('timecodes and frame references', () => {
  assert.equal(formatTimecode(3), '0:03');
  assert.equal(formatTimecode(65.5), '1:05.5');
  assert.deepEqual(framesInReason('Reading the F4 frame caption and F12 too, F4 again'), ['F4', 'F12']);
});

test('parses a Kane-designed test file', () => {
  const t = parseDesignedTest(
    'inspect_test.md',
    `---\nassurance:\n  id: t-1\n  base: sha256:abc\n---\n# Inspect vertical cut\n\n> Check it.\n\n## Step 1 @verifies ac-8, ac-9\n\nOpen {{sheet_url}}?cut=9x16.\n\n## Step 2 — assert @verifies ac-10\n\nAssert size.\n`,
  );
  assert.equal(t.id, 't-1');
  assert.equal(t.title, 'Inspect vertical cut');
  assert.deepEqual(t.steps.map((s) => s.verifies), [['ac-8', 'ac-9'], ['ac-10']]);
  assert.equal(t.steps[1].heading, 'Step 2');
});

test('ratios are not timecodes; named shots map to storyboard shots', async () => {
  const { timesForText, shotForText } = await import('./criteria.ts');
  const sb = parseStoryboard(SB);
  assert.deepEqual(timesForText('In the 9:16 cut, nothing in the bottom 35% by 0:05', 12), [5]);
  assert.equal(shotForText("In each cut's hero shot, the caption reads", sb), 1);
  assert.equal(shotForText("In each cut's closing shot, the headline reads", sb), 3);
  assert.equal(shotForText("In each cut's detail shot, a close-up", sb), 2);
});

test('placement guard: a measured layer in a forbidden band contradicts a pass', async () => {
  const { measuredViolation, placementRule } = await import('./criteria.ts');
  const report = [
    'Visible text outside the frame: none',
    'Visible text in the top 14% band: none',
    'Visible text in the bottom 35% band: button “Pre-order now” at F11, F12',
    'Visible text in the side 6% bands: none',
  ].join('\n');
  assert.equal(placementRule('No text or button in the 9:16 cut occupies the bottom 35% of its frame.')?.band, 'bottom');
  assert.match(measuredViolation('No text or button in the 9:16 cut occupies the bottom 35% of its frame.', report) ?? '', /Pre-order now/);
  assert.equal(measuredViolation('No text or button in the 9:16 cut occupies the top 14% of its frame.', report), null);
  assert.equal(measuredViolation('On every cut, all text stays fully inside the frame.', report), null);
  assert.equal(measuredViolation('A button labelled exactly: Pre-order now, fully visible by 0:08.', report), null);
  assert.equal(measuredViolation('No text or button in the 9:16 cut occupies the bottom 35% of its frame.', undefined), null);
});

test('cut mapping: "portrait frame" is the 9:16 cut, not every cut', async () => {
  const { cutsForText } = await import('./criteria.ts');
  const all = ['16x9', '9x16'] as const;
  assert.deepEqual(cutsForText('No text occupies the bottom 35% of a portrait frame.', [...all]), ['9x16']);
  assert.deepEqual(cutsForText('The landscape cut measures 1920×1080 pixels.', [...all]), ['16x9']);
  assert.deepEqual(cutsForText('Caption reads exactly: Hear only what matters', [...all]), ['16x9', '9x16']);
});
