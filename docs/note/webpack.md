---
toc: content
title: Webpack
---

# Webpack

## 介绍

是一种前端资源构建工具，是一个静态模块打包器，具体又是如何的解释，我们来看以下几个例子

### 构建工具

1. html 引入 less
   在 html 中引入 less 文件，在浏览器中没有生效，这是因为 less 对于浏览器来讲并不能进行识别，我们必须借助于工具将 less 转化为 css，这时候才能进行运行

![](/images/webpack/image1.png)

2. import 导入

在项目运用到的 js，为了方便操作 js，项目中可能会引入 jquery，下好包后通过 import 进行导入，这里做了一个小小的演示，通过点击好 h1 标签改变背景颜色。运行之后点击不生效，浏览器报了一个语法错误，是因为 ES6 的模块化语法 import 导入引起的，浏览器并不能识别 ES6 的语法

![](/images/webpack/image2.png)

从上面的例子可以看出来，我们需要一个工具将 less -> css，ES6、ES7 -> js 才能让浏览器进行识别， 以前这些工具得进行分别维护，非常的麻烦，所以前端这时候提出一个概念叫构建工具，这个构建工具得作用是将这些每个工具，操作都包含起来，此时只关系总的工具就可以了

### 静态模块打包器

在 react 跟 vue 开发的时，一个文件夹中可能引入很多依赖，比如下面的这些引入的很多依赖就会交给构建工具 webpack 来进行处理，那 webpack 怎么进行处理呢？

![](/images/webpack/image3.png)

首先告诉 webpack 一个打包的起点，所谓的入口文件，webpack 会以这个入口文件作为起点开始打包，他会将每个依赖都给记录好，形成一个依赖关系树状结构图，就我们做上面的一个例子而言，入口文件为 index.js，引入 jq 跟 less 模块，通过 chunk 生成代码块进行分别打包，生成一个静态资源（bundle）文件

![](/images/webpack/image4.png)

所以在 webpack 看来，前端的多有资源文件(js/json/css/img/less/...)都会作为模块处理，它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源（bundle）资源

## 五个核心概念

### entry（入口）

告诉 webpack 以哪个文件作为文件为入口起点开始打包，分析构建内部依赖图

### output（出口）

webpack 打包后的资源 bundle 输出到哪里去，以及如何命名

### loader

webpack 只能识别 js 文件跟 json 文件，其他的比如样式文件，图片文件，webpack 自身处理不了，需要借助 loader 进行帮我翻译一下，让 webpack 能看懂东西，这时候 webpack 就能处理这些资源

### plugins（插件）

插件可以用于执行的范围更广的任务，插件的范围包括，从打包优化和压缩，一直到重新定义环境中的变量等

### mode（模式）

分为两种

| 选项                  | 特点                                                               |
| --------------------- | ------------------------------------------------------------------ |
| development(开发模式) | 能让我们的代码在本地记行调试的环境（配置能较简单些）               |
| production(生产模式)  | 能让代码优化上线运行的环境（配置能复杂些，考虑性能，压缩，兼容等） |

## 验证 js,json,css 文件

在安装包之前我们的初始一下包，执行`yarn init`或者`npm init`，这样的意义是我们接下来要下包了，这样的话会生成一个 pakeage.json 文件，这个文件主要是用来记录这个项目的详细信息的，它会将我们在项目开发中所要用到的包，以及项目的详细信息等记录在这个项目中。方便在以后的版本迭代和项目移植的时候会更加的方便。

之后进行一个项目 pakeage.json 的详细配置，可以参考以下图片，主要的还是 name 名称，其他的都可以进行回车取默认值就可以，然后我们需要下载两个包，一个是 webpack ，一个是`webpack-cli`这个包是通过 webpack 的指令对 webpack 进行一些操作，可以执行 ` yarn add webpack webpack-cli -g`进行安装

![](/images/webpack/image5.png)

### js 文件

安装好了之后，我们就开始验证下 webpack 是否真的能识别 js。

先创建好入口文件夹 src/index.js， 输入文件为 build/built.js 文件中，由于不同的环境中执行的指令以及输入的内容都是不同的

开发环境：

```js
yarn webpack ./src/index.js -o ./build/built.js --mode=development
```

打包后的文件

![](/images/webpack/image6.png)

生产环境：

```js
yarn webpack ./src/index.js -o ./build/built.js --mode=production
```

打包后的文件

![](/images/webpack/image7.png)

总上看来，生产环境跟开发环境能将 ES6 模块化编译成浏览器能识别的模块化，生产环境会压缩我们环境的代码

我们怎么验证打包后的资源是正确的呢？

一种是再打包问题夹新建个 html 文件，将打包后的文件引入，然后再浏览器中进行查看，如图下：

![](/images/webpack/image8.png)

另一种是通过 node 环境中运行

![](/images/webpack/image9.png)

### json 文件

接下来我们来验证下 json 文件是否支持 webpack，显然控制台输出成功，webpack 是支持 json 文件的

![](/images/webpack/image10.png)

### css 文件

打包执行指令时，我们可以看出控制台包红错，css 文件显然是不支持的

![](/images/webpack/image11.png)

## 打包样式资源

### css-loader

我们之前测试过，webpack 不能打包样式资源，这时候就需要 loader 来进行处理，而 loader 必须按照我们的配置文件去写，所以我们就得新建个 webpack.config.js 这个文件，所有的配置说明如下：

![](/images/webpack/image12.png)

配置好之后，我们执行`yarn webpack`运行，编译出来的结果显然是打包成功了，不然控制台就是红色的错误效果

![](/images/webpack/image13.png)

所以为了看效果，我们在 build 文件下新建个 index.html 文件，将打包好的 built.js 放进去，页面效果生效，并且我们浏览器再 head 标签中添加 style 样式标签，将我们之前写的样式都插入进来
![](/images/webpack/image14.png)

### less-loader

loader 配置的时候值得注意的是，每次配置不同的文件，都得需要配置不同的 loader 来进行处理

![](/images/webpack/image15.png)

## 打包 html 资源

打包 html 文件的时候，我的得下插件为`html-webpack-plugin`，这个包导入一个构造函数 HtmlWebpackPlugin，执行完指令后，在导出文件 build 文件下，我们就看到自动生成了一个名为 index.html 的空文件，自动引入打包输出的所有资源（js/css），这里值得注意的是，loader 仅是下载插件直接就可以配置就可以，而这个插件下载下来之后，必须引入，才进行使用。

![](/images/webpack/image16.png)

有的场景就是想要输入跟入口文件中的 html 文件格式一样的，我们只需要在 HtmlWebpackPlugin 这个构造函数中传入参数 template，指定 template 参数的路径，这样就告诉 webpack 要以./src/index.html 为模板，复制这个 html 文件，然后自动引入打包输入所有资源（不需要自己引）

![](/images/webpack/image17.png)

## 打包图片资源

在处理图片资源的时候，我们需要下载两个包，`file-loader`跟`url-loader`，`url-loader`依赖`file-loader`，这里图片的处理只需要引入`url-loader`就可以，`url-loader`在打包之后不会原封不动的的输出，他可以通过 base64 进行处理，图下我引的规则为 `limit: 8 * 1024`，这里的解释为当图片小于 8(这个是指 8kb)，就会被 base64 进行处理

base64 一种编码方式，将图片解析成字符串的形式，浏览器解析这个字符串的时候会当做图片的内容去进行解析

优点： 减少请求数量（减轻服务器压力）

缺点： 图片体积会增大（文件请求速度能更慢）

所以在项目中的进行取舍，一般 8kb- 12kb 都是可以的

这里值得注意的是，经过 base64 处理过的图片，他并不会输出在 build 文件夹中，而是直接输入在浏览器中

![](/images/webpack/image18.png)

在项目中，我们不仅会通过引入样式 background-image 来引入图片，还有直接在 img 标签中引入图片，此时，上面的方法就是默认处理不了 html 中的 img 图片，这时候，我们还得需要增加 loader 来翻译 img 中的图片，需要下载`html-loader`这个包来处理 html 文件中 img 中的图片，他会负责引入 img 标签，从而被`url-loader`进行处理

![](/images/webpack/image19.png)

这里需要注意的是，url-loader 默认使用的 ES6 模块解析，而`html-loader`引入图片是使用 commonjs，解析打包后 img 路径会变成`<img src=[object Module] />`，只需要在`url-loader`中关闭 ES6 模块化，使用 commonjs 解析，输入配置`esModule: false`即可。

打包成功后我们可以看到输出的 img 的 src 是一长串字符串，这是因为打包后会生成唯一的一个 hash 值，通过这个 hash 值可以找到这个图片，我们不想要 hash 那么长的话，我们可以自己进行设置，输入指令`name: '[hash:10].[ext]'`，这里的`[hash:10]`取图片的 hash 前 10 位，`[ext]`取文件原来的扩展名。

## 打包其他资源

这里的其他资源指的是不需要做其他任何处理（不需要压缩、优化等），让他原封不动的输出出去就可以了，比如字体图标，我们通过引入`file-loader`包，进行排除的方法过滤其他资源，如果想使输出的 hash 值短一些，我们可以通过设置`name: '[hash:10].[ext]'`来进行更改

![](/images/webpack/image20.png)

## devServer

在项目中，我们实时需要更改代码，实时想要看到更改后的代码运行的如何，不可能我修改一次代码，我就要重新`yarn webpack`来重新打包一次，效率有点低。

这时候 webpack 提出了一个概念 devServer 自动化，让你自动去打包。特点：只会在内存中编译打包，不会有任何的输出到本地代码，所以之前我们在 build 包下输出的文件都不在输入这里，而是输出在内存中，想要启动 devServer，得下载`webpack-dev-server`这个包，`yarn webpack-dev-server`，此时你会发现光标一直在这停着，证明程序一直在这运行，他会一直监视源代码是否被更改，当你修改代码时并保存，程序会自动重新自动进行编译，然后他就会自动刷新浏览器渲染最新的变化

![](/images/webpack/image21.png)

## 目录结构

经过这几个最基本的配置，你会发现输入文件 build 下 js，其他文件等文件都在一起，没有文件层次划分，我想 js 都放在 js 文件下，图片都放在 img 文件下，这样目录清楚，我们只需要在想要的 loader 下面规定一下`outputPath`属性即可，但是值得注意的是，css 文件夹因为`css-loader`的原因，会将 css 打包在 js 中，所以说样式并不会输出，css 只会跟 js 为一体的

![](/images/webpack/image22.png)

## 生产环境的一般配置

在开发环境中，我们是将 css 整合到 js 中的，这样会使 js 的体积很大，加载速度就能慢，同时他是先加载 js，然后再加载 css，创建 style 标签到页面上，这里就会出现闪屏现象。所以在生产环境中，我们需要将 css 从 js 提取出来。还有生产环境需要对代码的压缩处理，还有我们的 js 代码跟 css 代码是有兼容性问题的，在低版本的浏览器中有些 css 属性需要增加前缀才能识别，这些都需要再生产环境中进行处理，不然上线后会有各种问题，我们开发环境只需要页面跑通基本就可以了

### 提取 css 文件

我们需要从 js 中将 css 提取出来，我们需要下载一个插件叫做`mini-css-extract-plugin`，这时候虽然引入了 MiniCssExtractPlugin 这个构造函数，但是我们注意下，在 loader 中需要将`style-loader`关掉，我们不需要通过他来创建 style 标签了，我的需要增加的是`MiniCssExtractPlugin.loader`，执行指令后我们发现，所有的 css 打包后都默认放在 build 文件中的 main.css 中，在打包好的 index.html 文件中我们可以发现，main.css 文件是通过 link 标签来引入的，这样就规避了闪屏的问题

![](/images/webpack/image23.png)

如果你需要文件路径保持一致的话，你可以自己进行手动重命名设置下就可以

![](/images/webpack/image24.png)

### css 兼容处理

css 做兼容性处理需要一个库，叫 postcss，postcss 这个库要写在 webpack 中需要写`postcss-loader`，还得使用一个叫`postcss-preset-env`插件。这个插件能帮我们呢 postcss 能识别某些环境，他能找到 package.json 中 browserslist 里面的配置，通过配置加载指定的 css 兼容性样式，这时候我们就要手动向 package.json 文件中增加 browserslist，如图下，可以根据自己的需求进行添加。添加好了之后，虽然 mode 中我们设置模式为 development，但是我们想要 browserslist 生效的话，得设置 nodejs 环境变量，nodejs 默认环境为生产环境，我们想要设置开发环境，得进行配置`process.env.NODE_ENV = 'development'`，想要恢复生产环境注掉即可

![](/images/webpack/image25.png)

### 压缩 css

`optimize-css-assets-webpack-plugin`这个插件是专门做 css 压缩处理的，你会发现打包后的 css 的文件会压缩为一行，这时候你可以看控制台压缩之前压缩之后的明显的体积对比

![](/images/webpack/image26.png)

### eslint 语法检查

为了使团队的开发质量能高些，我们一般都需要开启`eslint`语法检查，所以我们需要下载`eslint-webpack-plugin`这个包，`eslint-webpack-plugin`依赖于`eslint`这个库，所以下载包的时候两个都得下，语法检查只针对我们写的源代码 js 来做，但是这个 eslint 他也会对 node_modules 里第三方库也生效，一旦检查，就会报错，所以我们得排除掉 node_modules 包。做好这些之后 eslint 不知道检查的规则是什么样，所以自己在 package.json 中手动设置规则，推荐使用 airbnb 规则，因为 github 上用得人最多，所以推荐。使用 airbnb 规则得需要安装`eslint-config-airbnb-base` `eslint-plugin-import`这两个插件。在 package.json 中添加 eslintConfig 属性，去继承 airbnn-base，这样就会继承 airbnn-base 这个库提供的 eslint 的规则检查

![](/images/webpack/image27.png)

可以有空时候看看下面的关于 airbnb 这个规则

<https://github.com/topics/javascript>

<https://www.npmjs.com/package/eslint-config-airbnb>

### js 兼容性处理 eslint

我们在程序中用到的 ES6 语法，有时候在 chorme 浏览器中时看不到什么报错，可能放在 ie 比较低的浏览器，他并不会识别 js 中的 ES6 语法，他会报一堆红错，这时候我们就得做一下 js 的兼容性处理，这时候我们需要`babel-loader`，指示`babel-loader`做怎么样的兼容性处理，需要再下载这两个包`@babel-preset-env` `@babel/core`，这是时候我们注意的是，有时候配置的并不是很对，因为版本一直再更新，我们需要借助文档来进行配置，这点很重要，不然你盲目配置还是会错的

<https://webpack.docschina.org/concepts/>

配置完你会发现，你原来定义的 const 的，在打包文件中变成了 var

![](/images/webpack/image28.png)

上面只是能转换写简单的基本语法，如 promise 等就转换不了，所以我们需要一个更强大的`@babel/polyfill`来进行处理全部的 js 兼容性问题，这个不需要下载包，直接在代码中进行 import 引入即可，打包完后，你会发现输出的 built.js 会有很多代码，比之前多多了，体积增加了很多，这是他对 js 所有有兼容性的都进行处理，所以他的弊端就是我只要解决部分的兼容性问题，但是将所有的兼容性代码全部引入，体积太大

![](/images/webpack/image29.png)

所以最优的方法还是我需要做兼容性处理的就做，所有有个`core-js`这个库，可以解决这个问题，这个时候就不需要上面的方案，注掉即可，`core-js`这个配置如下，根据自己项目的需求，可以根据官网来记性配置，你可以通过控制台对比一下上次打包的体积大小来看，这次明显打包后的体积减少了很多

![](/images/webpack/image30.png)

### 压缩 js 跟 html

这是说明下，html 文件是不需要做兼容性处理的，浏览器认识的就认识，不认识的就不认识，js 代码在生产环境中自动就会被压缩，所以我们只需要将`mode：'development'`即可，压缩 html 文件需要配置以下就可以

![](/images/webpack/image31.png)

## 性能优化配置

开发环境性能优化：优化打包构建速度，优化代码调试

生产环境性能优化：优化打包构建速度，优化代码运行性能

## 开发环境性能优化

### HMR（模块热替换）

之前我们配置了 DevServer 自动化，这个有一个缺点就是当你修改了 css 文件的时候，浏览器重新加载渲染页面，如果文件够多，都得重新打包，费时，性能不好。我希望的是，修改 css 文件的时候，js 等不变的文件就不需要重新加载，所以就是出现的 HMR，他的作用是一个模块发生变化，只会重新打包这一个模块（而不是打包所有的模块），极大提升的构建的速度

- 当修改了 webpack 配置的时候，新配置要想生效，必须重新启动 webpack 服务

样式文件只需要将 devService 中`hot：true`给来启，`style-loader`中内部就可以自动实现样式热更新

![](/images/webpack/image32.png)

html 默认不能使用 HMR 功能，所以解决的办法将 html 文件给引 entry 文件中，这时候 entry 文件写法改为一个数组的写法
