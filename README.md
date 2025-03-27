# DOCUMENT

## 项目说明

四个模块：组件库， 前端知识笔记， 前端项目部署，源码

### 前端知识笔记

js，Es6，typescript
涉及框架：react，react18
微前端：qiankun， webComponent
可视化：antdG6，Graphin
状态管理：redux
http
git 等

## 文件一键部署 github pages

```bash
# 先打包好文件
npm run docs:build

# 在执行一键部署
npm run deploy
```

## 组件库创建

```bash
npm run create #创建模块

lerna link #软链接依赖

npm start #运行文档

cd packages/xxx npm run dev # 单独进入某个模块运行开发环境

npm run install-lib #安装全局依赖


npm run build #构建所有包

npm run build --scope @xuelin/tools #单独构建某一包，会先构建当前包依赖的包


npm run release # 发布包
npm run release:package # 单独发布某些包 可选

```

### 本地项目测试

```js

npm i yalc -g
yarn global add yalc

// 1. 进入对用的 库
cd packages/@xuelin/<%= name %>

// 2. 执行build
npm run build

// 3. 发布
yalc publish

// 4. 进入项目
yalc add @xuelin/<%= name %>

// 5. 安装完成，重启项目

// 6. 本地验证ok，执行移除命令
yalc remove @xuelin/<%= name %>

```
