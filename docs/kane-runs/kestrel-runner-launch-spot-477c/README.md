# Kestrel Runner — launch spot — Kane CLI evidence

Recorded run `kestrel-runner-launch-spot-477c`. Claude Code model: `claude-opus-5-5` · Claude cost $5.27 · Kane credits: design 28.5, judge 287.3, seal 0.0.

## Rounds

| Round | Kind | Version | Pass | Kane calls | Conditions | Credits | Time |
| --- | --- | --- | --- | --- | --- | --- | --- |
| r1-9adb | sweep | v1 | 69/69 | 6 | 69 | 67.8 | 42s |
| r2-e4a5 | sweep | v2 | 69/69 | 6 | 69 | 72.4 | 47s |
| r3-1985 | sweep | v3 | 69/69 | 6 | 69 | 73.1 | 47s |
| r4-a213 | sweep | v4 | 69/69 | 6 | 69 | 74.0 | 52s |

## Every check Kane failed

none

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
Make the caption a big, bold lower-third subtitle near the bottom of the frame, like social video captions, on every cut.

storyboard.md still applies to every cut. When you stop, Kane CLI verifies the whole spot against it before your turn can end.
```

### Prompt to Claude Code

```text
The CTA needs more punch. Make "Get early access" a huge full-width button pinned to the bottom of the frame, like an app-store install bar, on every cut.
```

### Prompt to Claude Code

```text
Make every piece of type 60% bigger and heavier. It should feel loud and poster-like, edge to edge.
```

Files: `rounds/*.json` (every verdict and Kane's reason), `kane-conditions.json` (the exact `--condition` strings), `criteria.json` (Kane's plan), `seal.json`.
