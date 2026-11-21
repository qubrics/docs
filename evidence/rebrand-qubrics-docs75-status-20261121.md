# Canonical Service status cards: authorised publication retry

Three Service status cards point to `https://status.qubrics.com`. The existing
accuracy expectation follows that exact URL correction. These four source files
are byte-identical to PR97's reviewed head `f4c7a5d`; no prose, package fact,
compatibility identifier, navigation or status-service configuration changes.

Canonical guidance: Mintlify T-47269 message `t_01M7WBFX301WJNP62TYB6AHXSG`
attributes previous stale HTML to short-lived edge settings selecting the old
publication's cache. Its permanent fix remains unconfirmed. Vendor proof: compare
each sitemap page's Age with seconds since native publication completed, and
re-request a failing page once after a minute or two. This window uses 120 seconds.

Operator present on 21 November explicitly approved one production retry after
a fresh green read-only precheck. That precheck completed at 05:17:44.560Z:
207 sitemap pages returned 200 with their exact canonical URL; all 207 passed
the Age criterion after one delayed re-read each, with zero stale or unmeasured
results. Fourteen baseline URL status/canonical/redirect chains also passed.
Baseline docs main is `b48a05102f7a9ed84827ee640a44ffb85dcd0300`;
native history `6b002092cf93c63408f0644f` ended at 20 November10:27:54.302Z.
Worker `81c2c3fd-b50a-4368-b631-422121bcde18` remains live at100%; no Worker write.

Local focused accuracy tests pass3/3, zero skipped; confidentiality,
external-link safety, diff whitespace and exact reviewed-source equality pass.
No new test or weakened assertion. Existing PR96 preview and card-click receipts
cover the identical source; green CI and live content checks remain merge gates.
Placement unchanged: API errors reference and monitoring troubleshooting pages.
Polish pass: skipped — exact technical-token corrections only.
Preservation: prose, structure, frontmatter and all other link targets unchanged.

After exact-head normal merge and native completion, record that SHA's native
`endedAt` as T_finish. Run every current sitemap URL with fixed HTML headers,
concurrency3, at most one delayed re-request; retain Age, headers and canonical.
Also prove all three changed cards on `.site`, `.dev` and public HTML/Markdown,
eight native/public exports, 14/14 baseline parity, redirects and main/docs200.
On any final proof failure or availability harm: immediately revert the new
merge with mainline1, push the normal revert and native-republish restored docs
content matching `b48a0510`. Re-check availability and old cards; no further retry.
No DNS/domain/routing/purge/vendor send or support-watch restart is authorised.

Raw proof: MAIN `.claude/artifacts/rebrand-qubrics-docs75/`:
`retry-preflight-20261121/summary.json`, `status-baseline-parity-20261121.json`,
`RETRY-WORKER-BASELINE-20261121.json`, `status-20261121-*.log` and
`PR97-RETRY-PROOF-PLAN-20261120.md`. Whole docs#75/#901 remain open until the
remaining acceptance clauses have qualified package facts and measured proof.
