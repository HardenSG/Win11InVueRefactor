import { h, defineComponent, inject, toRefs, ref } from 'vue'
import UseScheduler from '@stores/useScheduler'
import styles from './index.module.scss'
import {
  type CurrentShowComponentInter,
  catchTargetComponent,
  isCurrentShowComponent,
  CustomComponent,
} from 'utils'

const store = UseScheduler()

export const renderFixTask = defineComponent({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    const isShowComponent = isCurrentShowComponent(props.item)
    // MARK: remove console
    // console.log(isShowComponent)

    // MARK: appName
    const { uuid } = props.item as CustomComponent
    let iconImg = ''
    const isHide = ref()
    const triggerShow = inject<Function>('triggerShow')

    if (isShowComponent) {
      // MARK: appName
      // appName = (props.item as CurrentShowComponentInter).component.appName
      iconImg = (props.item as CurrentShowComponentInter).component.iconImg
      isHide.value = catchTargetComponent(store.currentShowComponent, 'uuid', uuid)?.isHide
    } else {
      iconImg = (props.item as CustomComponent).iconImg
    }

    const render = () => {
      return h(
        'div',
        {
          class: `${styles.taskBarIcon} ${
            isShowComponent && (isHide.value ? styles.back : styles.active)
          }`,
          onClick: () => triggerShow!(uuid),
        },
        [
          h(
            'div',
            h('img', {
              src: iconImg,
            })
          ),
        ]
      )
    }

    return render
  },
})

export const renderSideTask = defineComponent({
  props: {
    item: {
      type: Object,
    },
  },
  setup(props) {
    // MARK: appName
    const { iconImg, uuid } = (props.item as CurrentShowComponentInter).component
    const triggerShow = inject<Function>('triggerShow')

    // MARK: order
    const { isHide } = toRefs<CurrentShowComponentInter>(
      catchTargetComponent(store.currentShowComponent, 'uuid', uuid) as CurrentShowComponentInter
    )
    const render = () => {
      return h(
        'div',
        {
          class: `${styles.taskBarIcon} ${isHide.value ? styles.back : styles.active}`,
          onClick: () => triggerShow!(uuid),
        },
        [
          h(
            'div',
            h('img', {
              src: iconImg,
            })
          ),
        ]
      )
    }
    return render
  },
})
