<template>
  <div class="mt-12 flex h-full min-h-screen flex-col gap-12 bg-gray-700 p-8">
    <FlapiCardWelcomeUser
      v-if="authenticatedUser && activeProject"
      :user="authenticatedUser"
      :project="activeProject"
    />

    <FlapiProjectSetupCard
      v-if="!isProjectSetupDone"
      :statusMessage="activeProjectSetup.statusMessage"
      :progress="activeProjectSetup.progress"
    />
    <FlapiProjectLiveDeploymentCard
      v-if="activeProject && isProjectSetupDone"
      :applicationUrl="activeProject.domain_name"
      :isOnline="true"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import type { ComputedRef, Ref } from 'vue'
import FlapiCardWelcomeUser from '@/components/cards/FlapiCardWelcomeUser.vue'
import type { User, Project } from '~~/src-core/api'
import { ProjectSetupStepEnum } from '~~/src-core/api'
import { useAuthStore } from '~/stores/authStore'
import { useProjectStore } from '~/stores/projectStore'
import FlapiProjectSetupCard from '~/components/cards/FlapiProjectSetupCard.vue'
import FlapiProjectLiveDeploymentCard from '~/components/cards/FlapiProjectLiveDeploymentCard.vue'

// STORES
const authenticatedUser: User | null = useAuthStore().authenticatedUser
const activeProject: Project | null = useProjectStore().activeProject

// COMPUTED
const isProjectSetupDone: ComputedRef<boolean> = computed(() => {
  return activeProject?.project_setup?.step === ProjectSetupStepEnum.SetupDone
})

// REFS
const activeProjectSetup: Ref<{
  statusMessage: string
  progress: number
}> = ref({
  statusMessage: activeProject?.project_setup?.message || 'Initial Deployment in progress',
  progress: 50,
})
</script>
