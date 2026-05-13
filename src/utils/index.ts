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

export function debounce<T extends (...args: unknown[]) => unknown>(
	fn: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timer: ReturnType<typeof setTimeout> | null = null;

	return (...args: Parameters<T>) => {
		if (timer) clearTimeout(timer);
		timer = setTimeout(() => {
			fn(...args);
			timer = null;
		}, delay);
	};
}

export function throttle<T extends (...args: any[]) => any>(
	fn: T,
	interval: number
): (...args: Parameters<T>) => void {
	let lastCall = 0;

	return (...args: Parameters<T>) => {
		const now = Date.now();
		if (now - lastCall >= interval) {
			lastCall = now;
			fn(...args);
		}
	};
}
