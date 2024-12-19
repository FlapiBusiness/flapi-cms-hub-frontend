<template>
  <div class="grid grid-cols-2 gap-3 p-4">
    <FlapiInput v-model:value="payload.customerName" label="Nom du client" placeholder="John Doe" required />
    <FlapiInput
      v-model:value="payload.projectName"
      label="Nom de l'application"
      placeholder="Enter the project name"
      required
    />
    <FlapiInput v-model:value="payload.subdomain" label="Sous-domaine" placeholder="subdomain.example.com" required />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import FlapiInput from '@/components/core/FlapiInput.vue'
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
</script>
