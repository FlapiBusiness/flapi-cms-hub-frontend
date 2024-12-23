<template>
  <div class="h-screen w-full bg-gray-700 px-8 py-8">
    <div class="grid gap-3">
      <FlapiLink v-for="(link, i) in links" :key="`link-${i}-${link.to}`" :link="link.to">
        {{ link.text }}
      </FlapiLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlapiLink from '@/components/core/FlapiLink.vue'
const links: { text: string; to: string }[] = [
  { text: 'Applications', to: '/apps' },
  { text: 'Loading Screen', to: '/loading-screen' },
  { text: 'Login', to: '/login' },
  { text: 'Reset password', to: '/reset-password' },
  { text: 'Settings App', to: '/settings/app' },
  { text: 'Settings User', to: '/settings/user' },
  { text: 'Setup App', to: '/setup/app' },
  { text: 'Signup', to: '/signup' },
  { text: 'Users', to: '/users' },
  { text: 'Users invite', to: '/users/invite' },
  { text: 'Verify Account', to: '/verify-account' },
  { text: 'Logs', to: '/logs' },
]
</script>
