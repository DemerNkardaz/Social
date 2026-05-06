<script setup lang="ts">
import { computed } from 'vue'
import { useRootFontSize } from '@/scripts/composables/useRootFontSize'

interface Props {
  stripesPx?: number
  gapPx?: number
  angle?: number
  width?: string
  height?: string
  color?: string
  opacity?: number
}

const props = withDefaults(defineProps<Props>(), {
  stripesPx: 1,
  gapPx: 4,
  angle: 45,
  width: '100%',
  height: '100%',
  color: '#eeeeee',
  opacity: 1,
})

const { rootFontSize } = useRootFontSize()

const patternId = `stripes-${Math.random().toString(36).slice(2, 7)}`

const stripeParams = computed(() => {
  const fs = rootFontSize.value
  const fluidRemLocal = (px: number) => (px / 16) * fs

  const stripeW = fluidRemLocal(props.stripesPx)
  const gap = fluidRemLocal(props.gapPx)
  const total = stripeW + gap
  return { stripeW, total }
})

const strokeColor = computed(() => {
  const hex = (props.color ?? '#eeeeee').replace('#', '')
  const r = parseInt(hex.length === 3 ? hex.charAt(0).repeat(2) : hex.slice(0, 2), 16)
  const g = parseInt(hex.length === 3 ? hex.charAt(1).repeat(2) : hex.slice(2, 4), 16)
  const b = parseInt(hex.length === 3 ? hex.charAt(2).repeat(2) : hex.slice(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${props.opacity})`
})
</script>

<template>
  <svg :width="props.width" :height="props.height" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern
        :id="patternId"
        patternUnits="userSpaceOnUse"
        :width="stripeParams.total"
        :height="stripeParams.total"
        :patternTransform="`rotate(${angle})`"
      >
        <line
          x1="0"
          y1="0"
          x2="0"
          :y2="stripeParams.total"
          :stroke="strokeColor"
          :stroke-width="stripeParams.stripeW"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
