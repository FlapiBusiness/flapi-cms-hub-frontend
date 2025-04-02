<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-700">
    <FlapiSpinner variant="light" :size="64" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, useCookie, type CookieRef } from 'nuxt/app'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'

/* HOOKS */
const route: RouteLocationNormalizedLoadedGeneric = useRoute()
const router: Router = useRouter()

/* REFS */
const authTokenCookie: CookieRef<string | null | undefined> = useCookie('authToken')

/* CONSTANTS */
const BASE_API_URL: string = import.meta.env.VITE_BASE_URL_API

definePageMeta({
  layout: 'blank',
})

/**
 *  Exchange the code for a token
 *  @returns {Promise<void>}
 */
const exchangeCodeForToken: () => Promise<void> = async (): Promise<void> => {
  try {
    const response: AxiosResponse<any, any> = await axios.post(`${BASE_API_URL}/auth/signin-callback`, {
      code: route.query.code,
      redirect_uri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI,
    })

    if (response.data.access_token) {
      authTokenCookie.value = response.data.access_token
      await router.push('/dashboard')
    } else {
      console.error("Erreur lors de l'échange du code contre un token:", response.data)
      await router.push('/signup')
    }
  } catch (error: any) {
    console.error("Erreur lors de l'échange du code contre un token:", error)
    await router.push('/signup')
  }
}

/**
 *
 */
onBeforeMount(async (): Promise<void> => {
  await exchangeCodeForToken()
})
</script>
