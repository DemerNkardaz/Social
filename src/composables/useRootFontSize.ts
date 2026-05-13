import { ref } from 'vue'

const rootFontSize = ref(parseFloat(getComputedStyle(document.documentElement).fontSize))

export function updateRootFontSize() {
  rootFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export function useRootFontSize() {
  return { rootFontSize }
}

export function fluidPx(px: number): number {
  const fontSize = rootFontSize.value
  return (px / 16) * fontSize
}

export function fluidRem(px: number): string {
  const fontSize = rootFontSize.value
  return `${(px / fontSize) * 1}rem`
}
