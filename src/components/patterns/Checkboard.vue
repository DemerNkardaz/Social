<script setup lang="ts">
import { computed } from 'vue'
import { useRootFontSize } from '@/scripts/composables/useRootFontSize'

interface Props {
  colors?: [string, string]
  opacity?: [number, number]
  sizePx?: number
  gapPx?: number
  borderRadius?: number | string
  angle?: number
}

const props = withDefaults(defineProps<Props>(), {
  colors: () => ['#fff', '#000'],
  opacity: () => [1, 1],
  sizePx: 32,
  gapPx: 0,
  borderRadius: 0,
  angle: 0,
})

const { rootFontSize } = useRootFontSize()

const patternId = `checkerboard-${Math.random().toString(36).slice(2, 7)}`

const params = computed(() => {
  const fs = rootFontSize.value
  const fluidRemLocal = (px: number) => (px / 16) * fs

  const cell = fluidRemLocal(props.sizePx)
  const gap = fluidRemLocal(props.gapPx)
  const total = (cell + gap) * 2

  const rx = typeof props.borderRadius === 'number'
    ? fluidRemLocal(props.borderRadius)
    : (parseFloat(props.borderRadius) / 100) * (cell / 2)

  return { cell, gap, total, rx }
})

function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.length === 3 ? clean.charAt(0).repeat(2) : clean.slice(0, 2), 16)
  const g = parseInt(clean.length === 3 ? clean.charAt(1).repeat(2) : clean.slice(2, 4), 16)
  const b = parseInt(clean.length === 3 ? clean.charAt(2).repeat(2) : clean.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

const color1 = computed(() => hexToRgba(props.colors[0] ?? '#fff', props.opacity[0] ?? 1))
const color2 = computed(() => hexToRgba(props.colors[1] ?? '#000', props.opacity[1] ?? 1))
</script>

<template>
  <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        :id="patternId"
        patternUnits="userSpaceOnUse"
        :width="params.total"
        :height="params.total"
        :patternTransform="`rotate(${angle})`"
      >
        <rect
          :x="params.gap / 2"
          :y="params.gap / 2"
          :width="params.cell"
          :height="params.cell"
          :fill="color1"
          :rx="params.rx"
          :ry="params.rx"
        />
        <rect
          :x="params.cell + params.gap + params.gap / 2"
          :y="params.gap / 2"
          :width="params.cell"
          :height="params.cell"
          :fill="color2"
          :rx="params.rx"
          :ry="params.rx"
        />
        <rect
          :x="params.gap / 2"
          :y="params.cell + params.gap + params.gap / 2"
          :width="params.cell"
          :height="params.cell"
          :fill="color2"
          :rx="params.rx"
          :ry="params.rx"
        />
        <rect
          :x="params.cell + params.gap + params.gap / 2"
          :y="params.cell + params.gap + params.gap / 2"
          :width="params.cell"
          :height="params.cell"
          :fill="color1"
          :rx="params.rx"
          :ry="params.rx"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
