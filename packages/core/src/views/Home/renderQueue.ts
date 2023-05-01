import { h, toRaw } from 'vue'
import { HOCPluginComponent } from '@utils/index'
import styles from './index.module.scss'
import type { CustomComponentInter } from 'utils'

export default (props: CustomComponentInter[]) => {
  props = toRaw(props)

  const renderQueue = (): any[] => {
    return props.map((c) => {
      return h(HOCPluginComponent(false, c), {
        class: styles.deskTopIcon,
      })
    })
  }

  return renderQueue()
}
