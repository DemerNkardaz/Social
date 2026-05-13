import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from './i18n'
import { MDXProvider } from '@mdx-js/vue'


import './styles/main.scss'
import './styles/common.scss'
import './styles/_variables.scss'
import './styles/_animations.scss'

import 'uno.css'

import { updateScale } from './utils/updateScale'

const app = createApp(App)

app.use(i18n)
app.component('MdxVueProvider', MDXProvider)

app.mount('#app')

window.addEventListener('resize', updateScale)
updateScale()

if (import.meta.env.DEV) {
	import('./dev').then(m => m.devShowBounds())
}
