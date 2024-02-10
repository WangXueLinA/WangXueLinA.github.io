import { IApi } from 'dumi';

export default async (api: IApi) => {
  api.addBeforeBabelPresets(() => {
    // 返回一个 Babel 插件集
    return () => {
      return {
        plugins: ['react-require'],
      };
    };
  });
  await api.applyPlugins({
    key: 'dumi:routes',
    type: api.ApplyPluginsType.event,
  });
  api.modifyRoutes((oRoutes) => {
    Object.values(oRoutes).forEach((obj) => {
      if (obj.id.endsWith('README')) {
        obj.file = obj.file?.replace('README.md', 'src/index.md');
        obj.path = obj.id.replace('/README', '');
        obj.absPath = `/${obj.path}`;
      }
    });

    return oRoutes;
  });
};
