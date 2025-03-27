---
title: link/import
toc: content
---

# css

## link 与 import 区别

### 语法

`<link>` 标签是 HTML 标签，需放置在 HTML 的 `<head>` 中。

```html
<link rel="stylesheet" href="style.css" />
```

@import 规则是 CSS 语法，只能在 CSS 文件或 `<style>` 标签内使用。

```css
@import url('another.css');
```

### 加载机制

`<link>` 标签：

- 并行加载：浏览器会并行下载 link 引入的资源，减少页面阻塞时间。
- 渲染阻塞：CSS 文件的加载会阻塞页面渲染，但浏览器会尽早处理，优化体验。

@import 规则：

- 串行加载：需等待父 CSS 文件下载并解析后，才发现 @import 的资源，导致额外 HTTP 请求和延迟。
- 潜在性能问题：多个 @import 可能导致加载顺序不可控，延长整体加载时间。

### 兼容性

`<link>` 标签：所有浏览器（包括旧版 IE）均支持。

@import 规则：不支持 IE5 以下，现代浏览器支持良好，但在需要兼容老旧环境时需谨慎。

### DOM 操作与动态控制

`<link>` 标签：

可通过 JavaScript 动态插入或修改，例如：

```javascript
const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'dynamic.css';
document.head.appendChild(link);
```

@import 规则：无法通过 JavaScript 直接操作，灵活性较低。

<BackTop></BackTop>
<SplashCursor></SplashCursor>
