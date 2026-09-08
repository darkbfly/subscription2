[根目录](../CLAUDE.md) > **scripts**

# scripts 模块上下文

## 变更记录 (Changelog)

- 2026-06-11 10:52:42: 初始化脚本模块上下文，记录校验、构建入口与质量工具链。

## 模块职责

`scripts` 保存订阅校验与构建脚本，是本仓库从 TypeScript 订阅定义生成 `dist` 发布产物的自动化入口。

## 入口与启动

- 校验入口：`scripts/check.ts`
- 构建入口：`scripts/build.ts`
- package scripts：
  - `pnpm run check`：`tsc --noEmit && tsx ./scripts/check.ts`
  - `pnpm run build`：`tsc --noEmit && tsx ./scripts/build.ts`

## 对外接口

`scripts/check.ts`：

- 导入 `src/subscription.ts`。
- 调用 `checkApiVersion()` 校验 GKD API 版本。
- 调用 `checkSubscription(subscription)` 校验订阅结构。
- 默认导出校验后的订阅对象，供构建脚本复用。

`scripts/build.ts`：

- 导入 `scripts/check.ts` 的订阅对象。
- 调用 `updateDist(subscription)` 更新 `dist` 产物。

## 关键依赖与配置

- `@gkd-kit/tools`：提供 `checkApiVersion()`、`checkSubscription()`、`updateDist()`。
- `tsx`：直接执行 TypeScript 脚本。
- `typescript`：`tsc --noEmit` 执行类型检查。
- `package.json`：定义脚本入口和 Node.js/pnpm 版本要求。

## 数据模型

本模块不定义业务数据模型，只消费 `src/subscription.ts` 导出的订阅对象，并把校验后的对象传给构建工具。

## 测试与质量

- `pnpm run check` 是最小验证命令。
- `pnpm run build` 会执行同样的类型检查并更新 `dist`，本地普通验证不一定需要运行。
- GitHub Actions 在 PR 和 push 流程中运行 `check`、`format`、`lint`。

## 常见问题 (FAQ)

- 修改规则后为什么先跑 `check`？它能同时覆盖 TypeScript 类型和 GKD 订阅结构校验。
- 什么时候运行 `build`？需要生成或发布 `dist` 产物时运行；本地提交通常不需要提交生成物。
- `check.ts` 为什么默认导出订阅？为了让 `build.ts` 在复用校验逻辑后直接构建。

## 相关文件清单

- `scripts/check.ts`
- `scripts/build.ts`
- `package.json`
- `tsconfig.json`
