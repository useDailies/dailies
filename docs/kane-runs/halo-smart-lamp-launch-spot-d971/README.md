# Halo — smart lamp launch spot — Kane CLI evidence

Recorded run `halo-smart-lamp-launch-spot-d971`. Claude Code model: `?` · Claude cost $0.00 · Kane credits: design 23.9, judge 245.3, seal 0.0.

## Rounds

| Round | Kind | Version | Pass | Kane calls | Conditions | Credits | Time |
| --- | --- | --- | --- | --- | --- | --- | --- |
| r1-28a0 | sweep | v1 | 28/28 | 3 | 28 | 33.4 | 37s |
| r2-cd58 | sweep | v2 | 28/28 | 3 | 28 | 28.5 | 31s |
| r3-bf6e | sweep | v3 | 28/28 | 3 | 28 | 29.4 | 43s |
| r4-4ce2 | sweep | v4 | 28/28 | 3 | 28 | 29.3 | 34s |
| r5-6ff4 | sweep | v5 | 27/28 | 3 | 28 | 28.0 | 31s |
| r6-f64a | targeted | v6 | 1/1 | 1 | 1 | 4.6 | 14s |
| r7-f79a | regression | v6 | 27/28 | 3 | 28 | 25.9 | 32s |
| r8-21f0 | targeted | v7 | 0/1 | 1 | 1 | 8.7 | 36s |
| r9-0558 | targeted | v8 | 1/1 | 1 | 1 | 6.1 | 20s |
| r10-8d06 | regression | v8 | 28/28 | 3 | 28 | 26.1 | 27s |
| r11-f5f6 | sweep | v8 | 28/28 | 3 | 28 | 25.4 | 35s |

## Every check Kane failed

- **r5-6ff4 · v5 · ac-16 @ 9x16** — Checking the 9:16 cut's bottom-band text placement: value: 'false' -> 'false'; equals 'true' -> FAIL
- **r7-f79a · v6 · ac-7 @ 9x16** — Checking product-hero lamp framing at 0:01: value: 'false' -> 'false'; equals 'true' -> FAIL
- **r8-21f0 · v7 · ac-7 @ 9x16** — Checking the F2 product graphic's frame containment: value: 'false' -> 'false'; equals 'true' -> FAIL

## What Claude Code was told

### Stop hook block reason

```text
Kane CLI reviewed your draft in a real browser, frame by frame, against acceptance criteria it derived from storyboard.md.
1 check failed:

- [ac-16] No text or button in the 9:16 cut occupies the bottom 35% of its frame.
  storyboard.md L18: - On the 9:16 cut, no text or button sits in the bottom 35% or the top 14% of the frame.
  Kane CLI saw:
    9x16: Checking the 9:16 cut's bottom-band text placement: value: 'false' -> 'false'; equals 'true' -> FAIL

What Kane looked at (one contact sheet per cut, every storyboard timecode, measured in a real browser):
- 9:16: screenshot http://localhost:5173/api/projects/halo-smart-lamp-launch-spot-d971/files/eye/r5-6ff4-9x16.jpg (view it to see exactly what Kane saw)
    Visible text outside the frame: none
    Visible text in the top 14% band: none
    Visible text in the bottom 35% band: button “Pre-order now” at F11, F12
    Visible text in the side 6% bands: none
    Smallest visible text (font size at 1080x1920): button “Pre-order now” at 46px (F11, F12)

Fix video/Video.tsx so every one of these holds in every listed cut, without breaking what
already passes. Do not edit the storyboard. When you
are done, call dailies_review again (or simply stop: the dailies Stop hook re-verifies before your turn can end).
```

Files: `rounds/*.json` (every verdict and Kane's reason), `kane-conditions.json` (the exact `--condition` strings), `criteria.json` (Kane's plan), `seal.json`.
