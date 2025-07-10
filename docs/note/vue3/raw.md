---
toc: content
title: toRaw/markRaw
order: -95
---

# Vue3

## toRaw

toRaw 用于获取 Vue 响应式对象的原始对象。Vue 3 的响应式系统会为对象创建一个代理（Proxy），toRaw 可以返回这个代理背后的原始对象

### 基本语法：

1. 获取 reactive 对象的原始数据

```javascript
import { reactive, toRaw } from 'vue'

const original = { count: 0 }
const proxy = reactive(original)

console.log(toRaw(proxy) === original) // true
```

2. 获取 ref 对象的原始值

```js
import { ref, toRaw } from 'vue'

const original = { count: 0 }
const myRef = ref(original)

console.log(toRaw(myRef.value)) // 依然需要.value取值
console.log(toRaw(myRef.value) === original) // true
```

3. 获取 computed 对象的原始值

```js
import { computed, toRaw } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

console.log(toRaw(doubled.value)) // 直接获取计算结果的原始值
```

### 使用场景：

1. 避免触发响应式更新: 当你需要对数据进行复杂操作但不希望触发组件重新渲染时

```js
const state = reactive({ items: [1, 2, 3] })

// 直接操作原始数据，不触发更新
toRaw(state.items).push(4)
```

2. 避免提交响应式代理对象: 当你需要将响应式数据作为参数传递给 API 时，直接提交可能会包含 Vue 的内部代理属性，导致数据冗余或格式不符合预期。

```js
import { reactive, toRaw, ref } from 'vue'
import axios from 'axios'

const formData = reactive({
  name: 'John',
  age: 30
})

// ❌ 错误：直接提交响应式对象可能包含Vue内部属性
axios.post('/api/user', formData)

// ✅ 正确：提交原始数据
axios.post('/api/user', toRaw(formData))
```

3. 深层解包原始对象

toRaw更适用reactive包裹的一层的响应式数据，通过toRaw直接就转化为原始对象，对于ref还有多层嵌套的响应式就有点鸡肋，ref需要进行解包，深层还需要进行转换，可以写一个深层处理响应式对象和解包 ref 的 deepToRaw 函数

```js
function deepToRaw(value) {
  // 处理 ref 对象，递归解包
  if (isRef(value)) {
    return deepToRaw(value.value);
  }

  // 处理普通对象和数组
  if (typeof value === 'object' && value !== null) {
    // 获取原始对象（如果是响应式的）
    const rawValue = toRaw(value);
    
    // 递归处理数组元素
    if (Array.isArray(rawValue)) {
      return rawValue.map(item => deepToRaw(item));
    }
    
    // 递归处理对象属性
    const result = {};
    for (const key in rawValue) {
      if (Object.prototype.hasOwnProperty.call(rawValue, key)) {
        result[key] = deepToRaw(rawValue[key]);
      }
    }
    return result;
  }

  // 原始值直接返回
  return value;
}

const original = reactive({
  level1: {
    level2: ref('deep')
  },
  a: ref([1,3]),
  b: reactive({
    c: 1
  })
});
const rawData = deepToRaw(original);
// {
//   level1: { level2: "deep" },
//   a: [1, 3],
//   b: { c: 1 }
// }
```

## markRaw

markRaw 用于标记一个对象，使其不会被 Vue 的响应式系统转换为响应式对象。即使这个对象被传递给 reactive 或 ref，它也不会变成响应式的。

### 基本用法

```js
import { reactive, markRaw } from 'vue'

const myChart = markRaw(new EChartsInstance()) // 不需要被追踪

const state = reactive({
  count: 0,
  chart: myChart
})

```

如果你把一个 第三方库对象（比如 ECharts、Mapbox、Three.js 实例等）交给 Vue 的响应式系统去追踪，会导致：

1. 不必要的性能开销
2. 某些库对象内部是非响应式友好的（含闭包、DOM 引用等），会报错或异常

所以用 markRaw() 标记后，Vue 就 不再试图将它转换为响应式对象，你可以正常使用它而不引发副作用。

### 使用场景

| 场景 | 示例 | 
| --- | --- | 
| 图表库实例 | ECharts、Highcharts、Chart.js, 如：`markRaw(new EChartsInstance())` | 
| 地图库对象 | Leaflet、Mapbox、Cesium | 
| 3D 渲染对象 | Three.js、Babylon.js | 
| 大型数据缓存对象 | 不需要 UI 响应的大对象缓存, 如：`markRaw({ items: new Array(1000).fill({ name: 'item' }) })` |
| DOM 元素 | markRaw(document.createElement('div')) | 

## 注意事项

1. markRaw 的对象不会被代理：

一旦一个对象被 markRaw 标记，它将永远不会被 Vue 的响应式系统代理。这意味着即使你将这个对象传递给 reactive 或 ref，它也不会变成响应式的。

2. 性能考虑：

markRaw 可以提高性能，特别是在处理大型对象或频繁操作对象时。但过度使用可能会导致代码难以维护，因为你绕过了 Vue 的响应式系统。

3. 响应式丢失：

如果你不小心将一个响应式对象传递给 markRaw，那么它的响应式特性将会丢失。这可能会导致一些难以调试的问题。


<BackTop></BackTop>
<SplashCursor></SplashCursor>
