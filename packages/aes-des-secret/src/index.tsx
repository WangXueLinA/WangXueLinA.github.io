import { AES_GCM, base64_to_bytes, bytes_to_base64 } from 'asmcrypto.js';
import CryptoJS from 'crypto-js';

function getArrayRound() {
  const arr = [];
  for (let i = 0; i < 12; i++) {
    const randomNum6 = Math.round(Math.random() * 128);
    arr.push(randomNum6);
  }
  return arr;
}

const keyArr = new Uint8Array([
  -128, 26, -31, -52, 121, 39, 127, 61, 44, 45, 58, -80, -53, 119, 26, 15,
]);

/**
 * aes加密
 * @param unencryptedData 要加密的数据
 * @returns 加密后的数据
 */
export const encrypt = (unencryptedData: string) => {
  if (!unencryptedData) {
    return '';
  }
  // AES_GCM加密
  try {
    // string to base64
    const text_btoa = window.btoa(unencryptedData);
    // base64 text to bytes
    const text = base64_to_bytes(text_btoa);

    // 生成随机数
    const arrayRound = getArrayRound();
    const nonce = new Uint8Array(arrayRound);

    // encrypt
    const encTextBytes = AES_GCM.encrypt(text, keyArr, nonce, undefined);
    const encText = bytes_to_base64(
      new Uint8Array(arrayRound.concat(Array.from(encTextBytes))),
    );
    return encText;
  } catch (error) {
    console.error(error);
  }
  return unencryptedData;
};
/**
 * aes解密
 * @param encryptedData 要解密的数据
 * @returns 解密后的数据
 */
export const decrypt = (encryptedData: string) => {
  // AES_GCM解密
  try {
    const text = base64_to_bytes(encryptedData);

    if (text.length < 12 + 16) {
      return '';
    }

    const nonce = text.subarray(0, 12);
    const text2 = text.subarray(12, text.length);

    // decrypt
    const decTextBytes = AES_GCM.decrypt(text2, keyArr, nonce, undefined);
    const decText = window.atob(bytes_to_base64(decTextBytes));
    return decText;
  } catch (error) {
    console.error(error);
  }
  return encryptedData;
};

/**
 * des加密
 * @param message 要加密的数据
 * @param key 密钥
 * @returns 加密后的数据
 */
export const encryptByDes = (message: string, key?: string) => {
  if (!message) {
    return '';
  }
  try {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.DES.encrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });

    return encrypted.toString();
  } catch (error) {
    console.error(error);
  }
  return message;
};

/**
 * des解密
 * @param message 要解密的数据
 * @param key 密钥
 * @returns 解密后的数据
 */
export const decryptByDes = (message: string, key?: string) => {
  if (!message) {
    return '';
  }
  try {
    const keyHex = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.DES.decrypt(message, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
    return CryptoJS.enc.Utf8.stringify(decrypted).toString();
  } catch (error) {
    console.error(error);
  }
  return message;
};
