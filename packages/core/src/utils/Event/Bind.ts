export const BindGlobal = (type: string, cb: EventListener) => {
  window.addEventListener(type, cb)
}
