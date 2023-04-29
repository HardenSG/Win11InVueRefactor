<script setup lang="ts">
import {
  toolSize,
  BindGlobalEvent,
  RemoveGlobalEvent,
  BindEvent,
  changeDomStyle,
  getCompUUid,
} from 'utils'

// import { getSrcSetting } from '../../utils/getSrc'
import { onMounted, ref, inject } from 'vue'
import { getBrowserVPort, isFullWidth, useMaxOrMinIcon } from './hooks'

// const props = defineProps({
//   color: {
//     type: String,
//     default: 'black',
//   },
// })

const refParent = ref<HTMLElement>()

const store = inject('UseScheduler')
let _uuid: number
const parent = ref<HTMLElement | any>()
const [MaxOrMin, updateIcon] = useMaxOrMinIcon(parent)()
let { viewSizeWidth, viewSizeHeight, top, left } = toolSize
// 拆分功能区
const splitFlag = ref(false)

onMounted(() => {
  // MARK：remove console
  console.log('我初始化了')
  parent.value = refParent?.value?.offsetParent
  _uuid = getCompUUid(parent.value?.attributes)

  // init
  changeDomStyle(parent.value, {
    width: `${viewSizeWidth}px`,
    height: `${viewSizeHeight}px`,
    left: `${left}px`,
    top: `${top}px`,
  })
})

// 最小化
const mini = () => {
  if (_uuid) {
    ;(store as any).syncHideComponentData(Number(_uuid), false)
  }
}

// 关闭
const close = () => {
  if (_uuid) {
    ;(store as any).syncHideComponentData(Number(_uuid), true)
  }
}

// 切换最大化最小化
const max = () => {
  console.log(getBrowserVPort())

  const _isFullWidth = isFullWidth(parent.value)
  let changeObj = {
    width: '100vw',
    height: '100vh',
    left: '0',
    top: '0',
  }

  if (_isFullWidth) {
    // 默认最小化为用户自定义的宽度大小，位置
    changeObj = {
      width: `${viewSizeWidth}px`,
      height: `${viewSizeHeight}px`,
      left: `${left}px`,
      top: `${top}px`,
    }
  }

  changeDomStyle(parent.value, changeObj)
  updateIcon()
}

// 拖动元素
const moveBox = (e: any) => {
  // TODO: 这个地方联动 store.component 通过uuid
  console.log(_uuid)
  parent.value.style.zIndex = 100

  // 初始鼠标按下时候的，在toolbar的位置
  const X = e.pageX - parent.value.offsetLeft
  const Y = e.pageY - parent.value.offsetTop

  parent.value.classList.add('notransition')

  // 移动监听事件
  const move = (e: any) => {
    const ofX = e.pageX - X
    const ofY = e.pageY - Y

    parent.value.style.top = ofY + 'px'
    parent.value.style.left = ofX + 'px'

    // 更新位置的数据
    left = ofX
    top = ofY
  }

  // 添加监听和移除监听
  BindGlobalEvent('mousemove', move)
  BindGlobalEvent('mouseup', () => {
    parent.value.classList.remove('notransition')
    RemoveGlobalEvent('mousemove', move)
  })
}

/**
 * 框的左右上下缩放
 * @param {*} e -> Event Object
 * 先给框的四周加上四个宽3px高100% 的div
 * 给四个div监听鼠标按下事件，即是触发缩放的边缘了
 * 监听滑动事件即开始缩放
 * 监听鼠标弹起事件即删除监听
 */
const dragChangeSize = (flag: 'WIDTH' | 'HEIGHT') => {
  parent.value.classList.add('notransition')
  const move = (e: any) => {
    if (flag === 'HEIGHT') {
      const ofT = parent.value.offsetTop
      parent.value.style.height = e.pageY - ofT + 'px'

      // 更新改变视窗的大小，并更新viewData的数据
      viewSizeHeight = e.pageY - ofT
    } else {
      const ofL = parent.value.offsetLeft

      parent.value.style.width = e.pageX - ofL + 'px'

      // 更新改变视窗的大小，并更新viewData的数据
      viewSizeWidth = e.pageX - ofL
    }
  }

  BindGlobalEvent('mousemove', move)
  BindGlobalEvent('mouseup', () => {
    parent.value.classList.remove('notransition')
    document.removeEventListener('mousemove', move)
  })
}

// maxButton 的移入事件，target：显示split窗口
const showSplit = async (e: any) => {
  const target = e.target

  const flag = await new Promise((resolve) => {
    const timer = setTimeout(() => {
      resolve(true)
    }, 800)

    BindEvent(target, 'mouseleave', () => {
      clearTimeout(timer)
      resolve(false)
    })
  })
  if (flag) {
    splitFlag.value = true
  }
}

// 监听分割窗的移除事件，立即关闭该窗口
const closeSplit = () => {
  splitFlag.value = false
}

// 拆分视窗
const splitFunction = (flag: 'left' | 'right' | 'top' | 'bottom') => {
  switch (flag) {
    case 'left': {
      changeDomStyle(parent.value, {
        width: '50vw',
        height: '100vh',
        left: '0',
        top: '0',
      })
      break
    }
    case 'right': {
      changeDomStyle(parent.value, {
        width: '50vw',
        height: '100vh',
        left: `${document.body.clientWidth / 2}px`,
        top: '0',
      })
      break
    }
    case 'top': {
      changeDomStyle(parent.value, {
        width: '100vw',
        height: '50vh',
        left: '0',
        top: '0',
      })
      break
    }
    case 'bottom': {
      changeDomStyle(parent.value, {
        width: '100vw',
        height: '50vh',
        left: '0',
        top: `${window.screen.height / 2}px`,
      })
      break
    }
  }
  updateIcon()
}
</script>
<template>
  <div class="topButton">
    <!-- :style="{ color: color }" -->
    <div class="title" @mousedown="moveBox" ref="refParent">
      <slot></slot>
    </div>
    <div class="functionArea">
      <button @click="mini"><img src="@/assets/img/setting/minimize.png" /></button>
      <button @click="max" @mouseenter="showSplit">
        <img :src="MaxOrMin" />
      </button>
      <button @click="close"><img src="@/assets/img/setting/close.png" /></button>
    </div>
    <div class="right" @mousedown="dragChangeSize('WIDTH')"></div>
    <div class="bottom" @mousedown="dragChangeSize('HEIGHT')"></div>
    <div class="splitTool" v-if="splitFlag" @mouseleave="closeSplit">
      <div class="splitLeft">
        <span class="splitLeft-left" @click="splitFunction('left')"></span>
        <span class="splitLeft-right" @click="splitFunction('right')"></span>
      </div>
      <div class="splitRight">
        <span class="splitRight-top" @click="splitFunction('top')"></span>
        <span class="splitRight-bottom" @click="splitFunction('bottom')"></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.topButton {
  display: flex;
  height: 30px;
  justify-content: space-between;
  user-select: none;
  .title {
    width: calc(100% - 150px);
    padding-left: 10px;
    line-height: 30px;
    font-size: 12px;
  }
  .functionArea {
    flex: 1;
    button {
      width: 33.33%;
      height: 100%;
      border: 0;
      background-color: transparent;
      &:hover {
        background-color: #d6d6d7;
      }
      &:nth-last-child(1):hover {
        background-color: red;
      }
    }
  }
}

img {
  width: 40%;
}

.right {
  position: absolute;
  right: 0;
  width: 3px;
  height: 100%;
  cursor: e-resize;
}
.bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 3px;
  cursor: s-resize;
}
.splitTool {
  position: absolute;
  right: 2em;
  top: 25px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  z-index: 99;

  width: 10em;
  height: 5em;
  background-color: #2e2e2e;
  border-radius: 0.7em;

  .splitLeft,
  .splitRight {
    width: 40%;
    height: 80%;
  }
  .splitLeft {
    display: flex;
    justify-content: space-between;
    &-left,
    &-right {
      width: 45%;
      background-color: #505050;
    }
    &-left {
      border-radius: 4px 0 0 4px;
      &:hover {
        background-color: #b0c6cb;
      }
    }
    &-right {
      border-radius: 0 4px 4px 0;
      &:hover {
        background-color: #b0c6cb;
      }
    }
  }

  .splitRight {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &-top,
    &-bottom {
      width: 100%;
      height: 45%;
      background-color: #505050;
    }

    &-top {
      border-radius: 4px 4px 0 0;
      &:hover {
        background-color: #b0c6cb;
      }
    }
    &-bottom {
      border-radius: 0 0 4px 4px;
      &:hover {
        background-color: #b0c6cb;
      }
    }
  }
}
</style>
