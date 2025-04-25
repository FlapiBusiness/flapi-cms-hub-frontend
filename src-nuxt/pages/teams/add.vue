<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-6xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Création d'une équipe</p>
      <!--      @confirm="createApp"-->
      <FlapiFormCard @confirm="createTeam">
        <NewTeamForm :team="payloadTeam" @update:team="payloadTeam = $event" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import NewTeamForm from '~/components/forms/NewTeamForm.vue'
import { type Project, type Team, TeamsApi, type User } from '~~/src-core/api'

// import { ClientApi } from '~~/src-core/api'
// import { ProjectsApi } from '~~/src-core/api'
// import type { CreateProjectPayload } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'

// STORE

// REFS
// const buttonLoading: Ref<boolean> = ref(false)
const payloadTeam: Ref<Team> = ref({
  name: '',
  description: '',
  owner_id: '',
  users: [] as User[],
  projects: [] as Project[],
})

// // METHODS
/**
 * Create a team
 * @returns {Promise<void>}
 */
const createTeam: () => Promise<void> = async (): Promise<void> => {
  await TeamsApi.create(payloadTeam.value)
}
</script>
