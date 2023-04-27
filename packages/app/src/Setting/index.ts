import Setting from './root/index.vue'

import { formatInitComponent, CustomComponent } from 'utils'

const ICON_IMG =
  'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0892cf3187b742d68aad4a0efc9c384d~tplv-k3u1fbpfcp-zoom-crop-mark:1512:1512:1512:851.awebp?'
const APP_NAME = 'Setting'
const IS_FIX = true

const { vNode, type, IsFixTaskBar, iconImg, appName, isMount, customZIndex } = formatInitComponent(
  Setting,
  APP_NAME,
  ICON_IMG,
  IS_FIX
)

const Component = new CustomComponent(
  vNode,
  type,
  IsFixTaskBar,
  iconImg,
  appName,
  isMount,
  customZIndex
)

export default Component
