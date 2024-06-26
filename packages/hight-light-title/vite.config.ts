import react from '@vitejs/plugin-react';

import path from 'path';
import { defineConfig, UserConfig } from 'vite';

export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@xuelin/hight-light-title': path.resolve(__dirname, 'src/index.tsx'),
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
  return config;
});
