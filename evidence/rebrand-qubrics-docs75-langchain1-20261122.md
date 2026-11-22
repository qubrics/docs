# Public LangChain replacement facts

Part of docs#75. SDK344 receipt `python-langchain1-public-20261122.md` proves
`langchain-qubrics` 1.0.0 public/unyanked, exact approved wheel/sdist hashes,
fresh public install/import/toolkit construction and dependency checks PASS.
Wheel 6778 B: `8feb67c473a7c23d612fa8a078bfdd47d0d1dbea1fc79b38b919d7124c86c1be`.
Sdist 5734 B: `7219efeb18fdadfc5238081d31cbacf4d54d31ef2e727e697df49e58df5a2e8d`.

Producer PR355 merge `5fbe78d9`, tag `python-langchain-v1.0.0`:
`packages/python/langchain/qubrics/langchain/__init__.py:5` exports
`QubricsToolkit`; README lines 33–46 document the unchanged token option,
requested scopes and consent-selected mailbox. The installed public toolkit
has send_email/list_messages/reply, and the qualified runtime is calendar-free.

Keep Guides → Developer tools → SDKs → Python / Versioning and support.
Add the pinned install command and package/import row; replace only the
existing package/class tokens in the OAuth paragraph. No scope, selector,
credential or A17 identifier change. Polish pass skipped: technical tokens,
installation code and package-table row only. No release announcement added.

Ops authorises normal exact-head green merge/native publish on PR100 terms.
Rollback: revert the merge and republish; anchor `e38858a0` / native `7974065446`.
Prove the two changed pages 200, unchanged canonicals, exact install/class/import
facts; use one vendor-prescribed delayed read if the first copy is stale.
Step 6 `langchain-sendmux` pointer remains unqualified and is not documented.
No unchanged producer-install or corpus/export proof is repeated.

Local confidentiality, external-link, whitespace, Mintlify validation and
broken-link checks passed. Logs: MAIN task artifacts `langchain1-mint-*-20261122.log`.
