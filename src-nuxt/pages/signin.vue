<template>
  <div class="flex h-full items-center justify-center">
    <FlapiSpinner variant="light" :size="64" />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'nuxt/app'
import type { Router } from 'vue-router'

const BASE_URL_KEYCLOAK_LOGIN: string = import.meta.env.VITE_BASE_URL_KEYCLOAK_LOGIN

/* HOOKS */
const router: Router = useRouter()

onMounted(() => {
  if (BASE_URL_KEYCLOAK_LOGIN) {
    router.push(BASE_URL_KEYCLOAK_LOGIN)
  } else {
    router.push('/')
  }
})

definePageMeta({
  layout: 'blank',
})
</script>
