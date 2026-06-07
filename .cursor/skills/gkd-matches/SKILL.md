---
name: gkd-matches
description: Use when writing, reviewing, or debugging GKD subscription matches selectors, Android accessibility node selectors, WebView button rules, id/vid/text matching, or selector optimization.
---

# GKD Matches

## Core Principle

Prefer stable accessibility attributes (`id`, `vid`, `text`, `desc`, `clickable`) over brittle view-tree distance. Use parent/child/sibling paths only when the target node has no stable identifying attributes.

## Workflow

1. Read the snapshot or existing rule and identify the real click target.
2. Prefer a direct target selector: `@Button[text="跳过"]`, `@[vid="close"]`, `@[text^="線路1"]`.
3. If text can vary, use string operators before regex:
   - `text^="線路1"` for stable prefix plus changing suffix.
   - `text*="跳过"` for contains.
   - `text$="关闭"` for stable suffix.
4. Add ancestry/sibling context only to disambiguate duplicates.
5. For delayed WebView content, use rule props like `matchDelay`, not brittle extra ancestry.
6. Run `pnpm run check` after editing subscription rules.

## Selector Syntax Quick Reference

- Mark the clicked node with `@`. If omitted, GKD clicks the last attribute selector.
- Attribute selectors must be separated from relation selectors with spaces: `A > B`, not `A>B`.
- Node type shorthand: `Button` is equivalent to matching node name `Button` or ending in `.Button`.
- Combine attributes with adjacent brackets: `Button[text^="線路1"][clickable=true]`.
- Logic inside brackets supports `&&`, `||`, and `!(...)`.

## Common Operators

| Pattern | Meaning | Use Case |
| --- | --- | --- |
| `[text="跳过"]` | exact match | Fixed visible text |
| `[text^="線路1"]` | starts with | Text has changing status suffix |
| `[text*="广告"]` | contains | Text includes stable keyword |
| `[text$="关闭"]` | ends with | Text has stable suffix |
| `[text~="..."]` | Java/Kotlin regex | Only when simple operators cannot express it |
| `[id="android:id/content"]` | exact id | Root/content anchors |

Use simple string operators before regex. Regex must be valid for GKD's Java/Kotlin runtime.

## Relation Operators

| Operator | Direction | Example |
| --- | --- | --- |
| `A > B` | `A` is an ancestor of `B` | `FrameLayout > TextView` |
| `A >2 B` | `A` is 2 levels above `B` | `ViewGroup >2 Button` |
| `A < B` | `A` is a direct child of `B` | `@Button < ViewGroup` |
| `A <n B` | `A` is any child position of `B` | `@TextView <n ViewGroup` |
| `A <<n B` | `A` is a descendant of `B` | `@[text="跳过"] <<n [id="android:id/content"]` |
| `A + B` | `A` is previous sibling of `B` | `TextView + Button` |
| `A - B` | `A` is next sibling of `B` | `@Button - TextView` |

Avoid fixed distances like `<7 View < View ...` unless the hierarchy is known stable. They often break in WebView pages.

## Fast Query Optimization

Put fast-queryable attributes first in the final attribute selector:

```ts
// Good: can use text fast query
'@Button[text^="線路1"][clickable=true]'

// Worse: text is not first in the attribute selector
'@Button[clickable=true][text^="線路1"]'
```

Fast query works with first expressions like `id`, `vid`, `text`, `text^`, `text*`, and `text$`. This matters for large or WebView-heavy trees.

## Examples

Changing line status, same line number:

```ts
{
  matches: '@Button[text^="線路1"]',
  matchDelay: 5000,
}
```

Target a parent container by child text:

```ts
'TextView[text="确认"] <n @[clickable=true]'
```

Limit a generic close button to content root:

```ts
'@Button[text="关闭"] <<n [id="android:id/content"]'
```

## Common Mistakes

- Exact matching dynamic text: use `[text^="線路1"]` instead of `[text="線路1 顺畅"]` if the suffix changes.
- Encoding position as behavior: do not keep `<5` or `<7` just because it worked in one snapshot.
- Forgetting `@`: without `@`, the final selector node is clicked.
- Overusing regex: prefer `=`, `^=`, `*=`, `$=` for readability and runtime consistency.
- Hiding trigger issues in selectors: if a WebView node appears late, add `matchDelay` to the rule object.

## References

- GKD selector syntax: https://gkd.li/guide/selector
- GKD node attributes and methods: https://gkd.li/guide/node
- GKD selector examples: https://gkd.li/guide/example
- GKD query optimization: https://gkd.li/guide/optimize
