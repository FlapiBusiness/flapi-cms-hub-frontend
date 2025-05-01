<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <p class="text-xl font-semibold text-light-400">Photo de l'application</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-xl font-semibold text-light-400">Personnalisation de l'application</p>
      <FlapiFormCard @confirm="updatePayload(payload)">
        <ProjectForm :project="payload" @update:project="payload = $event" :fields-is-required="false" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '~/components/cards/FlapiCardDownloadPicture.vue'
import ProjectForm from '~/components/forms/ProjectForm.vue'
import type { UpdateProjectPayload, User, Project } from '~~/src-core/api'
import { ProjectsApi } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useAuthStore } from '~/stores/authStore'
import { useProjectStore } from '~/stores/projectStore'
import { UserHelper } from '~~/src-core/helpers/UserHelper'

// REFS
const buttonLoading: Ref<boolean> = ref(false)
const payload: Ref<UpdateProjectPayload> = ref({
  customer_user_id: -1,
  customer_name: '',
  application_name: '',
  domain_name: '',
  project_setup_id: undefined,
})

const authenticatedUser: User | null = useAuthStore().authenticatedUser
const activeProject: Project | null = useProjectStore().activeProject

if (activeProject) {
  if (activeProject.user) {
    payload.value.customer_user_id = activeProject.user.id
    payload.value.customer_name = UserHelper.getFullName(activeProject.user)
  } else if (authenticatedUser) {
    payload.value.customer_user_id = authenticatedUser.id
    payload.value.customer_name = UserHelper.getFullName(authenticatedUser)
  }

  payload.value = {
    ...payload.value,
    customer_user_id: activeProject.user_id,
    application_name: activeProject.application_name,
    domain_name: activeProject.domain_name,
    project_setup_id: activeProject.project_setup_id,
  }
}

/**
 * Update the payload
 */
const updatePayload: (payload: UpdateProjectPayload) => Promise<void> = async (): Promise<void> => {
  buttonLoading.value = true
  try {
    if (!activeProject) {
      throw new Error('No active project found')
    }
    // Call project service
    await ProjectsApi.updateProject(activeProject.id, payload.value)
  } catch (error: any) {
    console.error(error)
  } finally {
    buttonLoading.value = false
  }
}
</script>
