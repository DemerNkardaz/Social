<script setup lang="ts">
import Stripes from '@/components/patterns/Stripes.vue';

</script>

<style lang="scss" src="./BackdropLayer.scss"></style>

<template>
	<div class="backdrop-layer">
		<div class="backdrop__header">
			<div class="backdrop__stripes-wrapper of-backdrop-header">
				<Stripes class="backdrop__stripes of-backdrop-header" :angle="45" :gap-px="1.5" :stripes-px="3" width="100%" color="#000" :opacity="0.425" bg-color="#fff" />
			</div>
			<div class="backdrop__stripes__overlay of-backdrop-header" />
		</div>
		<div class="backdrop__main-top">
			<div class="backdrop__stripes-wrapper of-backdrop-main-top">
				<Stripes class="backdrop__stripes of-backdrop-main-top" :angle="-45" :gap-px="3.55" width="50%" color="#fff" :opacity="0.65" />
				<Stripes class="backdrop__stripes of-backdrop-main-top" :angle="45" :gap-px="3.55" width="50%" color="#fff" :opacity="0.65" />
			</div>
			<div class="backdrop__stripes__overlay of-backdrop-main-top" />
			<div class="backdrop__image"/>
		</div>
		<div class="backdrop__main-bottom"/>
	</div>
</template>
