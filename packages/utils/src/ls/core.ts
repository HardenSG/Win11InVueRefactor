import { CustomStorageInter, StorageItemInter } from './types'
import CryptoJS from 'crypto-js'
import config from 'core/src/proj.config'

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

export class StorageItem<T> implements StorageItemInter<T> {
  _value: T
  expires: number
  constructor(value: T, expires: number, isDecrypt: boolean) {
    this._value = value
    if (!isDecrypt) {
      if (expires !== -1) {
        this.expires = Date.now() + expires * 1000
      } else {
        this.expires = -1
      }
    } else {
      this.expires = expires
    }
  }
  getValue() {
    return this._value
  }
  judgeIsOvertime() {
    if (this.expires == -1) {
      return false
    }
    const currentTime = Date.now()

    return this.expires < currentTime
  }
}

export class CustomLocalStorage implements CustomStorageInter {
  public expires = -1
  public readonly secretToken: string
  private iv: CryptoJS.lib.WordArray
  constructor(secretToken?: string, expires?: number) {
    this.secretToken = secretToken || config.LS_CONFIG.tokenSecret
    this.expires = expires || config.LS_CONFIG.defaultExpires
    this.iv = computeWordArray(secretToken || config.LS_CONFIG.IV)
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
      console.warn('【恶意访问】： 你所访问的并不是一个存在的内容')
      return undefined
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
      console.warn(`【获取失败】： 解析为空`)
      return undefined
    }
    if (decrypted.judgeIsOvertime()) {
      console.warn(`【获取失败】： 过期了`)
      return undefined
    }

    return JSONParse(decrypted._value)
  }
}
