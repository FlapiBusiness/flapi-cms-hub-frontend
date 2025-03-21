<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] bg-gray-700">
    <FlapiSidebar
      :avatar="undefined"
      :items="items"
      :username="authenticatedUserFullName"
      v-model:expand="flapiSidebarIsExpand"
    />
    <div class="px-4">
      <slot />
      <FlapiButton @click="signOut">Déconnexion</FlapiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCookie, navigateTo } from 'nuxt/app'
import type { CookieRef } from 'nuxt/app'
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { FlapiSidebarItem } from '@flapi/cms-designsystem/core'
import type { User } from '~~/src-core/api'

/* DATAS */
const authenticatedUser: User | null = useAuthStore().authenticatedUser

const items: FlapiSidebarItem[] = [
  {
    text: 'Dashboard',
    icon: 'Home',
    to: '/dashboard',
  },
  {
    text: 'Admin',
    icon: 'Home',
    to: '/admin',
  },
  {
    text: 'État santé applications',
    icon: 'Home',
    to: '/apps-health-checks',
  },
]

/*  REFS */
const flapiSidebarIsExpand: Ref<boolean> = ref(true)

/* COMPUTED */
const authenticatedUserFullName: ComputedRef<string> = computed(() => {
  if (authenticatedUser) {
    return `${authenticatedUser.firstname} ${authenticatedUser.lastname}`
  }
  return ''
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
