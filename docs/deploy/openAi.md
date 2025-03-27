---
title: 搭建私有ChatGPT
toc: content
---

# 搭建私有 ChatGPT

<Player src='/mp4/openAi.mp4'></Player>

> 项目地址：https://github.com/WangXueLinA/SSE-WS.git

要使用 Moonshot 的 AI 语言模型能力，我们首先要登录其官网，申请属于自己的 API Key，通过这个 key，我们就可以实现接口调用，完成自己的 AI 助手搭建。

## 注册账号

首先，我们需要登录 kimi [官网](https://login.moonshot.cn/?source=https%3A%2F%2Fplatform.moonshot.cn%2Fredirect%3Fpath%3D%252Fconsole&appid=dev-workbench)，注册账号

## 创建 API Key

登录后台后，选择【API Key 管理】面板，点击【创建】按钮，即可创建自己的密钥。这个密钥就是我们需要使用的 API Key。创建好后，把它复制保存起来。

<ImagePreview src="/images/other/image13.jpg"></ImagePreview>

注册后，系统免费赠送 15，用不完，根本用不完！

## 服务搭建

搭建后端服务，其实就是调用 Kimi API 获取问答信息返回给前端。

Kimi API 兼容了 OpenAI 的接口规范，因此，我们可以直接使用 OpenAI 提供的 NodeJS SDK 来调用和使用 Kimi 大模型

前端代码

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chat Application</title>
    <!-- 引入 highlight.js 样式 -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css"
    />
    <style>
      h1 {
        text-align: center;
        background-color: aquamarine;
      }

      .chat-container {
        height: 100vh;
        background-color: #f6f7f9;
        overflow: hidden;
      }

      .chat-box {
        height: calc(100% - 200px);
        box-sizing: border-box;
        padding: 16px;
        overflow-y: auto;
        background-color: #ffffff;
      }

      .messages {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .message-wrapper {
        display: flex;
      }

      .message {
        max-width: 70%;
        padding: 5px 16px;
        border-radius: 18px;
        font-size: 14px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-wrap: break-word;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
      }

      .user-message {
        justify-content: flex-end;
      }

      .user-message .message {
        background-color: #0084ff;
        color: #ffffff;
        text-align: right;
        border-bottom-right-radius: 4px;
      }

      .ai-message {
        justify-content: flex-start;
      }

      .ai-message .message {
        background-color: #f1f0f0;
        color: #333333;
        text-align: left;
        border-bottom-left-radius: 4px;
      }

      .ai-message .message pre {
        background-color: #f6f8fa;
        padding: 10px;
        border-radius: 6px;
        overflow-x: auto;
      }

      .input-box {
        height: 60px;
        display: flex;
        align-items: center;
        gap: 8px;
        background-color: #e5e5e5;
        border-top: 1px solid #e5e5e5;
        padding: 0 10px;
      }

      .input-box button {
        padding: 5px 20px;
        background-color: #0084ff;
        color: #ffffff;
        border: none;
        border-radius: 10px;
        font-size: 14px;
        cursor: pointer;
        box-shadow: 0 2px 4px rgba(0, 132, 255, 0.3);
        transition: background-color 0.3s ease;
      }

      .input-box button:hover {
        background-color: #006bbf;
      }

      .input-box button:active {
        background-color: #0056a3;
      }

      .input-box textarea {
        flex: 1;
        padding: 10px;
        border: 1px solid #d5d5d5;
        border-radius: 15px;
        resize: none;
        font-size: 14px;
        background-color: #ffffff;
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        outline: none;
        height: 20px;
      }

      .input-box textarea:focus {
        border-color: #0084ff;
        box-shadow: inset 0 1px 4px rgba(0, 132, 255, 0.2);
      }
    </style>
  </head>

  <body>
    <div class="chat-container">
      <h1>我是kimi-Ai工具</h1>
      <div class="chat-box">
        <div class="messages" id="messages"></div>
      </div>
      <div class="input-box">
        <textarea id="userInput" placeholder="请输入您的问题..."></textarea>
        <button id="sendButton">发送</button>
      </div>
    </div>

    <!-- 引入依赖库 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/markdown-it/13.0.1/markdown-it.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>

    <script>
      // 初始化 Markdown-it
      const md = window.markdownit({
        highlight: (code, lang) => {
          if (lang && hljs.getLanguage(lang)) {
            return hljs.highlight(code, { language: lang }).value;
          }
          return '';
        },
      });

      // 状态管理
      let messages = [];
      let isStreaming = false;
      let streamingMessage = '';

      // DOM 元素
      const messagesContainer = document.getElementById('messages');
      const userInput = document.getElementById('userInput');
      const sendButton = document.getElementById('sendButton');

      // WebSocket 连接
      const socket = new WebSocket('ws://localhost:3000');

      // 消息渲染函数
      function renderMessage(message) {
        const wrapper = document.createElement('div');
        wrapper.className = `message-wrapper ${
          message.role === 'user' ? 'user-message' : 'ai-message'
        }`;

        const contentDiv = document.createElement('div');
        contentDiv.className = 'message';
        contentDiv.innerHTML = md.render(message.content);

        wrapper.appendChild(contentDiv);
        return wrapper;
      }

      // 更新消息列表
      function updateMessages() {
        messagesContainer.innerHTML = '';
        messages.forEach((msg) => {
          messagesContainer.appendChild(renderMessage(msg));
        });
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }

      // WebSocket 消息处理
      socket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.isStreaming) {
          isStreaming = true;
          streamingMessage = '';
          messages.push({ role: 'assistant', content: '' });
          updateMessages();
        } else if (isStreaming && data.reply) {
          streamingMessage += data.reply;
          messages[messages.length - 1].content = streamingMessage;
          updateMessages();
        } else {
          isStreaming = false;
        }
      };

      // 发送消息
      function sendMessage() {
        const content = userInput.value.trim();
        if (!content) return;

        messages.push({ role: 'user', content });
        updateMessages();

        socket.send(JSON.stringify({ content }));
        userInput.value = '';
      }

      // 事件监听
      sendButton.addEventListener('click', sendMessage);
      userInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          sendMessage();
        }
      });
    </script>
  </body>
</html>
```

创建后端代码

```js
const Koa = require('koa');
const websocket = require('koa-websocket');
const OpenAI = require('openai');
const serve = require('koa-static');
const path = require('path');

const app = websocket(new Koa());
app.use(serve(path.join(__dirname, 'public')));

// 配置 Moonshot AI 客户端
const client = new OpenAI({
  apiKey: 'sk-lx7xmrTa8PbnNALHCUllb1CUKnlRKHFTBxBiNLgc7cW7OpAj',
  baseURL: 'https://api.moonshot.cn/v1', // Moonshot API 基础路径
});

// WebSocket 路由
app.ws.use((ctx) => {
  console.log('WebSocket connected');

  // 初始化上下文消息
  let messages = [
    {
      role: 'system',
      content:
        '你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。用户问什么问题,你都阴阳怪气他!',
    },
  ];

  // 监听前端发送的消息
  ctx.websocket.on('message', async (message) => {
    const { content } = JSON.parse(message); // 获取用户输入

    // 添加用户输入到上下文消息中
    messages.push({ role: 'user', content });

    try {
      // 开启流式输出
      const stream = await client.chat.completions.create({
        model: 'moonshot-v1-8k',
        messages,
        temperature: 0.3,
        stream: true,
      });

      ctx.websocket.send(JSON.stringify({ reply: '', isStreaming: true }));

      let fullReply = ''; // 用于记录完整回复
      for await (const chunk of stream) {
        const delta = chunk.choices[0]?.delta;
        if (delta?.content) {
          ctx.websocket.send(JSON.stringify({ reply: delta.content }));
          fullReply += delta.content;
        }
      }

      // 将 AI 回复添加到上下文消息中
      messages.push({ role: 'assistant', content: fullReply });
    } catch (error) {
      console.error('调用 Moonshot API 出错:', error.message);
      ctx.websocket.send(
        JSON.stringify({ reply: 'Kimi 暂时无法回答您的问题，请稍后再试。' }),
      );
    }
  });
});

// 启动服务器
app.listen(3000, () => {
  console.log('服务已启动，监听 ws://localhost:3000');
});
```
