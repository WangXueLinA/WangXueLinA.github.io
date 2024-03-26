---
toc: content
title: webComponent
---

# WebComponent

## 介绍

w3c 提出浏览器应该原生去支持组件的一个标准，由于 react, vue, angular 框架各自提出自己的组件，组件化成为一种趋势，也因为业务逐渐繁杂，我们也需要将 dom，js，css 的组合变成一个通用的组件，所以就想要制定原生的一套规范。+

详细描述 mdn: https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components

## 特性

1. Custom Elements（自定义元素）：是 Web 标准中的一项功能，它允许开发者自定义新的 HTML 元素，开发者可以使用 JavaScript 和 DOM API，使新元素具有自定义的行为和功能
2. Shadow DOM： 它可以将一个隐藏的、独立的 DOM 附加到一个元素上
3. HTML template（HTML 模板）： `<template>` 和 `<slot>` 元素使你可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

![](/images/webComponent/image1.png)
[demo 演示](https://stackblitz.com/edit/stackblitz-starters-xnvmfl?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

这就是我们生成一个比较简单的自定义标签了，我们可以看到页面上生成的 shadow-root 这个元素，它比较特别，它内部是一个隔离的环境，声明的样式跟 js 影响不到外面的

比如：

![](/images/webComponent/image2.png)
[demo 样式隔离演示](https://stackblitz.com/edit/stackblitz-starters-sjr7ur?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

可以看出我们在里面写的 div 样式并不会影响到外部

[点击事件](https://stackblitz.com/edit/stackblitz-starters-dhtqgz?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)
