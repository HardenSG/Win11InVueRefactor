import { CustomStorageInter, StorageItem, StorageItemInter } from './types'
import CryptoJS from 'crypto-js'

import { LSOptions } from './types'
import { isNil } from '..'
import { computeWordArray, decrypt, encrypt } from './tools'

export const JSONParse = <T = unknown>(
  json?: string | null,
  { noError = true }: LSOptions = {},
): T | undefined | null => {
  if (isNil(json)) {
    return json as undefined
  }
  try {
    return JSON.parse(json)
  } catch (e) {
    if (!noError) {
      throw e
    }
  }
}

export const JSONStringify = (
  obj: unknown,
  { noError = true }: LSOptions = {},
): string | undefined | null => {
  if (isNil(obj)) {
    return obj as undefined | null
  }
  try {
    return JSON.stringify(obj)
  } catch (e) {
    if (!noError) {
      throw e
    }
  }
}

export class CustomLocalStorage implements CustomStorageInter {
  public expires = -1
  public readonly secretToken: string
  private iv: CryptoJS.lib.WordArray
  constructor(secretToken: string, expires?: number) {
    this.secretToken = secretToken
    this.expires = expires
    this.iv = computeWordArray(secretToken)
  }

  setItem<T>(key: string, value: T, isRaw: boolean, expires?: number): void {
    const _value = isRaw ? value : JSONStringify(value)
    let _rawValue = new StorageItem<T | string>(_value, expires || this.expires, false)
    _rawValue = encrypt(JSONStringify(_rawValue), this.secretToken, this.iv)

    localStorage.removeItem(key)
    localStorage.setItem(key, _rawValue as any)
  }

  getItem<T>(key: string): any {
    const isExist = localStorage.getItem(key)
    if (!isExist) {
      throw new Error('【恶意访问】： 你所访问的并不是一个存在的内容')
    }

    let decrypted
    try {
      const { _value, expires } = JSONParse(
        decrypt(isExist, this.secretToken, this.iv),
      ) as StorageItemInter<T>
      decrypted = new StorageItem<T>(_value, expires, true)
    } catch (error) {
      throw new Error(`【获取失败】： ${error.toString()}`)
    }

    if (!decrypted) {
      throw new Error(`【获取失败】： 解析为空`)
    }
    if (decrypted.judgeIsOvertime()) {
      throw new Error(`【获取失败】： 过期了`)
    }

    return decrypted._value
  }
}
