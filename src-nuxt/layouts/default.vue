<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] bg-gray-700">
    <FlapiSidebar
      :avatar="user.avatar"
      :items="items"
      :username="user.username"
      v-model:expand="flapiSidebarIsExpand"
    />
    <div class="px-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlapiSidebar from '~/components/flapi/FlapiSidebar/FlapiSidebar.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { FlapiSidebarItem } from '~/components/flapi/FlapiSidebar/FlapiSidebar.vue'

/* DATAS */
const user: { username: string; avatar: string | undefined } = {
  username: 'John Doe',
  avatar: undefined,
}

const items: FlapiSidebarItem[] = [
  {
    text: 'Accueil',
    icon: 'Home',
    to: '/',
  },
  {
    text: 'État santé applications',
    icon: 'Activity',
    to: '/apps-health-checks',
  },
]

/*  REFS */
const flapiSidebarIsExpand: Ref<boolean> = ref(true)
</script>
