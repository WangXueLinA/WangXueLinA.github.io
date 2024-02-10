const proxyFn = require('http-proxy-middleware')
const os = require('os')

const interfaces = os.networkInterfaces()
const localIps = Object.values(interfaces)
  .flat()
  .map((obj) => obj.address)
localIps.push('::ffff:127.0.0.1')
const createProxyMiddleware = proxyFn.createProxyMiddleware || proxyFn
const map = new Map()
const onProxyRes = (proxyRes) => {
  const cookies = proxyRes.headers['set-cookie']
  if (cookies) {
    proxyRes.headers['set-cookie'] = cookies.map((cookie) =>
      cookie.replace('Secure', '').replace('HttpOnly', '')
    )
  }
}

const createMiddleware = () => {
  let _requestInfo = {
    baseUrl: '',
    proxy: {}
  }
  return (req, res, next) => {
    let requestInfo = req.get('DEV_REQUEST_INFO')
    let info = _requestInfo
    try {
      if (requestInfo) {
        info = JSON.parse(requestInfo)
        _requestInfo = info
      }
    } catch (error) {
      info = _requestInfo
    }
    if (info && map.get('baseUrl') !== info.baseUrl) {
      map.clear()
      map.set('baseUrl', info.baseUrl)
    }
    if (info && info.proxy) {
      const [url] = Object.keys(info.proxy)
        .filter((url) => req.url.startsWith(url))
        .sort((x, y) => y.length - x.length)
      if (!url) {
        return next()
      }
      if (info.proxy[url].target) {
        info.proxy[url].target = info.proxy[url].target.replace(
          /(localhost|127\.0\.0\.1|0\.0\.0\.0)/,
          localIps.includes(req.ip) ? 'localhost' : req.ip
        )
      }

      if (info.proxy[url].target.includes(req.headers.host)) {
        return next()
      }
      const key = url + info.proxy[url].target
      let middleware = map.get(key)
      if (!middleware) {
        if (typeof info.proxy[url] === 'object') {
          info.proxy[url].cookieDomainRewrite = {
            '*': ''
          }
          info.proxy[url].onProxyRes = onProxyRes
        }
        middleware = createProxyMiddleware(info.proxy[url])
        map.set(key, middleware)
      }
      console.log('[代理]: ', req.url, ' ==>', info.proxy[url].target)
      return middleware(req, res, next)
    }
    next()
  }
}

module.exports = createMiddleware()

module.exports.createMiddleware = createMiddleware
