import { defineStore } from 'pinia'
import type { UseSchedulerData, UseSchedulerGetter, UseSchedulerActions } from '@/types'

const options = import.meta.glob('./*.ts', { eager: true })
const store = {}
for (const item in options) {
  Object.assign(store, (options[item] as unknown as any).default)
}
const stores = defineStore<
  string,
  UseSchedulerData,
  UseSchedulerGetter<UseSchedulerData>,
  UseSchedulerActions
>('UseScheduler', store)

export default stores
export { UseSchedulerData, UseSchedulerGetter, UseSchedulerActions }
