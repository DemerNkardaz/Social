import { ref } from 'vue'

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
const screennWidth = window.screen.width
const screennHeight = window.screen.height

function onResize() {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
}

window.addEventListener('resize', onResize)

export function useWindowSize() {
  return { windowWidth, windowHeight, screennWidth, screennHeight }
}
