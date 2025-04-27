<template>
  <div class="h-full w-full pt-6">
    <div v-if="teamIsLoaded && team" class="flex w-full flex-col items-center">
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
import { onMounted, ref, computed } from 'vue'
import { TeamsApi } from '~~/src-core/api'
import { useRoute } from 'vue-router'
import TeamForm from '~/components/forms/TeamForm.vue'
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import type { Ref, ComputedRef } from 'vue'
import type { Team, UpdateTeamPayload } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'

/* HOOKS */
const route: RouteLocationNormalizedGeneric = useRoute()

/* DATAS */
const id: number = Number(route.params.id)

/* REFS */
const team: Ref<Team | null> = ref(null)
const teamIsLoaded: Ref<boolean> = ref(false)

/* LIFECYCLE HOOKS */
onMounted(async () => {
  teamIsLoaded.value = false
  const teamResponse: AxiosResponse<Team> = await TeamsApi.getTeamById(id)
  team.value = teamResponse.data
  teamIsLoaded.value = true
})

/* COMPUTED */
const updateTeamPayload: ComputedRef<UpdateTeamPayload> = computed(() => {
  return {
    name: team.value?.name || '',
    description: team.value?.description || '',
  }
})

/* METHODS */

/**
 * Update Team
 * @returns {Promise<void>}
 */
const updateTeam: () => Promise<void> = async (): Promise<void> => {
  if (team.value) {
    await TeamsApi.update(team.value.id, updateTeamPayload.value)
  } else {
    console.error('Team is null')
  }
}
</script>
