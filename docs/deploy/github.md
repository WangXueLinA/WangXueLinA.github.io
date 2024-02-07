---
toc: content
title: 项目上传Github
---

# 如何上传自己的项目到 GitHub 上

## 安装 git

官网地址：https://git-scm.com/download/mac

安装后测试是否安装成功

输入命令`git --version`显示出版本号证明成功

![](/images/git/image8.jpg)

## 创建 SSH

终端输入命令：

```js
cd ~/.ssh
```

如果出现 `-bash: cd: /Users/glamor/.ssh: No such file or directory`说明之前没有用过

终端输入命令：

```js
ssh-keygen -t rsa -C  xuelinw1125@gmail.com  // gitHub注册的邮箱
```

然后一直回车

确认完毕后，程序将生成一对密钥
密钥分成两个文件，一个私钥（id_rsa）、一个公钥（id_rsa.pub）。
私钥保存在您的电脑上，公钥交项目负责人添加到服务器上。用户必须拥有与服务器公钥所配对的私钥，才能访问服务器上的代码库。

⚠️ 注意 : 为了项目代码的安全，请妥善保管你的私钥！因为一旦私钥外泄，将可能导致服务器上的代码被泄漏！

如果之前用过需要清理原来的 rss

终端输入命令：

```
mkdir key_backup $ cp id_rsa* key_backup $ rm id_rsa*
```

![](/images/git/image9.jpg)

## 设置公钥

执行命令：

```js
pbcopy < ~/.ssh/id_rsa.pub // 这时候公钥会存在剪切板里
```

登录 GitHub

![](/images/git/image10.webp)
![](/images/git/image11.webp)

`command+v` 粘贴刚刚存在剪切板里的公钥

![](/images/git/image12.webp)

若是多次设置公钥则

![](/images/git/image13.webp)

### 测试连接是否成功

输入命令

```js
ssh -T git@github.com

```

第一次设置公钥时测试连接成功

![](/images/git/image14.webp)

再次设置公钥时测试连接成功

![](/images/git/image15.jpg)

## 建自己的 Repository

![](/images/git/image1.png)
![](/images/git/image2.jpg)

## git 上传代码到 github

由于远程库是空的，第一次推送 master 分支时，加上-u 参数，Git 不但会把本地的 master 分支内容推送到远程新的 master 分支，还会把本地的 master 分支和远程的 master 分支关联起来

可以在远程仓库中新建分支
默认分支为 master 分支

![](/images/git/image4.png)

可以将新建分支设置为 push 上传的默认分支

![](/images/git/image5.png)

![](/images/git/image6.png)

| 步骤 | 终端命令                                                                                 | 作用                                 |
| ---- | ---------------------------------------------------------------------------------------- | ------------------------------------ |
| 1    | git init                                                                                 | 文件夹初始化为 git 版本库            |
| 2    | git add .                                                                                | 将文件添加到暂存区                   |
| 3    | git commit -m “注释”                                                                     | 将暂存区文件提交到版本库             |
| 4    | git remote add origin git@github.com:WangXueLinA/dumi_document.git (SSH key：根据项目定) | ![](/images/git/image16.jpg)         |
| 5    | git push -u origin master                                                                | origin：github 上的对应项目;提交分支 |

查看 github 已将项目推入

![](/images/git/image17.jpg)
