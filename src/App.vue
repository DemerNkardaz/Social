<script setup lang="ts">
import TabProfile from '@/components/tab/profile/Profile.vue';
import TabProfileBackdrop from '@/components/tab/profile/Backdrop.vue';
import TabInventory from '@/components/tab/inventory/Inventory.vue';
import TabInventoryBackdrop from '@/components/tab/inventory/Backdrop.vue';

const tabs = [
  {
    name: 'profile',
    component: TabProfile,
    backdrop: TabProfileBackdrop
  },
  {
    name: 'inventory',
    component: TabInventory,
    backdrop: TabInventoryBackdrop
  }
]

const activeTabName = ref('profile')
const currentTab = computed(() => tabs.find(t => t.name === activeTabName.value) ?? tabs[0])
// const switchTab = (tabName: string) => activeTabName.value = tabName
</script>

<template>
	<!-- <IconProfile :width="25" color="cyan"/>
	<LogoGithub :width="25" color="cyan"/> -->
	<!-- <button @click="switchTab('profile')">Profile</button>
	<button @click="switchTab('inventory')">Inventory</button> -->
	<LayerBackdrop>
		<KeepAlive>
			<component :is="currentTab!.backdrop" />
		</KeepAlive>
	</LayerBackdrop>

	<LayerContent>
		<template #layer-content>
			<KeepAlive>
				<component :is="currentTab!.component" />
			</KeepAlive>
		</template>
	</LayerContent>

</template>

<style lang="scss">
.content-container {
	width: 100%;
	height: 100%;

	z-index: 1;
}
</style>
