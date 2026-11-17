import type { DesignedTest } from './types.ts';

/** Parse a Kane-designed `*_test.md` into steps with their `@verifies` tags. */
export function parseDesignedTest(file: string, md: string): DesignedTest {
  const id = md.match(/^\s*id:\s*(\S+)/m)?.[1] ?? file.replace(/_test\.md$/, '');
  const title = md.match(/^#\s+(.+)$/m)?.[1]?.trim() ?? id;
  const summary = md.match(/^>\s*(.+)$/m)?.[1]?.trim() ?? '';
  const steps: DesignedTest['steps'] = [];
  const parts = md.split(/^##\s+/m).slice(1);
  for (const p of parts) {
    const [headingLine, ...rest] = p.split('\n');
    const verifies = [...headingLine.matchAll(/\bac-\d+\b/g)].map((m) => m[0]);
    steps.push({
      heading: headingLine.replace(/@verifies.*$/, '').replace(/[—-]\s*assert\s*$/i, '').trim(),
      verifies,
      body: rest.join('\n').trim(),
    });
  }
  return { id, file, title, summary, steps };
}
