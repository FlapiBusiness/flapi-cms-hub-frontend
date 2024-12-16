<template>
  <div class="flex w-full max-w-60 flex-col items-start justify-center rounded-lg bg-gray-300 p-4">
    <div class="flex flex-col">
      <img :src="props.picture" alt="Card picture" class="h-30 w-30 rounded-lg" />
      <p class="mt-4 text-base font-semibold text-light-400">{{ props.title }}</p>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Type definitions for the Card component props
 * @type {CardProps}
 * @property {string} title - The title of the card
 * @property {string} picture - The picture of the card
 */
export type CardProps = {
  title: string
  picture: string
}
</script>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

/**
 * Props
 * @param {string} title - The title of the card
 * @param {string} picture - The picture of the card
 */
const props: CardProps = defineProps({
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
})
</script>
