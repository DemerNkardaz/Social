import type { TabsContext } from '@/shared/tabs'

export const tabsKey = 'tabs' as const

export function useTabs() {
	const tabs = inject<TabsContext>(tabsKey)

	if (!tabs) {
		throw new Error('useTabs must be used within provider')
	}

	return tabs
}
