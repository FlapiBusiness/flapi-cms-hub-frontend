<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-700">
    <div class="flex flex-col items-center justify-center gap-8 px-3 pt-10">
      <Breadcrumb :items="breadcrumbs" class="mb-4" />
      <h1 class="semi-blod text-4xl text-light-400">Invitez les membres de votre équipe</h1>
      <p class="text-light-700">
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

<script lang="ts">
/**
 * Invite users to the search
 * @returns {Promise<void>}
 * @param {string} text - The text to display
 * @param {string} icon - The icon to display
 * @param {object} to - The route to redirect to
 * @param {boolean} active - The active state of the breadcrumb
 */
export type BreadcrumbItem = {
  text: string
  icon: string
  to?: { name: string; id?: string }
  active?: boolean
}
</script>

<script lang="ts" setup>
import InviteForm from '@/components/forms/InviteForm.vue'
import { ref } from 'vue'
// import { useSearchStore } from '@/stores/search.store'
/*REFS*/
const emails: Ref<string[]> = ref([''])
const loadButton: Ref<boolean> = ref(false)

/*STORE*/
// const searchStore = useSearchStore()

/*DATA*/
const breadcrumbs: BreadcrumbItem[] = [
  {
    text: 'Propriétés',
    icon: 'home',
    // to: { name: 'properties', id: searchStore.currentSearch?.id },
  },
  {
    text: 'Invitations',
    icon: 'mail',
    active: true,
  },
]

/*METAS*/

/*API*/

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
