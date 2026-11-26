---
name: video
description: Make or change a motion-design video with dailies — Claude writes a Remotion composition from a storyboard and Kane CLI judges every frame of every cut. Use when the user asks to make a launch video, promo, explainer or social cut, or mentions dailies or a storyboard.
argument-hint: "[storyboard path, default video/storyboard.md]"
---

# Make a video with dailies

dailies is test-driven video. You compose; Kane CLI proves every frame in a real browser against acceptance criteria it designs from the storyboard. Every run is saved to the user's dailies account.

1. **Start.** Call the `dailies_start` tool (storyboard: `$ARGUMENTS`, or `video/storyboard.md`). If it says you are not signed in, ask the user to run `dailies login` in a terminal (or `node ${CLAUDE_PLUGIN_ROOT}/bin/dailies.mjs login`) and stop. If there is no storyboard, offer to write one with the user first (shots with timecodes, exact copy, cuts, platform rules).
2. **Read the contract** that `dailies_start` returns and follow it exactly: one component renders every cut (read `width`/`height` from `useVideoConfig()`), every text layer has a `data-layer` name and holds only its text, animation is deterministic, only `react` and `remotion` imports, no assets.
3. **Compose** `video/Video.tsx` (helpers may sit next to it). Make it look like a premium spot: considered type, easing, depth, motion that serves the story. The storyboard's exact words are exact.
4. **Review.** Call `dailies_review`. Kane judges every criterion on every cut (about a minute). Read Kane's findings, the measured placement report and the contact sheet image; fix the composition; review again until every check passes. Never edit the storyboard to make a check pass.
5. **Finish** with the studio link, the final score and what Kane caught. When you stop, the dailies Stop hook re-verifies automatically.

Optional: `dailies_criteria` lists Kane's acceptance criteria; `dailies_seal` runs Kane's own designed tests (several hundred credits, only when asked).
