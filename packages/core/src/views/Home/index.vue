<template>
  <div class="all" ref="reference">
    <div class="DeskTop">
      <renderFunc :list="components" />
    </div>
    <div class="bar">
      <TaskBarVue :list="computeComponents"></TaskBarVue>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, watchEffect } from 'vue'
import TaskBarVue from '@Com/BaseComponent/TaskBar/index.vue'
import Scheduler from '@/scheduler/index'
import * as All from '@/scheduler/apps'
import UseScheduler from '@stores/useScheduler'
import UseSystemConfig from '@stores/useSystemConfig'
import render from './renderQueue'
import renderFunc from './render'
import type { taskBarRenderList } from './type'

// import { judgeComponentChange } from './hook'

const schedulerStore = UseScheduler()
const systemStore = UseSystemConfig()
const reference = ref<HTMLElement>()
const components = reactive<any[]>([])
// const judgeIsChange = judgeComponentChange(store)

const computeComponents = computed<taskBarRenderList>(() => {
  if (schedulerStore.component.length) {
    // if (judgeIsChange()) {
    // }
    // console.log(judgeIsChange())

    const len = components.length
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    components.splice(0, len, ...render(schedulerStore.component))

    return [schedulerStore.fixTaskBarComponent, schedulerStore.currentShowComponent]
  }
  return [[], []]
})

schedulerStore.cacheScheduler(new Scheduler(All))
provide<ReturnType<typeof UseScheduler>>('UseScheduler', schedulerStore)

watchEffect(() => {
  // MARK: remove console
  // console.log('computedComponent --> ', computeComponents.value)

  if (reference.value) {
    // MARK: set background image
    reference.value.style.backgroundImage = `url(${systemStore.getThemeSrc})`
  }
})

// MARK: install
// setTimeout(() => {
//   store.installComponents(LeftPane)
// }, 2000)

// document.addEventListener('contextmenu', (e) => {
//   e.preventDefault()
// })

// const initDeskTop = () => {
//   menuStore.setMenuVisible(false);
// };

// const menuRef = ref(null);
// const showMainMenu = (e) => {
//   menuRef.value.setMenu(e, 'blank');
// };

document.addEventListener('keyup', (e) => {
  if (e.key === 'Control') {
    console.log('control')
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}
.all {
  width: 100vw;
  height: 100vh;
  background-color: red;
  background-size: 100% 100%;
  background-attachment: fixed;
  .DeskTop {
    height: calc(100vh - 48px);
    width: 100%;
    padding-top: 10px;
  }
  .bar {
    // position: absolute;
    // bottom: 0;
    height: 48px;
    width: 100%;
  }
}
</style>
