import { isArray } from './type'

export function normalizeArray(components: any) {
  return isArray(components) ? components : []
}
