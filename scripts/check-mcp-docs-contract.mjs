import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";
import { parseArgs } from "node:util";
import { createHash } from "node:crypto";

const owned = ["scripts/check-mcp.mjs", "packages/python/mcp/pyproject.toml", "packages/python/mcp/server.json", "packages/python/mcp/qubrics/mcp/mcp-contract.json", "packages/ts/mcp/package.json"];
const semver = /^(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)\.(0|[1-9][0-9]*)(?:-((?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*)(?:\.(?:0|[1-9][0-9]*|[0-9]*[A-Za-z-][0-9A-Za-z-]*))*))?(?:\+([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?$/;
const usage = "Usage: check-mcp-docs-contract.mjs --check|--write [--sdk PATH]";

function git(sdkDir, args, maxBuffer = 1024 * 1024) {
  const result = spawnSync("git", ["-C", sdkDir, ...args], { encoding: "utf8", maxBuffer });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr.trim() || `git ${args.join(" ")} failed`);
  return result.stdout;
}

function validDate(value) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && new Date(`${value}T00:00:00Z`).toISOString().startsWith(value);
}

function parseCliArgs(args) {
  try {
    const { values, tokens } = parseArgs({
      args,
      options: { check: { type: "boolean" }, write: { type: "boolean" }, sdk: { type: "string" } },
      strict: true,
      allowPositionals: false,
      tokens: true,
    });
    const modes = tokens.filter((token) => token.kind === "option" && ["check", "write"].includes(token.name));
    const sdkOptions = tokens.filter((token) => token.kind === "option" && token.name === "sdk");
    if (modes.length !== 1 || sdkOptions.length > 1 || values.sdk === "") throw new Error("Specify exactly one mode and at most one non-empty --sdk PATH");
    return { mode: values.write ? "write" : "check", sdkDir: values.sdk };
  } catch (error) {
    throw new Error(`${usage}\n${error.message}`);
  }
}

export function renderSnippet(p) {
  return `<AccordionGroup>
  <Accordion title="Local Python package">
    Local Python package: \`${p.identity}\`

    Local Python version: \`${p.version}\`

    Compatibility PyPI package: \`${p.pointerIdentity}\` \`${p.pointerVersion}\`

    Declared local tool count: ${p.toolCount}

    Local protocol declarations: ${p.protocols.map((v) => `\`${v}\``).join(", ")}

    Local runtime protocol declarations: ${p.runtimeProtocols.map((v) => `\`${v}\``).join(", ")}

    These declarations describe the published local package. They do not verify hosted tools, protocol support or certification.
  </Accordion>
  <Accordion title="npm bridge">
    npm package: \`${p.npmIdentity}\`

    npm version: \`${p.npmVersion}\`

    This package bridges to the legacy hosted connection.
  </Accordion>
  <Accordion title="MCP Registry listing">
    Registry identity: \`${p.registryIdentity}\`

    Registry metadata version: \`${p.registryVersion}\`

    Registry PyPI binding: \`${p.registryPythonIdentity}\` \`${p.registryPythonVersion}\`

    Registry npm binding: \`${p.registryNpmIdentity}\` \`${p.registryNpmVersion}\`

    The published listing retains these package bindings independently of newer package releases.
  </Accordion>
  <Accordion title="Hosted connection">
    Hosted resource: \`${p.resource}\`

    Observed OAuth resource metadata: \`${p.resourceMetadataUrl}\`

    Advertised authorisation servers: ${p.authorizationServers.map((value) => `\`${value}\``).join(", ")}

    Public discovery returned HTTP ${p.initializeStatus} for an unauthenticated initialize request and HTTP ${p.metadataStatus} for resource metadata. Authenticated tools and protocol support remain unverified.
  </Accordion>
</AccordionGroup>
`;
}

const renderedFields = [["package.identity", "Local Python package:"], ["package.version", "Local Python version:"], ["package.pointer", "Compatibility PyPI package:"], ["npm.identity", "npm package:"], ["npm.version", "npm version:"], ["registry.identity", "Registry identity:"], ["registry.version", "Registry metadata version:"], ["registry.python", "Registry PyPI binding:"], ["registry.npm", "Registry npm binding:"], ["hosted.resource", "Hosted resource:"], ["hosted.metadata", "Observed OAuth resource metadata:"], ["hosted.authorization_servers", "Advertised authorisation servers:"], ["hosted.discovery", "Public discovery returned"], ["tools.count", "Declared local tool count:"], ["protocols", "Local protocol declarations:"], ["runtime_protocols", "Local runtime protocol declarations:"]];

export function changedRenderedFields(actual, expected) {
  const lineFor = (text, label) => text.split(/\r?\n/).find((line) => line.trimStart().startsWith(label));
  return renderedFields.flatMap(([field, label]) => lineFor(actual, label) === lineFor(expected, label) ? [] : [field]);
}

function readProjectMetadata(sdkDir) {
  const project = readFileSync(resolve(sdkDir, owned[1]), "utf8").split(/^\[project\]\r?$/m)[1]?.split(/^\[/m)[0] ?? "";
  const name = project.match(/^name = "([^"]+)"\r?$/m)?.[1];
  const version = project.match(/^version = "([^"]+)"\r?$/m)?.[1];
  assert.ok(name && version, "pyproject.toml must declare project name and version");
  return { name, version };
}

function verifyPublishedPackages({ publications, pkg, npmPackage }) {
  const { python, npm } = publications;
  assert.ok(Number.isFinite(Date.parse(publications.verifiedAt)), "publication facts must record verifiedAt");
  assert.equal(python.identity, pkg.identity, "published Python identity must match pinned package");
  assert.equal(python.version, pkg.version, "published Python version must match pinned package");
  assert.equal(python.sourceUrl, `https://pypi.org/pypi/${python.identity}/${python.version}/json`, "Python sourceUrl must identify the verified release");
  assert.equal(python.pointerIdentity, "sendmux-mcp", "compatibility PyPI identity");
  assert.ok(semver.test(python.pointerVersion), "compatibility PyPI version must be valid SemVer 2.0.0");
  assert.equal(python.pointerSourceUrl, `https://pypi.org/pypi/${python.pointerIdentity}/${python.pointerVersion}/json`, "compatibility PyPI sourceUrl must identify the verified release");
  assert.equal(npm.identity, npmPackage.name, "published npm identity must match pinned package");
  assert.equal(npm.version, npmPackage.version, "published npm version must match pinned package");
  assert.ok(semver.test(npm.version), "npm.version must be valid SemVer 2.0.0");
  assert.equal(npm.sourceUrl, `https://registry.npmjs.org/${npm.identity}/${npm.version}`, "npm sourceUrl must identify the verified release");
  assert.equal(npmPackage.mcpName, publications.registry.identity, "npm Registry ownership marker");
}

function verifyRegistrySnapshot({ publication, snapshot }) {
  assert.equal(createHash("sha256").update(snapshot).digest("hex"), publication.snapshotSha256, "Registry snapshot SHA256 must match verified publication facts");
  const { server, _meta: meta } = JSON.parse(snapshot);
  assert.equal(server.$schema, "https://static.modelcontextprotocol.io/schemas/2025-12-11/server.schema.json", "MCP Registry schema");
  assert.equal(server.name, publication.identity, "Registry identity must match verified snapshot");
  assert.equal(server.version, publication.version, "Registry version must match verified snapshot");
  assert.ok(semver.test(server.version) && server.version !== "0.0.0", "Registry version must be a non-bootstrap SemVer 2.0.0");
  assert.equal(publication.sourceUrl, `https://registry.modelcontextprotocol.io/v0.1/servers/${encodeURIComponent(server.name)}/versions/${server.version}`, "Registry sourceUrl must identify the verified record");
  const official = meta?.["io.modelcontextprotocol.registry/official"];
  assert.equal(official?.status, "active", "Registry status must be active");
  assert.equal(official?.isLatest, true, "Registry record must be latest");
  assert.ok(Number.isFinite(Date.parse(official?.publishedAt)), "Registry record must have a publication date");
  for (const [type, identity, version] of [["pypi", publication.pythonIdentity, publication.pythonVersion], ["npm", publication.npmIdentity, publication.npmVersion]]) {
    const entries = server.packages?.filter((entry) => entry.registryType === type) ?? [];
    assert.equal(entries.length, 1, `Registry must contain exactly one ${type} package binding`);
    assert.deepEqual([entries[0].identifier, entries[0].version, entries[0].transport?.type], [identity, version, "stdio"], `Registry ${type === "pypi" ? "Python" : "npm"} binding must match verified snapshot`);
    assert.ok(semver.test(version), `Registry ${type} version must be valid SemVer 2.0.0`);
  }
  assert.deepEqual(server.remotes, [{ type: "streamable-http", url: "https://mcp.sendmux.ai/mcp" }], "Registry must retain its verified legacy remote");
  assert.ok(typeof server.description === "string" && server.description.trim().length > 0 && server.description.length <= 100, "Registry description must contain 1 to 100 characters");
}

function verifyHostedDiscovery({ discovery, hosted }) {
  assert.equal(discovery.resource, hosted.resource, "observed hosted resource must match canonical package resource");
  assert.equal(discovery.resourceMetadataUrl, `${new URL(hosted.resource).origin}/.well-known/oauth-protected-resource/mcp`, "observed OAuth resource metadata URL");
  assert.equal(discovery.unauthenticatedInitializeStatus, 401, "observed unauthenticated initialize status");
  assert.equal(discovery.resourceMetadataStatus, 200, "observed OAuth resource metadata status");
  assert.deepEqual(discovery.authorizationServers, ["https://app.sendmux.ai", "https://app.qubrics.com"], "observed OAuth authorisation servers");
}

export async function checkContract({ sdkDir, pin, publications = JSON.parse(readFileSync(resolve("scripts/mcp-docs-publications.json"), "utf8")), registrySnapshot = readFileSync(resolve("scripts/mcp-docs-registry.json")) }) {
  if (!/^[0-9a-f]{40}$/.test(pin)) throw new Error("SDK pin must be one complete 40-character commit ID");
  const resolved = git(sdkDir, ["rev-parse", "HEAD"]).trim();
  if (resolved !== pin) throw new Error(`SDK checkout resolves to ${resolved}, expected ${pin}`);
  for (const path of owned) {
    const disk = readFileSync(resolve(sdkDir, path));
    const blob = Buffer.from(git(sdkDir, ["show", `${pin}:${path}`], disk.length + 1));
    if (!disk.equals(blob)) throw new Error(`${path} differs from pinned Git blob ${pin}`);
  }
  const npmPackage = JSON.parse(readFileSync(resolve(sdkDir, owned[4]), "utf8"));
  const contract = JSON.parse(readFileSync(resolve(sdkDir, owned[3]), "utf8"));
  const { package: pkg, protocols, runtime_protocols: runtimeProtocols, tools, hosted, uploads } = contract;
  assert.match(pkg.identity, /\S/, "package.identity");
  assert.ok(typeof pkg.version === "string" && semver.test(pkg.version), "package.version must be valid SemVer 2.0.0");
  const project = readProjectMetadata(sdkDir);
  assert.equal(pkg.identity, project.name, "MCP contract identity must match native project name");
  assert.equal(pkg.version, project.version, "MCP contract version must match native project version");
  for (const [name, values] of [["protocols", protocols], ["runtime_protocols", runtimeProtocols]]) {
    assert.ok(Array.isArray(values) && values.length > 0, `${name} must be non-empty`);
    assert.equal(new Set(values).size, values.length, `${name} must be unique`);
    assert.ok(values.every(validDate), `${name} must contain real ISO dates`);
  }
  assert.ok(protocols.every((value) => runtimeProtocols.includes(value)), "certified protocols must be accepted at runtime");
  const count = Object.values(tools.by_surface).reduce((sum, entries) => sum + entries.length, 0);
  assert.equal(tools.count, count, "tools.count must equal tools.by_surface total");
  assert.ok(Number.isInteger(tools.count) && tools.count >= 0, "tools.count must be a non-negative integer");
  assert.equal(hosted.resource, "https://mcp.qubrics.com/mcp", "hosted.resource");
  assert.deepEqual(hosted.transports, ["streamable-http"], "hosted.transports");
  assert.equal(uploads.inline_decoded_max_bytes, 32768, "uploads.inline_decoded_max_bytes must remain 32768 for the documented 32 KiB cap");
  assert.equal(uploads.mailbox.tool, "mailbox_upload_attachment", "uploads.mailbox.tool");
  assert.equal(uploads.mailbox.inline_property, "content_base64", "uploads.mailbox.inline_property");
  assert.deepEqual(uploads.mailbox.modes, ["content_base64", "presign_upload_url"], "mailbox modes must remain content_base64 and presign_upload_url");
  assert.deepEqual([uploads.mailbox.presigned_max_bytes, uploads.mailbox.request_schema_max_bytes], [7500000, 7500000], "mailbox upload limits must remain 7500000 bytes");
  assert.equal(uploads.sending.presigned_tool, "sending_create_attachment_upload", "uploads.sending.presigned_tool");
  assert.equal(uploads.sending.limit_authority, "upload intent response max_size_bytes", "uploads.sending.limit_authority");
  verifyPublishedPackages({ publications, pkg, npmPackage });
  verifyRegistrySnapshot({ publication: publications.registry, snapshot: registrySnapshot });
  verifyHostedDiscovery({ discovery: publications.hosted, hosted });
  const { python, npm, registry, hosted: discovery } = publications;
  return { contract, projection: { identity: pkg.identity, version: pkg.version, pointerIdentity: python.pointerIdentity, pointerVersion: python.pointerVersion, npmIdentity: npmPackage.name, npmVersion: npmPackage.version, registryIdentity: registry.identity, registryVersion: registry.version, registryPythonIdentity: registry.pythonIdentity, registryPythonVersion: registry.pythonVersion, registryNpmIdentity: registry.npmIdentity, registryNpmVersion: registry.npmVersion, protocols, runtimeProtocols, toolCount: tools.count, resource: discovery.resource, resourceMetadataUrl: discovery.resourceMetadataUrl, authorizationServers: discovery.authorizationServers, initializeStatus: discovery.unauthenticatedInitializeStatus, metadataStatus: discovery.resourceMetadataStatus } };
}

async function main() {
  const { mode, sdkDir: sdkArgument } = parseCliArgs(process.argv.slice(2));
  const config = JSON.parse(readFileSync(resolve("scripts/mcp-docs-sdk.json"), "utf8"));
  const pin = config.commit;
  const sdkDir = sdkArgument ?? process.env.SENDMUX_SDK_CHECKOUT;
  if (!sdkDir) throw new Error(`Missing SDK checkout for ${pin}; set SENDMUX_SDK_CHECKOUT or pass --sdk PATH`);
  const snippet = resolve("snippets/mcp-release-facts.mdx");
  const result = await checkContract({ sdkDir: resolve(sdkDir), pin });
  const rendered = renderSnippet(result.projection);
  if (mode === "write") return writeFileSync(snippet, rendered);
  const actual = readFileSync(snippet, "utf8");
  if (actual !== rendered) throw new Error(`stale snippet ${snippet}: changed fields: ${changedRenderedFields(actual, rendered).join(", ")}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((error) => { console.error(error.message); process.exitCode = 1; });
