---
toc: content
title: Vue2
group: Vue 全家桶
---

# vue

## vue 核心特性

### 数据驱动（MVVM）

MVVM 表示的是 Model-View-ViewModel

- Model：模型层，负责处理业务逻辑以及和服务器端进行交互
- View：视图层：负责将数据模型转化为 UI 展示出来，可以简单的理解为 HTML 页面
- ViewModel：视图模型层，用来连接 Model 和 View，是 Model 和 View 之间的通信桥梁

它的主要职责就是：

- 数据变化后更新视图
- 视图变化后更新数据
  当然，它还有两个主要部分组成
- 监听器（Observer）：对所有数据的属性进行监听
- 解析器（Compiler）：对每个元素节点的指令进行扫描跟解析,根据指令模板替换数据,以及绑定相应的更新函数

### 组件化

在 Vue 中每一个.vue 文件都可以视为一个组件，

- 降低整个系统的耦合度，在保持接口不变的情况下，我们可以替换不同的组件快速完成需求，例如输入框，可以替换为日历、时间、范围等组件作具体的实现
- 调试方便，由于整个系统是通过组件组合起来的，在出现问题的时候，可以用排除法直接移除组件，或者根据报错的组件快速定位问题，之所以能够快速定位，是因为每个组件之间低耦合，职责单一，所以逻辑会比分析整个系统要简单
- 提高可维护性，由于每个组件的职责单一，并且组件在系统中是被复用的，所以对代码进行优化可获得系统的整体升级

### 指令系统

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

相同点：

- 都有组件化思想
- 都支持服务器端渲染
- 都有 Virtual DOM（虚拟 dom）
- 数据驱动视图
- 都有支持 native 的方案：Vue 的 weex、React 的 React native
- 都有自己的构建工具：Vue 的 vue-cli、React 的 Create React App

区别：

- 数据流向的不同。react 从诞生开始就推崇单向数据流，而 Vue 是双向数据流
- 数据变化的实现原理不同。react 使用的是不可变数据，而 Vue 使用的是可变的数据
- 组件化通信的不同。react 中我们通过使用回调函数来进行通信的，而 Vue 中子组件向父组件传递消息有两种方式：事件和回调函数
- diff 算法不同。react 主要使用 diff 队列保存需要更新哪些 DOM，得到 patch 树，再统一操作批量更新 DOM。Vue 使用双向指针，边对比，边更新 DOM

## 生命周期

Vue 生命周期总共可以分为 8 个阶段：创建前后, 载入前后,更新前后,销毁前销毁后，以及一些特殊场景的生命周期

| 生命周期      | 描述                               | 使用场景                                                     |
| ------------- | ---------------------------------- | ------------------------------------------------------------ |
| beforeCreate  | 组件实例被创建之初                 | 执行时组件实例还未创建，通常用于插件开发中执行一些初始化任务 |
| created       | 组件实例已经完全创建               | 组件初始化完毕，各种数据可以使用，常用于异步数据获取         |
| beforeMount   | 组件挂载之前                       | 未执行渲染、更新，dom 未创建                                 |
| mounted       | 组件挂载到实例上去之后             | 初始化结束，dom 已创建，可用于获取访问数据和 dom 元素        |
| beforeUpdate  | 组件数据发生变化，更新之前         | 更新前，可用于获取更新前各种状态                             |
| updated       | 组件数据更新之后                   | updated 更新后，所有状态已是最新                             |
| beforeDestroy | 组件实例销毁之前                   | 销毁前，可用于一些定时器或订阅的取消                         |
| destroyed     | 组件实例销毁之后                   | 销毁前，可用于一些定时器或订阅的取消                         |
| activated     | keep-alive 缓存的组件激活时        | --                                                           |
| deactivated   | keep-alive 缓存的组件停用时调用    | --                                                           |
| errorCaptured | 捕获一个来自子孙组件的错误时被调用 | --                                                           |

beforeCreate -> created

- 初始化 vue 实例，进行数据观测

created

- 完成数据观测，属性与方法的运算，watch、event 事件回调的配置
- 可调用 methods 中的方法，访问和修改 data 数据触发响应式渲染 dom，可通过 computed 和 watch 完成数据计算
- 此时 vm.$el 并没有被创建

created -> beforeMount

- 判断是否存在 el 选项，若不存在则停止编译，直到调用 vm.$mount(el)才会继续编译
- 优先级：render > template > outerHTML
- vm.el 获取到的是挂载 DOM 的

beforeMount

- 在此阶段可获取到 vm.el
- 此阶段 vm.el 虽已完成 DOM 初始化，但并未挂载在 el 选项上

beforeMount -> mounted

- 此阶段 vm.el 完成挂载，vm.$el 生成的 DOM 替换了 el 选项所对应的 DOM

mounted

- vm.el 已完成 DOM 的挂载与渲染，此刻打印 vm.$el，发现之前的挂载点及内容已被替换成新的 DOM

beforeUpdate

- 更新的数据必须是被渲染在模板上的（el、template、render 之一）
- 此时 view 层还未更新
- 若在 beforeUpdate 中再次修改数据，不会再次触发更新方法

updated

- 完成 view 层的更新
- 若在 updated 中再次修改数据，会再次触发更新方法（beforeUpdate、updated）

beforeDestroy

- 实例被销毁前调用，此时实例属性与方法仍可访问

destroyed

- 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
- 并不能清除 DOM，仅仅销毁实例
