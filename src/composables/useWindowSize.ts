import { throttle } from "@/utils"

const screenWidth = window.screen.width
const screenHeight = window.screen.height

export function useWindowSize() {
	const windowWidth = ref<number>(window.innerWidth)
	const windowHeight = ref<number>(window.innerHeight)

	const onResize = throttle(() => {
		windowWidth.value = window.innerWidth
		windowHeight.value = window.innerHeight
	}, 1000);


	onMounted(() => {
		window.addEventListener('resize', onResize)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', onResize)
	})

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
