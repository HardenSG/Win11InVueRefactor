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
