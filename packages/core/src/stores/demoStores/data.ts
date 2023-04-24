import type { UseDemoData } from '.'

export default {
  state: (): UseDemoData => {
    return {
      demoList: [],
    }
  },
  getters: {
    getDemoList: (state: UseDemoData) => state.demoList || [],
  },
}
