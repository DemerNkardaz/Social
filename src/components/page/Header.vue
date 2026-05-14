<script setup lang="ts">
import { useTabs } from '@/composables/useTabs';

const { switchTab } = useTabs();
</script>

<template>
	<header class="content-header">
		<button @click="switchTab('profile')">Profile</button>
		<button @click="switchTab('inventory')">Inventory</button>
	</header>
</template>
