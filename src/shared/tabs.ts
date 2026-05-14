import TabProfile from '@/components/tab/profile/Profile.vue'
import TabProfileBackdrop from '@/components/tab/profile/Backdrop.vue'
import TabInventory from '@/components/tab/inventory/Inventory.vue'
import TabInventoryBackdrop from '@/components/tab/inventory/Backdrop.vue'

import IconProfile from '@/assets/images/icons/profile.svg?component'

export interface Tab {
	component: Component
	backdrop: Component
	icon?: Component | undefined
}

export const tabsMap: Record<string, Tab> = {
	profile: {
		component: TabProfile,
		backdrop: TabProfileBackdrop,
		icon: IconProfile,
	},
	inventory: {
		component: TabInventory,
		backdrop: TabInventoryBackdrop,
		icon: IconProfile,
	},
	thirdTab: {
		component: TabInventory,
		backdrop: TabInventoryBackdrop,
		icon: IconProfile,
	},
}

export type TabName = keyof typeof tabsMap
export type TabConfig = (typeof tabsMap)[TabName]

export type TabsContext = {
	activeTabName: Ref<TabName>
	currentTab: ComputedRef<TabConfig>
	switchTab: (tab: TabName) => void
}
