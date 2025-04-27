<template>
  <div class="rounded-lg border border-gray-300 bg-gray-500">
    <div class="mb-4 flex flex-col gap-3 p-4">
      <h2 class="text-sm font-semibold uppercase text-light-700">Déploiement en ligne</h2>
      <a
        :href="props.applicationUrl"
        class="flex items-center gap-2 text-2xl font-semibold text-primary-300 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ props.applicationUrl }}
        <FlapiIcon name="ArrowUpRight" mode="stroke" />
      </a>
    </div>

    <hr />

    <div class="flex items-center gap-2 p-4">
      <FlapiPulsatingCircle :color="props.isOnline ? '#00F593' : '#EC364B'" :size="12" />
      <span class="text-sm font-semibold text-light-400">
        {{ props.isOnline ? 'En ligne' : 'Hors ligne' }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import FlapiPulsatingCircle from '#/components/ui/FlapiPulsatingCircle.vue'

/**
 * Type definitions for the FlapiProjectLiveDeploymentCard component props
 * @type {FlapiProjectLiveDeploymentCardProps}
 * @property {string} applicationUrl - The URL of the deployed application
 * @property {boolean} isOnline - Whether the application is online or not
 */
export type FlapiProjectLiveDeploymentCardProps = {
  applicationUrl: string
  isOnline: boolean
}

/**
 * Props
 * @param {string} applicationUrl - The URL of the deployed application
 * @param {boolean} isOnline - Whether the application is online or not
 */
const props: FlapiProjectLiveDeploymentCardProps = defineProps({
  applicationUrl: {
    type: String,
    required: true,
  },
  isOnline: {
    type: Boolean,
    required: true,
  },
})
</script>
