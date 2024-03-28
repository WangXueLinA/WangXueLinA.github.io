---
toc: content
title: Http
---

# HTTP

## 状态码

- **1XX**：信息响应类，表示接收的请求正在处理。
  - 100 Continue，表示请求继续。
- **2XX**：成功响应类，表示请求已成功被服务器接收、理解并接受。
  - 200 OK，表示请求成功完成。
  - 201 Created，表示请求已被 fulfilled，并且一个新资源已经按照请求的 URL 创建。
- **3XX**：重定向类，需要进一步操作以完成请求。
  - 301 Moved Permanently，永久重定向。
  - 302 Found，临时重定向。
- **4XX**：客户端错误，请求包含错误语法或者无法完成请求。
  - 400 Bad Request，表示请求报文存在语法错误。
  - 401 Unauthorized，表示未授权，需要用户身份验证。
  - 403 Forbidden，服务器理解请求但拒绝执行。
  - 404 Not Found，请求资源不存在。
- **5XX**：服务器错误，服务器在处理请求的过程中发生了错误。
  - 500 Internal Server Error，服务器遇到未知错误。
  - 502 Bad Gateway，作为网关或者代理工作的服务器，从上游服务器接收到无效的响应。
  - 503 Service Unavailable，服务器暂时无法处理请求，通常由于超载或维护。
