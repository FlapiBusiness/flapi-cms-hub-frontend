<template>
  <div>Connexion en cours...</div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter, useCookie, type CookieRef } from 'nuxt/app'
import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { RouteLocationNormalizedLoadedGeneric, Router } from 'vue-router'

const route: RouteLocationNormalizedLoadedGeneric = useRoute()
const router: Router = useRouter()
const authTokenCookie: CookieRef<string | null | undefined> = useCookie('authToken')
const BASE_API_URL: string = import.meta.env.VITE_BASE_URL_API

/**
 *
 */
const exchangeCodeForToken: () => Promise<void> = async (): Promise<void> => {
  try {
    const response: AxiosResponse<any, any> = await axios.post(`${BASE_API_URL}/auth/signin-callback`, {
      code: route.query.code,
      redirect_uri: import.meta.env.VITE_KEYCLOAK_REDIRECT_URI,
    })

    if (response.data.access_token) {
      authTokenCookie.value = response.data.access_token
      router.push('/dashboard')
    } else {
      console.error("Erreur lors de l'échange du code contre un token:", response.data)
      router.push('/signup')
    }
  } catch (error: any) {
    console.error("Erreur lors de l'échange du code contre un token:", error)
    router.push('/signup')
  }
}

/**
 *
 */
onBeforeMount(async (): Promise<void> => {
  await exchangeCodeForToken()
})
</script>
