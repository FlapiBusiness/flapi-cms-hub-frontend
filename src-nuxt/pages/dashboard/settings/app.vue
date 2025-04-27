<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Photo de l'application</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-2xl font-semibold text-light-400">Personnalisation de l'application</p>
      <FlapiFormCard @confirm="updatePayload(payload)">
        <ProjectForm :project="payload" @update:payload="payload = $event" :fields-is-required="false" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '~/components/cards/FlapiCardDownloadPicture.vue'
import ProjectForm from '~/components/forms/ProjectForm.vue'
import type { UpdateProjectPayload } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'
const payload: Ref<UpdateProjectPayload> = ref({
  customer_user_id: -1,
  customer_name: '',
  application_name: '',
  domain_name: '',
  project_setup_id: undefined,
})

/**
 * Update the payload
 */
const updatePayload: (payload: UpdateProjectPayload) => void = () => {
  console.log('updatePayload', payload.value)
}
</script>
