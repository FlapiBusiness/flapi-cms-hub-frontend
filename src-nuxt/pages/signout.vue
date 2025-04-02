<template>
  <div class="flex h-full items-center justify-center">
    <FlapiSpinner variant="light" :size="64" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { AuthApi } from '~~/src-core/api'
import { useCookie, navigateTo } from 'nuxt/app'
import type { CookieRef } from 'nuxt/app'

// COMPOSABLES
definePageMeta({
  layout: 'blank',
})

// DATAS
const BASE_URL_KEYCLOAK_LOGIN: string = import.meta.env.VITE_BASE_URL_KEYCLOAK_LOGIN

onMounted(async () => {
  await AuthApi.signOut()
  // remove cookie authToken
  const authTokenCookie: CookieRef<string | null> = useCookie('authToken')
  authTokenCookie.value = null
  // redirect to external login page (keycloak)
  await navigateTo(BASE_URL_KEYCLOAK_LOGIN, { external: true })
})
</script>
