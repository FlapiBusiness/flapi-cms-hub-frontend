<template>
  <div class="grid gap-3 sm:grid-cols-2">
    <FlapiInput
      :value="props.project.customer_name"
      @update:value="(value) => emit('update:project', { ...props.project, customer_name: value.toString() })"
      id="nom du client"
      label="Nom du client"
      placeholder="John Doe"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.project.application_name"
      @update:value="(value) => emit('update:project', { ...props.project, application_name: value.toString() })"
      id="nom de l'application"
      label="Nom de l'application"
      placeholder="Mon application"
      :rules="fieldsIsRequired ? 'required' : ''"
    />
    <FlapiInput
      :value="props.project.domain_name"
      @update:value="(value) => emit('update:project', { ...props.project, domain_name: value.toString() })"
      id="domaine de l'application"
      label="Domaine de l'application"
      placeholder="mon-application.fr"
      :rules="fieldsIsRequired ? 'required' : ''"
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
  project: UpdateProjectPayload
  fieldsIsRequired: boolean
  buttonLoading: boolean
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
  buttonLoading: {
    type: Boolean,
    default: false,
  },
})

/*EMIT*/
const emit: (event: 'update:project', project: UpdateProjectPayload) => void = defineEmits<{
  (event: 'update:project', project: UpdateProjectPayload): void
}>()
</script>
