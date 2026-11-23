import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import test from "node:test";
import { createHash } from "node:crypto";
import { changedRenderedFields, checkContract, renderSnippet } from "../scripts/check-mcp-docs-contract.mjs";

const candidate = process.env.SENDMUX_SDK_CHECKOUT;
if (!candidate) throw new Error("SENDMUX_SDK_CHECKOUT must name the pinned SDK checkout used by fixture tests");
const checker = resolve("scripts/check-mcp-docs-contract.mjs");
const owned = ["scripts/check-mcp.mjs", "packages/python/mcp/pyproject.toml", "packages/python/mcp/server.json", "packages/python/mcp/qubrics/mcp/mcp-contract.json", "packages/ts/mcp/package.json"];
const readJson = (path) => JSON.parse(readFileSync(path, "utf8"));
const writeJson = (path, value) => writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
const fixtureRoots = new Set();
const published = JSON.parse(readFileSync(resolve("scripts/mcp-docs-publications.json"), "utf8"));
const registrySnapshot = readFileSync(resolve("scripts/mcp-docs-registry.json"));
const assertFixture = (root) => {
  assert.ok(fixtureRoots.has(root) && root.startsWith(`${resolve(tmpdir())}/mcp-docs-contract-`), "Git mutation must stay in an owned temporary fixture");
};

function commit(root, message) {
  assertFixture(root);
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync("git", ["-c", "user.name=Test", "-c", "user.email=test@example.com", "commit", "-qm", message], { cwd: root });
  return execFileSync("git", ["rev-parse", "HEAD"], { cwd: root, encoding: "utf8" }).trim();
}

function fixture(t, label) {
  const root = mkdtempSync(join(tmpdir(), `mcp-docs-contract-${label}-`));
  fixtureRoots.add(root);
  process.stderr.write(`# fixture-owned ${label} ${root}\n`);
  t.after(() => { rmSync(root, { recursive: true, force: true }); assert.equal(existsSync(root), false, `fixture absent: ${label}`); });
  for (const path of owned) { mkdirSync(dirname(join(root, path)), { recursive: true }); cpSync(join(candidate, path), join(root, path)); }
  assertFixture(root);
  execFileSync("git", ["init", "-q"], { cwd: root });
  return { root, pin: commit(root, "fixture") };
}

function docsFixture(t, label, pin, snippet, publications = published) {
  const root = mkdtempSync(join(tmpdir(), `mcp-docs-cli-${label}-`));
  process.stderr.write(`# fixture-owned cli-${label} ${root}\n`);
  t.after(() => { rmSync(root, { recursive: true, force: true }); assert.equal(existsSync(root), false, `CLI fixture absent: ${label}`); });
  mkdirSync(join(root, "scripts"), { recursive: true }); mkdirSync(join(root, "snippets"), { recursive: true });
  writeJson(join(root, "scripts/mcp-docs-sdk.json"), { commit: pin }); writeFileSync(join(root, "snippets/mcp-release-facts.mdx"), snippet);
  writeJson(join(root, "scripts/mcp-docs-publications.json"), publications);
  writeFileSync(join(root, "scripts/mcp-docs-registry.json"), registrySnapshot);
  return root;
}

function publicationsFor(root) {
  const facts = structuredClone(published);
  const { package: pkg } = readJson(join(root, owned[3]));
  const npm = readJson(join(root, owned[4]));
  Object.assign(facts.python, { identity: pkg.identity, version: pkg.version, sourceUrl: `https://pypi.org/pypi/${pkg.identity}/${pkg.version}/json` });
  Object.assign(facts.npm, { identity: npm.name, version: npm.version, sourceUrl: `https://registry.npmjs.org/${npm.name}/${npm.version}` });
  return facts;
}

const runCliArgs = (cwd, args, env = {}) => spawnSync(process.execPath, [checker, ...args], { cwd, encoding: "utf8", env: { ...process.env, ...env } });
const runCli = (cwd, sdkDir, mode) => runCliArgs(cwd, [mode, "--sdk", sdkDir]);

test("released Python facts stay independent of Registry bindings and hosted visibility", async (t) => {
  const sdk = fixture(t, "publications");
  const result = await checkContract({ sdkDir: sdk.root, pin: sdk.pin, publications: published });
  assert.equal(result.projection.identity, "qubrics-mcp");
  assert.equal(result.projection.version, "3.0.1");
  assert.equal(result.projection.npmVersion, "1.0.2");
  assert.equal(result.projection.registryVersion, "3.0.1");
  assert.equal(result.projection.registryPythonVersion, "3.0.1");
  assert.equal(result.projection.registryNpmVersion, "1.0.2");
  assert.equal(result.projection.resource, "https://mcp.qubrics.com/mcp");
  assert.equal(result.projection.toolCount, 130);
  const snippet = renderSnippet(result.projection);
  assert.match(snippet, /Local Python package/);
  assert.doesNotMatch(snippet, /Hosted tool count|Hosted transport|Certified protocol versions/);
});

test("published npm releases stay independent of PyPI and candidate Registry metadata", async (t) => {
  const sdk = fixture(t, "independent-versions");
  const before = await checkContract({ sdkDir: sdk.root, pin: sdk.pin });
  const npmPackage = readJson(join(sdk.root, owned[4]));
  const registry = readJson(join(sdk.root, owned[2]));
  assert.equal(before.projection.npmVersion, npmPackage.version);
  assert.equal(before.projection.registryVersion, registry.version);
  assert.equal(before.projection.version, before.contract.package.version);
  const bump = (value) => { const parts = value.split(".").map(Number); parts[2] += 1; return parts.join("."); };
  npmPackage.version = bump(npmPackage.version);
  registry.version = bump(registry.version);
  registry.packages.find((entry) => entry.registryType === "npm").version = npmPackage.version;
  writeJson(join(sdk.root, owned[4]), npmPackage);
  writeJson(join(sdk.root, owned[2]), registry);
  const pin = commit(sdk.root, "npm and candidate metadata release");
  const after = await checkContract({ sdkDir: sdk.root, pin, publications: publicationsFor(sdk.root) });
  assert.deepEqual(changedRenderedFields(renderSnippet(before.projection), renderSnippet(after.projection)), ["npm.version"]);
  assert.equal(after.projection.registryVersion, before.projection.registryVersion, "candidate metadata does not update the public Registry listing");
  assert.equal(after.projection.version, before.projection.version, "PyPI remains unchanged by npm and registry releases");
});

test("rejects unpublished or mismatched package facts at the public contract seam", async (t) => {
  for (const [label, mutate, error] of [
    ["unpublished-python", (root) => { coherentVersionChange(root); }, /published Python version/],
    ["unpublished-npm", (root) => { const npm = readJson(join(root, owned[4])); const version = npm.version.split(".").map(Number); version[2] += 1; npm.version = version.join("."); writeJson(join(root, owned[4]), npm); }, /published npm version/],
    ["python-identity", (_root, facts) => { facts.python.identity = "sendmux-mcp"; }, /published Python identity/],
    ["npm-release-url", (_root, facts) => { facts.npm.sourceUrl = "https://registry.npmjs.org/qubrics-mcp/1.0.1"; }, /npm sourceUrl/],
    ["python-release-url", (_root, facts) => { facts.python.sourceUrl = "https://pypi.org/pypi/qubrics-mcp/2.2.0/json"; }, /Python sourceUrl/],
  ]) {
    await t.test(label, async (t) => {
      const sdk = fixture(t, label); const facts = structuredClone(published); mutate(sdk.root, facts);
      const pin = label.startsWith("unpublished-") ? commit(sdk.root, label) : sdk.pin;
      await assert.rejects(checkContract({ sdkDir: sdk.root, pin, publications: facts }), error);
    });
  }
});

test("rejects tampered Registry snapshots and unqualified Registry bindings", async (t) => {
  for (const [label, mutate, rehash, error] of [
    ["tampered-bytes", (record) => { record.server.packages[0].version = "1.0.1"; }, false, /Registry snapshot SHA256/],
    ["wrong-binding", (record) => { record.server.packages.find((entry) => entry.registryType === "npm").version = "1.0.1"; }, true, /Registry npm binding/],
    ["missing-canonical-remote", (record) => { record.server.remotes = record.server.remotes.filter((entry) => entry.url !== "https://mcp.qubrics.com/mcp"); }, true, /Registry.*remote/],
    ["missing-legacy-remote", (record) => { record.server.remotes = record.server.remotes.filter((entry) => entry.url !== "https://mcp.sendmux.ai/mcp"); }, true, /Registry.*remote/],
    ["inactive-record", (record) => { record._meta["io.modelcontextprotocol.registry/official"].status = "deleted"; }, true, /Registry status must be active/],
    ["not-latest", (record) => { record._meta["io.modelcontextprotocol.registry/official"].isLatest = false; }, true, /Registry record must be latest/],
  ]) {
    await t.test(label, async (t) => {
      const sdk = fixture(t, label); const record = JSON.parse(registrySnapshot); mutate(record);
      const snapshot = Buffer.from(`${JSON.stringify(record)}\n`); const facts = structuredClone(published);
      if (rehash) facts.registry.snapshotSha256 = createHash("sha256").update(snapshot).digest("hex");
      await assert.rejects(checkContract({ sdkDir: sdk.root, pin: sdk.pin, publications: facts, registrySnapshot: snapshot }), error);
    });
  }
});

test("public CLI rejects tampered Registry provenance before writing", async (t) => {
  const sdk = fixture(t, "cli-registry-tamper"); const sentinel = "STALE_SENTINEL\n";
  const docs = docsFixture(t, "registry-tamper", sdk.pin, sentinel);
  writeFileSync(join(docs, "scripts/mcp-docs-registry.json"), `${registrySnapshot}\n`);
  const run = runCli(docs, sdk.root, "--write");
  assert.notEqual(run.status, 0);
  assert.match(run.stderr, /Registry snapshot SHA256/);
  assert.equal(readFileSync(join(docs, "snippets/mcp-release-facts.mdx"), "utf8"), sentinel);
});

function coherentVersionChange(root, version) {
  const contractPath = join(root, owned[3]); const contract = readJson(contractPath);
  if (!version) { const parts = contract.package.version.split(".").map(Number); parts[2] += 1; version = parts.join("."); }
  contract.package.version = version; writeJson(contractPath, contract);
  const pyproject = join(root, owned[1]); writeFileSync(pyproject, readFileSync(pyproject, "utf8").replace(/version = "[^"]+"/, `version = "${contract.package.version}"`));
  const registryPath = join(root, owned[2]); const registry = readJson(registryPath); registry.packages.find((entry) => entry.registryType === "pypi" && entry.identifier === contract.package.identity).version = contract.package.version; writeJson(registryPath, registry);
  return contract;
}

test("public CLI enforces config pin and fixed snippet path", async (t) => {
  const sdk = fixture(t, "cli-pin"); const baseline = renderSnippet((await checkContract({ sdkDir: sdk.root, pin: sdk.pin })).projection); const docs = docsFixture(t, "pin", sdk.pin, baseline);
  assert.equal(runCli(docs, sdk.root, "--check").status, 0);
  assert.notEqual(spawnSync(process.execPath, [checker, "--check", "--sdk", sdk.root, "--pin", sdk.pin], { cwd: docs }).status, 0);
  writeJson(join(docs, "scripts/mcp-docs-sdk.json"), { commit: "main" }); assert.match(runCli(docs, sdk.root, "--check").stderr, /40-character/);
  writeJson(join(docs, "scripts/mcp-docs-sdk.json"), {}); assert.match(runCli(docs, sdk.root, "--check").stderr, /40-character/);
});

test("public CLI rejects malformed invocations before writing the fixed snippet", async (t) => {
  const sdk = fixture(t, "cli-arguments"); const sentinel = "STALE_SENTINEL\n";
  for (const [label, args, error] of [
    ["unknown-option", ["--write", "--sdk", sdk.root, "--unknown"], /Unknown option|Usage:/],
    ["missing-sdk-value", ["--write", "--sdk"], /argument missing|Usage:/],
    ["simultaneous-modes", ["--check", "--write", "--sdk", sdk.root], /exactly one|Usage:/],
  ]) {
    await t.test(label, (t) => {
      const docs = docsFixture(t, label, sdk.pin, sentinel);
      const run = runCliArgs(docs, args, { SENDMUX_SDK_CHECKOUT: "" });
      assert.equal(readFileSync(join(docs, "snippets/mcp-release-facts.mdx"), "utf8"), sentinel, `${label}: malformed invocation must not write the snippet`);
      assert.notEqual(run.status, 0, `${label}: malformed invocation must fail`);
      assert.match(run.stderr, error);
    });
  }
});

test("public CLI supports healthy write, check, and SDK environment fallback", async (t) => {
  const sdk = fixture(t, "cli-healthy"); const baseline = renderSnippet((await checkContract({ sdkDir: sdk.root, pin: sdk.pin })).projection); const docs = docsFixture(t, "healthy", sdk.pin, "STALE_SENTINEL\n");
  const write = runCli(docs, sdk.root, "--write"); assert.equal(write.status, 0, write.stderr); assert.equal(readFileSync(join(docs, "snippets/mcp-release-facts.mdx"), "utf8"), baseline);
  const check = runCli(docs, sdk.root, "--check"); assert.equal(check.status, 0, check.stderr);
  const environmentCheck = runCliArgs(docs, ["--check"], { SENDMUX_SDK_CHECKOUT: sdk.root }); assert.equal(environmentCheck.status, 0, environmentCheck.stderr);
});

test("trust boundary rejects malformed, wrong-head, missing-input, changed-blob, and jointly changed inputs", async (t) => {
  const sdk = fixture(t, "trust"); await assert.rejects(checkContract({ sdkDir: sdk.root, pin: "main" }), /40-character/); await assert.rejects(checkContract({ sdkDir: sdk.root, pin: "0".repeat(40) }), /resolves to/);
  const missing = fixture(t, "missing"); rmSync(join(missing.root, owned[3])); await assert.rejects(checkContract({ sdkDir: missing.root, pin: missing.pin }), /ENOENT|no such file/i);
  const changed = fixture(t, "changed"); writeFileSync(join(changed.root, owned[3]), `${readFileSync(join(changed.root, owned[3]), "utf8")}\n`); await assert.rejects(checkContract({ sdkDir: changed.root, pin: changed.pin }), /differs from pinned Git blob/);
  const joint = fixture(t, "mutant-no-git-blob-check"); coherentVersionChange(joint.root); assert.equal(readJson(join(joint.root, owned[3])).package.version, readJson(join(joint.root, owned[2])).packages.find((entry) => entry.registryType === "pypi").version, "RED mutant/no-git-blob-check accepts coherent uncommitted inputs"); await assert.rejects(checkContract({ sdkDir: joint.root, pin: joint.pin }), /differs from pinned Git blob/, "GREEN Git-blob check rejects mutant fixture");
});

test("private and unrelated committed changes do not affect projection", async (t) => {
  const sdk = fixture(t, "privacy"); const baseline = renderSnippet((await checkContract({ sdkDir: sdk.root, pin: sdk.pin })).projection);
  const contractPath = join(sdk.root, owned[3]); const contract = readJson(contractPath); contract.provenance = { marker: "PRIVATE_PROVENANCE_MARKER" }; contract.unrelated_fixture = "UNRELATED_SCHEMA_MARKER"; writeJson(contractPath, contract);
  const registryPath = join(sdk.root, owned[2]); const registry = readJson(registryPath); registry.websiteUrl = "https://REGISTRY-MARKER.invalid"; writeJson(registryPath, registry);
  const pin = commit(sdk.root, "private markers"); assert.equal(renderSnippet((await checkContract({ sdkDir: sdk.root, pin })).projection), baseline);
});

test("field-specific drift reports version, protocol sets, and count independently", async (t) => {
  for (const field of ["package.version", "protocols", "runtime_protocols", "tools.count"]) {
    const sdk = fixture(t, field.replaceAll(".", "-")); const before = await checkContract({ sdkDir: sdk.root, pin: sdk.pin }); const oldSnippet = renderSnippet(before.projection); let contract = readJson(join(sdk.root, owned[3]));
    if (field === "package.version") contract = coherentVersionChange(sdk.root);
    const next = new Date(`${contract.runtime_protocols.at(-1)}T00:00:00Z`); next.setUTCDate(next.getUTCDate() + 1); const date = next.toISOString().slice(0, 10);
    if (field === "protocols") { contract.protocols.push(date); contract.runtime_protocols.push(date); }
    if (field === "runtime_protocols") contract.runtime_protocols.push(date);
    if (field === "tools.count") { contract.tools.by_surface.mailbox.push({ ...structuredClone(contract.tools.by_surface.mailbox[0]), name: "fixture_future_tool" }); contract.tools.count += 1; }
    writeJson(join(sdk.root, owned[3]), contract); const pin = commit(sdk.root, field); const facts = publicationsFor(sdk.root); const current = renderSnippet((await checkContract({ sdkDir: sdk.root, pin, publications: facts })).projection); const expected = field === "protocols" ? ["protocols", "runtime_protocols"] : [field]; assert.deepEqual(changedRenderedFields(oldSnippet, current), expected);
    const docs = docsFixture(t, `drift-${field.replaceAll(".", "-")}`, pin, oldSnippet, facts); const run = runCli(docs, sdk.root, "--check"); assert.notEqual(run.status, 0); assert.match(run.stderr, new RegExp(`changed fields: ${expected.join(", ")}$`, "m"));
  }
});

test("rejects coherently malformed SemVer package versions", async (t) => {
  for (const [label, version] of [["leading-zero-core", "01.2.3"], ["empty-prerelease-identifier", "1.2.3-alpha..1"], ["numeric-prerelease-leading-zero", "1.2.3-01"]]) {
    await t.test(label, async (t) => {
      const sdk = fixture(t, `semver-${label}`); coherentVersionChange(sdk.root, version); const pin = commit(sdk.root, label);
      await assert.rejects(checkContract({ sdkDir: sdk.root, pin }), /valid SemVer 2\.0\.0/);
    });
  }
});

test("accepts ordinary, future, prerelease, and build SemVer forms", async (t) => {
  for (const version of ["2.0.0", "3.1.4-alpha.1", "3.1.4+build.01", "3.1.4-rc.1+build.5"]) {
    await t.test(version, async (t) => {
      const sdk = fixture(t, `semver-valid-${version.replaceAll(/[^0-9A-Za-z]+/g, "-")}`); coherentVersionChange(sdk.root, version); const pin = commit(sdk.root, version);
      assert.equal((await checkContract({ sdkDir: sdk.root, pin, publications: publicationsFor(sdk.root) })).contract.package.version, version);
    });
  }
});

test("rejects drift in documented upload limits and Mailbox modes", async (t) => {
  for (const [label, mutate, error] of [
    ["inline-cap", (uploads) => { uploads.inline_decoded_max_bytes = 65536; }, /inline_decoded_max_bytes.*32768/],
    ["mailbox-cap", (uploads) => { uploads.mailbox.presigned_max_bytes = 8000000; uploads.mailbox.request_schema_max_bytes = 8000000; }, /mailbox upload limits.*7500000/],
    ["mailbox-modes", (uploads) => { uploads.mailbox.modes = ["presign_upload_url"]; }, /mailbox modes.*content_base64.*presign_upload_url/],
  ]) {
    await t.test(label, async (t) => {
      const sdk = fixture(t, `uploads-${label}`); const path = join(sdk.root, owned[3]); const contract = readJson(path); mutate(contract.uploads); writeJson(path, contract); const pin = commit(sdk.root, label);
      await assert.rejects(checkContract({ sdkDir: sdk.root, pin }), error);
    });
  }
});

test("validates protocol dates, subsets, and tool count", async (t) => {
  for (const [label, mutate, error] of [["empty", (c) => { c.protocols = []; }, /non-empty/], ["duplicate", (c) => { c.runtime_protocols.push(c.runtime_protocols[0]); }, /unique/], ["invalid-date", (c) => { c.protocols[0] = "2027-02-30"; }, /real ISO dates/], ["subset", (c) => { c.protocols = ["2099-01-01"]; }, /accepted at runtime/], ["count", (c) => { c.tools.count += 1; }, /must equal/]]) {
    const sdk = fixture(t, label); const path = join(sdk.root, owned[3]); const contract = readJson(path); mutate(contract); writeJson(path, contract); const pin = commit(sdk.root, label); await assert.rejects(checkContract({ sdkDir: sdk.root, pin }), error);
  }
});
