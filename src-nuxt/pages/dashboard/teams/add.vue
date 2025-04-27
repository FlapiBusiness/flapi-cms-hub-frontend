<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-6xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Création d'une équipe</p>
      <!--      @confirm="createApp"-->
      <FlapiFormCard @confirm="createTeam">
        <NewTeamForm :team="team" @update:team="team = $event" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import NewTeamForm from '~/components/forms/NewTeamForm.vue'
import { TeamsApi } from '~~/src-core/api'
import type { Team } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { DateTime } from 'luxon'

// REFS
const team: Ref<Team> = ref({
  id: -1,
  name: '',
  description: '',
  owner_id: -1,
  created_at: DateTime.now().toISO(),
  updated_at: DateTime.now().toISO(),
})

//  METHODS
/**
 * Create a team
 * @returns {Promise<void>}
 */
const createTeam: () => Promise<void> = async (): Promise<void> => {
  await TeamsApi.create({
    name: team.value.name,
    description: team.value.description,
  })
}
</script>
