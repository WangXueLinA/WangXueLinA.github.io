---
title: 路由传参方式
---

# 路由传参方式

```jsx
import React, { useState } from 'react';
import { Input, Divide, Button } from 'antd';
import { toJsonString, JSONParse, toQueryParams, getQueryParams } from './main';

export default () => {
  const [value, setValue] = useState('');
  return (
    <div style={{ display: 'flex' }}>
      <Input onChange={(e) => setValue(e.target.value)} placeholder="请输入" />
      <Button>提交</Button>
    </div>
  );
};
```
