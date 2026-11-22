# Docs75 final naming and install reconciliation

Baseline: `fe660d2c48a9674753a75c8fc25c0273653226f5`, PR106, native deployment `7986461628`. Scope: the two remaining acceptance boxes of qubrics/docs#75, spec A3/A5/A17/A18. This is source preparation and read-only evidence; no new publication is claimed.

## Docs75-owned correction

Eleven literal substitutions in four existing pages; every other source byte is preserved:

| Page | Correction | Released source |
| --- | --- | --- |
| `sending/accounts/google-microsoft.mdx` | Two picker display labels: Qubrics | qubrics/qubrics#932 is CLOSED; PR1122 merge `78607cf9`, owning evidence `evidence/rebrand-qubrics-932-20261120.md:31,41` proves the published Google provider app name. |
| `developer-tools/oauth.mdx` | Seven new-setup REST resource examples use `https://qubrics.com/api` | Deployed App v1.8.363, `src/constants/agent-discovery.ts:11,29`; current live OAuth discovery advertises this protected resource. |
| `ai-integrations/mcp/clients/atlassian.mdx` | Canonical-origin REST default uses `https://qubrics.com/api` | Same deployed constants and `src/server/mcp/authorization.ts:166-170`; exact explicit legacy restrictions stay supported. |
| `ai-integrations/agent-access.mdx` | Token-exchange sample uses the encoded canonical Sending resource | Deployed App constants `:7-10,28`, `src/server/agent-auth/token-exchange.ts:83-89`; live discovery and `https://app.qubrics.com/auth.md:29,113` agree. |

The owning App paths have an empty diff from released `v1.8.363` (`141db5f0`) to inspected `origin/main` (`482ea7c6`). This corrects the docs without advancing a mirror ahead of its producer. Earlier evidence retained the old resource IDs; both aliases remain accepted by the unchanged producer. No generated OpenAPI snapshot, public API identifier, package name, command, scope, navigation, announcement or runtime changes.

Canonical approach: consume the released provider name and already deployed canonical resource defaults. Exact technical-token/UI-label substitutions qualify for the authoring workflow's polish exemption. No new tests, dependency or harness; existing required CI owns the tooling suite. Local confidentiality, external-link safety, whitespace and exact-substitution preservation checks pass. Raw logs: docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/FINAL-{CONFIDENTIALITY,EXTERNAL-LINKS,PRESERVATION}-20261123.*`.

## Each unchecked acceptance box

1. **No page says Sendmux except the changelog and compatibility note.** Baseline source scan covers 95 MDX files plus config and both OpenAPI snapshots: 225 case-insensitive occurrences in 27 files. Eleven are the stale labels/setup examples corrected here. The other 214 are classified historical changelog, retained SEO/asset destinations, final A18 pointers, A17/wire/tool/export identifiers, and independently measured MCP npm/Registry/hosted facts. No other ordinary unprotected brand copy was found. This box remains unchecked until this correction is published and the separately held Qubrics Registry facts can be consumed; removing required old identifiers would break the accepted compatibility scope.
2. **Every host, package, CLI command and install line matches the spec.** Published receipts cover npm/PHP/CLI/Homebrew/Skills and the final Python/Ruby/Rust/Go facts. PR106's three live pages prove Go v4.0.0 with unchanged canonicals. The nine setup-resource occurrences corrected here are already supported by live producer metadata. Remaining external MCP facts require SDK344's publication chain below; no future package or Registry identity is claimed from a merged source descriptor.

The redirect and changelog boxes remain proven by prior publication receipts. No unchanged SDK install or whole-corpus page crawl was repeated. The two naming boxes are not falsely ticked on branch-only work, and neither #75 nor #901 is closed here.

## Exact external release dependency

Owner label: `rebrand-qubrics-sdk344`; issue qubrics/qubrics-sdk#344. Source PR418 is already MERGED as `651c1a68`; it selected `io.github.qubrics/qubrics-mcp` and changed ownership markers only. It did not publish package bytes or a Registry entry.

SDK344's current next step is the **matched-marker native patches plus new Registry publication**: separately approve and publish npm `sendmux-mcp@1.0.2`, PyPI `qubrics-mcp==3.0.1`, then exact-descriptor Registry `io.github.qubrics/qubrics-mcp` `3.0.1`, with public byte/marker/record readbacks. SDK MAIN task `plan.md:29` and `pr418-merged-main-20261123.md` distinguish this from the completed source merge. No additional Registry source PR is presumed.

Fresh public reads: npm latest remains `sendmux-mcp@1.0.1`, marker `io.github.Sendmux/sendmux-mcp`; PyPI `qubrics-mcp` latest is `3.0.0`; old Registry `io.github.Sendmux/sendmux-mcp` `2.2.0` returns 200 with the old independent package bindings; proposed new identity/version returns 404. Docs correctly retain those actual facts until producer release. After SDK344 supplies publication receipts, docs75 updates the pinned package provenance, Registry snapshot/guard and rendered facts from the exact returned record through a normal green PR and separate native-publication ASK.

## Live export proof and publication gate

At 23:16–23:19Z, all eight direct native/public export GETs return 200. Both hosts' index, full export and sitemap each carry 207 unique canonical documentation URLs, zero fallback-host links and zero doubled `/docs`. Both robots files give `Sitemap: https://qubrics.com/docs/sitemap.xml`. The live full export still exposes the eleven stale occurrences addressed here; source preparation alone is not live proof.

Raw source census/classification: docs MAIN artifact `FINAL-SOURCE-AUDIT-20261123.md`. Live export/context and release reads: `FINAL-EXPORT-AUDIT-20261123.json`, `FINAL-PUBLIC-OLD-TOKENS-20261123.tsv`, `FINAL-oauth.json`, `FINAL-auth-md.body`, `FINAL-ISSUE932-20261123.json`, `FINAL-{registry-new,registry-current,npm-current,pypi-current}.*`.

New publication requires Ops ASK after green exact-head CI. Rollback: revert the resulting normal merge (mainline 1) and native republish to baseline `fe660d2c` / `7986461628`. Proof after GO: four changed HTML pages 200 with exact new labels/resources and unchanged canonicals, native/public full-export sections matching those four pages, eight canonical export checks, retained alias redirects, main/docs 200. Judge native completion and one vendor-prescribed delayed read before stale-content failure; real harm rolls back, proof-tool error stops without automatic content rollback. No publication, purge, provider/Registry/DNS/domain/Worker mutation, support send or watch restart in this preparation.
