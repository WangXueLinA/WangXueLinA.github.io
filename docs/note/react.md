---
toc: content
title: React Class
group: 框架
---

# React

## JSX

一个 JSX 语法的示例，如下所示

```js
const element = <h1>Hello, world!</h1>;
```

这种语法形式，既不是 HTML，也不是字符串，而是称之为 JSX，是 React 里用来描述 UI 和样式的语法，JSX 最终会被编译为合法的 JS 语句调用（编译器在遇到`{`时采用 JS 语法进行解析，遇到`<`就采用 HTML 规则进行解析）

JSX 实质通过 babel 编译，而 babel 实际上把 JSX 编译给`React.createElement()`调用。

```js
const element = <h1 className="greeting">Hello, world!</h1>;
```

是等同于以下的语句的

```js
const elem = React.createElement(
  'h1',
  { className: 'greeting' },
  'Hello, world!',
);
```

React.createElement()方法会首先进行一些避免 BUG 的检查，然后返回类似以下例子的对象：

```js
const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world',
  },
};
```

## Diff 算法

React 是基于 vdom 的前端框架，组件 render 产生 vdom，然后渲染器把 vdom 渲染出来。
state 更新的时候，组件会重新 render，产生新的 vdom，在浏览器平台下，为了减少 dom 的创建，React 会对两次的 render 结果做 diff，尽量复用 dom，提高性能。

![](/images/react/image4.jpg)

一句话总结虚拟 DOM 就是一个用来描述真实 DOM 的 javaScript 对象

Diff 算法是虚拟 DOM 技术的核心，其目的是为了高效地找出虚拟 DOM 树变化的部分，并将这些变化应用到真实 DOM 上，从而避免不必要的 DOM 操作，提升性能。

### React 16 前

Diff 算法基本步骤

- 树的遍历比较：从根节点开始，递归比较两棵树的节点，直到叶子节点。

![](/images/react/image1.jpg)

只有删除、创建操作，没有移动操作

![](/images/react/image2.jpg)

react 发现新树中，R 节点下没有了 A，那么直接删除 A，在 D 节点下创建 A 以及下属节点
上述操作中，只有删除和创建操作

- 节点的类型比较：如果新旧节点的类型不同，直接替换整个节点。
- 节点的属性比较：如果节点类型相同，对比它们的属性是否有变化，如有变化则更新属性。
- 子节点的比较：递归地对子节点进行上述过程，同时利用“key”属性来优化列表的更新逻辑，确保元素的正确对应和移动。

![](/images/react/image3.jpg)

通过 key 可以准确地发现新旧集合中的节点都是相同的节点，因此无需进行节点删除和创建，只需要将旧集合中节点的位置进行移动

### React 16 后

React 16 以前递归对比虚拟 DOM 树的方案有一个明显的问题：阻塞主线程。旧的 React 架构中，Diff 算法和组件更新都是同步执行的。这意味着一旦更新开始，React 会一直占用主线程直到整个更新过程完成。在这期间，浏览器无法响应用户操作，导致界面卡顿，尤其是在执行大规模的 DOM 更新时。

![](/images/react/image5.jpg)

React 16 为了优化性能，会先把虚拟 DOM 树转换成 Fiber，也就是从树转换成链表，再基于 Fiber 进行渲染。这个过程分成两个阶段：

- reconcile（可中断） ：从虚拟 DOM 转换成 Fiber，并给需要操作的节点打上标记。
- commit（不可中断） ：对有标记的 Fiber 节点进行操作。

Fiber 架构通过将渲染工作划分为小的、可管理的单元，使得 React 能够更好地利用浏览器的主线程，并提供更流畅的用户体验。

#### 创建 fiber

第一次渲染不需要 Diff，直接将虚拟 Dom 转为 Fiber。

![](/images/react/image7.jpg)

#### 更新 fiber

再次渲染的时候，就需要更新 Fiber 了。这一步的关键是：**<span style='color: red'>尽可能复用</span>**，尽可能复用旧的 Fiber(这里举例的旧 fiber 是我们上图第一次创建的 fiber)，来生成本次的 Fiber。

![](/images/react/image8.jpg)

具体的实现方法为两次遍历

**第一次遍历**

- 方法是对比 vdom 和老的 fiber，复用<span style='color: red'>位置和内容都相同</span>的结点。如果可以复用就处理下一个节点，否则就结束遍历。

- 如果所有的新的 vdom 都处理完了，那就把剩下的老 fiber 节点删掉就行。

- 如果还有 vdom 没处理，那就进行第二次遍历：

如上图，相比初始的 Fiber，A、B、C 都是完全没变的，直接复用，再往下走原本是 E，但现在变成了 D，发现不能复用，直接返回，然后来到第二次遍历。

**第二次遍历**

把剩下的内容填上，方法是先把剩余的旧 Fiber 结点做成一个 Map，key 就是节点的 key，然后遍历新 DOM 树，构建新 Fiber 的时候查查 Map，能复用就复用，用不了就新建。

如上图，构建 D、F、H 的时候发现旧 Fiber 里有，那么可以拿过来复用，M 以前没有，那就新建一个。

第二轮遍历完了之后，把剩余的老 fiber 删掉，剩余的 vdom 新增。

## React 的事件机制

React 基于浏览器的事件机制自身实现了一套事件机制，包括事件注册、事件的合成、事件冒泡、事件派发等
在 React 中这套事件机制被称之为合成事件

### 合成事件

合成事件是 React 模拟原生 DOM 事件所有能力的一个事件对象，即浏览器原生事件的跨浏览器包装器
根据 W3C 规范来定义合成事件，兼容所有浏览器，拥有与浏览器原生事件相同的接口，例如：

```js
<button onClick={handleClick}>按钮</button>
```

如果想要获得原生 DOM 事件，可以通过 e.nativeEvent 属性获取

```js
<button onClick={(e) => console.log(e.nativeEvent)}>按钮</button>
```

从上面可以看到 React 事件和原生事件也非常的相似，但也有一定的区别

```js

● 事件名称命名方式不同

// 原生事件绑定方式
<button onclick="handleClick()">按钮命名</button>

// React 合成事件绑定方式
<button onClick={handleClick}>按钮命名</button>


● 事件处理函数书写不同

// 原生事件 事件处理函数写法
<button onclick="handleClick()">按钮命名</button>

// React 合成事件 事件处理函数写法
<button onClick={handleClick}>按钮命名</button>
```

关于 React 合成事件与原生事件执行顺序，可以看看下面一个例子

```js
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.parentRef = React.createRef();
    this.childRef = React.createRef();
  }

  componentDidMount() {
    console.log('React componentDidMount！');

    this.parentRef.current?.addEventListener('click', () => {
      console.log('原生事件：父元素 DOM 事件监听！');
    });

    this.childRef.current?.addEventListener('click', () => {
      console.log('原生事件：子元素 DOM 事件监听！');
    });

    document.addEventListener('click', (e) => {
      console.log('原生事件：document DOM 事件监听！');
    });
  }

  parentClickFun = () => {
    console.log('React 事件：父元素事件监听！');
  };

  childClickFun = () => {
    console.log('React 事件：子元素事件监听！');
  };

  render() {
    return (
      <div ref={this.parentRef} onClick={this.parentClickFun}>
        <div ref={this.childRef} onClick={this.childClickFun}>
          分析事件执行顺序
        </div>
      </div>
    );
  }
}
export default App;
```

输出代码为顺序为

```
原生事件：子元素 DOM 事件监听！
原生事件：父元素 DOM 事件监听！
React 事件：子元素事件监听！
React 事件：父元素事件监听！
原生事件：document DOM 事件监听！
```

可以得出以下结论：

- React 所有事件都挂载在 document 对象上
- 当真实 DOM 元素触发事件，会冒泡到 document 对象后，再处理 React 事件
- 所以会先执行原生事件，然后处理 React 事件
- 最后真正执行 document 上挂载的事件

![](/images/react/image9.png)

所以想要阻止不同时间段的冒泡行为，对应使用不同的方法，对应如下：

- 阻止合成事件间的冒泡，用 e.stopPropagation()
- 阻止合成事件与最外层 document 上的事件间的冒泡，用 e.nativeEvent.stopImmediatePropagation()
- 阻止合成事件与除最外层 document 上的原生事件上的冒泡，通过判断 e.target 来避免

React 事件机制总结如下：

- React 上注册的事件最终会绑定在 document 这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
- React 自身实现了一套事件冒泡机制，所以这也就是为什么我们 event.stopPropagation()无效的原因。
- React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
- React 有一套自己的合成事件

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
