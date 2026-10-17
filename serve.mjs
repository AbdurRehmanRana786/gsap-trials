#!/usr/bin/env node
/* ──────────────────────────────────────────────────────────────
   GSAP Trials — tiny local server (no dependencies).

     node serve.mjs            → http://localhost:5510  (opens your browser)
     node serve.mjs 8080       → another port
     node serve.mjs --no-open

   Serves the whole Practice folder, so hint links to your course
   projects work too. Pages under starter/ reload when you save.
   ────────────────────────────────────────────────────────────── */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { exec } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.dirname(HERE);
const MOUNT = '/' + encodeURIComponent(path.basename(HERE)) + '/';
const args = process.argv.slice(2);
let port = Number(args.find((a) => /^\d+$/.test(a))) || 5510;

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.avif': 'image/avif',
  '.ico': 'image/x-icon', '.mp4': 'video/mp4', '.webm': 'video/webm', '.mp3': 'audio/mpeg', '.woff': 'font/woff',
  '.woff2': 'font/woff2', '.ttf': 'font/ttf', '.otf': 'font/otf', '.glb': 'model/gltf-binary', '.gltf': 'model/gltf+json',
  '.md': 'text/markdown; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.lock': 'text/plain; charset=utf-8', '.map': 'application/json',
};

const LIVE = `<script>(function(){try{var es=new EventSource('/__trials/live');es.onmessage=function(e){var p=decodeURIComponent(location.pathname);if(e.data&&p.indexOf(e.data)===0)location.reload();};}catch(e){}})();</script>`;
const clients = new Set();

function send(res, code, body, type = 'text/plain; charset=utf-8') {
  res.writeHead(code, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(body);
}

function copyDir(src, dst) {
  fs.mkdirSync(dst, { recursive: true });
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, e.name), d = path.join(dst, e.name);
    if (e.isDirectory()) copyDir(s, d); else fs.copyFileSync(s, d);
  }
}

function resetStarter(folder) {
  if (!folder || folder.includes('/') || folder.includes('\\') || folder.startsWith('.')) throw new Error('Bad trial folder.');
  const dir = path.join(HERE, folder);
  const pristine = path.join(dir, '.pristine');
  if (!fs.existsSync(pristine)) throw new Error('No pristine copy found for this trial.');
  const starter = path.join(dir, 'starter');
  let msg = 'A fresh starter is in place.';
  if (fs.existsSync(starter)) {
    const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
    const backups = path.join(dir, '.backups');
    fs.mkdirSync(backups, { recursive: true });
    fs.renameSync(starter, path.join(backups, 'starter-' + stamp));
    msg = `Your previous work was moved to ${folder}/.backups/starter-${stamp}.`;
  }
  copyDir(pristine, starter);
  return msg;
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://localhost');
  let pathname;
  try { pathname = decodeURIComponent(url.pathname); } catch (e) { return send(res, 400, 'Bad URL'); }

  if (pathname === '/__trials/ping') return send(res, 200, JSON.stringify({ ok: true }), 'application/json');
  if (pathname === '/__trials/live') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-store', Connection: 'keep-alive' });
    res.write('retry: 1500\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }
  if (pathname === '/__trials/reset' && req.method === 'POST') {
    try { return send(res, 200, JSON.stringify({ ok: true, message: resetStarter(url.searchParams.get('folder')) }), 'application/json'); }
    catch (e) { return send(res, 400, JSON.stringify({ ok: false, message: e.message }), 'application/json'); }
  }
  if (pathname === '/') { res.writeHead(302, { Location: MOUNT }); return res.end(); }

  const file = path.normalize(path.join(ROOT, pathname));
  if (!file.startsWith(ROOT)) return send(res, 403, 'Forbidden');
  let target = file;
  try {
    const st = fs.statSync(target);
    if (st.isDirectory()) {
      if (!pathname.endsWith('/')) { res.writeHead(301, { Location: url.pathname + '/' }); return res.end(); }
      target = path.join(target, 'index.html');
    }
  } catch (e) { return send(res, 404, 'Not found: ' + pathname); }
  fs.readFile(target, (err, data) => {
    if (err) return send(res, 404, 'Not found: ' + pathname);
    const ext = path.extname(target).toLowerCase();
    const type = TYPES[ext] || 'application/octet-stream';
    if (ext === '.html' && req.headers['sec-fetch-dest'] === 'document') {
      let html = data.toString('utf8');
      html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, LIVE + '</body>') : html + LIVE;
      return send(res, 200, html, type);
    }
    send(res, 200, data, type);
  });
});

/* live reload: when something inside a starter/ folder changes, reload pages from that folder */
let pending = null;
try {
  fs.watch(HERE, { recursive: true }, (evt, name) => {
    if (!name) return;
    const n = name.split(path.sep).join('/');
    const m = n.match(/^([^/]+)\/starter\//);
    if (!m) return;
    clearTimeout(pending);
    pending = setTimeout(() => {
      const prefix = '/' + path.basename(HERE) + '/' + m[1] + '/starter/';
      for (const c of clients) c.write('data: ' + encodeURIComponent(prefix) + '\n\n');
    }, 120);
  });
} catch (e) { /* recursive watch unsupported — no live reload */ }

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') { port++; server.listen(port, '127.0.0.1'); }
  else { console.error(e); process.exit(1); }
});
server.on('listening', () => {
  const addr = `http://localhost:${port}${MOUNT}`;
  console.log('\n  GSAP Trials is running\n');
  console.log('  → ' + addr + '\n');
  console.log('  Pages in starter/ reload when you save. Ctrl+C to stop.\n');
  if (!args.includes('--no-open')) {
    const cmd = process.platform === 'darwin' ? 'open' : process.platform === 'win32' ? 'start ""' : 'xdg-open';
    exec(`${cmd} "${addr}"`);
  }
});
server.listen(port, '127.0.0.1');
