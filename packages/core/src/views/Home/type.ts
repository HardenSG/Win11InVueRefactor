import type { CustomComponentInter, CurrentShowComponentInter } from 'utils'

export type taskBarRenderList = [
  (CustomComponentInter | CurrentShowComponentInter)[],
  CurrentShowComponentInter[]
]
