import { ref } from 'vue'

const rootFontSize = ref(parseFloat(getComputedStyle(document.documentElement).fontSize))

export function updateRootFontSize() {
  rootFontSize.value = parseFloat(getComputedStyle(document.documentElement).fontSize)
}

export function useRootFontSize() {
  return { rootFontSize }
}
