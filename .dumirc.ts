import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  themeConfig: {
    name: '',
    nprogress: true,
    footer: false,
    nav: [
      { title: '组件', link: '/components/highlight-title' },
      { title: '面试', link: '/interview/css' },
      { title: '笔记', link: '/note/react18' },
      { title: '部署', link: '/deploy/web' },
    ],
    // socialLinks: {
    //   github: 'https://github.com/umijs/dumi',
    // },
  },
});
