#!/usr/bin/env node
/**
 * Minimal stdio client for the magpie-image MCP server.
 * Usage: node scripts/magpie-image.mjs "<prompt>" <path> [size] [quality]
 */
import { spawn } from 'node:child_process';

const exe = process.env.MAGPIE_BIN || 'C:/Users/zdy/Downloads/magpie-windows-amd64.exe';
const [prompt, path, size = '16:9', quality = 'high'] = process.argv.slice(2);
if (!prompt || !path) {
  console.error('usage: node scripts/magpie-image.mjs "<prompt>" <path> [size] [quality]');
  process.exit(2);
}

const child = spawn(exe, ['mcp', 'image'], { cwd: process.cwd(), stdio: ['pipe', 'pipe', 'pipe'] });
let nextId = 1;
const pending = new Map();

function send(method, params) {
  const id = nextId++;
  const msg = { jsonrpc: '2.0', id, method, params };
  child.stdin.write(JSON.stringify(msg) + '\n');
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id);
        reject(new Error(`timeout waiting for ${method}`));
      }
    }, 180000);
  });
}

let buffer = '';
child.stdout.on('data', (chunk) => {
  buffer += chunk.toString('utf8');
  let idx;
  while ((idx = buffer.indexOf('\n')) >= 0) {
    const line = buffer.slice(0, idx).trim();
    buffer = buffer.slice(idx + 1);
    if (!line) continue;
    let msg;
    try { msg = JSON.parse(line); } catch { continue; }
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id);
      pending.delete(msg.id);
      if (msg.error) reject(new Error(JSON.stringify(msg.error)));
      else resolve(msg.result);
    }
  }
});
child.stderr.on('data', (chunk) => {
  const text = chunk.toString().trim();
  if (text && !text.includes('appdir:')) process.stderr.write(`[magpie] ${text}\n`);
});
child.on('error', (error) => {
  console.error('failed to spawn magpie:', error.message);
  process.exit(1);
});

async function main() {
  await send('initialize', {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'ugg-image-builder', version: '1.0' },
  });

  const result = await send('tools/call', {
    name: 'generate_image',
    arguments: { prompt, path, size, quality },
  });

  let payload = result;
  let text = JSON.stringify(result);
  console.log(text);

  // The server may return an id to wait on instead of a finished file.
  const idMatch = text.match(/"id"\s*:\s*"([^"]+)"/) || text.match(/id\s+([A-Za-z0-9_-]+)/);
  if (result?.isError !== true && idMatch && !/saved|path/i.test(text)) {
    for (let attempt = 0; attempt < 30; attempt += 1) {
      await new Promise((r) => setTimeout(r, 4000));
      const waited = await send('tools/call', {
        name: 'generation_result',
        arguments: { id: idMatch[1] },
      });
      payload = waited;
      text = JSON.stringify(waited);
      console.log(text);
      if (!/"pending"|"working"|not ready|still/i.test(text)) break;
    }
  }
  child.kill();
}

main().catch(async (error) => {
  console.error(error.message);
  try { child.kill(); } catch {}
  process.exit(1);
});
