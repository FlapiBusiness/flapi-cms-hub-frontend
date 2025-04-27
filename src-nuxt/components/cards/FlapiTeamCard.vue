<template>
  <div
    class="flex w-full cursor-pointer flex-col items-start justify-center rounded-lg border-[3px] border-transparent bg-gray-300 p-4 hover:border-primary-300"
  >
    <div class="flex w-full flex-row items-center justify-between gap-8">
      <p class="text-base font-semibold text-light-400">{{ props.name }}</p>
      <p class="text-base text-light-400">{{ props.description }}</p>
      <FlapiButton
        backgroundColor="#f9566e"
        backgroundHoverColor="#e82020"
        :disabled="false"
        size="md"
        @click="deleteTeam(props.teamId)"
      >
        <FlapiIcon color="#fff" :height="24" mode="stroke" name="Trash" viewBox="0 0 24 24" :width="24" />
      </FlapiButton>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'
import { TeamsApi } from '~~/src-core/api'

/* TYPES */
/**
 * Type definitions for the FlapiTeamCard component props
 * @type {FlapiTeamCardProps}
 * @property {string} title - The title of the card
 * @property {string} picture - The picture of the card
 */
export type FlapiTeamCardProps = {
  name: string
  description: string
  teamId: number
}

/* PROPS */
/**
 * Props
 * @param {string} name - The name of the team
 * @param {string} description - The description of the team
 */
const props: FlapiTeamCardProps = defineProps({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: null,
  },
  teamId: {
    type: Number,
    required: true,
  },
})
/* METHODS */
/**
 * Delete a project
 * @param {number} teamId - The team id
 * @returns {Promise<void>}
 */
const deleteTeam: (teamId: number) => Promise<void> = async (teamId: number): Promise<void> => {
  await TeamsApi.delete(teamId)
}
</script>
