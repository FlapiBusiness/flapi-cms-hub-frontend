<template>
  <div class="flex flex-col items-center justify-center">
    <FlapiLogo size="50" :large="true" class="mb-16 items-center justify-center" />
    <p class="mb-6 flex h-fit flex-wrap items-center justify-center gap-2 text-3xl font-semibold text-light-400">
      Mattre à jour votre mot de passe
    </p>
    <p class="text-lg mb-10 text-center font-medium text-light-400">
      Entrez le code de vérification envoyé à <span class="font-semibold">{{ props.email }}</span>
    </p>
    <div class="flex flex-col items-center justify-center">
      <FlapiPinCode class="flex flex-row items-center justify-center" />
      <div class="ml-auto mt-16 flex flex-row items-center gap-4">
        <FlapiLink class="text-light-400" link="/login">Retour</FlapiLink>
        <FlapiLink class="text-light-400" link="/reset-password"> Renvoyer le code </FlapiLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from '@vue/runtime-core'

/**
 * Type definitions for the FlapiVerifyAccount component props
 * @type {FlapiVerifyAccountProps}
 * @property {string} email - Email de l'utilisateur
 */
export type FlapiVerifyAccountProps = {
  email: string
}

/**
 * Props
 * @param {string} email - Email de l'utilisateur
 */
const props: FlapiVerifyAccountProps = defineProps({
  email: {
    type: String,
    required: true,
    default: 'email@exemple.com',
  },
})
</script>
