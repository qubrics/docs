# Released SDK facts and Sending API display copy

Goal: consume measured public SDK versions and fix ordinary Sending API branding for docs#75 and SITE#193, preserving A17/A18 compatibility contracts. This slice is prepared for PR review; merge and docs publication require a separate Ops ASK. Whole docs#75 remains open.

## Scope and placement

Keep Guides > Developer tools > SDKs: overview, Python, Ruby, then Versioning and support. The reader installs a published surface package and uses its matching import or namespace. Existing navigation, credential qualifications and related links remain in place. No new announcement or banner; the existing docs changelog remains the sole rename announcement.

Canonical per `specs/rebrand-qubrics/spec.md:30-31` in qubrics/qubrics: preserve A17 wire identifiers; consume A18 package names only after their actual public release. Old distribution names are dependency-only pointers, not old import bridges. A new package release does not qualify other packages or MCP.

## Measured package facts

Fresh public metadata captured at 2026-11-19T04:41:57Z lists these eleven released distribution versions. Public byte comparisons and isolated installs/imports already passed in the producer receipts; no duplicate installations were run here.

| Registry | Qualified versions |
| --- | --- |
| PyPI | qubrics-core / sendmux-core 2.0.0; qubrics-sending / sendmux-sending 2.0.0; qubrics-mailbox / sendmux-mailbox 3.0.0; qubrics-management / sendmux-management 3.0.0 |
| RubyGems | qubrics-core / sendmux-core 2.0.0; qubrics-management 3.0.0 |

Python uses `qubrics.core`, `qubrics.sending`, `qubrics.mailbox` and `qubrics.management`. Sending defaults to `https://smtp.qubrics.com/api/v1`; Mailbox and Management default to `https://app.qubrics.com/api/v1`. The released Python pointer distributions provide no old import modules.

Ruby Management 3.0.0 uses `qubrics/management`, `Qubrics::Management` and Qubrics Core 2.0.0, defaulting to `https://app.qubrics.com/api/v1`. Existing released Sending 1.5.0 and Mailbox 2.0.2 retain their verified `Sendmux` namespaces and old default hosts. Their commands are pinned so they are not confused with the independently released native Management gem. The Ruby Core pointer provides no legacy require bridge. No unpublished Ruby replacements, umbrella, Go or MCP release is claimed.

Producer receipts under `/Users/rj/Desktop/GIT-REPOS/sendmux-sdk/.claude/tasks/rebrand-qubrics-sdk344/`:

- `sending-public-20261111.md`, `sendmux-sending-pointer-public-20261118.md`.
- `qubrics-mailbox-public-20261119.md:12`, `sendmux-mailbox-pointer-public-20261119.md`.
- `management-public-20261119.md:48`, `management-pointer-public-20261119.md:26`.
- `ruby-core-public-20261119.md`, `ruby-core-pointer-public-20261119.md:23`, `ruby-management-public-20261119.md:22`.

Raw registry metadata and downloaded legacy Ruby gems are retained in docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/`: `sdk-facts-public-metadata-20261119.json`, `sendmux-sending-1.5.0.gem`, `sendmux-mailbox-2.0.2.gem`. Legacy gem sources confirm the client namespaces/defaults used here.

## OpenAPI and PR78 compatibility

SITE MAIN `.claude/artifacts/rebrand-qubrics-901/remaining-acceptance-20261119/DONE.md:21` identifies ordinary Sending API copy for repair. Exactly six OpenAPI values change only `Sendmux` to `Qubrics`: `openapi-sending.json:517,782,813,814,964,1807`. Alongside the cited descriptions, the same ordinary branding occurs in the public OpenAPI endpoint description and an email subject example. Neither is a compatibility identifier. `npm run postman:emit` produces exactly two description-value changes at `postman/sendmux-sending.postman_collection.json:15,226`.

Independent recursive comparison against docs main `abdfa0f6123929423981432bfa8e00ab56d04cdc` confirms every other parsed JSON value is identical, including headers, auth, schema constraints, operation IDs, hosts, versions and compatibility identifiers. Native comparison output: `sdk-facts-json-preservation.log`. No collection hand edits. `scripts/mcp-docs-sdk.json` and `snippets/mcp-release-facts.mdx` have zero diff.

PR78 remains open at `944a2a2c305dbdad5d687dbf0ee050556e9611e2`. It overlaps the Python/Ruby guides, Sending snapshot and generated Sending collection. Its broader compatibility/source changes are already present on current main where previously consumed; this slice does not transplant PR78 or clear its separate protected MCP/producer publication gate. New SDK facts are limited to the exact released versions above.

## Verification and review

All commands below exited 0 on this branch; their native output is retained under docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/`:

- `npm run confidentiality:check`: `sdk-facts-confidentiality.log`.
- `npm run external-links:check`: `sdk-facts-external-links.log`.
- `npm run postman:emit` and `npm run postman:check`: `sdk-facts-postman-{emit,check}.log`.
- `mint validate`, `mint broken-links`: `sdk-facts-mint-{validate,links}.log`.
- `git diff --check`; protected MCP files have no diff.

Local preview on port 61075 returned HTTP200 for all four existing SDK routes. Chrome Agent rendered the Python and Ruby guides and their Management tabs, showing the exact install lines and native clients. No page errors were reported. Raw rendered HTML and `sdk-facts-browser-preview.log` retain the output. The overview's `/index` route is the existing canonical page; a trailing-directory probe returned its expected 307 before the `/index` GET returned 200. Owned preview tab closed, exact process group stopped, listener absent; only the owned `~/.mintlify/previews/61075-beta` build cache removed and verified absent.

No new logic, test, harness, dependency or fixture was added. Full tooling tests and protected MCP qualification run in the repository's normal PR CI. Local fast gate is composed from existing confidentiality, external-link and Postman scripts; this repo has no `check:fast` command.

Spec review: zero remaining findings; exact public facts and A17/A18 preservation checked. Standards review: zero findings. Fresh copy critique corrected the Ruby OAuth sentence to include all three supported surfaces. One humanize pass applied to new prose; protected code, versions, namespaces, headings, tables, credentials, scopes, URLs and factual qualifications preserved. Exact OpenAPI token corrections and generated Postman output are exempt from prose polish. Critique: `sdk-facts-copy-critique-20261119.md`.

## Holds and rollback

No docs merge/publication, SDK registry write, DNS, hostname or Mintlify configuration change occurred. Native Mintlify activation/expiry remains pending on T-47269; last read 15:46:12 AEDT returned HTTP200, TODO, no reply after the urgent 09:53 message. Read-only approximately 15-minute poll continues; never Re-verify. Vendor advice requires its own ASK.

For a future approved normal merge, rollback is revert that PR's merge commit, retaining unrelated main changes, then verify the native docs publication. Captured previous docs main is `abdfa0f6123929423981432bfa8e00ab56d04cdc`, deployment `7876846672`. Public readbacks must verify these four SDK pages and Sending API copy on both docs hosts. Worker export changes remain a separate, already shipped slice and are untouched here.

Remaining whole-ticket owners: docs75 for native Mintlify support/activation and this publication ASK; sdk344 for each remaining qualified package publication; PR78 owner for its protected MCP/producer gates; operator/provider owner for retained Google/Microsoft picker naming disposition. No silent release or acceptance-completion claim.
