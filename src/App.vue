<script setup lang="ts">
</script>

<template>
	<!-- <IconProfile :width="25" color="cyan"/>
	<LogoGithub :width="25" color="cyan"/> -->

	<LayerBackdrop>
		<TabProfileBackdrop />
	</LayerBackdrop>

	<LayerContent>
		<template #layer-content>
			<TabProfile />
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
