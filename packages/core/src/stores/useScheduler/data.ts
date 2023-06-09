import type { UseSchedulerData } from '.'

export default {
  state: (): UseSchedulerData => {
    return {
      scheduler: null,
    }
  },
  getters: {
    component: (state: UseSchedulerData) => state.scheduler?.components || [],
    fixTaskBarComponent: (state: UseSchedulerData) => state.scheduler?.fixTaskBarComponent || [],
    currentShowComponent: (state: UseSchedulerData) => state.scheduler?.currentShowComponent || [],
  },
}
