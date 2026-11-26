import { SiteHeader } from '../components/Chrome';
import { Lockup, Mark, Wordmark } from '../components/Brand';
import { Face, Icon } from '../components/ui';

const COLORS = [
  { name: 'Ink', hex: '#17161A', use: 'Type, the mark tile, primary buttons' },
  { name: 'Paper', hex: '#F7F7F5', use: 'App and slide background' },
  { name: 'Canvas', hex: '#F2F1EE', use: 'The editor canvas, dotted' },
  { name: 'Claude clay', hex: '#D97757', use: 'Claude Code: writing, fixing' },
  { name: 'Violet', hex: '#5B4BDB', use: 'dailies accent, the handoff' },
  { name: 'Kane cobalt', hex: '#3B82F6', use: 'Kane CLI: judging, proving' },
  { name: 'Pass', hex: '#22C55E', use: 'Verdict: passes, always with ✓' },
  { name: 'Fail', hex: '#D92D20', use: 'Verdict: fails, always with ✕' },
];

const FILES = [
  ['lockup.svg', 'Lockup'],
  ['lockup-white.svg', 'Lockup, on dark'],
  ['mark.svg', 'Mark'],
  ['mark-light.svg', 'Mark, light tile'],
  ['mark-glyph.svg', 'Mark, no tile'],
  ['wordmark.svg', 'Wordmark'],
  ['mark-1024.png', 'Mark PNG 1024'],
  ['lockup-2000.png', 'Lockup PNG'],
  ['x-avatar.png', 'X avatar 400×400'],
  ['x-banner.png', 'X banner 1500×500'],
  ['og-image.png', 'Open Graph 1200×630'],
  ['end-card.png', 'Video end card 1920×1080'],
];

export default function BrandKit() {
  return (
    <div className="page brandkit">
      <SiteHeader />
      <section className="bk-hero">
        <span className="eyebrow">Brand kit</span>
        <div className="bk-big">
          <Lockup height={96} />
        </div>
        <p className="lede">A viewfinder holding a check: the frame Claude Code composes, proven by Kane CLI. In the wordmark the two i-dots are the two agents, clay for Claude Code and cobalt for Kane CLI.</p>
      </section>

      <section className="bk-grid">
        <div className="bk-tile">
          <Mark size={120} />
          <span>Mark</span>
        </div>
        <div className="bk-tile dark">
          <Mark size={120} variant="light" />
          <span>Mark on ink</span>
        </div>
        <div className="bk-tile">
          <Mark size={120} variant="glyph" />
          <span>Glyph</span>
        </div>
        <div className="bk-tile dark">
          <Wordmark height={50} ink="#fff" />
          <span>Wordmark on ink</span>
        </div>
      </section>

      <section className="bk-sec">
        <h2>The idea</h2>
        <div className="bk-anatomy">
          <div>
            <b>Viewfinder</b>
            <span>Four corners of a camera frame. The cut Claude Code composes, at any aspect ratio.</span>
          </div>
          <div>
            <b>Check, clay → cobalt</b>
            <span>The handoff: Claude writes it, Kane proves it. The gradient only ever runs in that direction.</span>
          </div>
          <div>
            <b>Two dots</b>
            <span className="bk-inline">
              <Face who="claude" size={14} /> Claude Code and <Face who="kane" size={14} /> Kane CLI, side by side in the name.
            </span>
          </div>
        </div>
      </section>

      <section className="bk-sec">
        <h2>Colour</h2>
        <div className="bk-colors">
          {COLORS.map((c) => (
            <div key={c.hex} className="bk-color">
              <i style={{ background: c.hex }} />
              <b>{c.name}</b>
              <code>{c.hex}</code>
              <span>{c.use}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="bk-sec">
        <h2>Type</h2>
        <div className="bk-type">
          <div>
            <span className="bk-specimen display">Every frame, proven.</span>
            <code>Bricolage Grotesque · 700 · −0.04em · headlines</code>
          </div>
          <div>
            <span className="bk-specimen ui">Kane re-checks only what failed, then everything.</span>
            <code>Geist · 400–600 · interface and body</code>
          </div>
          <div>
            <span className="bk-specimen mono">r2 · v2 · ac-24 @ 9:16 — PASS</span>
            <code>Geist Mono · 500 · numbers, verdicts, code</code>
          </div>
        </div>
      </section>

      <section className="bk-sec">
        <h2>Rules</h2>
        <ul className="bk-rules">
          <li>Clear space around the mark is a quarter of its height. Never smaller than 16 px.</li>
          <li>The check gradient runs clay → violet → cobalt. Never reverse it, never recolour the dots.</li>
          <li>Verdicts are colour plus an icon, never colour alone.</li>
          <li>On dark, use the light tile or the white wordmark. Keep the dots in colour.</li>
          <li>Claude is always clay and Kane is always cobalt, in the app, the deck and the video.</li>
        </ul>
      </section>

      <section className="bk-sec">
        <h2>Downloads</h2>
        <div className="bk-files">
          {FILES.map(([f, label]) => (
            <a key={f} href={`/brand/${f}`} download className={`bk-file ${f.includes('white') ? 'dark' : ''}`}>
              <img src={`/brand/${f}`} alt="" />
              <span>
                {label} <Icon name="download" size={12} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
