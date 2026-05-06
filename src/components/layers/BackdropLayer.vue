<script setup lang="ts">
import Stripes from '@/components/patterns/Stripes.vue';

</script>

<style lang="scss" src="./BackdropLayer.scss"></style>

<template>
	<div class="backdrop-layer">
		<div class="backdrop__header"/>
		<div class="backdrop__main-top">
			<div class="backdrop__stripes-wrapper">
				<Stripes class="backdrop__stripes" :angle="-45" :gap-px="5" width="50%" />
				<Stripes class="backdrop__stripes" :angle="45" :gap-px="5" width="50%" />
			</div>
			<div class="backdrop__stripes__overlay" />
			<div class="backdrop__image"/>
		</div>
		<div class="backdrop__main-bottom"/>
	</div>
</template>
