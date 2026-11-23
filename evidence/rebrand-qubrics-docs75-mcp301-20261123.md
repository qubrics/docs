# Consume final public MCP and Registry facts

Status: branch/PR preparation for docs#75. No new docs or package publication is claimed. Base `0710afc2ef5a470f83056067579f5baad40fe370`; docs remote is `qubrics/docs`.

## Accepted producer facts reused

SDK344 handed off public npm `sendmux-mcp@1.0.2`, PyPI `qubrics-mcp==3.0.1` and Registry `io.github.qubrics/qubrics-mcp` `3.0.1`. Exact/latest Registry reads are active/isLatest; operator run45092377467 succeeded. Immutable producer is `python-mcp-v3.0.1` at `551d3e46934c2f605a25ccc0ea072f61c8ed2a2e`.

Existing receipts, read without repeating producer proofs or publication: SDK MAIN `.claude/tasks/rebrand-qubrics-sdk344/{a17-owner-handoff,registry301-public,pypi301-public,npm102-public}-20261123.md`.

- npm2,141 B; SHA256 `80e3001a668d8088442f7cefa94b59ee40db15b1c8c127fae23187316df1e612`.
- Wheel231,057 B; SHA256 `d61e9fd5594e4e7f5f65a83ed0d3e055136b610b003ac77ba5b23a39cef97934`.
- Sdist212,767 B; SHA256 `c7b3623498e3a6532c9b0e71e55d16fa24eb4f4f4ac4808ce2ccdd17673dc714`.
- Tagged descriptor2,230 B; SHA256 `2fc539be433962e3f5eeafdf39bdfeba63a43cd60ccbfd2e21121af467f7d9ef`.

`scripts/mcp-docs-registry.json` is the exact response object from the accepted producer's `registry301-public-20261123/registry-readback-proof.json.exact`, serialised as compact JSON plus LF. Its independent snapshot SHA256 is `15ffe0c3c667e2b14f04dff98e6e4b15d74b172b5b2a93177fed820ed424b7bd`; it is not the descriptor hash or a claim about raw HTTP byte formatting. Publication provenance records the capture source URLs and qualification; `verifiedAt` is this consumer's receipt-consumption time. Hosted discovery retains its earlier qualified observation; no fresh authenticated/unauthenticated hosted call is claimed.

## Consumer changes and preservation

Canonical per spec A17/A18 and the accepted release receipts: qualify local/native package facts separately from the captured public Registry record and observed hosted discovery. Existing pinned Git-blob checks, publication/ownership checks, snapshot hash, active/latest checks, exact bindings, SemVer, protocol/date/count and attachment-limit protections remain.

- Update the SDK pin to551d3e46 and public provenance to Python3.0.1/npm1.0.2/new Registry3.0.1. Registry bindings are PyPI `qubrics-mcp`3.0.1 and npm `sendmux-mcp`1.0.2.
- Retain strict exact remote-set validation, now for both published `https://mcp.qubrics.com/mcp` and `https://mcp.sendmux.ai/mcp`. No wildcard, threshold or ignored field replaces the assertion.
- Canonically regenerate the existing release snippet with `npm run mcp-docs:emit`; no hand edit.
- Update26 pinned canonical Python install lines, both npm invocation/config values and the canonical version-table row. This is27 rendered pages /28 MDX files including the shared snippet;35 changed source lines /36 exact literal-field substitutions.
- Keep PyPI pointer `sendmux-mcp`3.0.0, real npm executable name and fixed legacy bridge endpoint, A17 tool/env/header/message aliases, search tool name, SEO/destinations, generated OpenAPI contracts and every hosted qualification exact. No navigation or announcement change; docs changelog remains the sole move announcement.

Independent source audit classified all214 old-name occurrences in the0710 baseline. The exact-transform check proves every other MDX byte unchanged after these authorised substitutions; final source count is211 protected/history/compatibility/destination occurrences. No other ordinary copy or new-setup hostname defect remains in that source audit. Raw census/27 proof slugs: docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/MCP301-CORPUS-AUDIT-20261123.md`; final transform: `MCP301-PRESERVATION-20261123.json`.

Placement: keep existing MCP clients/framework guides and SDK version table, with unchanged reader tasks, navigation and ordering. Polish pass skipped: exact technical-token/metadata/generated-artifact corrections. No new prose or styling.

## Checks

The existing public contract scenario first failed at the old one-remote assertion: `AssertionError [ERR_ASSERTION]: Registry must retain its verified legacy remote`, showing the newly published canonical remote was rejected. The exact published pair fixes that origin.

New missing-canonical and missing-legacy cases each failed with `Missing expected rejection.` when the remote guard was temporarily removed for a controlled mutation check. The guard was immediately restored. Final focused suite:39/39 passed, zero failed/skipped. No tests removed or weakened. The unpublished-npm fixture now increments its actual version so publication1.0.2 cannot turn the negative case into a no-op; the wrong-binding fixture selects npm explicitly.

`mcp-docs:emit`, `mcp-docs:check`, confidentiality, external-link safety, Mintlify build/validation, broken-link check and whitespace checks pass. Required CI owns the remaining full tooling suite; no unchanged full local run or SDK install repeated. Native MDX structure and generated accordion structure remain exact apart from qualified literals; no dev server/browser preview was started.

Logs under docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/`: `MCP301-{REMOTE-RED,NEGATIVE-MUTANT-RED,FOCUSED-GREEN,EMIT,DRIFT,CONFIDENTIALITY,EXTERNAL-LINKS,MINT-VALIDATE,MINT-LINKS}-20261123.log`. Only the consumer tests/checks ran; no package/Registry proof, upload, dispatch, tag or provider action was repeated.

## A17 credit and remaining goal

Existing config-precedence/tool-equivalence evidence remains904-owned: [published configuration consumers](https://github.com/qubrics/qubrics/blob/a88685791b7bf3c17d1d8d172b771ae9f00c0f4d/evidence/rebrand-qubrics-904-acceptance-20261123.md#published-configuration-consumers) and [hosted paired-call proof](https://github.com/qubrics/qubrics/issues/904#issuecomment-6979023352). Local catalogue/startup does not certify authenticated hosted tools.

Docs-owned compatibility/publication receipts are PR105's `PR105-PUBLICATION-RECEIPT-20261122.md`, PR106's `PR106-PUBLICATION-RECEIPT-20261123.md` and PR107's `PR107-PUBLICATION-RECEIPT-20261123.md` under the same docs MAIN artifacts. Credit handed back through `MCP301-A17-CREDIT-20261123.md`; no #1041 body edit, LangChain ask/call or new native release ask.

All external publication prerequisites are now supplied. Remaining docs75 work: green consumer PR, separate Ops merge/native-publish GO,27 changed-page/54 native-public full-section proofs plus exports/aliases/health and final acceptance credit. Named rollback for that future window: revert its normal merge (mainline1) and native republish to then-current main/native, currently0710afc2/7986814260; re-read before ASK. Source preparation alone does not tick #75's two remaining boxes or close #75/#901. No support watch, DNS/CNAME/domain/routing/Worker/provider or Registry mutation authorised by this evidence.
