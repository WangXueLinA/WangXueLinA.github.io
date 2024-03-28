---
toc: content
title: css
---

# css

## 盒子居中

### flex

https://codesandbox.io/p/sandbox/he-zi-ju-zhong-flex-6nzdx6?file=%2Findex.html%3A3%2C16

https://juejin.cn/post/6905921139164315661#heading-2

## 相对定位，绝对定位

relative： 占位不脱标，相对于自身在原文档流中位置，不改变元素大小
absoulte: 脱标不占位，参照上级或者上上级有无定位，没有则根据 body 元素定位，改变元素大小，不设置宽高，依赖内容决定

## display 的 block、inline 和 inline-block 的区别

- block：会独占一行，多个元素会另起一行，可以设置 width、
  height、margin 和 padding 属性；
- inline：元素不会独占一行，设置 width、height 属性无效。
  但可以设置水平方向的 margin 和 padding 属性，不能设置垂直方向
  的 padding 和 margin；
- inline-block：将对象设置为 inline 对象，但对象的内容作为
  block 对象呈现，之后的内联对象会被排列在同一行内

## link 和@import 的区别

两者都是外部引用 CSS 的方式，它们的区别如下：

- link 是 XHTML 标签，除了加载 CSS 外，还可以定义 RSS 等其他事务；
- @import 属于 CSS 范畴，只能加载 CSS。

  link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完
  全载入以后加载。

  link 是 XHTML 标签，无兼容问题；@import 是在 CSS2.1 提出的，低
  版本的浏览器不支持。

  link 支持使用 Javascript 控制 DOM 去改变样式；而@import 不支持

## CSS 布局单位

常用的布局单位包括像素（px），百分比（%），em，rem，vw/vh。

- 像素（px）是页面布局的基础，一个像素表示终端（电脑、手
  机、平板等）屏幕所能显示的最小的区域，像素分为两种类型：CSS
  像素和物理像素：
  CSS 像素：为 web 开发者提供，在 CSS 中使用的一个抽象单位；
  物理像素：只与设备的硬件密度有关，任何设备的物理像素都是固定
  的。
- 百分比（%），当浏览器的宽度或者高度发生变化时，通过百分
  比单位可以使得浏览器中的组件的宽和高随着浏览器的变化而变化，
  从而实现响应式的效果。一般认为子元素的百分比相对于直接父元素。
- em 和 rem 相对于 px 更具灵活性，它们都是相对长度单位，它
  们之间的区别：em 相对于父元素，rem 相对于根元素。
  em： 文本相对长度单位。相对于当前对象内文本的字体尺寸。如果
  当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体
  尺寸(默认 16px)。(相对父元素的字体大小倍数)。
  rem： rem 是 CSS3 新增的一个相对单位，相对于根元素（html 元素）
  的 font-size 的倍数。作用：利用 rem 可以实现简单的响应式布局，
  可以利用 html 元素中字体的大小与屏幕间的比值来设置 font-size
  的值，以此实现当屏幕分辨率变化时让元素也随之变化。
- vw/vh 是与视图窗口有关的单位，vw 表示相对于视图窗口的宽
  度，vh 表示相对于视图窗口高度，除了 vw 和 vh 外，还有 vmin 和 vmax
  两个相关的单位。

- vw：相对于视窗的宽度，视窗宽度是 100vw
- vh：相对于视窗的高度，视窗高度是 100vh；

vw/vh 和百分比很类似，两者的区别：

- 百分比（%）：大部分相对于祖先元素，也有相对于自身的情况比如
  (border-radius、translate 等)
- vw/vm：相对于视窗的尺寸

## BFC 的理解，如何创建 BFC

先来看两个相关的概念：
Box: Box 是 CSS 布局的对象和基本单位，⼀个⻚⾯是由很多个 Box
组成的，这个 Box 就是我们所说的盒模型。

Formatting context：块级上下⽂格式化，它是⻚⾯中的⼀块渲染区
域，并且有⼀套渲染规则，它决定了其⼦元素将如何定位，以及和其
他元素的关系和相互作⽤。

块格式化上下文（Block Formatting Context，BFC）是 Web 页面的
可视化 CSS 渲染的一部分，是布局过程中生成块级盒子的区域，也是
浮动元素与其他元素的交互限定区域。

通俗来讲：BFC 是一个独立的布局环境，可以理解为一个容器，在这
个容器中按照一定规则进行物品摆放，并且不会影响其它环境中的物
品。如果一个元素符合触发 BFC 的条件，则 BFC 中的元素布局不受外
部影响。

创建 BFC 的条件：

- 根元素：body；
- 元素设置浮动：float 除 none 以外的值；
- 元素设置绝对定位：position (absolute、fixed)；
- display 值为：inline-block、table-cell、table-caption、flex 等；
- overflow 值为：hidden、auto、scroll；

BFC 的特点：

- 垂直方向上，自上而下排列，和文档流的排列方式一致。
- 在 BFC 中上下相邻的两个容器的 margin 会重叠
- 计算 BFC 的高度时，需要计算浮动元素的高度
- BFC 区域不会与浮动的容器发生重叠
- BFC 是独立的容器，容器内部元素不会影响外部元素
- 每个元素的左 margin 值和容器的左 border 相接触

BFC 的作用

- 解决 margin 的重叠问题：由于 BFC 是一个独立的区域，内部的元素
  和外部的元素互不影响，将两个元素变为两个 BFC，就解决了 margin
  重叠的问题。
- 解决高度塌陷的问题：在对子元素设置浮动后，父元素会发生高度塌
  陷，也就是父元素的高度变为 0。解决这个问题，只需要把父元素变
  成一个 BFC。常用的办法是给父元素设置 overflow:hidden。
  创建自适应两栏布局：可以用来创建自适应两栏布局：左边的宽度固
  定，右边的宽度自适应。
