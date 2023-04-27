import { VNode, RendererNode, RendererElement } from 'vue'
import { CustomComponentInter, CurrentShowComponentInter, SchedulerInter } from '../types'

export default class Scheduler implements SchedulerInter {
  components: CustomComponentInter[]
  fixTaskBarComponent: CustomComponentInter[]
  currentShowComponent: CurrentShowComponentInter[]
  size: number
  maxTrie: number
  Init: (VNodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[]) => void
  handleComponent: (VNodes: VNode<RendererNode, RendererElement, { [key: string]: any }>[]) => void
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
