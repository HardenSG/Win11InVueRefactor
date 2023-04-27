export const changeDomStyle = (el: HTMLElement, styleSheets: Partial<CSSStyleDeclaration>) => {
  el.style.display = 'none'
  for (const k in styleSheets) {
    const v = styleSheets[k]
    el.style[k] = v
  }

  el.style.display = 'block'
}
