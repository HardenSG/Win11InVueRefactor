import CryptoJS from 'crypto-js'
export const computeWordArray = (v) => CryptoJS.enc.Utf8.parse(v)

export const encrypt = (
  _rawValue: string,
  key: CryptoJS.lib.WordArray | string,
  iv: CryptoJS.lib.WordArray,
) =>
  CryptoJS.AES.encrypt(_rawValue, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString() as any

export const decrypt = (
  _rawValue: string,
  key: CryptoJS.lib.WordArray | string,
  iv: CryptoJS.lib.WordArray,
) =>
  CryptoJS.AES.decrypt(_rawValue, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8)
