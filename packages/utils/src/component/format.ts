export function formatInitComponent(vNode, appName, iconImg, IsFixTaskBar: boolean) {
  const type = vNode
  const isMount = false
  const customZIndex = -1

  return {
    vNode,
    type,
    IsFixTaskBar,
    iconImg,
    appName,
    isMount,
    customZIndex,
  }
}
