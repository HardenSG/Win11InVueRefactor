import { VNode } from 'vue'
import { CUSTOM_COMPONENT } from '.'

export interface CustomComponentInter {
  readonly [CUSTOM_COMPONENT.isCustomComponent]: boolean
  uuid: number
  $$$refImpl: HTMLElement | null
  vNode: VNode
  type: VNode
  IsFixTaskBar: boolean
  iconImg: string
  appName: string
  isMount: boolean
  customZIndex: number
  SetUUid: (uuid: number) => void
  SetRefImpl: (refImpl: HTMLElement) => void
  UpdateIndex: (index: number) => void
  UpdateIsMount: (isMount: boolean) => void
}

export interface CurrentShowComponentInter {
  readonly [CUSTOM_COMPONENT.isCurrentShowComponent]: boolean
  uuid: number
  component: CustomComponentInter
  order: number
  isHide: boolean
  IsFixTaskBar: boolean
  UpdateOrder: (order: number) => void
  UpdateIsHide: (isHide: boolean) => void
}

export { VNode }
