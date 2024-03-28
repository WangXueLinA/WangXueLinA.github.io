---
toc: content
title: React
group: 框架
---

# React

## React 事件和 HTML 事件

- 事件绑定与代理：在 HTML 中，事件处理器直接绑定到具体的 DOM 元素上。
  而在 React 中，事件不是直接绑定到实际的 DOM 节点上，而是通过 React 自身的合成事件系统（SyntheticEvent system）进行管理。React 会在顶层（通常是 document）设置一个事件监听器，然后通过事件委托的方式处理所有子元素的事件。这意味着，当你在 React 组件内声明一个事件处理器时，React 会在底层帮你把事件处理逻辑绑定到适当的 DOM 节点，并确保在事件冒泡到 document 时正确触发。

- 事件命名：HTML 事件使用全小写命名，例如 onclick、onmouseover 等。
  React 中的事件采用驼峰式命名（camelCase），例如 onClick、onMouseOver。

- 事件处理器：在 HTML 中，事件处理器通常作为字符串函数名或内联 JavaScript 代码来指定。
  在 React 中，事件处理器是一个明确的 JavaScript 函数引用，可以直接作为一个属性值传给组件。

- 默认行为阻止：在 HTML 中，可以简单地在事件处理器内部返回 false 来阻止事件的默认行为（例如点击链接跳转）。
  而在 React 中，阻止默认行为需要明确调用事件对象的 preventDefault() 方法。

- 合成事件：React 提供了一套跨浏览器的合成事件层，它对原生 DOM 事件进行了封装，确保了在各个浏览器中的表现一致性。这些合成事件对象模仿了 W3C 规范中的事件接口，但在所有浏览器中都能正常工作。

因此，React 的事件处理机制不仅简化了跨浏览器兼容性问题，还增强了性能，因为它减少了直接操作 DOM 的次数，并且能够更好地配合 React 的虚拟 DOM 和组件更新机制。同时，由于 React 的事件是在合成事件系统中统一调度的，所以在处理事件时需要注意避免原生事件与合成事件混合使用可能导致的问题，比如如果原生事件阻止了事件冒泡，那么依赖冒泡的合成事件可能无法正常执行。

## React 组件事件代理

React 并不直接将事件处理器（handler）绑定到每个特定的 DOM 元素上，而是采用了事件代理机制，即在组件渲染树的最外层（通常是 React 生成的实际 DOM 元素的容器）注册单一的事件监听器。当任何子元素触发事件时，事件会按照事件冒泡的顺序逐级向上传播至父元素，直至到达已注册监听器所在的顶层元素。

具体步骤如下：

1. 当你在 React 组件内编写如 onClick={this.handleClick}这样的事件处理器时，React 并不会立即将其绑定到 DOM 元素上。
2. 当组件渲染时，React 构建了一个虚拟 DOM 并最终同步到实际 DOM 中。在这个过程中，React 并没有为每个可交互的子元素单独绑定事件，而是将事件处理器“代理”到组件挂载到的最近的原生 DOM 节点上。
3. 当事件发生时，它首先在触发事件的子元素上触发，然后冒泡到父元素。React 的事件监听器捕获到这个冒泡事件后，能够根据事件的目标元素（event.target）判断哪个子元素真正触发了事件，并调用相应的事件处理器。
4. 合成事件对象（SyntheticEvent）会被传递给事件处理器，这个对象是对原生 DOM 事件的封装，提供了一致的 API，并且自动处理了一些兼容性问题。

通过这种方式，React 能够在不为每个子组件单独绑定事件的情况下，高效地处理大量子组件的事件，从而优化性能和内存使用。同时，由于 React 维护了一个事件处理器与组件实例之间的映射关系，所以事件处理器内的 this 上下文会被正确地绑定到组件实例上。

## 路由原理

在 React Router 中，几个关键组件如`<Router>`、`<Link>`和`<NavLink>`共同协作来实现在单页面应用（SPA）中的路由导航和视图切换。

- `<Router>`

在 React Router 中，`<Router>` 是整个路由系统的核心，它负责管理和监听浏览器的历史记录（history），并将当前 URL 与定义好的路由规则相匹配。通常，对于现代浏览器我们会使用

1. `<HashRouter>`，它基于 URL 的哈希部分（#）来模拟路由状态，当 window.location.hash 发生变化时，会触发 window.onhashchange 事件，React-Router 可以监听此事件并据此切换不同的路由组件。

```js
window.onhashchange = () => {
  console.log('监视到hash变化了');
};
```

2. `<BrowserRouter>`，它利用 HTML5 History API 来操作地址栏 URL，而无需刷新页面。通过 history.pushState()、history.replaceState() 方法可以直接修改浏览器的历史记录栈，并更新当前 URL，而不会导致页面刷新。同时，用户点击浏览器的前进/后退按钮或调用 history.go()、history.back()、history.forward() 时，会触发 window.onpopstate 事件，React-Router 通过监听这个事件来相应地切换路由。在 React-Router 中，需要对原生的 History API 进行封装或劫持，通过保存原生方法的引用，然后重写这些方法，在调用原生方法的同时执行额外的操作（例如触发路由更新等）。

```js
// 用户点击浏览器的前进/后退按钮或调用 history.go()、history.back()、history.forward() 时
window.addEventListener('popstate', () => {
  console.log('监视到popstate变化了');
});
```

```js
// react-router类似劫持 pushState
const rawPushState = window.history.pushState;
window.history.pushState = (...args) => {
  rawPushState.apply(window.history, args);
  console.log('监视到pushState变化了');
};

// react-router类似劫持 replaceState
const rawReplaceState = window.history.replaceState;
window.history.replaceState = (...args) => {
  rawReplaceState.apply(window.history, args);
  console.log('监视到replaceState变化了');
};
```

- `<Route>`

`<Route>`组件是实际定义路由映射的地方，它接收 path 属性，用于匹配特定的 URL 路径，并且当路径匹配时，会渲染关联的 component 属性指定的 React 组件。多个`<Route>`可以嵌套组合以构建复杂的路由结构。

- `<Link>`

`<Link>`组件是 React Router 提供的一个可点击的 UI 元素，它渲染成一个`<a>`标签，但内部处理了路由的逻辑。当用户点击这个链接时，React Router 会通过其内部使用的 history 库来更改当前 URL，而不是像传统的`<a>`标签那样直接发起 HTTP 请求。这样就能在不刷新页面的情况下切换到新的路由视图。

- `<NavLink>`

`<NavLink>`继承自`<Link>`，增加了样式激活的功能。当它指向的路由与当前活跃路由匹配时，可以通过 activeClassName 或 activeStyle 属性添加特殊的 CSS 类名或内联样式，以便在视觉上提示用户当前所在的位置。
总的来说，React Router 的工作流程是这样的：

1. 用户通过点击带有`<Link>`或`<NavLink>`的链接，或者通过程序调用 history.push 或 history.replace 方法改变 URL。
2. `<Router>`检测到 URL 变化后，将新 URL 与各个`<Route>`的 path 进行比较。
3. 当找到匹配的`<Route>`时，渲染相应的组件，从而完成视图的切换。在整个过程中，React Router 确保了视图的切换是平滑的，符合 SPA 的应用体验。
