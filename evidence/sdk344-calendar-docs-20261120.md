# Calendar teaching removal

Standing operator rule 12, 20 November 2026, authorises source removal through normal PRs after preserving calendar on one named branch per repository. Published versions remain unchanged. This is source preparation only; no merge, deployment, registry, tag or release action is performed here.

## Preservation

Before any source edit, GitHub `refs/heads/archive/calendar` was absent. A non-force create preserved current docs main `4ffdf27ff251860132b939e26970e5c5c9c70cd4`. Independent GET readback returned that exact branch and SHA. This includes the preceding favicon PR90. Normal revert is the source rollback; the archive branch remains intact.

## Scope

- Remove the active mailbox-calendar guide, its next-step card and calendar guide/endpoint navigation.
- Retain top-level tabs and all neighbouring mail guides and endpoint groups.
- Keep historical changelog and compatibility statements, generic date arithmetic and negative coverage.
- Keep `openapi-app.json` and generated Postman truthful to their still-live producer. Repository `AGENTS.md` says producer repositories own these snapshots and collections must be generated, never hand-edited. The live-endpoint hold until infra-migration step 1f remains a separate source-removal gate.

Canonical approach: Mintlify navigation lists the pages and endpoint groups to publish ([navigation reference](https://www.mintlify.com/docs/organize/navigation)); remove the held feature's active teaching and navigation together. No replacement prose or announcement is added.

Placement: Guides → Developer tools → Mailbox API guides, and Mailbox API → Calendars. Disposition: remove the held feature's entries. Reader task: find mail integration guidance. Existing groups and sequence remain unchanged.

Polish pass: skipped — deletion-only change, with no new or rewritten reader-facing prose. Preservation reductions are intentional under the operator's source-removal ruling; unchanged material remains byte-for-byte.

## Qualification

The final deletion-only working tree passed:

- `npm run confidentiality:check` and `npm run external-links:check`: exit 0.
- `mint broken-links`: exit 0, no broken links.
- `mint validate`: exit 0, build and validation passed.
- `git diff --check`: exit 0.
- JSON/navigation and guide-absence assertion: PASS; all four top-level tabs retained.
- `git diff --exit-code origin/main -- openapi-app.json openapi-sending.json postman/`: exit 0, producer snapshots and generated collections unchanged.

Local `mint dev --no-open` preview verified expanded guide navigation, remaining Threads next-step card and previous/next mail pagination, with no calendar link. Screenshot: `operations-next-steps.png` in the raw evidence folder. The unchanged Threads icon requests `messages-square.svg` from the icon vendor CDN and receives HTTP 403; card text/link and navigation render correctly. No unrelated icon or tooling change is included.

Owned preview tab closed and `isClosed()` returned true; owned preview process exited 0 after Ctrl-C. No dependency install or task-local build cache was created. PR CI and review remain pending; no claim of merge or deployment.

Ops relayed the `docs75/favicon` lease release at 10:38 AEDT; the old claim was absent before navigation editing. A normal rebase to current main `0f03b209d77cfc8c4210ed3c744970e524855312` preserved its unrelated artwork changelog addition. `archive/calendar` remains at its original preservation SHA and was not overwritten.

Raw run evidence: `/Users/rj/Desktop/GIT-REPOS/sendmux-docs/.claude/artifacts/rebrand-qubrics-sdk344-calendar-docs/`.
