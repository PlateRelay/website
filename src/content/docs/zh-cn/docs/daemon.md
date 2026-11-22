---
title: 守护进程与模拟器（Daemon）
description: 局域网守护进程架构、模拟打印机现场故障注入与本地运行指南。
---

`daemon/` 目录包含两个独立的 Python 包：

- **`platerelay_daemon`**：运行在打印机所在局域网，主动外连面板，使用 SQLite 本地持久化出站消息与任务状态，并通过统一适配器接口驱动不同品牌打印机。
- **`platerelay_sim`**：内置的独立模拟打印机，具备自己的固件状态机和局域网 HTTP + WebSocket 接口，并支持模拟物理世界故障事件。

## 目录结构

- `link/`：挑战认证、心跳、退避重连、发件箱与文件下载
- `store/`：本地 SQLite 持久化（发件箱、命令台账、文件清单与未完成开打流程）
- `printers/`：每台打印机独立的 worker，负责状态快照与任务事件判定
- `jobs/`：开打流程编排（排队 → 下载 → 上传 → 开打前检查 → 发起打印 → 实时指令）
- `adapter_api/` & `adapters/`：统一适配器接口，现含 `sim` 驱动与只读 `bambu` 映射
- `protocol/`：从 `packages/shared/schema/daemon/v1` 生成的协议类型

## 模拟打印机与现场事件注入

启动两台 10 倍速运行的模拟打印机：

```sh
PYTHONPATH=src uv run python -m platerelay_sim run --count 2 --speed 10
```

通过 `/operator/...` 现场指令模拟屏幕操作、断料、断网等真实场景：

```sh
PYTHONPATH=src uv run python -m platerelay_sim op 7130 starts_local_print
PYTHONPATH=src uv run python -m platerelay_sim op 7130 filament_runs_out '{"unit":0,"slot":0}'
PYTHONPATH=src uv run python -m platerelay_sim op 7130 loads_filament '{"unit":0,"slot":0}'
PYTHONPATH=src uv run python -m platerelay_sim op 7130 press_pause
PYTHONPATH=src uv run python -m platerelay_sim op 7130 unplug_network '{"seconds":20}'
PYTHONPATH=src uv run python -m platerelay_sim op 7130 fail_next_prepare
```

## 启动 Daemon

```sh
# 首次启动：使用面板生成的一次性注册令牌
export PLATERELAY_ENROLL_TOKEN=...
export PLATERELAY_DEV_INSECURE=1   # 仅开发：允许明文连接本地面板
PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run --panel http://localhost:3000

# 后续直接启动
PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run

# 只读查看本机状态
PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data status
```

数据目录保存 `daemon.sqlite` 与私钥 `daemon.key`（权限 `0600`）。打印机访问码在浏览器侧使用 daemon 公钥加密后下发，仅保存在 daemon 内存中。
