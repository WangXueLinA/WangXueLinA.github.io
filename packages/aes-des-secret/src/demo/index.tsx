import { Divider, Input } from 'antd';
import React, { useState } from 'react';
import { decrypt, decryptByDes, encrypt, encryptByDes } from '../index';

const Demo: React.FC = () => {
  const [value, setValue] = useState<string | undefined>('');

  return (
    <>
      <Input onChange={(e) => setValue(e.target.value)} placeholder="请输入" />

      <p>aes加密:{encrypt(value)}</p>
      <p>aes解密:{decrypt(encrypt(value))}</p>
      <Divider />

      <p>des加密:{encryptByDes(value)}</p>
      <p>des解密:{decryptByDes(encryptByDes(value))}</p>
    </>
  );
};

export default Demo;
