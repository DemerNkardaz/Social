export function devShowBounds() {
	let overlayContainer: HTMLDivElement | null = null

	function showBounds() {
		overlayContainer = document.createElement('div')
		overlayContainer.classList.add('phantom-overlay-layer')

		document.body.appendChild(overlayContainer)

		document.querySelectorAll('*').forEach(el => {
			if (el === overlayContainer) return
			const rect = el.getBoundingClientRect()
			if (rect.width === 0 || rect.height === 0) return

			const phantom = document.createElement('div')
			phantom.style.cssText = `
				left: ${rect.left}px;
				top: ${rect.top}px;
				width: ${rect.width}px;
				height: ${rect.height}px;
			`
			phantom.classList.add('phantom-bound-box')
			if (overlayContainer) {
				overlayContainer.appendChild(phantom)
			}
		})
	}

	function hideBounds() {
		overlayContainer?.remove()
		overlayContainer = null
	}

	let active = false
	document.addEventListener('keydown', (e) => {
		if (e.altKey && e.key === 'b') {
			active = !active
			active ? showBounds() : hideBounds()
		}
	})
}
