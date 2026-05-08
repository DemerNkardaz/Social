<script setup lang="ts">
import { fluidRem } from '@/scripts/utils'
import { computed } from 'vue'

type RowSpec = number | number[]
type ColSpec = number | number[]

interface Props {
	sizePx?: number
	gapPx?: number
	color?: string
	opacity?: number
	bgColor?: string
	bgOpacity?: number
	borderRadius?: number | string
	// row-mode: row=[5,0,2] col=5
	row?: RowSpec[]
	// col-mode: col=[5,0,2] row=5
	col?: ColSpec[]
	// total columns (row-mode) or total rows (col-mode)
	count?: number
}

const props = withDefaults(defineProps<Props>(), {
	sizePx: 10,
	gapPx: 2,
	color: '#fff',
	opacity: 1,
	bgColor: undefined,
	bgOpacity: 1,
	borderRadius: 0,
	row: undefined,
	col: undefined,
	count: 1,
})

const params = computed(() => {
	const cell = fluidRem(props.sizePx)
	const gap  = fluidRem(props.gapPx)
	const step = cell + gap

	const rx = typeof props.borderRadius === 'number'
		? fluidRem(props.borderRadius)
		: (parseFloat(props.borderRadius as string) / 100) * (cell / 2)

	return { cell, gap, step, rx }
})

const filledCells = computed<Set<string>>(() => {
	const set = new Set<string>()
	const { row, col } = props

	if (row) {
		row.forEach((spec, rowIdx) => {
			if (spec === 0) return
			if (Array.isArray(spec)) {
				spec.forEach(c => set.add(`${c - 1},${rowIdx}`))
			} else {
				for (let c = 0; c < spec; c++) set.add(`${c},${rowIdx}`)
			}
		})
	} else if (col) {
		col.forEach((spec, colIdx) => {
			if (spec === 0) return
			if (Array.isArray(spec)) {
				spec.forEach(r => set.add(`${colIdx},${r - 1}`))
			} else {
				for (let r = 0; r < spec; r++) set.add(`${colIdx},${r}`)
			}
		})
	}

	return set
})

const gridSize = computed(() => {
	const { row, col, count } = props
	if (row) return { cols: count, rows: row.length }
	if (col) return { cols: col.length, rows: count }
	return { cols: 0, rows: 0 }
})

const svgSize = computed(() => {
	const { step } = params.value
	const { cols, rows } = gridSize.value
	const w = cols > 0 ? cols * step - params.value.gap : 0
	const h = rows > 0 ? rows * step - params.value.gap : 0
	return { w, h }
})

function hexToRgba(hex: string, opacity: number): string {
	const clean = hex.replace('#', '')
	const r = parseInt(clean.length === 3 ? clean.charAt(0).repeat(2) : clean.slice(0, 2), 16)
	const g = parseInt(clean.length === 3 ? clean.charAt(1).repeat(2) : clean.slice(2, 4), 16)
	const b = parseInt(clean.length === 3 ? clean.charAt(2).repeat(2) : clean.slice(4, 6), 16)
	return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const fillColor  = computed(() => hexToRgba(props.color ?? '#fff', props.opacity))
const bgFill     = computed(() => props.bgColor ? hexToRgba(props.bgColor, props.bgOpacity) : null)
</script>

<template>
	<svg :width="svgSize.w" :height="svgSize.h" xmlns="http://www.w3.org/2000/svg"
		:style="{ display: 'block', flexShrink: 0, width: `${svgSize.w}px`, height: `${svgSize.h}px` }">

		<rect v-if="bgFill" width="100%" height="100%" :fill="bgFill" />
		<template v-for="rowIdx in gridSize.rows" :key="rowIdx">
			<template v-for="colIdx in gridSize.cols" :key="colIdx">
				<rect
					v-if="filledCells.has(`${colIdx - 1},${rowIdx - 1}`)"
					:x="(colIdx - 1) * params.step"
					:y="(rowIdx - 1) * params.step"
					:width="params.cell"
					:height="params.cell"
					:fill="fillColor"
					:rx="params.rx"
					:ry="params.rx"
				/>
			</template>
		</template>
	</svg>
</template>
