export const isObj = (v: any) => v !== null && typeof v === 'object'
export const extend = Object.assign
export const isArray = Array.isArray
export const isString = (v) => typeof v === 'string'
export const isInteger = (key: any) => typeof key === 'number'
export const hasOwn = (target: any, key: any) => Object.prototype.hasOwnProperty.call(target, key)
export const isFunction = (v) => typeof v === 'function'
