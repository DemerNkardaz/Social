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
}

const props = withDefaults(defineProps<Props>(), {
  stripesPx: 1,
  gapPx: 4,
  angle: 45,
  width: '100%',
  height: '100%',
  color: '#eeeeee',
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
          :stroke="color"
          :stroke-width="stripeParams.stripeW"
        />
      </pattern>
    </defs>
    <rect width="100%" height="100%" :fill="`url(#${patternId})`" />
  </svg>
</template>
