---
toc: content
title: async/await
---

# javascript

## async 函数

定义：用 async 关键字声明的函数，称为异步函数。

```javascript
async function myFunc() {
  /* ... */
}
```

返回值：始终返回一个 Promise 对象。

若函数内返回非 Promise 值，它会被自动包装为 Promise.resolve(值)。

若抛出错误，返回 Promise.reject(错误)。

```javascript
async function foo() {
  return 42; // 等价于 Promise.resolve(42)
}
foo().then((value) => console.log(value)); // 输出 42
```

## await 表达式

用法：只能在 async 函数内部使用，后跟一个 Promise 对象。

```javascript
const result = await somePromise;
```

行为：

- 暂停当前 async 函数的执行，等待 Promise 完成。
- 若 Promise 解决（resolve），返回解决的值。
- 若 Promise 拒绝（reject），抛出拒绝的原因（可用 try...catch 捕获）。

```javascript
async function bar() {
  const value = await new Promise((resolve) =>
    setTimeout(() => resolve('完成'), 1000),
  );
  console.log(value); // 1秒后输出 "完成"
}
```

JavaScript 引擎会自动将常量包装成一个已解决的 Promise，等价于 Promise.resolve(常量)。

```js
async function example() {
  const result = await 'hello'; // 转换为 await Promise.resolve('hello')
  console.log(result); // 输出 'hello'
}
example();
```

result 的值就是 'hello'，代码会立即执行，没有延迟。

## 错误处理

使用 try...catch 捕获 await 导致的异常：

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com');
    const data = await response.json();
  } catch (error) {
    console.error('请求失败:', error);
  }
}
```

## 执行顺序与控制

串行执行：多个 await 按顺序执行。

```javascript
async function serial() {
  await task1(); // 等待task1完成
  await task2(); // 再执行task2
}
```

并行执行：使用 Promise.all 优化多个独立操作。

```javascript
async function parallel() {
  const [result1, result2] = await Promise.all([task1(), task2()]);
}
```

## 替代 Promise 链：

```javascript
// Promise链
function oldWay() {
  fetchData().then(processData).then(displayData).catch(handleError);
}

// async/await
async function newWay() {
  try {
    const data = await fetchData();
    const processed = await processData(data);
    displayData(processed);
  } catch (err) {
    handleError(err);
  }
}
```
