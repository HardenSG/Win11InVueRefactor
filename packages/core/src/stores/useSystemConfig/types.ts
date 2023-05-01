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

export type { UseSystemConfigData, UseSystemConfigGetter, UseSystemConfigActions }
