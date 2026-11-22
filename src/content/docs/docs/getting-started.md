---
title: Getting Started
description: Prerequisites, local development setup, and running the panel, daemon, and simulated printer.
---

PlateRelay is currently in early active development. While production release packages and Docker Compose manifests are being finalized, you can run the full development stack locally—including the web prototype, panel server, LAN daemon, and built-in simulated printer.

## Prerequisites

- **Panel (Web & Server)**: Node.js `>= 24` and `pnpm`
- **Daemon & Simulated Printer (Optional)**: Python `>= 3.12` and `uv`

Local development defaults to embedded **PGlite** and local file storage (`.platerelay-data`), so no external PostgreSQL instance or S3 bucket is required to get started.

## Clone & Install

```sh
git clone https://github.com/PlateRelay/PlateRelay.git
cd PlateRelay

pnpm install
uv sync --project daemon   # Optional if running only the web frontend or server
```

## Run Locally

Start the panel frontend prototype or backend server from the repository root:

```sh
# Frontend prototype (mock-data mode, http://localhost:5173/)
pnpm dev:web

# Panel backend (listens on :3000 by default)
pnpm dev:server
```

:::note
The panel backend implements the current OpenAPI and daemon contracts, while `apps/web` is actively being updated to match (`VITE_API=http` mode is temporarily unavailable).
:::

## Three-Process Integration (Panel + Sim + Daemon)

You can run the complete printing pipeline locally without physical printers:

```sh
# 1. Start the panel server with a fixed dev enroll token
PLATERELAY_DEV_ENROLL_TOKEN=devtoken pnpm dev:server

# 2. Start 1 simulated printer at 60x speed (in daemon/)
PYTHONPATH=src uv run python -m platerelay_sim run --count 1 --speed 60

# 3. Start the LAN daemon and enroll against the local panel
PLATERELAY_ENROLL_TOKEN=devtoken PLATERELAY_DEV_INSECURE=1 \
  PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run --panel http://localhost:3000
```

Once connected, register the simulated printer in the panel with brand `sim`, serial `SIM-0001`, and address `127.0.0.1:7130`. Confirm bed clearance after the initial report so the printer transitions to available.

## Run Tests

```sh
# Shared contract package and panel server tests
pnpm test

# Daemon and simulated printer tests
uv run --project daemon pytest daemon/tests
```
