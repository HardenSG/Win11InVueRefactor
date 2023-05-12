import { isObj } from './type'

export function patchProperty(origin: object, propList: any) {
  if (!isObj(propList)) {
    throw new Error('NOT A OBJ FOR THIS propList')
  }

  for (const k in propList) {
    const v = propList[k] as string
    if (k || v) {
      origin[k] = v
    }
  }
}
