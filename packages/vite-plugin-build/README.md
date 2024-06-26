# vite 打包插件

维护人： xxx

<!-- > vite打包插件 -->

## 安装

```sh
npm i @wxl/vite-plugin-build
or
yarn add @wxl/vite-plugin-build
```

## API

```js
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import build from '@xuelin/vite-plugin-build';

export default defineConfig({
  plugins: [
    react(),
    build({
      // father Config
      esm: {
        targets: {
          node: 14,
        },
      },
      cjs: {
        targets: {
          node: 14,
        },
      },
    }),
  ],
});
```
