/// <reference types="vite/client" />

declare module '*.mdx' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent
	export default component
	export const frontmatter: Record<string, unknown>
	export const toc: Record<string, unknown>
	export const readingTime: number
}

declare module '*.svg' {
	import { DefineComponent } from 'vue'
	const component: DefineComponent
	export default component
}

declare module '*.svg?component' {
  import { Component } from 'vue'
  const component: Component
  export default component
}
