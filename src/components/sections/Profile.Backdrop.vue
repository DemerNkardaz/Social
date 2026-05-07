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

<style lang="scss" src="./Profile.Backdrop.scss"></style>

<template>
	<div class="backdrop-profile">
		<div class="backdrop-profile__header">
			<div class="backdrop-profile__stripes-wrapper of-header">
				<Stripes class="backdrop-profile__stripes of-header" :angle="45" :gap-px="1.522" :stripes-px="3" width="100%" color="#000" :opacity="0.425" bg-color="#fff" />
			</div>
			<div class="backdrop-profile__stripes__overlay of-header" />
		</div>
		<div class="backdrop-profile__main-top">
			<div class="backdrop-profile__stripes-wrapper of-main-top">
				<Stripes class="backdrop-profile__stripes of-main-top" :angle="-45" :gap-px="3.522" width="50%" color="#fff" :opacity="0.65" />
				<Stripes class="backdrop-profile__stripes of-main-top" :angle="45" :gap-px="3.522" width="50%" color="#fff" :opacity="0.65" />
			</div>
			<div class="backdrop-profile__stripes__overlay of-main-top" />
			<div class="backdrop-profile__image" :style="{ '--backdrop': `url(${actualBackdropImage})` }"/>
			<div class="backdrop-profile__image__overlay"/>
			<div class="backdrop-profile__quads-wrapper">
				<QuadsGrid class="backdrop-profile__quads of-main-top" color="#444444" :opacity="1"/>
				<QuadsGrid class="backdrop-profile__quads of-main-top" color="#444444" :opacity="1" style="--mask-x: 60%; --mask-y: 0%"/>
				<QuadsGrid class="backdrop-profile__quads of-main-top" color="#444444" :opacity="1" style="--mask-x: 20%; --mask-y: 0%"/>
				<QuadsGrid class="backdrop-profile__quads of-main-top" color="#444444" :opacity="0.35" style="--mask-x: 28%; --mask-y: 40%"/>
			</div>
		</div>
		<div class="backdrop-profile__main-bottom">
		</div>
		<div class="backdrop-profile__footer">
			<div class="backdrop-profile__footer__top-decorator"/>
		</div>
	</div>
</template>
