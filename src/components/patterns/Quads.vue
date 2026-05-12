<script setup lang="ts">
import { fluidPx } from '@/scripts/utils'

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
  row?: RowSpec[]
  col?: ColSpec[]
  count?: number
  w?: number | string
  h?: number | string
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
  w: undefined,
  h: undefined,
})

const params = computed(() => {
  const cell = fluidPx(props.sizePx)
  const gap  = fluidPx(props.gapPx)
  const step = cell + gap

  const rx = typeof props.borderRadius === 'number'
    ? fluidPx(props.borderRadius)
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
  const { step, gap } = params.value
  const { cols, rows } = gridSize.value
  const w = cols > 0 ? cols * step - gap : 0
  const h = rows > 0 ? rows * step - gap : 0
  return { w, h }
})

const domSize = computed(() => {
  const resolve = (val: number | string): string => {
    if (typeof val === 'number') return `${fluidPx(val)}px`
    return val
  }
  return {
    w: props.w !== undefined ? resolve(props.w) : `${svgSize.value.w}px`,
    h: props.h !== undefined ? resolve(props.h) : `${svgSize.value.h}px`,
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
const bgFill    = computed(() => props.bgColor ? hexToRgba(props.bgColor, props.bgOpacity) : null)
</script>

<template>
  <div :style="{ display: 'block', flexShrink: 0, width: domSize.w, height: domSize.h, overflow: 'hidden' }">
    <svg
      :width="svgSize.w"
      :height="svgSize.h"
      xmlns="http://www.w3.org/2000/svg"
      :style="{ display: 'block', width: `${svgSize.w}px`, height: `${svgSize.h}px` }"
    >
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
  </div>
</template>
