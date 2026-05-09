<script setup lang="ts">
import Stripes from '@/components/patterns/Stripes.vue';

const headerHeight = 82;
</script>

<style lang="scss" src="./BackdropLayer.scss"></style>

<template>
	<div class="backdrop-layer">
		<div class="backdrop__header">
			<div class="backdrop__header__stripes-wrapper h-[calc(100%-3px)]">
				<Stripes class="backdrop__header__stripes"
					:angle="45" :gap-px="1.522" :stripes-px="3" :w="1920" :h="headerHeight - 3"
					color="#000" :opacity="0.425"/>
			</div>
			<!-- <div class="backdrop__header__stripes__overlay" /> -->
		</div>
		<slot />
	</div>
</template>
