# Canonical service-status links: approved retry

Three Service status cards use `https://status.qubrics.com`; their existing
accuracy expectation follows the same approved technical-token correction.
No prose, navigation, compatibility identifier, package fact or status-service
configuration changes. Exact four source files match approved PR96 head
`880448ec295bf6d5add250bae91ce03a50fd9535`.

The first publication was rolled back because API errors HTML remained stale
while Markdown and two other HTML pages updated. Canonical Mintlify guidance
requires `.mintlify.site` for proxy invalidation:
https://www.mintlify.com/docs/deploy/reverse-proxy.
PR246 now uses that origin. Normal merge `2005335e`, Worker
`81c2c3fd-b50a-4368-b631-422121bcde18`, deployment `2fa753d7`.
Fourteen pre/post URL status/canonical/redirect-chain comparisons match exactly;
ten candidate-attributed probes and exact live-module export pass.
Operator authorised this retry only after that proof and Ops PROGRESS, both done.

Existing focused test seen red: `ERR_ASSERTION: monitoring/dashboard-logs.mdx`
with canonical-host expectation and old link source. Restoring the three links
makes the same test pass1/1, zero skipped. No new test, skip or relaxed matcher.
Confidentiality, external-link safety and diff checks pass. CI runs full gates.
Prior PR96 real-browser preview/card-click receipt still covers these identical
source files; live checks below establish actual publication freshness.

Placement: unchanged API error reference and monitoring troubleshooting pages.
Polish pass: skipped — exact technical-token corrections only.
Preservation: all prose, frontmatter, structure and unrelated targets unchanged.

Approved release: exact-head normal merge on green CI, native publication.
Rollback on harm: revert resulting merge with mainline1 and republish to
`b77ca6f0`/native`7937506489`; no publication retry after harm.
After native completion, measure all three actual HTML/Markdown targets on
`.site`, `.dev` and public copies with identical request headers, retaining
full response headers and page-manifest lastModified. Also read eight exports,
canonical corpus/robots, retained aliases, main/docs and actual browser cards.
Both origins updating supports compatibility, not exclusive causal attribution.

Raw receipts: MAIN `.claude/artifacts/rebrand-qubrics-docs75/`,
`status-retry-{red,green,confidentiality,external}-20261120.log`,
`origin-window-20261120/` and `PR246-PUBLICATION-RECEIPT-20261120.md`.
Whole docs#75/#901 remain open for SDK344-owned release receipts.
