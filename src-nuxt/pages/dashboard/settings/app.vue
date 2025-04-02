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
<script lang="ts"></script>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '~/components/cards/FlapiCardDownloadPicture.vue'
import ProjectForm from '~/components/forms/ProjectForm.vue'

/**
 * Application payload
 */
type ApplicationPayload = {
  customerName: string
  projectName: string
  subdomain: string
  categoryApp: string
  longDescriptionApp: string
  shortDescriptionApp: string
}

const payload: Ref<ApplicationPayload> = ref({
  customerName: 'John Doe',
  projectName: 'Flapi',
  subdomain: 'flapi.example.com',
  categoryApp: 'Project management',
  longDescriptionApp: 'This is a project management application',
  shortDescriptionApp: 'Project management app',
})

/**
 * Update the payload
 */
const updatePayload: (payload: ApplicationPayload) => void = () => {
  console.log('updatePayload', payload.value)
}
</script>
