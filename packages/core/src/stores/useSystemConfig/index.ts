import { defineStore } from 'pinia'
import type { UseSystemConfigActions, UseSystemConfigData, UseSystemConfigGetter } from './types'

const options = import.meta.glob('./*.ts', { eager: true })
const store = {}
for (const item in options) {
  Object.assign(store, (options[item] as unknown as any).default)
}
const stores = defineStore<
  string,
  UseSystemConfigData,
  UseSystemConfigGetter<UseSystemConfigData>,
  UseSystemConfigActions
>('UseSystemConfig', store)

export default stores
export { UseSystemConfigActions, UseSystemConfigData, UseSystemConfigGetter }
