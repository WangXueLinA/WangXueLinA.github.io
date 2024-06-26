# 封装 localStorage, sessionStorage

维护人： xuelin

<!-- > 封装 localStorage, sessionStorage -->

## 安装

```sh
npm i @xuelin/storage
or
yarn add @xuelin/storage
```

### 功能

1. 命名空间，防止微前端应用之间命名污染
2. 消除错误边界，防止报错导致应用崩溃

### 与原生 localStorage, sessionStorage 功能方法上的区别

1. clear()方法，只清除命名空间内的 key

### 用法

```JS
// utils.js
import storage from '@dtd/dsc-storage'
export const local = new storage({
    name: 'local-',
    type: 'localStorage'
})
export const session = new storage({
    name: 'session-',
    type: 'sessionStorage'
})

// main.js
import {
    local,
    session
} from './utils'
local.setItem('number', 123) // number
local.setItem('string', 'string') // string
local.setItem('object', {
    a: 1,
    b: 2
}) // object
local.setItem('array', [1, 2, 3]) // array
local.setItem('null', null) // null
local.setItem('undefined', undefined) // undefined
local.setItem('boolean', false) // boolean
console.log('number', local.getItem('number')) // 123
console.log('string', local.getItem('string')) // 'string'
console.log('object', local.getItem('object')) // { a: 1, b: 2 }
console.log('array', local.getItem('array')) // [1, 2, 3]
console.log('null', local.getItem('null')) // null
console.log('undefined', local.getItem('undefined')) // undefined
console.log('boolean', local.getItem('boolean')) // false
console.log('key', local.key(0))
console.log('length from local', local.getLength())
local.removeItem('number')
local.clear()
console.log('----------------------------------------------------------------')
session.setItem('number', 123) // number
session.setItem('string', 'string') // string
session.setItem('object', {
    a: 1,
    b: 2
}) // object
session.setItem('array', [1, 2, 3]) // array
session.setItem('null', null) // null
session.setItem('undefined', undefined) // undefined
session.setItem('boolean', false) // boolean
console.log('number', session.getItem('number')) // 123
console.log('string', session.getItem('string')) // 'string'
console.log('object', session.getItem('object')) // { a: 1, b: 2 }
console.log('array', session.getItem('array')) // [1, 2, 3]
console.log('null', session.getItem('null')) // null
console.log('undefined', session.getItem('undefined')) // undefined
console.log('boolean', session.getItem('boolean')) // false
console.log('key', session.key(0))
console.log('length', session.getLength())
session.removeItem('number')
session.clear()
```
