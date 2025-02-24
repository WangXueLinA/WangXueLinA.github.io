---
toc: content
title: ref/reactive
order: -98
---

# Vue3

vue3 中为什么引入 ref 函数，有什么用，如何使用以及使用场景，注意的点，详细举例简单的完整的 vue 代码说明下

## ref

ref 是 Composition API 的核心响应式 API 之一，用于创建响应式数据。

### 为何引入

Vue3 的响应式系统基于 Proxy，但 Proxy 无法直接代理原始值（如 number, string）。ref 的作用是将原始值包装成一个响应式对象，通过 .value 属性访问其值，从而实现对基本类型的响应式支持。同时，ref 也可以用于对象，提供更灵活的数据管理。

ref 的用途

- 创建响应式数据：支持基本类型和对象。
- 在组合式 API 中传递响应式数据：保持数据的响应性。
- 明确数据变化的追踪：通过 .value 修改值，代码意图更清晰。

### 基本用法

1. 基本类型：用 ref() 包装，通过 .value 访问。
2. 模板中使用：自动解包，无需 .value。
3. 对象类型：修改属性需通过 .value（如 obj.value.key）。

```vue
<template>
  <button @click="increment">Count: {{ count }}</button>
  <p>User: {{ user.name }}, Age: {{ user.age }}</p>
  <button @click="updateUser">Update User</button>
</template>

<script setup>
import { ref } from 'vue';

// 基本类型
const count = ref(0);

// 对象类型
const user = ref({ name: 'Alice', age: 30 });

function increment() {
  count.value++; // JS 中需 .value
}

function updateUser() {
  user.value.name = 'Bob'; // 修改对象属性
  // user.value = { name: 'Charlie' }; // 替换整个对象
}
</script>
```
