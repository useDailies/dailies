import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Marked } from 'marked';
import md from '../../../../docs/MCP.md?raw';
import { SiteHeader } from '../components/Chrome';
import { Face, Icon } from '../components/ui';
import { Cmd } from './Account';

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const marked = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }) {
      const html = this.parser.parseInline(tokens);
      return `<h${depth} id="${slug(html)}">${html}</h${depth}>`;
    },
    link({ href, tokens }) {
      const text = this.parser.parseInline(tokens);
      const ext = /^https?:/.test(href);
      return `<a href="${href}"${ext ? ' target="_blank" rel="noreferrer"' : ''}>${text}</a>`;
    },
  },
});

/** The dailies MCP documentation (docs/MCP.md, rendered). */
export default function McpDocs() {
  // The sidebar is the table of contents: drop the title, tagline and the markdown's own contents list.
  const body = useMemo(() => md.replace(/^# .*\n+\*\*.*\*\*\n+/, '').replace(/^(- \[.*\]\(#.*\)\n)+/m, ''), []);
  const html = useMemo(() => marked.parse(body) as string, [body]);
  const toc = useMemo(() => [...md.replace(/```[\s\S]*?```/g, '').matchAll(/^## (.+)$/gm)].map((m) => ({ t: m[1], id: slug(m[1]) })), []);
  const loc = useLocation();
  useEffect(() => {
    if (loc.hash) document.getElementById(loc.hash.slice(1))?.scrollIntoView();
  }, [loc.hash]);
  return (
    <div className="page">
      <SiteHeader />
      <section className="docs-hero">
        <span className="eyebrow">
          <Face who="claude" size={16} /> Claude Code · Cursor · any MCP client <Face who="kane" size={16} />
        </span>
        <h1>
          Your agent writes the video. <em>Kane proves every frame.</em>
        </h1>
        <p className="lede">The dailies MCP server, a Kane-gated Stop hook, and a dailies account that keeps every run.</p>
        <div className="docs-quick">
          <Cmd>claude plugin install dailies@dailies</Cmd>
          <Cmd>npx dailies-cli login</Cmd>
          <Cmd>{'claude "/dailies:video"'}</Cmd>
        </div>
      </section>
      <div className="docs">
        <nav className="docs-toc" aria-label="On this page">
          <b>On this page</b>
          {toc.map((x) => (
            <a key={x.id} href={`#${x.id}`}>
              {x.t}
            </a>
          ))}
          <span className="docs-src">
            <Icon name="doc" size={12} /> Source: docs/MCP.md
          </span>
        </nav>
        <article className="docs-body" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
