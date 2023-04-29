import { isObj, normalizeArray } from '..'

function baseCatch<T>(origin: Array<T>, handles: any): T[] {
  if (!isObj(origin)) {
    throw new Error('NOT A OBJECT')
  }

  return normalizeArray(origin).filter(handles)
}

/**
 *
 * @param origin origin object that you pass
 * @param property target property to filter content
 * @param value target property's value
 * @returns T[]
 */
export function filterGarbageComponent<T>(origin: Array<T>, property: any, value: any): T[] {
  const handles = (v: T) => {
    return v[property] != value
  }

  return baseCatch<T>(origin, handles)
}

/**
 *
 * @param origin origin object that you pass
 * @param property target property to filter content
 * @param value target property's value
 * @returns T
 */
export function catchTargetComponent<T>(
  origin: Array<T>,
  property: any,
  value: any,
): T | undefined {
  const handles = (v: T) => {
    return v[property] == value
  }
  return baseCatch<T>(origin, handles)[0]
}
