import {
  type CurrentShowComponentInter,
  type CustomComponentInter,
  CUSTOM_COMPONENT,
} from '../types'

export default class CurrentShowComponent implements CurrentShowComponentInter {
  readonly [CUSTOM_COMPONENT.isCurrentShowComponent] = true
  uuid: number
  component: CustomComponentInter
  order: number
  isHide: boolean
  IsFixTaskBar: boolean
  constructor(
    uuid: number,
    component: CustomComponentInter,
    order: number,
    isHide: boolean,
    IsFixTaskBar: boolean,
  ) {
    this.uuid = uuid
    this.component = component
    this.order = order
    this.isHide = isHide
    this.IsFixTaskBar = IsFixTaskBar
  }

  UpdateOrder(order: number) {
    this.order = order
  }
  UpdateIsHide(isHide: boolean) {
    this.isHide = isHide
  }
}
