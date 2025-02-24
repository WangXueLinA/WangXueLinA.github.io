---
toc: content
title: defineProperty
order: -100
---

# Vue2

## Object.defineProperty(未完成知识)

在 Vue 2 中用于实现数据劫持，是响应式系统的核心。它的核心作用是：

- ‌ 监听数据变化 ‌：当数据被访问（get）或修改（set）时触发回调。
- ‌ 依赖收集 ‌：在 getter 中收集依赖（如视图渲染函数）。
- ‌ 派发更新 ‌：在 setter 中通知依赖更新（如重新渲染视图）

### 核心原理

‌ 本质 ‌：通过劫持对象属性的访问器（get/set），在数据变化时触发特定逻辑。

1. 数据劫持流程

```javascript
const obj = { name: 'Vue' };
Object.defineProperty(obj, 'name', {
  get() {
    console.log('属性被访问，触发依赖收集');
    return val;
  },
  set(newVal) {
    console.log('属性被修改，触发视图更新');
    val = newVal;
  },
});
```

### 局限性

- ‌ 无法监听新增/删除属性 ‌：需通过 Vue.set/Vue.delete 手动触发更新。
- ‌ 数组索引修改不触发更新 ‌：例如 arr = 1 无法监听。
- ‌ 性能问题 ‌：递归劫持大型对象时性能较差
