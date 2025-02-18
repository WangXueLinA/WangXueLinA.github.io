---
toc: content
title: Nodejs
---

# Nodejs

## 介绍

- nodejs 并不是 JavaScript 应用，也不是编程语言，因为编程语言使用的 JavaScript,Nodejs 是 JavaScript 的运行时。
- Nodejs 是构建在 V8 引擎之上的，V8 引擎是由 C/C++编写的，因此我们的 JavaSCript 代码需要由 C/C++转化后再执行。
- NodeJs 使用异步 I/O 和事件驱动的设计理念，可以高效地处理大量并发请求，提供了非阻塞式 I/O 接口和事件循环机制，使得开发人员可以编写高性能、可扩展的应用程序,异步 I/O 最终都是由 libuv 事件循环库去实现的。

## 浏览器环境 vs node 环境

![](/images/node/image1.png)

## 特性：

### 单线程

在 Java、php 等服务器端语言中，会为每一个客户端连接创建一个新的线程，每个线程会消耗内存，想要 Web 应用程序支持更多的用户，就需要增加服务器的数量。Node.js 不为每个客户连接创建一个新的线程，而仅仅使用一个线程。当有用户连接了，就触发一个内部事件，通过非阻塞 I/O、事件驱动机制，让 Node.js 程序宏观上也是并行的。

好处：减少了内存开销，操作系统的内存换页，最擅长高并发。

坏处：一个用户造成了线程的崩溃，整个服务都崩溃了，其他人也崩溃了

### 非阻塞 I/O

当访问数据库取得数据时，需要一段时间。在传统的单线程处理机制中，在执行了访问数据库代码之后，整个线程都将暂停下来，等待数据库返回结果，才能执行后面的代码。也就是说，I/O 阻塞了代码的执行，极大地降低了程序的执行效率。由于 Node.js 中采用了非阻塞型 I/O 机制，因此在执行了访问数据库的代码之后，立即执行其后面的代码，把数据库返回结果的处理代码放在回调函数中，从而提高了程序的执行效率。阻塞模式下，一个线程只能处理一项任务，要想提高吞吐量必须通过多线程。而非阻塞模式下，一个线程永远在执行计算操作，这个线程的 CPU 核心利用率永远是 100%。nodejs 不会傻等 I/O 语句结束，而会执行后面的语句

### 事件驱动

Node 中，在一个时刻，只能执行一个事件回调函数，但是在执行一个事件回调函数的中途，可以转而处理其他事件（比如，又有新用户连接了），然后返回继续执行原事件的回调函数，这种处理机制，称为“事件环”机制。Node.js 中所有的 I/O 都是异步的，

## 环境

Node.js 的使用 JavaScript 进行编程，运行在 JavaScript 引擎上（V8）。

Node.js 可以解析 JS 代码（没有浏览器安全级别的限制）提供很多系统级别的 API，如：

- 文件的读写 (File System)

  ```js
  const fs = require('fs');

  fs.readFile('./ajax.png', 'utf-8', (err, content) => {
    console.log(content);
  });
  ```

- 进程的管理 (Process)

  ```js
  function main(argv) {
    console.log(argv);
  }

  main(process.argv.slice(2));
  ```

- 网络通信 (HTTP/HTTPS)

  ```js
  const http = require('http');

  http
    .createServer((req, res) => {
      res.writeHead(200, {
        'content-type': 'text/plain',
      });
      res.write('hello nodejs');
      res.end();
    })
    .listen(3000);
  ```

## 开发环境搭建

http://nodejs.cn/download/

## Npm&Yarn

### npm 的使用

```js
npm init // 初始化一个新的npm项目，创建package.json文件
npm install // 安装一个包或一组包，并且会在当前目录存放一个node_modules。
npm install <package-name> // 安装指定的包
npm install <package-name> –g  // 全局安装指定的包
npm update <package-name> // 更新指定的包。
npm uninstall <package-name> //卸载指定的包。
npm list -g  // 不加-g，列举当前目录下的安装包
npm publish // 发布自己开发的包到 npm 库中
npm info <package-name> // 某包详细信息
npm info <package-name> version // 获取某包最新版本
npm install <package-name>@1.0.1  // 安装某包指定版本
npm outdated   // 列出当前项目中需要更新的包
npm link // 将本地模块链接到全局的 node_modules 目录下

"dependencies": { "md5": "^2.1.0" }  // ^ 表示 如果 直接npm install 将会安装md5  2.*.* 最新版本

"dependencies": { "md5": "~2.1.0" }  // ~ 表示 如果 直接npm install 将会 安装md5 2.1.*  最新版本

"dependencies": { "md5": "*" }  //* 表示 如果 直接npm install 将会 安装 md5  最新版本
```

### yarn 使用

```js
npm install -g yarn
```

对比 npm:
速度超快: Yarn 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快。
超级安全: 在执行代码之前，Yarn 会通过算法校验每个安装包的完整性。

```js

yarn init //开始新项目

yarn add [package] // 添加依赖包
yarn add [package]@[version]
yarn add [package] --dev

yarn upgrade [package]@[version] // 升级依赖包

yarn remove [package] // 移除依赖包

yarn install // 安装项目的全部依赖
```

## Npm install 原理

在执行 npm install 的时候发生了什么？

首先安装的依赖都会存放在根目录的 node_modules,默认采用扁平化的方式安装，并且排序规则.bin 第一个然后@系列，再然后按照首字母排序 abcd 等，并且使用的算法是广度优先遍历，在遍历依赖树时，npm 会首先处理项目根目录下的依赖，然后逐层处理每个依赖包的依赖，直到所有依赖都被处理完毕。在处理每个依赖时，npm 会检查该依赖的版本号是否符合依赖树中其他依赖的版本要求，如果不符合，则会尝试安装适合的版本

## commonJS

CommonJS：是 Node.js 使用的模块化规范。也就是说，Node.js 就是基于 CommonJS 这种模块化规范来编写的。

CommonJS 规范规定：每个模块内部，module 变量代表当前模块。这个变量是一个对象，它的 exports 属性（即 module.exports）是对外的接口对象。加载某个模块，其实是加载该模块的 module.exports 对象。

在 CommonJS 中，每个文件都可以当作一个模块：

- 在服务器端：模块的加载是运行时同步加载的。
- 在浏览器端: 模块需要提前编译打包处理。首先，既然同步的，很容易引起阻塞；其次，浏览器不认识 require 语法，因此，需要提前编译打包。

### 模块的暴露和引入

#### 方式一： exports

exports 对象用来导出当前模块的公共方法或属性。别的模块通过 require 函数调用当前模块时，得到的就是当前模块的 exports 对象。

```js
// 相当于是：给 exports 对象添加属性
const name = 'qianguyihao';

const foo = function (value) {
  return value * 2;
};

exports.name = name;
exports.foo = foo;
```

#### 方式二： module.exports

```js
// 方式1
module.exports = {
  name: '我是 module1',
  foo() {
    console.log(this.name);
  },
};

// 我们不能再继续写 module.exports = value2。因为重新赋值，会把 exports 对象 之前的赋值覆盖掉。

// 方式2
const age = 28;
module.exports.age = age;
```

exports 和 module.exports 的区别
最重要的区别：

- 使用 exports 时，只能单个设置属性 exports.a = a;
- 使用 module.exports 时，既单个设置属性 module.exports.a，也可以整个赋值 module.exports = obj。

其他要点：

- Node 中每个模块的最后，都会执行 return: module.exports。
- Node 中每个模块都会把 module.exports 指向的对象赋值给一个变量 exports，也就是说 exports = module.exports。
- module.exports = XXX，表示当前模块导出一个单一成员，结果就是 XXX。
- 如果需要导出多个成员，则必须使用 exports.add = XXX; exports.foo = XXX。或者使用 module.exports.add = XXX; module.export.foo = XXX。

### 引入模块的方式：require

require 函数用来在一个模块中引入另外一个模块。传入模块名，返回模块导出对象。

语法格式：

```js
// const module1 = require('模块名');
// require的是文件路径。文件路径既可以用绝对路径，也可以用相对路径。后缀名.js可以省略。

const module1 = require('./main.js');
const module2 = require('./main');
const module3 = require('Demo/src/main.js');
```

## 内置模块

常见的内置模块包括：

fs：文件系统模块
path：路径模块
OS：操作系统相关
net：网络相关
http.....

### fs

#### 异步读取文件 fs.readFile()

语法

```js
fs.readFile(file[, options], callback(error, data))
```

promise 封装 fs.readFile()

```js
const fs = require('fs');

function fsRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        //失败执行的内容
        reject(err);
      } else {
        //成功执行的内容
        resolve(data);
      }
    });
  });
}

var promise1 = fsRead('hello1.txt');
promise1
  .then((res1) => {
    console.log(res1);
    return fsRead('hello2.txt');
  })
  .then((res2) => {
    console.log(res2);
    return fsRead('hello3.txt');
  })
  .then((res3) => {
    console.log(res);
  });
```

async/await 封装 fs.readFile()

```js
var fs = require('fs');

function fsRead(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, { flag: 'r', encoding: 'utf-8' }, (err, data) => {
      if (err) {
        //失败执行的内容
        reject(err);
      } else {
        //成功执行的内容
        resolve(data);
      }
    });
  });
}

async function ReadList() {
  var res1 = await fsRead('hello1.txt');
  var res2 = await fsRead('hello2.txt');
  var res3 = await fsRead('hello3.txt');
}

// 执行方法
ReadList();
```

## Npm run 原理

用 npm run vite 举例

- 先从当前项目的 node_modules/.bin 去查找可执行命令 vite
- 如果没找到就去全局的 node_modules 去找可执行命令 vite
- 如果还没找到就去环境变量查找
- 再找不到就进行报错
