---
title: 参与贡献
description: 跨端契约同步流程、测试要求与安全规范。
---

欢迎通过 Issue 反馈问题或向 [PlateRelay/PlateRelay](https://github.com/PlateRelay/PlateRelay) 提交 Pull Request。

## 契约变更流程

涉及 REST API、权限声明或 daemon 协议消息的变更时，请按顺序执行：

1. 先更新 `packages/shared/schema/` 下的契约文件。
2. 同步生成 TypeScript 与 Python 代码并运行契约检查：

```sh
pnpm --filter @platerelay/shared check:contract
pnpm --filter @platerelay/shared generate
daemon/scripts/generate_protocol.sh
```

CI 会校验生成产物与契约定义完全一致，不存在未提交的差异。

## 提交前检查

提交 PR 前请确保双端测试全部通过：

```sh
pnpm test
uv run --project daemon pytest daemon/tests -q
```

## 安全与硬件约束

- 严禁在代码、配置文件、日志或测试中写入真实打印机访问码、私钥、令牌或其他凭据。
- 严禁在自动化测试中向真实物理打印机发送打印或控制指令。
- 如发现安全漏洞，请通过 [GitHub Security Advisories](https://github.com/PlateRelay/PlateRelay/security/advisories/new) 私密上报，勿在公开 Issue 中披露。

## 许可证

PlateRelay 采用 **GPL-3.0-only** 开源协议发布；第三方引入代码（如 MIT 协议的 `pybambu`）保留其原有版权与许可证声明。
