import { DEFAULT_THEME_IMG_SRC } from '@/data'
import type { UseSystemConfigData } from './types'
export default {
  state: (): UseSystemConfigData => {
    return {
      themeSrc: DEFAULT_THEME_IMG_SRC,
    }
  },
  getters: {
    getThemeSrc: (state: UseSystemConfigData) => state.themeSrc || DEFAULT_THEME_IMG_SRC,
  },
}
