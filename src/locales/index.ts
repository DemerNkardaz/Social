const modules = import.meta.glob('./*.ts', { eager: true })

export const messages: Record<string, any> = {}

for (const path in modules) {
  const match = path.match(/\.\/(.*)\.ts$/)
  if (!match) continue

	const locale = match[1]
  if (locale) {
    messages[locale] = (modules[path] as any).default
  }
}

export function getBrowserLocale(supported: string[]) {
  const lang = navigator.language.toLowerCase().split('-')[0]
	return lang && supported.includes(lang) ? lang : 'en'
}
