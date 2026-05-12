const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
const screenWidth = window.screen.width
const screenHeight = window.screen.height

function onResize() {
	windowWidth.value = window.innerWidth
	windowHeight.value = window.innerHeight
}

window.addEventListener('resize', onResize)

export function useWindowSize() {
	return { windowWidth, windowHeight, screenWidth, screenHeight }
}

export function toProportionalScales(w: number, h: number, aspect: number = 16 / 9) {
	const currentAspect = w / h;

	let finalW: number;
	let finalH: number;

	if (currentAspect > aspect) {
		finalH = h;
		finalW = h * aspect;
	} else {
		finalW = w;
		finalH = w / aspect;

		if (finalW < h * aspect) {
			finalW = h * aspect;
			finalH = h;
		}
	}

	return {
		w: Math.round(finalW),
		h: Math.round(finalH)
	};
}
