---
toc: content
title: model
order: -93
---

# Vue3

## v-model

### modelValue

在 vue3 中隐式约定：

- `modelValue` 和 `update:modelValue` 是 Vue 3 为 v-model 设计的保留名称
- 只要父组件使用 v-model，Vue 会自动处理这两个名称的关联
- 这种机制让 v-model 的使用更简洁，开发者只需遵守命名约定，无需手动定义父-子之间的协议

```html
<!--父组件 (Parent.vue)-->
<script setup>
  import { ref } from 'vue';
  import Child from './Child.vue';

  const message = ref('Hello');
</script>

<template>
  <Child v-model="message" />
</template>

<!--子组件 (Child.vue)-->
<script setup>
  // 🔴 必须使用 modelValue 接收父组件传递的值
  const props = defineProps(['modelValue']);

  // 🔴 必须声明 update:modelValue 事件通知父组件更新
  const emit = defineEmits(['update:modelValue']);

  const handleInput = (e) => {
    // 通过约定的事件名 update:modelValue 通知父组件
    emit('update:modelValue', e.target.value);
  };
</script>

<template>
  <input :value="modelValue" @input="handleInput" />
</template>
```

可以通过 v-model:自定义名称

```vue
<!-- 父组件 -->
<Child v-model:customValue="message" />

<!-- 子组件需要适配 -->
<script setup>
const props = defineProps(['customValue']);
const emit = defineEmits(['update:customValue']);
</script>
```

## defineModel

从 Vue 3.4 开始，推荐的实现方式是使用 defineModel()

### 基本使用

```vue
<!--ChildComponent.vue-->

<!-- 3.4之前子组件 -->
<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

// 手动实现双向绑定
const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v),
});
</script>

<template>
  <div>
    <input v-model="value" />
    <p>子组件当前值：{{ value }}</p>
  </div>
</template>

<!-- 用defineModel子组件 -->
<script setup>
const model = defineModel();
</script>

<template>
  <input v-model="model" />
  <p>子组件当前值：{{ value }}</p>
</template>
```

```html
<!-- 父组件 -->

<script setup>
  import { ref } from 'vue';
  import Child from './Child.vue';

  const message = ref('传统写法'); // 数据必须使用响应式数据（如 ref/reactive）
</script>

<template>
  <div class="parent">
    <!-- 使用子组件并绑定 v-model -->
    <Child v-model="message" />

    <p>传统组件值：{{ message }}</p>
  </div>
</template>
```

底层机制 ​

defineModel 是一个便利宏。编译器将其展开为以下内容：

- 一个名为 modelValue 的 prop，本地 ref 的值与其同步；
- 一个名为 update:modelValue 的事件，当本地 ref 的值发生变更时触发。

defineModel 声明了一个 prop，你可以通过给 defineModel 传递选项，来声明底层 prop 的选项：

```js
// 使 v-model 必填
const model = defineModel({ required: true });

// 提供一个默认值
const model = defineModel({ default: 0 });
```

### 多 v-model 绑定对比

```html
<!--父组件使用-->
<ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />

<!-- 3.4之前子组件 -->
<script setup>
  defineProps({
    title: String,
    content: String,
  });
  defineEmits(['update:title', 'update:content']);

  const title = computed({
    get: () => props.title,
    set: (v) => emit('update:title', v),
  });
  const content = computed({
    get: () => props.content,
    set: (v) => emit('update:content', v),
  });
</script>

<template>
  <input v-model="title" />
  <textarea v-model="content"></textarea>
</template>

<!-- 用defineModel子组件 -->
<script setup>
  const title = defineModel('title');
  const content = defineModel('content');
</script>

<template>
  <input v-model="title" />
  <textarea v-model="content"></textarea>
</template>
```

### 修饰符处理

需要手动处理修饰符（如 .trim）：

```vue
<!--父组件-->
<ChildComponent v-model.trim="text" />

<!-- 3.4之前子组件 -->
<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const value = computed({
  get: () => props.modelValue,
  set: (v) => emit('update:modelValue', v?.trim()), // 手动应用修饰符
});
</script>

<!-- defineModel子组件 -->
<script setup>
const model = defineModel({ set: (v) => v?.trim() }); // 自动响应父组件的修饰符
</script>
```

### 类型校验

```vue
<!--3.4之前用defineProps定义类型和默认值-->
<script setup>
defineProps({
  modelValue: {
    type: String,
    required: true,
    default: 'Hello',
  },
});
</script>

<!--直接在 defineModel 中配置-->
<script setup>
const model = defineModel({
  type: String,
  required: true,
  default: 'Hello',
});
</script>
```

### 注意事项

1. 如果为 defineModel prop 设置了一个 default 值且父组件没有为该 prop 提供任何值，会导致父组件与子组件之间不同步。在下面的示例中，父组件的 myRef 是 undefined，而子组件的 model 是 1：

```js
// 子组件：
const model = defineModel({ default: 1 })

// 父组件：
const myRef = ref()
<Child v-model="myRef"></Child>
```

## useModel

useModel() 是 Vue 3.3+ 新增的组合式 API，用于简化自定义组件中 v-model 的双向绑定逻辑。它自动处理 props 和 emit，返回一个可直接修改的响应式引用（Ref），使得父子组件间的数据同步更加简洁。

### 基础语法

```js
import { useModel } from 'vue';

// 默认使用 `modelValue` prop
const modelValue = useModel(props, 'modelValue');

// 修改值会自动触发 `update:modelValue` 事件
modelValue.value = '新值';
```

支持多个 v-model

```html
<!-- 父组件 -->
<ChildComponent v-model:first-name="firstName" v-model:last-name="lastName" />

<!-- 子组件 -->
<script setup>
  const firstName = useModel(props, 'first-name');
  const lastName = useModel(props, 'last-name');
</script>
```

### 使用场景

1. 自定义表单组件：快速实现输入框、选择框等组件的双向绑定。
   示例：封装一个增强的输入框，自动处理输入事件。
2. 多 v-model 绑定：简化需要多个双向绑定的组件（如用户表单包含多个字段）。
3. 封装第三方库组件：将第三方组件的值通过 v-model 暴露给父组件。

```vue
<!-- 父组件 Parent.vue -->
<template>
  <ValidatedInput
    v-model="inputValue"
    :rules="[(v) => v.length >= 5 || '至少5个字符']"
  />
  <p>当前值：{{ inputValue }}</p>
</template>

<script setup>
import { ref } from 'vue';
import ValidatedInput from './ValidatedInput.vue';

const inputValue = ref('');
</script>

<!-- 子组件 ValidatedInput.vue -->
<template>
  <div>
    <input :value="modelValue" @input="handleInput" />
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { useModel, watch } from 'vue';

const props = defineProps({
  modelValue: String,
  rules: { type: Array, default: () => [] },
});

const modelValue = useModel(props, 'modelValue');
const error = ref('');

// 监听输入事件
const handleInput = (e) => {
  const value = e.target.value;
  modelValue.value = value; // 自动触发 update:modelValue
};

// 校验逻辑
watch(modelValue, (value) => {
  for (const rule of props.rules) {
    const result = rule(value);
    if (typeof result === 'string') {
      error.value = result;
      return;
    }
  }
  error.value = '';
});
</script>

<style>
.error {
  color: red;
  font-size: 12px;
}
</style>
```

关键点解析

- 使用 useModel 直接绑定 modelValue，无需手动定义 emit。
- 通过 watch 监听值变化，实现实时校验。
- 父组件通过 v-model 自然获得双向绑定能力。

### 注意事项

1. 必须声明对应 props：在组件中需显式声明 props，否则 useModel 无法工作：

```javascript
defineProps({
  modelValue: String, // 必须声明
  firstName: String, // 多 v-model 时需要声明
});
```

2. 事件命名约定

useModel 依赖 Vue 的 `update:propName` 事件格式。

错误示例：手动触发错误的事件名称会导致数据不同步。

3. 避免直接修改对象属性：如果 modelValue 是对象或数组，直接修改其属性不会触发更新：

```javascript
// ❌ 错误！不会触发更新
modelValue.value.name = 'Alice';

// ✅ 正确：创建新引用
modelValue.value = { ...modelValue.value, name: 'Alice' };
```

4. 类型转换处理：如果父组件传递的值类型与子组件预期不符，需手动转换

```javascript
const modelValue = useModel(props, 'modelValue', {
  get(value) {
    return Number(value); // 转换为数字
  },
  set(value) {
    emit('update:modelValue', String(value)); // 转回字符串
  },
});
```

### 常见问题

1. 如何在 TypeScript 中使用？

```typescript
interface Props {
  modelValue: string;
}

const props = defineProps<Props>();
const modelValue = useModel(props, 'modelValue'); // 自动推断类型为 Ref<string>
```

2. 能否与 v-model 修饰符一起使用？

可以，但需要手动处理修饰符逻辑：

```javascript
const modelValue = useModel(props, 'modelValue', {
  set(value) {
    // 处理修饰符，例如 .trim
    const newValue = props.modelModifiers?.trim ? value.trim() : value;
    emit('update:modelValue', newValue);
  },
});
```

<BackTop></BackTop>
