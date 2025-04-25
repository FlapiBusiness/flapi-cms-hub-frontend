<template>
  <div class="h-full w-full pt-6">
    <div v-if="teamIsLoaded" class="flex w-full flex-col items-center">
      <p class="mb-8 text-center text-4xl text-light-400">{{ team.name }}</p>
      <div class="mt-8 flex w-full max-w-6xl flex-col gap-4">
        <TeamForm :team="team" @update:team="team = $event" :fields-is-required="false" />
      </div>
      <div>
        <FlapiButton class="my-6" @click="updateTeam">
          <p>Sauvegarder</p>
        </FlapiButton>
      </div>
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <FlapiSpinner />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { TeamsApi } from '~~/src-core/api'
import type { Team } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import { useRoute } from 'vue-router'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import type { Ref } from 'vue'
import TeamForm from '~/components/forms/TeamForm.vue'

const route: RouteLocationNormalizedGeneric = useRoute()
const id: number = route.params.id

const team: Ref<Team | null> = ref(null)
const teamIsLoaded: Ref<boolean> = ref(false)

onMounted(async () => {
  teamIsLoaded.value = false
  const teamResponse: AxiosResponse<Team> = await TeamsApi.getTeamById(id)
  team.value = teamResponse.data
  teamIsLoaded.value = true
})

/**
 * Update Team
 */
const updateTeam: () => Promise<void> = async (): Promise<void> => {
  await TeamsApi.update(team.value?.id, team.value)
}
</script>
