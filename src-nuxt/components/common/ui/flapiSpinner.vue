<template>
  <div
    class="inline-block animate-spin rounded-full border-[3px] border-current border-t-transparent"
    role="status"
    aria-label="loading"
    :style="style"
    :class="classes"
  >
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props: {
  variant: string
  size: number
} = defineProps({
  variant: { type: String, default: 'primary' },
  size: { type: Number, default: 56 },
})

const style: ComputedRef<{ width: string; height: string; stroke: string }> = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`,
  stroke: `#FDB44B`,
}))

const classes: ComputedRef<{ 'text-amber-400': boolean; 'text-slate-100': boolean; 'text-gray-900': boolean }> =
  computed(() => ({
    'text-amber-400': props.variant === 'primary',
    'text-slate-100': props.variant === 'light',
    'text-gray-900': props.variant === 'dark',
  }))
</script>
