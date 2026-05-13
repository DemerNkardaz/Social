import { updateRootFontSize } from "@/composables/useRootFontSize"

export function updateScale() {
	const baseWidth = 1920
	const baseHeight = 1080
	const baseAspect = baseWidth / baseHeight

	const screenWidth = window.screen.width
	const screenHeight = window.screen.height
	const currentAspect = screenWidth / screenHeight

	let scale
	let logicalWidth

	if (currentAspect > baseAspect) {
		scale = screenHeight / baseHeight
		logicalWidth = baseHeight * baseAspect * scale
	} else {
		scale = screenWidth / baseWidth
		logicalWidth = screenWidth
	}

	const root = document.documentElement
	root.style.fontSize = `${scale * 12}pt`
	root.style.setProperty('--common-width', `${logicalWidth}px`)

	updateRootFontSize()
}
