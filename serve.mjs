import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { extname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const PORT = 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.css':  'text/css',
};

createServer((req, res) => {
  const url = req.url.split('?')[0];
  let filePath = join(__dirname, url === '/' ? 'index.html' : url);

  if (!existsSync(filePath) || filePath.endsWith('/')) {
    filePath = join(__dirname, 'index.html');
  }

  const mime = MIME[extname(filePath)] ?? 'text/plain';

  try {
    const content = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(PORT, () => {
  console.log(`\n  Lynch Bingo läuft auf http://localhost:${PORT}\n`);
});
