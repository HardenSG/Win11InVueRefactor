import { isNil } from '..'
import { JSONParse, JSONStringify } from './core'
import { LSGetOptions, LSSetOptions } from './types'

export const Ls = {
  get: <T>(key?: string, { defaultValue, raw }: LSGetOptions<T> = {}): T | undefined => {
    if (isNil(key)) {
      return defaultValue || (key as undefined)
    }
    const res = localStorage.getItem(key)
    if (isNil(res)) {
      return defaultValue
    }
    if (raw) {
      return (res || defaultValue) as T
    }
    return JSONParse<T>(res) || defaultValue
  },
  set: (key: string, value?: unknown, { raw }: LSSetOptions = {}) => {
    if (isNil(value)) {
      return localStorage.removeItem(key)
    }
    const _value = raw ? String(value) : JSONStringify(value)
    if (isNil(_value)) {
      return localStorage.removeItem(key)
    }
    localStorage.setItem(key, _value)
  },
}
