import { defineStore } from 'pinia'

const options = import.meta.glob('./*.ts', { eager: true })
const store = {}
for (const item in options) {
  Object.assign(store, (options[item] as unknown as any).default)
}
const stores = defineStore('UseSystemConfig', store)

export default stores
