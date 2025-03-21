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

    <div
      v-if="filteredUsers.length > 0"
      class="grid grid-cols-2 gap-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8"
    >
      <FlapiUserCard
        v-for="user in filteredUsers"
        :key="user.id"
        :id="user.id"
        :lastNames="user.lastname"
        :firstName="user.firstname"
        :email="user.email"
      />
    </div>
    <p v-else class="text-lg text-center text-light-400">Aucun utilisateur trouvé</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import FlapiUserCard from '~/components/cards/FlapiUserCard.vue'
import { UsersApi } from '~~/src-core/api'
import type { User } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'

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

const search: Ref<string> = ref('')
const options: SelectOption[] = [
  { label: 'Nom', value: 'lastName' },
  { label: 'Prénom', value: 'firstName' },
  { label: 'Email', value: 'email' },
]

const usersResponse: AxiosResponse<User[], any> = await UsersApi.getAllUsers()
const users: User[] = usersResponse.data

// COMPUTED
const filteredUsers: Ref<User[]> = computed(() => {
  return users.filter((user: User) => {
    return (
      user.lastname.toLowerCase().includes(search.value.toLowerCase()) ||
      user.firstname.toLowerCase().includes(search.value.toLowerCase()) ||
      user.email.toLowerCase().includes(search.value.toLowerCase())
    )
  })
})
</script>
