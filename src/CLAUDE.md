[根目录](../CLAUDE.md) > **src**

# src 模块上下文

## 变更记录 (Changelog)

- 2026-06-11 10:52:42: 初始化模块上下文，记录订阅入口、依赖关系、质量门禁与关键文件。

## 模块职责

`src` 是 GKD 订阅源码核心，负责声明订阅元信息、分类、全局规则，并自动聚合 `src/apps` 下的应用规则。

## 入口与启动

- 主入口：`src/subscription.ts`
- 订阅声明：`defineGkdSubscription({ ... })`
- 应用规则加载：`await batchImportApps(`${import.meta.dirname}/apps`)`

`subscription.ts` 会导入：

- `src/categories.ts`：订阅分类定义。
- `src/globalGroups.ts`：全局规则定义。
- `src/apps`：应用级规则目录，由工具函数批量导入。

## 对外接口

本模块对外导出默认的 GKD 订阅对象，供 `scripts/check.ts` 校验并供 `scripts/build.ts` 构建 `dist` 产物。

订阅元信息当前包括：

- `id: 233`
- `name: 'Subscription'`
- `version: 0`
- `author: 'author'`
- `checkUpdateUrl: './gkd.version.json5'`
- `supportUri: 'https://github.com/gkd-kit/subscription-template'`

## 关键依赖与配置

- `@gkd-kit/define`：提供 `defineGkdSubscription()`、`defineGkdCategories()`、`defineGkdGlobalGroups()`。
- `@gkd-kit/tools`：提供 `batchImportApps()`。
- `tsconfig.json`：包含 `src` 与 `scripts`，启用严格类型检查。

## 数据模型

没有数据库或持久化模型。主要数据结构是 GKD 订阅定义：

- `categories`：分类数组，目前为空。
- `globalGroups`：全局规则数组，目前为空。
- `apps`：由 `src/apps/*.ts` 动态聚合的应用规则数组。

## 测试与质量

- 类型检查：`pnpm run check` 中的 `tsc --noEmit`
- 订阅校验：`scripts/check.ts` 中的 `checkSubscription(subscription)`
- 格式和 lint：`pnpm run format`、`pnpm run lint`

## 常见问题 (FAQ)

- 新增应用规则放哪里？放在 `src/apps/<packageName>.ts`，并通过 `defineGkdApp()` 默认导出。
- 是否需要手动维护应用列表？不需要，`batchImportApps()` 会从 `src/apps` 批量导入。
- 是否应直接编辑 `dist`？通常不应编辑，`dist` 是构建输出。

## 相关文件清单

- `src/subscription.ts`
- `src/categories.ts`
- `src/globalGroups.ts`
- `src/apps/`
