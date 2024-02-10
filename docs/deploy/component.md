---
toc: content
title: 搭建业务组件库
---

# lerna + dumi2 + vite 多包管理

## 为什么要搭建业务组件库

1. 代码复用：通过将不同的功能模块或 UI 元素抽象为独立的组件，可以减少重复代码，提高代码的可重用性。比如，一个按钮、表单、列表等通用组件可以在多个页面和场景下复用。

2. 维护性和可扩展性：拆分后的组件具有更好的内聚性和低耦合度，使得各个组件职责单一，易于理解和维护。当需求变化时，只需要对相关组件进行修改，不会影响到整个应用的其他部分。

3. 团队协作与分工：在多人协作开发大型项目时，按照业务逻辑或界面功能拆分组件有助于团队成员分工合作，每个成员专注于自己负责的组件开发，提高工作效率。

4. 测试便利：小而独立的组件更容易编写单元测试，保证每个组件的功能正确无误，进而提升整个应用的质量和稳定性。

## 初始化 dumi

官网地址： https://d.umijs.org/

创建 myapp 目录

```js。
mkdir myapp && cd myapp
```

创建模版

```js
npx create-dumi

//  选择一个模板
 ? Pick template type › - Use arrow-keys. Return to submit.
    Static Site  // 用于构建网站
 ❯  React Library // 用于构建组件库，有组件例子
    Theme Package  // 主题包开发脚手架，用于开发主题包

// 选择依赖
? Pick NPM client › - Use arrow-keys. Return to submit.
    npm
    cnpm
    tnpm
❯   yarn
    pnpm

// 安装依赖后启动项目
 yarn start
```

显示如下图说明创建成功

![](/images/component/image1.jpg)

## 初始化 lerna

全局安装 lerna 依赖

```js
npm i -g lerna
```

初始化 lerna 项目

```js
lerna init
```

执行完我们看到我们项目中多了 lerna.json 文件以及 packages 文件夹

![](/images/component/image2.jpg)

## 初始化 vite

为了每个业务组件的代码风格以及文件结构类似，我们可以创建一个模版 template 组件，在执行自定义创建组件命令时，会基于 template 模版来进行创建

vite 官网： https://vitejs.cn/

搭建 Vite 项目

```js
// 创建template项目
npm create vite@latest template
```

选择一个框架

```js
? Select a framework: › - Use arrow-keys. Return to submit.
    Vanilla
    Vue
❯   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Others


? Select a variant: › - Use arrow-keys. Return to submit.
❯   TypeScript
    TypeScript + SWC
    JavaScript
    JavaScript + SWC
```

此时我们看到我们的项目多出来 temmplate 文件夹，证明成功

![](/images/component/image3.jpg)

## template 模版配置

为了执行自定义创建组件命令，我们可以在 template 文件夹中配置一些模版语法，执行命令时候，会根据配置的语法进行替换

![](/images/component/image4.jpg)

## 编写 npm run create 脚本

我们的最终目的是执行 `npm run create` 命令，根据命令填写组件名称，组件描述，维护人等配置信息，然后生成以 template 模版为基础的业务组件。

我们可以在 package.json 中添加 ` "workspaces": ["packages/*"]` , scripts 添加`"create": "node scripts/create.js"`命令去执行 sripts/create.js 脚本

## 执行 npm run create

说明模版组件生成成功

![](/images/component/image5.jpg)
