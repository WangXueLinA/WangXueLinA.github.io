
# 加密/解密
```jsx
import React, { useState } from 'react';
import { Input, Divider } from 'antd';
import { encrypt, decrypt, encryptByDes, decryptByDes } from './main';

export default () => {
  const [value, setValue] = useState('');
  return (
    <>
      <Input onChange={(e) => setValue(e.target.value)} placeholder="请输入" />

      <p>aes加密:{encrypt(value)}</p>
      <p>aes解密:{decrypt(encrypt(value))}</p>
      <Divider />

      <p>des加密: {encryptByDes(value)}</p>
      <p>des解密:{decryptByDes(encryptByDes(value))}</p>
    </>
  );
};
```
