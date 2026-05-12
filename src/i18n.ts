import { createI18n } from 'vue-i18n'

const modules = import.meta.glob('./locales/*.ts', { eager: true })
const messages: Record<string, any> = {}

for (const path in modules) {
  const fileName = path.split('/').pop()?.replace('.ts', '')

  if (fileName) {
    messages[fileName] = (modules[path] as any).default
  }
}

export function getBrowserLocale(supported: string[]) {
  const lang = navigator.language.toLowerCase().split('-')[0]
  return lang && supported.includes(lang) ? lang : 'en'
}

const supportedLocales = Object.keys(messages)
const urlLocale = urlParams.get('t')

export const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: urlLocale || getBrowserLocale(supportedLocales),
  fallbackLocale: 'en',
  messages
})
