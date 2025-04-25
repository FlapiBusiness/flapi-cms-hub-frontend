<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] overflow-x-hidden">
    <FlapiSidebar
      :avatar="undefined"
      :items="items"
      :username="authenticatedUserFullName"
      :expand="flapiSidebarIsExpand"
      :activePath="route.path"
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
import type { RouteLocationNormalizedGeneric } from 'vue-router'
import { useRoute } from 'vue-router'

// HOOKS
const route: RouteLocationNormalizedGeneric = useRoute()

// DATAS
const items: FlapiSidebarItem[] = [
  {
    text: 'Tableau de bord',
    icon: 'Home',
    to: '/dashboard',
  },
  {
    text: 'Admin Tableau de bord',
    icon: 'Home',
    to: '/admin',
  },
  {
    text: 'Utilisateurs',
    icon: 'User',
    to: '/dashboard/users',
    subItems: [
      { text: 'Permissions', icon: 'Lock', to: '/dashboard/users/permissions' },
      { text: 'Tous les utilisateurs', icon: 'Users', to: '/dashboard/users' },
      { text: 'Administrateurs', icon: 'Shield', to: '/users/admins' },
      { text: 'Managers', icon: 'BriefCase', to: '/users/managers' },
      { text: 'Marketing', icon: 'BarChart', to: '/users/marketing' },
      { text: 'Support', icon: 'Headphones', to: '/users/support' },
      { text: 'Commerciaux', icon: 'ShoppingBag', to: '/users/commercial' },
      { text: 'Sessions utilisateurs', icon: 'Activity', to: '/users/sessions' },
    ],
  },
  {
    text: 'Équipes',
    icon: 'Users',
    to: '/teams',
    subItems: [
      { text: 'Créer une équipe', icon: 'PlusCircle', to: '/teams/add' },
      { text: 'Inviter des utilisateurs', icon: 'UserPlus', to: '/teams/invite' },
    ],
  },
  {
    text: 'Applications',
    icon: 'Grid',
    to: '/applications',
  },
  {
    text: 'État santé applications',
    icon: 'Activity',
    to: '/apps-health-checks',
  },
  {
    text: 'Historique',
    icon: 'Clock',
    to: '/history',
    subItems: [
      { text: "Tout l'historique", icon: 'List', to: '/history/all' },
      { text: 'Mon activité', icon: 'Activity', to: '/history/me' },
      { text: 'Authentification', icon: 'Login', to: '/history/auth' },
      { text: 'Ajouts', icon: 'PlusCircle', to: '/history/create' },
      { text: 'Modifications', icon: 'Edit', to: '/history/update' },
      { text: 'Suppressions', icon: 'Trash2', to: '/history/delete' },
    ],
  },
  {
    text: 'Base de données',
    icon: 'Database',
    to: '/database',
  },
  {
    text: 'Paramètres',
    icon: 'Settings',
    to: '/settings',
    subItems: [
      { text: 'Application', icon: 'Grid', to: '/settings/app' },
      { text: 'Mon compte', icon: 'User', to: '/settings/account' },
    ],
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
