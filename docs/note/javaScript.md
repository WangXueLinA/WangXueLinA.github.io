---
toc: content
title: JavaScript
group: JS
---

# JavaScript

## 数据类型

### 基本数据类型：

- **Undefined**: 表示变量已声明但尚未初始化，或者是访问不存在的对象属性时返回的默认值。
- **Null**: 类型只有一个值 null，它表示空值或无对象。尽管在 JavaScript 中 typeof null 返回 "object"，但在概念上它被认为是独立于对象的基本类型。
- **Boolean**: 有两种可能的值 true 或 false，用于表示逻辑状态。
- **Number**: 表示数值，可以是整数或浮点数，还包括特殊的 Infinity、-Infinity 和 NaN（非数字，Not-a-Number）。
- **String**: 表示文本字符序列，由单引号或双引号包裹。
- **BigInt**: ES6 新增的数据类型，用来表示大于 `Number.MAX_SAFE_INTEGER` 但仍能精确表示的大整数，如 123n。
- **Symbol**: 也是 ES6 新增的数据类型，它是唯一的、不可变的原始值，用于生成唯一的标识符，避免命名冲突。

### 引用数据类型：

- **Object**: 包括普通对象、数组、函数、Date、RegExp、Map、Set 等，这些类型的值是存储在堆内存中的对象实例，变量实际上保存的是指向堆内存中该对象的引用地址。
- **Array**: 是特殊的对象，用于存储有序的元素列表，可以通过索引访问。
- **Function**: 函数也是对象，可以被赋值给变量，并可以作为参数传递和返回。
- **其它内置对象**: 如 Date 用于处理日期和时间，RegExp 用于正则表达式匹配等。

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

相同点：

- 都可以通过使用 setTimeout 实现
- 目的都是，降低回调执行频率。节省计算资源

不同点：

1.  - 函数防抖：在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现。
    - 函数节流：在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能

2.  - 函数防抖：在事件被触发后，在指定的时间内如果事件没有再次被触发，则执行一次函数；如果在这段时间内事件再次被触发，则重新计时。输入框搜索、窗口大小调整等。
    - 函数节流：在规定的时间间隔内，无论事件触发了多少次，都只执行一次函数。如滚动监听、鼠标移动等。

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

## 深拷贝与浅拷贝

### 浅拷贝

浅拷贝只复制对象的第一层属性，如果属性是一个基本数据类型（如字符串、数字、布尔值等），那么该值会被直接复制。但如果属性是一个复杂的数据类型（如对象、数组等引用类型），浅拷贝只会复制这个引用的地址，而不复制引用地址所指向的实际对象。因此，原对象和拷贝对象会共享这些引用类型的数据，改动其中一个会影响另一个。

浅拷贝可以通过以下方法实现：

- `Object.assign()`:用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

```js
let obj1 = { a: 1, b: { c: 2 } };
let obj2 = Object.assign({}, obj1);
obj2.b.c = 3; // 修改obj2的b.c也会影响到obj1的b.c
```

- 扩展运算符 ...: 这也可以用于浅拷贝。

```js
let obj1 = { a: 1, b: { c: 2 } };
let obj2 = { ...obj1 };
obj2.b.c = 3; // 同样，修改obj2的b.c也会影响到obj1的b.c
```

- `Array.prototype.slice()` 和 `Array.prototype.concat()`：这两个方法用于数组的浅拷贝。

```js
let arr1 = [1, 2, [3, 4]];
let arr2 = arr1.slice();
arr2[2][0] = 5; // 修改arr2的[2][0]也会影响到arr1的[2][0]
```

### 深拷贝

深拷贝会复制对象的所有层次。如果对象的属性值是一个引用类型，那么会递归地复制这个引用类型，直到其所有的子对象都被复制。因此，修改新对象中的任何值，都不会影响到原对象。

实现深拷贝的方法有：

例如有一个包含嵌套对象的对象

```js
let obj = {
  name: 'Alice',
  details: {
    age: 30,
    address: {
      city: 'New York',
    },
  },
};
```

- 迭代递归法：手动遍历对象的所有属性，如果属性是引用类型，则递归调用深拷贝函数。

```js
function deepCopy(obj) {
  if (typeof obj !== 'object' || obj === null) return obj;
  let copy = Array.isArray(obj) ? [] : {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      copy[key] = deepCopy(obj[key]);
    }
  }
  return copy;
}

let deepCopyObj = deepCopy(obj);
deepCopyObj.details.address.city = 'Los Angeles';
// 此时，obj.details.address.city 仍为 "New York"
```

- 序列化反序列化法：使用 JSON.stringify()将对象转化为字符串，然后再使用 JSON.parse()将字符串转化为新的对象。这种方法的限制是它不能处理函数和循环引用的情况。⚠️ 注意，当属性值内包含 undefined 不好用

```js
let deepCopyObj = JSON.parse(JSON.stringify(obj));
deepCopyObj.details.address.city = 'Los Angeles';
// 此时，obj.details.address.city 仍为 "New York"
```

- 使用第三方库: 如 lodash 的 cloneDeep()方法。

```js
import _ from 'lodash';
const deep = _.cloneDeep(obj);
```

## Axios 与 Fetch 区别

Axios 和 Fetch 都是用于在 JavaScript 中发送 HTTP 请求的工具，但它们在设计、用法、特性和兼容性方面存在一些关键差异：

1. 设计与实现
   - Axios 是一个基于 Promise 的第三方库，专为浏览器和 Node.js 环境设计。它提供了简单、直观的 API，易于发送 GET、POST、PUT 等各种类型的 HTTP 请求，并且内置了许多高级特性，如拦截请求和响应、自动转换请求和响应数据、取消请求等。
   - Fetch 是一个原生的 JavaScript Web API，它是 W3C 的标准，无需额外安装，直接在现代浏览器中可用。Fetch 也是基于 Promise 的，但它的设计更加底层，提供了更原始的 HTTP 请求能力，这意味着开发者需要手动处理更多细节，如设置请求头、处理响应等。
2. 语法与用法

- Axios 提供了一个基于 Promise 的、更简洁和直观的 API。它允许你直接通过函数调用发送 GET、POST、PUT 等请求，并且可以方便地在配置对象中设置请求头、请求体、超时等选项。Axios 的设计使得错误处理更为直接，因为它会自动抛出错误，包括网络错误和 HTTP 错误状态。

如 GET 请求:

```js
import axios from 'axios';

axios
  .get('https://api.example.com/data')
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
```

- Fetch 是浏览器的原生 API，使用时可能需要更复杂的操作，比如手动处理请求头、JSON 数据解析等。Fetch 也是基于 Promise，但在处理响应时不会自动将 JSON 转换为 JavaScript 对象，你需要手动调用 response.json() 或其他方法来处理响应体。Fetch 的灵活性较高，但也意味着需要编写更多的代码来处理各种情况。

  如 GET 请求:

```js
fetch('https://api.example.com/data')
  .then((response) => {
    if (!response.ok) {
      throw new Error('HTTP error ' + response.status);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error('Error fetching data:', error);
  });
```

1. 兼容性
   - Axios 提供了更好的跨环境兼容性，既可在浏览器中使用，也可在 Node.js 环境下运行，而且对旧浏览器的支持通过垫片等方式更容易解决。
   - Fetch 是现代浏览器的标准功能，但在一些较旧的浏览器（特别是 IE11 及以下版本）中可能不被支持，需要引入 polyfill（如 whatwg-fetch）来增加支持。
2. 功能特性：

- 拦截器：
  Axios 支持请求和响应的拦截器，允许在请求发送前或响应到达应用前进行统一处理，如添加认证信息、处理错误等。
- 超时处理：
  Axios 直接提供 timeout 配置来设定请求超时时间，而 Fetch 需要借助 AbortController 来实现类似功能。
- 错误处理：Axios 在遇到网络错误或 HTTP 错误状态码时会自动抛出错误，便于错误处理。Fetch 则需要检查 response.ok 属性或捕获 promise 的拒绝状态来处理错误。
- 数据处理：Axios 默认处理 JSON 数据，自动将响应转换为 JavaScript 对象，而 Fetch 返回的是一个 Response 对象，需要调用 .json() 方法进一步处理。

总结：
尽管 Fetch 是原生的、标准的 API，提供了一些底层的灵活性，但 Axios 因其易用性、丰富的功能集（如拦截器、超时、自动转换）以及更好的跨环境兼容性，常被视为更友好、更高效的选项，特别是在需要快速开发和维护大型项目时。然而，如果项目对体积有严格要求，或者希望充分利用现代浏览器的最新特性，Fetch 也是一个值得考虑的选择。

## 跨域

跨域问题源于浏览器的同源策略，该策略限制了从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，以保护用户信息的安全。以下是一些常见的跨域解决方案及其实现原理：

### JSONP

原理：
JSONP 利用了 `<script>` 标签可以跨域加载 JavaScript 文件的特性。服务器返回的不是直接的数据，而是一个包含数据的 JavaScript 函数调用，这个函数由前端定义并提供名称作为查询参数传给服务器。浏览器加载这个脚本时，会执行该函数，并将数据作为参数传递。

- 优点：兼容性好，适用于老版本浏览器。不受同源策略限制，可实现简单跨域请求。
- 缺点：只支持 GET 方法。存在安全风险，如可能遭受 XSS 攻击。

**前端准备**

1. 定义回调函数： 首先，在前端 JavaScript 代码中定义一个函数，这个函数将用于接收和处理从服务器返回的数据。例如

```js
function handleResponse(data) {
  console.log('Received data:', data);
  // 在这里处理data
}
```

2. 构造 URL： 在请求的 URL 中，包含一个查询参数（通常命名为 callback 或类似名字），其值为刚刚定义的函数名。如果服务器支持 JSONP，它会使用这个函数名来包裹响应数据。例如：

```js
const url = 'http://example.com/data?callback=handleResponse';
```

3. 插入 使用 DOM 操作动态创建一个`<script>`标签，将其 src 属性设置为我们构造的 URL，这样浏览器就会去加载这个脚本

```js
const script = document.createElement('script');
script.src = url;
document.head.appendChild(script);
```

**服务器端处理**

1. 识别 callback 参数： 当服务器收到带有 callback 参数的请求时，它需要识别这个参数值，即前端定义的函数名。

2. 封装数据： 服务器需要将实际要返回的数据，按照前端提供的函数名进行封装，形成一个可执行的 JavaScript 函数调用。例如，如果数据是{"key": "value"}，服务器返回的响应内容应该是：

```Javascript
handleResponse({"key": "value"});
```

3. 设置正确的 Content-Type： 服务器应该将响应的内容类型设置为 application/javascript，因为实际上返回的是一个 JavaScript 脚本。

**浏览器执行**

当浏览器加载这个`<script>`标签时，会执行其中的 JavaScript 代码，即调用之前定义好的 handleResponse 函数，并将服务器返回的数据作为参数传递进去。

### CORS (Cross-Origin Resource Sharing)

原理：
CORS 是一种更为灵活的跨域请求方式，通过在 HTTP 响应头中添加特定的字段来告知浏览器允许哪些来源的请求。关键的响应头是 `Access-Control-Allow-Origin`，它可以设置为特定源或者 `*` 表示允许任何源的请求（但不建议这样做，因为存在安全隐患）。

- 优点：支持各种 HTTP 方法。安全性较高，可以通过设置控制权限级别。
- 缺点：需要服务器端的支持和配置。

### 代理服务器

原理：
在客户端和服务器之间架设一个代理服务器，客户端的所有请求都发送到这个代理，代理服务器再将请求转发给实际的目标服务器，从而绕过浏览器的同源策略限制。常见的代理方式有 Nginx 代理、Node.js 中的 http-proxy-middleware 等。

- 优点：灵活，可以处理各种复杂场景。可以统一处理跨域问题，简化前端配置。
- 缺点：需要额外维护代理服务器。增加了网络延迟。

#### 打包工具（如 webpack）自带的服务器

Webpack 自带的服务器 (Webpack Dev Server) 支持代理功能（仅针对开发环境），Webpack Dev Server 使用了 Node.js 的 http 模块来处理 HTTP 请求。当配置了代理时，它实际上是使用了一个内置的代理中间件来处理请求。当请求到达时，Webpack Dev Server 会检查请求路径是否匹配任何代理规则。如果匹配，它会使用 Node.js 的 http 模块发送请求到目标服务器，并将响应返回给客户端。

1. 安装 Webpack Dev Server:

```bash
npm install --save-dev webpack-dev-server
```

1. 配置 webpack.config.js:在 webpack.config.js 文件中，你可以配置 devServer 的 proxy 属性来实现代理。

```js
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 9000,
    historyApiFallback: true,
    proxy: {
      '/api': 'http://backend.example.com', // 代理所有以 /api 开头的请求到 http://backend.example.com
    },
  },
};
```

这个配置将把所有以 /api 开头的请求代理到 `http://backend.example.com。`

3. 启动 Webpack Dev Server:修改 package.json 文件中的 scripts 部分，增加启动命令

```js
"scripts": {
  "start": "webpack serve --open",
  "build": "webpack"
}
```

然后运行 npm start，这将会启动 Webpack Dev Server 并自动打开浏览器。

#### 使用 Node.js 和 Express 创建代理服务器

1. 安装依赖

首先，确保你已安装 Node.js 环境，然后创建一个新的项目目录，进入该目录并初始化 npm：

```js
mkdir my-proxy-server
cd my-proxy-server
npm init -y
```

接着，安装 Express 和 http-proxy-middleware（这是一个用于 Express 的 HTTP 请求代理中间件）：

```js
npm install express http-proxy-middleware
```

2. 创建代理服务器

在项目根目录下创建一个名为 server.js 的文件，编辑该文件以设置 Express 服务器和代理中间件：

```js
// server.js
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// 设置代理中间件，将所有以'/api/'开头的请求代理到目标服务器
const apiProxy = createProxyMiddleware('/api', {
  target: 'http://target-api.example.com', // 目标服务器地址
  changeOrigin: true, // 使代理服务器设置 origin 头部为 target 的 origin
  pathRewrite: { '^/api': '' }, // 移除请求路径中的/api 前缀，以便正确路由到目标服务器
});

app.use(apiProxy);

// 启动服务器
app.listen(3000, () => {
  console.log(`Proxy server is running on port 3000`);
});
```

在这个例子中，我们创建了一个 Express 应用，并使用 http-proxy-middleware 中间件来处理所有以/api/开头的请求，将其代理到`http://target-api.example.com`这个假设的目标 API 服务器上。

3. 启动服务器

在终端中运行 server.js 文件来启动代理服务器：

```js
node server.js
```

前端请求代码中，原本需要直接向跨域 API 服务器发起的请求，现在改为向本地的代理服务器发送请求。例如，原本的请求可能是：

```js
// 原请求
axios.get('http://target-api.example.com/data');

// 现在改为：
axios.get('/api/data');
```

这里的/api/data 请求会被我们的代理服务器捕获，并转发到`http://target-api.example.com/data`。通过这种方式，前端可以绕过浏览器的同源策略限制，成功访问到不同源的 API 数据，而无需修改浏览器的安全策略或服务器的 CORS 设置。

#### 使用 Nginx 服务器

原理：服务器和服务器之间的通信不存在跨域，因此我们可以开一台中间服务器（nginx），后端无需改变。前端把请求发给 nginx , nginx 服务器把请求毫无变化地转发给后端的服务器，后端的服务器响应给 nginx 服务器，nginx 服务器加上响应头以后，再返回给前端。

![](/images/js/image13.jpg)

```bash
server {
	listen 8866 default_server; # 因为我的 80 端口被其它服务占用了，因此改一下
	listen [::]:8866 default_server;

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		try_files $uri $uri/ =404;
	}

  #允许跨域请求的域，* 代表所有
  add_header 'Access-Control-Allow-Origin' *;
  #允许带上cookie请求
  add_header 'Access-Control-Allow-Credentials' 'true';
  #允许请求的方法，比如 GET/POST/PUT/DELETE
  add_header 'Access-Control-Allow-Methods' *;
  #允许请求的header
  add_header 'Access-Control-Allow-Headers' *;
  location /api {
    proxy_pass http://172.17.16.1:3000; # 把所有的/api 开头的path 代理到这个位置,和vite 配置类似
  }

}

```

### WebSocket

原理：
WebSocket 是一种在单个 TCP 连接上进行全双工通信的协议。它允许跨域通信，因为其握手阶段包含了 Origin 头部，服务器可以根据此头部判断是否接受连接。一旦连接建立，后续的数据传输就不受同源策略限制。

- 优点：实时双向通信。适合实时应用，如聊天、游戏。
- 缺点：不是所有场景都需要 WebSocket 的实时性和复杂性。

**前端实现**
使用原生 WebSocket API 来创建一个 WebSocket 连接

```js
// 假设服务器地址为ws://example.com/chat，端口号如果非默认可以加上，如ws://example.com:8080/chat
const socket = new WebSocket('ws://example.com/chat');

socket.addEventListener('open', (event) => {
    console.log('Connection open!');
    socket.send('Hello Server!');
});

socket.addEventListener('message', (event) {
    console.log('Message from server:', event.data);
});

socket.addEventListener('error', (error) => {
    console.error('Error detected: ', error);
});

socket.addEventListener('close', (event) => {
    console.log('Connection closed');
});
```

**后端实现（以 Node.js 和 WebSocket 库 ws 为例）**
在后端，我们需要创建一个 WebSocket 服务器并允许跨域连接。这里使用 ws 库作为 WebSocket 服务器：

首先安装 ws 库：

```js
npm install ws
```

然后创建一个简单的 WebSocket 服务器，允许来自任何源的连接（注意：在生产环境中，出于安全考虑，应当明确指定允许的源）：

```js
// server.js
const WebSocket = require('ws');

const server = new WebSocket.Server({ port: 8080 });

server.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('message', (message) => {
    console.log(`Received message => ${message}`);
    socket.send(`You sent -> ${message}`);
  });

  socket.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is listening on port 8080');
```

**跨域配置**
虽然 WebSocket 协议本身不强制要求服务器设置特定的 CORS 头，但如果要严格遵守标准和提高安全性，服务器端可以设置适当的响应头来指示允许的源。使用 Node.js 和 ws 库，可以通过监听 HTTP 升级请求来设置这些头：

```js
server.on('upgrade', (request, socket, head) => {
  socket.setTimeout(0); // 防止socket超时关闭
  // 允许任意源连接
  socket.setHeader('Access-Control-Allow-Origin', '*');
  socket.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS',
  );
  socket.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization',
  );

  server.handleUpgrade(request, socket, head, (ws) => {
    server.emit('connection', ws, request);
  });
});
```

这段代码在 WebSocket 服务器接收到 HTTP 升级请求时设置跨域相关的响应头，允许任何源('\*')发起 WebSocket 连接。在实际部署时，你应该根据实际情况调整 Access-Control-Allow-Origin 的值，而不是简单地允许所有源，以避免安全风险。

### postMessage

原理：
HTML5 引入的 window.postMessage 方法允许来自不同源的脚本采用异步方式进行有限制的通信，可以实现跨域消息传递。发送方通过 postMessage 发送消息，接收方监听 message 事件来接收消息。

- 优点：适用于 iframe、Web Workers、不同窗口或不同源的页面间通信。
- 缺点：需要双方配合，且可能引入安全风险，需谨慎处理接收到的消息。

**发送方（源页面）**

假设有一个页面 A（源页面），想要向页面 B（目标页面，位于不同的源）发送消息。如果页面 B 在一个 iframe 中，代码如下：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Source Page</title>
  </head>
  <body>
    <iframe
      id="frame"
      src="http://target-domain.com/target.html"
      width="500"
      height="300"
    ></iframe>

    <script>
      document.getElementById('frame').addEventListener('load', () => {
        // 获取iframe的contentWindow，即目标页面的window对象
        let targetWindow = this.contentWindow;

        // 使用postMessage发送消息，第一个参数是要发送的数据，第二个参数是目标源的URL
        targetWindow.postMessage(
          'Hello from source page!',
          'http://target-domain.com',
        );
      });
    </script>
  </body>
</html>
```

**接收方（目标页面）**

在页面 B（目标页面）中，需要设置一个事件监听器来接收 message 事件，从而获取到来自源页面的消息：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Target Page</title>
  </head>
  <body>
    <script>
      // 设置message事件监听器，当接收到消息时执行回调函数
      window.addEventListener(
        'message',
        (event) => {
          // 确保消息来源于预期的源，防止安全问题
          if (event.origin !== 'http://source-domain.com') return; // 检查发送方的源是否匹配

          // 处理接收到的消息
          console.log('Received message:', event.data);

          // 可以在这里根据需要对消息进行处理
        },
        false,
      );
    </script>
  </body>
</html>
```

**工作原理**

发送消息：源页面通过 postMessage 方法将消息发送给目标窗口。这个方法接受两个参数：消息内容和目标窗口的源（协议+域名+端口）。如果目标源设置为'\*'，则表示消息可以发送给任何源，但这通常不推荐，因为存在安全风险。

接收消息：目标页面需要注册一个针对 message 事件的监听器。当消息到达时，事件触发，事件对象包含了发送的消息内容以及发送方的源信息。接收方可以通过检查 event.origin 来验证消息来源，确保消息来自于可信的源。

总结
每种跨域解决方案都有其适用场景和局限性，开发者应根据实际需求选择最适合的方案。CORS 由于其灵活性和安全性，成为了现代 Web 开发中最常用的跨域解决方案。

## this

### 全局上下文或普通函数调用

在全局上下文中（非严格模式下），this 指向全局对象，在浏览器中是 window，在 Node.js 中是 global。

```js
console.log(this); // 在浏览器中输出window，Node.js中输出global
```

当一个函数不作为某个对象的方法调用，而是独立调用时，this 同样指向全局对象（非严格模式）或 undefined（严格模式）。

```js
function sayHello() {
  console.log(this);
}

sayHello(); // 非严格模式下输出window或global，严格模式下输出undefined
```

### 对象方法中的 this

当函数作为某个对象的方法被调用时，this 指向该对象。

```js
const person = {
  name: 'Alice',
  sayHello: function () {
    console.log(this.name); // 输出'Alice'，因为this指向person对象
  },
};

person.sayHello();
```

### 构造函数中的 this

在使用 new 关键字调用构造函数时，this 指向新创建的对象实例。

```js
function Person(name) {
  this.name = name;
  console.log(this);
}

const alice = new Person('Alice'); // this指向新创建的alice对象
```

### 箭头函数

箭头函数不绑定自己的 this，它会捕获其所在上下文的 this 值作为自己的 this 值。

```js
const person = {
  name: 'Bob',
  sayHello: () => {
    console.log(this.name); // 这里的this仍然指向全局对象，因为箭头函数没有自己的this
  },
};

person.sayHello(); // 可能输出undefined或其他全局变量名，取决于环境
```

为了避免这种情况，如果需要在对象方法中使用箭头函数并希望 this 指向对象本身，可以在定义对象方法时使用普通函数。

### Function.prototype.call(), .apply(), 和 .bind()

这些方法可以显式地设置函数调用时 this 的值。

```js
function showName() {
  console.log(this.name);
}

const person1 = { name: 'Charlie' };
const person2 = { name: 'David' };

showName.call(person1); // 输出'Charlie'
showName.apply(person2); // 输出'David'

// 使用.bind()创建一个新的函数，其this值预先设定为person1
const boundShowName = showName.bind(person1);
boundShowName(); // 输出'Charlie'
```

## 回调函数 TODO

两种类型的回调函数

什么是回调？---我们定义的，但是我们没有调用，但是最终执行了

同步回调

理解：立即执行，完全执行完才结束，不会放在回调队列中

例子：数组遍历相关的回调函数

```js
const arr = [1, 2, 3];
arr.forEach((item) => {
  // 遍历回调
  console.log(item); // 先执行
});

console.log('forEach()之后'); // 后执行
```

异步回调

理解：不会立即执行，会放在回调队列中将来执行

例子：定时器回调，axaj 回调，Promise 的成功，失败的回调

```js
// 先执行2,后执行 1
setTimeout(() => {
  console.log('1');
}, 0);

console.log('2');
```

## 闭包

## 原型与原型链

### 构造函数创建对象

```js
function Person() {}
var person = new Person();
person.name = 'xuelin';
console.log(person.name); // xuelin
```

### prototype

每个函数都有一个 prototype 属性，就是我们经常在各种例子中看到的那个 prototype

```js
function Person() {}
// 虽然写在注释里，但是你要注意：
// prototype是函数才会有的属性
Person.prototype.name = 'xuelin';

var person1 = new Person();
var person2 = new Person();

console.log(person1.name); // xuelin
console.log(person2.name); // xuelin
```

函数的 prototype 属性指向了一个对象，这个对象正是调用该构造函数而创建的实例的原型，也就是这个例子中的 person1 和 person2 的原型。

每一个 JavaScript 对象(null 除外)在创建的时候就会与之关联另一个对象，这个对象就是我们所说的原型，每一个对象都会从原型"继承"属性。

用一张图表示构造函数和实例原型之间的关系

![](/images/js/image2.jpg)

### \_\__proto_\_\_

这是每一个 JavaScript 对象(除了 null )都具有的一个属性，叫\_\__proto_\_\_，这个属性会指向该对象的原型。

```js
function Person() {}
var person = new Person();
console.log(person.__proto__ === Person.prototype); // true
```

所以此时的关系图如图

![](/images/js/image3.jpg)

### constructor

每个原型都有一个 constructor 属性指向关联的构造函数

```js
function Person() {}
console.log(Person === Person.prototype.constructor); // true
```

所以此时的关系图如图

![](/images/js/image4.jpg)

综上我们已经得出：

```js
function Person() {}

var person = new Person();

console.log(person.__proto__ == Person.prototype); // true
console.log(Person.prototype.constructor == Person); // true
// 顺便学习一个ES5的方法,可以获得对象的原型
console.log(Object.getPrototypeOf(person) === Person.prototype); // true
```

实例对象的 constructor 属性指向构造函数

```js
function Person() {}
var person = new Person();
console.log(person.constructor === Person); // true
```

当获取 person.constructor 时，其实 person 中并没有 constructor 属性,当不能读取到 constructor 属性时，会从 person 的原型也就是 Person.prototype 中读取，正好原型中有该属性，所以：

```js
person.constructor === Person.prototype.constructor;
```

所以此时的关系图如图

![](/images/js/image7.jpg)

### 实例与原型

当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，一直找到最顶层为止

```js
function Person() {}

Person.prototype.name = 'xuelin';

var person = new Person();

person.name = 'xuelin2';
console.log(person.name); // xuelin2

delete person.name;
console.log(person.name); // xuelin
```

在这个例子中，我们给实例对象 person 添加了 name 属性，当我们打印 person.name 的时候，结果自然为 xuelin2

但是当我们删除了 person 的 name 属性时，读取 person.name，从 person 对象中找不到 name 属性就会从 person 的原型也就是 `person.__proto__` ，也就是 Person.prototype 中查找，幸运的是我们找到了 name 属性，结果为 xuelin

### 原型的原型

在前面，我们已经讲了原型也是一个对象，既然是对象，我们就可以用最原始的方式创建它，那就是

```js
var obj = new Object();
obj.name = 'xuelin';
console.log(obj.name); // xuelin
```

其实原型对象就是通过 Object 构造函数生成的，结合之前所讲，实例的 **proto** 指向构造函数的 prototype ，所以我们的关系图：

![](/images/js/image5.jpg)

### 原型链

那 Object.prototype 的原型呢？

```js
console.log(Object.prototype.__proto__ === null); // true
```

所以 `Object.prototype.__proto__` 的值为 null 跟 Object.prototype 没有原型，其实表达了一个意思。

所以查找属性的时候查到 Object.prototype 就可以停止查找了。

![](/images/js/image6.jpg)

## DOM

-----补充----

## BOM

BOM (Browser Object Model)，浏览器对象模型，提供了独立于内容与浏览器窗口进行交互的对象

其作用就是跟浏览器做一些交互效果,比如如何进行页面的后退，前进，刷新，浏览器的窗口发生变化，滚动条的滚动，以及获取客户的一些信息如：浏览器品牌版本，屏幕分辨率

浏览器的全部内容可以看成 DOM，整个浏览器可以看成 BOM。

### window

Bom 的核心对象是 window，它表示浏览器的一个实例
在浏览器中，window 对象有双重角色，即是浏览器窗口的一个接口，又是全局对象

1. 在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法

```js
var name = 'js每日一题';
function lookName() {
  alert(this.name);
}

console.log(window.name); //js每日一题
lookName(); //js每日一题
window.lookName(); //js每日一题
```

2. 查看浏览器窗口尺寸（或者叫可视区域，不包括工具栏和滚动条）
   ```js
   window.innerWidth;
   window.innerHeight;
   ```
3. 打开一个窗口

```js
window.open(URL, name, specs, replace);
```

说明：

- URL：表示要打开的页面地址。如果没有指定 URL，打开空白窗口
- name：指定 target 属性或窗口的名称
  - \_blank - URL 加载到一个新的窗口。这是默认
  - \_parent - URL 加载到父框架
  - \_self - URL 替换当前页面
  - \_top - URL 替换任何可加载的框架集
  - name - 窗口名称
- specs：设置窗口规格，可选。一个逗号分隔的项目列表

  - height=pixels 窗口的高度。最小值为 100
  - left=pixels 该窗口的左侧位置
  - location=yes|no|1|0 是否显示地址字段.默认值是 yes
  - menubar=yes|no|1|0 是否显示菜单栏.默认值是 yes
  - resizable=yes|no|1|0 是否可调整窗口大小.默认值是 yes
  - scrollbars=yes|no|1|0 是否显示滚动条.默认值是 yes
  - status=yes|no|1|0 是否要添加一个状态栏.默认值是 yes
  - titlebar=yes|no|1|0 是否显示标题栏.被忽略，除非调用 HTML 应用程序或一个值得信赖的对话框.默认值是 yes
  - toolbar=yes|no|1|0 是否显示浏览器工具栏.默认值是 yes
  - width=pixels 窗口的宽度.最小.值为 100

- replace：可选，用于替换浏览历史中的当前条目
  Optional.Specifies 规定了装载到窗口的 URL 是在窗口的浏览历史中创建一个新条目，还是替换浏览历史中的当前条目。支持下面的值：

  - true - URL 替换浏览历史中的当前条目。
  - false - URL 在浏览历史中创建新的条目。

### location

url 地址如下：

```js
http://foouser:barpassword@www.wrox.com:80/WileyCDA/?q=javascript#contents
```

location 属性描述如下：
|属性名 |例子 |说明|
|:---|:---|:---|
|hash| "#contents" |url 中#后面的字符，没有则返回空串|
|host |www.wrox.com:80 |服务器名称和端口号|
|hostname |www.wrox.com| 域名，不带端口号|
|href |http://www.wrox.com:80/WileyCDA/?q=javascript#contents |完整 url|
|pathname |"/WileyCDA/"| 服务器下面的文件路径
|port |80 |url 的端口号，没有则为空|
|protocol| http: |使用的协议|
|search |?q=javascript| url 的查询字符串，通常为？后面的内容|

### navigator

navigator 对象主要用来获取浏览器的属性，区分浏览器类型。属性较多，且兼容性比较复杂

navigator 对象包含有关浏览器的信息
navigator.appCodeName 返回浏览器的代码名
navigator.appName 返回浏览器的名称
navigator.appVersion 返回浏览器的平台和版本信息
navigator.cookieEnabled 返回指明浏览器中是否启用 cookie 的布尔值
navigator.platform 返回运行浏览器的操作系统平台
navigator.userAgent 返回由客户机发送服务器的 user-agent 头部的值

![](/images/js/image8.jpg)

### screen

保存的纯粹是客户端能力信息，也就是浏览器窗口外面的客户端显示器的信息，比如像素宽度和像素高度

可用的屏幕宽度和高度完整的分辨率：

- screen.width
- screen.height

![](/images/js/image9.jpg)

### history

history 对象主要用来操作浏览器 URL 的历史记录，可以通过参数向前，向后，或者向指定 URL 跳转
常用的属性如下：

- history.go()

接收一个整数数字或者字符串参数：向最近的一个记录中包含指定字符串的页面跳转，

```js
history.go('https://www.baidu.com/');
```

当参数为整数数字的时候，正数表示向前跳转指定的页面，负数为向后跳转指定的页面

```js
history.go(3); //向前跳转三个记录
history.go(-1); //向后跳转一个记录
```

- history.forward()：向前跳转一个页面
- history.back()：向后跳转一个页面
- history.length：获取历史记录数

## Ajax

即异步的 JavaScript 和 XML，是一种创建交互式网页应用的网页开发技术，可以在不重新加载整个网页的情况下，与服务器交换数据，并且更新部分网页。最大优势，<span style='color: red'>无刷新获取页面</span>

Ajax 的原理简单来说通过 XmlHttpRequest 对象来向服务器发异步请求，从服务器获得数据，然后用 JavaScript 来操作 DOM 而更新页面

流程图如下

![](/images/js/image10.jpg)

优点：

1. 可以无需刷新页面与服务器端进行通信
2. 允许你根据用户事件来更新部分页面内容（如 onClick...）

缺点：

1. 没有浏览历史，不能后退
2. 存在跨域问题（同源）
3. SEO 不友好

### 过程

实现 Ajax 异步交互需要服务器逻辑进行配合，需要完成以下步骤：

- 创建 Ajax 的核心对象 XMLHttpRequest 对象
- 通过 XMLHttpRequest 对象的 open() 方法与服务端建立连接
- 构建请求所需的数据内容，并通过 XMLHttpRequest 对象的 send() 方法发送给服务器端
- 通过 XMLHttpRequest 对象提供的 onreadystatechange 事件监听服务器端你的通信状态
- 接受并处理服务端向客户端响应的数据结果
- 将处理结果更新到 HTML 页面中

### 创建 XMLHttpRequest 对象

通过 XMLHttpRequest() 构造函数用于初始化一个 XMLHttpRequest 实例对象

```js
const xhr = new XMLHttpRequest();
```

### 与服务器建立连接

通过 XMLHttpRequest 对象的 open() 方法与服务器建立连接

```js
xhr.open(method, url, async);
```

参数说明：

- method：表示当前的请求方式，常见的有 GET、POST
- url：服务端地址
- async：布尔值，表示是否异步执行操作，默认为 true

如：

```js
xhr.open('POST', '/try/Ajax/demo_post2.php', true);
```

### 给服务端发送数据

通过 XMLHttpRequest 对象的 send() 方法，将客户端页面的数据发送给服务端

```js
xhr.send([body]);
```

body: 在 XHR 请求中要发送的数据体，如果不传递数据则为 null
如果使用 GET 请求发送数据的时候，需要注意如下：

- 将请求数据添加到 open()方法中的 url 地址中
- 发送请求数据中的 send()方法中参数设置为 null

如 post 请求：

```js
xhr.send('fname=Henry&lname=Ford');
```

### 绑定 onreadystatechange 事件

onreadystatechange 事件用于监听服务器端的通信状态，主要监听的属性为 XMLHttpRequest.readyState

关于 XMLHttpRequest.readyState 属性有五个状态，如下图显示

![](/images/js/image11.jpg)

只要 readyState 属性值一变化，就会触发一次 readystatechange 事件

XMLHttpRequest.responseText 属性用于接收服务器端的响应结果

### 封装

```js

//封装一个ajax请求
function ajax(options) {
    //创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()


    //初始化参数的内容
    options = options || {}
    options.type = (options.type || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    const params = options.data

    //发送请求
    if (options.type === 'GET') {
        xhr.open('GET', options.url + '?' + params, true)
        xhr.send(null)
    } else if (options.type === 'POST') {
        xhr.open('POST', options.url, true)
        xhr.send(params)

    //接收请求
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            let status = xhr.status
            if (status >= 200 && status < 300) {
                options.success && options.success(xhr.responseText, xhr.responseXML)
            } else {
                options.fail && options.fail(status)
            }
        }
    }
    xhr.abort() //用于停止正在进行的请求
}
```

使用方法如下：

```js
ajax({
  type: 'post',
  dataType: 'json',
  data: {},
  url: 'https://xxxx',
  success: function (text, xml) {
    //请求成功后的回调函数
    console.log(text);
  },
  fail: function (status) {
    ////请求失败后的回调函数
    console.log(status);
  },
});
```

## 浏览器事件（循环）处理机制

1. js 遇到异步并不会一直等待返回结果，而是将这个事件挂起，继续执行执行栈中的任务，当一个异步事件返回结果后，js 将这个事件加入与当前执行栈不同的另外一个队列中，我们称为事件队列，被放入事件队列不会立刻执行回调，而是等待当前执行栈中的所有任务都执行完毕之后，主线程处于闲置状态时，主线程会查看事件队列中是否有任务，如果有，那么主线程会从中取出排在第一位的事件，并把事件对应的回调放在执行栈中，然后执行其中的同步代码，如此反复，就成了一个无限循环
2. 宏任务：script(整体代码), setTimeout, setInterval, setImmediate, I/O, UI rendering
3. 微任务：promise 的回调如 then 和 catch，process.nextTick, Object.observe, MutationObserver
4. 第一次事件循环中，JavaScript 引擎会把整个 script 代码当成一个宏任务执行，执行完成之后，再检测本次循环中是否寻在微任务，存在的话就依次从微任务的任务队列中读取执行完所有的微任务，再读取宏任务的任务队列中的任务执行，再执行所有的微任务，如此循环。JS 的执行顺序就是每次事件循环中的宏任务-微任务。

## 去重

### ES6 的 Set 去重(最推荐)

new Set 是 ES6 新推出的一种类型。他和数组的区别在于，Set 类型中的数据不可以有重复的值。

将一个数组转化为 Set 数据，再转化回来，就完成了去重。

```js
const arr = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
const setData = Array.from(new Set(arr));
console.log(setData);
```

弊端： 无法去重引用类型的数据。比如对象数组。

![](/images/js/image12.jpg)

### 双重 for 循环去重(最古老的方法)

```js
//双重循环去重
const handleRemoveRepeat = (arr) => {
  for (let i = 0, len = arr.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      if (arr[i] === arr[j]) {
        arr.splice(j, 1);
        j--;
        len--;
      }
    }
  }
  return arr;
};
```

### indexOf 去重

```js
//去重
const handleRemoveRepeat = (arr) => {
  let repeatArr = [];
  for (let i = 0, len = arr.length; i < len; i++)
    if (repeatArr.indexOf(arr[i]) === -1) repeatArr.push(arr[i]);
  return repeatArr;
};
```
