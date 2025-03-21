<template>
  <div class="flex h-full min-h-screen flex-col bg-gray-700 p-8">
    <FlapiCardWelcomeUser
      :firstName="authenticatedUser?.firstname || ''"
      :lastName="authenticatedUser?.lastname || ''"
      :email="authenticatedUser?.email || ''"
    />
    <div class="grid gap-3 p-4">
      <FlapiLink v-for="(link, i) in links" :key="`link-${i}-${link.to}`" :link="link.to">
        {{ link.text }}
      </FlapiLink>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiCardWelcomeUser from '@/components/cards/FlapiCardWelcomeUser.vue'
import type { User } from '~~/src-core/api'

const authenticatedUser: User | null = useAuthStore().authenticatedUser

const links: { text: string; to: string }[] = [
  { text: 'Applications', to: '/dashboard/projects' },
  { text: 'Dashboard Settings App', to: '/dashboard/settings/app' },
  { text: 'Dashboard Settings User', to: '/dashboard/settings/user' },
  { text: 'Dashboard Setup App', to: '/dashboard/setup/app' },
  { text: 'Dashboard Users invite', to: '/dashboard/users/invite' },
  { text: 'Dashboard Logs', to: '/dashboard/logs' },
]
</script>
