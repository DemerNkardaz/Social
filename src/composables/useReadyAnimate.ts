export function useReadyAnimate() {
	const isReady = ref(false)

	onMounted(() => {
		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				isReady.value = true
			})
		})
	})

	return { isReady }
}
