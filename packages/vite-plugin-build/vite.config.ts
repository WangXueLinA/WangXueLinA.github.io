import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import build from './src';

export default defineConfig({
  plugins: [
    react(),
    build({
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
