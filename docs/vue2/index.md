---
toc: content
title: 介绍
order: -100
---

# Vue2

## 官网

https://v2.cn.vuejs.org/v2/api/

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

![](/images/vue2/image1.jpg)

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

这里就做几个简单的类比吧，当然没有好坏之分，只是使用场景不同

### 相同点

- 都有组件化思想
- 都支持服务器端渲染
- 都有 Virtual DOM（虚拟 dom）
- 数据驱动视图
- 都有支持 native 的方案：Vue 的 weex、React 的 React native
- 都有自己的构建工具：Vue 的 vue-cli、React 的 Create React App

### 不同点

- 数据流向的不同。react 从诞生开始就推崇单向数据流，而 Vue 是双向数据流
- 数据变化的实现原理不同。react 使用的是不可变数据，而 Vue 使用的是可变的数据
- 组件化通信的不同。react 中我们通过使用回调函数来进行通信的，而 Vue 中子组件向父组件传递消息有两种方式：事件和回调函数
- diff 算法不同。react 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。Vue 使用双向指针，边对比，边更新 DOM

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
