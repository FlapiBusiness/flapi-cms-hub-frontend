<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Photo de l'applications</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-2xl font-semibold text-light-400">Personnalisation de l'application</p>
      <FlapiFormCard @confirm="createApp">
        <CreateApplicationForm :payload="payload" @update:payload="payload = $event" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '~/components/cards/FlapiCardDownloadPicture.vue'
import CreateApplicationForm from '~/components/forms/CreateApplicationForm.vue'

/**
 * Type definitions for the CreateApplicationForm component props
 * @type {CreateApplicationPayload}
 * @property {string} customerName - The name of the customer
 * @property {string} projectName - The name of the project
 * @property {string} subdomain - The subdomain of the project
 */
export type CreateApplicationPayload = {
  customerName: string
  projectName: string
  subdomain: string
}

const payload: Ref<CreateApplicationPayload> = ref({
  customerName: '',
  projectName: '',
  subdomain: '',
})

/**
 * Create an application
 * @returns {Promise<void>}
 */
const createApp: () => Promise<void> = async (): Promise<void> => {
  // buttonLoading.value = true

  try {
    console.log('createApp', payload.value)
    // Call application service
    await new Promise((resolve: (value?: unknown) => void) => setTimeout(resolve, 200))
  } catch (error: any) {
    console.error(error)
  } finally {
    // buttonLoading.value = false
  }
}
</script>
