<template>
  <div class="flex w-full flex-col items-center pt-6">
    <p class="mb-8 text-center text-4xl text-light-400">Choisissez votre équipe</p>
    <div class="w-full max-w-xs">
      <FlapiButton class="w-full" type="submit" to="/dashboard/teams/add">
        <p class="font-medium text-light-400">Nouvelle Equipe</p>
      </FlapiButton>
    </div>
    <div class="mt-8 flex w-full max-w-6xl flex-col gap-4">
      <FlapiTeamCard
        v-for="team in teams"
        :key="team.id"
        :name="team.name"
        :description="team.description"
        @click="selectTeam(team.id)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue'
import FlapiTeamCard from '~/components/cards/FlapiTeamCard.vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import { TeamsApi, type User } from '~~/src-core/api'
import type { Team } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '~/stores/authStore'

const router: Router = useRouter()
const authenticatedUser: User | null = useAuthStore().authenticatedUser
const teams: Team[] = ref<Team[]>([])

onMounted(async () => {
  const teamsResponse: AxiosResponse<Team[], any> = await TeamsApi.getTeamsByUserId(authenticatedUser?.id)
  teams.value = teamsResponse.data
})

// METHODS
/**
 * Select a project
 * @param {number} teamId - The team id
 * @returns {void}
 */
const selectTeam: (teamId: number) => void = (teamId: number): void => {
  router.push('/dashboard/teams/' + teamId)
}
</script>
