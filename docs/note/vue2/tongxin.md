---
toc: content
title: 通信
order: -94
---

# Vue2

## 通信

Vue2 中的通信方式，包括父子组件、兄弟组件、跨层级组件等不同场景下的方法。

## 父 => 子(props)

Props 向下传递数据

```html
<!-- 父组件 Parent.vue -->
<template>
  <Child :message="parentMsg" />
</template>

<script>
  import Child from './Child.vue';
  export default {
    components: { Child },
    data() {
      return { parentMsg: '来自父组件的数据' };
    },
  };
</script>

<!-- 子组件 Child.vue -->
<template>
  <div>{{ message }}</div>
</template>

<script>
  export default {
    props: ['message'],
  };
</script>
```

### 基础声明

在子组件中通过 props 选项接收父组件传递的数据：

```javascript
export default {
  props: ['title', 'content'],
};
```

### 类型验证

指定 props 的数据类型，支持多种类型：

```javascript
export default {
  props: {
    title: String, // 只允许 String 类型
    count: Number, // 只允许 Number 类型
    isActive: Boolean, // 只允许 Boolean 类型
    list: Array, // 只允许 Array 类型
    config: Object, // 只允许 Object 类型
    callback: Function, // 只允许 Function 类型
    customType: CustomClass, // 自定义构造函数类型
  },
};
```

### 高级配置

通过对象形式配置更详细的规则：

```javascript
export default {
  props: {
    // 类型 + 必填验证
    userId: {
      type: Number,
      required: true,
    },
    // 类型 + 默认值
    pageSize: {
      type: Number,
      default: 10,
    },
    // 自定义验证函数
    score: {
      type: Number,
      validator: (value) => {
        return value >= 0 && value <= 100;
      },
    },
  },
};
```

### 生命周期顺序

创建过程自上而下，挂载过程自下而上

1. 加载渲染过程

父 beforeCreate->父 created->父 beforeMount->子 beforeCreate->子 created->子 beforeMount->子 mounted->父 mounted

2. 子组件更新过程

父 beforeUpdate-> 子 beforeUpdate-> 子 updated -> 父 updated

3. 父组件更新过程

父 beforeUpdate-> 父 updated

4. 销毁过程

父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed

### 传值规则

父组件向子组件传值

```html
<!-- 父组件模板 -->
<template>
  <child-component
    :title="parentTitle"
    :user-info="userData"
    :on-submit="handleSubmit"
  ></child-component>
</template>
```

子组件接收值

```html
<!-- 子组件模板 -->
<template>
  <div>
    <h2>{{ title }}</h2>
    <p>{{ userInfo.name }}</p>
    <button @click="onSubmit">提交</button>
  </div>
</template>

<script>
  export default {
    props: ['title', 'userInfo', 'onSubmit'],
  };
</script>
```

### 注意事项

1. 单向数据流

规则：<span style='color: red'>props 是只读的，Vue 底层会监测你对 props 的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制 props 的内容到 data 中，然后去修改 data 中的数据</span>

使用 v-model 时要切记：v-model 绑定的值不能是 props 传过来的值，因为 props 是不可以修改的
props 传过来的若是对象类型的值，修改对象中的属性时 Vue 不会报错，但也不推荐这样做

正确做法：通过触发事件通知父组件修改数据。

```javascript

// 子组件触发事件
this.$emit('update-title', '新标题');

// 父组件监听事件并更新数据
<child-component
  :title="parentTitle"
  @update-title="parentTitle = $event"
></child-component>

```

2. Prop 命名规范

HTML 属性不区分大小写：在模板中使用短横线命名（kebab-case），在 JS 中使用驼峰命名（camelCase）。

```html
<!-- 父组件传递 -->
<child-component :user-info="data"></child-component>

<!-- 子组件接收 -->
props: ['userInfo']
```

3. 动态 vs 静态 Prop

动态传值：使用 v-bind（或简写 `:`）传递动态变量。

```html
<!-- 动态传递 Number 类型 -->
<child-component :count="100"></child-component>

<!-- 动态传递 Boolean 类型 -->
<child-component :is-visible="true"></child-component>
```

静态传值：直接传递字符串字面量。

```html
<!-- 静态传递 String 类型 -->
<child-component title="标题"></child-component>
```

## 子 => 父($emit)

在 Vue2 中，自定义事件通过子组件 触发事件 和父组件 监听事件 实现通信。

### 子触发=>父监听

```vue
<!-- 子组件 Child.vue -->
<template>
  <button @click="sendData">传递数据给父组件</button>
</template>

<script>
export default {
  methods: {
    sendData() {
      this.$emit('update', '子组件的数据');
    },
  },
};
</script>

<!-- 父组件 Parent.vue -->
<template>
  <Child @update="handleUpdate" />
</template>

<script>
export default {
  methods: {
    handleUpdate(data) {
      console.log('接收到子组件数据:', data); // 输出：子组件的数据
    },
  },
};
</script>
```

### .sync 修饰符：双向绑定语法糖

简化父子组件的双向数据绑定（Vue2 推荐语法， Vue3 移除）。

本质：自动将父组件的 prop 和子组件的 `update:propName` 事件绑定，替代手动编写事件监听。

```html
<!--父组件-->
<template>
  <div>
    <!-- 使用 .sync 绑定 parentValue -->
    <ChildComponent :value.sync="parentValue" />

    <!-- 等价上面写法
      <ChildComponent 
        :value="parentValue" 
        @update:value="parentValue = $event" 
      />
     -->
    <p>父组件中的值：{{ parentValue }}</p>
  </div>
</template>

<script>
  import ChildComponent from './ChildComponent.vue';

  export default {
    components: { ChildComponent },
    data() {
      return {
        parentValue: '初始值',
      };
    },
  };
</script>
```

代码解析：

`:value.sync="parentValue"`：
相当于同时做了两件事：

- 将 parentValue 作为 value prop 传递给子组件。

- 监听子组件触发的 `update:value` 事件，并将父组件的 `parentValue`更新为事件参数。

```vue
<template>
  <input :value="value" @input="$emit('update:value', $event.target.value)" />
</template>

<script>
export default {
  props: ['value'],
};
</script>
```

代码解析：

- `props: ['value']`：接收父组件传递的 value prop。

- `:value="value"`：将输入框的当前值绑定到 value prop。

- `@input="$emit('update:value', $event.target.value)"`：当输入框内容变化时，触发 `update:value` 事件，并将新值作为参数传递给父组件。

可同时对多个 prop 使用 .sync：

```js
<ChildComponent
  :name.sync="userName"
  :age.sync="userAge"
/>

// 子组件触发更新：
this.$emit('update:name', newName);
this.$emit('update:age', newAge);

```

### 手动监听事件：通过 $on 和 $off

需要灵活控制事件监听时机（如非父子组件通信）。

```html
<!--父组件-->
<ChildComponent ref="childRef" @click.native="show" />

<!--
  🔴组件上也可以绑定原生DOM事件，需要使用native修饰符  
  @click.native="show"
  上面绑定自定义事件，即使绑定的是原生事件也会被认为是自定义的，
  需要加native，加了后就将此事件给组件的根元素
-->

<script>
  export default {
    mounted() {
      // 🔴通过this.$refs.xxx.$on('事件名',回调函数)绑定自定义事件时，
      // 回调函数要么配置在methods中，要么用箭头函数，否则 this 指向会出问题
      this.$refs.childRef.$on('custom-event', this.handleEvent);
    },
    beforeDestroy() {
      this.$refs.childRef.$off('custom-event', this.handleEvent);
    },
    methods: {
      handleEvent(data) {
        console.log('手动监听事件:', data);
      },
    },
  };
</script>
```

## 兄弟组件通信(bus)

全局事件总线 是一个独立的 Vue 实例，用于在 任意组件 之间进行事件通信。它充当中央事件中心，允许组件通过触发（$emit）和监听（$on）事件实现数据传递，尤其适用于 兄弟组件 或 跨层级组件 的通信。

### 定义事件总线

```js
// eventBus.js
import Vue from 'vue';
export const bus = new Vue();

// 组件A (发送方)
export default {
  methods: {
    sendMessage() {
      bus.$emit('message', '来自组件A的消息');
    }
  }
};

// 组件B (接收方)
export default {
  created() {
    bus.$on('message', (msg) => {
      console.log('收到消息:', msg); // 输出：来自组件A的消息
    });
  },
  beforeDestroy() {
    bus.$off('message'); // 清理监听
  }
};
```

### 全局挂载

将事件总线挂载到 Vue 原型上，方便全局访问：

```js
import Vue from 'vue';
import App from './App.vue';

new Vue({
  el: '#app',
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this; // 安装全局事件总线
  },
});
```

使用事件总线

接收数据：A 组件想接收数据，则在 A 组件中给`$bus` 绑定自定义事件，事件的回调留在 A 组件自身，在`beforeDestroy`钩子中，用`$off`·去解绑当前组件所用到的事件

```vue
<template>
  <div class="school">学校</div>
</template>

<script>
export default {
  name: 'School',
  mounted() {
    this.$bus.$on('hello', (data) => {
      console.log('我是School组件，收到了数据', data);
    });
  },
  beforeDestroy() {
    this.$bus.$off('hello');
  },
};
</script>
```

提供数据：`this.$bus.$emit('xxx',data)`

```vue
<template>
  <div class="student">
    <button @click="sendStudentName">把学生名给School组件</button> //🔴
  </div>
</template>

<script>
export default {
  name: 'Student',
  data() {
    return {
      name: '张三',
    };
  },
  methods: {
    sendStudentName() {
      this.$bus.$emit('demo', this.name);
    },
  },
};
</script>
```

## 跨层级组件通信(Vuex)

```js
// store.js
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

export default new Vuex.Store({
  state: { count: 0 },
  mutations: {
    increment(state) {
      state.count++;
    }
  },
  actions: {
    incrementAsync({ commit }) {
      setTimeout(() => commit('increment'), 1000);
    }
  }
});

// 组件A (触发修改)
export default {
  methods: {
    add() {
      this.$store.commit('increment');
    }
  }
};

// 组件B (获取状态)
<template>
  <div>{{ $store.state.count }}</div>
</template>
```

## provide / inject

```html
<!-- 祖先组件 Ancestor.vue -->
<script>
  export default {
    provide() {
      return { theme: 'dark' };
    },
  };
</script>

<!-- 后代组件 Descendant.vue -->
<template>
  <div :class="theme">主题色: {{ theme }}</div>
</template>

<script>
  export default {
    inject: ['theme'],
  };
</script>
```

## refs

ref 被用来给元素或子组件注册引用信息（id 的替代者）

应用在 html 标签上获取的是真实 DOM 元素，应用在组件标签上获取的是组件实例对象

### 使用方式

- 打标识：`<h1 ref="xxx"></h1>`或`<School ref="xxx"></School>`

- 获取：`this.$refs.xxx`

```html
<template>
  <div>
    <h1 v-text="msg" ref="title"></h1>
    <button ref="btn" @click="showDOM">点我输出上方的DOM元素</button>
    <School ref="sch" />
  </div>
</template>

<script>
  import School from './components/School';

  export default {
    name: 'App',
    components: { School },
    data() {
      return {
        msg: '欢迎学习Vue！',
      };
    },
    methods: {
      showDOM() {
        console.log(this.$refs.title); // 真实DOM元素
        console.log(this.$refs.btn); // 真实DOM元素
        console.log(this.$refs.sch); // School组件的实例对象（vc）
      },
    },
  };
</script>
```

### 动态 ref 的处理

在 v-for 循环中，动态生成的 ref 会存储为数组。

示例：动态 ref

```html
复制
<template>
  <div v-for="item in 3" :key="item" :ref="`dynamicRef${item}`">
    {{ item }}块
  </div>
</template>

<script>
  export default {
    mounted() {
      // 访问动态 ref（结果是一个数组）
      console.log(this.$refs); // { dynamicRef1:[li], dynamicRef2:[li], dynamicRef3:[li] }
      console.log(this.$refs.dynamicRef1); // [li]
    },
  };
</script>
```

说明：访问时得到的是数组，需遍历处理。

### 应用场景

| 场景           | ✅ 正确用法                           | ❌ 错误用法                     | ⚠️ 注意事项               |
| -------------- | ------------------------------------- | ------------------------------- | ------------------------- |
| 访问 DOM       | 在 mounted 或 nextTick 中操作         | 在 created 钩子中访问           | ref 确保 DOM 已渲染       |
| 调用子组件方法 | 父组件通过 ref 调用子组件方法（慎用） | 直接修改子组件内部状态          | 优先使用事件通信          |
| 集成第三方库   | 在 mounted 初始化，beforeDestroy 清理 | 未销毁第三方实例导致内存泄漏    | 手动管理资源生命周期      |
| 动态 ref       | 遍历 `this.$refs` 数组处理动态元素    | 直接访问动态 ref 未处理数组结构 | 动态 ref 返回数组         |
| 响应式更新     | 通过数据驱动视图更新                  | 直接修改 DOM 属性               | 避免依赖非响应式 DOM 属性 |

## 作用域插槽 (Scoped Slots)

```vue
<!-- 子组件 Child.vue -->
<template>
  <slot :user="user"></slot>
</template>

<script>
export default {
  data() {
    return { user: { name: 'John' } };
  },
};
</script>

<!-- 父组件 Parent.vue -->
<template>
  <Child>
    <template v-slot:default="slotProps">
      {{ slotProps.user.name }}
      <!-- 显示: John -->
    </template>
  </Child>
</template>
```

<BackTop></BackTop>
