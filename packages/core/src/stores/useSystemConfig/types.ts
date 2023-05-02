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
  // eslint-disable-next-line no-unused-vars
  THEME_SRC = 'system_config_theme',
}

export type { UseSystemConfigData, UseSystemConfigGetter, UseSystemConfigActions }
