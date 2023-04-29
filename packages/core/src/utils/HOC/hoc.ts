import { h, ref, defineComponent, watchEffect, toRefs } from 'vue'
import {
  DESKTOPICON_IMG_STYLESHEET,
  DESKTOPICON_SPAN_STYLESHEET,
  type CustomComponentInter,
  catchTargetComponent,
  extend,
  CUSTOM_COMPONENT,
} from 'utils'
import UseScheduler from '@stores/useScheduler'

// export const HOCPluginDesktopComponent = (componentConfig) => {}

export const HOCPluginComponent = (isTaskBar: boolean, componentConfig: CustomComponentInter) => {
  const store = UseScheduler()
  return defineComponent({
    render() {
      // NOTE:
      const { type, uuid, appName, iconImg } = componentConfig
      const { isMount, customZIndex } = toRefs<CustomComponentInter>(
        catchTargetComponent(store.component, 'uuid', uuid) as CustomComponentInter
      )

      const refImpl = ref<HTMLElement>()
      const isExistNode = ref<boolean>(isMount.value)

      const props = extend(
        {
          ondblclick: () => {
            if (isMount.value) {
              /// 已经挂载了, 如果是低层级最小化则提升层级
              if (customZIndex.value > 0) {
                return
              }
              console.log(componentConfig, isMount, customZIndex)
              store.toggleZIndexComponent(uuid)
            } else {
              /// 还没挂载
              store.syncShowComponentData(uuid)
              isExistNode.value = !isExistNode.value
            }
          },
        },
        {
          style: {
            display: 'flex',
            flexDirection: 'column',
            justContent: 'center',
            alignItems: 'center',
          },
        }
      )

      watchEffect(() => {
        // NOTE: 暂用引用数据特性同步更新
        if (refImpl.value && !componentConfig.$$$refImpl) {
          componentConfig.SetRefImpl(refImpl.value.children[1] as HTMLElement)
        }
      })

      return h(
        'div',
        {
          ref: refImpl,
        },
        [
          h('div', props, [
            h('img', { src: iconImg, style: !isTaskBar && DESKTOPICON_IMG_STYLESHEET }),
            !isTaskBar && h('span', { style: DESKTOPICON_SPAN_STYLESHEET }, appName),
            isExistNode.value
              ? h(type, {
                  style: {
                    zIndex: customZIndex.value,
                  },
                  isMount: isExistNode.value,
                  [CUSTOM_COMPONENT.component_uuid]: uuid,
                })
              : null,
          ]),
        ]
      )
    },
  })
}
