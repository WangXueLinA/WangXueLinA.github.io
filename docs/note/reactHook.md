---
toc: content
title: React Hook
group: 框架
---

# React hook

## useState

useState 是 React 16.8 引入的 Hook 功能之一，它允许在函数组件中使用状态。在此之前，状态管理仅限于类组件。useState 接收一个初始值作为参数，并返回一个状态变量和一个用于更新该状态的函数。

### 基本用法

1. 参数：

useState() 方法接受一个参数，这个参数是组件的初始状态值。例如，const [count, setCount] = useState(0); 中的 0 就是初始 state。

2. 返回值：

useState() 返回一个数组，其中第一个元素是当前状态（state）的值，第二个元素是用于更新这个状态值的函数。setCount 就是用来更新 count 的函数，它接收新的 state 值并触发组件的重新渲染。

3. state 更新：

对于基础数据类型（如字符串、数字、布尔值等），useState 的更新确实是直接替换整个 state 的值，而不是类似类组件 setState 的合并策略。但对于对象或数组，直接替换整个引用时，如果只是修改了引用内部的属性或元素，则不会触发组件重新渲染，需要通过创建新对象或数组的方式来更新。

4. state 的生命周期：

State 在组件首次渲染时创建，并且在后续的重新渲染中始终保持。不同于函数执行完毕后局部变量会消失，React 会维持 state 的持久性，每次重新渲染时，useState 返回的 state 值都会是最新的状态。这意味着在组件的每一次生命周期中都可以访问和修改这个状态值。

```js
import React, { useState } from 'react';

function Example() {
  // 使用useState初始化状态count和设置状态的方法setCount
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

在这个例子中，我们创建了一个计数器组件，初始状态 count 被设置为 0。点击按钮时触发 onClick，它通过调用 setCount 方法增加计数。

函数组件等价于的 class 类组件如下:

```js
class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Click me
        </button>
      </div>
    );
  }
}
```

### 使用场景

1. **状态初始化**：在函数组件中，我们经常需要维护一些内部状态，如计数器、开关状态、表单输入值等。例如，一个简单的计数器组件

```js
function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

2. **表单输入状态**： 在处理用户输入时，useState 可用于存储表单字段的当前值。

```js
function TextInput() {
  const [text, setText] = useState('');

  return (
    <input
      type="text"
      value={text}
      onChange={(event) => {
        setText(event.target.value);
      }}
    />
  );
}
```

3. **条件渲染**： 根据状态值决定渲染不同的 UI。

```js
function Toggle() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle Visibility
      </button>
      {isVisible && <p>I am visible</p>}
    </>
  );
}
```

4. **数据获取**： 当我们需要在组件挂载后获取数据时，可以结合 useEffect 和 useState 来管理异步获取的数据状态。

```js
function UserData() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('https://api.example.com/user');
      const data = await response.json();
      setUserData(data);
    }

    fetchData();
  }, []); // 空数组意味着仅在组件挂载时执行一次

  return userData ? <div>{userData.name}</div> : <div>Loading...</div>;
}
```

总结来说，任何在函数组件中需要维护和更新状态的情况，都是 useState 的适用场景

### 常见陷阱

1. **状态更新可能是异步的**： 虽然 setState 在 React Class 组件中通常是异步的，但在函数组件中使用 useState 时，状态更新可能也是异步的。这意味着在调用 setCount 之后，新状态可能不会立即生效。如果你需要在状态更新后做一些事情，可以使用 useEffect 挂钩。

```js
useEffect(() => {
  console.log('Count updated to:', count);
}, [count]); // 依赖项数组中包含count，当count改变时，这个副作用函数会运行
```

2. **状态更新可能存在闭包问题**：如果在事件处理器或异步函数中直接递增状态值，可能会遇到闭包问题，导致状态值不变。解决办法是使用函数式的更新形式：

```js
// 错误的做法：
function increment() {
  setCount(count + 1); // 此处的count可能不是最新状态
}

// 正确的做法：
function increment() {
  setCount((prevCount) => prevCount + 1); // 使用函数式更新确保拿到的是最新状态
}
```

3. **多个 useState 调用不一定是有序的**： 在同一个组件中多次调用 useState，并不能保证它们更新的顺序。如果你需要根据另一个状态的值来更新另一个状态，应当考虑将它们合并成一个状态对象，或者在 useEffect 中处理依赖关系。

4. **状态更新可能不会合并**： useState 不像 Class 组件中的 setState 那样自动合并对象。如果你需要更新嵌套对象或数组，需要深拷贝现有状态后再修改，或者使用 immer 库等工具帮助处理。

```js
// 错误做法（不会合并对象）
setMyObject({ key: newValue }); // 这会替换掉原有对象

// 正确做法（合并对象）
setMyObject((prevObject) => ({ ...prevObject, key: newValue }));
```

5. **传来的 props 初始值赋值给 useState**：当父组件重新渲染并传递新的 props 时，子组件内部的 useState 初始值并不会随之更新。useState 的初始值在组件第一次渲染时确定后就不会再改变。

```js
import React, { useState } from 'react';

function ParentComponent() {
  const [parentValue, setParentValue] = useState(0);

  function handleClick() {
    setParentValue(parentValue + 1);
  }

  return (
    <ChildComponent initialCount={parentValue}>
      <button onClick={handleClick}>Increment Parent Value</button>
    </ChildComponent>
  );
}

function ChildComponent({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  console.log('Rendered Child Component with count:', count);

  return <div>The count is: {count}</div>;
}

export default ParentComponent;
```

在这个例子中，ParentComponent 有一个状态 parentValue，并通过 props 传递给 ChildComponent 作为其内部 useState 的初始值 initialCount。当点击按钮增加 parentValue 时，ParentComponent 会重新渲染并传递新的 parentValue 给 ChildComponent。但由于 ChildComponent 内部的 useState 只在组件初次渲染时使用 initialCount，后续 ParentComponent 传递的新值不会影响到 ChildComponent 内部的 count 状态。

为了避免这个问题，可以在 useEffect 中监听 props 变化，并适时更新本地状态：

```js
function ChildComponent({ initialCount }) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount]);

  console.log('Rendered Child Component with count:', count);

  // ...
}
```

这样每当 initialCount 发生变化时，useEffect 钩子就会执行并将新的 props 值更新到本地状态 count 中。

## useEffect

它主要用于处理副作用操作，如订阅数据源、执行定时任务、手动更改 DOM、添加或删除事件监听器等。useEffect 会在组件渲染后执行，并且在满足一定条件时再次执行。

### 基本使用

```js
import React, { useState, useEffect } from 'react';

function SimpleEffectExample() {
  useEffect(() => {
    console.log('Component did mount!');

    // 在组件卸载时执行的清理函数
    return () => {
      console.log('Component will unmount!');
    };
  }, []); // 空数组意味着仅在组件挂载和卸载时各执行一次

  return (
    <div>
      <h1>Hello, useEffect!</h1>
      <p>This is a simple example of using useEffect.</p>
    </div>
  );
}

export default SimpleEffectExample;
```

useEffect 在组件首次挂载到 DOM 时执行，打印出 'Component did mount!'。同时，返回的函数会在组件卸载时作为清理函数执行，打印出 'Component will unmount!'。由于依赖数组是空数组，所以这个 useEffect 效果只会执行一次，相当于类组件中的 componentDidMount 和 componentWillUnmount 生命周期方法的组合。

### 使用场景

useEffect 适用于任何在 React 组件生命周期中需要执行副作用（如 DOM 操作、网络请求、订阅数据源、定时任务等）的情况。

1. **定期执行任务**：通过 setTimeout、setInterval 等创建定时器，定期执行某些任务。

```js
useEffect(() => {
  const intervalId = setInterval(() => {
    console.log('Performing a task every second...');
  }, 1000);

  // 清理定时器
  return () => clearInterval(intervalId);
}, []); // 没有依赖项，定时器在组件挂载时开始，卸载时停止
```

2. **组件内部状态或 props 变化执行操作**:当组件内部的某个状态或 prop 值变化时，需要执行某些副作用操作，例如更新 DOM、发送请求、调整订阅等。

```js
useEffect(() => {
  // 当value改变时，更新相关DOM
  document.getElementById('myElement').innerText = value;

  // 或者当value改变时发送请求
  fetch('/api/data', { body: JSON.stringify(value) });
}, [value]); // 当value变化时执行effect
```

### 常见陷阱

1. **依赖项遗漏**： 如果 useEffect 依赖于某些变量，但没有在依赖数组中列出，那么这些变量的变化不会触发 useEffect 重新执行。这可能导致依赖的变量没有得到及时更新，如下所示：

```js
useEffect(() => {
  // 错误：依赖项缺失，假设我们期望当dependency变化时执行这个effect
  fetchSomeData(dependency);
}, []); // 应改为：[dependency]

// 正确：添加了依赖项
useEffect(() => {
  fetchSomeData(dependency);
}, [dependency]);
```

2. **无限循环**： 如果在 useEffect 的回调函数内部调用了 setState 并且在依赖数组中包含了该状态变量，可能会导致无限循环。这是因为每次状态更新都会触发 useEffect，进而又导致状态更新，形成了死循环。

```js
// 错误
useEffect(() => {
  // count更新会导致无限循环
  setCount(count + 1);
}, [count]); // 应避免这种情况，或者重构代码逻辑

// 正确：避免直接在effect中依赖并更新相同的state
useEffect(() => {
  const timerId = setInterval(() => {
    setCount((prevCount) => prevCount + 1);
  }, 1000);

  // 清理定时器，防止内存泄漏
  return () => clearInterval(timerId);
}, []); // 由于初始时不依赖任何变量，所以无需放入依赖数组
```

3. **清理函数**： 如果 useEffect 中有创建订阅、定时器或其他需要手动清理的资源，务必返回一个清理函数，否则可能会导致内存泄漏。
4. **使用 useLayoutEffect 而非 useEffect**： 在某些需要同步布局和 DOM 更新的场景（例如修改滚动位置或尺寸），应该使用 useLayoutEffect 而不是 useEffect，以确保 DOM 变化发生在浏览器下一帧绘制之前。

## useCallback

useCallback 是 React 的一个 Hook，它可以帮助优化性能，通过缓存函数引用以避免不必要的组件重新渲染。当组件的子组件依赖于父组件的回调函数时，如果不使用 useCallback，每次父组件更新时，子组件都会被迫重新渲染，即使回调函数的内容并未改变。useCallback 通过返回一个 memoized 版本的回调函数，使得在函数体不变的情况下，其引用不会改变，从而避免了不必要的子组件重新渲染。

### 基本使用

```js
import React, { useState, useCallback } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // 使用 useCallback 缓存计数器增加的回调函数
  const incrementCounter = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  // 注意：此处的依赖项数组为空，因为incrementCounter不依赖任何其他state或props
  // 如果incrementCounter内部依赖了其他变量，则需要将其添加到依赖项数组内

  return (
    <div>
      <p>当前计数：{count}</p>
      <button onClick={incrementCounter}>点击增加计数</button>
    </div>
  );
}

export default Example;
```

在这个例子中，我们创建了一个 incrementCounter 函数来增加计数器的值。由于这个回调函数的逻辑并不会随着组件状态的变化而变化（始终都是增加操作），因此我们在 useCallback 中没有传递任何依赖项，这样即使父组件重新渲染，只要 count 状态没变，incrementCounter 的引用就不会变，进而可能避免一些不必要的子组件重新渲染（如果有子组件依赖这个回调）

### 使用场景

需要避免因父组件频繁重新渲染而导致子组件不必要的重新渲染时。特别是在大型应用中，子组件可能是高性能渲染组件（如第三方库的图表组件）或者虚拟滚动列表等，此时优化回调函数的引用稳定性显得尤为重要。

1. **优化子组件渲染**: 当父组件频繁重新渲染时，如果父组件向子组件传递的回调函数每次都会生成新的引用，即使回调函数内部逻辑没有变化，也会导致子组件无谓地重新渲染。特别是当子组件是一个复杂或高效的组件（如 React.memo 包裹的组件、动画组件、图表组件等）时，可以通过 useCallback 来缓存回调函数的引用，仅在依赖项变化时才更新回调函数。

```js
import React, { useState, useCallback } from 'react';

// 假设我们有一个复杂的子组件，比如一个列表项，它需要处理点击事件
const ExpensiveListChild = React.memo(function ListChild({ onClick }) {
  // React.memo会比较props的变化，如果有变动则会重新渲染
  // 如果onClick没有改变，那么使用useCallback后，此处就不会重新渲染
  return <div onClick={onClick}>{/* 子组件的其他渲染逻辑 */}</div>;
});

function ParentComponent() {
  const [count, setCount] = useState(0);

  // 使用useCallback来缓存处理点击事件的函数
  const handleClick = useCallback(() => {
    // 这里可能有复杂的业务逻辑，但假设它并不依赖count状态
    console.log('Item clicked!');
  }, []); // 因为在这个例子中，这个函数不依赖任何状态或props，所以依赖数组为空,如果这里依赖于count状态，可以写成[count]

  // 每次ParentComponent状态改变时，useCallback会确保只有当依赖数组里的值发生变化时，handleClick才会得到一个新的引用

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      {/* 由于handleClick被useCallback缓存，只要它所依赖的状态不变，它就会保持相同的引用 */}
      <ExpensiveListChild onClick={handleClick} />
    </div>
  );
}

export default ParentComponent;
```

尽管父组件 ParentComponent 的 count 状态不断变化并引起自身重新渲染，但因为 handleClick 回调函数在依赖项未改变时始终保持同一个引用，因此 ExpensiveListChild 组件不会因为回调函数引用变化而重新渲染，提升了整体应用的性能。当然，如果 handleClick 内部逻辑依赖于 count 状态，那么应当将 count 添加到 useCallback 的依赖数组中，这样在 count 变化时，回调函数会正确地重新创建并触发子组件的更新。

2. **优化性能敏感的第三方库**： 在使用某些第三方库时，如 React-Mapbox-GL、D3.js 等，这些库可能会直接监听传入的函数引用变化来决定是否重新执行某些昂贵的操作。在这种情况下，通过 useCallback 来缓存函数引用可以避免不必要的重复操作。

3. **避免无限循环**： 当父组件和子组件之间存在相互影响的状态时，如果不小心在回调函数中直接修改了状态，可能会引发无限循环。通过 useCallback 确保在依赖项不变的情况下回调函数引用稳定，有助于排查这类问题。

```js
import React, { useState, useCallback } from 'react';

function ParentComponent() {
  const [selectedItem, setSelectedItem] = useState(null);

  // 使用useCallback避免在依赖项不变时生成新的回调函数
  const handleSelectionChange = useCallback(
    (newSelectedItem) => {
      setSelectedItem(newSelectedItem);
    },
    [setSelectedItem],
  ); // 当setSelectedItem改变时才更新handleSelectionChange
}
```

### 常见陷阱

1. **依赖项遗漏**：useCallback 返回的函数引用会在依赖数组中的值发生变化时重新创建。如果你在回调函数内部使用了某些状态或 props，却没有将它们包含在依赖数组中，可能会导致闭包问题，使得回调函数使用的是过期的值。

```js
// 错误：依赖项遗漏
const handleClick = useCallback(() => {
  console.log(count); // 如果依赖项中漏掉了[count]，count可能不会是最新的值
}, []);

// 正确：添加了依赖项
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
```

2. **依赖数组中包含不需要的依赖**： 如果依赖数组中包含了不必要的依赖项，即使这些依赖项没有变化，也会导致回调函数每次都重新创建。这不仅浪费性能，而且可能导致子组件不必要的重新渲染。

```js
// 错误：unusedVariable是不必要的依赖项
const handleClick = useCallback(() => {
  console.log(id);
}, [id, unusedVariable]);

// 正确：移除不必要的依赖项
const handleClick = useCallback(() => {
  console.log(id);
}, [id]);
```

3. **过度优化**： 不恰当或过度使用 useCallback 可能导致代码难以理解和维护。并非所有的函数都需要用 useCallback 进行优化，只有当函数作为 prop 传递给子组件，且子组件是性能敏感的（如通过 React.memo 优化过）或者子组件内部有依赖函数引用的深比较时，才建议使用 useCallback。

## useMemo

用于优化性能，通过缓存计算结果来避免在每次渲染时都进行昂贵的计算。当你有一个值需要在每次渲染时计算，但计算过程较耗时或者结果在某些条件下可以复用时，可以使用 useMemo。

### 基本使用

```js
import React, { useState, useMemo } from 'react';

function Example() {
  // 状态：一个可以改变的数字
  const [baseNumber, setBaseNumber] = useState(10);

  // 使用useMemo优化计算结果
  const square = useMemo(() => {
    console.log('Calculating square...');
    // 计算平方数，这是一个假设耗时的操作
    return baseNumber * baseNumber;
  }, [baseNumber]); // 当baseNumber改变时，重新计算平方数

  return (
    <div>
      <input
        type="number"
        value={baseNumber}
        onChange={(e) => setBaseNumber(Number(e.target.value))}
      />
      {/* 显示计算后的平方数，使用缓存的值 */}
      <p>number: {square}</p>
    </div>
  );
}

export default Example;
```

我们有一个状态 baseNumber，并使用 useMemo 来缓存 baseNumber 的平方结果。当 baseNumber 改变时，useMemo 会重新计算平方值，否则会返回缓存的平方值，避免了每次渲染时都执行计算操作。在实际应用中，useMemo 常用于避免重复计算那些复杂度较高或者代价较大的表达式或函数，尤其是在这些计算结果在某次渲染周期内不会改变的情况下。

### 使用场景

1. **计算量大或耗时的操作**： 当组件内部有复杂的计算逻辑，如大量的数据处理、计算密集型算法等，且计算结果在多次渲染间没有变化时，可以使用 useMemo 来缓存结果，避免每次渲染都重新计算。

```js
const expensiveResult = useMemo(() => {
  // 这是一个耗时的计算，例如处理大数据集、计算几何图形面积等
  return calculateExpensiveValue(inputs);
}, [inputs]); // 当inputs改变时，重新计算
```

2. **渲染优化**： 当一个计算结果被频繁地用于渲染过程中，如一个复杂的数据映射函数，可以使用 useMemo 来缓存这个映射结果。

```js
const mappedData = useMemo(() => {
  return largeDataSet.map((item) => expensiveTransform(item));
}, [largeDataSet]); // 当largeDataSet改变时，重新映射数据
```

3. **性能敏感的子组件**： 当父组件向性能敏感的子组件（如使用 React.memo 优化过的组件）传递计算结果作为 props 时，使用 useMemo 可以避免因计算结果的引用变更而引起子组件不必要的重新渲染。

```js
const childProps = useMemo(
  () => ({
    calculatedProp: calculateSomeProp(props),
  }),
  [props.someDependency],
); // 当依赖项变化时，重新计算props

return <ChildComponent {...childProps} />;
```

4. **全局状态的衍生数据**： 在使用 Redux 或其他状态管理库时，当需要从全局状态派生出一部分用于本地渲染的数据时，可以使用 useMemo 来缓存派生数据。

### 常见陷阱
