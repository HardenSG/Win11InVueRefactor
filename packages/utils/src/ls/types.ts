export interface LSOptions {
  noError?: boolean
}

export interface LSGetOptions<T> extends LSOptions {
  defaultValue?: T
  raw?: boolean
}

export interface LSSetOptions {
  raw?: boolean
  expires?: number
}

export interface CustomStorageInter {
  expires: number
  readonly secretToken: string
}

export interface StorageItemInter<T> {
  _value: T
  expires: number
  getValue: () => T
  judgeIsOvertime: () => boolean
}
export class StorageItem<T> implements StorageItemInter<T> {
  _value: T
  expires: number
  constructor(value: T, expires: number, isDecrypt: boolean) {
    this._value = value
    if (!isDecrypt) {
      console.log('加时间')

      this.expires = Date.now() + expires * 1000
    } else {
      this.expires = expires
    }
  }
  getValue() {
    return this._value
  }
  judgeIsOvertime() {
    const currentTime = Date.now()
    console.log(currentTime, this.expires)

    return this.expires < currentTime
  }
}
