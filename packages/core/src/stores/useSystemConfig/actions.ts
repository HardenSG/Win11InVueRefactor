import { Ls } from 'utils'
import { SYSTEM_LOCAL_STORAGE_KEY, type UseSystemConfigActions } from './types'

const actions: UseSystemConfigActions = {
  setThemeSrc(src: string): void {
    this.themeSrc = src
    if (this.themeSrc !== src) {
      Ls().setItem<string>(SYSTEM_LOCAL_STORAGE_KEY.THEME_SRC, src, true, -1)
    }
  },
}

export default { actions }
