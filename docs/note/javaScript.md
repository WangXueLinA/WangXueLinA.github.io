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

- 函数防抖，在一段连续操作结束后，处理回调，利用 clearTimeout 和 setTimeout 实现。函数节流，在一段连续操作中，每一段时间只执行一次，频率较高的事件中使用来提高性能
- 函数防抖关注一定时间连续触发的事件，只在最后执行一次，而函数节流一段时间内只执行一次

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

**使用 Node.js 和 Express 创建代理服务器**

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

```
const arr = [1,2,3]
arr.forEach((item) => { // 遍历回调
  console.log(item)  // 先执行
})

console.log('forEach()之后')  // 后执行
```

异步回调

理解：不会立即执行，会放在回调队列中将来执行

例子：定时器回调，axaj 回调，Promise 的成功，失败的回调

```
// 先执行2,后执行 1
setTimeout(() => {
  console.log('1')
}, 0)

console.log('2')
```

## 闭包
