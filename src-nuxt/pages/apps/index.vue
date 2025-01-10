<template>
  <div>
    <div class="flex flex-col items-center pt-72">
      <p class="mb-8 text-center text-4xl text-light-400">Choisir votre application</p>
      <div class="w-full max-w-xs">
        <FlapiButton class="w-full" type="submit">
          <p class="font-medium text-light-400">Nouvelle application</p>
        </FlapiButton>
      </div>
      <div
        class="mt-8 grid w-full max-w-6xl grid-cols-1 justify-items-center gap-4 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <FlapiAppCard v-for="app in applications" :key="app.id" :title="app.title" :picture="app.picture" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiButton from '@/components/core/FlapiButton.vue'
import { useApplicationStore } from '~/stores/applicationStore'
import type { Application } from '~/stores/applicationStore'
import FlapiAppCard from '~/components/cards/FlapiAppCard.vue'

const applicationStore: ReturnType<typeof useApplicationStore> = useApplicationStore()
await applicationStore.fetchApplications()
const applications: Application[] = applicationStore.applications

// const applications = applicationStore.applications
</script>
