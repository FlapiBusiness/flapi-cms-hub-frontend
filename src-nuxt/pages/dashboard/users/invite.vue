<template>
  <div class="flex items-center justify-center">
    <div class="flex max-w-3xl flex-col gap-8">
      <h1 class="text-4xl font-semibold text-light-400">Invitez les membres de votre équipe</h1>
      <p class="text-base text-light-700">
        Invitez un ou plusieurs membres de votre équipe à votre application. Vous pouvez attribuer le rôle de
        l’utilisateur.
      </p>

      <InviteForm
        :load="loadButton"
        class="container-sm"
        :emails="emails"
        @update:emails="emails = $event"
        @submit="inviteUsers"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import InviteForm from '~/components/forms/InviteForm.vue'
import { ref } from 'vue'
// import { useSearchStore } from '@/stores/search.store'
/*REFS*/
const emails: Ref<string[]> = ref([''])
const loadButton: Ref<boolean> = ref(false)

/**
 * Invite users to the search
 * @returns {Promise<void>}
 * @throws {Error}
 */
const inviteUsers: () => Promise<void> = async () => {
  loadButton.value = true
  // await searchStore.inviteUsers(emails.value.filter((email: string) => email !== ''))
  loadButton.value = false
  emails.value = ['']
  await Promise.resolve()
}
</script>
