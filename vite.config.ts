import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'

import AutoImport from './plugins/auto-import'
import Components from './plugins/components'

import svgLoader from 'vite-svg-loader'

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
		svgLoader({
			svgoConfig: {
				plugins: [
					{
						name: 'preset-default',
						params: { overrides: { removeViewBox: false } },
					},
					{
						name: 'removeDimensions',
					},
					{
						name: 'smartReplaceColors',
						fn: () => {
							const colors = new Set();

							return {
								element: {
									enter: (node) => {
										if (node.attributes.fill && node.attributes.fill !== 'none') {
											colors.add(node.attributes.fill);
										}
										if (node.attributes.stroke && node.attributes.stroke !== 'none') {
											colors.add(node.attributes.stroke);
										}
										const style = node.attributes.style;
										if (style) {
											const matches = style.match(/(?:fill|stroke):\s*([^;]+)/g);
											matches?.forEach(m => {
												const color = m.split(':')[1].trim();
												if (color !== 'none') colors.add(color);
											});
										}
									}
								},
								root: {
									exit: (node: any) => {
										if (colors.size > 1) return;

										const walk = (children: any[]) => {
											children.forEach((child: any) => {
												if (child.type === 'element') {
													const attrs = child.attributes;

													if (attrs.style) {
														attrs.style = attrs.style
															.replace(/fill:[^;]+/g, 'fill:var(--icon-fill, currentColor)')
															.replace(/stroke:[^;]+/g, 'stroke:var(--icon-stroke, currentColor)');
													}
													// Обработка атрибутов
													if (attrs.fill && attrs.fill !== 'none') {
														attrs.fill = 'var(--icon-fill, currentColor)';
													}
													if (attrs.stroke && attrs.stroke !== 'none') {
														attrs.stroke = 'var(--icon-stroke, currentColor)';
													}

													if (child.children) walk(child.children);
												}
											});
										};

										if (node.children) walk(node.children);
									}
								}
							};
						}
					}
				]
			}
		}),
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
