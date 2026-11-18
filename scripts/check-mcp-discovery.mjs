#!/usr/bin/env node
import assert from 'node:assert/strict';
import { pathToFileURL } from 'node:url';

export async function checkMcpDiscovery(origin = 'https://qubrics.com') {
  const url = new URL('/.well-known/mcp.json', origin);
  const response = await fetch(url, { redirect: 'manual', signal: AbortSignal.timeout(15_000) });
  assert.equal(response.status, 200, `${url} must return HTTP 200, got ${response.status}`);
  assert.match(response.headers.get('content-type') ?? '', /application\/json/i, 'MCP discovery must serve application/json');
  const metadata = await response.json();
  assert.equal(metadata.name, 'Qubrics', 'MCP discovery must identify Qubrics');
  assert.ok(typeof metadata.description === 'string' && metadata.description.trim(), 'MCP discovery needs a description');
  assert.equal(metadata.url, 'https://mcp.qubrics.com/mcp', 'MCP discovery must use the hosted endpoint');
  return metadata;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  checkMcpDiscovery(process.argv[2]).then(() => console.log('MCP discovery check passed.')).catch(error => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
