import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from './plugins/auto-import'
import Components from './plugins/components'
import svgLoader from './plugins/svg-loader'

import mdx from '@mdx-js/rollup'

import UnoCSS from 'unocss/vite'

import scssTokensPlugin from './plugins/vite-plugin-scss-tokens'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		{
			enforce: 'pre', ...mdx({
			jsxImportSource: 'vue',
			})
		},
		vue(),
		vueJsx(),
		svgLoader(),
		AutoImport(),
		Components(),
		UnoCSS(),
		vueDevTools(),
		scssTokensPlugin(),
	],
	base: '/Social/',
	server: {
		open: true
	},
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url))
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
					@use "@/styles/tokens" as *;
					@use "@/styles/constants" as *;
					@use "@/styles/functions" as *;
					@use "@/styles/mixins" as *;
				`
			}
		}
	},
})
