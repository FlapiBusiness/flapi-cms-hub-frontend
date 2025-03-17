<template>
  <div class="flex h-full min-h-screen flex-col bg-gray-700 p-8">
    <FlapiCardWelcomeUser
      :picture="'https://via.placeholder.com/120'"
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
import { ref } from 'vue'
import type { User } from '~~/src-core/api'

const authenticatedUser: User | null = useAuthStore().authenticatedUser

const incrementLoading: Ref<number> = ref(0)

const links: { text: string; to: string }[] = [
  { text: 'Admin Settings App', to: 'admin/settings/app' },
  { text: 'Admin Users', to: '/admin/users' },
  { text: 'Admin Logs', to: '/admin/logs' },
]

// TODO: Remove this interval and use the real loading value
setInterval(
  () => {
    incrementLoading.value += Math.floor(Math.random() * 10)
    if (incrementLoading.value >= 100) {
      incrementLoading.value = 0
    }
  },
  Math.floor(Math.random() * 1000),
)
</script>
