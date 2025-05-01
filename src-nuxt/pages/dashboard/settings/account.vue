<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div v-if="authenticatedUser" class="grid w-full max-w-7xl gap-4">
      <p class="text-xl font-semibold text-light-400">Photo de profil</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-xl font-semibold text-light-400">
        Informations de <span class="text-primary-400">{{ authenticatedUser.firstname }}</span>
        <span>&nbsp;</span>
        <span class="text-primary-400">{{ authenticatedUser.lastname }}</span>
      </p>
      <FlapiFormCard :buttonLoading="buttonLoading" @confirm="updateUser">
        <UpdateUserForm :user="userPayload" @update:user="userPayload = $event" />
      </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts">
/**
 * Type definitions for the userInfos object
 * @type {userInfos}
 */
type userInfos = {
  firstName: string
  lastName: string
}
</script>
<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import FlapiCardDownloadPicture from '@/components/cards/FlapiCardDownloadPicture.vue'
import UpdateUserForm from '~/components/forms/UpdateUserForm.vue'
import type { UpdateUserPayload, User } from '~~/src-core/api'
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import { UserApi } from '~~/src-core/api'
import { useAuthStore } from '~/stores/authStore'
import type { AxiosResponse } from 'axios'

// COMPUTED
const authenticatedUser: ComputedRef<User | null> = computed(() => useAuthStore().authenticatedUser)
// REFS
const buttonLoading: Ref<boolean> = ref(false)
const userPayload: Ref<UpdateUserPayload> = ref({
  firstname: authenticatedUser.value?.firstname,
  lastname: authenticatedUser.value?.lastname,
  email: authenticatedUser.value?.email,
  password: undefined,
  password_confirmation: undefined,
})

// METHODS
/**
 * Update the user
 * @returns {Promise<void>}
 */
const updateUser: () => Promise<void> = async (): Promise<void> => {
  if (!authenticatedUser.value) {
    throw new Error('Not authenticated')
  }
  buttonLoading.value = true
  const updateUserResponse: AxiosResponse<User, any> = await UserApi.updateUser(
    authenticatedUser.value.id,
    userPayload.value,
  )
  useAuthStore().setAuthenticatedUser(updateUserResponse.data)
  buttonLoading.value = false
}
</script>
