/**
 * dailies accounts.
 *
 * - Web: email + password, an httpOnly session cookie.
 * - CLI / MCP: OAuth-style device authorization. `dailies login` asks for a
 *   device code, the user approves it in the studio (/device), the CLI receives
 *   a personal access token. Every spot an agent creates is owned by that account.
 *
 * Tokens are random 32-byte secrets; only their SHA-256 is stored.
 * Storage is a JSON file in data/ (gitignored), written atomically.
 */
import { createHash, randomBytes, randomInt, scryptSync, timingSafeEqual } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import type { FastifyReply, FastifyRequest } from 'fastify';
import { ROOT } from './config.ts';

export interface User {
  id: string;
  email: string;
  name: string;
  salt: string;
  hash: string;
  createdAt: string;
}
export interface Token {
  id: string;
  userId: string;
  hash: string;
  kind: 'web' | 'cli';
  label: string;
  createdAt: string;
  lastUsedAt: string | null;
  expiresAt: string | null;
}
interface DeviceCode {
  deviceCode: string;
  userCode: string;
  label: string;
  expiresAt: number;
  approvedBy: string | null;
  denied: boolean;
  issued: boolean;
  /** the plaintext token, held only until the CLI picks it up */
  token: string | null;
  interval: number;
  lastPoll: number;
}
interface Db {
  users: User[];
  tokens: Token[];
}

export const DATA = process.env.DAILIES_DATA ?? join(ROOT, 'data');
const FILE = join(DATA, 'accounts.json');
const devices = new Map<string, DeviceCode>();

function load(): Db {
  if (!existsSync(FILE)) return { users: [], tokens: [] };
  return JSON.parse(readFileSync(FILE, 'utf8')) as Db;
}
function save(db: Db) {
  mkdirSync(DATA, { recursive: true });
  const tmp = `${FILE}.${process.pid}.tmp`;
  writeFileSync(tmp, JSON.stringify(db, null, 2), { mode: 0o600 });
  renameSync(tmp, FILE);
}

const sha = (s: string) => createHash('sha256').update(s).digest('hex');
const id = (p: string) => `${p}_${randomBytes(9).toString('base64url')}`;

export type PublicUser = { id: string; email: string; name: string; createdAt: string };
export const publicUser = (u: User): PublicUser => ({ id: u.id, email: u.email, name: u.name, createdAt: u.createdAt });

function hashPassword(pw: string, salt = randomBytes(16).toString('hex')) {
  return { salt, hash: scryptSync(pw, salt, 64).toString('hex') };
}

export class AuthError extends Error {
  constructor(
    public statusCode: number,
    message: string,
  ) {
    super(message);
  }
}

export function signup(email: string, password: string, name?: string): User {
  email = String(email ?? '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new AuthError(400, 'Enter a valid email address.');
  if (String(password ?? '').length < 8) throw new AuthError(400, 'Use a password of at least 8 characters.');
  const db = load();
  if (db.users.some((u) => u.email === email)) throw new AuthError(409, 'An account with that email already exists. Sign in instead.');
  const u: User = { id: id('usr'), email, name: String(name ?? '').trim().slice(0, 60) || email.split('@')[0], ...hashPassword(password), createdAt: new Date().toISOString() };
  db.users.push(u);
  save(db);
  return u;
}

export function verifyPassword(email: string, password: string): User {
  const u = load().users.find((x) => x.email === String(email ?? '').trim().toLowerCase());
  const ok = u && timingSafeEqual(Buffer.from(hashPassword(String(password ?? ''), u.salt).hash, 'hex'), Buffer.from(u.hash, 'hex'));
  if (!u || !ok) throw new AuthError(401, 'Email or password is incorrect.');
  return u;
}

export function issueToken(userId: string, kind: Token['kind'], label: string, days: number | null): string {
  const secret = `dly_${randomBytes(32).toString('base64url')}`;
  const db = load();
  db.tokens.push({
    id: id('tok'),
    userId,
    hash: sha(secret),
    kind,
    label: label.slice(0, 80),
    createdAt: new Date().toISOString(),
    lastUsedAt: null,
    expiresAt: days ? new Date(Date.now() + days * 86400_000).toISOString() : null,
  });
  save(db);
  return secret;
}

let touchQueue = new Map<string, string>();
let touchTimer: NodeJS.Timeout | null = null;
function touch(tokenId: string) {
  touchQueue.set(tokenId, new Date().toISOString());
  if (touchTimer) return;
  touchTimer = setTimeout(() => {
    const db = load();
    for (const [tid, at] of touchQueue) {
      const t = db.tokens.find((x) => x.id === tid);
      if (t) t.lastUsedAt = at;
    }
    save(db);
    touchQueue = new Map();
    touchTimer = null;
  }, 2000);
}

export function userForToken(secret: string | undefined): { user: User; token: Token } | null {
  if (!secret || !secret.startsWith('dly_')) return null;
  const db = load();
  const h = sha(secret);
  const t = db.tokens.find((x) => x.hash === h);
  if (!t || (t.expiresAt && Date.parse(t.expiresAt) < Date.now())) return null;
  const user = db.users.find((u) => u.id === t.userId);
  if (!user) return null;
  touch(t.id);
  return { user, token: t };
}

export function revokeToken(userId: string, tokenId: string) {
  const db = load();
  const before = db.tokens.length;
  db.tokens = db.tokens.filter((t) => !(t.userId === userId && t.id === tokenId));
  save(db);
  return before !== db.tokens.length;
}
export function revokeSecret(secret: string) {
  const db = load();
  db.tokens = db.tokens.filter((t) => t.hash !== sha(secret));
  save(db);
}
export function listTokens(userId: string) {
  return load()
    .tokens.filter((t) => t.userId === userId && t.kind === 'cli')
    .map(({ hash: _h, ...t }) => t);
}

/* ------------------------------------------------------- device flow */

const ALPHA = 'BCDFGHJKLMNPQRSTVWXZ'; // no vowels, no look-alikes
const userCode = () => Array.from({ length: 8 }, (_, i) => (i === 4 ? '-' : '') + ALPHA[randomInt(ALPHA.length)]).join('');

export function startDevice(label: string) {
  for (const [k, d] of devices) if (d.expiresAt < Date.now()) devices.delete(k);
  const d: DeviceCode = {
    deviceCode: randomBytes(24).toString('base64url'),
    userCode: userCode(),
    label: String(label || 'dailies CLI').slice(0, 80),
    expiresAt: Date.now() + 10 * 60_000,
    approvedBy: null,
    denied: false,
    issued: false,
    token: null,
    interval: 2,
    lastPoll: 0,
  };
  devices.set(d.deviceCode, d);
  return d;
}

export function deviceByUserCode(code: string) {
  const norm = String(code ?? '').toUpperCase().replace(/[^A-Z]/g, '');
  for (const d of devices.values()) if (d.userCode.replace('-', '') === norm && d.expiresAt > Date.now() && !d.issued) return d;
  return null;
}

export function approveDevice(code: string, user: User, approve: boolean) {
  const d = deviceByUserCode(code);
  if (!d) throw new AuthError(404, 'That code has expired or was already used. Run `dailies login` again.');
  if (!approve) {
    d.denied = true;
    return d;
  }
  d.approvedBy = user.id;
  d.token = issueToken(user.id, 'cli', d.label, 365);
  return d;
}

/** RFC 8628-style polling: authorization_pending | slow_down | access_denied | expired_token | token. */
export function pollDevice(deviceCode: string): { error?: string; access_token?: string; user?: PublicUser } {
  const d = devices.get(String(deviceCode ?? ''));
  if (!d || d.expiresAt < Date.now()) return { error: 'expired_token' };
  const now = Date.now();
  if (now - d.lastPoll < d.interval * 1000 - 250) {
    d.lastPoll = now;
    return { error: 'slow_down' };
  }
  d.lastPoll = now;
  if (d.denied) {
    devices.delete(deviceCode);
    return { error: 'access_denied' };
  }
  if (!d.token || !d.approvedBy) return { error: 'authorization_pending' };
  const token = d.token;
  d.token = null;
  d.issued = true;
  devices.delete(deviceCode);
  const u = load().users.find((x) => x.id === d.approvedBy)!;
  return { access_token: token, user: publicUser(u) };
}

/* -------------------------------------------------------- request auth */

export const COOKIE = 'dailies_session';

function cookie(req: FastifyRequest, name: string) {
  const raw = req.headers.cookie ?? '';
  for (const part of raw.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return undefined;
}

export function requestUser(req: FastifyRequest): { user: User; token: Token; via: 'cookie' | 'bearer' } | null {
  const bearer = req.headers.authorization?.match(/^Bearer\s+(\S+)$/i)?.[1];
  if (bearer) {
    const r = userForToken(bearer);
    return r ? { ...r, via: 'bearer' } : null;
  }
  const c = cookie(req, COOKIE);
  const r = userForToken(c);
  return r ? { ...r, via: 'cookie' } : null;
}

export function setSessionCookie(reply: FastifyReply, secret: string, secure: boolean) {
  reply.header('set-cookie', `${COOKIE}=${encodeURIComponent(secret)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${30 * 86400}${secure ? '; Secure' : ''}`);
}
export function clearSessionCookie(reply: FastifyReply) {
  reply.header('set-cookie', `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}
export const sessionSecret = (req: FastifyRequest) => cookie(req, COOKIE);
