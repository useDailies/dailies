# dailies MCP

**Your coding agent writes the video. Kane CLI proves every frame.**

The dailies MCP server connects Claude Code, Cursor or any MCP client to dailies:

1. The agent writes a motion-design video as a Remotion composition in your own repository.
2. dailies hands every cut to Kane CLI, which judges each frame in a real browser against acceptance criteria it designs from your storyboard.
3. The agent fixes what Kane reports. With the Stop hook installed, it can't end its turn while a check is failing.

Every spot, version and Kane verdict is saved to your dailies account. Sign in at the studio to watch your agent's runs live and replay them later.

- [How it works](#how-it-works)
- [Quickstart: Claude Code](#quickstart-claude-code)
- [Quickstart: Cursor](#quickstart-cursor)
- [Other MCP clients](#other-mcp-clients)
- [Your account](#your-account)
- [Writing a storyboard](#writing-a-storyboard)
- [The composition contract](#the-composition-contract)
- [Tools](#tools)
- [The Stop hook](#the-stop-hook)
- [CLI reference](#cli-reference)
- [Files dailies writes](#files-dailies-writes)
- [Costs](#costs)
- [Troubleshooting](#troubleshooting)
- [Security and privacy](#security-and-privacy)

## How it works

```text
your repo                         dailies                               Kane CLI
─────────                         ───────                               ────────
video/storyboard.md ── dailies_start ──▶ spot in your account ──▶ context ingest · design tests
                                                                  (acceptance criteria, cited to
                                                                   storyboard lines)
video/Video.tsx ────── dailies_review ─▶ compile · pin vN ───────▶ run --analyzer-only on one
     ▲                                   contact sheet per cut     contact sheet per cut, in Chrome
     │                                                                     │
     └──── Kane's findings, measured placement, the sheet it saw ◀────────┘
agent stops ─────────── Stop hook ─────▶ same review: block until every check passes
```

- **Plan.** `dailies_start` registers the storyboard. Kane CLI ingests it, together with a description of the inspection pages, and designs acceptance criteria and tests (`kane-cli context ingest` → `review` → `design tests`).
- **Judge.** `dailies_review` uploads `video/**/*.tsx` and compiles it, then pins it as a new version.
  - For each cut, Kane CLI judges one contact sheet holding every storyboard timecode, plus a facts table measured in the browser (`kane-cli run --analyzer-only --cdp-endpoint …`).
  - The first review is a full sweep. After a fix, Kane re-checks only what failed, then runs one regression sweep.
- **Correct.** Failures come back to the agent with:
  - Kane's reasons;
  - the storyboard line each criterion cites;
  - the measured text-placement report;
  - the contact sheet image.
- **Guard.** dailies measures text placement in the browser itself. If Kane passes a placement rule while the measurement shows a layer in the forbidden band, the verdict is a fail, labelled as a measurement override.
- **Gate.** When the agent tries to stop, the dailies Stop hook runs the same review. Claude Code gets `{"decision":"block"}` and Cursor gets a `followup_message`, until Kane passes the cut or a round cap hands it to a human.

## Quickstart: Claude Code

**1. Install the plugin.** It bundles the MCP server, the Kane-gated Stop hook and the `/dailies:video` skill.

```bash
claude plugin marketplace add <path-or-github-of-this-repo>   # e.g. ./dailies or yourname/dailies
claude plugin install dailies@dailies
```

**2. Sign in.** Either ask Claude (*“sign in to dailies”*: the `dailies_login` tool returns a link and a code to approve in your browser), or run this in a terminal:

```bash
npx dailies-cli login          # or, from this repo: node plugins/dailies/bin/dailies.mjs login
```

The command opens `…/device?code=ABCD-EFGH`. Sign in or create an account, check that the code matches, and press **Approve**. The token is saved to `~/.dailies/credentials.json`.

**3. Write a storyboard** at `video/storyboard.md`. `npx dailies-cli init --plugin` writes a template, or see [Writing a storyboard](#writing-a-storyboard).

**4. Ask Claude:**

```text
/dailies:video
```

You can also just say *“make the video in video/storyboard.md with dailies”*. Claude then:
1. calls `dailies_start` and reads the contract;
2. writes `video/Video.tsx`;
3. calls `dailies_review` and fixes what Kane reports;
4. tries to stop, at which point the hook re-verifies.

Watch it all live from the studio link that `dailies_start` returns.

**Without the plugin:** `npx dailies-cli init --claude` writes a project `.mcp.json` (the dailies MCP server) and a Stop hook in `.claude/settings.json`.

## Quickstart: Cursor

```bash
npx dailies-cli init --cursor
npx dailies-cli login
```

This writes:

- `.cursor/mcp.json`: the dailies MCP server, with `DAILIES_PROJECT_DIR=${workspaceFolder}`.
- `.cursor/hooks.json`: a `stop` hook (`dailies hook stop --cursor`, `loop_limit: 4`). When Kane fails a check, it answers with a `followup_message` containing Kane's findings, so the agent goes straight back in.
- `.cursor/rules/dailies.mdc`: the workflow, attached when you work in `video/`.

Enable the **dailies** server in *Cursor Settings → MCP*, then ask the agent to make the video in `video/storyboard.md`.

## Other MCP clients

Any client that speaks MCP over stdio works (Codex, Windsurf, Zed, VS Code and others):

```json
{
  "mcpServers": {
    "dailies": { "command": "npx", "args": ["-y", "dailies-cli", "mcp"], "env": { "DAILIES_PROJECT_DIR": "/path/to/your/repo" } }
  }
}
```

Without a stop hook, the loop depends on the agent calling `dailies_review` until it passes. The server's instructions and tool descriptions tell it to, but nothing enforces it. If your client supports a stop hook, point it at `dailies hook stop`.

## Your account

- **Sign up and sign in** at the studio (`/login`): email and password. The session is an httpOnly cookie.
- **Agents sign in with a device code** (`dailies login` or the `dailies_login` tool). The agent never sees your password; it receives a personal access token for your account (1 year).
- **Your spots.** Everything an agent starts is owned by your account and private to it. It's listed under **Your spots** on the home page and at `/account`, with its agent (`via Claude Code`, `via Cursor`). Open one to see:
  - the live player, Kane's film strip and timeline verdicts;
  - corrections and before/after;
  - the Activity log of every MCP call and Stop-hook decision.
- **Connected agents** (`/account`) lists every token with when it was last used. Revoke one and that agent is locked out immediately.

## Writing a storyboard

Plain markdown: a title, length and cuts, then shots with timecodes. Write exact copy as `reads exactly:` and rules as plain sentences. Kane turns each line into checkable criteria.

```markdown
# Halo — smart lamp launch spot

Length 10 seconds at 30 fps. Deliver two cuts: 16:9 (1920x1080), 9:16 (1080x1920).

## Shot 1 (0:00–0:03) Product hero
- A round white smart lamp glows warm amber in a dark, minimal living room.
- The lamp is fully inside the frame by 0:01.
- Caption reads exactly: Light that listens

## Shot 2 (0:03–0:06) Colour
- A price tag reads exactly: $89 and is visible at 0:04 and at 0:05.

## Shot 3 (0:06–0:10) Call to action
- A button labelled exactly: Pre-order now, fully visible by 0:08.
- On the 9:16 cut, no text or button sits in the bottom 35% or the top 14% of the frame.
- On every cut, all text stays fully inside the frame.
```

- **Cuts:** 16:9 (1920×1080), 9:16 (1080×1920), 1:1 (1080×1080) and 4:5 (1080×1350).
- **Timecodes:** any timecode you name (“by 0:05”, “visible at 0:04”) becomes a frame Kane judges, alongside each shot's opening and close.
- **Platform rules:** the 9:16 bands (top 14%, bottom 35%, sides 6%) are where Reels, TikTok and Shorts draw their UI.

## The composition contract

`dailies_start` returns the full contract; follow it exactly. In short:

| Rule | Why |
| --- | --- |
| `video/Video.tsx` exports `composition = { fps, durationInFrames, shots: [...] }` and a default component | dailies compiles and plays it; the shots are compared with the storyboard |
| One component renders every cut: read `width`/`height` from `useVideoConfig()` | Kane judges each cut separately |
| Every text element carries `data-layer="<name>"` and contains only its text | The facts table reads exact copy and placement from the DOM, not from pixels |
| Only `react` and `remotion` imports; relative imports of your own helpers in `video/` | The same deterministic module plays in the studio and in Kane's browsers |
| Animate only from `useCurrentFrame()`, `interpolate`, `spring`, `<Sequence>`; no randomness, timers or effects | Every frame Kane judges is reproducible |
| System font stacks, no image, font or network assets | Self-contained and deterministic |

## Tools

| Tool | What it does |
| --- | --- |
| `dailies_login` | Device sign-in. The first call returns a link and code to approve; the second call finishes |
| `dailies_whoami` | The account this server is signed in to, and the spot this repository is linked to |
| `dailies_start` | Registers the storyboard as a spot in your account and links the repository (`.dailies/spot.json`). Kane starts designing the criteria. Returns the contract, the cuts, the frames Kane judges and the studio link. Reuses the linked spot unless `fresh: true` |
| `dailies_criteria` | Kane's acceptance criteria, each with its cuts, timecodes and storyboard line. Waits for Kane if needed |
| `dailies_review` | Uploads the composition, pins a version and has Kane judge it (about a minute). Returns `✅`/`❌`, the score, Kane's findings and the contact sheet images. Pass `note` to label the change |
| `dailies_status` | Versions, every Kane round with its score and credits, seal progress |
| `dailies_seal` | Runs Kane's own designed tests (`kane-cli testmd run`) and coverage (`kane-cli cover`) in the background. Expensive; only seal a version that passes |
| Prompt `make_video` | The whole workflow as one prompt (shown as a slash command in clients that support MCP prompts) |

A `dailies_review` failure looks like this (abridged):

```text
❌ Kane CLI judged v1 (sweep): 1 check failing. 61/62 checks pass.

- [ac-24] No text or button occupies the bottom 35% of the 9:16 cut's frame.
  storyboard.md L20: On the 9:16 cut, no text or button sits in the bottom 35% …
  Kane CLI saw:
    9x16: Checking the text placement report for bottom-band text: … → FAIL (F6, F7, F8, F9)

What Kane looked at:
- 9:16: screenshot .dailies/eye/v1-9x16.jpg
    Visible text in the bottom 35% band: wordmark "KESTREL" at F6, F7, F8, F9
[image: the contact sheet Kane judged]
```

## The Stop hook

`dailies hook stop` runs every time the agent tries to end its turn.

- In a repository **not** linked to a spot, or before `video/Video.tsx` exists, it does nothing.
- Otherwise it runs the same review as `dailies_review`:
  - **Pass:** the agent stops, with a note (`dailies · Kane CLI verified v3 …`).
  - **Fail or compile error:** Claude Code gets `{"decision":"block","reason":"<Kane's findings>"}` and Cursor gets `{"followup_message": …}`. Either way the agent keeps working.
  - **No change since a pass:** answered instantly from the last verdict, at no cost.
- **Round cap:** after `DAILIES_MAX_FIX_ROUNDS` (default 4) rounds without passing, it lets the agent stop and flags the spot for a human. Claude Code's own cap is 8 consecutive blocks.
- **Fails open:** if the server is unreachable, the login is missing or anything else breaks, the agent may stop, with a note saying it wasn't verified.

## CLI reference

```text
dailies login [--server URL]     Sign in (device code, opens the browser)
dailies whoami | logout
dailies init [--claude] [--cursor] [--plugin] [--dir video]
dailies start [storyboard.md]    Link this repo to a new spot
dailies review                   Have Kane judge video/Video.tsx now (exit 0 = pass)
dailies status | open
dailies mcp                      The MCP server (stdio)
dailies hook stop [--cursor]     The Stop hook
```

| Environment variable | Purpose |
| --- | --- |
| `DAILIES_SERVER` | The dailies server (default `http://localhost:5173` for a local studio) |
| `DAILIES_TOKEN` | Use a token directly instead of `~/.dailies/credentials.json` (CI) |
| `DAILIES_PROJECT_DIR` | Project root for the MCP server (Claude Code passes `CLAUDE_PROJECT_DIR`) |
| `DAILIES_HOME` | Where credentials live (default `~/.dailies`) |

## Files dailies writes

| File | What |
| --- | --- |
| `video/storyboard.md` | Your storyboard (`dailies init` writes a template if there is none) |
| `video/Video.tsx` | The composition your agent writes |
| `.dailies/spot.json` | Links the repository to its spot. `.dailies/` is gitignored |
| `.dailies/eye/vN-<cut>.jpg` | The contact sheets Kane judged, saved so the agent can open them |
| `~/.dailies/credentials.json` | Your token (mode 600) |

## Costs

Kane CLI credits are spent on the dailies server's Kane account:

- **Designing the criteria:** about 25 credits per storyboard.
- **A full review:** about 1 credit per check (one analyzer call per contact sheet).
- **A targeted re-check after a fix:** about 4–7 credits.
- **Sealing:** several hundred credits.
- **Reviewing an unchanged pass:** free.

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Not signed in to dailies` | Call `dailies_login`, or run `dailies login`, and approve in the browser |
| `This repository is not linked to a dailies spot yet` | Call `dailies_start` first |
| `No storyboard at video/storyboard.md` | Write one, or run `dailies init` |
| `cannot be imported in a dailies composition` | Only `react` and `remotion` (plus relative helpers) are allowed |
| The review takes a minute | Kane renders and judges every cut in a real browser; cuts run in parallel |
| The agent stopped with “not verified” | The hook failed open (server unreachable or not signed in). Run `dailies review` to check |

## Security and privacy

- Passwords are hashed with scrypt. Tokens are random 256-bit secrets, and only their SHA-256 is stored.
- Spots are private to their owner. Kane's inspection browsers read a spot through a per-spot read-only key embedded in its sheet URLs, and that key can't change anything.
- Uploads are limited to `.ts/.tsx/.js/.jsx/.css/.json` files inside the composition directory, 40 files and 600 KB. Paths are sandboxed.
- Compositions compile to a module that can import only `react` and `remotion`. In this version they compile and render on the dailies server, so run your own dailies server for untrusted code.
