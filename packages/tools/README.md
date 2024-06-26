# 公共方法,工具

维护人： xuelin

<!-- > 公共方法,工具 -->

## 安装

```sh
npm i @xuelin/tools
or
yarn add @xuelin/tools
```

## API

| 方法名          | 参数                                                  | 返回值                  |
| --------------- | ----------------------------------------------------- | ----------------------- |
| `dateToStr`     | (list?: DataType 或 DataType[],format = 'YYYY-MM-DD') | string[]                |
| `strToMoment`   | (list?: DataType 或者 DataType[])                     | `Array<Moment 或 null>` |
| `toQueryParams` | (data: object)                                        | string                  |
| `getXsrfToken`  | (void)                                                | string                  |
| `JSONParse`     | `<T>(...args: Parameters<typeof JSON.parse>): T`      | string                  |
| `toJsonString`  | `<T>(...args: Parameters<typeof JSON.parse>): T`      | string                  |

- `dateToStr`

  日期格式数组转化为日期格式字符串数组

- `strToMoment`

  日期格式字符串数组转化为日期格式数组

- `toQueryParams`

  对象转字符串

- `getXsrfToken`

  获取 cookie 中指定 XSRF-TOKEN 字段的值

- `JSONParse`
