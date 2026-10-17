#!/usr/bin/env node
/* ──────────────────────────────────────────────────────────────
   The answer-key vault: the forge (trial sources, solutions,
   grader checks and build tools) as one AES-256-GCM encrypted file.
   Without the passphrase this file is noise. Claude keeps the
   passphrase so trials can be fixed or added later.

   node vault.mjs pack   <forgeDir> <file.vault>
   node vault.mjs unpack <file.vault> <destDir>
   passphrase: env TRIALS_VAULT_KEY
   ────────────────────────────────────────────────────────────── */
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import crypto from 'node:crypto';

const SKIP = new Set(['node_modules', '.tmp', '.shots', '.DS_Store', '.variants-out']);

function walk(dir, base = dir, out = {}) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(e.name)) continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, base, out);
    else out[path.relative(base, p)] = fs.readFileSync(p).toString('base64');
  }
  return out;
}

function key(pass, salt) { return crypto.scryptSync(pass, salt, 32, { N: 1 << 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 }); }

const [cmd, a, b] = process.argv.slice(2);
const pass = process.env.TRIALS_VAULT_KEY;
if (!pass || !cmd || !a || !b) { console.log('usage: TRIALS_VAULT_KEY=… node vault.mjs pack|unpack <src> <dst>'); process.exit(1); }

if (cmd === 'pack') {
  const files = walk(path.resolve(a));
  const plain = zlib.gzipSync(Buffer.from(JSON.stringify({ v: 1, at: new Date().toISOString(), files })));
  const salt = crypto.randomBytes(16), iv = crypto.randomBytes(12);
  const c = crypto.createCipheriv('aes-256-gcm', key(pass, salt), iv);
  const ct = Buffer.concat([c.update(plain), c.final()]);
  fs.mkdirSync(path.dirname(path.resolve(b)), { recursive: true });
  fs.writeFileSync(b, Buffer.concat([Buffer.from('TRIALSV1'), salt, iv, c.getAuthTag(), ct]));
  console.log(`packed ${Object.keys(files).length} files → ${b}`);
} else if (cmd === 'unpack') {
  const buf = fs.readFileSync(a);
  if (buf.subarray(0, 8).toString() !== 'TRIALSV1') throw new Error('not a trials vault');
  const salt = buf.subarray(8, 24), iv = buf.subarray(24, 36), tag = buf.subarray(36, 52), ct = buf.subarray(52);
  const d = crypto.createDecipheriv('aes-256-gcm', key(pass, salt), iv);
  d.setAuthTag(tag);
  const data = JSON.parse(zlib.gunzipSync(Buffer.concat([d.update(ct), d.final()])).toString());
  for (const [rel, b64] of Object.entries(data.files)) {
    const p = path.join(path.resolve(b), rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, Buffer.from(b64, 'base64'));
  }
  console.log(`unpacked ${Object.keys(data.files).length} files (vault from ${data.at}) → ${b}`);
} else { console.log('unknown command'); process.exit(1); }
