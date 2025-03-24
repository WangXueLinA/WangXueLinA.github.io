---
title: CSS 布局单位
toc: content
---

# css

## CSS 布局单位

### px (像素)

特点：与设备像素相关，但现代浏览器中会根据屏幕密度自动缩放。

使用场景：固定尺寸元素（如图标、边框）、需要精确控制尺寸时。

```less
.icon {
  width: 24px; /* 固定大小的图标 */
  height: 24px;
  border: 1px solid #333; /*  边框始终 1 像素 */
}
```

### em

特点：相对于当前元素的字体大小（若自身未设置，则继承父元素）。

使用场景：与字体大小相关的布局（如段落缩进、按钮内边距）。

示例：

```less
.text {
  font-size: 16px;
  padding: 1em; /* 16px × 1 = 16px */

  .child {
    font-size: 0.5em; /* 继承父元素字体，16px × 0.5 = 8px */
  }
}
```

### rem

特点：相对于根元素（`<html>`）的字体大小。

使用场景：全局布局（如间距、容器尺寸），避免嵌套导致的尺寸混乱。

```less
html {
  font-size: 16px; /* 1rem = 16px */
}
.container {
  padding: 2rem; /* 32px */
  margin: 1rem; /* 16px */
}
```

### % (百分比)

特点：相对于父元素的对应属性值。

使用场景：流式布局（如响应式图片、栅格系统）。

```less
.parent {
  width: 600px;
}
.child {
  width: 50%; /* 300px */
  height: 50%; /* 需父元素有明确高度, 不然无效由自身内容撑开 */
}
```

### vw / vh (视口单位)

特点：相对于 视口宽度（1vw = 视口宽度的 1%）或视口高度。视窗宽度是 100vw，视窗高度是 100vh。

使用场景：全屏布局（如背景图、弹层）、响应式字体。

```less
.fullscreen-banner {
  width: 100vw; /* 占满视口宽度 */
  height: 50vh; /* 视口高度的50% */
}
h1 {
  font-size: 5vw; /* 字体随视口宽度缩放 */
}
```

### vmin / vmax

特点：相对于 视口较小尺寸（vmin）或较大尺寸（vmax）的 1%。

使用场景：适配移动端横竖屏（如正方形元素）。

```less
.square {
  width: 50vmin; /* 视口较小边的50% */
  height: 50vmin; /* 确保始终为正方形 */
}
```

### fr (Grid 弹性单位)

特点：CSS Grid 布局专用，表示剩余空间的分配比例。

使用场景：网格布局中的弹性列/行。

```less
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr; /* 第二列是第一列的两倍宽 */
}
```

<BackTop></BackTop>
