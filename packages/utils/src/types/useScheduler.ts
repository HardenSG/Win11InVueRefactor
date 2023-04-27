import { CurrentShowComponentInter, CustomComponentInter, SchedulerInter } from '../Scheduler'

export interface UseSchedulerDate {
  scheduler: SchedulerInter
}

export interface UseSchedulerGetter<T> {
  component: (state: T) => CustomComponentInter[]
  fixedComponent: (state: T) => CustomComponentInter[]
  currentShowComponent: (state: T) => CurrentShowComponentInter[]
}

export interface UseSchedulerActions {
  cacheScheduler: (scheduler: SchedulerInter) => any
  updateCurrentShowComponent: (components: CurrentShowComponentInter[]) => void
  installComponents: (component: CustomComponentInter) => void
  syncHideComponentData: (uuid: number, isRemove: boolean) => boolean
  syncShowComponentData: (uuid: number, isTaskBar: boolean) => boolean
  toggleZIndexComponent: (uuid: number) => void
}
