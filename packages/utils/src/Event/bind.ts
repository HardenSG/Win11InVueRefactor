const baseBind = (
  el: HTMLElement | Document,
  type: string,
  cb: EventListener,
  isRemove: boolean,
) => {
  if (isRemove) {
    el.removeEventListener(type, cb)
  } else {
    el.addEventListener(type, cb, false)
  }
}

export const BindGlobalEvent = (type: string, cb: EventListener) => {
  baseBind(document, type, cb, false)
}

export const RemoveGlobalEvent = (type: string, cb: EventListener) => {
  baseBind(document, type, cb, true)
}

export const BindEvent = (el: HTMLElement, type: string, cb: EventListener) => {
  baseBind(el, type, cb, false)
}

export const RemoveEvent = (el: HTMLElement, type: string, cb: EventListener) => {
  baseBind(el, type, cb, true)
}
