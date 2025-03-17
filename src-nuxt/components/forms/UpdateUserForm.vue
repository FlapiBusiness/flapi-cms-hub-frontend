<template>
  <Form class="grid grid-cols-1 gap-6 md:grid-cols-2">
    <FlapiInput
      :value="props.payload.lastname"
      @update:value="(value) => emit('update:payload', { ...payload, lastname: value.toString() })"
      label="Nom"
      id="lastname"
    />
    <FlapiInput
      :value="props.payload.firstname"
      @update:value="(value) => emit('update:payload', { ...payload, firstname: value.toString() })"
      label="Prénom"
      id="firstname"
    />
    <FlapiInput
      :value="props.payload.email"
      @update:value="(value) => emit('update:payload', { ...payload, email: value.toString() })"
      label="Email"
      id="email"
      placeholder="john.doe@email.com"
      class="col-span-2"
    />
    <FlapiInput
      type="password"
      :value="props.payload.password"
      @update:value="(value) => emit('update:payload', { ...payload, password: value.toString() })"
      label="Mot de passe"
      id="password"
    />
    <FlapiInput
      type="password"
      :value="props.payload.confirmation_password"
      @update:value="(value) => emit('update:payload', { ...payload, confirmation_password: value.toString() })"
      label="Confirmation mot de passe"
      id="confirmation_password"
    />

    <FlapiButton :load="buttonLoading" type="submit" class="px-0">
      <span class="font-semibold text-light-400">
        {{ buttonLoading ? 'Enregistrement en cours...' : 'Enregistrer' }}
      </span>
    </FlapiButton>
  </Form>
</template>

<script lang="ts" setup>
import { defineProps, ref, type Ref } from 'vue'
import type { PropType } from 'vue'
// import type { CreateApplicationPayload } from '~/pages/dashboard/setup/app.vue'
// import { ClientApi } from '~~/src-core/api'
/**
 * Type definitions for the UpdateUserForm component props
 * @type {UpdateUserPayload}
 * @property {string} customerName - The name of the customer
 * @property {string} projectName - The name of the project
 * @property {string} subdomain - The subdomain of the project
 */
export type UpdateUserPayload = {
  lastname: string
  firstname: string
  email: string
  password: string
  confirmation_password: string
}

/**
 * Type definitions for the UpdateUserForm component props
 */
export type UpdateUserFormProps = {
  payload: UpdateUserPayload
}

const buttonLoading: Ref<boolean> = ref(false)

const props: UpdateUserFormProps = defineProps({
  payload: {
    type: Object as PropType<UpdateUserPayload>,
    default: {
      lastname: 'John',
      firstname: 'Doe',
      email: 'john.doe@email.com',
      password: 'password',
      confirmation_password: 'password',
    },
  },
})

/**
 * Update an user
 * @returns {Promise<void>}
 */
/*const updateUser: () => Promise<void> = async (): Promise<void> => {
  buttonLoading.value = true
  try {
    console.log('updateUser', payload.value)
    // Call application service
    await ClientApi.createNewApplication()
  } catch (error: any) {
    console.error(error)
  } finally {
    // buttonLoading.value = false
  }
}*/

/*EMIT*/
const emit: (event: 'update:payload', value: UpdateUserPayload) => void = defineEmits<{
  (event: 'update:payload', value: UpdateUserPayload): void
}>()
</script>
