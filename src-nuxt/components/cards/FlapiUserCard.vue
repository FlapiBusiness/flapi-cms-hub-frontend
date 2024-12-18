<template>
  <div class="flex max-w-32 flex-col items-center justify-center">
    <img :src="props.picture" alt="Card picture" class="h-30 w-30 max-w-30 max-h-30 rounded-lg" />
    <p class="mt-2 text-base font-semibold text-light-400">{{ props.lastNames }} {{ props.firstName }}</p>
    <p class="mt-2 text-sm font-semibold text-light-700">{{ props.email }}</p>
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
  id: number
  picture: string
  lastNames: string
  firstName: string
  email: string
}
</script>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

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
    required: true,
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
