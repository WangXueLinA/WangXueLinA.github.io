---
toc: content
title: props/emit
order: -98
---

# Vue3

## props
### 基础概念
在 Vue3 中，props 是组件之间传递数据的主要方式，遵循单向数据流原则。父组件可以通过 props 向子组件传递数据，子组件不能直接修改 props，只能通过 emit 触发事件通知父组件进行修改。

### 定义方式

setup 函数中定义

```js
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['message'], // 需要单独声明 props 选项
  setup(props) {
    // 访问 props
    console.log(props.message);
  },
});
```

`<script setup>` 语法糖中定义

```vue
<script setup>
// 简单类型声明
const props = defineProps(['message', 'count']);

// 对象类型详细声明
const props = defineProps({
  message: String,
  count: {
    type: Number,
    required: true,
    default: 0
  }
});

// TypeScript 类型声明
const props = defineProps<{
  message: string
  count: number
}>();

// withDefaults提供默认值
const props = withDefaults(defineProps(), {
  title: '默认标题',
  size: 'medium',
  disabled: false
});

</script>
```

### 类型校验

1. 基础类型校验
```ts
interface Props {
  // 基础类型
  name: String,           // 字符串
  age: Number,            // 数字
  isActive: Boolean,      // 布尔值
  hobbies: Array,         // 数组
  user: Object,           // 对象
  callback: Function,     // 函数
  date: Date,             // 日期
  regex: RegExp           // 正则表达式
}
```

2. 多类型校验

```ts
interface Props {
  // 多种可能的类型
  id: [String, Number],
  // 可为 null 或 undefined
  optionalValue: [String, null, undefined]
}
```

3. 对象结构校验
```ts
interface Props {
  user: {
    type: Object,
    required: true,
    default: () => ({ name: 'Guest', age: 0 })
  }
}
```

4. 自定义校验函数

```ts
interface Props {
  status: {
    validator: (value: string) => ['pending', 'success', 'error'].includes(value),
    message: 'status 必须是 pending、success 或 error 之一'
  },
  customProp: {
    validator: (value: any, props: Props) => {
      // 可以访问其他 props 进行联合校验
      return value > props.minValue;
    }
  }
}
```

### 默认值与必传项

1. 基础类型默认值

```ts
interface Props {
  size: {
    type: String,
    default: 'medium' // 默认值
  },
  count: {
    type: Number,
    default: 10
  },
  isLoading: {
    type: Boolean,
    default: false // 注意：Boolean 类型默认值需显式设置
  }
}
```

2. 对象 / 数组默认值

```ts
interface Props {
  options: {
    type: Object,
    default: () => ({
      theme: 'light',
      animation: true
    })
  },
  list: {
    type: Array,
    default: () => []
  }
}
```

3. 必传项设置

```ts
interface Props {
  userId: {
    type: String,
    required: true // 必传
  },
  config: {
    type: Object,
    required: true,
    default: () => ({}) // 必传但有默认值，适用于需要空对象的场景
  }
}
```

### 单向数据流

```js
const props = defineProps(['foo']);

// ❌ 警告！prop 是只读的！
props.foo = 'bar';
```

导致你想要更改一个 prop 的需求通常来源于以下两种场景：

1. prop 被用于传入初始值；而子组件想在之后将其作为一个局部数据属性。在这种情况下，最好是新定义一个局部数据属性，从 props 上获取初始值即可：

```js
const props = defineProps(['initialCounter']);

// 计数器只是将 props.initialCounter 作为初始值
// 像下面这样做就使 prop 和后续更新无关了
const counter = ref(props.initialCounter);
```

2. 需要对传入的 prop 值做进一步的转换。在这种情况中，最好是基于该 prop 值定义一个计算属性：

```js
const props = defineProps(['size']);

// 该 prop 变更时计算属性也会自动更新
const normalizedSize = computed(() => props.size.trim().toLowerCase());
```
### withDefaults 提供类型安全默认值

```js
<script setup lang="ts">
import { withDefaults } from 'vue';

interface Props {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  size: 'medium',
  disabled: false
});
</script>
```

### 在 TypeScript 中获取 Prop 类型
1. ExtractPropTypes： 从运行时定义提取完整类型

- 作用：从 defineProps 的运行时定义中提取完整的 TypeScript 类型，包括默认值和必填项信息。
- 使用场景：
  - 需要复用 props 类型：当你想在组件内部或外部使用 props 的类型时。
  - 结合默认值：需要类型系统感知默认值的存在。
```js
<script setup lang="ts">
import { defineProps, ExtractPropTypes } from 'vue';

const props = defineProps({
  message: String,
  count: {
    type: Number,
    required: true,
    default: 10
  }
});

// 提取完整类型（包括默认值和必填项）
type Props = ExtractPropTypes<typeof props>;

// 等价于:
// type Props = {
//   message?: string;      // 可选（无默认值）
//   count: number;        // 必选（有默认值）
// }
</script>
```

2. ExtractPublicPropTypes：提取公开暴露的类型

- 作用：提取组件对外暴露的 props 类型，忽略内部实现细节（如默认值），用于父组件传递 props 时的类型检查。
- 使用场景：
  - 组件库开发：明确告知使用者组件接受的 props 类型。
  - 类型简化：隐藏内部实现的默认值，仅暴露必要的类型。

```js
<script setup lang="ts">
import { defineProps, ExtractPublicPropTypes } from 'vue';

const props = defineProps({
  message: String,
  count: {
    type: Number,
    default: 10
  }
});

// 提取公开类型（父组件传递时的类型）
type PublicProps = ExtractPublicPropTypes<typeof props>;

// 等价于:
// type PublicProps = {
//   message?: string;
//   count?: number;     // 父组件可以不传递，因为有默认值
// }
</script>
```

3. PropType：自定义复杂类型校验

作用：在运行时校验中声明复杂的 TypeScript 类型，让 Vue 理解非原生类型（如自定义对象、函数签名）。

```js
<script setup lang="ts">
import { defineProps, PropType } from 'vue';

interface User {
  name: string;
  age: number;
}

const props = defineProps({
  // 1. 对象类型校验
  user: {
    type: Object as PropType<User>,
    required: true
  },
  // 2. 函数类型校验
  callback: {
    type: Function as PropType<(value: string) => boolean>
  },
  // 3. 联合类型校验
  status: {
    type: String as PropType<'success' | 'error' | 'pending'>,
    default: 'pending'
  }
});
</script>
```


### Prop 与 v-model 结合

在 Vue 3 中，v-model 是一个语法糖，本质上是 `:modelValue` 和 `@update:modelValue` 的组合：

```js
<!-- 父组件 -->
<ChildComponent v-model="parentValue" />

<!-- 等价于 -->
<ChildComponent 
  :modelValue="parentValue" 
  @update:modelValue="parentValue = $event" 
/>
```

子组件需要通过 `defineProps` 接收 `modelValue`，并通过 `defineEmits` 触发 `update:modelValue` 事件

```js
<script setup>
const props = defineProps({
  modelValue: String // 默认 v-model 绑定值
});

const emit = defineEmits(['update:modelValue']);

const updateValue = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>
```

### 注意事项

1. 大小写问题

- HTML 中使用 kebab-case（短横线分隔）
- JavaScript/TypeScript 中使用 camelCase（驼峰命名）

```js
<!-- 父组件 -->
<ChildComponent my-message="Hello" />

<!-- 子组件 -->
const props = defineProps({
  myMessage: String // 定义时使用 camelCase
});
```

2. 异步更新特性

Vue 的更新是异步的，修改 prop 后立即访问可能无法获取最新值

```js
<script setup>
const props = defineProps(['count']);
const emit = defineEmits(['update:count']);

const increment = () => {
  emit('update:count', props.count + 1);
  console.log(props.count); // 此处仍为旧值
  nextTick(() => {
    console.log(props.count); // 此处为更新后的值
  });
};
</script>
```

3. 非 Prop 属性

非 Prop 属性会自动透传到组件的根元素上，除非设置了 inheritAttrs: false

```js
<!-- 父组件 -->
<MyButton class="btn-primary" />

<!-- 子组件 -->
<template>
  <button>{{ message }}</button> <!-- 会自动继承 class="btn-primary" -->
</template>
```


### 解构

Vue3 的响应式系统基于Proxy 代理实现。当通过props.xxx访问属性时，Proxy 会拦截访问并建立依赖关系。但直接解构 Props 会破坏这种代理关系，导致属性变为普通值，失去响应性。

```js
export default {
  props: {
    message: String
  },
  setup(props) {
    // ❌ 直接解构，丢失响应性！
    const { message } = props;
    
    // 此处message是初始值的拷贝，不会随props更新
    console.log(message); // 后续更新无法触发
  }
}
```

Vue3 提供了多种方式安全地解构 Props 并保持响应性：

1. 使用 toRefs: 将 Props 转换为包含ref的对象，每个属性都是响应式的。

```js
import { toRefs } from 'vue'

export default {
  props: {
    message: String,
    count: Number
  },
  setup(props) {
    // 将所有props转为ref
    const { message, count } = toRefs(props);
    
    // 使用时需通过.value访问
    console.log(message.value); // 响应式
    
    return {
      // 模板中可直接使用message（无需.value）
      message,
      count
    }
  }
}
```

2.  使用 toRef（按需转换）:只对需要的 Prop 创建ref，更灵活。

```js
import { toRef } from 'vue'

export default {
  props: {
    message: String
  },
  setup(props) {
    // 仅对message创建ref
    const message = toRef(props, 'message');
    
    // 响应式访问
    console.log(message.value);
    
    return {
      message
    }
  }
}
```
3.  使用计算属性（Computed）:通过计算属性动态获取 Prop 值，保持响应性。

```js
import { computed } from 'vue'

export default {
  props: {
    message: String
  },
  setup(props) {
    // 创建计算属性
    const message = computed(() => props.message);
    
    // 响应式访问
    console.log(message.value);
    
    return {
      message
    }
  }
}
```

在Vue3.5+版本中的响应系统基于属性访问跟踪状态的使用情况。例如，在计算属性或侦听器中访问 props.foo 时，foo 属性将被跟踪为依赖项。

```js
const { foo } = defineProps(['foo']);

watchEffect(() => {
  // 在 3.5 之前只运行一次
  // 在 3.5+ 中在 "foo" prop 变化时重新执行
  console.log(foo);
});
```

在 3.4 及以下版本，foo 是一个实际的常量，永远不会改变。在 3.5 及以上版本，当在同一个 `<script setup>` 代码块中访问由 defineProps 解构的变量时，Vue 编译器会自动在前面添加 props.。因此，上面的代码等同于以下代码：

```js
const props = defineProps(['foo']);

watchEffect(() => {
  // `foo` 由编译器转换为 `props.foo`
  console.log(props.foo);
});
```

3.5+ 也可以使用默认值语法声明 props 默认值。这在使用基于类型的 props 声明时特别有用。

```ts
const { foo = 'hello' } = defineProps<{ foo?: string }>();
```

当我们将解构的 prop 传递到函数中时，可以优化写法

```js
const { foo } = defineProps(['foo']);

watch(() => foo /* ... */);
```

## Emits

### setup 函数

```js
export default {
  emits: ['submit', 'inFocus'], // 需要显式声明 emits
  setup(props, { emit }) {
    const handleClick = () => {
      emit('submit', 'payload'); // 通过 emit 函数触发
    };
    return { handleClick };
  },
};
```

### script setup

```vue
<script setup>
// 定义 emits
const emit = defineEmits(['submit', 'inFocus']);

const handleClick = () => {
  emit('submit', 'payload'); // 直接使用 emit
};
</script>
```

### 触发与监听事件

在组件的模板表达式中，可以直接使用 $emit 方法触发自定义事件 (例如：在 v-on 的处理函数中)：

```vue
<!-- 子组件 MyComponent.vue -->
<template>
  <!-- 直接在模板中触发事件 -->
  <button @click="$emit('someEvent', 'payload')">Click Me</button>
</template>

<!-- 父组件可以通过 v-on (缩写为 @) 来监听事件-->
<template>
  <MyComponent @some-event="handleEvent" />
</template>

<script setup>
const handleEvent = (payload) => {
  console.log('Received:', payload); // 输出 'Received: payload'
};
</script>
```

### 事件校验

为事件添加校验，那么事件可以被赋值为一个函数，接受的参数就是抛出事件时传入 emit 的内容，返回一个布尔值来表明事件是否合法。

```vue
<script setup>
const emit = defineEmits({
  // 没有校验
  click: null,

  // 校验 submit 事件
  submit: ({ email, password }) => {
    if (email && password) {
      return true;
    } else {
      console.warn('Invalid submit event payload!');
      return false;
    }
  },
});

function submitForm(email, password) {
  emit('submit', { email, password });
}
</script>
s
```

## defineComponent

为了让 TypeScript 正确地推导出组件选项内的类型，我们需要通过 defineComponent() 这个全局 API 来定义组件

```js
import { defineComponent } from 'vue';

export default defineComponent({
  // 启用了类型推导
  props: {
    message: String,
  },
  setup(props) {
    props.message; // 类型：string | undefined
  },
});
```

## defineProps

defineProps的主要功能是定义和校验父组件传递给子组件的属性

1. 类型自动推导：在使用 TypeScript 时，无需额外配置，就能自动推导出属性类型。
2. 运行时校验：和 Vue2 的 props 选项一样，它也能进行运行时校验。
3. 只能在`<script setup>`中使用：这是它的使用场景限制。

```vue
<script setup lang="ts">
interface Props {
  message: string;
  count?: number;
}

const props = defineProps<Props>(['message']);
</script>
```

## defineEmits

defineEmits用于定义子组件可以触发的事件，父组件可以监听这些事件。

1. 类型安全：能确保触发的事件名称和参数类型都是正确的。
2. 运行时校验：可对触发事件的参数进行校验。
3. 自动导入：无需手动导入，可直接在组件内使用。

```vue
<script setup lang="ts">
interface Emits {
  (e: 'submit', payload: string): void;
  (e: 'cancel'): void;
}

const emit = defineEmits<Emits>(['submit', 'cancel']);
</script>
```

## withDefaults

主要用于为组件的 props 提供类型安全的默认值，尤其是在使用 `<script setup>` 语法结合 TypeScript 时。

```vue
<script setup lang="ts">
import { withDefaults } from 'vue';

// 定义 Props 类型
interface Props {
  title?: string;
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

// 使用 withDefaults 设置默认值
const props = withDefaults(defineProps<Props>(), {
  title: '默认标题',
  size: 'medium',
  disabled: false,
});
</script>
```

使用场景

1. 可选 Props 需要默认值

当父组件没有传递某个 prop 时，使用 withDefaults 提供的默认值。

2. TypeScript 类型安全

确保默认值与 TypeScript 类型定义一致，避免类型错误。

## mergeProps

### 作用

mergeProps的核心作用是将多个 props 对象合并为一个新对象，主要用于组合式 API 和高阶组件（HOC）中。


1. 保留所有属性：合并后的对象包含所有原始 props 中的属性。
2. 事件处理器合并：同名事件处理器（如onClick）会被合并为一个数组，按顺序执行。
3. 非事件属性覆盖：同名的非事件属性（如class、style）后出现的会覆盖先出现的。

```js
import { mergeProps } from 'vue'

const one = {
  class: 'foo',
  onClick: handlerA
}

const two = {
  class: { bar: true },
  onClick: handlerB
}

const merged = mergeProps(one, two)
/**
 {
   class: 'foo bar',
   onClick: [handlerA, handlerB]
 }
 */
```

在 Vue2 和 Vue3 中，经常需要将父组件的 props 透传到子组件，典型写法是

```js
<template>
  <ChildComponent v-bind="{...$attrs, ...localProps}" />
</template>
```

这种写法存在以下问题：

1. 事件覆盖：如果 $attrs 和 localProps 中有同名事件（如 onClick），后出现的会覆盖先出现的。
2. 非事件属性覆盖：class、style 等属性也会被简单覆盖，而非合并。
3. 类型安全缺失：TypeScript 无法正确推导合并后的类型。


mergeProps 解决了上述问题
```js
<template>
  <ChildComponent v-bind="mergedProps" />
</template>

<script setup>
import { mergeProps, defineProps } from 'vue';

const props = defineProps({
  size: String,
  disabled: Boolean
});

const mergedProps = mergeProps(
  props,
  { 
    // 内部默认 props
    size: 'medium',
    // 内部事件处理器
    onClick: () => console.log('Clicked') 
  }
);
</script>
```

1. 事件合并：同名事件处理器会被合并为数组，按顺序执行。
2. 属性智能合并：class 和 style 会被正确合并（如果需要）。
3. 类型安全：配合 TypeScript 提供完整的类型推导。


### 使用场景

1. 高阶组件：在封装组件时，需要将外部传入的 props 与内部默认 props 合并

```js
<template>
  <div class="wrapper">
    <!-- 将合并后的props传递给子组件 -->
    <ChildComponent v-bind="mergedProps" />
  </div>
</template>

<script setup>
import { mergeProps, defineComponent } from 'vue';

const ChildComponent = defineComponent({
  props: {
    message: String,
    size: String
  },
  // ...
});

const props = defineProps({
  // 高阶组件自身的props
  wrapperClass: String
});

const mergedProps = mergeProps(
  // 内部默认props
  { message: 'Default' },
  // 透传的外部props
  toRefs(props)
);
</script>
```

2. 组合多个组件的 props: 需要将多个来源的 props 合并

```js
<script setup>
import { mergeProps, reactive } from 'vue';

// 从不同来源获取props
const formProps = reactive({
  disabled: false,
  readonly: false
});

const buttonProps = reactive({
  size: 'medium',
  type: 'primary'
});

// 合并props
const merged = mergeProps(formProps, buttonProps);
</script>
```

<BackTop></BackTop>
<SplashCursor></SplashCursor>
