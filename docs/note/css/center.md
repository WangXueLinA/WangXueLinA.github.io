---
toc: content
title: 盒子居中
---

# css

## 盒子居中

### flex 布局

demo: https://stackblitz.com/edit/stackblitz-starters-wikqaz?file=index.html

```html
<style>
  .wrap {
    width: 400px;
    height: 300px;
    background-color: lightcoral;
    display: flex; //flex代码三件套
    justify-content: center;
    align-items: center;
  }
  .inner {
    width: 40px;
    height: 50px;
    background-color: lightblue;
  }
</style>

<div class="wrap">
  <div class="inner"></div>
</div>
```

### absolute + transform

demo: https://stackblitz.com/edit/stackblitz-starters-k2m3eg?file=index.html

```html
<style>
  .wrap {
    width: 400px;
    height: 300px;
    background-color: lightcoral;
    position: relative;
  }
  .inner {
    background-color: lightblue;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>

<div class="wrap">
  <span class="inner">绝对定位+transform</span>
</div>
```

### absolute + 负 margin

该方法也适用于子元素是行内元素、行内块元素、块元素，唯一的要求是子元素的 高度 和 宽度 已知的情况。

demo: https://stackblitz.com/edit/stackblitz-starters-hy5orq?file=index.html

```html
<style>
  .wrap {
    width: 400px;
    height: 300px;
    background-color: lightcoral;
    position: relative;
  }
  .inner {
    background-color: lightblue;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -50px;
    margin-top: -40px;
    height: 80px;
    width: 100px;
  }
</style>
<div class="wrap">
  <span class="inner"></span>
</div>
```

### absolute + calc

该方法也适用于子元素是行内元素、行内块元素、块元素，唯一的要求是子元素的 高度 和 宽度 已知的情况

demo: https://stackblitz.com/edit/stackblitz-starters-d6k1nd?file=index.html

```html
<style>
  .wrap {
    width: 400px;
    height: 300px;
    background-color: lightcoral;
    position: relative;
  }
  .inner {
    background-color: lightblue;
    position: absolute;
    top: calc(50% - 40px);
    left: calc(50% - 50px);
    height: 80px;
    width: 100px;
  }
</style>
<div class="wrap">
  <span class="inner"></span>
</div>
```

### absolute + margin:auto

该方法也适用于子元素是行内元素、行内块元素、块元素，唯一的要求是子元素要有 高度 和 宽度 。不然，子元素会完全填充父元素

demo: https://stackblitz.com/edit/stackblitz-starters-rbxypy?file=index.html

```html
<style>
  .wrap {
    width: 400px;
    height: 300px;
    background-color: lightcoral;
    position: relative;
  }
  .inner {
    background-color: lightblue;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 80px;
    width: 100px;
    margin: auto;
    text-align: center;
  }
</style>
<div class="wrap">
  <span class="inner">absolute + margin:auto</span>
</div>
```

### 借助 display:table-cell

demo: https://stackblitz.com/edit/stackblitz-starters-3uujgc?file=index.html

```html
<style>
  .wrap {
    width: 400px;
    height: 300px;
    background-color: lightcoral;
    display: table-cell;
    vertical-align: middle;
    text-align: center;
  }
  .inner {
    background-color: lightblue;
    margin: 0 auto;
    height: 110px;
    width: 100px;
  }
</style>
<div class="wrap">
  <div class="inner"></div>
</div>
```

### grid

grid 的兼容性较差，所以没有流行使用

demo: https://stackblitz.com/edit/stackblitz-starters-lbur9h?file=index.html

```html
<style>
  .wrap {
    display: grid;
    justify-items: center;
    align-items: center;
    width: 400px;
    height: 300px;
    background-color: lightcoral;
  }
  .inner {
    background-color: lightblue;
    height: 110px;
    width: 100px;
  }
</style>
<div class="wrap">
  <div class="inner"></div>
</div>
```

### BFC + margin

如果父子元素的高度和宽度都是固定的话，可以直接利用 margin-top 和 margin-left 对子元素进行定位，从而实现居中。同时，利用 position: absolute; 让子元素成为一个 BFC，从而解决父子元素 margin collapsing 的问题

demo: https://stackblitz.com/edit/stackblitz-starters-yhbsxu?file=index.html

```html
<style>
  .container {
    background-color: silver;
    width: 400px;
    height: 500px;
  }
  .content {
    width: 200px;
    height: 300px;
    background-color: red;
    margin-top: 100px;
    margin-left: 100px;
    position: absolute;
  }
</style>
<body>
  <div class="container">
    <div class="content"></div>
  </div>
</body>
```

<BackTop></BackTop>
