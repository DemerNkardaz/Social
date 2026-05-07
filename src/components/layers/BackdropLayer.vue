<script setup lang="ts">
import Stripes from '@/components/patterns/Stripes.vue';
import { useWindowSize } from '@/scripts/composables/useWindowSize';
import { baseUrl } from '@/scripts/constants';
import { computed } from 'vue';
import QuadsGrid from '../patterns/QuadsGrid.vue';
const { windowHeight } = useWindowSize()

const backdropImageVariants = [1080, 1440, 2160, 4320]
const actualBackdropImage = computed(() => {
	const height = windowHeight.value
	const match = backdropImageVariants.reduce((prev, curr) =>
		curr <= height ? curr : prev
	, backdropImageVariants[0]!)
	return `${baseUrl}images/backdrop-${match}.avif`
})
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
			<div class="backdrop__image" :style="{ '--backdrop': `url(${actualBackdropImage})` }"/>
			<div class="backdrop__image__overlay"/>
			<div class="backdrop__quads-wrapper">
				<QuadsGrid class="backdrop__quads of-backdrop-main-top" color="#444444" :opacity="1"/>
				<QuadsGrid class="backdrop__quads of-backdrop-main-top" color="#444444" :opacity="1" style="--mask-x: 60%; --mask-y: 0%"/>
				<QuadsGrid class="backdrop__quads of-backdrop-main-top" color="#444444" :opacity="1" style="--mask-x: 20%; --mask-y: 0%"/>
				<QuadsGrid class="backdrop__quads of-backdrop-main-top" color="#444444" :opacity="0.35" style="--mask-x: 28%; --mask-y: 40%"/>
			</div>
		</div>
		<div class="backdrop__main-bottom">
		</div>
	</div>
</template>
