import react from '@vitejs/plugin-react';
import build from '@xuelin/vite-plugin-build';

import path from 'path';
import { defineConfig, UserConfig } from 'vite';
import createImportPlugin from 'vite-plugin-import';

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    plugins: [react(), build()],
    resolve: {
      alias: {
        '@xuelin/tools': path.resolve(__dirname, 'src/index.tsx'),
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: {
            'dt-prefix': 'dt',
          },
        },
      },
    },
  };
  if (mode === 'development') {
    config.plugins!.push(
      createImportPlugin({
        onlyBuild: false, // 是否只需要在生产环境中使用
        babelImportPluginOptions: [
          {
            libraryName: 'dtd',
            libraryDirectory: 'es',
            style: 'css',
          },
        ],
      }),
    );
  }
  return config;
});
