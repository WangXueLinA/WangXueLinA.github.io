# 操作更多

```jsx
import React, { useState } from 'react';
import { Button } from 'antd';
import { OperationGroup } from 'xuelin_dumi';

export default () => {
  return (
    <>
      <OperationGroup count={2} trigger={['hover']}>
        <a>操作一</a>
        <a>操作二</a>
        <a>操作三</a>
        <a>操作四</a>
      </OperationGroup>
    </>
  );
};
```
