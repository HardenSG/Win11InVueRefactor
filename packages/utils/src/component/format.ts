export function formatInitComponent(
  vNode: any,
  appName: string,
  iconImg: string,
  IsFixTaskBar: boolean,
) {
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
