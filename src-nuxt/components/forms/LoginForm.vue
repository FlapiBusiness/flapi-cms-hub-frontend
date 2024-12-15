<template>
  <Form v-slot="{ meta }" class="flex flex-col gap-6" @submit="login">
    <!-- connect with google -->
    <FlapiButton type="button" variant="light" font="semi-bold" class="flex items-center justify-center gap-2">
      <FlapiIcon name="google" mode="fill" color="#DB4437" class="mr-2" />
      Continuer avec Google
    </FlapiButton>

    <!-- ou  -->
    <div class="flex items-center justify-center gap-2">
      <div class="h-[1px] w-2/4 bg-grey-200"></div>
      <h6 class="font-regular text-sm text-light-100">ou</h6>
      <div class="h-[1px] w-2/4 bg-grey-200"></div>
    </div>

    <FlapiInput
      v-model:value="values.email"
      type="email"
      id="email"
      label="Email"
      rules="email"
      placeholder="email@crzgames.com"
    />

    <FlapiInput v-model:value="values.password" type="password" id="password" label="Mot de passe" />

    <slot />

    <FlapiButton :disabled="!meta.valid" :load="buttonLoading" type="submit">
      <p class="font-semibold text-light-100">
        {{ buttonLoading ? 'Connexion...' : 'Se connecter' }}
      </p>
    </FlapiButton>

    <FlapiConfirmModal
      :show="showModal"
      :title="'Votre compte n\'est pas activé'"
      :message="'Veuillez vérifier votre boîte de réception pour activer votre compte.'"
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
import FlapiIcon from '~/components/common/ui/FlapiIcon.vue'
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
