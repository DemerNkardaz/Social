import { useRootFontSize } from "./composables/useRootFontSize"
import { baseUrl } from "./constants"

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

export function fluidPx(px: number): number {
	const { rootFontSize } = useRootFontSize()
	const fontSize = rootFontSize.value
	return (px / 16) * fontSize
}

export function fluidRem(px: number): string {
	const { rootFontSize } = useRootFontSize()
	const fontSize = rootFontSize.value
	return `${(px / fontSize) * 1}rem`
}
