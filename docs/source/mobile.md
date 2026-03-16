---
toc: content
title: 同url适配pc/mobile
---

# 同一个 url 适配 pc 端和移动端

## 媒体查询

1. css 用`@media`来适配

```css
/* PC专属样式 */
@media (min-width: 1024px) {
  .main-content {
    max-width: 1200px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 250px 1fr;
  }
}

/* 移动端专属样式 */
@media (max-width: 768px) {
  .main-content {
    overflow-x: hidden;
  }

  .mobile-hidden {
    display: none !important;
  }
}
```

2. js 用`window.matchMedia`来适配，如 react 有库`react-media`

```js
import Media from 'react-media';

function ResponsiveComponent() {
  return (
    <Media query="(max-width: 599px)">
      {(matches) =>
        matches ? <div>📱 移动端视图</div> : <div>💻 桌面端视图</div>
      }
    </Media>
  );
}
```

### 场景

1. 差异化越大，开发维护成本越大
2. 打包体积（pc + 移动端）
3. 适合差异化较小的站点

## 服务请求头 user-agent

user-agent：HTTP 请求的 Header 中的 User-Agent 可以区分客户端的浏览器类型，可以通过 User-Agent 来判断客户端的设备。

- 移动端
  <ImagePreview src="/images/other/image15.jpg"></ImagePreview>
- PC 端
  <ImagePreview src="/images/other/image16.jpg"></ImagePreview>

```js
function getDeviceType() {
  // 1. 获取浏览器的用户代理字符串（UA）
  // navigator.userAgent是浏览器提供的内置属性，里面包含了设备、系统、浏览器的关键信息
  // 比如：手机端UA可能包含"iPhone/Android"，平板可能包含"iPad"，桌面端可能包含"Windows/Macintosh"
  const ua = navigator.userAgent;

  // 2. 检测是否是移动设备（手机）
  // /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i 是正则表达式：
  // - 括号里是常见的移动设备系统关键词（安卓、苹果手机、黑莓、Windows手机等）
  // - /i 表示忽略大小写（比如Android和android都能匹配）
  // - test(ua) 是检测ua字符串里是否包含上述关键词，返回true/false
  const isMobile =
    /(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i.test(ua);

  // 3. 检测是否是平板设备（单独区分平板，避免和手机混淆）
  // 正则解读：
  // - iPad：直接匹配iPad（苹果平板）
  // - Android(?!.*Mobile)：匹配包含Android但不包含Mobile的字符串（安卓平板的UA一般没有Mobile，安卓手机有）
  // - Tablet：匹配Tablet关键词（其他品牌平板）
  const isTablet = /(iPad|Android(?!.*Mobile)|Tablet)/i.test(ua);

  // 4. 返回检测结果对象
  return {
    isMobile: isMobile, // 是否是手机（布尔值：true/false）
    isTablet: isTablet, // 是否是平板（布尔值：true/false）
    isDesktop: !isMobile && !isTablet, // 是否是桌面电脑（既不是手机也不是平板）
    deviceDetails: ua, // 原始的UA字符串（方便排查/详细分析）
  };
}
```

一般可靠方案为服务器端重定向，移动端做一套，PC 端做一套，独立开发，独立部署，这样导致代码会有两份，分别部署在不同的服务器环境上，访问同一个地址时候进行区分，通过访问如 nginx 代理时候，代理会读取访问请求头判断访问设备，302 重定向到对应的路径。

如 nginx 配置

```js
server {
  # 移动端重定向
  if ($http_user_agent ~* "(Android|iPhone|Windows Phone)") {
    rewrite ^(.*)$ /m$1 last;
  }

  # PC端重定向
  location /m/ {
    if ($http_user_agent ~* "(Windows NT|Macintosh|Linux)") {
      rewrite ^/m/(.*)$ /$1 last;
    }
  }
}

```

后端 node 配置

```js
// Express中间件
const deviceRedirect = (req, res, next) => {
  const ua = req.headers['user-agent'];
  const isMobile = /Mobile|Android|iPhone/i.test(ua);
  const isFromPC = /Windows NT|Macintosh|Linux/i.test(ua);

  // 保留原始URL查询参数
  const originalUrl = req.originalUrl || req.url;

  if (isMobile && !originalUrl.startsWith('/m/')) {
    return res.redirect(302, `/m${originalUrl}`);
  } else if (isFromPC && originalUrl.startsWith('/m/')) {
    return res.redirect(302, originalUrl.replace('/m/', '/'));
  }

  next();
};

app.use(deviceRedirect);
```
