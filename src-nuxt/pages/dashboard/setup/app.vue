<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Photo de l'applications</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-2xl font-semibold text-light-400">Personnalisation de l'application</p>
      <!--      @confirm="createApp"-->
      <FlapiFormCard>
        <ApplicationForm :payload="payload" @update:payload="payload = $event" :fields-is-required="true" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiCardDownloadPicture from '@/components/cards/FlapiCardDownloadPicture.vue'
import ApplicationForm from '@/components/forms/ApplicationForm.vue'
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
// import { ClientApi } from '~~/src-core/api'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Type definitions for the CreateApplicationForm component props
 * @type {ApplicationPayload}
 * @property {string} customerName - The name of the customer
 * @property {string} projectName - The name of the project
 * @property {string} subdomain - The subdomain of the project
 */
export type ApplicationPayload = {
  customerName?: string
  projectName?: string
  subdomain?: string
  categoryApp?: string
  longDescriptionApp?: string
  shortDescriptionApp?: string
}

const payload: Ref<ApplicationPayload> = ref({
  customerName: '',
  projectName: '',
  subdomain: '',
  categoryApp: '',
  longDescriptionApp: '',
  shortDescriptionApp: '',
})

/**
 * Create an application
 * @returns {Promise<void>}
 */
/*const createApp: () => Promise<void> = async (): Promise<void> => {
  // buttonLoading.value = true
  try {
    console.log('createApp', payload.value)
    // Call application service
    await ClientApi.createNewApplication(payload.value)
  } catch (error: any) {
    console.error(error)
  } finally {
    // buttonLoading.value = false
  }
}*/
</script>
