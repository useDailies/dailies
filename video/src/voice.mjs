/**
 * Generates the voiceover, one clip per script line, with character timings.
 *   node video/src/voice.mjs [lineId…]     (reads ELEVENLABS_API_KEY from .env)
 * Writes video/public/vo/<id>.mp3 and video/public/vo/<id>.json (duration + word times).
 */
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const env = readFileSync(join(ROOT, '..', '.env'), 'utf8');
const KEY = env.match(/^ELEVENLABS_API_KEY=(.+)$/m)?.[1]?.trim();
if (!KEY) throw new Error('ELEVENLABS_API_KEY missing from .env');
const script = JSON.parse(readFileSync(join(ROOT, process.env.VO_SCRIPT ?? 'script.json'), 'utf8'));
const OUT = join(ROOT, process.env.VO_OUT ?? 'public/vo');
mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);

let prev = null;
for (const line of script.lines) {
  if (only.length && !only.includes(line.id)) {
    prev = line.text;
    continue;
  }
  if (!only.length && existsSync(join(OUT, `${line.id}.json`))) {
    prev = line.text;
    continue;
  }
  const next = script.lines[script.lines.indexOf(line) + 1]?.text;
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${script.voice.id}/with-timestamps?output_format=mp3_44100_128`, {
    method: 'POST',
    headers: { 'xi-api-key': KEY, 'content-type': 'application/json' },
    body: JSON.stringify({
      text: line.text,
      model_id: script.voice.model,
      previous_text: prev ?? undefined,
      next_text: next ?? undefined,
      voice_settings: { stability: 0.42, similarity_boost: 0.8, style: 0.28, use_speaker_boost: true, speed: 0.98 },
    }),
  });
  if (!res.ok) throw new Error(`${line.id}: ${res.status} ${await res.text()}`);
  const j = await res.json();
  writeFileSync(join(OUT, `${line.id}.mp3`), Buffer.from(j.audio_base64, 'base64'));
  const a = j.alignment;
  // fold characters into words
  const words = [];
  let w = null;
  a.characters.forEach((ch, i) => {
    if (/\s/.test(ch)) {
      if (w) words.push(w), (w = null);
      return;
    }
    if (!w) w = { text: '', start: a.character_start_times_seconds[i], end: 0 };
    w.text += ch;
    w.end = a.character_end_times_seconds[i];
  });
  if (w) words.push(w);
  const dur = Number(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', join(OUT, `${line.id}.mp3`)]).toString());
  writeFileSync(join(OUT, `${line.id}.json`), JSON.stringify({ id: line.id, text: line.text, duration: dur, speechEnd: words.at(-1)?.end ?? dur, words }, null, 1));
  console.log(line.id, dur.toFixed(2) + 's');
  prev = line.text;
}
