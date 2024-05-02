---
toc: content
title: JavaScript
group: JS
---

# JavaScript

## 数据类型

基本数据类型（Primitive Data Types）：

- Undefined: 表示变量已声明但尚未初始化，或者是访问不存在的对象属性时返回的默认值。
- Null: 类型只有一个值 null，它表示空值或无对象。尽管在 JavaScript 中 typeof null 返回 "object"，但在概念上它被认为是独立于对象的基本类型。
- Boolean: 有两种可能的值 true 或 false，用于表示逻辑状态。
- Number: 表示数值，可以是整数或浮点数，还包括特殊的 Infinity、-Infinity 和 NaN（非数字，Not-a-Number）。
- String: 表示文本字符序列，由单引号或双引号包裹。
- BigInt: ES6 新增的数据类型，用来表示大于 `Number.MAX_SAFE_INTEGER` 但仍能精确表示的大整数，如 123n。
- Symbol: 也是 ES6 新增的数据类型，它是唯一的、不可变的原始值，用于生成唯一的标识符，避免命名冲突。

引用数据类型（Reference Data Types）：

- Object: 包括普通对象、数组、函数、Date、RegExp、Map、Set 等，这些类型的值是存储在堆内存中的对象实例，变量实际上保存的是指向堆内存中该对象的引用地址。
- Array: 是特殊的对象，用于存储有序的元素列表，可以通过索引访问。
- Function: 函数也是对象，可以被赋值给变量，并可以作为参数传递和返回。
- 其它内置对象: 如 Date 用于处理日期和时间，RegExp 用于正则表达式匹配等。

存储和复制方式的区别：

- 基本数据类型：存储在栈内存中，复制时直接复制其值。
- 引用数据类型：存储在堆内存中，栈内存中的变量保存的是指向堆内存中实际对象的地址。复制时，复制的是堆内存中对象的引用，而不是对象本身，因此多个变量可能引用同一个对象，改变其中一个变量会影响到其他通过同一引用访问的对象。

操作上的区别：

- 对于基本类型，由于它们的值直接存储，所以比较是基于值的，如 var a = 5; var b = 5; 则 a === b 为 true。
- 对于引用类型，比较的是引用地址，而非对象内容，除非手动比较其属性值。

## null 和 undefined 区别

null 和 undefined 在 JavaScript 中都是表示某种形式的“无值”或“无效值”，它们在某些方面具有相似性，但在语义和用途上有所区别：

undefined：

- 定义：在 JavaScript 中，undefined 是一种基本数据类型，它表示变量从未被赋值或者对象属性不存在。
- 场景：
  - 当变量被声明但尚未被初始化时，其值为 undefined。
  - 当试图访问对象上不存在的属性时，返回 undefined。
  - 函数调用时缺少必要的参数或参数未赋值，传入的参数值为 undefined。
  - void 操作符返回 undefined（例如：void(0) 返回 undefined）。

null：

- 定义：null 也是一个特殊值，虽然在 JavaScript 中 typeof null 返回 "object"，但实际上它是一种独立的数据类型，表示一个空值或空对象引用。
- 语义：null 明确地表示某处应当有值，但现在为空或者没有指向任何对象的引用。
- 场景：
  - 有意清空对象引用时，将其赋值为 null。
  - 初始化变量以表示目前没有可用值，但不同于 undefined，这通常意味着开发者已经意识到并明确指定了这个状态。
  - 函数期望接收一个对象作为参数，如果没有提供，则可以用 null 表示参数值为空。

在比较时，非严格相等条件下 (==) null 和 undefined 是相等的，而在严格相等条件下 (===) 它们是不相等的。在类型检查中，undefined 和 null 被视为两种不同的类型，尽管在 TypeScript 等部分环境中，它们都被认为是联合类型 null | undefined 的一部分。在实践中，开发者往往需要对这两种情况进行区分，特别是在进行类型检查和值校验时

<!-- ## defer 和 async 的区别

script 标签中如果没有 defer 或 async 属性，浏览器会立即加载并执行相应的脚本。
它不会等待后续加载的文档元素，读取到就会开始加载和执行，这样
就阻塞了后续文档的加载

![](/images/js/image1.png)

其中蓝色代表 js 脚本网络加载时间，红色代表 js 脚本执行时间，绿
色代表 html 解析。

defer 和 async 属性都是去异步加载外部的 JS 脚本文件，它们都不
会阻塞页面的解析，其区别如下：

执行顺序：多个带 async 属性的标签，不能保证加载的顺序；多个带
defer 属性的标签，按照加载顺序执行；

脚本是否并行执行：async 属性，表示后续文档的加载和执行与 js
脚本的加载和执行是并行进行的，即异步执行；defer 属性，加载后
续文档的过程和 js 脚本的加载(此时仅加载不执行)是并行进行的(异步)，js 脚本需要等到文档所有元素解析完成之后才执行，
DOMContentLoaded -->

## 数据类型检查

### typeof 运算符

```js
let variable = 'Hello';
console.log(typeof variable); // 输出 "string"

let numberVar = 42;
console.log(typeof numberVar); // 输出 "number"

let boolVar = true;
console.log(typeof boolVar); // 输出 "boolean"

let obj = {};
console.log(typeof obj); // 输出 "object" （注意：{}、[], null 都会被识别为 "object")

let arr = [];
console.log(typeof arr); // 输出 "object" （即使arr是数组，typeof仍返回"object"）

let func = function () {};
console.log(typeof func); // 输出 "function"

let myNull = null;
console.log(typeof myNull); // 输出 "object" （null类型在这里是个特例，实际应该是null类型，但typeof返回"object"）
```

### instanceof 运算符

```js
let arrayInstance = [];
console.log(arrayInstance instanceof Array); // 输出 "true" （确认arrayInstance是否为Array的实例）

let dateInstance = new Date();
console.log(dateInstance instanceof Date); // 输出 "true" （确认dateInstance是否为Date的实例）

let myObj = {};
console.log(myObj instanceof Object); // 输出 "true" （所有对象都继承自Object，因此此例输出true）
```

### Object.prototype.toString.call()

```js
let arr = [];
console.log(Object.prototype.toString.call(arr)); // 输出 "[object Array]"（可明确得知 arr 是数组类型）

let myObj = {};
console.log(Object.prototype.toString.call(myObj)); // 输出 "[object Object]"

console.log(Object.prototype.toString.call(null)); // 输出 "[object Null]"
console.log(Object.prototype.toString.call(NaN)); // 输出 "[object Number]"
```

### Array.isArray()

```js
let arr = [];
console.log(Array.isArray(arr)); // 输出 "true" （专用方法来检测是否为数组类型）

let notAnArr = {};
console.log(Array.isArray(notAnArr)); // 输出 "false"
```

### Constructor 属性

```js
let str = 'hello';
console.log(str.constructor === String); // 输出 "true" （但这依赖于对象没有被重新定义构造函数的情况）

let num = 42;
console.log(num.constructor === Number); // 输出 "true"

// 注意：这种方法并不推荐，因为对象的 constructor 属性是可以被改变的，不如使用 typeof 或 instanceof 可靠。
```

### 额外的实用函数（如 lodash.isPlainObject() 等第三方库提供的函数）

```js
// 如果你正在使用像 lodash 这样的库，它可以提供更精细的类型检测功能
import \_ from 'lodash';

let plainObj = { a: 1 };
console.log(\_.isPlainObject(plainObj)); // 输出 "true" （检测是否为简单对象，非 Array、Function 等）
```

每种方法都有其适用场景和局限性，选择合适的方法取决于你要解决的具体问题。

例如: typeof 适合快速判断基础类型，instanceof 用于检测对象是否为某个构造函数的实例，而 Object.prototype.toString.call() 能够更加细致地区分不同类型的对象。

## for...in 和 for...of

### for...in

- 作用：主要用于遍历对象自身的（以及其原型链上的）可枚举属性。
- 使用场景：
  - 当你需要查看或操作对象的所有属性时，无论这些属性是对象自身定义的还是继承自原型链的。
  - 遍历 JSON 对象、自定义对象的键（key）。
- 示例：

```js
let obj = { a: 1, b: 2, c: 3 };
for (let prop in obj) {
  console.log(prop, obj[prop]);
}
// 输出:
// a 1
// b 2
// c 3
```

### for...of

- 作用：主要用于遍历可迭代对象（Iterable objects）的元素，如数组、Set、Map、某些类型的字符串、生成器对象等。
- 使用场景：
  - 遍历数组的元素，而不是索引。
  - 遍历 Set 或 Map 的内容，直接获取集合中的值。
  - 遍历具有迭代接口的其他数据结构。
- 示例：

```js
let arr = [1, 2, 3];
for (let value of arr) {
  console.log(value);
}
// 输出:
// 1
// 2
// 3

let str = 'Hello';
for (let char of str) {
  console.log(char);
}
// 输出:
// H
// e
// l
// l
// o
```

总结：

1. for...in 循环用于遍历对象的属性名，适用于处理对象结构。
2. for...of 循环用于遍历可迭代对象的元素，适用于处理数据集合或序列。

## call, apply 和 bind

### call

- 作用：调用函数并在指定的 this 上下文中执行，同时可以直接传递参数。
- 语法：fun.call(thisArg[, arg1[, arg2[, ...]]])
- 示例：

```js
function greet(name) {
  console.log(`Hello, ${this.name}, ${name}`);
}
let user = { name: 'John' };
greet.call(user, 'Doe'); // 输出：Hello, John, Doe
```

### apply

- 作用：与 call() 类似，也是调用函数并在指定的 this 上下文中执行，但是它接收参数的方式不同。
- 语法：fun.apply(thisArg, [argsArray])
- 示例：

```js
function add(a, b) {
  console.log(this.label + ' -> ' + (a + b));
}
let calculator = { label: 'Calculator' };
add.apply(calculator, [10, 20]); // 输出：Calculator -> 30
```

### bind

- 作用：创建一个新的函数，当调用这个新函数时，它的 this 值被永久地绑定到了 bind() 的第一个参数上。新函数并不会立即执行，而是返回一个已绑定上下文的新函数引用。
- 语法：fun.bind(thisArg[, arg1[, arg2[, ...]]])
- 示例：

```js
function logMessage(message) {
  console.log(`${this.user}: ${message}`);
}
let userContext = { user: 'User1' };
let boundLog = logMessage.bind(userContext);
boundLog('Some message'); // 输出：User1: Some message
// 可以延迟调用
setTimeout(boundLog, 1000, 'Delayed message'); // 输出：User1: Delayed message
```

总结：

1. call 和 apply 都是在调用时就立刻执行原函数，只是参数传递方式不同，call 接受的是一个个单独的参数，apply 接收的是一个数组作为参数列表。
2. bind 并不执行函数，而是创建并返回一个新的函数，这个新函数保持了对其原函数的引用，并且具有预先设定好的 this 值。它可以用于事件处理函数、定时器回调等场合，确保在回调函数执行时 this 指向预期的对象。

## 事件冒泡，事件捕获以及事件委托

### 事件冒泡

事件冒泡是 DOM 事件流的一个重要组成部分，它描述了事件从触发事件的元素（称为“目标元素”）开始，沿着 DOM 树向上逐级传播至根节点（通常是 document）的过程。这个过程就像气泡从水底升至水面一样，因此得名“事件冒泡”。

具体来说，当用户在一个元素上触发某个事件（如点击、鼠标移动等），事件首先在目标元素上触发，然后依次传递到其直接父元素、祖父元素等，直到抵达最顶层的 document 对象。每个层级的元素在接收到事件时，都会执行在此元素上注册的同类型事件处理程序。

```html
<div id="a">
  <div id="b">
    <div id="c"></div>
  </div>
</div>
```

```js
let a = document.getElementById('a');
let b = document.getElementById('b');
let c = document.getElementById('c');

a.addEventListener('click', () => {
  console.log('a被点击');
});

b.addEventListener('click', (event) => {
  console.log('b被点击');
});

c.addEventListener('click', (event) => {
  console.log('c被点击');
});
```

当我们点击 c 的时候，会发现控制台会打印的顺序为 c,b,a

### 阻止默认行为方法

有时候，在处理事件的过程中，我们可能需要阻止事件的默认行为，例如点击链接时阻止跳转页面。在 JavaScript 中，我们可以使用 event.stopPropagation() 方法来阻止事件流的传播。调用该方法后，事件将不再继续传播，不会触发其他元素上的事件处理函数。
在 b 内添加该方法可以阻止 b 之后的事件流传播

```html
<div id="a">
  <div id="b"></div>
</div>
```

```js
let a = document.getElementById('a');
let b = document.getElementById('b');
a.addEventListener('click', () => {
  console.log('a被点击');
});

b.addEventListener('click', (event) => {
  console.log('b被点击');
  event.stopPropagation();
});
```

也就是点击 b 的时候，不会冒泡给 a 事件，a 的事件是不会触发的

### 事件捕获

与事件冒泡相对的是事件捕获。事件捕获是事件流的另一部分，它发生在事件冒泡之前。事件捕获是从 document 开始，沿着 DOM 树向下传播至目标元素的过程。在这个阶段，事件首先由 document 接收，然后传递给最近的祖先元素，再逐级向下直至到达触发事件的目标元素。

事件捕获的设计初衷是为了让处于 DOM 结构较上层的元素有机会在事件实际发生于子元素之前就得到通知。然而，在大多数 Web 开发场景中，事件捕获阶段的事件处理程序并不常用，开发者通常更关注事件冒泡阶段。要指定事件监听器在捕获阶段触发，可以将 addEventListener 的第三个参数设置为 true

```js
document.addEventListener('click', handler, true); // 在捕获阶段触发
```

### 事件委托

事件委托是一种利用事件冒泡（或事件捕获，但通常使用事件冒泡）机制优化事件处理的技术。它的核心思想是：不是直接将事件监听器绑定到可能触发事件的所有子元素上，而是将其绑定到这些子元素的共同父元素或祖先元素上。

当子元素触发事件时，事件会按照事件冒泡的规则向上传播到已绑定事件的父元素。父元素的事件处理器可以通过检查事件对象的 event.target 属性来确定实际触发事件的子元素，然后根据需要执行相应的操作。

事件委托的优点包括：

提高性能：对于动态添加、删除或更新的子元素，无需反复为它们添加或移除事件监听器，只需保持对父元素的单个监听器即可。
减少内存占用：特别是在大型 DOM 树或频繁变化的元素集合中，避免了大量的事件处理器占用内存。
简化代码：对于具有相似事件处理需求的子元素，可以在父元素的事件处理器中统一处理，无需为每个子元素编写独立的事件处理逻辑。

```js
const parentElement = document.getElementById('parent');

parentElement.addEventListener('click', function (event) {
  const target = event.target;

  if (target.matches('.child-element')) {
    // 处理点击了.child-element类的子元素的情况
  } else if (target.matches('.another-child')) {
    // 处理点击了.another-child类的子元素的情况
  }

  // ... 其他子元素的处理逻辑
});
```

在这个例子中，所有.child-element 和.another-child 类的子元素的点击事件都会冒泡到 parentElement，然后由其上的事件处理器根据 event.target 进行相应的处理。这样，即使子元素数量众多或动态变化，也只需维护 parentElement 上的单一事件监听器。

## 闭包

### 定义

有权访问另一个函数作用域内变量的函数

### 原理

闭包的实现，实际上是利用了 JavaScript 中作用域链的概念，简单理解就是：在 JavaScript 中，如果在某个作用域下访问某个变量的时候，如果不存在，就一直向外层寻找，直到在全局作用域下找到对应的变量为止，这里就形成了所谓的作用域链。

### 特性

1. 闭包可以访问到父级函数的变量
2. 访问到父级函数的变量不会销毁

### 节流防抖

```js
// 节流
function throttle(fn, timeout) {
  let timer = null;
  return function (...arg) {
    if (timer) return;
    timer = setTimeout(() => {
      fn.apply(this, arg);
      timer = null;
    }, timeout);
  };
}

// 防抖
function debounce(fn, timeout) {
  let timer = null;
  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arg);
    }, timeout);
  };
}
```
