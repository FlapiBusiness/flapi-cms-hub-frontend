<template>
  <div class="flex min-h-screen flex-col bg-gray-700">
    <div class="mt-8 flex flex-row items-center justify-center">
      <FlapiInput v-model="search" placeholder="Rechercher" />
      <FlapiButton
        type="submit"
        backgroundColor="#222B39"
        backgroundHoverColor="#2D3748"
        class="flex items-center justify-center"
      >
        <FlapiIcon name="search" />
      </FlapiButton>
    </div>
    <div class="mt-8 flex w-full justify-end">
      <div class="mx-4 flex w-full max-w-3xl flex-row items-center gap-4">
        <p class="text-center text-base text-light-400">Max</p>
        <FlapiInput placeholder="25" class="w-full max-w-32" />
        <p class="w-32 text-base text-light-400">Trier par</p>
        <FlapiSelect :options="options" class="w-full" />
        <FlapiButton backgroundColor="#222B39" backgroundHoverColor="#2D3748">
          <FlapiIcon name="account" />
        </FlapiButton>
      </div>
    </div>
    <div
      class="m-8 grid grid-cols-2 justify-items-center gap-8 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-9"
    >
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
<script lang="ts">
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
</script>

<script lang="ts" setup>
import FlapiUserCard from '@/components/cards/FlapiUserCard.vue'
import FlapiInput from '@/components/core/FlapiInput.vue'
import FlapiButton from '@/components/core/FlapiButton.vue'
import FlapiIcon from '~/components/ui/FlapiIcon.vue'
import FlapiSelect from '@/components/core/FlapiSelect.vue'
import { useUserStore } from '~/stores/userStore'
import type { User } from '~/stores/userStore'
import { ref } from 'vue'

const search: ReturnType<typeof ref> = ref('')
const options: SelectOption[] = [
  { label: 'Nom', value: 'lastName' },
  { label: 'Prénom', value: 'firstName' },
  { label: 'Email', value: 'email' },
]

const userStore: ReturnType<typeof useUserStore> = useUserStore()
await userStore.fetchUsers()
const users: User[] = userStore.users
</script>
