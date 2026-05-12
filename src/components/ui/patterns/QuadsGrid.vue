<script setup lang="ts">
import { fluidPx } from '@/utils'

interface Props {
	sizePx?: number
	gapPx?: number
	color?: string
	opacity?: number
	bgColor?: string
	bgOpacity?: number
	borderRadius?: number | string
	w?: number | string
	h?: number | string
}

const props = withDefaults(defineProps<Props>(), {
	sizePx: 4,
	gapPx: 1,
	color: '#fff',
	opacity: 1,
	bgColor: undefined,
	bgOpacity: 1,
	borderRadius: 0,
	w: '100%',
	h: '100%',
})

const patternId = `squares-${Math.random().toString(36).slice(2, 7)}`

const params = computed(() => {
	const cell = fluidPx(props.sizePx)
	const gap = fluidPx(props.gapPx)
	const total = cell + gap

	const resolveSize = (val: number | string): string => {
		if (typeof val === 'number') {
			const fluidVal = fluidPx(val)
			const stretched = Math.ceil(fluidVal / total) * total
			return `${stretched}px`
		}
		return val
	}

	const rx = typeof props.borderRadius === 'number'
		? fluidPx(props.borderRadius)
		: (parseFloat(props.borderRadius) / 100) * (cell / 2)

	return {
		cell,
		gap,
		total,
		rx,
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

const fillColor = computed(() => hexToRgba(props.color ?? '#fff', props.opacity))

const bgFill = computed(() => {
	if (!props.bgColor) return null
	return hexToRgba(props.bgColor, props.bgOpacity)
})
</script>

<template>
		<svg :width="params.w" :height="params.h" xmlns="http://www.w3.org/2000/svg"
			:style="{ display: 'block', flexShrink: 0, width: params.w, height: params.h }">
		<defs>
			<pattern :id="patternId" patternUnits="userSpaceOnUse" :width="params.total" :height="params.total">
				<rect :x="params.gap / 2" :y="params.gap / 2":width="params.cell" :height="params.cell" :fill="fillColor" :rx="params.rx" :ry="params.rx"/>
			</pattern>
		</defs>
		<rect v-if="bgFill" width="100%" height="100%" :fill="bgFill" />
		<rect width="100%" height="100%" :fill="`url(#${patternId})`" />
	</svg>
</template>
