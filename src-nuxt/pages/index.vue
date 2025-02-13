<template>
  <div class="px-8 py-8">
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
  { text: 'Applications', to: '/dashboard/apps' },
  { text: 'Loading Screen', to: '/loading-screen' },
  { text: 'Login', to: '/signin' },
  { text: 'Reset password', to: '/reset-password' },
  { text: 'Dashboard Settings App', to: '/dashboard/settings/app' },
  { text: 'Admin Settings App', to: 'admin/settings/app' },
  { text: 'Dashboard Settings User', to: '/dashboard/settings/user' },
  { text: 'Dashboard Setup App', to: '/dashboard/setup/app' },
  { text: 'Signup', to: '/signup' },
  { text: 'Admin Users', to: '/admin/users' },
  { text: 'Dashboard Users invite', to: '/dashboard/users/invite' },
  { text: 'Verify Account', to: '/verify-account' },
  { text: 'Logs', to: '/admin/logs' }, //2
]
</script>
