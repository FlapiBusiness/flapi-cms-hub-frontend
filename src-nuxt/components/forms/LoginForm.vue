<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="login">
    <FlapiInput
      v-model:value="values.email"
      type="email"
      id="email"
      label="Email"
      rules="required|email"
      placeholder="email@crzgames.com"
    />

    <FlapiInput v-model:value="values.password" type="password" id="password" label="Password" rules="required" />

    <slot />

    <FlapiButton :disabled="!meta.valid" :load="buttonLoading" type="submit">
      {{ buttonLoading ? 'Loading...' : 'Login' }}
    </FlapiButton>

    <FlapiConfirmModal
      :show="showModal"
      :title="'Your account is not activated'"
      :message="'Please check your email for the verification code or click the Confirm button to resend an activation code by email.'"
      @update:show="showModal = $event"
      @ok="resendMailCodeActivationAccount"
      @cancel="showModal = false"
    />
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import FlapiInput from '~/components/common/core/FlapiInput.vue'
import FlapiButton from '~/components/common/core/FlapiButton.vue'
import FlapiConfirmModal from '~/components/common/core/FlapiConfirmModal.vue'
import type { Ref } from 'vue'

/* REFS */
const values: Ref<{ email: string; password: string }> = ref({
  email: '',
  password: '',
})
const buttonLoading: Ref<boolean> = ref(false)
const showModal: Ref<boolean> = ref(false)

/* METHODS */
/**
 * Method to login
 * @returns {Promise<void>}
 */
const login: () => Promise<void> = async (): Promise<void> => {
  //TODO Implémenter la logique pour se connecter
  buttonLoading.value = true

  try {
    //  await useAuthStore().signIn(values.value)
    //TODO: remove this line when the above line is implemented
    await new Promise((resolve: (value?: unknown) => void) => setTimeout(resolve, 200))
  } catch (error: any) {
    if (
      error?.response?.data &&
      typeof error.response.data === 'string' &&
      error.response.data === 'Account is not active'
    ) {
      showModal.value = true
    } else {
      console.error('Unexpected error:', error)
    }
  } finally {
    buttonLoading.value = false
  }
}

/**
 * Method to resend the activation code by email
 * @returns {Promise<void>}
 */
const resendMailCodeActivationAccount: () => Promise<void> = async (): Promise<void> => {
  //TODO Implémenter la logique pour renvoyer le code de vérification
  // await AuthService.resendNewCodeVerificationAccount(values.value.email)
  //TODO: remove this line when the above line is implemented
  await new Promise((resolve: (value?: unknown) => void) => setTimeout(resolve, 200))

  showModal.value = false
}
</script>
