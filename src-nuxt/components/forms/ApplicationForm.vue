<template>
  <div class="grid grid-cols-2 gap-3 p-4">
    <FlapiInput
      :value="props.payload.customerName"
      @update:value="(value) => emit('update:payload', { ...payload, customerName: value.toString() })"
      label="Nom du client"
      placeholder="John Doe"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.payload.projectName"
      @update:value="(value) => emit('update:payload', { ...payload, projectName: value.toString() })"
      label="Nom de l'application"
      placeholder="Enter the project name"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.payload.subdomain"
      @update:value="(value) => emit('update:payload', { ...payload, subdomain: value.toString() })"
      label="Sous-domaine"
      placeholder="subdomain.example.com"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.payload.shortDescriptionApp"
      @update:value="(value) => emit('update:payload', { ...payload, shortDescriptionApp: value.toString() })"
      label="Courte Description de l'application"
      placeholder="Application de gestion de projet"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.payload.longDescriptionApp"
      @update:value="(value) => emit('update:payload', { ...payload, longDescriptionApp: value.toString() })"
      label="Description détaillé de l'application"
      placeholder="Longue Description de l'application"
      :rows="3"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiSelect
      :options="options"
      :value="props.payload.categoryApp"
      @update:value="(value: string) => emit('update:payload', { ...payload, categoryApp: value.toString() })"
      label="Catégorie de l'application"
      :required="fieldsIsRequired"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { ApplicationPayload } from '~/pages/dashboard/setup/app.vue'
/**
 * Type definitions for the CreateApplicationForm component props
 * @type {ApplicationFormProps}
 * @property {string} customerName - The name of the customer
 * @property {string} projectName - The name of the project
 * @property {string} subdomain - The subdomain of the project
 */
export type ApplicationFormProps = {
  payload: ApplicationPayload
}

/**
 * Type definitions for the SelectOption type
 */
export type SelectOption = {
  label: string
  value: number | string
}

const props: ApplicationFormProps = defineProps({
  payload: {
    type: Object as PropType<ApplicationPayload>,
    default: {
      customerName: '',
      projectName: '',
      subdomain: '',
      categoryApp: '',
      longDescriptionApp: '',
      shortDescriptionApp: '',
    },
  },
  fieldsIsRequired: {
    type: Boolean,
    default: true,
  },
})

const options: SelectOption[] = [
  { label: 'Divertissement', value: 'categoryApp' },
  { label: 'Auto et véhicules', value: 'categoryApp' },
  { label: 'Musique et audio', value: 'categoryApp' },
  { label: 'Shopping', value: 'categoryApp' },
]

/*EMIT*/
const emit: (event: 'update:payload', value: ApplicationPayload) => void = defineEmits<{
  (event: 'update:payload', value: ApplicationPayload): void
}>()
</script>
