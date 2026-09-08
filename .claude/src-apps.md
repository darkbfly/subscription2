[根目录](../CLAUDE.md) > [src](../src/CLAUDE.md) > **apps**

# src/apps 模块上下文

> 此文档不能放在 `src/apps/` 目录内：`batchImportApps()` 会读取该目录下所有文件，非 `.ts` 文件会导致 `pnpm run check` 失败。

## 变更记录 (Changelog)

- 2026-06-11 10:52:42: 初始化应用规则模块上下文，记录现有应用、selector 约定与校验方式。

## 模块职责

`src/apps` 按 Android 包名拆分维护应用级 GKD 规则。每个 `.ts` 文件应默认导出一个 `defineGkdApp()` 结果，由 `src/subscription.ts` 自动聚合。

## 入口与启动

- 目录入口：`src/subscription.ts` 中的 `batchImportApps(`${import.meta.dirname}/apps`)`
- 单应用入口：每个 `src/apps/*.ts` 文件的默认导出

当前应用文件：

- `src/apps/com.a7m3p9xv.t6qk2z8.app.ts`：JMComic3，包含开屏广告与自动选择线路 1 规则。
- `src/apps/com.tencent.mm.ts`：微信，目前 `groups` 为空。
- `src/apps/com.tencent.mobileqq.ts`：QQ，目前 `groups` 为空。
- `src/apps/li.songe.gkd.ts`：GKD，目前 `groups` 为空。
- `src/apps/com.kuaishou.nebula.ts`：快手极速版，自动签到规则。

## 对外接口

每个文件对外暴露一个应用定义：

- `id`：Android package name。
- `name`：应用显示名称。
- `groups`：规则组数组，规则组内包含 `key`、`name`、可选 `activityIds` 与 `rules`。

## 关键依赖与配置

- `@gkd-kit/define`：提供 `defineGkdApp()`。
- `src/subscription.ts`：聚合本目录所有应用定义。
- `.cursor/skills/gkd-matches/SKILL.md`：本仓库内的 selector 编写参考。

## 数据模型

核心结构是 GKD 应用规则：

- 应用级：`defineGkdApp({ id, name, groups })`
- 规则组级：`{ key, name, activityIds, rules }`
- 规则级：`{ matches, matchTime, ... }`

当前只有 JMComic3 定义了非空规则组：

- `开屏广告`：使用 WebView 层级路径定位按钮，`matchTime: 15000`。
- `自动选择线路1`：使用 `@Button[text^="線路1"]`，`matchTime: 5000`。

## 测试与质量

- 修改任意应用规则后运行 `pnpm run check`。
- 若格式或 lint 可能受影响，运行 `pnpm run format` 与 `pnpm run lint`。
- PR 工作流会限制 `src/apps/*.ts`、`src/categories.ts`、`src/globalGroups.ts`、`src/subscription.ts` 中一次变更文件数不超过 1 个。

## Selector 约定

- 优先使用稳定属性：`id`、`vid`、`text`、`desc`、`clickable`。
- 文本有动态后缀时优先使用 `text^`、`text*`、`text$`，避免不必要的正则。
- 只有目标节点缺少稳定属性时才使用父子或兄弟层级关系。
- WebView 规则如果只能使用层级路径，应尽量增加内容根节点、文本或可点击状态上下文来降低误点风险。
- 点击目标使用 `@` 显式标记。

## 常见问题 (FAQ)

- 新应用文件如何命名？优先使用包名，如 `com.example.app.ts`。
- 规则 `key` 如何选择？在同一应用内保持唯一且稳定。
- 何时使用 `matchTime`？当规则只应在启动或短时间窗口内生效时使用。

## 相关文件清单

- `src/apps/com.a7m3p9xv.t6qk2z8.app.ts`
- `src/apps/com.tencent.mm.ts`
- `src/apps/com.tencent.mobileqq.ts`
- `src/apps/li.songe.gkd.ts`
- `src/apps/com.kuaishou.nebula.ts`
