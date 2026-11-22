---
title: Daemon & Simulator
description: Running the outbound LAN printer daemon and built-in simulated printer fleet.
---

The `daemon/` workspace contains two Python packages:

- **`platerelay_daemon`**: Runs on the printer LAN, connects outbound to the panel, persists local state in SQLite, and executes print workflows across vendor adapters.
- **`platerelay_sim`**: A standalone simulated printer implementing LAN HTTP + WebSocket endpoints with operator fault-injection commands.

## Daemon Module Structure

- `link/`: Challenge-based authentication, heartbeat, backoff reconnect, durable outbox, and file downloads
- `store/`: Local SQLite persistence for outbox events, command ledger, file manifest, and in-progress jobs
- `printers/`: Per-printer worker managing snapshots, job state detection, and command dispatch
- `jobs/`: Execution pipeline (queue → download → upload → pre-print check → start → live commands)
- `adapter_api/` & `adapters/`: Vendor-agnostic adapter interface with `sim` and read-only `bambu` support
- `protocol/`: Generated message types derived from `packages/shared/schema/daemon/v1`

## Simulated Printer & Fault Injection

Launch two simulated printers running at 10× speed:

```sh
PYTHONPATH=src uv run python -m platerelay_sim run --count 2 --speed 10
```

Simulate physical operator actions and hardware events via `/operator/...` commands:

```sh
PYTHONPATH=src uv run python -m platerelay_sim op 7130 starts_local_print
PYTHONPATH=src uv run python -m platerelay_sim op 7130 filament_runs_out '{"unit":0,"slot":0}'
PYTHONPATH=src uv run python -m platerelay_sim op 7130 loads_filament '{"unit":0,"slot":0}'
PYTHONPATH=src uv run python -m platerelay_sim op 7130 press_pause
PYTHONPATH=src uv run python -m platerelay_sim op 7130 unplug_network '{"seconds":20}'
PYTHONPATH=src uv run python -m platerelay_sim op 7130 fail_next_prepare
```

## Running the Daemon

```sh
# First-time enrollment with a one-time panel token
export PLATERELAY_ENROLL_TOKEN=...
export PLATERELAY_DEV_INSECURE=1   # Dev only: allow plain HTTP to localhost
PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run --panel http://localhost:3000

# Subsequent runs
PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run

# Read-only status inspection
PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data status
```

The data directory stores `daemon.sqlite` and the daemon's private key `daemon.key` (`0600`). Printer access codes are encrypted in the browser with the daemon's public key and remain in memory only on the daemon.
