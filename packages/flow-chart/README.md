# antv/x6 流程图

维护人： xuelin

<!-- > antv/x6 流程图 -->

## 安装

```sh
npm i @wxl/flow-chart
or
yarn add @wxl/flow-chart
```

## API

### useGraph

```tsx | pure
import { useGraph } from '@wxl/flow-chart';

export default () => {
  const graph = useGraph();
  // todo
};
```

### X6Graph

| 参数       | 说明                                                                                        | 类型                                                           | 默认值 |
| ---------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| options    | 在实例化 Graph 的参数                                                                       | [Graph. Options](https://x6.antv.antgroup.com/api/graph/graph) | -      |
| onReady    | 实例化完成的回调                                                                            | (graph: Graph) => void                                         | -      |
| style      | 内联样式                                                                                    | CSSProperties                                                  | -      |
| className  | 样式名                                                                                      | string                                                         | -      |
| on_xxx_xxx | [x6 事件](https://x6.antv.antgroup.com/tutorial/basic/events) （以 on\_开头冒号改为下划线） |                                                                | -      |

### X6Scroller

| 参数    | 说明                         | 类型                                                                        | 默认值 |
| ------- | ---------------------------- | --------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Scroller 的参数 | [Scroller. Options](https://x6.antv.antgroup.com/tutorial/plugins/scroller) | -      |
| onReady | 实例化完成的回调             | (scroller: Scroller, graph: Graph) => void                                  | -      |

### X6Export

| 参数    | 说明                       | 类型                                                                    | 默认值 |
| ------- | -------------------------- | ----------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Export 的参数 | [Export. Options](https://x6.antv.antgroup.com/tutorial/plugins/Export) | -      |
| onReady | 实例化完成的回调           | (export: Export, graph: Graph) => void                                  | -      |

### X6Snapline 对齐线

| 参数    | 说明                         | 类型                                                                        | 默认值 |
| ------- | ---------------------------- | --------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Snapline 的参数 | [Snapline. Options](https://x6.antv.antgroup.com/tutorial/plugins/Snapline) | -      |
| onReady | 实例化完成的回调             | (snapline: Snapline, graph: Graph) => void                                  | -      |

### X6History

| 参数    | 说明                        | 类型                                                                      | 默认值 |
| ------- | --------------------------- | ------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 History 的参数 | [History. Options](https://x6.antv.antgroup.com/tutorial/plugins/History) | -      |
| onReady | 实例化完成的回调            | (history: History, graph: Graph) => void                                  | -      |

### X6Keyboard

| 参数    | 说明                         | 类型                                                                        | 默认值 |
| ------- | ---------------------------- | --------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Keyboard 的参数 | [Keyboard. Options](https://x6.antv.antgroup.com/tutorial/plugins/Keyboard) | -      |
| onReady | 实例化完成的回调             | (keyboard: Keyboard, graph: Graph) => void                                  | -      |

### X6Selection

| 参数    | 说明                          | 类型                                                                          | 默认值 |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Selection 的参数 | [Selection. Options](https://x6.antv.antgroup.com/tutorial/plugins/Selection) | -      |
| onReady | 实例化完成的回调              | (Selection: Selection, graph: Graph) => void                                  | -      |

### X6Clipboard 复制粘贴

| 参数    | 说明                          | 类型                                                                          | 默认值 |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Clipboard 的参数 | [Clipboard. Options](https://x6.antv.antgroup.com/tutorial/plugins/Clipboard) | -      |
| onReady | 实例化完成的回调              | (Clipboard: Clipboard, graph: Graph) => void                                  | -      |

### X6Transform 图形变换组件

| 参数    | 说明                          | 类型                                                                          | 默认值 |
| ------- | ----------------------------- | ----------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Transform 的参数 | [Transform. Options](https://x6.antv.antgroup.com/tutorial/plugins/Transform) | -      |
| onReady | 实例化完成的回调              | (transform: Transform, graph: Graph) => void                                  | -      |

### X6Dnd

| 参数    | 说明                    | 类型                                                              | 默认值 |
| ------- | ----------------------- | ----------------------------------------------------------------- | ------ |
| options | 在实例化插件 Dnd 的参数 | [Dnd. Options](https://x6.antv.antgroup.com/tutorial/plugins/Dnd) | -      |
| onReady | 实例化完成的回调        | (dnd: Dnd, graph: Graph) => void                                  | -      |

### X6Stencil

| 参数    | 说明                        | 类型                                                                      | 默认值 |
| ------- | --------------------------- | ------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 Stencil 的参数 | [Stencil. Options](https://x6.antv.antgroup.com/tutorial/plugins/Stencil) | -      |
| onReady | 实例化完成的回调            | (stencil: Stencil, graph: Graph) => void                                  |

### X6MiniMap

| 参数    | 说明                        | 类型                                                                      | 默认值 |
| ------- | --------------------------- | ------------------------------------------------------------------------- | ------ |
| options | 在实例化插件 MiniMap 的参数 | [MiniMap. Options](https://x6.antv.antgroup.com/tutorial/plugins/MiniMap) | -      |
| onReady | 实例化完成的回调            | (miniMap: MiniMap, graph: Graph) => void                                  |
