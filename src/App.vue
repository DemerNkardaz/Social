<script setup lang="ts">
import BackdropLayer from '@/components/layers/BackdropLayer.vue';
import OverlayLayer from '@/components/layers/OverlayLayer.vue';
import ContentLayer from '@/components/layers/ContentLayer.vue';
</script>

<template>
	<BackdropLayer />
	<OverlayLayer />
	<ContentLayer />
</template>

<style lang="scss">
.content-container {
	background: $surface-a-1;

	width: 100%;
	height: 100%;

	z-index: 1;
}
</style>
