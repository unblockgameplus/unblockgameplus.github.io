#!/usr/bin/env node
/** Download the 786 catalogue thumbnails once, so the site never hotlinks them. */
import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { join } from 'node:path';

const ROOT = process.cwd();
const games = JSON.parse(await readFile(join(ROOT, 'src/data/external-source.json'), 'utf8'));
const out = join(ROOT, 'assets/img/external/raw');
await mkdir(out, { recursive: true });

const exists = async (path) => access(path).then(() => true).catch(() => false);
let done = 0;
let failed = 0;
const queue = games.map((game) => ({ game, url: game.thumb, id: game.id }));

async function worker() {
  while (queue.length) {
    const item = queue.shift();
    if (!item || !item.url) { failed += 1; continue; }
    const file = join(out, `ext-${item.id}.png`);
    if (await exists(file)) { done += 1; continue; }
    try {
      const res = await fetch(item.url, { signal: AbortSignal.timeout(25000), redirect: 'follow' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 200) throw new Error('too small');
      await writeFile(file, buf);
      done += 1;
    } catch (error) {
      failed += 1;
      if (failed < 15) console.warn(item.id, item.url, String(error.message || error));
    }
    if ((done + failed) % 50 === 0) console.log(`progress ${done + failed}/${games.length} (ok ${done}, failed ${failed})`);
  }
}

await Promise.all(Array.from({ length: 10 }, worker));
console.log(`done=${done} failed=${failed} total=${games.length}`);
