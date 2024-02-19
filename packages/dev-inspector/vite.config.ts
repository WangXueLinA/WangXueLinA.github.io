import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, UserConfig } from 'vite';

export default defineConfig(() => {
  const config: UserConfig = {
    plugins: [react()],
    resolve: {
      alias: {
        '@wxl/dev-inspector': path.resolve(__dirname, 'src/index.tsx'),
      },
    },
    server: {
      proxy: {
        '/catalog-mng': {
          target: 'https://192.168.31.143:8443',
          secure: false,
          changeOrigin: true,
          // rewrite: (path) => path.replace(/^\/api/, '')
        },
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
