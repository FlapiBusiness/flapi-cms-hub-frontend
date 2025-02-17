<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <FlapiGoogleButton :disabled="false" class="w-full md:w-[calc(50%-10px)]" />

    <FlapiDivider text="or" class="w-full md:w-[calc(50%-10px)]" />
  </div>
  <Form v-slot="{ meta }" class="grid grid-cols-1 gap-6 md:grid-cols-2" @submit="signup">
    <FlapiInput v-model:value="values.firstName" type="text" id="firstName" label="Prénom" placeholder="Corentin" />
    <FlapiInput v-model:value="values.lastName" type="text" id="completeName" label="Nom" placeholder="Doe" />
    <FlapiInput
      v-model:value="values.email"
      type="email"
      id="email"
      label="Email"
      rules="email"
      placeholder="email@flapi.org"
      class="col-span-2"
    />
    <FlapiInput v-model:value="values.password" type="password" id="password" label="Mot de passe" />
    <FlapiInput
      v-model:value="values.confirmPassword"
      type="password"
      id="confirmPassword"
      label="Confirmation mot de passe"
    />

    <slot />

    <h6 class="flex h-full flex-wrap items-center justify-center gap-2 font-medium text-light-400">
      Vous avez déjà un compte ?
      <FlapiLink class="text-primary-light" link="signin">Se connecter</FlapiLink>
    </h6>

    <FlapiButton :disabled="!meta.valid" :load="buttonLoading" type="submit" iconPosition="right" icon="arrow-right">
      <p class="font-semibold text-light-400">
        {{ buttonLoading ? 'Création de votre compte...' : 'Créer mon compte' }}
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
import type { Ref } from 'vue'

/**
 * Interface for the sign up form values
 * @interface SignUpFormValues
 * @property {string} email - The email
 * @property {string} completeName - The complete name
 * @property {string} password - The password
 * @property {string} confirmPassword - The confirmation password
 * @property {string} [firstName] - The first name
 */
export interface SignUpFormValues {
  lastName: string
  firstName: string
  email: string
  password: string
  confirmPassword: string
}

/* REFS */
const values: Ref<SignUpFormValues> = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
})
const buttonLoading: Ref<boolean> = ref(false)
const showModal: Ref<boolean> = ref(false)

/* METHODS */
/**
 * Method to login
 * @returns {Promise<void>}
 */
const signup: () => Promise<void> = async (): Promise<void> => {
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
