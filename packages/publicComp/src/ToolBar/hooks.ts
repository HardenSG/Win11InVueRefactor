import { ref, type Ref } from 'vue'
import maxIcon from './assets/maxmin.png'
import minIcon from './assets/maximize.png'

export const isFullHeight = (dom: HTMLElement | any) => {
  if (!dom) {
    console.warn('【WARN】：不能检测是否为一个全屏状态，因为你传入了一个 null ，它本应是一个DOM')
    return false
  }
  // MARK: remove console
  console.log('isFullWidth', dom?.style.width === '100vw' || dom?.style.width === '')
  return dom?.style.height === '100vh' || dom?.style.width === ''
}

export const isFullScreen = (dom: HTMLElement | any) => {
  if (!dom) {
    console.warn('【WARN】：不能检测是否为一个全屏状态，因为你传入了一个 null ，它本应是一个DOM')
    return false
  }
  return dom?.style.width === '100vw' && dom.style.height === '100vh'
}

export const isFullWidth = (dom: HTMLElement | any) => {
  if (!dom) {
    console.warn('【WARN】：不能检测是否为一个全屏状态，因为你传入了一个 null ，它本应是一个DOM')
    return false
  }
  // MARK: remove console
  console.log('isFullWidth', dom?.style.width === '100vw' || dom?.style.width === '')
  return dom?.style.width === '100vw' || dom?.style.width === ''
}

// TODO:
export const getBrowserVPort = () => {
  console.log(window.visualViewport)
}

export const useMaxOrMinIcon = (dom: Ref<HTMLElement | any>): (() => [Ref, Function]) => {
  return () => {
    const maxOrMin = ref<string>(maxIcon)
    const updateIcon = () => {
      const isFullSize = isFullScreen(dom.value)
      if (isFullSize) {
        maxOrMin.value = minIcon
      } else {
        maxOrMin.value = maxIcon
      }
    }

    return [maxOrMin, updateIcon]
  }
}
