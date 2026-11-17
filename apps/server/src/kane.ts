import { spawn, type ChildProcess } from 'node:child_process';
import { config } from './config.ts';

/**
 * Every Kane CLI process dailies starts goes through here: shell-free spawn,
 * NDJSON parsed line by line, credits read from whichever field this Kane
 * version uses (`credits_consumed`, `credits`, or assurance `usage`).
 */
export interface KaneResult {
  code: number | null;
  events: any[];
  /** run_end / test_md_done / testrun_done / done, whichever closed the stream */
  end: any | null;
  credits: number;
  stderr: string;
  /** raw stdout tail (human-text commands like whoami/balance) */
  stdout: string;
  durationMs: number;
}

const running = new Map<ChildProcess, string>();

export function killAllKane() {
  for (const c of running.keys()) c.kill('SIGTERM');
}

/** Stop every Kane process started for one project (its workspace is the cwd). */
export function killKaneIn(cwd: string) {
  for (const [c, dir] of running) if (dir === cwd) c.kill('SIGTERM');
}

export function kane(
  args: string[],
  opts: { cwd: string; timeoutSec?: number; onEvent?: (e: any) => void; signal?: AbortSignal },
): Promise<KaneResult> {
  const t0 = Date.now();
  return new Promise((resolve) => {
    const child = spawn(config.kane.bin, args, {
      cwd: opts.cwd,
      env: { ...process.env, KANE_CLI_USER_AGENT: 'dailies', NO_COLOR: '1' },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    running.set(child, opts.cwd);
    const events: any[] = [];
    let end: any = null;
    let credits = 0;
    let usageTotal = 0;
    let buf = '';
    let stderr = '';
    let stdout = '';
    const onLine = (line: string) => {
      let o: any;
      try {
        o = JSON.parse(line);
      } catch {
        return;
      }
      events.push(o);
      if (o.type === 'run_end') credits += Number(o.credits_consumed ?? o.credits ?? 0);
      if (o.type === 'usage' && typeof o.total_credits === 'number') usageTotal = o.total_credits;
      if (['run_end', 'test_md_done', 'testrun_done', 'done'].includes(o.type)) end = o;
      opts.onEvent?.(o);
    };
    child.stdout.on('data', (d) => {
      buf += d.toString();
      stdout += d.toString();
      if (stdout.length > 20000) stdout = stdout.slice(-20000);
      let i: number;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (line) onLine(line);
      }
    });
    child.stderr.on('data', (d) => {
      stderr += d.toString();
      if (stderr.length > 20000) stderr = stderr.slice(-20000);
    });
    const timer = opts.timeoutSec
      ? setTimeout(() => {
          child.kill('SIGTERM');
          setTimeout(() => child.kill('SIGKILL'), 5000);
        }, opts.timeoutSec * 1000)
      : null;
    opts.signal?.addEventListener('abort', () => child.kill('SIGTERM'));
    const finish = (code: number | null) => {
      if (timer) clearTimeout(timer);
      running.delete(child);
      if (buf.trim()) onLine(buf.trim());
      resolve({ code, events, end, credits: credits || usageTotal, stderr, stdout, durationMs: Date.now() - t0 });
    };
    child.on('close', finish);
    child.on('error', (err) => {
      stderr += err.message;
      finish(-1);
    });
  });
}

export interface AnalyzeOutcome {
  results: (boolean | null)[];
  reasons: string[];
  credits: number;
  durationMs: number;
  ok: boolean;
  error?: string;
}

/**
 * `kane-cli run --analyzer-only`: judge a list of conditions against the page
 * already open in the Chrome at `cdpPort`. No actions, nothing saved — the
 * cheapest way to ask Kane many questions about one screen.
 */
export async function analyze(opts: {
  cwd: string;
  cdpPort: number;
  conditions: string[];
  onEvent?: (e: any) => void;
}): Promise<AnalyzeOutcome> {
  const args = [
    'run',
    '--analyzer-only',
    '--agent',
    '--cdp-endpoint',
    `http://127.0.0.1:${opts.cdpPort}`,
    '--timeout',
    String(config.kane.analyzeTimeoutSec),
  ];
  for (const c of opts.conditions) args.push('--condition', c);
  const r = await kane(args, { cwd: opts.cwd, timeoutSec: config.kane.analyzeTimeoutSec + 30, onEvent: opts.onEvent });
  const end = r.events.find((e) => e.type === 'run_end');
  if (!end || !Array.isArray(end.condition_results)) {
    return {
      results: opts.conditions.map(() => null),
      reasons: opts.conditions.map(() => ''),
      credits: r.credits,
      durationMs: r.durationMs,
      ok: false,
      error: end?.reason ?? (r.stderr.trim().split('\n').slice(-2).join(' ') || `kane-cli exited ${r.code}`),
    };
  }
  return {
    results: end.condition_results,
    reasons: end.condition_reasons ?? [],
    credits: r.credits,
    durationMs: r.durationMs,
    ok: true,
  };
}

export async function kaneIdentity(): Promise<{ version: string | null; user: string | null; credits: number | null }> {
  const cwd = process.cwd();
  const [v, who, bal] = await Promise.all([
    kane(['--version'], { cwd, timeoutSec: 20 }),
    kane(['whoami'], { cwd, timeoutSec: 30 }),
    kane(['balance'], { cwd, timeoutSec: 30 }),
  ]);
  // These commands print human text, not NDJSON.
  const raw = (r: KaneResult) => r.stdout + '\n' + r.stderr;
  const credits = Number(raw(bal).match(/Available credits:\s*([\d.]+)/)?.[1]);
  return {
    version: raw(v).match(/\d+\.\d+\.\d+/)?.[0] ?? null,
    user: raw(who).match(/User\s+(\S+)/)?.[1] ?? null,
    credits: Number.isFinite(credits) ? credits : null,
  };
}
