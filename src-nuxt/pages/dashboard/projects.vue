<template>
  <div class="flex w-full flex-col items-center">
    <p class="mb-8 text-center text-4xl text-light-400">Choisir votre application</p>
    <div class="w-full max-w-xs">
      <FlapiButton class="w-full" type="submit" to="/dashboard/setup/project">
        <p class="font-medium text-light-400">Nouvelle application</p>
      </FlapiButton>
    </div>
    <div
      class="mt-8 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      <FlapiProjectCard
        v-for="project in projectStore.projects"
        :key="project.id"
        :title="project.application_name"
        @click="selectProject(project.id)"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiProjectCard from '~/components/cards/FlapiProjectCard.vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'

const router: Router = useRouter()
const projectStore: ReturnType<typeof useProjectStore> = useProjectStore()

definePageMeta({
  layout: 'blank',
})

// METHODS
/**
 * Select a project
 * @param {number} projectId - The project id
 * @returns {void}
 */
const selectProject: (projectId: number) => void = (projectId: number): void => {
  projectStore.setActiveProject(projectId)
  router.push('/dashboard')
}
</script>
