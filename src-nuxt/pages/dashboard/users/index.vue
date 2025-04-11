<template>
  <div class="w-full overflow-x-hidden px-4 py-8">
    <div class="flex items-center justify-between gap-4">
      <!-- Gauche : Breadcrumb -->
      <div class="flex items-center gap-4">
        <!-- Section Historique -->
        <div class="flex items-center gap-2">
          <FlapiIcon color="white" :height="24" mode="stroke" name="Home" viewBox="0 0 24 24" :width="24" />
          <h3 class="text-xl font-semibold text-white">Historique</h3>
        </div>

        <!-- Séparateur -->
        <span class="text-xl text-white">/</span>

        <!-- Section Mon activité -->
        <div class="flex items-center gap-2">
          <FlapiIcon color="#BDB3FF" :height="24" mode="stroke" name="Users" viewBox="0 0 24 24" :width="24" />
          <h3 class="text-xl font-semibold text-primary-300">Mon activité</h3>
        </div>
      </div>
    </div>

    <div class="w-full max-w-[93vw]">
      <FlapiTable
        :fields="usersFields"
        :cardFields="usersCardFields"
        :items="usersFiltered"
        :load="!usersIsLoaded"
        v-model:searchTerms="usersSearchTerm"
        :switchToCardAt="1200"
        showSearchBar
      >
        <template #fullName="{ item }">
          <div v-if="item" class="flex items-center gap-2">
            <FlapiAvatar :name="UserHelper.getFullName(item as User)" :size="32" backgroundColor="#35424d" />
            <span class="font-semibold">
              {{ UserHelper.getFullName(item as User) }}
            </span>
          </div>
          <div v-else>-</div>
        </template>

        <template #role="{ item }">
          <div class="flex items-center gap-2">
            <FlapiUserRoleBadge :roleName="item.role.name" />
          </div>
        </template>
      </FlapiTable>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import { UsersApi } from '~~/src-core/api'
import type { User } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import type { FlapiTableCardField, FlapiTableField } from '#/core'
import { SearchUtil } from '~~/src-core/utils/SearchUtil'
import { UserHelper } from '~~/src-core/helpers/UserHelper'
import FlapiUserRoleBadge from '~/components/ui/badges/FlapiUserRoleBadge.vue'

// REFS
const usersSearchTerm: Ref<string> = ref('')
const usersIsLoaded: Ref<boolean> = ref(false)

// API CALL
const usersResponse: AxiosResponse<User[], any> = await UsersApi.getAllUsers()
usersIsLoaded.value = true
const users: User[] = usersResponse.data

// DATAS
const usersFields: FlapiTableField[] = [
  {
    key: 'fullName',
    label: 'Nom complet',
  },
  {
    key: 'role',
    label: 'Rôle',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'teams',
    label: 'Équipes',
  },
  {
    key: 'project_permissions',
    label: 'Permissions projet',
  },
]

const usersCardFields: FlapiTableCardField[] = [
  {
    key: 'fullName',
    label: 'Nom complet',
  },
  {
    key: 'role',
    label: 'Rôle',
  },
  {
    key: 'email',
    label: 'Email',
  },
  {
    key: 'teams',
    label: 'Équipes',
  },
  {
    key: 'project_permissions',
    label: 'Permissions projet',
  },
]

// COMPUTED
/**
 * Filter users based on the search term
 * @returns {User[]} Filtered users
 * @description This computed property filters the users based on the search term provided in the `usersSearchTerm` ref. It uses the `SearchUtil.filterBySearchText` method to filter the users based on specific fields.
 */
const usersFiltered: ComputedRef<User[]> = computed(() => {
  return SearchUtil.filterBySearchText<User>(users, usersSearchTerm.value, ['firstname', 'lastname', 'email'])
})
</script>
