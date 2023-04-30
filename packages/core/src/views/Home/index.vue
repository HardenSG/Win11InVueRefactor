<template>
  <div class="all">
    <div class="bar">
      <TaskBarVue :list="computeComponents"></TaskBarVue>
    </div>
    <renderFunc :list="components" />
  </div>
</template>

<script setup lang="ts">
import { computed, provide, reactive, watchEffect } from 'vue'
import TaskBarVue from '@Com/BaseComponent/TaskBar/index.vue'
import Scheduler from '@/scheduler/index'
import * as All from '@/scheduler/apps'
import UseScheduler from '@stores/useScheduler'
import render from './renderQueue'
import renderFunc from './render'
import type { taskBarRenderList } from './type'
// import { judgeComponentChange } from './hook'

const store = UseScheduler()
const components = reactive<any[]>([])
// const judgeIsChange = judgeComponentChange(store)

const computeComponents = computed<taskBarRenderList>(() => {
  if (store.component.length) {
    // if (judgeIsChange()) {
    // }
    // console.log(judgeIsChange())

    const len = components.length
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    components.splice(0, len, ...render(store.component))

    // MARK: remove console
    console.log('home/components --> ', components)

    return [store.fixTaskBarComponent, store.currentShowComponent]
  }
  return [[], []]
})

store.cacheScheduler(new Scheduler(All))
provide<ReturnType<typeof UseScheduler>>('UseScheduler', store)

// MARK: maybe remove
// watchEffect(() => {
//   if (store.components.length) {
//     const len = components.length
//     components.splice(0, len, ...render(store.components))
//   }
// })

watchEffect(() => {
  // MARK: remove console
  console.log(computeComponents.value)
})

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

  .main {
    height: calc(100% - 48px);
    width: 100%;
  }
  .bar {
    position: absolute;
    bottom: 0;
    height: 48px;
    width: 100%;
  }
}
</style>
