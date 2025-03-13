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
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { FlapiSidebarItem } from '@flapi/cms-designsystem/core'
import type { User } from '~~/src-core/api'

/* DATAS */
const authenticatedUser: User | null = useAuthStore().authenticatedUser

const items: FlapiSidebarItem[] = [
  {
    text: 'Accueil',
    icon: 'Home',
    to: '/',
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
</script>
