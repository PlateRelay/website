---
title: 面板后端（Server）
description: "@platerelay/server 的初始化、环境变量配置、幂等约定与实时推送机制。"
---

`@platerelay/server` 是基于 NestJS 的管理面板后端，负责账户鉴权、`.gcode.3mf` 解析校验、审核与队列调度、SSE 实时推送以及与 daemon 的长连接通信。

## 初始化账户

首次启动且数据库尚无账户时，`GET /api/v1/auth/methods` 会返回 `setupRequired: true`。此时调用一次 `POST /api/v1/setup` 即可创建首个管理员账户（已有账户后该接口自动关闭）。

也可以在命令行从标准输入读取密码创建账户：

```sh
pnpm --filter @platerelay/server user:create admin 管理员 ADMIN < password.txt
```

## 常用环境变量

| 环境变量 | 说明 |
| --- | --- |
| `PORT` | 服务监听端口，默认 `3000` |
| `DATABASE_URL` | PostgreSQL 连接串（`postgresql://...`）；不设时使用内嵌 PGlite |
| `PLATERELAY_DATA_DIR` | 本地存储与内嵌数据库目录，默认仓库根目录 `.platerelay-data` |
| `PLATERELAY_SECRET` | 签名链接与取件码密钥；不设则每次启动随机生成 |
| `PLATERELAY_PUBLIC_ORIGIN` | 面板对外地址（`scheme://host[:port]`），用于写请求来源校验与 daemon 认证签名 |
| `PLATERELAY_SECURE_COOKIES` | HTTPS 部署时设为 `1`，为会话 Cookie 加上 `Secure` 标记 |
| `PLATERELAY_TRUST_PROXY` | 位于反向代理之后时开启，确保审计日志记录真实客户端 IP |
| `PLATERELAY_DEV_ENROLL_TOKEN` | 非生产环境下可用的固定 daemon 注册令牌，方便本地调试 |
| `PLATERELAY_STORAGE` | `local`（默认）或 `oss`（阿里云 OSS / MinIO 等 S3 兼容存储） |

## 接口与并发约定

- **路由前缀**：前端与开放接口位于 `/api/v1`；daemon HTTP 与 WebSocket 接口位于 `/daemon/v1` 与 `/daemon/v1/ws`。
- **来源校验**：浏览器会话使用 `pr_session` Cookie，写请求校验 `Origin` 头。
- **请求幂等**：除登录、登出与心跳外，写请求均须携带 `Idempotency-Key`（缺失返回 `428`，同键同体 24 小时内重放，同键异体返回 `409`）。
- **乐观状态保护**：状态变更请求携带调用方观察到的状态（`expectedStatus`、`expectedState`、`expectedJobId`），不一致时返回 `409`。
- **统一错误格式**：异常响应遵循 `application/problem+json`，携带机器可读 `code` 与 `X-Request-Id` / `requestId`。
- **SSE 实时推送**：`GET /api/v1/stream` 按连接者权限裁剪推送资源快照，重连后下发 `resync` 事件提示拉取最新状态。
