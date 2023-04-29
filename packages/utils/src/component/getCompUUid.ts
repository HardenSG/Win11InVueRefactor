import { CUSTOM_COMPONENT } from '..'

export const getCompUUid = (v: any) => {
  const isObj = typeof v === 'object'
  if (!isObj) {
    throw new Error('YOU PASS THE PARAMS IS NOT A ATTRIBUTES MAP')
  }

  const hasUUID = v[CUSTOM_COMPONENT.component_uuid] || null
  if (hasUUID) {
    return hasUUID.value
  } else {
    return undefined
  }
}
