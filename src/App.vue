<script setup lang="ts">
import { tabsMap, type TabName, type TabsContext } from '@/shared/tabs';

const activeTabName = ref<TabName>('profile')
const currentTab = computed(() => tabsMap[activeTabName.value])
const switchTab = (tabName: TabName) => activeTabName.value = tabName

provide('tabs', {
	activeTabName,
	currentTab,
	switchTab
} satisfies TabsContext)
</script>

<template>
	<!-- <IconProfile :width="25" color="cyan"/>
	<LogoGithub :width="25" color="cyan"/> -->
	<LayerBackdrop />
	<LayerContent />
</template>
