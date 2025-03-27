---
toc: content
title: 实时通信
---

# 实时通信

> ws 跟 sse 简单 demo：https://github.com/WangXueLinA/SSE-WS

## 短轮询

<ImagePreview src="/images/other/image9.jpg"></ImagePreview>

原理：客户端定时向服务器发送请求（如每秒一次）

优点：实现简单

缺点：浪费资源（客户端每 1 秒请求一次服务器，但实际数据可能 1 小时才更新一次。）

```javascript
// 前端
setInterval(async () => {
  const res = await fetch('/time');
  console.log(await res.text());
}, 1000);

// 后端（Node.js Koa）
app.get('/time', (req, res) => {
  res.send(new Date().toISOString());
});
```

## 长轮询

<ImagePreview src="/images/other/image10.jpg"></ImagePreview>

原理：服务器挂起请求直到有数据更新才响应

优点：减少无效请求

缺点：服务器资源占用，若有 1 万个客户端同时长轮询 → 服务器需同时维护 1 万个挂起连接对象，每个连接至少占用 10KB 内存 → 总内存消耗约 100MB。每个连接独占一个线程 → 1 万并发需要 1 万个线程 → 线程切换消耗大量 CPU。

前端简单 demo：

```js
<div id="output"></div>;

const output = document.getElementById('output');
async function longPoll() {
  try {
    const response = await fetch('http://localhost:3000/long-poll');
    const data = await response.text();

    output.textContent += `${new Date().toLocaleTimeString()} 收到数据: ${data}\n`;

    // 立即发起下一次请求
    longPoll();
  } catch (err) {
    output.textContent += `请求失败，2秒后重试...\n`;
    setTimeout(longPoll, 2000);
  }
}

// 启动长轮询
longPoll();
```

koa 后端简单 demo：

```js
// 引入Koa框架和路由器模块
const Koa = require('koa');
const Router = require('@koa/router');

// 创建Koa应用实例和路由器实例
const app = new Koa();
const router = new Router();

// 存储待处理的长轮询请求的队列
// 每个元素是一个resolve函数，用于响应挂起的请求
let pendingRequests = [];

// 模拟服务器数据更新（每5秒触发一次）
setInterval(() => {
  // 生成模拟的更新数据（包含当前时间）
  const newData = `服务器更新: ${new Date().toLocaleTimeString()}`;

  // 处理所有挂起的请求
  while (pendingRequests.length > 0) {
    // 从队列头部取出resolve函数并立即执行
    const resolve = pendingRequests.shift();
    resolve(newData); // 向客户端发送新数据
  }
}, 5000); // 每5秒执行一次

// 定义长轮询接口
router.get('/long-poll', async (ctx) => {
  // 创建一个Promise来挂起请求
  const data = await new Promise((resolve) => {
    // 将当前请求的resolve函数加入等待队列
    pendingRequests.push(resolve);

    // 设置30秒超时机制
    setTimeout(() => {
      // 超时后发送提示信息
      resolve('等待超时，请重新请求');

      // 从队列中移除当前请求的resolve函数
      const index = pendingRequests.indexOf(resolve);
      if (index > -1) {
        pendingRequests.splice(index, 1); // 防止内存泄漏
      }
    }, 30000); // 30秒后触发
  });

  // 将获得的数据发送给客户端
  ctx.body = data;
});

// 应用路由中间件
app.use(router.routes());

// 启动服务器监听3000端口
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

## WebSocket

<ImagePreview src="/images/other/image11.jpg"></ImagePreview>

原理：全双工 TCP 连接协议，WebSocket 协议属于应用层协议，依赖传输层的 TCP 协议。具体实现上是通过 http 协议建立通道，然后在此基础上用真正的 WebSocket 协议进行通信，所以 WebSocket 协议和 http 协议是有一定的交叉关系的。

优点：低延迟、双向通信

缺点：需要协议升级

为什么需要 WebSocket？

因为 HTTP 协议有一个缺陷：通信只能由客户端发起，不具备服务器推送能力。

举例来说，我们想了解查询今天的实时数据，只能是客户端向服务器发出请求，服务器返回查询结果。HTTP 协议做不到服务器主动向客户端推送信息。

使用：

```js
// 创建一个 WebSocket 连接对象，连接到本地的 8080 端口（ws 表示非加密的 WebSocket 协议）
const socket = new WebSocket('ws://localhost:8080');
// 安全版本的 WebSocket 连接（wss 表示加密的 TLS 协议），当前被注释掉了
// const socket = new WebSocket('wss://localhost:8080');

socket.onopen = function (evt) {
  // 当 WebSocket 连接成功建立时触发
  console.log('Connection open ...');
  // 向服务器发送文本消息
  socket.send('Hello WebSockets!');
};

// 当接收到服务器发送的消息时触发
socket.onmessage = function (evt) {
  // 打印接收到的消息内容（evt.data 包含消息内容）
  console.log('Received Message: ' + evt.data);
};

// 事件处理错误
socket.onerror = function (evt) {
  console.error('WebSocket error:', evt);
};

// 当连接关闭时触发（可能是主动关闭或网络中断）
socket.onclose = function (evt) {
  console.log('Connection closed.');
};
```

<Player src='/mp4/ws.mp4'></Player>

前端页面

```html
<!DOCTYPE html>
<html>
  <head>
    <title>极简聊天室</title>
    <style>
      body {
        max-width: 600px;
        margin: 20px auto;
      }

      #logs {
        height: 300px;
        border: 1px solid #ccc;
        padding: 10px;
        overflow-y: auto;
        margin-bottom: 10px;
      }

      .log-item {
        margin: 5px 0;
        padding: 3px;
      }

      .system {
        color: #666;
      }

      .send {
        color: green;
      }

      .receive {
        color: blue;
      }
    </style>
  </head>

  <body>
    <h1>极简聊天室</h1>
    <div id="logs"></div>
    <input type="text" id="input" placeholder="输入消息" />
    <button onclick="sendMessage()">发送</button>

    <script>
      const logArea = document.getElementById('logs');
      const input = document.getElementById('input');

      // 创建 WebSocket 连接
      const ws = new WebSocket('ws://localhost:3000');

      // 记录通信日志
      function addLog(type, message) {
        const log = document.createElement('div');
        log.className = `log-item ${type}`;
        log.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
        logArea.appendChild(log);
        logArea.scrollTop = logArea.scrollHeight;
      }

      // 连接事件
      ws.onopen = () => addLog('system', '已连接到服务器');
      ws.onclose = () => addLog('system', '连接已断开');
      ws.onerror = (e) => addLog('system', `连接错误：${e.message}`);

      // 接收消息
      ws.onmessage = (e) => {
        addLog('receive', `收到message消息：${e.data}`);
      };

      // 发送消息
      function sendMessage() {
        const msg = input.value.trim();
        if (msg) {
          ws.send(msg);
          addLog('send', '发送消息：' + msg);
          input.value = '';
        }
      }

      // 回车发送
      input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
      });
    </script>
  </body>
</html>
```

后端 koa 页面

```js
const Koa = require('koa');
const websocket = require('koa-websocket');
const serve = require('koa-static');
const path = require('path');

const app = websocket(new Koa());

// 存储所有连接的客户端
const clients = new Set();

// 静态文件服务（前端页面）
app.use(serve(path.join(__dirname, 'public')));

// WebSocket 处理
app.ws.use(async (ctx) => {
  // 添加新客户端
  clients.add(ctx.websocket);
  console.log('新的客户端连接，当前连接数:', clients.size);

  // 消息处理
  ctx.websocket.on('message', (message) => {
    const msg = message.toString();
    console.log('收到消息:', msg);

    // 广播消息给所有客户端
    clients.forEach((client) => {
      if (client.readyState === 1) {
        // 1 = OPEN
        client.send(msg);
      }
    });
  });

  // 关闭处理
  ctx.websocket.on('close', () => {
    clients.delete(ctx.websocket);
    console.log('客户端断开，剩余连接数:', clients.size);
  });

  // 错误处理
  ctx.websocket.on('error', (err) => {
    console.error('WebSocket 错误:', err);
  });
});

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器已启动，访问地址: http://localhost:${PORT}`);
});
```

## SSE

<ImagePreview src="/images/other/image12.jpg"></ImagePreview>

原理：基于 HTTP 协议的服务器到客户端的单向数据通信技术，允许服务器向浏览器实时推送更新，而不需要客户端通过轮询等方式反复请求数据。

使用场景：SSE 协议主要用于实现实时更新的 Web 应用，比如股票报价、新闻更新、社交网络的新消息通知等场景。

优点：原生支持、自动重连

缺点：仅支持服务器到客户端

​SSE 协议非常简单，本质是浏览器发起 http 请求，服务器在收到请求后，返回状态与数据，并附带以下 headers：

```bash
Content-Type: text/event-stream # 数据是符合 SSE 规范的事件流格式。
Cache-Control: no-cache # 强制禁用客户端（浏览器）或中间代理的缓存机制。
Connection: keep-alive # 要求保持 TCP 连接的持久化（长连接），避免频繁重建连接。

```

数据返回格式：

```bash
# 标准事件格式
event: message\n
data: {"content": "Hello"}\n\n

# 自定义事件
event: customEvent\n
data: 自定义内容\n\n

# 错误处理
retry: 3000\n  # 重连间隔(毫秒)
```

客户端使用 EventSource 接口监听 SSE 消息：

```js
const evtSource = new EventSource('path/to/sse');
evtSource.onmessage = function (event) {
  console.log(event.data); // 处理收到的数据
};
```

<Player src='/mp4/sse.mp4'></Player>

前端代码

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>AI SSE Demo</title>
    <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"></script>
    <style>
      #output {
        white-space: pre-wrap;
        font-family: monospace;
        border: 1px solid #ccc;
        padding: 10px;
        margin-top: 10px;
      }
    </style>
  </head>

  <body>
    <button id="askBtn">询问AI</button>
    <div id="output"></div>

    <script>
      let sse;

      document.getElementById('askBtn').addEventListener('click', () => {
        const output = document.getElementById('output');
        output.innerHTML = '';

        // 关闭之前的连接
        if (sse) sse.close();

        // 创建新的SSE连接
        sse = new EventSource('http://localhost:3000/sse');

        sse.onmessage = async (e) => {
          const markdown = e.data;
          const dirtyHtml = marked.parse(markdown);
          // 创建临时容器
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = dirtyHtml;

          // 获取新增内容
          const newContent = tempDiv.innerHTML;
          await typeWriterEffect(output, newContent);
        };

        sse.onerror = () => {
          sse.close();
        };
      });

      async function typeWriterEffect(container, html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // 递归处理节点
        async function processNode(node) {
          if (node.nodeType === Node.TEXT_NODE) {
            await addTextContent(container, node.textContent);
          } else {
            const el = document.createElement(node.nodeName.toLowerCase());
            Array.from(node.attributes).forEach((attr) => {
              el.setAttribute(attr.name, attr.value);
            });
            container.appendChild(el);

            for (const child of node.childNodes) {
              await processNode(child);
            }
          }
        }

        for (const child of temp.childNodes) {
          await processNode(child);
        }
      }

      function addTextContent(container, text) {
        return new Promise((resolve) => {
          let i = 0;
          const interval = setInterval(() => {
            if (i < text.length) {
              container.lastChild.textContent += text[i];
              i++;
            } else {
              clearInterval(interval);
              resolve();
            }
          }, 30);
        });
      }
    </script>
  </body>
</html>
```

后端 Koa 代码

````js
const Koa = require('koa'); // Koa框架主模块
const path = require('path'); // 路径处理模块
const Router = require('@koa/router'); // Koa路由模块
const cors = require('@koa/cors'); // 跨域资源共享(CORS)模块
const views = require('koa-views'); // 模板渲染中间件
const PassThrough = require('stream').PassThrough; // 创建可写流用于流式传输

// 创建Koa应用实例
const app = new Koa();
// 创建路由实例
const router = new Router();

// 配置视图模板引擎，使用当前目录作为模板根目录
app.use(views(path.join(__dirname)));

// 启用CORS中间件
// 允许所有跨域请求（生产环境应配置具体规则）
app.use(cors());

/**
 * 模拟AI流式响应生成器
 * 使用生成器函数逐步产生数据块
 */
function* generateMessages() {
  // 预定义的消息块数组
  const chunks = [
    '# 欢迎使用AI助手', // Markdown标题
    '以下是一个JavaScript示例：', // 普通文本
    '```javascript', // 代码块开始
    'function hello() {', // JS函数定义
    "  console.log('Hello World!');", // 函数内容
    '}```', // 代码块结束
    '**请享受编程的乐趣！**', // Markdown加粗文本
  ];

  // 使用yield逐个返回消息块
  for (const chunk of chunks) {
    yield chunk;
  }
}

/**
 * SSE（Server-Sent Events）路由
 * 提供实时事件流推送功能
 */
router.get('/sse', async (ctx) => {
  // 设置SSE响应头
  ctx.set({
    'Content-Type': 'text/event-stream', // MIME类型指定为事件流
    'Cache-Control': 'no-cache', // 禁用缓存
    Connection: 'keep-alive', // 保持长连接
    'Access-Control-Allow-Origin': '*', // 允许所有域跨域访问
  });

  // 设置HTTP状态码
  ctx.status = 200;
  // 显式写入响应头（确保兼容性）
  ctx.res.writeHead(200);

  // 创建转换流用于流式传输
  const stream = new PassThrough();
  // 将流设置为响应体
  ctx.body = stream;

  // 获取消息生成器实例
  const messages = generateMessages();

  /**
   * 递归函数用于分块发送数据
   */
  const sendChunk = () => {
    // 获取下一个消息块
    const { value, done } = messages.next();
    if (!done) {
      // 按SSE格式发送数据（data: <content>\n\n）
      // 将内容JSON序列化以保持结构
      stream.write(`data: ${JSON.stringify(value)}\n\n`);
      // 设置1秒延迟后发送下一块（模拟实时流）
      setTimeout(sendChunk, 1000);
    } else {
      // 当所有消息发送完成时结束流
      stream.end();
    }
  };

  // 开始发送消息块
  sendChunk();

  // 处理客户端断开连接
  ctx.req.on('close', () => {
    // 结束响应流
    ctx.res.end();
  });
});

/**
 * 根路由，返回HTML页面
 */
router.get('/', async (ctx) => {
  // 渲染当前目录下的index文件（需存在index.ejs或配置的模板引擎文件）
  await ctx.render('index');
});

// 将路由注册到应用
app.use(router.routes());
// 启动服务器监听3000端口
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
````

## ws 跟 sse 对比

| 特性/因素      | SSE                                                           | WebSockets                                   |
| -------------- | ------------------------------------------------------------- | -------------------------------------------- |
| 协议           | 基于 HTTP，使用标准 HTTP 连接                                 | 单独的协议（ws:// 或 wss://），需要握手升级  |
| 通信方式       | 单向通信（服务器到客户端）                                    | 全双工通信                                   |
| 数据格式       | 文本（UTF-8 编码）                                            | 文本或二进制                                 |
| 重连机制       | 浏览器自动重连                                                | 需要手动实现重连机制                         |
| 实时性         | 高（适合频繁更新的场景）                                      | 非常高（适合高度交互的实时应用）             |
| 浏览器支持     | 良好（大多数现代浏览器支持）                                  | 非常好（几乎所有现代浏览器支持）             |
| 适用场景       | 实时通知、新闻 feed、股票价格等需要从服务器推送到客户端的场景 | 在线游戏、聊天应用、实时交互应用             |
| 复杂性         | 较低，易于实现和维护                                          | 较高，需要处理连接的建立、维护和断开         |
| 兼容性和可用性 | 基于 HTTP，更容易通过各种中间件和防火墙                       | 可能需要配置服务器和网络设备以支持 WebSocket |
| 服务器负载     | 适合较低频率的数据更新                                        | 适合高频率消息和高度交互的场景               |
