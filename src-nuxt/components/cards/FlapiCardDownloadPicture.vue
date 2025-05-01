<template>
  <div class="flex w-full flex-row flex-wrap gap-4 rounded-lg border border-gray-300 bg-gray-500 p-4 sm:gap-8">
    <img :src="props.picture" alt="Card picture" class="h-34 w-34 rounded-lg" />
    <div class="flex flex-col items-start justify-center">
      <FlapiButton size="md" backgroundColor="#35424D" @click="addPicture"> Ajouter une image </FlapiButton>
      <p class="mt-6 text-base font-semibold text-light-400">
        L’image doit être au format JPEG, PNG ou GIF et ne doit pas dépasser 10 Mo.
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
})

/**
 * Add picture
 */
const addPicture: () => void = () => {
  console.log('Add picture')
}
</script>
