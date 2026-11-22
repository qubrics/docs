# Separate released MCP package facts from Registry and hosted facts

Status: source candidate for docs#75; merge and native publication require Ops GO.
Base: `d17eea3848578ec0bdefc10c42dda36b6a372872`, origin `qubrics/docs`.

## Cause and scope

The old single SDK projection coupled local package, npm, Registry and hosted
claims. Its old pin rendered PyPI 2.1.3, npm 1.0.0, Registry 2.1.4 and the old
host as one release. Ops decided A on 22 November: separate independently
measured facts rather than retain stale customer copy.

Canonical: rebrand spec A17/A18 (`qubrics/qubrics`,
`specs/rebrand-qubrics/spec.md:30-31`) preserves compatibility names while
documenting the released Qubrics package. The consumer still verifies exact
pinned Git blobs, versions, dates, tool totals and attachment limits. It now
checks package publication facts separately from a hash-bound Registry response
and observed hosted authentication discovery. No new network operation runs
in the build-time checker or per docs view.

The same obsolete local package/console names appeared in 26 client/framework
pages. Those pages receive 94 exact technical-token corrections, including 23
install lines pinned to `qubrics-mcp==3.0.0`. Eight old SEO keywords remain, each
beside the canonical keyword. An exact-transform assertion proved every other
byte unchanged in that mechanical pass: tool IDs, environment names, headers,
aliases and framework dependency installs are preserved. Review then identified
missing install prerequisites in the GitHub Copilot coding-agent page and its
LM Studio sibling. Both now install the same pinned package before starting the
server, with the existing upgrade-safety snippet. The MCP overview and
package-version table consume the same verified facts.

## Measured sources

Public reads on 22 November 06:53:32–06:57:30 UTC:

- PyPI `qubrics-mcp` and compatibility `sendmux-mcp` 3.0.0: HTTP 200,
  unyanked. Downloaded wheel hashes match public metadata. Canonical import
  namespace is `qubrics.mcp`; local API defaults are `app.qubrics.com` and
  `smtp.qubrics.com`.
- npm `sendmux-mcp` 1.0.1: HTTP 200; downloaded tarball matches integrity
  fields. This bridge fixes its destination to `https://mcp.sendmux.ai/mcp`
  and accepts no connection arguments. npm `qubrics-mcp` returned HTTP 404;
  no new npm name is invented or recommended.
- Existing Registry ID `io.github.Sendmux/sendmux-mcp` 2.2.0: HTTP 200,
  active/latest. Its independent bindings remain PyPI `sendmux-mcp` 2.2.0
  and npm `sendmux-mcp` 1.0.0. The exact public response is committed as
  `scripts/mcp-docs-registry.json`, SHA256
  `d4c81d24a18cf20024c1021b1a74023773c80e558902a3c8893df74cd6331e12`.
- Hosted `https://mcp.qubrics.com/mcp`: unauthenticated initialize HTTP 401;
  advertised resource metadata HTTP 200, canonical resource and both measured
  authorisation servers. These reads do not qualify authenticated tools,
  protocol negotiation or certification. The local artifact declares 130
  tools; the snippet explicitly scopes this declaration to the local package.

Owning SDK source pin: `5fbe78d9f6f60efb531b32c58576144e0c0f65a4`.
Raw requests, public archives and source inspection details:
MAIN `.claude/artifacts/rebrand-qubrics-docs75/mcp-public-facts-20261122/`.
`measured-facts.md` distinguishes artifact declarations from hosted observations.

## Verification

- Focused `node --test tests/mcp-docs-contract.test.mjs`: 37 passed,
  zero failed/skipped. `--write` and `--check` exited 0 against
  `.tmp/mcp-docs-sdk` at the exact pin above.
- New negative provenance cases first failed with
  `AssertionError [ERR_ASSERTION]: Missing expected rejection.` before the
  validators, then passed. Existing pin/blob, SemVer, protocol/date/count,
  upload and public CLI protections remain. No tests removed or skipped.
- `npm run confidentiality:check`, `npm run external-links:check`,
  `mint validate`, `mint broken-links` and `git diff --check`: exit 0.
  Full tooling suite belongs to PR CI, not a repeated local full run.
- Native local preview: MCP overview, version table, Codex client and Google
  ADK framework pages return 200 and render the intended package/console
  tokens. Local and Registry accordions expand with distinct facts. After the
  prerequisite review fix, GitHub Copilot coding-agent and LM Studio pages also
  return 200 and render the install before the console command; their changed
  MDX imports pass native validation, link and confidentiality checks.
  A same-call accessibility snapshot raced the accordion's fragment navigation;
  Playwriter `executor.js:1005` rejects a changed document generation.
  Separate action/read calls prove the opened content and unchanged base URL.
  A final instrumented reload returned 200, no failed responses or console errors.

Logs: MAIN `.claude/artifacts/rebrand-qubrics-docs75/mcp-guard-*`,
`mcp-{confidentiality,external-links,mint-validate,mint-broken-links}-20261122.log`
and `mcp-preview-*-20261122.log`.

## Authoring and limits

Placement: keep existing MCP overview/client/framework setup and SDK versioning
pages. No navigation, grouping or ordering change. New prose passed a fresh
reader critique, one humanize pass and protected-set review. The bridge's
measured destination is explicit; semicolon changed to a full stop. Other
consumer edits are exact technical-token corrections, exempt from prose polish.
Protected factual qualifications, technical tokens and structure are preserved.

No merge, production publication, Registry/provider/DNS/domain/Worker write,
vendor send, support-watch restart, package upload or authenticated tool call.
Go v4 remains SDK344-owned and held. Original docs#75 acceptance stays 2/4;
docs#75 and qubrics#901 stay open. Production proof and rollback anchor belong
to the subsequent merge/native-publish ASK.
