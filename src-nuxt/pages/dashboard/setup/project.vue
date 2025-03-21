<template>
  <div class="flex min-h-screen w-full flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-6xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Photo de l'applications</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-2xl font-semibold text-light-400">Personnalisation de l'application</p>
      <!--      @confirm="createApp"-->
      <FlapiFormCard>
        <ProjectForm :payload="payload" @update:payload="payload = $event" :fields-is-required="true" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiCardDownloadPicture from '@/components/cards/FlapiCardDownloadPicture.vue'
import ProjectForm from '~/components/forms/ProjectForm.vue'
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
// import { ClientApi } from '~~/src-core/api'
// import { ProjectsApi } from '~~/src-core/api'
// import type { CreateProjectPayload } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'

// STORE

// REFS
// const buttonLoading: Ref<boolean> = ref(false)
const payload: Ref<any> = ref({
  application_name: '',
  user_id: -1,
  categoryApp: '',
  longDescriptionApp: '',
  shortDescriptionApp: '',
})

// // METHODS
// /**
//  * Create an application
//  * @returns {Promise<void>}
//  */
// const createApp: () => Promise<void> = async (): Promise<void> => {
//   buttonLoading.value = true
//   try {
//     console.log('createApp', payload.value)
//     // Call project service
//     await ProjectsApi.createProject(payload.value)
//   } catch (error: any) {
//     console.error(error)
//   } finally {
//     buttonLoading.value = false
//   }
// }
</script>
