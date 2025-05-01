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
    text: 'Utilisateurs',
    icon: 'User',
    to: '/dashboard/users',
    subItems: [
      { text: 'Permissions', icon: 'Lock', to: '/dashboard/users/permissions' },
      { text: 'Tous les utilisateurs', icon: 'Users', to: '/dashboard/users' },
      { text: 'Administrateurs', icon: 'Shield', to: '/dashboard/users/admins' },
      { text: 'Managers', icon: 'BriefCase', to: '/dashboard/users/managers' },
      { text: 'Marketing', icon: 'BarChart', to: '/dashboard/users/marketing' },
      { text: 'Support', icon: 'Headphones', to: '/dashboard/users/support' },
      { text: 'Commerciaux', icon: 'ShoppingBag', to: '/dashboard/users/commercial' },
      { text: 'Sessions utilisateurs', icon: 'Activity', to: '/dashboard/users/sessions' },
    ],
  },
  {
    text: 'Équipes',
    icon: 'Users',
    to: '/dashboard/teams',
    subItems: [
      { text: 'Créer une équipe', icon: 'PlusCircle', to: '/dashboard/teams/add' },
      { text: 'Inviter des utilisateurs', icon: 'UserPlus', to: '/dashboard/teams/invite' },
    ],
  },
  {
    text: 'Applications',
    icon: 'Grid',
    to: '/dashboard/projects',
    subItems: [
      { text: 'Liste des applications', icon: 'List', to: '/dashboard/projects' },
      { text: 'Créer une application', icon: 'PlusCircle', to: '/dashboard/setup/project' },
    ],
  },
  {
    text: 'État santé applications',
    icon: 'Activity',
    to: '/apps-health-checks',
  },
  {
    text: 'Historique',
    icon: 'Clock',
    to: '/dashboard/history',
    subItems: [
      { text: "Tout l'historique", icon: 'List', to: '/dashboard/history' },
      { text: 'Mon activité', icon: 'Activity', to: '/dashboard/history/me' },
      { text: 'Authentification', icon: 'Login', to: '/dashboard/history/auth' },
      { text: 'Ajouts', icon: 'PlusCircle', to: '/dashboard/history/create' },
      { text: 'Modifications', icon: 'Edit', to: '/dashboard/history/update' },
      { text: 'Suppressions', icon: 'Trash2', to: '/dashboard/history/delete' },
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
    subItems: [
      { text: 'Application', icon: 'Grid', to: '/dashboard/settings/app' },
      { text: 'Mon compte', icon: 'User', to: '/dashboard/settings/account' },
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
