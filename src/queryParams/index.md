---
title: 路由传参方式
---

# 路由传参方式

```jsx
import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Input, Divide, Button } from 'antd';
import { toJsonString, JSONParse, toQueryParams, getQueryParams } from './main';

export default () => {
  return (
    <>
      <Link
        to={{
          pathname: `${location.pathname}`,
          search: toQueryParams({
            id: 1,
            isShow: true,
            code: '123455',
          }),
        }}
      >
        跳转
      </Link>
      es加密:`${getQueryParams()}`
    </>
  );
};
```
