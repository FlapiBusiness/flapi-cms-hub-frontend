<template>
  <div class="flex h-screen items-center justify-center">
    <FlapiSpinner></FlapiSpinner>
  </div>
</template>

<script lang="ts" setup>
import { useCookie, navigateTo } from 'nuxt/app'
import type { CookieRef } from 'nuxt/app'

definePageMeta({
  layout: 'blank',
})

onMounted(() => {
  signOut()
})

/* METHODS */
/**
 * Sign out the user
 * @returns {Promise<void>}
 */
const signOut: () => Promise<void> = async (): Promise<void> => {
  const BASE_URL_KEYCLOAK_LOGIN: string = import.meta.env.VITE_BASE_URL_KEYCLOAK_LOGIN
  // remove cookie authToken
  const authTokenCookie: CookieRef<string | null> = useCookie('authToken')
  authTokenCookie.value = null
  // redirect to external login page (keycloak)
  await navigateTo(BASE_URL_KEYCLOAK_LOGIN, { external: true })
}
</script>
