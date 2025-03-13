<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] bg-gray-700">
    <FlapiSidebar
      :avatar="user.avatar"
      :items="items"
      :username="user.firstname"
      v-model:expand="flapiSidebarIsExpand"
    />
    <div class="px-4">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { FlapiSidebarItem } from '@flapi/cms-designsystem/core'
import { AuthApi } from '~~/src-core/api'
import type { User } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'

const userResponse: AxiosResponse<User, any> = await AuthApi.getAuthenticatedUser()
const user: User = userResponse.data
console.log({ user })

/* DATAS */
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
</script>
