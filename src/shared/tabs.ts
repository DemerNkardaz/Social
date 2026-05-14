import TabProfile from '@/components/tab/profile/Profile.vue'
import TabProfileBackdrop from '@/components/tab/profile/Backdrop.vue'
import TabInventory from '@/components/tab/inventory/Inventory.vue'
import TabInventoryBackdrop from '@/components/tab/inventory/Backdrop.vue'

export const tabsMap = {
	profile: {
		component: TabProfile,
		backdrop: TabProfileBackdrop
	},
	inventory: {
		component: TabInventory,
		backdrop: TabInventoryBackdrop
	}
} as const

export type TabName = keyof typeof tabsMap
export type TabConfig = (typeof tabsMap)[keyof typeof tabsMap]

export type TabsContext = {
	activeTabName: Ref<TabName>
	currentTab: ComputedRef<TabConfig>
	switchTab: (tab: TabName) => void
}
