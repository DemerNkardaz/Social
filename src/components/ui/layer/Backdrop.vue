<script setup lang="ts">
import { useTabs } from '@/composables/useTabs';

const { currentTab } = useTabs();
const headerHeight = 82;
</script>

<style lang="scss" src="./Backdrop.scss"/>

<template>
	<div class="backdrop-layer">
		<div class="backdrop__header">
			<div class="backdrop__header__stripes-wrapper h-[calc(100%-3px)]">
				<Stripes class="backdrop__header__stripes"
					:angle="45" :gap-px="0.522 - 0.25" :stripes-px="4.25" :w="1920" :h="headerHeight - 3"
					color="#000" :opacity="0.4"
					bg-color="#fff" :bg-opacity="0.125" />
			</div>
		</div>
		<KeepAlive>
			<component :is="currentTab.backdrop" />
		</KeepAlive>
	</div>
</template>
