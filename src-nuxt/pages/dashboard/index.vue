<template>
  <div class="mt-12 flex h-full min-h-screen flex-col gap-12 bg-gray-700 p-8">
    <FlapiCardWelcomeUser
      v-if="authenticatedUser && activeProject"
      :user="authenticatedUser"
      :project="activeProject"
    />

    <FlapiProjectSetupCard
      v-if="!isProjectSetupDone"
      :statusMessage="activeSetup?.message || 'Déploiement de votre application en cours...'"
      :progress="progress"
      :statusType="activeSetup?.status || ProjectSetupStatusEnum.InProgress"
    />
    <FlapiProjectLiveDeploymentCard
      v-if="activeProject && isProjectSetupDone"
      :applicationUrl="activeProject.domain_name"
      :isOnline="true"
    />
  </div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'
import FlapiCardWelcomeUser from '@/components/cards/FlapiCardWelcomeUser.vue'
import type { User, Project } from '~~/src-core/api'
import { ProjectSetupStatusEnum, ProjectSetupStepEnum } from '~~/src-core/api'
import { useAuthStore } from '~/stores/authStore'
import { useProjectStore } from '~/stores/projectStore'
import { useProjectSetupStore } from '~/stores/projectSetupStore'
import FlapiProjectSetupCard from '~/components/cards/FlapiProjectSetupCard.vue'
import FlapiProjectLiveDeploymentCard from '~/components/cards/FlapiProjectLiveDeploymentCard.vue'
import type { ProjectSetup } from '~~/src-core/api'

// STORES
const authenticatedUser: User | null = useAuthStore().authenticatedUser
const activeProject: Project | null = useProjectStore().activeProject

/**
 * Get the initial progress based on the current step
 * @param {ProjectSetupStepEnum} step - The current step of the project setup
 * @returns {number} - The initial progress value
 */
const getProgressFromStep: (step: ProjectSetupStepEnum) => number = (step: ProjectSetupStepEnum): number => {
  switch (step) {
    case ProjectSetupStepEnum.SetupStarted:
      return 5
    case ProjectSetupStepEnum.VerifySubdomains:
      return 15
    case ProjectSetupStepEnum.CreateSubdomains:
      return 25
    case ProjectSetupStepEnum.CreateDatabase:
      return 35
    case ProjectSetupStepEnum.CreateRepositories:
      return 60
    case ProjectSetupStepEnum.Deployment:
      return 80
    case ProjectSetupStepEnum.SetupDone:
      return 100
    case ProjectSetupStepEnum.SetupFailed:
      return 0
    default:
      return 0
  }
}

const activeSetup: ComputedRef<ProjectSetup | null> = computed(() =>
  activeProject?.project_setup ? activeProject.project_setup : useProjectSetupStore().activeProjectSetup,
)

const progress: ComputedRef<number> = computed(() => {
  return activeSetup.value ? getProgressFromStep(activeSetup.value.step) : 0
})

const isProjectSetupDone: ComputedRef<boolean> = computed(() => {
  return activeSetup.value?.step === ProjectSetupStepEnum.SetupDone
})
</script>
