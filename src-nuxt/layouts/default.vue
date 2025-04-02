<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] overflow-x-hidden">
    <FlapiSidebar
      :avatar="undefined"
      :items="items"
      :username="authenticatedUserFullName"
      :expand="flapiSidebarIsExpand"
      @update:expand="updateFlapiSidebarIsExpand($event)"
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
const flapiSidebarIsExpand: Ref<boolean> = ref(localStorage.getItem('flapiSidebarIsExpand') === 'true')

/* COMPUTED */
const authenticatedUser: ComputedRef<User | null> = computed(() => useAuthStore().authenticatedUser)
const authenticatedUserFullName: ComputedRef<string> = computed(() => {
  if (authenticatedUser.value) {
    return `${authenticatedUser.value.firstname} ${authenticatedUser.value.lastname}`
  }
  return ''
})

/* METHODS */
/**
 * Update the sidebar expand state
 * @param {boolean} value - The new value for the sidebar expand state
 */
const updateFlapiSidebarIsExpand: (value: boolean) => void = (value: boolean): void => {
  flapiSidebarIsExpand.value = value
  localStorage.setItem('flapiSidebarIsExpand', String(value))
}
</script>
