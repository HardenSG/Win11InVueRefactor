import { CurrentShowComponentInter, CustomComponentInter, VNode } from '.'

export interface SchedulerInter {
  components: CustomComponentInter[]
  fixTaskBarComponent: CustomComponentInter[]
  currentShowComponent: CurrentShowComponentInter[]
  size: number
  maxTrie: number

  Init: (VNodes: VNode[]) => void
  handleComponent: (VNodes: VNode[]) => void
  handlesAddFixTaskBarComponent: () => void
  addFixTaskBarComponent: (component: CustomComponentInter) => void
  removeTaskBarComponent: (uuid: number) => void
  installComponents: (component: CustomComponentInter) => void
  uninstallComponent: (uuid: number) => boolean
  addCurrentShowComponent: (component: CustomComponentInter) => void
  updateComponent: () => void
  judgeMaxTrie: (customZIndex: number) => boolean
  adjustComponentTier: (uuid: number) => void
}
