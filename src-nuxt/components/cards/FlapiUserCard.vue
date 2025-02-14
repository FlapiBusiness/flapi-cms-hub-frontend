<template>
  <div class="flex max-w-32 flex-col items-center justify-center gap-2">
    <img
      v-if="props.picture"
      :src="props.picture"
      alt="Card picture"
      class="h-[120px] w-[120px] rounded-lg bg-gray-400"
    />
    <div v-else class="flex h-[120px] w-[120px] items-center justify-center rounded-lg bg-gray-400">
      <FlapiIcon name="account" class="inline-block align-middle" :width="80" :height="80" />
    </div>
    <p class="text-base font-medium text-light-400">{{ props.lastNames }} {{ props.firstName }}</p>
    <p class="text-sm font-medium text-light-700">{{ props.email }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

/**
 * Type definitions for the Card component props
 * @type {CardProps}
 * @property {string} title - The title of the card
 * @property {string} picture - The picture of the card
 */
export type CardProps = {
  id: number
  picture?: string
  lastNames: string
  firstName: string
  email: string
}

/**
 * Props
 * @param {number} id - The id of the user
 * @param {string} picture - The picture of the card
 * @param {string} lastNames - The last names of the user
 * @param {string} firstName - The first name of the user
 * @param {string} email - The email of the user
 */
const props: CardProps = defineProps({
  id: {
    type: Number,
    required: true,
  },
  picture: {
    type: String,
    default: null,
  },
  lastNames: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
})
</script>
