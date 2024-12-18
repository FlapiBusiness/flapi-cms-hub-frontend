<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <FlapiGoogleButton :disabled="false" class="w-full md:w-[calc(50%-10px)]" />

    <FlapiDivider text="or" class="w-full md:w-[calc(50%-10px)]" />
  </div>
  <Form v-slot="{ meta }" class="grid grid-cols-1 gap-6 md:grid-cols-2" @submit="signup">
    <FlapiInput
      v-model:value="values.email"
      type="email"
      id="email"
      label="Email"
      rules="email"
      placeholder="email@crzgames.com"
    />
    <FlapiInput v-model:value="values.completeName" type="text" id="completeName" label="Nom complet" />
    <FlapiInput v-model:value="values.password" type="password" id="password" label="Mot de passe" />
    <FlapiInput
      v-model:value="values.confirmPassword"
      type="password"
      id="confirmPassword"
      label="Confirmation mot de passe"
    />

    <slot />

    <h6 class="flex h-full flex-wrap items-center justify-center gap-2 text-sm font-medium text-light-400">
      Vous n'avez pas de compte ?
      <FlapiLink class="text-primary-light text-sm" link="login"> Se connecter</FlapiLink>
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
import FlapiInput from '@/components/common/core/FlapiInput.vue'
import FlapiButton from '@/components/common/core/FlapiButton.vue'
import FlapiConfirmModal from '@/components/common/core/FlapiConfirmModal.vue'
import FlapiGoogleButton from '@/components/buttons/FlapiGoogleButton.vue'
import FlapiDivider from '../decorators/FlapiDivider.vue'
import FlapiLink from '../common/core/FlapiLink.vue'
import type { Ref } from 'vue'

/* REFS */
const values: Ref<{ completeName: string; email: string; password: string; confirmPassword: string }> = ref({
  completeName: '',
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
