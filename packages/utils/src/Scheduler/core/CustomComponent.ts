import { type CustomComponentInter, type VNode, CUSTOM_COMPONENT } from '../types'

export default class CustomComponent implements CustomComponentInter {
  readonly [CUSTOM_COMPONENT.isCustomComponent] = true
  uuid: number
  $$$refImpl: HTMLElement
  vNode: VNode
  type: VNode
  IsFixTaskBar: boolean
  iconImg: string
  appName: string
  isMount: boolean
  customZIndex: number
  constructor(
    vNode: VNode,
    type: VNode,
    IsFixTaskBar: boolean,
    iconImg: string,
    appName: string,
    isMount: boolean,
    customZIndex: number,
  ) {
    this.vNode = vNode
    this.type = type
    this.IsFixTaskBar = IsFixTaskBar
    this.iconImg = iconImg
    this.appName = appName
    this.isMount = isMount
    this.customZIndex = customZIndex
  }
  SetUUid(uuid: number) {
    this.uuid = uuid
  }
  SetRefImpl(refImpl: HTMLElement) {
    this.$$$refImpl = refImpl
  }
  UpdateIndex(index: number) {
    this.customZIndex = index
  }
  UpdateIsMount(isMount: boolean) {
    this.isMount = isMount
  }
}
