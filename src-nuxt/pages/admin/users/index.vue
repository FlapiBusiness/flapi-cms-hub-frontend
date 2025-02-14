<template>
  <div class="flex flex-col gap-12 p-8">
    <div class="flex items-center justify-center">
      <FlapiSearchBar placeholder="Rechercher (Ctrl + E)" title="Search" v-model:value="search" />
    </div>

    <div class="flex w-full items-center justify-end gap-4">
      <div class="flex max-w-40 items-center justify-center gap-3">
        <p class="text-center text-base text-light-400">Max</p>
        <FlapiInput placeholder="25" class="w-full max-w-32" />
      </div>
      <div class="flex w-full max-w-md items-center justify-center">
        <p class="w-32 text-base text-light-400">Trier par</p>
        <FlapiSelect :options="options" class="w-full" />
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-8">
      <FlapiUserCard
        v-for="user in users"
        :key="user.id"
        :id="user.id"
        :picture="user.picture"
        :lastNames="user.lastName"
        :firstName="user.firstName"
        :email="user.email"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from '~/stores/userStore'
import type { User } from '~/stores/userStore'
import { ref } from 'vue'
import type { Ref } from 'vue'

/**
 * Type definitions for the SelectOption type
 * @type {SelectOption}
 * @property {string} label - The label of the option
 * @property {number | string} value - The value of the option
 */
export type SelectOption = {
  label: string
  value: number | string
}

<script lang="ts" setup>
import { useUserStore } from '~/stores/userStore'
import type { User } from '~/stores/userStore'
import { ref } from 'vue'
import type { Ref } from 'vue'

const search: Ref<string> = ref('')
const options: SelectOption[] = [
  { label: 'Nom', value: 'lastName' },
  { label: 'Prénom', value: 'firstName' },
  { label: 'Email', value: 'email' },
]

const userStore: ReturnType<typeof useUserStore> = useUserStore()
await userStore.fetchUsers()
const users: User[] = userStore.users
</script>
