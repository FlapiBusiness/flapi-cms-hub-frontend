<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <FlapiLogo size="50" :large="true" class="mb-16 items-center justify-center" />
    <p class="mb-6 flex h-full flex-wrap items-center justify-center gap-2 text-3xl font-semibold text-light-400">
      Vérifier votre compte
    </p>
    <p class="text-lg mb-6 text-center text-light-400">
      Entrez le code de vérification envoyé à <span class="font-semibold">{{ props.email }}</span>
    </p>
    <div class="flex flex-col items-center justify-center">
      <FlapiPinCode class="flex flex-row items-center justify-center" />
      <div class="ml-auto mt-16 flex flex-row items-center gap-4">
        <FlapiLink class="text-light-400" link="/login">Retour</FlapiLink>
        <FlapiLink class="text-light-400" link="/verify-account"> Renvoyer le code </FlapiLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * Type definitions for the FlapiVerifyAccount component props
 * @type {FlapiVerifyAccountProps}
 * @property {string} email - Email de l'utilisateur
 */
export type FlapiVerifyAccountProps = {
  email: string
}
</script>

<script lang="ts" setup>
import FlapiLogo from '@/components/flapi/FlapiLogo.vue'
import FlapiPinCode from '@/components/inputs/FlapiPinCode.vue'
import FlapiLink from '@/components/core/FlapiLink.vue'
import { defineProps } from '@vue/runtime-core'

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
