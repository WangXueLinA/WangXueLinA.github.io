---
title: css3
---

# css

## css3 优势

### 强大的选择器

新增多种选择器，更精准地定位元素：

- 属性选择器：input[type="text"]
- 伪类选择器：:nth-child(n)、:not(.class)
- 状态伪类：:checked、:disabled
- 目标伪类：:target（匹配 URL 锚点元素）

### 视觉效果增强

无需依赖图片即可实现复杂效果：

- 圆角：border-radius
- 阴影：box-shadow、text-shadow
- 渐变：linear-gradient()、radial-gradient()
- 背景控制：多背景图、background-size 调整尺寸

### 动画与过渡

过渡（Transitions）：平滑的属性变化（如悬停效果）

```css
.box {
  transition: all 0.3s ease-in;
}
```

关键帧动画（Animations）：通过 @keyframes 定义复杂动画序列

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
```

### 响应式设计支持

媒体查询：根据设备特性（屏幕宽度、分辨率等）适配样式

```css
@media (max-width: 768px) {
}
```

### 弹性布局与网格布局

Flex：一维布局模型，轻松实现垂直居中、自适应排列

```css
.container {
  display: flex;
  justify-content: center;
}
```

Grid：二维布局系统，复杂页面结构更易实现

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

## 相对定位/绝对定位

- relative：占位不脱标，相对于自身在原文档流中位置，不改变元素大小
- absoulte：脱标不占位，参照上级或者上上级有无定位，没有则根据 body 元素定位，改变元素大小，不设置宽高，依赖内容决定

## block/inline/inline-block

- block：会独占一行，多个元素会另起一行，可以设置 width、height、margin 和 padding 属性。
- inline：元素不会独占一行，设置 width、height 属性无效。但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向的 padding 和 margin。
- inline-block：将对象设置为 inline 对象，但对象的内容作为 block 对象呈现，之后的内联对象会被排列在同一行内。

## 浏览器的渲染机制

1. 浏览器发出一个请求，向服务器请求一个页面
2. 服务器返回响应，响应的内容是字符串（html 文档）
3. 浏览器对字符串进行解析

   **解析 HTML，构建 DOM 树：**

   当浏览器接收到服务器返回的 HTML 文档后，首先由 HTML 解析器（也称作 HTML 解析器）读取文档内容，将 HTML 代码解析成一系列的 DOM（Document Object Model）节点，这些节点以树状结构（DOM 树）的形式存在，代表了文档的结构。

   **解析 CSS，构建 CSSOM 树：**

   同时，CSS 解析器会解析外部 CSS 文件和内联样式，将 CSS 规则转换成 CSSOM（CSS Object Model）树。CSSOM 树表示了 CSS 规则的层次关系和优先级。

   **合并 DOM 树和 CSSOM 树，生成 Render Tree（渲染树）：**

   接下来，浏览器会将 DOM 树和 CSSOM 树合并，形成 Render Tree。在这个过程中，不可见的元素（如 display:none）和与渲染无关的元素（如 head 中的元素）不会被加入到 Render Tree 中。Render Tree 包含了可见元素的布局信息和样式信息

   **布局：**

   在生成 Render Tree 之后，浏览器开始计算每个节点在屏幕上的确切位置和大小，这一过程称为布局或重排。浏览器需要遍历 Render Tree 的每一个节点，根据其 CSS 属性计算其坐标、宽度、高度等几何信息。这是一个相对耗时的过程，尤其是在有大量元素或复杂布局的情况下

   **绘制：**

   最后，浏览器会使用 GPU（图形处理器）调用绘制操作，将布局好的各个节点绘制到屏幕上。这一阶段，浏览器会将 Render Tree 的每个节点转换成实际像素，这一步骤也称为光栅化（Rasterization）。绘制过程可以被进一步细分，部分浏览器会先将不同的渲染层（Layer）绘制到单独的内存区域（称为图层），然后通过合成操作将这些图层合并显示到屏幕上，以提高效率

## 浏览器的重排跟重绘

### 重排

重排，也称为回流，发生在以下几种情况中：

1. 页面首次加载：浏览器首次构建渲染树时，需要计算所有元素的几何位置和尺寸。
2. DOM 结构变化：添加、删除或修改 DOM 元素，比如插入一个新节点或删除一个现有节点，会导致其父元素及其后续元素的布局重新计算。
3. 元素尺寸变化：修改元素的宽度、高度、内外边距、边框宽度等，可能会影响其自身及周围元素的位置。
4. 样式更改：应用会影响布局的 CSS 属性，如 display、position、float 或 flex 属性的改变。
5. 计算样式请求：当 JavaScript 访问某些特定的样式信息（如 offsetWidth、getComputedStyle()）时，浏览器需要先完成布局计算以提供准确的值。
6. 窗口尺寸变化：用户调整浏览器窗口大小时，整个页面的布局需要重新计算。

### 重绘

重绘发生于页面元素的视觉外观需要更新，但不涉及布局变化时：

1. 颜色更改：修改元素的背景色、文字颜色等不会影响布局的样式属性。
2. 背景图片变化：改变元素的背景图片，只要它不影响元素的尺寸和位置。
3. 文本样式变化：调整字体样式（如大小、家族、粗细）但不导致尺寸变化。
4. 边框样式变化：改变不会影响布局的边框样式，如边框颜色或虚实线样式。
5. 伪类状态变化：如:hover、:active 状态的切换，可能导致元素视觉外观的变化。

<Alert>

- 重排通常会导致重绘：因为布局变化后，受影响的元素需要重新绘制。
- 性能影响：重排和重绘都是资源密集型操作，特别是重排，因为它需要重新计算布局。频繁或不必要的重排重绘会显著降低页面性能，增加 CPU 使用率，甚至造成页面卡顿。
- 优化策略：为了优化性能，开发者应尽量减少触发重排和重绘的操作，可以通过 CSS 动画代替 JavaScript 动画、合并样式修改、使用 `transform` 和 `opacity`（它们不会触发重排）进行动画、以及合理使用 `requestAnimationFrame` 等方法来实现。

</Alert>

<BackTop></BackTop>
