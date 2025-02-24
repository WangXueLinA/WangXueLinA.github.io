---
toc: content
title: setup
order: -99
---

# Vue3

## setup

### 为何引入

1. 解决 Options API 的局限性

在 Vue2 的 Options API（data, methods, computed 等选项）中，当组件逻辑复杂时，相关代码会被拆分到不同选项中，导致逻辑碎片化。例如，一个功能相关的 data、method 和生命周期钩子可能分散在不同位置。

目标：setup 允许将同一功能的逻辑集中在一起，提升代码可读性和可维护性。

2. 更好的逻辑复用

Vue2 的 Mixins 容易导致命名冲突和来源不清晰。

解决方案：通过 setup + 自定义组合函数（如 useCounter()），可以更安全、灵活地复用逻辑。

3. 更好的 TypeScript 支持

Composition API 天然适合类型推导，setup 中定义的变量和函数可以轻松获得类型提示。

### 定义

setup 是一个函数，在组件实例创建之前执行，用于定义响应式数据、方法、生命周期钩子等

```js
export default {
  props: ['title'],
  setup(props, context) {
    // 1. 响应式数据
    const count = ref(0);

    // 2. 方法
    const increment = () => count.value++;

    // 3. 生命周期钩子
    onMounted(() => console.log('组件已挂载'));

    // 4. 返回模板使用的数据和方法
    return { count, increment };
  },
};
```

参数：

- props：父组件传递的响应式 props（不可解构，否则失去响应性）。

```js
// ❌ 错误：直接解构会失去响应性
const { title } = props;

// ✅ 正确：使用 toRefs 保持响应性
const { title } = toRefs(props);
console.log(title.value);
```

- context：上下文对象，包含 attrs, slots, emit 等非响应式属性。

```js
setup(props, { attrs, slots, emit }) {
  emit('change', newValue); // 触发事件
}
```

返回值：

- 返回一个对象，对象中的属性和方法可以在模板中直接使用。

```js
<template>
  <button @click="increment">{{ count }}</button>
</template>

export default {
  setup(props, context) {
    const count = ref(0);
    const increment = () => count.value++;

    return { count, increment };
  },
}
```

- 也可以返回一个渲染函数（如 JSX）。

```js
import { h } from 'vue';
setup() {
  return () => h('div', 'Hello World');
}
```

### 使用场景

1. 将同一功能的代码集中在一起

```js
function useUser() {
  const users = ref([]);
  const fetchUsers = async () => {
    users.value = await api.getUsers();
  };
  onMounted(fetchUsers);
  return { users, fetchUsers };
}

// 组件中使用
setup() {
  const { users, fetchUsers } = useUser();
  return { users, fetchUsers };
}
```

2. 逻辑复用（替代 Mixins）

```js
// useCounter.js
export function useCounter(initialValue = 0) {
  const count = ref(initialValue);
  const increment = () => count.value++;
  return { count, increment };
}

// 组件A
setup() {
  const { count, increment } = useCounter(10);
  return { count, increment };
}

// 组件B
setup() {
  const { count, increment } = useCounter(20);
  return { count, increment };
}
```

3. 与 TypeScript 结合

```js
interface Props {
  title: string;
}

setup(props: Props) {
  const count = ref<number>(0);
  return { count };
}
```

### 注意事项

1. this 不可用：

setup 在组件实例创建前执行，this 为 undefined。

2. 响应式数据必须用 ref/reactive：

直接修改普通变量不会触发视图更新。

```js
// ❌ 错误：非响应式
let count = 0;
const increment = () => count++;

// ✅ 正确：使用 ref
const count = ref(0);
const increment = () => count.value++;
```

3. 避免直接解构 props：

使用 toRefs 或 toRef 保持响应性。

```javascript
const { title } = toRefs(props);
```

4. 异步处理：

setup 不能是一个 async 函数，本身不支持异步， 因为返回值不再是 return 的对象，而是 promise，模板看不到 return 对象中的属性。但可以在内部处理异步逻辑。(后期也可以返回一个 Promise 实例，但需要 Suspense 和异步组件配合)

```javascript
setup() {
  const data = ref(null);
  fetchData().then(res => data.value = res);
  return { data };
}
```
