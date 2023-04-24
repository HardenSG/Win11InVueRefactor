import type { List, UseDemoActions } from '.'

const actions: UseDemoActions = {
  cacheDemoList(list: List) {
    this.demoList = list
    return this
  },
}

export default { actions }
