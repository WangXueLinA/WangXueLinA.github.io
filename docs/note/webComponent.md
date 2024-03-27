---
toc: content
title: webComponent
group: 微前端
---

# WebComponent

## 介绍

w3c 提出浏览器应该原生去支持组件的一个标准，由于 react, vue, angular 框架各自提出自己的组件，组件化成为一种趋势，也因为业务逐渐繁杂，我们也需要将 dom，js，css 的组合变成一个通用的组件，所以就想要制定原生的一套规范，可以在 html 中显示我们自定义的标签。

详细描述 mdn: https://developer.mozilla.org/zh-CN/docs/Web/API/Web_components

## 特性

1. Custom Elements（自定义元素）：是 Web 标准中的一项功能，它允许开发者自定义新的 HTML 元素，开发者可以使用 JavaScript 和 DOM API，使新元素具有自定义的行为和功能
2. Shadow DOM： 它可以将一个隐藏的、独立的 DOM 附加到一个元素上
3. HTML template（HTML 模板）： `<template>` 和 `<slot>` 元素使你可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。

### 自定义元素

![](/images/webComponent/image1.png)
demo: [demo 演示](https://stackblitz.com/edit/stackblitz-starters-xnvmfl?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

这就是我们生成一个比较简单的自定义标签了，我们可以看到我们自定义的标签其实是继承了 HTMLElement 对象的实例上的，其实所有的 HTML 元素都是 HTMLElement 对象的实例。然后开启 ShadowRoot 的 mode 为 open 开启(close 为关闭), 在 ShadowRoot 内部的创建 DOM 树。通过`<slot>` 元素占位符可以在后期使用自己的标记语言填充，最后再通过 Window 对象上的一个只读 customElements 属性的 define()方法定义和注册的自定义元素。

customElements.define ()方法的第一个参数是要创建的新元素的标签名称。这个参数用于指定自定义元素的名称，<font color="red">必须以小写字母开头，包含一个连字符</font>，第二个参数通常是一个继承了 HTMLElement 的类

### Shadow DOM

DOM 编程模型令人诟病的一个方面就是缺乏封装，不同组件之间的逻辑和样式很容易互相污染。

鉴于这个原因，Web components 的一个重要属性就是封装——可以将标记结构、样式和行为隐藏起来，并与页面上的其他代码相隔离。其中，Shadow DOM 接口是关键所在，它可以将一个隐藏的、独立的 DOM 附加到一个元素上

Shadow DOM 是 DOM nodes 的附属树。这种 Shadow DOM 子树可以与某宿主元素相关联，但并不作为该元素的普通子节点，而是会形成其自有的作用域；Shadow DOM 中的根及其子节点也不可见。

相比于以前为了实现封装而只能使用 `<iframe>` 实现的情况，Shadow DOM 无疑是一种更优雅的创建隔离 DOM 树的方法。

demo: [样式隔离 demo1](https://stackblitz.com/edit/stackblitz-starters-sjr7ur?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image2.png)

可以看出我们在里面写的 div 样式并不会影响到外部，而且不仅仅是里面的样式影响不到外面，外面的样式也影响不到里面,不仅仅是样式，shadow 中的 div 不能被外面的全局的 js 所获取到，里面的也不能获取外面的

demo: [样式隔离 demo2](https://stackblitz.com/edit/stackblitz-starters-zpriuk?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image3.png)

### HTML Template

- `<template>` 标签可以用来定义一个 HTML 模板，这个模板中的内容不会直接渲染到页面上，而是在运行时通过 JavaScript 动态实例化。以下是一个简单示例，展示了如何在 HTML 中定义一个模板，并在 JavaScript 中将其内容克隆到 DOM 中：

demo:[template](https://stackblitz.com/edit/stackblitz-starters-6bk5rb?description=HTML/CSS/JS%20Starter&file=script.js,styles.css,index.html%3AL58-L58&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image7.png)

- `<slot>`使用模版我们只能传递一些文本变量，这很有局限性，于是 Web Components 引入了`<slot>`（插槽）的概念来增加编码的灵活度。
  我们可以使用 slot 来实现基于模版的部分自定义内容（标签、样式）的渲染，slot 插槽需要在 Shadow DOM 里才能生效。

  demo:[slot](https://stackblitz.com/edit/stackblitz-starters-uktw6w?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image8.png)

## 生命周期

- connectedCallback：当自定义元素第一次被连接到文档 DOM 时被调用。
- disconnectedCallback：当自定义元素与文档 DOM 断开连接时被调用。
- adoptedCallback：当自定义元素被移动到新文档时被调用。
- attributeChangedCallback：当自定义元素的一个属性被增加、移除或更改时被调用。

## 属性传递

### HTML 属性传递

这是最直接的方式，可以通过修改 HTML 模板来实现。例如，创建一个自定义元素`<my-div title="hello"></my-div>`，其中 title 就是传递给组件的属性，组件内部可以通过访问这个属性来获取数据

demo: [通过属性传递数据](https://stackblitz.com/edit/stackblitz-starters-eyfhw3?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image4.png)

### JSON.stringify 处理复杂类型数据

当需要传递包含对象、数组等复杂类型的数据时，可以先使用 JSON.stringify()方法将这些复杂数据转化为字符串，然后再通过属性传递。接收方接收到字符串后，再使用 JSON.parse()方法将其转换回原始数据格式

demo: [JSON.stringify 处理复杂类型数据](https://stackblitz.com/edit/stackblitz-starters-ruk89u?description=HTML/CSS/JS%20Starter&file=index.html%3AL15&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image5.png)

### 动态属性监听

如果希望自定义元素能够响应属性更改，可以重写 attributeChangedCallback 方法，这是一个生命周期回调方法，当元素的任意属性发生变化时会被调用。

demo: [点击事件](https://stackblitz.com/edit/stackblitz-starters-dhtqgz?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/gif1.gif)

## css 穿透

上面我们提到了 shadow Root，是完全隔离外部的 css 跟 js 的，为啥还会有 css 传递这一说呢？

有一种场景，就是我们切换主题样式改变整个页面的主题风格

我们可以利用如:root 在 CSS 中是一个伪类选择器，它代表的是整个文档的根元素。在 HTML 文档中，根元素始终是`<html>`标签。使用:root 选择器可以为整个文档设置全局的 CSS 变量（CSS Custom Properties）和样式规则，这些变量和规则可以被文档内的任何元素所继承或参考

例如：

```js
:root {
  --primary-color: #ff0000; /* 定义一个全局CSS变量 */
  font-size: 16px; /* 设置全局字体大小 */
}
```

在此例中，`--primary-color` 变量在整个 HTML 文档范围内都是可用的，而 font-size 样式将应用于整个文档的基础字体大小。任何子元素都可以通过 `var(--primary-color)`来引用这个颜色变量，从而保持样式的一致性与可维护性。同时，全局的字体大小设定会影响到所有没有明确设置字体大小的元素。

利用这一特性，我们就可以进行样式穿透

demo: [css 样式穿透](https://stackblitz.com/edit/stackblitz-starters-q3dpnh?description=HTML/CSS/JS%20Starter&file=index.html&terminalHeight=10&title=Static%20Starter)

![](/images/webComponent/image6.png)

## React 中使用

在 React 中使用 Web Components 时，你可以直接在 React 组件中像使用普通 HTML 元素那样引用自定义元素（即 Web Components）。这是因为 React 允许你将任何有效的 DOM 元素作为 JSX 渲染，包括自定义元素。

例子：
首先，我们假设已经有了一个简单的 Web Component，比如 MyCounter，它可以增加计数并在页面上显示：

```js
// 自定义Web Component的定义（通常在一个单独的.js文件中）
class MyCounter extends HTMLElement {
  constructor() {
    super();
    this.count = 0;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        #counter {
          font-size: 2em;
        }
      </style>
      <button id="increment">Increment</button>
      <span id="counter">0</span>
    `;
    this.incrementBtn = this.shadowRoot.querySelector('#increment');
    this.counterDisplay = this.shadowRoot.querySelector('#counter');
  }

  connectedCallback() {
    this.incrementBtn.addEventListener('click', () => this.increment());
  }

  increment() {
    this.count++;
    this.counterDisplay.textContent = this.count;
  }
}

customElements.define('my-counter', MyCounter);
```

接下来，在 React 组件中，我们可以使用 useRef Hook 来访问并控制这个 Web Component：

```js
import React, { useRef, useEffect } from 'react';

function ReactWebComponentExample() {
  // 创建一个ref来保存Web Component实例
  const counterRef = useRef(null);

  // 在React组件中模拟点击按钮增加计数
  const handleClick = () => {
    if (counterRef.current) {
      // 调用Web Component的方法（如果存在）
      counterRef.current.increment();
    }
  };

  // 使用Web Component
  return (
    <div>
      <button onClick={handleClick}>Increment from React</button>
      {/* 将ref绑定到Web Component */}
      <my-counter ref={counterRef} />
    </div>
  );
}

export default ReactWebComponentExample;
```

我们创建了一个 useRef 来存储`<my-counter>`组件的实例。
定义了一个 React 的 handleClick 函数，当点击“Increment from React”按钮时，它会尝试调用 Web Component 的 increment 方法（假设这个方法暴露给了外部调用）。
在 JSX 中，我们将 counterRef 传递给`<my-counter>`组件作为 ref 属性，这样当组件挂载后，ref 对象的.current 属性就会指向 Web Component 的真实 DOM 节点。

demo: [react 中使用 web Component](https://stackblitz.com/edit/vitejs-vite-uc117z?file=index.html,src%2FApp.tsx&file=index.html&terminal=dev)

![](/images/webComponent/gif2.gif)

## 第三方库

### Lit

[Lit](https://lit.dev/) 是 Google 出品的一个用于构建快速、轻量级的 Web Components 库。Lit 的核心是一个消除样板代码的组件基类，它提供 reactive state、 scoped styles 和一个小巧、快速、且富有表现力的 declarative template system。我们可以基于这个库来实现 semi design 那样的组件库。

## 对比其他框架

### 优势

- 跨框架/库兼容性：由于 Web Components 是原生浏览器 API，它们能够在不同框架之间共享和复用，实现最大程度的兼容性。
- 原生支持：不需要额外引入大型框架，降低了项目体积，理论上提高了性能，并减少了对框架特定版本升级带来的维护成本。
- 封装性：Web Components 提供了 Shadow DOM，能够实现样式和行为的良好封装，防止全局样式污染和内部实现细节泄露。
- 自定义元素：允许开发者自定义新的 HTML 标签，使得组件更加语义化且易于理解。
- 标准化：不受单一供应商或框架的影响，具有更好的持久性和稳定性，未来有望得到所有主流浏览器的广泛支持。

### 缺点

- 成熟度和生态：尽管 Web Components 是一项标准，但在实际开发中，现代前端框架拥有更成熟的生态系统和丰富的第三方组件库。
- 开发便利性：相对于 React、Vue 等框架提供的便捷的数据绑定、状态管理、虚拟 DOM、生命周期钩子等功能，Web Components 的开发体验可能不够直观和高效。
- 数据绑定：Web Components 的数据绑定机制不如某些框架自动化，通常需要手动处理属性绑定和事件监听。
- 抽象层次：现代框架提供了更多高级抽象层，比如 React 的函数式编程模型和 Vue 的响应式系统，简化了许多复杂任务。
- 工具链支持：框架通常配有强大的构建工具、热重载、类型检查等工具链支持，而 Web Components 在开发过程中可能需要搭配其他工具才能获得类似的功能。
