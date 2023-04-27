import { CUSTOM_COMPONENT } from '../Scheduler/types/enum'
import { isObj } from '../baseHandles'

export const isCustomComponent = (component: any) => {
  if (!isObj(component)) {
    return false
  }

  const isCustom = component[CUSTOM_COMPONENT['isCustomComponent']] || false
  return isCustom
}
