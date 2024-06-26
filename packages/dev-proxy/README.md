# 本地开发环境 浏览器中代理映射配置

维护人： xuelin

<!-- > 本地开发环境 浏览器中代理映射配置 -->

![avatar](./docs/demo.gif)

## 安装

```sh
npm i @xuelin/dev-proxy
or
yarn add @xuelin/dev-proxy
```

## 用法

```js
//webpack devserve
const before = require('@dtd/dsc-dev-proxy/lib/before');
const middleware = require('@dtd/dsc-dev-proxy/lib/middlewares');

// umi
{
    devServer: {
      beforeMiddlewares:[middleware]
    }
}

// webpack 4
{
    devServer: {
        before
    }
}
// webpack 5

{
    devServer: {
        onBeforeSetupMiddleware(devServer) {
            before(devServer.app);
        },
    }

}

// proxyConfig.js
export default {
  baseUrl: 'https://192.168.31.143',
  prefix: '/catalog-mng',
  port: '8443',
  proxy: {
    '/api': {
      target: '${baseUrl}:${port}',
      changeOrigin: true,
      secure: false,
    },
    '/mng': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/catalog-mng/mng': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
      pathRewrite: { '^/catalog-mng/mng': '${prefix}/mng' },
    },
  },
}

// 入口文件
import proxyConfig from '../proxyConfig';

if (process.env.NODE_ENV === 'development') {
    require('@dtd/dsc-dev-proxy').default(proxyConfig);
}
```

[代理配置使用说明](https://webpack.docschina.org/configuration/dev-server/#devserverproxy)
