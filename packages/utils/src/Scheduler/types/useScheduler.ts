import { CurrentShowComponentInter, CustomComponentInter, SchedulerInter } from '.'

export interface UseSchedulerData {
  scheduler: SchedulerInter | null
  [p: string]: any
}

export interface UseSchedulerGetter<T> {
  component: (state: T) => CustomComponentInter[]
  fixedComponent: (state: T) => CustomComponentInter[]
  currentShowComponent: (state: T) => CurrentShowComponentInter[]
  [p: string]: any
}

export interface UseSchedulerActions {
  cacheScheduler: (scheduler: SchedulerInter) => any
  updateCurrentShowComponent: (components: CurrentShowComponentInter[]) => void
  installComponents: (component: CustomComponentInter) => void
  syncHideComponentData: (uuid: number, isRemove: boolean) => boolean
  syncShowComponentData: (uuid: number, isTaskBar: boolean) => boolean
  toggleZIndexComponent: (uuid: number) => void
  [p: string]: any
}
