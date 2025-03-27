---
toc: content
title: 介绍
order: -100
---

# Vue2

## 官网

> https://v2.cn.vuejs.org/v2/api/

## 安装

```bash
npm install vue@^2

vue create app-vue2 # 创建项目名

# CDN： <script src="https://cdn.jsdelivr.net/npm/vue@2.7.16/dist/vue.js"></script>
```

## 核心特性

1. 数据驱动（MVVM）

MVVM 表示的是 Model-View-ViewModel

- Model 模型层：(data 中的数据)负责处理业务逻辑以及和服务器端进行交互
- View 视图层：(模板代码)负责将数据模型转化为 UI 展示出来，可以简单的理解为 HTML 页面
- ViewModel 视图模型层：(Vue 实例)用来连接 Model 和 View，是 Model 和 View 之间的通信桥梁

<ImagePreview src="/images/vue2/image1.jpg"></ImagePreview>

它的主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据
  当然，它还有两个主要部分组成
- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

2. 组件化

在 Vue 中每一个.vue 文件都可以视为一个组件，

- 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
- 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
- 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

3. 指令系统

指令 (Directives) 是带有 v- 前缀的特殊属性作用：当表达式的值改变时，将其产生的连带影响，响应式地作用于 DOM
常用的指令

- 条件渲染指令 v-if
- 列表渲染指令 v-for
- 属性绑定指令 v-bind
- 事件绑定指令 v-on
- 双向数据绑定指令 v-model

没有指令之前我们是怎么做的？是不是先要获取到 DOM 然后在....干点啥

## Vue 和 React 对比

### 核心设计理念

| 维度     | Vue                | React                               |
| -------- | ------------------ | ----------------------------------- |
| 哲学     | 渐进式框架         | 声明式组件化库                      |
| 核心目标 | 低门槛、高集成     | 灵活性、自由组合                    |
| 典型场景 | 快速开发中小型项目 | 复杂大型应用（如企业级/跨平台开发） |
| 设计特点 | 官方提供完整技术栈 | 专注视图层，生态由社区驱动          |

### 语法与开发模式

Vue：

- 基于 HTML 的模板语法（.vue 单文件组件）
- 指令系统（v-if, v-for, v-model）
- 支持 JSX 但非主流用法

```js
<template>
  <button @click="count++">{{ count }}</button>
</template>
```

React：

- 强制使用 JSX（JavaScript + HTML 混合语法）
- 完全 JavaScript 表达视图逻辑

```js
// React JSX
function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
}
```

### 状态管理

Vue：

- 响应式数据（ref, reactive 自动追踪依赖）
- 修改数据自动触发更新

React：

- 不可变状态（需通过 setState 或 useState 更新）
- 依赖虚拟 DOM diff 算法

### 响应式原理对比

| 机制       | Vue (v3)                | React                       |
| ---------- | ----------------------- | --------------------------- |
| 实现方式   | Proxy 数据劫持          | 虚拟 DOM + 手动状态更新     |
| 更新粒度   | 组件级/属性级细粒度更新 | 组件级重新渲染              |
| 副作用管理 | watch/watchEffect       | useEffect                   |
| 性能优化   | 自动依赖跟踪            | 需手动优化（React.memo 等） |

### 生态系统对比

| 领域     | Vue 生态               | React 生态                               |
| -------- | ---------------------- | ---------------------------------------- |
| 状态管理 | Vuex/Pinia             | Redux/MobX/Recoil                        |
| 路由     | Vue Router             | React Router                             |
| SSR      | Nuxt.js                | Next.js                                  |
| UI 框架  | Element                | UI/Vuetify/Quasar Material UI/Ant Design |
| 移动端   | Weex（不推荐）/Uni-app | React Native                             |

### 性能表现

| 场景     | Vue 优势                    | React 优势        |
| -------- | --------------------------- | ----------------- |
| 小型应用 | 更优（自动优化+轻量运行时） | 需手动优化        |
| 复杂应用 | 依赖开发者优化能力          | 虚拟 DOM 优势明显 |
| 更新机制 | 精准更新依赖组件            | 默认全组件树 diff |

### diff 算法

想象一下：你有一个玩具箱（DOM 树），里面堆满了玩具（节点）。现在你想按新顺序整理玩具，但不想全部重新摆一遍，而是尽量复用旧的玩具位置。Vue3 和 React 整理玩具的策略不同

#### vue3

先看头和尾：

- 看一眼最前面的玩具，如果新旧顺序一样（比如都是乐高），直接跳过不管。
- 再看最后面的玩具，如果一样（比如都是积木），也跳过。
- 中间的玩具再仔细处理。

贴标签找对应（key）：如果玩具上贴了唯一标签（比如“小明的乐高”），直接按标签快速找到新旧对应关系，复用旧位置。

只移动必要的玩具：中间的玩具如果大部分顺序没变（比如“小车、恐龙、飞机”变成“恐龙、飞机、小车”），Vue3 会找到最长不用动的那部分（恐龙 → 飞机），只移动剩下的（小车）。

结果：省时省力，动作最少。

#### React

按顺序一个个对比：

- 不管头尾，直接从第一个玩具开始对比新旧顺序。
- 如果发现第一个位置的新玩具（比如原本是乐高，现在变成积木），直接扔了旧的，放新的。

依赖标签提示（key）：如果玩具贴了标签，React 能更快找到对应关系。

但没标签的话，就按位置硬匹配，容易误判（比如把第二个玩具当成第一个）。

可能多做无用功：如果中间插入一个新玩具（比如旧顺序是 A-B-C，新顺序是 A-D-B-C），React 会以为 B 变成了 D，C 变成了 B，导致删掉 B、C，创建 D、B、C。

#### 为啥会采用这种不同的方式

Vue 相信“大部分结构是固定的”，React 相信“结构可能是完全动态的”

```js
// Vue模板是声明式的，结构清晰固定
<template>
  <div>
    <header>{{ title }}</header>
    <ul>
      <li v-for="item in list" :key="item.id">{{ item.text }}</li>
    </ul>
  </div>
</template>
```

Vue 的模板在编译阶段就被分析完毕，框架知道哪里是静态内容（如`<header>`标签），哪里是动态内容（如 v-for 循环）。

带来的优势：可以提前做优化（比如静态节点提升），运行时只需要关注变化的部分。

```js
function DynamicList({ items, layout }) {
  return (
    <div>
      {layout === 'grid' ? (
        <div className="grid">{items.map(renderItem)}</div>
      ) : (
        <ul className="list">{items.map(renderItem)}</ul>
      )}
    </div>
  );
}
```

JSX 本质是 JavaScript 的语法糖，可以随意嵌套逻辑（如三元表达式、map 循环）。React 可以随时根据数据变化生成完全不同的 DOM 结构。

带来的灵活性：适合需要高度动态交互的场景（如拖拽生成界面、实时数据可视化），但需要开发者自己控制优化（如合理使用 key）。

具体例子：列表渲染

```js
// vue 需要提前定义两种布局
<template>
  <div v-if="isHorizontal" class="horizontal-list">
    <Item v-for="item in list" :key="item.id" />
  </div>
  <ul v-else class="vertical-list">
    <Item v-for="item in list" :key="item.id" />
  </ul>
</template>


// react
function List({ items, isHorizontal }) {
  // 可以动态选择容器标签
  const Container = isHorizontal ? 'div' : 'ul';

  return (
    <Container className={isHorizontal ? 'horizontal' : 'vertical'}>
      {items.map(item => (
        <Item key={item.id} />
      ))}
    </Container>
  );
}
```

Vue 需要明确写出两种分支结构，React 却可以动态决定使用`<div>`还是`<ul>`作为容器，甚至容器类型可以是动态变量。

### 发展趋势

Vue 3：

- Composition API 强化逻辑复用
- 更好的 TypeScript 支持
- Vite 工具链革新开发体验

React 18：

- 并发渲染（Concurrent Mode）
- 服务端组件（Server Components）
- 自动化批处理更新

## 创建 Vue 实例

每个 Vue 应用都是通过用 Vue 函数创建一个新的 Vue 实例开始的：

```js
const vm = new Vue({
  // 选项
});
```

## el 与 data

el: 用于指定当前 Vue 实例为哪个容器服务，值通常为 css 选择器字符串。

data: 用于存储数据，数据供 el 所指定的容器去使用。

```js
new Vue({
  el: '#demo',
  data: {
    name: 'hello,world',
  },
});
```

### el 的两种写法

1. new Vue 时候配置 el 属性

场景：当你有一个特定的 HTML 元素，如`<div id="root"></div>`作为 Vue 应用的根节点时使用

```js
const vm = new Vue({
  el: '#root',
});
```

2. 先创建 Vue 实例，随后再通过 `vm.$mount(‘#root’)`指定 el 的值，使用`$mount`方法提供了一种延迟挂载的方式，允许你在实例化时不立即挂载到 DOM 上，而是在稍后的某个时刻手动进行挂载

场景： 需要根据某些条件或逻辑来决定 Vue 实例最终挂载到哪个 DOM 元素上，可以先不指定 el，然后在合适的时机通过`$mount`方法指定

```js
vm.$mount('#root');
```

### data 的两种写法

1. 对象式

```js
new Vue({
  el: '#root',
  // 第一种
  data: {
    name: 'jack',
  },
});
```

2. 函数式

```js
new Vue({
  el: '#root',
  data() {
    return {
      name: 'jack',
    };
  },
});
```

## 模板语法

Vue.js 使用了基于 HTML 的模板语法，允许开发者声明式地将 DOM 绑定至底层 Vue 实例的数据。所有 Vue.js 的模板都是合法的 HTML，所以能被遵循规范的浏览器和 HTML 解析器解析。

## 插值

### 文本

最常见的形式就是使用“双大括号的文本插值

```vue
<span>Message: {{ msg }}</span>
```

msg 是 js 表达式，且可以直接读取到 data 中的所有属性

### Attribute

功能：用于解析标签（包括：标签属性、标签体内容、绑定事件…）

写法：`v-bind:href=“xxx”` 或 简写为 `:href=“xxx”`

如：`<a :href=“xxx”>链接</a>`

xxx 同样要写 js 表达式，且可以直接读取到 data 中的所有属性

```html
<a :href="school.url.toUpperCase()">点我去{{school.name}}学习1</a>

<a :href="school.url">点我去{{school.name}}学习2</a>

<script>
  new Vue({
    el: '#root',
    data: {
      school: {
        name: '百度',
        url: 'http://www.baidu.com',
      },
    },
  });
</script>
```

### JavaScript 表达式

对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持

```js
{
  {
    number + 1;
  }
}
{
  {
    ok ? 'YES' : 'NO';
  }
}
{
  {
    message.split('').reverse().join('');
  }
}

<div v-bind:id="'list-' + id"></div>;
```

<BackTop></BackTop>
<SplashCursor></SplashCursor>
