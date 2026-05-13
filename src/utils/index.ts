export { fluidPx, fluidRem } from "@/composables/useRootFontSize"

export function pathWithBase(path: string): string {
	return `${baseUrl.replace(/\/+$/, '')}/${path.replace(/^\/+/, '')}`
}

export function randomObjectKey<T extends Record<string, unknown>>(obj: T): keyof T {
	const keys = Object.keys(obj) as (keyof T)[]
	if (keys.length === 0) {
		throw new Error("Object has no keys")
	}
	return keys[Math.floor(Math.random() * keys.length)]!
}
