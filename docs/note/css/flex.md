---
toc: content
title: flex
---

# css

## flex

### flex-grow

子容器在父容器的“主轴”上还有多少空间可以“瓜分”，这个可以被“瓜分”的空间就叫做剩余空间。

flex-grow 为 0 : https://stackblitz.com/edit/stackblitz-starters-syrbj2?file=index.html

<ImagePreview src="/images/css/image7.jpg"></ImagePreview>

父容器的主轴还有这么多剩余空间，子容器有什么办法将这些剩余空间瓜分来实现弹性的效果呢？

flex-grow 定义子容器的瓜分剩余空间的比例，默认为 0，即如果存在剩余空间，也不会去瓜分。

flex-grow 为 1 : https://stackblitz.com/edit/stackblitz-starters-zks1xd?file=index.html

<ImagePreview src="/images/css/image8.jpg"></ImagePreview>

计算方式如下：

- 剩余空间：x
- 假设有三个 flex item 元素，flex-grow 的值分别为 a, b, c
- 每个元素可以分配的剩余空间为：a/(a+b+c) _ x，b/(a+b+c) _ x，c/(a+b+c) \* x

以 A 为例子进行说明：当时父盒子剩余空间的为 150， A 占比剩余空间：`1/(1+2+3) = 1/6`，那么 A “瓜分”到的 `150\*1/6=25`，实际宽度为 `100+25=125`。

### flex-shrink

我们知道了子容器设置了 flex-grow 有可能会被拉伸。那么什么情况下子容器被压缩呢？考虑一种情况：如果子容器宽度超过父容器宽度，即使是设置了 flex-grow，但是由于没有剩余空间，就分配不到剩余空间了。这时候有两个办法：换行和压缩。由于 flex 默认不换行，那么压缩的话，怎么压缩呢，压缩多少？此时就需要用到 flex-shrink 属性了。

flex 元素的收缩规则，默认值是 1

计算方式：

- 三个 flex item 元素的 width: w1, w2, w3
- 三个 flex item 元素的 flex-shrink：a, b, c
- 计算总压缩权重：
- sum = a _ w1 + b _ w2 + c \_ w3
- 计算每个元素压缩率：
- S1 = a _ w1 / sum，S2 =b _ w2 / sum，S3 =c \_ w3 / sum
- 计算每个元素宽度：width - 压缩率 \* 溢出空间

子容器宽度总和为 650，溢出空间为 150
总压缩：300 _ 1 + 150 _ 2 + 200 * 3 = 1200
A 的压缩率：300*1 / 1200 = 0.25
A 的压缩值：150 \* 0.25 = 37.5
A 的实际宽度：300 - 37.5 = 262.5

<ImagePreview src="/images/css/image10.jpg"></ImagePreview>

flex-shrink 为 0 时:

<ImagePreview src="/images/css/image9.jpg"></ImagePreview>

### flex-basis

flex-basis 即用于定义了在分配多余空间之前，弹性元素在主轴方向上所占的初始大小。这个初始大小可以是具体的像素值、百分比或者是关键词 auto

flex-basis: 0%意味着在分配额外空间之前，元素不占用任何固定的空间，完全依赖于 flex-grow 来分配空间

flex-basis: https://stackblitz.com/edit/stackblitz-starters-d31xfm?file=index.html

<ImagePreview src="/images/css/image11.jpg"></ImagePreview>

可以看出几个属性的优先级关系：

`max-width/min-width > flex-basis > width > box`

<BackTop></BackTop>
