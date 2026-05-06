import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import { MDXProvider } from '@mdx-js/vue'
import './styles/main.scss'
import './styles/_variables.scss'

const app = createApp(App)

app.use(i18n)
app.component('MdxVueProvider', MDXProvider)

app.mount('#app')

function updateScale() {
	const baseWidth = 1920;
	const baseHeight = 1080;
	const baseAspect = baseWidth / baseHeight;

	const screenWidth = window.screen.width;
	const screenHeight = window.screen.height;
	const currentAspect = screenWidth / screenHeight;

	let scale;
	let logicalWidth;

	if (currentAspect > baseAspect) {
		scale = screenHeight / baseHeight;
		logicalWidth = baseHeight * baseAspect * scale;
	} else {
		scale = screenWidth / baseWidth;
		logicalWidth = screenWidth;
	}

	const root = document.documentElement;
	root.style.fontSize = `${scale * 12}pt`;
	root.style.setProperty('--common-width', `${logicalWidth}px`);
}

window.addEventListener('resize', updateScale);
updateScale();

if (import.meta.env.DEV) {
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
