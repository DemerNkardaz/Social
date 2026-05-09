<script setup lang="ts">
import { useWindowSize } from '@/scripts/composables/useWindowSize';
import { baseUrl } from '@/scripts/constants';
import { computed } from 'vue';
import { fluidPx } from '@/scripts/utils';

import Stripes from '@/components/patterns/Stripes.vue';
import QuadsGrid from '@/components/patterns/QuadsGrid.vue';
import Quads from '@/components/patterns/Quads.vue';
import FrameOutline, { type Direction as FrameOutlineDirection } from '@/components/patterns/primitives/FrameOutline.vue';
import Strip from '@/components/patterns/primitives/Strip.vue';

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
		<div class="backdrop-profile__background">
			<!-- Left And Right Stripes Pattern -->
			<Stripes class="absolute right-50%" :angle="-45" :gap-px="3.522" w="50%" color="#fff" :opacity="0.65" />
			<Stripes class="absolute left-50%":angle="45" :gap-px="3.522" w="50%" color="#fff" :opacity="0.65" />
			<div class="absolute w-1920px h-100% left-50% translate-x--50% bg-[var(--surface-b-0)] mask-[var(--overlay-bg-mask)]" />
			<!-- Image -->
			<div class="backdrop-profile__background__image" :style="{ '--backdrop': `url(${actualBackdropImage})` }"/>
			<div class="backdrop-profile__background__image__overlay"/>
			<!-- Quads Pattern -->
			<QuadsGrid
				v-for="(style, index) in [
					{ '--mask-x': `${fluidPx((2560 - 64) - (768 + 384))}px`, '--mask-y': '0%' },
					{ '--mask-x': `${fluidPx((2560 - 64) - (384))}px`, '--mask-y': '0%' },
					{ '--mask-x': `${fluidPx((2560 - 64))}px`, '--mask-y': '25%' },
					{ '--mask-x': `${fluidPx((2560 - 64) - (768 + 256))}px`, '--mask-y': '40%' },
				]"
				:key="index"
				class="background-image-quads-mask absolute"
				color="#444"
				:opacity="index === 3 ? 0.35 : 1"
				:w="3840" h="100%"
				:style="style"
			/>
		</div>
		<div class="backdrop-profile__body">
		</div>
		<div class="backdrop-profile__footer">
			<div class="absolute w-1405px h-100% shift-x-18px">
				<!-- Left Under Top -->
				<div class="absolute left-0px top-25px">
					<QuadsGrid class="absolute left-5px" color="#CCC" :size-px="4" :gap-px="5" :opacity="0.25" :w="128 - 32" :h="128"/>
					<Quads class="absolute left-0px"
						color="CECECE" :opacity="1"
						:size-px="5" :gap-px="2"
						:row="[6, 5, [1,3,4]]" :count="6"
					/>
				</div>
				<!-- Left Over Top -->
				<div class="absolute left--25px top--45px w-620px">
					<FrameOutline class="backdrop-profile__frame absolute left-0px top-0px"
					:directions="['bottom', 'right']" :length="10" :length-right="15" :thickness-px="2" color="#DEDEDE"/>
					<FrameOutline class="backdrop-profile__frame absolute left-0px top-35px"
					:directions="['top', 'right']" :length="10" :length-right="15" :thickness-px="2" color="#DEDEDE" />
					<FrameOutline class="backdrop-profile__frame absolute right-0px top-0px"
						:directions="['bottom', 'left']" :length="10" :length-left="15" :thickness-px="2" color="#DEDEDE" />
					<Stripes class="absolute left-10px top-10px" :angle="45" :gap-px="3.522" :w="600" :h="28" color="#ccc" />
					<Strip class="absolute left-10px top-10px" :w="600" :h="28" :strip-w="200" :strip-h="28" color="#E8E8E8" />
				</div>

				<!-- Right Under Top -->
				<div class="svg-stripes-wrapper">
					<Stripes class="absolute right-50px top-5px" :angle="45" :gap-px="2.5" :w="128" :h="42" color="#ccc" />
				</div>
				<div class="svg-frames-wrapper">
					<FrameOutline class="absolute right-169px top-25px" :directions="['top', 'right']" :length="12" :thickness-px="4" color="#CCC" />
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
