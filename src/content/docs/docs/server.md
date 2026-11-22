---
title: Panel Server
description: Configuration, database storage, idempotency, and API conventions for @platerelay/server.
---

`@platerelay/server` is the centralized NestJS backend responsible for authentication, `.gcode.3mf` parsing, order review and scheduling, real-time SSE updates, and the daemon control channel.

## Initial Setup

On first boot with no accounts, `GET /api/v1/auth/methods` returns `setupRequired: true`. Call `POST /api/v1/setup` once to create the initial administrator (subsequent calls are rejected once an account exists).

You can also create an account via CLI reading the password from standard input:

```sh
pnpm --filter @platerelay/server user:create admin Admin ADMIN < password.txt
```

## Key Environment Variables

| Variable | Description |
| --- | --- |
| `PORT` | HTTP listen port (default `3000`) |
| `DATABASE_URL` | PostgreSQL connection string (`postgresql://...`). Uses embedded PGlite when unset |
| `PLATERELAY_DATA_DIR` | Directory for local storage and embedded database (defaults to `.platerelay-data` at repo root) |
| `PLATERELAY_SECRET` | Signing secret for URLs and pickup codes (auto-generated per boot if omitted) |
| `PLATERELAY_PUBLIC_ORIGIN` | Public origin (`scheme://host[:port]`) validated on browser write requests and daemon auth |
| `PLATERELAY_SECURE_COOKIES` | Set to `1` when serving behind HTTPS |
| `PLATERELAY_TRUST_PROXY` | Enable when deployed behind a reverse proxy so audit logs record client IPs |
| `PLATERELAY_DEV_ENROLL_TOKEN` | Non-production reusable daemon enrollment token for local development |
| `PLATERELAY_STORAGE` | `local` (default) or `oss` for S3/OSS-compatible object storage |

## API & Concurrency Conventions

- **API Prefixes**: Browser and client endpoints live under `/api/v1`; daemon endpoints and WebSocket connections use `/daemon/v1` and `/daemon/v1/ws`.
- **Origin Enforcement**: Authenticated browser sessions use the `pr_session` cookie and validate the `Origin` header on state-changing requests.
- **Idempotency**: Write requests require an `Idempotency-Key` header (returning `428` if missing, replaying results for identical payloads within 24 hours, or returning `409` on payload mismatch).
- **Optimistic State Guards**: State-mutating requests include caller-observed state (`expectedStatus`, `expectedState`, `expectedJobId`) and fail with `409` on stale writes.
- **Problem Details**: Errors follow `application/problem+json` with machine-readable `code` fields and `X-Request-Id` / `requestId` correlation.
- **SSE Stream**: `GET /api/v1/stream` pushes permission-scoped resource snapshots and emits `resync` events after reconnection.
