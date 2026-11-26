import type { CutId } from './cuts.ts';

/** An acceptance criterion Kane CLI derived from the storyboard (`kane-cli design tests`). */
export interface Criterion {
  /** Kane logical id, e.g. "ac-9" */
  id: string;
  text: string;
  risk?: 'low' | 'med' | 'high';
  /** Kane's machine-checkable oracle, when the store exposes one. */
  expected?: { operator: string; operand: string | number | boolean };
  /** Cuts this criterion applies to (dailies mapping from the text). */
  cuts: CutId[];
  /** Explicit seconds the criterion names ("by 0:05"). */
  times: number[];
  /** Shot the criterion is about, if named. */
  shot: number | null;
  /** Best-matching storyboard line (dailies mapping; Kane cites at use-case level). */
  line: number | null;
  /** Designed test files whose steps carry `@verifies <id>`. */
  tests: string[];
}

export interface DesignedTest {
  /** "t-1" */
  id: string;
  file: string;
  title: string;
  summary: string;
  steps: { heading: string; verifies: string[]; body: string }[];
}

export interface KanePlan {
  createdAt: string;
  storyboardHash: string;
  usecases: { id: string; title: string; anchors: string[] }[];
  criteria: Criterion[];
  tests: DesignedTest[];
  scenarios: { id: string; title: string }[];
  gaps: { id: string; title: string }[];
  credits: number;
}

export type Verdict = 'pass' | 'fail' | 'unknown';

export interface CheckResult {
  ac: string;
  cut: CutId;
  verdict: Verdict;
  /** Kane's own words (condition_reasons). */
  reason: string;
  /** Frame labels Kane referred to ("F4"). */
  frames: string[];
}

export type RoundKind = 'sweep' | 'targeted' | 'regression';

export interface VerifyRound {
  id: string;
  version: number;
  kind: RoundKind;
  startedAt: string;
  endedAt?: string;
  cuts: CutId[];
  acs: string[];
  results: CheckResult[];
  credits: number;
  calls: number;
  conditions: number;
  durationMs: number;
  /** relative URLs of Kane's-eye screenshots by cut */
  eye: Partial<Record<CutId, string>>;
  /** the sheet's measured text-placement report by cut (what Kane read) */
  reports?: Partial<Record<CutId, string>>;
  error?: string;
}

export interface VersionMeta {
  n: number;
  kind: 'draft' | 'fix';
  createdAt: string;
  /** round that triggered this version (fix) */
  trigger?: string;
  /** what Claude said it changed */
  summary?: string;
  lines: number;
  added?: number;
  removed?: number;
  compiles: boolean;
  compileError?: string;
}

export type Phase =
  | 'idle'
  | 'drafting'
  | 'planning'
  | 'drafted'
  | 'verifying'
  | 'correcting'
  | 'reviewed'
  | 'sealing'
  | 'sealed'
  | 'error';

export interface ClaudeSession {
  sessionId?: string;
  model?: string;
  costUsd: number;
  turns: number;
}

export interface Seal {
  startedAt: string;
  endedAt?: string;
  version: number;
  tests: {
    id: string;
    file: string;
    title?: string;
    status: 'passed' | 'failed' | 'error' | 'running' | 'queued';
    credits: number;
    share?: string;
    pack?: string;
    /** first failing step and Kane's reason, from output-<stem>/Result.md */
    failedStep?: string;
    reason?: string;
  }[];
  coverage?: unknown;
  credits: number;
}

export interface Project {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  phase: Phase;
  storyboard: string;
  cuts: CutId[];
  claude: ClaudeSession;
  versions: VersionMeta[];
  plan?: KanePlan;
  rounds: VerifyRound[];
  seal?: Seal;
  credits: { plan: number; verify: number; seal: number };
  /** set when a live run is in progress */
  busy?: string | null;
  error?: string | null;
  /** true for projects shipped in the repo as recorded runs */
  recorded?: boolean;
  /** when true, any Claude Code session the user opens in the workspace is Kane-gated */
  gate?: boolean;
  /** the dailies account that owns this spot (absent: local/legacy or recorded example) */
  owner?: string;
  /** where the spot was made: the studio's own Claude Code, or an external agent over MCP */
  source?: 'studio' | 'mcp';
  /** the external agent driving an MCP spot */
  agent?: { client: string; version?: string; dir?: string; repo?: string };
  /** read-only key embedded in inspection-sheet URLs (Kane's browsers carry no login) */
  inspectKey?: string;
}

export interface DailiesEvent<T = Record<string, unknown>> {
  seq: number;
  ts: number;
  type: string;
  data: T;
}
