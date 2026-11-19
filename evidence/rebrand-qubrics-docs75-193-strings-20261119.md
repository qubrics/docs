# SITE193 ordinary-source corrections

Goal: repair the exact F1–F8 findings in SITE901 `final-gates-20261119/193-STRINGS.md`, preserve its narrow P1–P12 contracts/release facts, and supply published changed-page readbacks after an approved docs window. This PR is source preparation; no publication or whole-ticket completion is claimed.

## Already shipped: F1–F5

Docs PR87 normal merge `341b9a65b192b54c5ca5511cf14df6d428cf327d` published through native deployment `7904535319` at 15:57:58 AEDT, 19 November2026. Its six ordinary Sending OpenAPI display/example values and two emitted Postman descriptions are proven live; main CI44461841805 passed49/49 with zero skipped. Public OpenAPI/collection JSON equals that approved source exactly. Receipt: docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/SDK-FACTS-PUBLICATION-RECEIPT-20261119.md`.

## This PR: F6–F8

- F6: change three webhook schema callback examples from `https://hooks.acme.com/sendmux` to `https://hooks.example.com/qubrics` in `openapi-app.json`. Callback demo data is customer-selected example content, not a compatibility endpoint.
- F7: change only five sample-local MCP client configuration labels: three `sendmux-docs` → `qubrics-docs`, `mcp_servers.sendmux_docs` → `mcp_servers.qubrics_docs`, and local JSON server key `sendmux` → `qubrics`. Keep real `search_sendmux`, `sendmux-mcp`, all executable/package identities and protected release facts.
- F8: change only the five primary Sending snapshot URLs to `smtp.qubrics.com` or `app.qubrics.com`, preserving paths: attachment-upload example, OAuth authorization/token/refresh URLs, and advertised API server. Keep OAuth resource `https://sendmux.ai/api` and every A17 alias/ID exact. No runtime hostname configuration, provider registration or alias removal.

Canonical per spec A5/A9/A17–A19 and the operator-supplied F1–F8 packet: display/local example labels and primary advertised hosts use Qubrics; exact wire/tool/package/resource identities remain truthful. No invented package name/version or new announcement. Keep the existing MCP page at AI integrations > MCP and generated endpoint content in API reference; no navigation change.

## Origin fixed alongside mirrors

The docs instructions require producer-owned snapshots, not a mirror-only fix:

- App producer PR1043: https://github.com/qubrics/qubrics/pull/1043, head `35690b11c487fc1669480fee03d689bab674624a`. Exactly two schema-source example values and their three generated snapshot examples change. Base `0498064c429ebbacc632d061b0e9b1710d123dd4`. Producer `pnpm check:fast`, `spec:check`, commit and push gates pass; native CI44463317698 owns the remaining qualification. No app merge/build/deploy inferred.
- Sending producer candidate `3d9bee97fa96ee7d2ecbdf479b1a2e44c684e6e8`, branch `agent/rebrand-qubrics-docs75-193-strings`, covers six F1–F5 display leaves, five F8 advertised URL leaves and the same ordinary F3 OAuth `resource_name`. Existing four metadata expectations updated against the packet; focused tests and check:fast pass (11 suites/63 tests). Runtime origin/attachment-service configuration and OAuth resource/audience/server contracts unchanged. Source commit precedes this docs commit, and native source CI resolves this matching docs branch.

Entire parsed docs App and Sending snapshots equal the corrected producers' emitted snapshots, not merely selected values. Native comparison output `193-strings-producer-parity.log` records zero differences. Producer emissions: app worktree `sendmux-rebrand-qubrics-docs75-f6/openapi/openapi-app.json`; SMTP MAIN artifacts `rebrand-qubrics-docs75-193/openapi-sending.json`. Source merges/deployments remain separate gates; do not claim the producing live services have changed from these source PRs alone.

## Preservation and checks

Recursive comparison against docs base341b9a65 proves exactly three App and five Sending JSON leaves changed, only the prescribed URLs. Every other JSON structure/value is identical. Whole-file MCP comparison proves only the five specified local labels change. Protected MCP pin/facts have zero diff. Output: docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/193-strings-preservation.log`.

`npm run postman:emit` ran canonically; all three generated collections remain byte-identical. `npm run postman:check` passes. No collection hand edits or gratuitous generated-file commit.

Existing local gates exit0: confidentiality, external links, Postman drift, Mint validation, broken links and whitespace. Logs: `193-strings-{confidentiality,external-links,postman-emit,postman-check,mint-validate,mint-links}.log` under that MAIN artifact directory. Full tooling/contract tests run through normal PR CI; no new test/harness/dependency.

Preview port61076: MCP, generated webhook-create and generated Sending single-email routes all HTTP200. Chrome Agent renders the five new configuration labels while retaining `search_sendmux` and real `sendmux-mcp` commands. No page errors. Browser/native HTML receipts: `193-strings-preview-{browser,code}.log` and `193-strings-preview-*.{headers,html}`. Owned tab closed, exact process group stopped, listener/cache absent; only owned `~/.mintlify/previews/61076-beta` removed.

Polish pass skipped: prescribed exact technical-token/code/metadata corrections and generated artifacts, under docs-authoring-workflow §4. Prose meaning, qualifications, code structure, frontmatter and navigation unchanged. No release announcement beyond the existing approved docs changelog.

## Publication gate and readback plan

Normal green PR first; separate docs75 merge/native-publication ASK with rollback **revert the resulting normal merge using mainline parent1**, retaining unrelated main. Pre-change docs main is PR87 merge341b9a65, successful deployment7904535319. Native publish completes before judging page content; harm means main or `/docs` non200, or wrong published pages, then revert without retry.

After GO, read the MCP page, three webhook example surfaces and seven Sending endpoint surfaces named in the F1–F8 packet on canonical docs, plus old-host redirect paths. Require200, new labels/examples/primary hosts, and all exact P1–P12 exceptions retained. Read published snapshots, compare to approved source, and recheck main/docs, exports, sitemap and redirects. Supply changed-page receipts to Ops for901's independent verification; no #193 closure on source/CI alone.

Read-only T-47269 approximately15-minute poll continues; latest16:01:06AEDT GET200/TODO/no reply. Never Re-verify. No DNS, custom-domain, hostname, registry, provider, app/SMTP deployment or support-send write. Remaining native Mintlify activation/expiry and separately held package releases remain explicit whole-ticket holds.
