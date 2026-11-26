# @usedailies/cli

**Your coding agent writes the video. Kane CLI proves every frame.**

The dailies CLI connects Claude Code, Cursor or any MCP client to [dailies](https://daohbofm7o9ia.cloudfront.net). The agent writes a motion-design video as a Remotion composition in your repository, and dailies sends every cut to Kane CLI. Kane judges each frame in a real browser against acceptance criteria it derives from your storyboard. A Stop hook keeps the agent working until every check passes. Every run is saved to your dailies account.

```bash
npx @usedailies/cli login                 # device sign-in, opens your browser
npx @usedailies/cli init --claude         # or --cursor: MCP server + Kane-gated Stop hook + storyboard template
claude "make the video in video/storyboard.md with dailies"
```

With Claude Code, the plugin is the shortest path: `claude plugin marketplace add useDailies/dailies && claude plugin install dailies@dailies`.

| Command | What it does |
| --- | --- |
| `dailies login [--server URL]` | Sign in with a device code; the token is saved to `~/.dailies/credentials.json` |
| `dailies init [--claude] [--cursor] [--plugin] [--dir video]` | Wire this repo for your agent |
| `dailies start [storyboard.md]` | Link this repo to a new spot in your account |
| `dailies review` | Have Kane CLI judge `video/Video.tsx` now (exit 0 = pass) |
| `dailies status` / `open` / `whoami` / `logout` | |
| `dailies mcp` | The MCP server (stdio): `dailies_start`, `dailies_review`, `dailies_criteria`, `dailies_status`, `dailies_seal`, `dailies_login`, `dailies_whoami` |
| `dailies hook stop [--cursor]` | The Stop hook (the Claude Code and Cursor contracts) |

Docs: https://daohbofm7o9ia.cloudfront.net/docs/mcp · Source: https://github.com/useDailies/dailies · MIT
