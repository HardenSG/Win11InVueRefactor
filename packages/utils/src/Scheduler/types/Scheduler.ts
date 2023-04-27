import type { CurrentShowComponentInter, CustomComponentInter, VNode } from '.'

export interface SchedulerInter {
  components: CustomComponentInter[]
  fixTaskBarComponent: CustomComponentInter[]
  currentShowComponent: CurrentShowComponentInter[]
  size: number
  maxTrie: number

  Init: (CustomComponents: any) => void
  handleComponent: (CustomComponents: any) => void
  handlesAddFixTaskBarComponent: () => void
  addFixTaskBarComponent: (component: CustomComponentInter) => void
  removeComponent: (uuid: number) => void
  removeTaskBarComponent: (uuid: number) => void
  removeCurrentShowComponent: (uuid: number) => void
  installComponents: (component: CustomComponentInter) => void
  uninstallComponent: (uuid: number) => boolean
  updateCurrentShowComponent: (component: CurrentShowComponentInter[]) => void
  updateComponent: () => void
  judgeMaxTrie: (customZIndex: number) => boolean
  adjustComponentTier: (uuid: number) => void
}
