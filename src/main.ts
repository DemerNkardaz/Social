import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import { MDXProvider } from '@mdx-js/vue'

import './styles/main.scss'
import './styles/common.scss'
import './styles/_variables.scss'
import './styles/_animations.scss'

import 'uno.css'

import { updateScale } from './scripts/updateScale'
import { updateRootFontSize } from './scripts/composables/useRootFontSize'

const app = createApp(App)

app.use(i18n)
app.component('MdxVueProvider', MDXProvider)

app.mount('#app')

function UIUpdate() {
	updateScale()
	updateRootFontSize()
}

window.addEventListener('resize', UIUpdate)
UIUpdate()

if (import.meta.env.DEV) {
	import('./scripts/dev').then(m => m.devShowBounds())
}
