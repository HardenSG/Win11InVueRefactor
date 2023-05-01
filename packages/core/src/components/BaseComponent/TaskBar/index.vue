<template>
  <div>
    <!-- <startMenu></startMenu> -->
    <div class="taskbar fcs">
      <div class="tsleft">
        <!-- <div class="taskbarBtn" id="widget" @click.stop="showTasker(1)">
          <img src="@/assets/img/icon/widget.png" alt="" id="startMenuImg" />
        </div> -->
      </div>
      <div class="center fcc">
        <!-- 打开的方式不同，使用popover -->
        <!-- <Popover dir="bottom" v-for="item in bottomPop" :key="item">
          <Start></Start>
          <component :is="item.component"></component>
          <template #reference>
            <div id="taskMenu" class="taskbarBtn">
              <img :src="getSrcIcon(item.icon)" :id="`${item.icon}Img`" />
            </div>
          </template>
        </Popover> -->
        <!-- 任务栏中间部分 @click="closeAllPanel"-->
        <renderFixTask
          v-for="item in components[0]"
          :key="hasOwn(item, 'order') ? (item as CurrentShowComponentInter).order : item.uuid"
          :item="item"
        />
        <span class="splitTask"></span>
        <renderSideTask v-for="item in components[1]" :key="item.order" :item="item" />
      </div>
      <div class="tsright fcc">
        <!-- <div class="up fcc">^</div> -->
        <!-- <Popover dir="bottom">
          <SideWiFi></SideWiFi>
          <template #reference>
            <div class="wf">
              <ul class="fcc">
                <li><img src="@/assets/img/icon/ui/wifi.png" alt="" /></li>
                <li><img src="@/assets/img/icon/ui/audio3.png" alt="" /></li>
              </ul>
            </div>
          </template>
        </Popover> -->

        <!-- <Popover dir="bottom">
          <Win11Calendar></Win11Calendar>
          <template #reference>
            <div class="data fcc">
              <div class="systemTime">
                <div>{{ time }}</div>
                <div>{{ date }}</div>
              </div>
            </div>
          </template>
        </Popover> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { renderFixTask, renderSideTask } from './renderTask'
import type { taskBarRenderList } from '@/views/Home/type'
import UseScheduler from '@stores/useScheduler'
import { type CurrentShowComponentInter, hasOwn } from 'utils'
import { computed, provide, toRaw, watchEffect } from 'vue'
const props = defineProps<{
  list: taskBarRenderList
}>()

const store = UseScheduler()

// MARK：联动currentShowComponent
// const components1 = computed(() => props.list.length && props.list)
const components = computed<taskBarRenderList>(() => {
  // MARK: remove console
  // console.log('propslist -->', props.list)

  if ((props.list as taskBarRenderList)[1].length) {
    /**
     *  将currentShowComponent中是fixTaskBarComponent的组件全部剔除，
     *  将剔除出来的元素进行记录，将fixTaskBarComponent中的元素进行替换，剩下的操作就要交给renderFixTask了
     */
    // MARK：岂不是每个组件变动都需要重新执行
    // 解决方案：做分别处理，这样能最大限度的减少对全局的影响
    const fixs = new Map()
    const fixedComponents = [...toRaw(props.list[0])]
    const curShowComponent = [...toRaw(props.list[1])]
    const spareArr = curShowComponent.filter((c) => {
      if (c.IsFixTaskBar) {
        // 剔除
        fixs.set(c.uuid, c)
        return false
      } else {
        return true
      }
    })
    curShowComponent.splice(0, spareArr.length + 1, ...spareArr)
    fixedComponents.forEach((c, i) => {
      const isExist = fixs.get(c.uuid)
      if (isExist) {
        fixedComponents.splice(i, 1, isExist)
      }
    })
    console.log(fixedComponents, curShowComponent)
    return [fixedComponents, curShowComponent]
  } else {
    return props.list
  }
})

// MARK：call the sync show function to sync every things
const triggerShow = (uuid: number) => {
  return store.syncShowComponentData(uuid, true)
}
provide('triggerShow', triggerShow)

watchEffect(() => {
  // console.log(components.value, ' <-- 变化了')
  // console.log(components.value, ' <-- 变化了')
})
</script>

<style lang="scss" scoped>
.taskbar {
  --bg1: rgba(243, 243, 243, 0.85);
  position: absolute;
  width: 100vw;
  height: 48px;
  background: var(--bg1);
  backdrop-filter: saturate(3) blur(20px);
  bottom: 0;
  user-select: none;
  z-index: 100;
}
.tsleft {
  width: 212px;
}
.tsright > div {
  height: 48px;
  padding: 0 8px;
  &:hover {
    background: rgba(255, 255, 255, 0.8);
    transition: all 200ms ease-in-out;
  }
}
.fcs {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.fcc {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}
.hvlight:hover {
  background: rgba(255, 255, 255, 0.8);
  transition: all 200ms ease-in-out;
}
.taskbarBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  transition: all 0.5s;
  text-align: center;
  &:hover {
    background: #fff;
    border-radius: 0.3em;
  }
  img {
    height: 24px;
    vertical-align: middle;
  }
}
.tsright {
  ul {
    padding: 0;
  }
  li {
    padding: 0 8px;
    list-style: none;
  }
  img {
    height: 20px;
    vertical-align: middle;
  }
  .systemTime {
    padding: 0 5px;
    font-size: 14px;
    text-align: center;
    margin-top: 10px;
  }
}
.transition img {
  animation: small-and-big 1s;
}
@keyframes small-and-big {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.8);
  }
  100% {
    transform: scale(1);
  }
}

.splitTask {
  display: inline-block;
  margin-left: 5px;
  margin-right: 5px;
  height: 30px;
  border: 1px solid #999;
}
</style>
