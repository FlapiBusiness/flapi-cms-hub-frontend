<template>
  <div class="flex w-full flex-row rounded-lg border border-gray-300 bg-gray-500 p-4">
    <img :src="props.picture" alt="Card picture" class="h-24 w-24 rounded-lg" />
    <div class="ml-8 flex flex-col items-start justify-center">
      <h2 class="text-xl font-semibold text-light-400">Bienvenue, {{ props.firstName }} {{ props.lastName }}</h2>
      <p class="mt-6 text-base font-semibold text-light-400">
        {{ props.email }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

/**
 * Type definitions for the Card component props
 * @type {CardProps}
 * @property {string} picture - The picture of the card
 */
export type CardProps = {
  picture: string
  lastName: string
  firstName: string
  email: string
}

/**
 * Props
 * @param {string} picture - The picture of the card
 */
const props: CardProps = defineProps({
  picture: {
    type: String,
    required: true,
  },
  lastName: {
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
