import { CustomLocalStorage } from './core'

export const Ls = (secretToken?: string, expires?: number) =>
  new CustomLocalStorage(secretToken, expires)
