<script setup lang="ts">
import Stripes from '@/components/patterns/Stripes.vue';
import { useWindowSize } from '@/scripts/composables/useWindowSize';
import { baseUrl } from '@/scripts/constants';
import { computed } from 'vue';
import QuadsGrid from '../patterns/QuadsGrid.vue';
import Quads from '../patterns/Quads.vue';
import FrameOutline, { type Direction as FrameOutlineDirection } from '../patterns/primitives/FrameOutline.vue';
import Strip from '../patterns/primitives/Strip.vue';

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
				<Stripes class="backdrop-profile__stripes of-header" :angle="45" :gap-px="1.522" :stripes-px="3" w="100%" color="#000" :opacity="0.425" bg-color="#fff" />
			</div>
			<div class="backdrop-profile__stripes__overlay of-header" />
		</div>
		<div class="backdrop-profile__main-top">
			<div class="backdrop-profile__stripes-wrapper of-main-top">
				<Stripes class="backdrop-profile__stripes of-main-top" :angle="-45" :gap-px="3.522" w="50%" color="#fff" :opacity="0.65" />
				<Stripes class="backdrop-profile__stripes of-main-top" :angle="45" :gap-px="3.522" w="50%" color="#fff" :opacity="0.65" />
			</div>
			<div class="backdrop-profile__stripes__overlay of-main-top" />
			<div class="backdrop-profile__image" :style="{ '--backdrop': `url(${actualBackdropImage})` }"/>
			<div class="backdrop-profile__image__overlay"/>
			<div class="backdrop-profile__quads-wrapper">
				<QuadsGrid
					v-for="(style, index) in [
						{},
						{ '--mask-x': '60%', '--mask-y': '0%' },
						{ '--mask-x': '20%', '--mask-y': '0%' },
						{ '--mask-x': '28%', '--mask-y': '40%' },
					]"
					:key="index"
					class="backdrop-profile__quads of-backdrop-image"
					color="#444444"
					:opacity="index === 3 ? 0.35 : 1"
					:style="style"
				/>
			</div>
		</div>
		<div class="backdrop-profile__main-bottom">
		</div>
		<div class="backdrop-profile__footer">
			<div class="middle-block absolute">
				<!-- Left Under Top -->
				<div class="backdrop-profile__quads-wrapper">
					<QuadsGrid class="backdrop-profile__quads absolute left-5px top-25px" color="#CCC" :size-px="4" :gap-px="5" :opacity="0.25" :w="128 - 32"/>
					<Quads class="backdrop-profile__quads absolute left-0px top-25px"
						color="CECECE" :opacity="1"
						:size-px="5" :gap-px="2"
						:row="[6, 5, [1,3,4]]" :count="6"
					/>
				</div>
				<!-- Left Over Top -->
				<FrameOutline
					v-for="({ directions, pos, lengthRight, lengthLeft }, index) in [
						{ directions: ['bottom', 'right'] as FrameOutlineDirection[], pos: [-25, -45.5], lengthRight: 15, lengthLeft: undefined },
						{ directions: ['top', 'right']    as FrameOutlineDirection[], pos: [-25, -10.5], lengthRight: 15, lengthLeft: undefined },
						{ directions: ['bottom', 'left']  as FrameOutlineDirection[], pos: [577, -45.5], lengthRight: undefined, lengthLeft: 15 }
					]"
					:key="index"
					class="backdrop-profile__frame absolute"
					:style="{ left: `${pos[0]}px`, top: `${pos[1]}px` }"
					:directions="directions"
					:length="10"
					:length-right="lengthRight"
					:length-left="lengthLeft"
					:thickness-px="3"
					color="#DEDEDE"
				/>
				<Stripes class="backdrop-profile__stripes absolute left--15px top--35px" :angle="45" :gap-px="3.522" :w="600" :h="28" color="#ccc" />
				<Strip class="absolute left--15px top--35px" :w="600" :h="28" :strip-w="200" :strip-h="28" color="#E8E8E8" />

				<!-- Right Under Top -->
				<div class="backdrop-profile__stripes-wrapper">
					<Stripes class="backdrop-profile__stripes absolute right-50px top-5px" :angle="45" :gap-px="2.5" :w="128" :h="42" color="#ccc" />
				</div>
				<div class="backdrop-profile__frames-wrapper">
					<FrameOutline class="backdrop-profile__frame absolute right-169px top-25px" :directions="['top', 'right']" :length="12" :thickness-px="4" color="#CCC" />
				</div>

				<!-- Center Under Top -->
				<div class="flex flex-col gap-2px absolute w-200px h-10px shift-x-center--175px top-10px">
					<div class="flex flex-row gap-2px" v-for="i in [ [30, 15, 25, 25, 5, 12, 6, 4], [12, 8, 35, 5, 20, 8, 15] ]">
						<Strip v-for="w in i" :strip-w="w" :strip-h="5" color="#DBDBDB" />
					</div>
				</div>
				<div class="flex flex-col gap-2px absolute w-200px h-10px shift-x-center-175px top-10px">
					<div class="flex flex-row gap-2px" v-for="i in [ [40, 20, 60, 30, 10], [12, 8, 35, 5, 20] ]">
						<Strip v-for="w in i" :strip-w="w" :strip-h="5" color="#DBDBDB" />
					</div>
				</div>
			</div>

			<!-- Texts -->
			<div class="backdrop-profile__footer__top-decorator"/>
			<div class="backdrop-profile__footer__content-container">
				<div class="backdrop-profile__footer__quote">Integrity. Innovate.</div>
				<div class="backdrop-profile__footer__oseer-plate ">O.S.E.E.R. DataBank</div>
			</div>
		</div>
		<div class="backdrop-free-space w-1920px h-1080px">
				<FrameOutline class="absolute right-200px bottom-15px" :directions="['top', 'right', 'bottom', 'left']" :length="12" :thickness-px="2" color="#CCC" />
				<FrameOutline class="absolute right-200px bottom-59px" :directions="['top', 'right', 'bottom', 'left']" :length="12" :thickness-px="2" color="#CCC" />
		</div>
	</div>
</template>
