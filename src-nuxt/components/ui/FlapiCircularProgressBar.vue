<template>
  <div class="relative inline-block h-40 w-40">
    <svg class="h-full w-full" width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="18"
        cy="18"
        r="16"
        fill="none"
        class="stroke-current text-gray-200 dark:text-gray-700"
        stroke-width="2"
      ></circle>
      <g class="origin-center -rotate-90 transform">
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          class="stroke-current text-indigo-600 dark:text-blue-500"
          stroke-width="2"
          stroke-dasharray="100"
          :stroke-dashoffset="loading"
        ></circle>
      </g>
    </svg>

    <div class="absolute start-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
      <span class="text-center text-2xl font-bold text-gray-800 dark:text-white"> {{ props.loading }} %</span>
    </div>
  </div>
</template>
<script lang="ts">
/**
 * @name FlapiCircularProgressBar
 * @description A circular progress bar component.
 */
export type FlapiCircularProgressBarProps = {
  loading: number
}
</script>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { computed } from 'vue'

const props: FlapiCircularProgressBarProps = defineProps({
  loading: {
    type: Number,
    required: true,
  },
})

/**
 * @name loading
 * @description The loading percentage.
 * @returns {ComputedRef<number>}
 */
const loading: ComputedRef<number> = computed(() => {
  return 100 - props.loading
})
</script>
