# react-错误边界

维护人： xuelin

<!-- > react-错误边界 -->

自 React 16 起，任何未被错误边界捕获的错误将会导致整个 React 组件树被卸载。

默认情况下，若一个组件在渲染期间（render）发生错误，会导致整个组件树全部被卸载。

部分组件的错误不应该导致整个应用崩溃。为了解决这个问题，React 16 引入了一个新的概念 —— 错误边界

错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的异常，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树。

## 安装

```sh
npm i @xuelin/react-errorBoundary
or
yarn add @xuelin/react-errorBoundary
```
