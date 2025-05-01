<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-6xl gap-4">
      <p class="text-xl font-semibold text-light-400">Photo de l'applications</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-xl font-semibold text-light-400">Personnalisation de l'application</p>
      <FlapiFormCard :buttonLoading="buttonLoading" @confirm="createProject">
        <ProjectForm
          :project="payload"
          :buttonLoading="buttonLoading"
          @update:project="updateProjectPayload($event)"
          :fields-is-required="true"
        />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiCardDownloadPicture from '@/components/cards/FlapiCardDownloadPicture.vue'
import ProjectForm from '~/components/forms/ProjectForm.vue'
import type { CreateProjectPayload, User, UpdateProjectPayload, CreateProjectResponse, Project } from '~~/src-core/api'
import { ProjectsApi } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAuthStore } from '~/stores/authStore'
import { useProjectStore } from '~/stores/projectStore'
import { UserHelper } from '~~/src-core/helpers/UserHelper'
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import type { AxiosResponse } from 'axios'
import { useRouter } from 'nuxt/app'
import type { Router } from 'vue-router'

/* HOOKS */
const router: Router = useRouter()

// REFS
const buttonLoading: Ref<boolean> = ref(false)
const payload: Ref<CreateProjectPayload> = ref({
  customer_user_id: -1,
  customer_name: '',
  application_name: '',
  domain_name: '',
  project_setup_id: undefined,
})

const authenticatedUser: User | null = useAuthStore().authenticatedUser
if (authenticatedUser) {
  payload.value.customer_user_id = authenticatedUser.id
  payload.value.customer_name = UserHelper.getFullName(authenticatedUser)
}

// METHODS
/**
 * Update the project payload
 * @param {UpdateProjectPayload} updatePayload - The payload to update
 * @returns {void}
 */
const updateProjectPayload: (updatePayload: UpdateProjectPayload) => void = (
  updatePayload: UpdateProjectPayload,
): void => {
  payload.value = {
    customer_user_id: payload.value.customer_user_id,
    customer_name: updatePayload.customer_name || payload.value.customer_name,
    application_name: updatePayload.application_name || payload.value.application_name,
    domain_name: updatePayload.domain_name || payload.value.domain_name,
    project_setup_id: payload.value.project_setup_id,
  }
}
/**
 * Create a new project
 * @returns {Promise<void>}
 */
const createProject: () => Promise<void> = async (): Promise<void> => {
  if (!authenticatedUser) {
    throw new Error('User not authenticated')
  }

  buttonLoading.value = true
  try {
    // Call project service
    const createProjectAxiosResponse: AxiosResponse<CreateProjectResponse> = await ProjectsApi.createProject(
      payload.value,
    )
    const createProjectResponse: CreateProjectResponse = createProjectAxiosResponse.data
    const userProjectsResponse: AxiosResponse<Project[], any> = await ProjectsApi.getProjectByUserId(
      authenticatedUser.id,
    )
    const userProjects: Project[] = userProjectsResponse.data
    useProjectStore().setProjects(userProjects)
    useProjectStore().setActiveProject(createProjectResponse.project_id)
    await router.push('/dashboard')
  } catch (error: any) {
    console.error(error)
  } finally {
    buttonLoading.value = false
  }
}
</script>
