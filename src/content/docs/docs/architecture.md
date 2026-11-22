---
title: Architecture
description: How PlateRelay separates the centralized management panel from outbound LAN device daemons and contract-first schemas.
---

PlateRelay is designed for shared public printing environments such as hackathons, makerspaces, and university labs where users must remain isolated from physical hardware.

## Core Design Principles

1. **Hardware Isolation**: Regular users submit `.gcode.3mf` files and redeem finished parts with verification codes. They never reach printer LAN interfaces directly.
2. **Split Panel & LAN Daemon**: The management panel runs centrally, while a lightweight daemon sits inside the printer LAN and initiates outbound connections—requiring no inbound firewall ports.
3. **Contract-First Integration**: All REST endpoints, Server-Sent Events, and daemon WebSocket messages are generated from `packages/shared/schema/`.
4. **Bed-Clearance Gate**: Finishing a print does not immediately free a printer. An operator must shelve the finished part and confirm bed clearance before the next job can be dispatched.

## Monorepo Layout

| Directory | Role |
| --- | --- |
| `apps/server` | Panel backend service (`NestJS`, PostgreSQL/PGlite, SSE, daemon control channel) |
| `apps/web` | Panel web application (`React`, `Vite`, `Tailwind CSS`) |
| `daemon` | LAN device daemon (`platerelay_daemon`) and standalone simulated printer (`platerelay_sim`) |
| `packages/shared` | Shared TypeScript types, `openapi.yaml`, and daemon protocol schemas (`daemon/v1`) |
| `tools` | Read-only hardware probing scripts and printer MCP/TUI utilities |

## End-to-End Lifecycle

1. **Submission & Validation**: Users upload sliced `.gcode.3mf` files; server worker threads parse metadata and validate safety bounds.
2. **Manual Review**: Reviewers inspect and approve or reject orders before they enter scheduling queues.
3. **Rule-Based Dispatch**: Eligible orders are matched to compatible idle printers and handed off to the LAN daemon.
4. **Local Execution**: The daemon downloads the file, transfers it to the printer, runs pre-print checks, starts the job, and reports telemetry back.
5. **Shelving, Bed Clearance & Pickup**: Staff remove the part, store it on a staging shelf, confirm bed clearance to release the printer, and verify the user's pickup code at handoff.
