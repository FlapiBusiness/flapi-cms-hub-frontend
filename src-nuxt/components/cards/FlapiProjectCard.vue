<template>
  <div
    class="flex w-full cursor-pointer flex-col items-start justify-center rounded-lg border-[3px] border-transparent bg-gray-300 p-4 hover:border-primary-300"
  >
    <div class="flex flex-col">
      <FlapiAvatar :name="props.title" :photo="props.picture" :size="120" />

      <p class="mt-6 text-base font-semibold text-light-400">{{ props.title }}</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'
import FlapiAvatar from '~/components/ui/FlapiAvatar.vue'

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
    default: null,
  },
})
</script>
