<template>
  <div class="grid grid-cols-2 gap-3">
    <!--    <FlapiInput-->
    <!--      :value="props.project.customerName"-->
    <!--      @update:value="(value) => emit('update:project', { ...project, customerName: value.toString() })"-->
    <!--      label="Nom du client"-->
    <!--      placeholder="John Doe"-->
    <!--      :rules="fieldsIsRequired ? 'required' : ''"-->
    <!--    />-->
    <FlapiInput
      :value="props.project.application_name"
      @update:value="(value) => emit('update:project', { ...project, application_name: value.toString() })"
      label="Nom de l'application"
      placeholder="Enter the project name"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.project.domain_name"
      @update:value="(value) => emit('update:project', { ...project, domain_name: value.toString() })"
      label="Sous-domaine"
      placeholder="subdomain.example.com"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.project.shortDescriptionApp"
      @update:value="(value) => emit('update:project', { ...project, shortDescriptionApp: value.toString() })"
      label="Courte Description de l'application"
      placeholder="Application de gestion de projet"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.project.longDescriptionApp"
      @update:value="(value) => emit('update:project', { ...project, longDescriptionApp: value.toString() })"
      label="Description détaillé de l'application"
      placeholder="Longue Description de l'application"
      :rows="3"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiSelect
      :options="options"
      :value="props.project.categoryApp"
      @update:value="(value: string) => emit('update:project', { ...project, categoryApp: value.toString() })"
      label="Catégorie de l'application"
      :required="fieldsIsRequired"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { UpdateProjectPayload } from '~~/src-core/api'
/**
 * Type definitions for the CreateProjectForm component props
 */
export type ProjectFormProps = {
  project: {
    UpdateProjectPayload
    shortDescriptionApp: string
    longDescriptionApp: string
    categoryApp: string
  }
}

/**
 * Type definitions for the SelectOption type
 */
export type SelectOption = {
  label: string
  value: number | string
}

const props: ProjectFormProps = defineProps({
  project: {
    type: Object as PropType<UpdateProjectPayload>,
    required: true,
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
const emit: (event: 'update:project', project: UpdateProjectPayload) => void = defineEmits<{
  (event: 'update:project', project: UpdateProjectPayload): void
}>()
</script>
