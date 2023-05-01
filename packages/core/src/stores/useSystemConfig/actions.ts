import type { UseSystemConfigActions } from './types'

const actions: UseSystemConfigActions = {
  setThemeSrc(src: string): void {
    this.themeSrc = src
    // TODO: LS storage
  },
}

export default { actions }
