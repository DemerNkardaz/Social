export function useReadyAnimate() {
	const isReady = ref(false)

	const trigger = () => {
		isReady.value = false

		requestAnimationFrame(() => {
			requestAnimationFrame(() => {
				isReady.value = true
			})
		})
	}

	onMounted(trigger)
	onActivated(trigger)

	onDeactivated(() => {
		isReady.value = false
	})

	return { isReady }
}
