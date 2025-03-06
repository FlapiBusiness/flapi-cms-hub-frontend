<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <FlapiGoogleButton :disabled="false" class="w-full md:w-[calc(50%-10px)]" />

    <FlapiDivider text="or" class="w-full md:w-[calc(50%-10px)]" />
  </div>

  <FlapiAlert v-if="errorMessage" :message="errorMessage" variant="error" dismissible />

  <Form v-slot="{ meta }" class="grid grid-cols-1 gap-6 md:grid-cols-2" @submit="signup">
    <FlapiInput
      v-model:value="values.firstname"
      type="text"
      rules="required"
      id="prénom"
      label="Prénom"
      placeholder="Corentin"
    />
    <FlapiInput v-model:value="values.lastname" type="text" rules="required" id="nom" label="Nom" placeholder="Doe" />
    <FlapiInput
      v-model:value="values.email"
      type="email"
      id="email"
      label="Email"
      rules="required|email"
      placeholder="email@flapi.org"
      class="col-span-2"
    />
    <FlapiInput
      v-model:value="values.password"
      type="password"
      rules="required|complex_password"
      id="password"
      label="password"
    />
    <FlapiInput
      v-model:value="values.password_confirmation"
      rules="required|confirmed:password"
      type="password"
      id="confirm_password"
      label="confirm_password"
    />

    <slot />

    <h6 class="flex h-full flex-wrap items-center justify-center gap-2 font-medium text-light-400">
      Vous avez déjà un compte ?
      <FlapiLink class="text-primary-light" link="signin">Se connecter</FlapiLink>
    </h6>

    <FlapiButton :disabled="!meta.valid" :load="buttonLoading" type="submit" class="px-0">
      <span class="font-semibold text-light-400">
        {{ buttonLoading ? 'Création de votre compte...' : 'Créer mon compte' }}
      </span>
    </FlapiButton>
  </Form>
</template>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Router } from 'vue-router'
import type { Ref } from 'vue'
import { AuthApi, type BadRequestResponse, type BadValidationRequestResponse } from '~~/src-core/api'
import type { SignUpPayload } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'

/* REFS */
const values: Ref<SignUpPayload> = ref({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  password_confirmation: '',
})
const buttonLoading: Ref<boolean> = ref(false)
const errorMessage: Ref<string | null> = ref(null)

/* HOOKS */
const router: Router = useRouter()

/* METHODS */
/**
 * Method to login
 * @returns {Promise<void>}
 */
const signup: () => Promise<void> = async (): Promise<void> => {
  buttonLoading.value = true

  try {
    await AuthApi.signUp(values.value)
    // Redirect to the home page
    await router.push('/')
  } catch (error) {
    const responseError: BadValidationRequestResponse | BadRequestResponse = (
      error as AxiosResponse<BadValidationRequestResponse | BadRequestResponse>
    ).data

    console.log('responseError', JSON.stringify(error, null, 2))

    if (typeof responseError === 'object' && 'code' in responseError) {
      if ('messages' in responseError) {
        // BadValidationRequestResponse : Affiche tous les messages d'erreur
        errorMessage.value = responseError.messages.join(', ')
      } else if ('message' in responseError) {
        // BadRequestResponse : Affiche le message unique
        errorMessage.value = responseError.message
      }
    } else {
      errorMessage.value = "Une erreur inconnue s'est produite."
    }

    console.error('Erreur lors de l’inscription:', responseError)
  } finally {
    buttonLoading.value = false
  }
}
</script>
