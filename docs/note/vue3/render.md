---
toc: content
title: h函数
---

# Vue3

## h函数

在 Vue 3 中，Render 函数是一种提供了更大灵活性的高级功能。虽然 Vue 的模板系统已经足够强大，但在某些情况下，直接使用 JavaScript 编写渲染逻辑会更加方便。

Render 函数的工作原理是通过返回一个虚拟节点（VNode）来告诉 Vue 如何渲染界面。Vue 3 提供了 h 函数用于创建 VNode。

<ImagePreview src="/images/vue2/image4.png"></ImagePreview>

## 对比模板语法

| 问题类型        | 模板语法局限          | Render 函数解决方案                                   |
| --------------- | --------------------- | ----------------------------------------------------- |
| 动态结构生成    | v-if/v-for            | 组合复杂度指数级增长 直接使用 JavaScript 逻辑控制结构 |
| 性能敏感场景    | diff 算法无法精细优化 | 手动控制 VNode 生成与复用                             |
| 复杂组件模式    | 需要多层组件嵌套      | 高阶函数组合式开发                                    |
| 非 DOM 环境渲染 | 完全无法实现          | 对接任意渲染目标                                      |
| 动态模板需求    | 需要预编译            | 运行时动态生成                                        |
| 跨根节点布局    | 需要额外包裹元素      | Fragment 直接返回数组                                 |
| 类型安全要求    | 模板类型推导有限      | 完美配合 TypeScript 类型系统                          |

### 基本语法

```js
h(
  type,      // 必需，元素类型、组件或异步组件
  props,     // 可选，传递给组件/元素的属性
  children   // 可选，子节点或者插槽
)
```
type 参数可以为：

1. HTML 标签名（字符串）：如 'div'、'span'、'button' 等。
2. 组件对象：可以是导入的组件或局部注册的组件。

```js
// 创建一个div元素
h('div');

// 创建一个自定义组件
import MyComponent from './MyComponent.vue';
h(MyComponent);
```

props 参数可以为：

1. class、style：元素的类名和样式。
2. id、name：元素的 ID 和名称。
3. onXXX：事件监听器（如 onClick、onChange）。
4. 组件的 props（如 msg、count）。

```js
// 为div设置属性和事件
h('div', {
  class: 'container',
  style: { color: 'red' },
  onClick: () => console.log('Clicked'),
  id: 'main'
});

// 传递props给组件
h(MyComponent, {
  msg: 'Hello',
  count: 10
});
```

children 参数可以为：

1. 字符串：文本内容。
2. 数组：多个子节点，每个子节点可以是 h() 调用或其他类型。
3. 函数：用于作用域插槽（Scoped Slots）。

```js
// 文本子节点
h('div', {}, 'Hello World');

// 多个子节点
h('div', {}, [
  h('h1', 'Title'),
  h('p', 'Content'),
  'Additional text'
]);

// 嵌套结构
h('div', {}, [
  h('ul', {}, [
    h('li', 'Item 1'),
    h('li', 'Item 2')
  ])
]);

// 组件子节点
h(ParentComponent, {}, [
  h(ChildComponent)
]);
```

如果不需要传递 props，可以直接省略第二个参数

```js
// 省略props，直接传递children
h('div', 'Hello');
h('div', [h('span', 'Child')]);
```

与 JSX 的关系

Vue 3 支持 JSX 语法，它是 h() 函数的语法糖，使代码更接近 HTML：

```js
// JSX写法
const App = {
  setup() {
    return () => (
      <MyComponent title="Welcome">
        <p>Content</p>
      </MyComponent>
    );
  }
};

// 等价于h()写法
h(MyComponent, { title: 'Welcome' }, [
  h('p', 'Content')
]);
```

### 使用场景

1. 动态组件工厂：需要根据数据生成不确定的组件结构

```js
// 组件动态生成器
export default {
  setup() {
    const componentConfigs = ref([
      { type: 'input', label: '姓名' },
      { type: 'select', options: ['A', 'B'] },
    ]);

    const componentMap = {
      input: (config) => h('input', { class: 'form-control' }),
      select: (config) =>
        h(
          'select',
          config.options.map((opt) => h('option', opt)),
        ),
    };

    return () =>
      h(
        'form',
        componentConfigs.value.map((config) =>
          h('div', { class: 'form-group' }, [
            h('label', config.label),
            componentMap[config.type](config),
          ]),
        ),
      );
  },
};
```

2. 复杂逻辑的直观表达：处理嵌套数据结构时更清晰

```js
// 递归渲染树形组件
const TreeItem = {
  props: ['node'],
  setup(props) {
    return () =>
      h('li', [
        h('span', props.node.name),
        props.node.children &&
          h(
            'ul',
            props.node.children.map((child) => h(TreeItem, { node: child })),
          ),
      ]);
  },
};
```

3. 框架开发：创建高阶组件、抽象公用逻辑

```js
// 组件增强器 创建可复用逻辑包装器带
// 权限检查的高阶组件
const withAuth = (WrappedComponent) => ({
  props: WrappedComponent.props,
  setup(props) {
    const hasPermission = checkPermission(props.requiredRole);

    return () =>
      hasPermission.value
        ? h(WrappedComponent, props)
        : h('div', { class: 'no-permission' }, '无权访问');
  },
});

// 使用示例
const AdminButton = withAuth({
  props: ['requiredRole'],
  setup(props) {
    return () => h('button', '管理员操作');
  },
});
```

### 最佳实践

1. 优先使用模板：95%场景推荐使用模板语法

2. 类型安全：配合 TypeScript 使用类型断言

```typescript
h(resolveComponent('MyButton') as ComponentPublicInstance);
```

3. 性能优化：对静态内容使用缓存

```javascript
const staticContent = h('div', '静态内容');
return () => [staticContent, dynamicContent];
```

### 注意事项

1. 组件解析问题

```js
// ❌ 错误示例
h('ButtonPrimary'); // 无法直接使用组件名

// ✅ 正确方式
import { resolveComponent } from 'vue';
h(resolveComponent('ButtonPrimary'));
```

2. 事件监听器命名

```js
// ❌ 错误示例
h('button', { on-click: handleClick }) // Vue3不再支持短横线格式

// ✅ 正确方式
h('button', { onClick: handleClick })
```

3. 插槽使用变化

```js
// ❌ 错误示例
h('div', [this.$slots.default]) // Vue2方式

// ✅ 正确方式
setup(props, { slots }) {
  return () => h('div', slots.default())
}
```

4. Props 处理

```js
// 动态属性绑定
h('input', {
  value: modelValue,
  onInput: (e) => context.emit('update:modelValue', e.target.value),
});

// 替代Vue2的.sync
h(ChildComponent, {
  title: props.title,
  'onUpdate:title': (val) => emit('update:title', val),
});
```

## resolveComponent

在 Vue 3 中，resolveComponent 是一个用于动态解析组件引用的 API，主要在编写渲染函数（而非模板）时使用。它的核心作用是将组件名称解析为实际的组件对象，以便在 h() 函数中使用。

### 使用场景

1. 在渲染函数中动态使用组件

当你使用渲染函数而非模板时，无法直接通过名称引用组件，需要先解析组件。

```js
import { h, resolveComponent } from 'vue';

export default {
  setup() {
    // 解析组件
    const MyButton = resolveComponent('MyButton');
    
    return () => h(MyButton, { type: 'primary' });
  }
};
```

2. 条件渲染不同组件

根据条件动态选择渲染不同的组件。

```js
import { h, resolveComponent, ref } from 'vue';

export default {
  setup() {
    const useFancyButton = ref(true);
    
    return () => {
      // 根据条件解析不同组件
      const Button = resolveComponent(
        useFancyButton.value ? 'FancyButton' : 'PlainButton'
      );
      
      return h(Button, { label: 'Click me' });
    };
  }
};
```

3. 实现高阶组件 (HOC)

在高阶组件中动态包装其他组件。

```js
import { h, resolveComponent } from 'vue';

export function withLogging(WrappedComponentName) {
  return {
    setup(props, { attrs, slots, emit }) {
      // 解析被包装的组件
      const WrappedComponent = resolveComponent(WrappedComponentName);
      
      // 添加日志功能
      const enhancedEmit = (event, ...args) => {
        console.log(`Emitted event: ${event}`, args);
        emit(event, ...args);
      };
      
      return () => h(
        WrappedComponent, 
        { ...props, ...attrs, on: enhancedEmit }, 
        slots
      );
    }
  };
}

// 使用高阶组件
const LoggedButton = withLogging('MyButton');
```

4. 动态组件系统

构建一个根据配置动态渲染不同组件的系统。

```js
import { h, resolveComponent, defineComponent } from 'vue';

export const ComponentRenderer = defineComponent({
  props: {
    componentName: String,
    propsData: Object
  },
  setup(props) {
    return () => {
      if (!props.componentName) return null;
      
      // 解析组件
      const Component = resolveComponent(props.componentName);
      
      return h(Component, props.propsData);
    };
  }
});

// 使用方式
<ComponentRenderer 
  :component-name="currentComponent" 
  :props-data="componentProps" 
/>
```

<BackTop></BackTop>
<SplashCursor></SplashCursor>
