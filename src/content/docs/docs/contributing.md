---
title: Contributing
description: Contract generation workflow, testing requirements, and security guidelines for contributors.
---

Contributions via issues and pull requests are welcome at [PlateRelay/PlateRelay](https://github.com/PlateRelay/PlateRelay).

## Contract-First Workflow

Whenever you modify REST endpoints, permissions, or daemon protocol messages:

1. Update the source schemas under `packages/shared/schema/`.
2. Regenerate derived TypeScript and Python code and run contract checks:

```sh
pnpm --filter @platerelay/shared check:contract
pnpm --filter @platerelay/shared generate
daemon/scripts/generate_protocol.sh
```

CI verifies that generated artifacts match `packages/shared/schema/` with no uncommitted drift.

## Required Checks Before Opening a PR

Ensure both TypeScript and Python test suites pass:

```sh
pnpm test
uv run --project daemon pytest daemon/tests -q
```

## Security & Hardware Rules

- Never commit real printer access codes, private keys, tokens, or credentials in code, configuration files, logs, or tests.
- Never issue mutating or print-starting commands against physical printers during automated tests.
- Report security vulnerabilities privately via [GitHub Security Advisories](https://github.com/PlateRelay/PlateRelay/security/advisories/new) instead of opening public issues.

## License

PlateRelay is distributed under **GPL-3.0-only**. Third-party vendored components (such as `pybambu` under MIT) retain their original license notices.
