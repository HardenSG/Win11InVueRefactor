/* eslint-disable no-unused-vars */
interface UseSystemConfigData {
  themeSrc: string
  [p: string]: any
}

interface UseSystemConfigGetter<T> {
  getThemeSrc: (state: T) => string
  [p: string]: any
}

interface UseSystemConfigActions {
  setThemeSrc: (src: string) => void
  [p: string]: any
}
export const enum SYSTEM_LOCAL_STORAGE_KEY {
  THEME_SRC = 'system_config_theme',
}

export type { UseSystemConfigData, UseSystemConfigGetter, UseSystemConfigActions }
