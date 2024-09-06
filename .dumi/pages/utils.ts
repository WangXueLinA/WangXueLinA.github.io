export function groupAndTransform(array, prefixLength = 3) {
  const tempGroups = {};
  const finalResult = {};

  // 分组
  array.forEach((item) => {
    const prefix = item.substring(0, prefixLength);
    if (!tempGroups[prefix]) {
      tempGroups[prefix] = [];
    }
    tempGroups[prefix].push(item);
  });

  // 构造最终结果
  Object.keys(tempGroups).forEach((prefix) => {
    const items = tempGroups[prefix];
    if (items.length > 1) {
      // 只取第一个字符串作为键
      const firstItem = items[0];
      finalResult[firstItem] = items;
    } else {
      // 单个字符串直接作为键值对
      items.forEach((item) => {
        finalResult[item] = [item];
      });
    }
  });
  // 工具字母怎么拼写

  return finalResult;
}

const href = './logo.png';
export const tools = {
  javaScript: [
    {
      title: 'javaScript',
      href: 'https://p9-xtjj-sign.byteimg.com/tos-cn-i-73owjymdk6/835c329fd9b7459e902c02410e07ec2f~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5ou95L2P5pif5pif55qE6KGj6aKG:q75.awebp?rk3s=f64ab15b&x-expires=1726240182&x-signature=zwY%2FxDJHMpSeDwlJgP73cq4U38U%3D',
    },
    { title: 'es6', href },
  ],
  React框架: [
    { title: 'react', href: 'https://cdn.docschina.org/home/logo/react.svg' },
    {
      title: 'reactHook',
      href: 'https://cdn.docschina.org/home/logo/react.svg',
    },
    {
      title: 'react18',
      href: 'https://cdn.docschina.org/home/logo/react.svg',
    },
    {
      title: 'reactRouter6',
      href: 'https://cdn.docschina.org/home/logo/react.svg',
    },
  ],
  Vue框架: [
    { title: 'vue2', href: 'https://cdn.docschina.org/home/logo/vue.svg' },
    { title: 'vue3', href: 'https://cdn.docschina.org/home/logo/vue.svg' },
  ],
  css: [
    { title: 'css', href },
    { title: 'less', href: 'https://cdn.docschina.org/home/logo/less.svg' },
  ],
  微前端: [
    {
      title: 'qiankun',
      href: 'https://gw.alipayobjects.com/zos/bmw-prod/8a74c1d3-16f3-4719-be63-15e467a68a24/km0cv8vn_w500_h500.png',
    },
    { title: 'webComponent', href },
  ],
  可视化: [
    {
      title: 'AntvG6',
      href: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*U3AfQq_cQMYAAAAAAAAAAAAADmJ7AQ/original',
    },
    {
      title: 'Graphin',
      href: 'https://mdn.alipayobjects.com/huamei_qa8qxu/afts/img/A*U3AfQq_cQMYAAAAAAAAAAAAADmJ7AQ/original',
    },
  ],
  状态管理: [
    { title: 'redux', href: 'https://cdn.docschina.org/home/logo/redux.svg' },
  ],
  Node: [
    { title: 'node', href: 'https://cdn.docschina.org/home/logo/node.svg' },
  ],
  构建工具: [
    {
      title: 'webpack',
      href: 'https://cdn.docschina.org/home/logo/webpack-offical.svg',
    },
  ],
  网络: [{ title: 'http', href }],
  其他: [
    { title: 'git', href },
    {
      title: 'typeScript',
      href: 'https://cdn.docschina.org/home/logo/typescript.png',
    },
  ],
};
