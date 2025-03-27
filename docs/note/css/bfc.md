---
title: BFC
toc: content
---

# css

## BFC

### 定义

BFC 是一个独立的渲染区域，内部元素的布局不会影响外部元素，同时外部元素的布局也不会影响内部。这意味着，在一个 BFC 中，浮动元素、清除浮动、边距塌陷等问题都会被限制在这个上下文中解决，而不影响其他部分的布局。

通俗来讲：BFC 是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外部影响。

### 触发方式

以下情况会自动创建一个新的 BFC：

- 根元素（HTML 文档的元素）。
- float 属性不为 none 的元素。
- position 属性为 absolute 或 fixed 的元素。
- display 属性为 inline-block、table-cell、table-caption、flow-root、或者 flex、grid 的元素。
- overflow 属性不为 visible 的元素（hidden、auto、scroll）。

### 特点

- 浮动隔离：在 BFC 内部，浮动元素会被包含在这个上下文中，不会溢出影响到外部的元素。
- 阻止外边距折叠：相邻两个 BFC 之间的垂直外边距不会折叠，而是以较大的外边距为准。
- 包含浮动：BFC 可以包含其内部浮动元素，使得父元素能够根据其浮动子元素自动扩展高度，实现清除内部浮动的效果。
- 独立的行框上下文：BFC 中的元素与外部元素互不影响，行内盒会在该上下文中单独排列。

### 应用场景

- 清除浮动：利用 BFC 可以自然地包含浮动元素，避免父容器高度塌陷。

<ImagePreview src="/images/css/image1.jpg"></ImagePreview>

解决方案： 为父容器创建 BFC

<ImagePreview src="/images/css/image2.jpg"></ImagePreview>

- 防止外边距折叠：当需要相邻元素的外边距保持独立时，可以将它们放在不同的 BFC 中。

<ImagePreview src="/images/css/image3.jpg"></ImagePreview>

解决方案： 可以将其中一个元素设置成 BFC 区域，使它两个独立的容器互不影响

<ImagePreview src="/images/css/image4.jpg"></ImagePreview>

还有一个解决方案就是给一个元素设置为`display: inline-block` ，无需像上面多套一层父元素

- 防止浮动重叠：利用 BFC 区域不会与浮动容器发生重叠

<ImagePreview src="/images/css/image5.jpg"></ImagePreview>

解决方案：要自适应两栏效果，使右边盒子成为 BFC 区域

<ImagePreview src="/images/css/image6.jpg"></ImagePreview>

### 注意事项

- 一个元素不能同时属于两个 BFC，每个元素只能属于一个最近的 BFC。
- BFC 是 CSS 视觉渲染的一部分，它的存在主要是为了解决布局中由于浮动等特性引起的问题，提高布局的灵活性和可预测性。

<BackTop></BackTop>
<SplashCursor></SplashCursor>
