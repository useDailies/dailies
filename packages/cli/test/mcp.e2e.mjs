/**
 * Drives the bundled dailies MCP server with the official MCP client over stdio.
 *   node packages/cli/test/mcp.e2e.mjs <email> <password>
 * Uses a throwaway DAILIES_HOME, approves the device login in a real browser.
 */
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { chromium } from 'playwright-core';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, existsSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const [email, password] = process.argv.slice(2);
const BIN = join(dirname(fileURLToPath(import.meta.url)), '../dist/dailies.mjs');
const home = mkdtempSync(join(tmpdir(), 'dailies-home-'));
const repo = mkdtempSync(join(tmpdir(), 'dailies-repo-'));
mkdirSync(join(repo, 'video'));
writeFileSync(join(repo, 'video/storyboard.md'), '# MCP smoke\n\nLength 4 seconds at 30 fps. Deliver one cut: 16:9 (1920x1080).\n\n## Shot 1 (0:00–0:04) Title\n- Caption reads exactly: Hello dailies\n');
const out = [];
const ok = (m) => out.push(`✓ ${m}`);

const client = new Client({ name: 'dailies-e2e', version: '1.0.0' });
await client.connect(new StdioClientTransport({ command: 'node', args: [BIN, 'mcp'], env: { ...process.env, DAILIES_HOME: home, DAILIES_PROJECT_DIR: repo, DAILIES_NO_BROWSER: '1' } }));
const tools = (await client.listTools()).tools.map((t) => t.name).sort();
assert.deepEqual(tools, ['dailies_criteria', 'dailies_login', 'dailies_review', 'dailies_seal', 'dailies_start', 'dailies_status', 'dailies_whoami']);
ok(`tools/list: ${tools.join(', ')}`);
const prompts = (await client.listPrompts()).prompts.map((p) => p.name);
assert.ok(prompts.includes('make_video'));
const pr = await client.getPrompt({ name: 'make_video', arguments: { storyboard: 'video/storyboard.md' } });
assert.match(pr.messages[0].content.text, /dailies_start/);
ok('prompts: make_video');
assert.match(client.getInstructions() ?? '', /test-driven video/);
ok('server instructions present');

const t = (name, args = {}) => client.callTool({ name, arguments: args });
const txt = (r) => r.content.filter((c) => c.type === 'text').map((c) => c.text).join('\n');

const notSigned = await t('dailies_start');
assert.equal(notSigned.isError, true);
assert.match(txt(notSigned), /Not signed in/);
ok('not signed in → clear error pointing at dailies_login');

const l1 = await t('dailies_login');
const code = txt(l1).match(/code: ([A-Z]{4}-[A-Z]{4})/)?.[1];
const url = txt(l1).match(/(http\S+\/device\?code=\S+)/)?.[1];
assert.ok(code && url, txt(l1));
ok(`dailies_login (1st call) → ${url}`);

const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
const page = await b.newPage();
await page.goto(url);
await page.waitForURL('**/login**');
await page.fill('input[type=email]', email);
await page.fill('input[type=password]', password);
await page.click('button[type=submit]');
await page.waitForURL('**/device**');
await page.getByRole('button', { name: 'Approve' }).waitFor();
await page.waitForTimeout(600);
await page.getByRole('button', { name: 'Approve' }).click();
await page.getByText('Your agent is connected').waitFor();
await b.close();
ok('browser: signed in, code shown, approved');

const l2 = await t('dailies_login');
assert.match(txt(l2), /Signed in as/);
assert.ok(existsSync(join(home, 'credentials.json')));
assert.equal((readFileSync(join(home, 'credentials.json')).toString().match(/dly_/g) ?? []).length, 1);
ok(`dailies_login (2nd call) → ${txt(l2).split('\n')[0]}`);

const who = await t('dailies_whoami');
assert.match(txt(who), new RegExp(email.replace('.', '\\.')));
ok('dailies_whoami');

const s = await t('dailies_start', { title: 'MCP smoke test' });
assert.ok(!s.isError, txt(s));
assert.match(txt(s), /Started spot "MCP smoke test"/);
assert.match(txt(s), /composition contract \(external agent\)/);
assert.ok(existsSync(join(repo, '.dailies/spot.json')));
ok('dailies_start → spot linked, contract returned');
const s2 = await t('dailies_start');
assert.match(txt(s2), /Linked spot/);
ok('dailies_start again → reuses the linked spot');

const noComp = await t('dailies_review');
assert.equal(noComp.isError, true);
assert.match(txt(noComp), /No composition yet/);
ok('dailies_review before writing → clear error');

const st = await t('dailies_status');
assert.match(txt(st), /MCP smoke test/);
ok('dailies_status');

await client.close();
console.log(out.join('\n'));
console.log(`\nspot: ${JSON.parse(readFileSync(join(repo, '.dailies/spot.json'), 'utf8')).spot}`);
