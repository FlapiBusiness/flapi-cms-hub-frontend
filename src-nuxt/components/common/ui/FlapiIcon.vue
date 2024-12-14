<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    :width="width"
    :height="height"
    :viewBox="viewBox"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    :class="color"
    :aria-labelledby="name"
  >
    <g :fill="mode === 'fill' ? color : undefined" :stroke="mode === 'stroke' ? color : undefined">
      <AsyncComp />
    </g>
  </svg>
</template>

<script lang="ts" setup>
import { defineAsyncComponent } from 'vue'

const props: {
  name: string
  width: number | string
  height: number | string
  viewBox: string
  mode: string
  color: string
} = defineProps({
  name: {
    type: String,
    required: true,
  },
  width: {
    type: [Number, String],
    default: 24,
  },
  height: {
    type: [Number, String],
    default: 24,
  },
  viewBox: {
    type: String,
    default: '0 0 24 24',
  },
  mode: {
    type: String,
    default: 'fill',
  },
  color: {
    type: String,
    default: 'currentColor',
  },
})

// TODO: Add types for the component
const AsyncComp: any = defineAsyncComponent(() => import(`@/components/common/icons/${props.name}.vue`))
</script>
<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
}
</style>
