<template>
  <div class="rounded-lg border border-gray-300 bg-gray-500 p-4">
    <div class="mb-4 flex items-center gap-3">
      <FlapiSpinner :size="20" />
      <h2 class="text-base font-semibold text-white">Déploiement de votre application en cours...</h2>
    </div>

    <div class="max-h-1rem">
      <FlapiProgressBar :progress="props.progress" :height="6" class="mb-4" />
    </div>

    <div class="flex flex-row gap-4 text-sm text-light-700">
      <span class="font-semibold text-white">Statut :</span> <b class="ml-0.5">{{ props.statusMessage }}</b>
      <FlapiBadge v-if="props.statusType" backgroundColor="#D6D0FB" :close="false" size="md" textColor="#2711BB">
        {{ props.statusType }}
      </FlapiBadge>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { ProjectSetupStatusEnum } from '~~/src-core/api'
/**
 * Type definitions for the FlapiProjectSetupCard component props
 * @type {FlapiProjectSetupCardProps}
 * @property {number} progress - The progress of the setup
 * @property {string} statusMessage - The status message of the setup
 */
export type FlapiProjectSetupCardProps = {
  progress: number
  statusMessage: string
  statusType?: string
}

/**
 * Props
 * @param {number} progress - The progress of the setup
 * @param {string} statusMessage - The status message of the setup
 */
const props: FlapiProjectSetupCardProps = defineProps({
  progress: {
    type: Number,
    required: true,
  },
  statusMessage: {
    type: String,
    required: true,
  },
  statusType: {
    type: String as PropType<ProjectSetupStatusEnum>,
  },
})
</script>
