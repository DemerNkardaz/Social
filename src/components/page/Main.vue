<script setup lang="ts">
import { useTabs } from '@/composables/useTabs';

const { currentTab } = useTabs();
</script>

<style lang="scss" src="@/styles/_helper_classes.scss"/>
<style lang="scss" src="./Main.scss"/>

<template>
	<main class="content-main">
			<KeepAlive>
				<component :is="currentTab.component" />
			</KeepAlive>
	</main>
</template>
