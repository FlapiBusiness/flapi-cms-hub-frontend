<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] bg-gray-700">
    <FlapiSidebar
      :avatar="undefined"
      :items="items"
      :username="authenticatedUserFullName"
      v-model:expand="flapiSidebarIsExpand"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import type { FlapiSidebarItem } from '@flapi/cms-designsystem/core'
import type { User } from '~~/src-core/api'
import { useAuthStore } from '~/stores/authStore'

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
const authenticatedUser: ComputedRef<User | null> = computed(() => useAuthStore().authenticatedUser)
const authenticatedUserFullName: ComputedRef<string> = computed(() => {
  if (authenticatedUser.value) {
    return `${authenticatedUser.value.firstname} ${authenticatedUser.value.lastname}`
  }
  return ''
})
</script>
