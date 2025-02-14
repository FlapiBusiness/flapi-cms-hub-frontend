<template>
  <div class="grid grid-cols-2 gap-3 p-4">
    <FlapiInput
      :value="props.payload.customerName"
      @update:value="(value) => emit('update:payload', { ...payload, customerName: value.toString() })"
      label="Nom du client"
      placeholder="John Doe"
      required
    />
    <FlapiInput
      :value="props.payload.projectName"
      @update:value="(value) => emit('update:payload', { ...payload, projectName: value.toString() })"
      label="Nom de l'application"
      placeholder="Enter the project name"
      required
    />
    <FlapiInput
      :value="props.payload.subdomain"
      @update:value="(value) => emit('update:payload', { ...payload, subdomain: value.toString() })"
      label="Sous-domaine"
      placeholder="subdomain.example.com"
      required
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { CreateApplicationPayload } from '~/pages/setup/app/index.vue'
/**
 * Type definitions for the CreateApplicationForm component props
 * @type {CreateApplicationFormProps}
 * @property {string} customerName - The name of the customer
 * @property {string} projectName - The name of the project
 * @property {string} subdomain - The subdomain of the project
 */
export type CreateApplicationFormProps = {
  payload: CreateApplicationPayload
}

const props: CreateApplicationFormProps = defineProps({
  payload: {
    type: Object as PropType<CreateApplicationPayload>,
    default: {
      customerName: '',
      projectName: '',
      subdomain: '',
    },
  },
})

/*EMIT*/
const emit: (event: 'update:payload', value: CreateApplicationPayload) => void = defineEmits<{
  (event: 'update:payload', value: CreateApplicationPayload): void
}>()
</script>
