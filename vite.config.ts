import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import { createHtmlPlugin } from 'vite-plugin-html'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'

import mdx from '@mdx-js/rollup'

import UnoCSS from 'unocss/vite'

import { visualizer } from 'rollup-plugin-visualizer'

import AutoImport from './plugins/auto-import'
import Components from './plugins/components'
import svgLoader from './plugins/svg-loader'
import scssTokensPlugin from './plugins/vite-plugin-scss-tokens'
import svgComponents from './plugins/vite-plugin-svg-components'
import OptimizeImages from './plugins/image-optimizer'
import path from 'node:path'

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
		VueI18nPlugin({
			include: [path.resolve(__dirname, './src/locales/**')],
		}),
		svgLoader(),
		AutoImport(),
		Components(),
		svgComponents({
			dts: 'src/types/svg-components.d.ts',
			dirs: [
				{ dir: '@/assets/images/socials', prefix: 'Logo' },
				{ dir: '@/assets/images/icons',   prefix: 'Icon' },
				{ dir: '@/assets/images/ui',   prefix: 'UI' },
			],
		}),
		OptimizeImages(),
		UnoCSS(),
		vueDevTools(),
		scssTokensPlugin(),
		createHtmlPlugin({
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeEmptyAttributes: true,
				minifyCSS: true,
				minifyJS: true,
			},
		}),
		visualizer({ gzipSize: true, brotliSize: true }),
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
	build: {
		target: 'esnext',
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: true,
				drop_debugger: true
			},
			format: {
				comments: false,
			},
		},
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						if (id.includes('vue') || id.includes('pinia')) return 'vue'
						return 'vendor'
					}
				}
			}
		}
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
