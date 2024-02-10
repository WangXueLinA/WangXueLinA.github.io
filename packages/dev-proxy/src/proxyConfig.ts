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
    '/catalog-mng/mng-neo/': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
      pathRewrite: { '^/catalog-mng/mng-neo': '${prefix}/mng-neo' },
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
    '/portal': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/catalog-portal/portal': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
      pathRewrite: { '^/catalog-portal/portal': '${prefix}/portal' },
    },
    '/csp-mng/csp-ui/': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/db-connection/api/v1/': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/dbconnection-ui': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/dataexchange-ui/': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/cascade': {
      changeOrigin: true,
      secure: false,
      target: '${baseUrl}:${port}',
    },
    '/pcbb': {
      target: '${baseUrl}:${port}',
      changeOrigin: true,
      secure: false,
    },
  },
};
