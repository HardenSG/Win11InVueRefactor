import { defineStore } from 'pinia'

// You can define type for your pinia
export interface UseDemoData {
  demoList: any[]
}

export interface UseDemoGetter<T> {
  getDemoList: (state: T) => Partial<T>
  [p: string]: any
}
export type List = UseDemoData['demoList']

export interface UseDemoActions {
  cacheDemoList: (list: List) => any
  [x: string]: any
}

// <!-- vite: auto import --!>
const options = import.meta.glob('./*.ts', { eager: true })
const store = {}
for (const item in options) {
  Object.assign(store, (options[item] as unknown as any).default)
}
const stores = defineStore<string, UseDemoData, UseDemoGetter<UseDemoData>, UseDemoActions>(
  'useDemoList',
  store
)

export type demoStoreType = ReturnType<typeof stores>
export default stores
