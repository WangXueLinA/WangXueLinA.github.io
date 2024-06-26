# api 请求封装

维护人： xueliln

<!-- > api 请求封装 -->

## 安装

```sh
npm i @xuelin/api-request
or
yarn add @xuelin/api-request
```

## 用法

```typescript
// 接口
interface Attribute<T = any, R = any> {
  /**
   *
   * @param {data} 请求参数
   * @param {showMsg} 成功提示，默认不提示，当为true或者字符串时提示
   * @param {errMsg} 错误提示，默认提示，为false时关闭提示
   * @return {Promise} Promise<R>
   */
  (data?: T, showMsg?: boolean | string, errMsg?: boolean | string): Promise<R>;
}
```

```typescript
import { Attribute, Get } from '@dtd/dsc-request';

class Api {
  @Get({ url: 'xxxx' })
  static getPrivileges: Attribute<any, string[]>;
}

Api.getPrivileges().then((res) => {
  console.log('res: ', res);
});
```
