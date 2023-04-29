import { CUSTOM_COMPONENT, isObj } from '..'

const baseJudge = (component: any, property: string) => {
  if (!isObj(component)) {
    return false
  }

  const isCustom = component[property] || false
  return isCustom
}

export const isCustomComponent = (component: any): boolean => {
  return baseJudge(component, CUSTOM_COMPONENT.isCustomComponent)
}

export const isCurrentShowComponent = (component: any): boolean => {
  return baseJudge(component, CUSTOM_COMPONENT.isCurrentShowComponent)
}
