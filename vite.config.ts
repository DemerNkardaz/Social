import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'


import mdx from '@mdx-js/rollup'

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
    vueDevTools(),
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
				additionalData: `@use "@/styles/variables.scss" as *;`
			}
		}
	},
})
