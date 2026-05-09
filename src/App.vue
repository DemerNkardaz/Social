<script setup lang="ts">
import BackdropLayer from '@/components/layers/BackdropLayer.vue';
import ContentLayer from '@/components/layers/ContentLayer.vue';
import ProfileBackdrop from '@/components/sections/Profile.Backdrop.vue';
</script>

<template>
	<BackdropLayer>
		<ProfileBackdrop />
	</BackdropLayer>
	<ContentLayer />
</template>

<style lang="scss">
#app {
	background: $surface-gradient-a-0;
}
.content-container {
	width: 100%;
	height: 100%;

	z-index: 1;
}
</style>
