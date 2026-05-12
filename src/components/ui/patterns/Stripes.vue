<script setup lang="ts">
import { fluidPx } from '@/utils'

interface Props {
	stripesPx?: number
	gapPx?: number
	angle?: number
	w?: number | string
	h?: number | string
	color?: string
	opacity?: number
	bgColor?: string
	bgOpacity?: number
}

const props = withDefaults(defineProps<Props>(), {
	stripesPx: 1,
	gapPx: 4,
	angle: 45,
	w: '100%',
	h: '100%',
	color: '#eeeeee',
	opacity: 1,
	bgColor: undefined,
	bgOpacity: 1,
})

const patternId = `stripes-${Math.random().toString(36).slice(2, 7)}`

const stripeParams = computed(() => {
	const stripeW = fluidPx(props.stripesPx)
	const gap = fluidPx(props.gapPx)
	const total = stripeW + gap

	const resolveSize = (val: number | string): string => {
		if (typeof val === 'number') {
			const fluidVal = fluidPx(val)
			return `${fluidVal}px`
		}
		return val
	}

	return {
		stripeW,
		gap,
		total,
		w: resolveSize(props.w),
		h: resolveSize(props.h),
	}
})

function hexToRgba(hex: string, opacity: number): string {
	const clean = hex.replace('#', '')
	const r = parseInt(clean.length === 3 ? clean.charAt(0).repeat(2) : clean.slice(0, 2), 16)
	const g = parseInt(clean.length === 3 ? clean.charAt(1).repeat(2) : clean.slice(2, 4), 16)
	const b = parseInt(clean.length === 3 ? clean.charAt(2).repeat(2) : clean.slice(4, 6), 16)
	return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const strokeColor = computed(() => hexToRgba(props.color ?? '#eeeeee', props.opacity))

const bgFill = computed(() => {
	if (!props.bgColor) return null
	return hexToRgba(props.bgColor, props.bgOpacity)
})
</script>

<template>
	<svg
		:width="stripeParams.w"
		:height="stripeParams.h"
		xmlns="http://www.w3.org/2000/svg"
		:style="typeof w === 'number' || typeof h === 'number'
			? { display: 'block', flexShrink: 0, width: stripeParams.w, height: stripeParams.h }
			: undefined"
	>
		<defs>
			<pattern
				:id="patternId"
				patternUnits="userSpaceOnUse"
				:width="stripeParams.total"
				:height="stripeParams.total"
				:patternTransform="`rotate(${angle})`"
			>
				<line
					x1="0" y1="0" x2="0"
					:y2="stripeParams.total"
					:stroke="strokeColor"
					:stroke-width="stripeParams.stripeW"
				/>
			</pattern>
		</defs>
		<rect v-if="bgFill" width="100%" height="100%" :fill="bgFill" />
		<rect width="100%" height="100%" :fill="`url(#${patternId})`" />
	</svg>
</template>
