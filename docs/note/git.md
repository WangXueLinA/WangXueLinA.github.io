---
toc: content
title: Git
---

![](/images/git/image.png)

## git fetch

git fetch 命令只会将数据下载到你的本地仓库——它并不会自动合并或修改你当前的工作。 当准备好时你必须手动将其合并入你的工作。所以用 vscode 工具查看远程分支的时候，先 git fetch 一下，就可以将最新远程的所有分支下到本地进行切换分支

## git pull

两者的用法十分相似，pull 用法如下：

```

git pull <远程主机名> <远程分支名>:<本地分支名>
```

例如将远程主机 origin 的 master 分支拉取过来，与本地的 branchtest 分支合并，命令如下：

```
git pull origin master:branchtest
```

同样如果上述没有冒号，则表示将远程 origin 仓库的 master 分支拉取下来与本地当前分支合并

## git stash

stash 命令能够将还未 commit 的代码存起来

### 应用场景

当你的开发进行到一半,但是代码还不想进行提交 ,然后需要同步去关联远端代码时.如果你本地的代码和远端代码没有冲突时,可以直接通过 git pull 解决

但是如果可能发生冲突怎么办.直接 git pull 会拒绝覆盖当前的修改，这时候就可以依次使用下述的命令：

```
git stash
git pull
git stash pop
```

或者当你开发到一半，现在要修改别的分支问题的时候，你也可以使用 git stash 缓存当前区域的代码

```
git stash：保存开发到一半的代码
git checkout XX分支：切换别的分支修改代码
git pull：别的分至修改完后提交代码
git checkout XX分支：切换到stash分支上
git stash pop：将代码追加到最新的提交之后

```

### git stash apply

应用最近一次的 stash

### git stash pop

应用最近一次的 stash，随后删除该记录

### git stash drop

删除最近的一次 stash

### git stash clear

删除 stash 的所有记录

### git stash list

当有多条 stash，可以指定操作 stash，首先使用 stash list 列出所有记录：

```
$ git stash list
stash@{0}: WIP on ...
stash@{1}: WIP on ...
stash@{2}: On ...
```

应用第二条记录

```

$ git stash apply stash@{1}
```

pop，drop 同理。

关于提交信息的格式，可以遵循以下的规则：

- feat: 新特性，添加功能
- fix: 修改 bug
- refactor: 代码重构
- docs: 文档修改
- style: 代码格式修改, 注意不是 css 修改
- test: 测试用例修改
- chore: 其他修改, 比如构建流程, 依赖管理

## 项目中 git 流程

以 GitHub 中的项目为例，找到项目复制出克隆地址

![](/images/git/image18.jpg)

1. 在终端输入 `git clone https://xxx(复制的地址)`

2. 安装项目中依赖 `npm install`

3. 创建本地仓库分支：`git checkout -b 分支名 `来进行修改代码，或者在 vscode 中来进行创建分支

   ![](/images/git/image20.jpg)

4. 修完完代码， `git add.` 提交暂存区，或者在 vscode 中来进行添加

   ![](/images/git/image21.jpg)

5. `git commit -m “注释” ` 将暂存区文件提交到版本库, 如果有 eslint 校验失败项目中又没有强制规定，可`git commit --no-verify -m "commit" ` 就可以跳过代码检查，可以在 vscode 中这样提交

   ![](/images/git/image22.jpg)

6. `git push` 提交代码

   ![](/images/git/image19.jpg)

7. 此时你可以看到控制台会有`git push --set-upstream origin xxx分支`意思是：当前分支没有与远程分支关联，导致了提交代码失败。
8. 此时有两种关联方式
   1. 一种暴力方式`git push origin xxx分支` 推向制定的分支，用此方式再次提交代码时每次都得 origin 远程分支。
   2. 第二种复制`git push --set-upstream origin xxx分支`到控制台回车，代码提交完成，这样关联有一个好处，第二次提交代码只需`git push`就可以提交代码
9. 如果此分支还需要更改代码，则再从第四步继续执行。

## 合并 commit

commit 合并流程：在本地提了好多 commit，最终合并成一个 commit

1. `git log` 查看一下 commit

   ![](/images/git/image23.jpg)

   或这个 `git log --oneline`查看简介版本

git rebase -i HEAD
将会弹出修改页面
键盘 q 退出 Git log
键盘 i 进行编辑页面 ，将不要的 commit 用 s 进行修改掉，然后按 esc 退出，然后按：wq 进行保存

又进行编辑页面，在进行编辑，将不要的 commit 用#进行注释掉，然后 esc 退出，然后按住：wq 进行保存

![](/images/git/image23.jpg)

再进行 Git log 查看一下 commit 是否正确

![](/images/git/image23.jpg)

然后进行 Git push origin 分支名 -f
在远程上查看 commit 是否合入成功，
然后在进行 merge request

## .gitignore（忽略文件）

### 配置不生效

在填写忽略文件的过程中，我发现.gitignore 中已经标明忽略的文件目录下的文件，当我想 git push 的时候还会出现在 push 的目录中，原因是因为 git 忽略目录中，新建的文件在 git 中会有缓存，如果某些文件已经被纳入了版本管理中，就算是在.gitignore 中已经声明了忽略路径也是不起作用的，这时候我们就应该先把本地缓存删除，然后再进行 git push，这样就不会出现忽略的文件了。git 清除本地缓存命令如下：

```js
git rm -r --cached .
git add .
git commit -m 'update .gitignore'
```
