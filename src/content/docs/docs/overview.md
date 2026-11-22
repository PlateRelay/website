---
title: Overview
description: What PlateRelay is, why it exists for shared 3D printing spaces, and its current development stage.
---

**PlateRelay** is an open-source, self-hosted 3D printing platform built for shared-printer environments such as hackathons, makerspaces, and university labs. It combines centralized multi-printer management with auditable review, scheduling, and fulfillment workflows while isolating regular users from physical hardware.

:::note[Early Development]
PlateRelay is currently in early active development. Production release packages and Docker Compose deployment manifests are not yet published. You can explore the frontend prototype or run the panel server alongside the LAN daemon and built-in simulated printer locally.
:::

## How PlateRelay Differs from Traditional Print Farms

Traditional print farm tools assume a private fleet operated directly by internal staff. Shared public spaces need strict boundaries:

| Dimension | Traditional Print Farm | PlateRelay |
| --- | --- | --- |
| **Resource Model** | Single-owner private fleet | Shared public printing resources |
| **Role Isolation** | Operators access printers directly | Users only submit sliced files and collect parts with pickup codes |
| **Scheduling & Audit** | Direct dispatch with minimal audit trails | Manual review gate, rule-based queue, and permissioned audit logs |
| **Fulfillment Loop** | Ends when printing finishes | Printers remain locked until parts are shelved and bed clearance is confirmed |

## Next Steps

- Follow [Getting Started](/docs/getting-started/) to run the web prototype, panel server, daemon, and simulated printer locally.
- Read [Architecture](/docs/architecture/) to see how the centralized panel, outbound LAN daemon, and shared contracts fit together.
- Review [Contributing](/docs/contributing/) if you would like to help build v1.
