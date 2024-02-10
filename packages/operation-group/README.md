# 操作项展示下拉更多

维护人： xuelin

<!-- > 操作项展示下拉更多 -->

## 安装

```sh
npm i @wxl/operation-group
or
yarn add @wxl/operation-group
```

## API

| 参数                                                                                    | 说明                                                                                                 | 类型                                                                                                         | 默认值                         |
| --------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------ |
| count                                                                                   | 最多展示的节点的个数，剩下的节点会展示在 Dropdown 下拉菜单中                                         | number                                                                                                       | 3                              |
| split                                                                                   | 操作项之间的拆分方式                                                                                 | ReactNode                                                                                                    | \<Divider type="vertical" \/\> |
| moreText                                                                                | 更多的显示文案，默认为“更多”                                                                         | string                                                                                                       | 更多                           |
| trigger                                                                                 | 触发下拉的行为                                                                                       | ('contextMenu' \| 'click' \| 'hover')[]                                                                      | ['click']                      |
| placement                                                                               | Dropdown 下拉菜单的弹出位置 bottomLeft bottomCenter bottomRight topLeft topCenter topRight           | string                                                                                                       | bottomCenter                   |
| getPopupContainer                                                                       | 菜单渲染父节点。默认渲染到 body 上，如果你遇到菜单滚动定位问题，试试修改为滚动的区域，并相对其定位。 | Function(triggerNode)                                                                                        | () => document.body            |
| resizeConfig                                                                            | 根据宽度自适应展示更多                                                                               | {itemWidth?: number, line?L number}                                                                          | -                              |
| moreAll                                                                                 | 更多展示全部集合                                                                                     | boolean                                                                                                      | false                          |
| overlayRender                                                                           | 更多标签的自定义交互                                                                                 | ( more?: React.ReactElement<any, string \| React.JSXElementConstructor<any>>[] ) => DropDownProps['overlay'] | -                              |
| overlayClassName                                                                        | overlay 的类名                                                                                       | string                                                                                                       | -                              |
| 剩余参数 rest [查看](http://www.reta-v2-develop.dophz.dtdream.com/components/space-cn/) | dtd Space 组件的所有属性                                                                             | SpaceProps                                                                                                   | -                              |
