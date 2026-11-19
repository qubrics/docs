# Operator favicon source for docs75

Operator ruling on 20 November: docs favicons must come only from the supplied `/Users/rj/Downloads/favicon` folder. Logos, product images and share images are unaffected. Before editing, copied all seven files to docs MAIN `.claude/artifacts/rebrand-qubrics-docs75/operator-favicon-20261120/favicon/` and recorded `SHA256SUMS`; all seven checks pass.

Change: set `docs.json` favicon to `/images/favicon.svg`, copied unchanged from that preserved folder. SHA256 `d3e2e8c1bb4c676da536dd8612814235ea801c1f3ab2a06f6b4710d1b5cec21a`. Previous favicon source `/images/logo-light.svg` is different, SHA256 `f773cc86f944e754d706fcf4ac548702154a4ac9067bc08539c101a93b6a60f1`; that logo file and both configured header logo paths remain untouched.

Canonical per [Mintlify appearance settings](https://github.com/mintlify/docs/blob/main/organize/settings-appearance.mdx): one SVG favicon source is automatically resized to the platform's required favicon sizes. Native generated derivatives now originate only from the operator SVG. No new agent-generated favicon, custom head script or Worker change. Six other supplied files remain preserved; they are not needed by the native single-source configuration. Existing public Qubrics alias mapping covers new generated paths without alteration.

Checks against base `e77470bdf0da1bf0c06c74a3b4717de607c1d8f5`: `npm run confidentiality:check`, `npm run external-links:check`, `mint validate` and `mint broken-links` exited 0. Validation reports build and validation passed; no broken links found. No executable logic or tests changed. Remaining repository tooling/contract checks run in native CI.

Native `mint dev` preview at `http://localhost:61075` returns 200; `/images/favicon.svg` returns 200 and compares byte-for-byte with the operator SVG. All four emitted local favicon files return 200: apple-touch, 32px PNG, 16px PNG and ICO. Browser renders the Qubrics homepage; only the normal local Socket.io connection warning was observed. Metadata-only change: navigation, page copy and compatibility contracts remain unchanged. Polish pass skipped under the workflow's metadata-only exemption.

Pre-publication baseline https://qubrics.com/docs and its 192px favicon return 200. Saved `before.html`, `before-metadata.json` and `before.png` under the artifact directory; old PNG SHA256 `9b5c013e078bfa24f1d306f98feaad8e116b383d44f5536040712e3ddea7ca2e`. Live publication proof will read the exact new SVG plus emitted native favicon links, ordinary pages and client navigation, then record one before/after FYI.

Publication follows the standing docs release gate. Named rollback: revert this PR's merge and let native docs publication restore the previous favicon setting; current pre-change source anchor `e77470bd`, successful native deployment `7926026339` / status `22667437407`. Re-read the latest native publication identity before merge. No DNS, domain, routing, provider, SDK, app cluster or announcement change.

Raw command/browser logs and all seven original operator hashes stay in the MAIN artifact directory above. Other worktrees and MAIN's working files were left intact. Whole docs75/901 remain open for qualified SDK facts.
