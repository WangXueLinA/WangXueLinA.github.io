---
toc: content
title: 部署到 GitHubPages上
---

# 项目部署到 GitHub Pages 上

🔍 没有服务器还要买花钱服务器？github 可以配置访问静态资源

github page 支持放置静态 html 搭建自己的网站，免费

通过<账号名称>.github.io/<仓库名>访问

## 设置仓库名

根据 github page 访问页面的格式，我们直接修改我们项目名为 wangxuelina.github.io，这样我们在项目中不需要每次发布时候都要修改 publicPath 跟 base

<ImagePreview src="/images/other/image6.jpg"></ImagePreview>

## 设置 github

<ImagePreview src="/images/other/image5.jpg"></ImagePreview>

根据图中数字顺序进行操作，就会出现第 4 步中的链接，用这个链接就可以打开自己的网页了

## 下载 gh-pages 库

```bash
npm install gh-pages --save-dev
```

并在 package.json 里配置

```js
"scripts":{
  "deploy": "gh-pages -d docs-dist -r https://github.com/WangXueLinA/WangXueLinA.github.io.git -b gh-pages"
}
```

先执行打包命令，我打完包在目录 docs-dist 中

```bash
npm run docs:build
```

一键发布

```bash
npm run deploy
```

有这个 Published 证明发布成功

<ImagePreview src="/images/other/image7.jpg"></ImagePreview>

过个 2，3 分钟后就你可以访问了

<ImagePreview src="/images/other/image8.jpg"></ImagePreview>
<BackTop></BackTop>
<SplashCursor></SplashCursor>
