<template>
  <div class="grid grid-cols-2 gap-3">
    <FlapiInput
      :value="props.user.firstname"
      @update:value="(value) => emit('update:user', { ...user, firstname: value.toString() })"
      label="Prénom"
      id="prénom"
      placeholder="John"
    />
    <FlapiInput
      :value="props.user.lastname"
      @update:value="(value) => emit('update:user', { ...user, lastname: value.toString() })"
      label="Nom"
      id="nom"
      placeholder="Doe"
    />
    <FlapiInput
      :value="props.user.email"
      @update:value="(value) => emit('update:user', { ...user, email: value.toString() })"
      label="Email"
      id="email"
      placeholder="john.doe@flapi.org"
      class="col-span-2"
    />
    <FlapiInput
      type="password"
      :value="props.user.password"
      @update:value="(value) => emit('update:user', { ...user, password: value.toString() })"
      label="Mot de passe"
      id="mot de passe"
    />
    <FlapiInput
      type="password"
      :value="props.user.password_confirmation"
      @update:value="(value) => emit('update:user', { ...user, password_confirmation: value.toString() })"
      label="Confirmation mot de passe"
      id="confirmation mot de passe"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import type { PropType } from 'vue'
import type { UpdateUserPayload } from '~~/src-core/api'

/**
 * Type definitions for the UpdateUserForm component props
 */
export type UpdateUserFormProps = {
  user: UpdateUserPayload
}

const props: UpdateUserFormProps = defineProps({
  user: {
    type: Object as PropType<UpdateUserPayload>,
    required: true,
  },
})

/*EMIT*/
const emit: (event: 'update:user', user: UpdateUserPayload) => void = defineEmits<{
  (event: 'update:user', user: UpdateUserPayload): void
}>()
</script>
