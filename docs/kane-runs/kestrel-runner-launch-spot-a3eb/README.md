# Kestrel Runner — launch spot — Kane CLI evidence

Recorded run `kestrel-runner-launch-spot-a3eb`. Claude Code model: `claude-opus-5-5` · Claude cost $1.69 · Kane credits: design 25.0, judge 146.0, seal 0.0.

## Rounds

| Round | Kind | Version | Pass | Kane calls | Conditions | Credits | Time |
| --- | --- | --- | --- | --- | --- | --- | --- |
| r1-f084 | sweep | v1 | 61/62 | 6 | 62 | 64.4 | 40s |
| r2-3d42 | targeted | v2 | 1/1 | 1 | 1 | 5.6 | 21s |
| r3-e37c | regression | v2 | 62/62 | 6 | 62 | 76.0 | 49s |

## Every check Kane failed

- **r1-f084 · v1 · ac-24 @ 9x16** — Checking the text placement report for bottom-band text: value: 'false' -> 'false'; equals 'true' -> FAIL

## What Claude Code was told

### Prompt to Claude Code

```text
Read storyboard.md and CLAUDE.md, then write src/Video.tsx.

This is the first draft of a premium motion-design spot. Follow the storyboard shot by shot,
honour the contract in CLAUDE.md, and make it look like work a studio would ship.
Write it in one pass and finish when the file is complete.
```

### Prompt to Claude Code

```text
Kane CLI reviewed your draft in a real browser, frame by frame, against acceptance criteria it derived from storyboard.md.
1 check failed:

- [ac-24] No text or button occupies the bottom 35% of the 9:16 cut's frame.
  storyboard.md L20: - On the 9:16 cut, no text or button sits in the bottom 35% or the top 14% of the frame.
  Kane CLI saw:
    9x16: Checking the text placement report for bottom-band text: value: 'false' -> 'false'; equals 'true' -> FAIL

What Kane looked at (one contact sheet per cut, every storyboard timecode, measured in a real browser):
- 9:16: screenshot runs/eye/r1-f084-9x16.png (open it with Read to see exactly what Kane saw)
    Visible text outside the frame: none
    Visible text in the top 14% band: none
    Visible text in the bottom 35% band: wordmark “KESTREL” at F6, F7, F8, F9
    Visible text in the side 6% bands: none
    Smallest visible text (font size at 1080x1920): wordmark “KESTREL” at 40px (F10, F11, F12)

Fix src/Video.tsx so every one of these holds in every listed cut, without breaking what
already passes. Do not edit storyboard.md, the tests or anything outside src/. When you
are done, stop: Kane CLI re-verifies automatically before your turn can end.
```

Files: `rounds/*.json` (every verdict and Kane's reason), `kane-conditions.json` (the exact `--condition` strings), `criteria.json` (Kane's plan), `seal.json`.
