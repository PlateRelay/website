---
title: 快速开始
description: 环境要求、本地安装、前后端与模拟打印机三端联调指南。
---

PlateRelay 目前处于早期开发阶段，暂未发布生产安装包与 Docker Compose 部署方案。你可以在本地直接启动面板前端原型、后端服务、局域网守护进程以及内置模拟打印机进行体验和联调。

## 环境要求

- **面板前后端**：Node.js `>= 24`、`pnpm`
- **守护进程与模拟打印机（可选）**：Python `>= 3.12`、`uv`

本地开发默认使用内置 **PGlite** 和本地文件存储（`.platerelay-data`），无需额外配置 PostgreSQL 或对象存储即可运行。

## 克隆与安装依赖

```sh
git clone https://github.com/PlateRelay/PlateRelay.git
cd PlateRelay

pnpm install
uv sync --project daemon   # 仅运行前端或后端时可省略
```

## 启动本地服务

在仓库根目录执行：

```sh
# 前端原型（使用本地模拟数据，默认访问 http://localhost:5173/）
pnpm dev:web

# 面板后端（默认监听 :3000）
pnpm dev:server
```

:::note
面板后端已按新版契约实现核心流程，前端正在同步适配中，当前 `apps/web` 的 `VITE_API=http` 模式暂不可用。
:::

## 三端本地联调（面板 + 模拟打印机 + Daemon）

无需真实 3D 打印机，即可在本地跑通完整的打印生命周期：

```sh
# 1. 启动面板后端（设置开发用固定注册令牌）
PLATERELAY_DEV_ENROLL_TOKEN=devtoken pnpm dev:server

# 2. 启动 1 台 60 倍速模拟打印机（在 daemon/ 目录）
PYTHONPATH=src uv run python -m platerelay_sim run --count 1 --speed 60

# 3. 启动 daemon 并注册到本地面板
PLATERELAY_ENROLL_TOKEN=devtoken PLATERELAY_DEV_INSECURE=1 \
  PYTHONPATH=src uv run python -m platerelay_daemon --data-dir ./.daemon-data run --panel http://localhost:3000
```

随后在面板中添加打印机：品牌填 `sim`、序列号填 `SIM-0001`、地址填 `127.0.0.1:7130`。打印机首次上报后处于「待清板」状态，确认清床后即可变为可用。

## 运行测试

```sh
# 共享契约包与面板后端测试
pnpm test

# daemon 与模拟打印机测试
uv run --project daemon pytest daemon/tests
```
