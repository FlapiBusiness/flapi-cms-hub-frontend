<template>
  <div class="h-screen bg-gray-700">
    <!-- Conteneur central -->
    <div class="px-8 py-8">
      <div class="flex items-center justify-between gap-4">
        <!-- Gauche : Breadcrumb -->
        <div class="flex items-center justify-between gap-4">
          <!-- Gauche : Breadcrumb -->
          <div class="flex items-center gap-3">
            <!-- Section Historique -->
            <div class="flex items-center gap-2">
              <FlapiIcon color="white" :height="20" mode="stroke" name="Clock" viewBox="0 0 24 24" :width="20" />
              <h3 class="text-lg font-semibold text-white">Historique</h3>
            </div>

            <!-- Séparateur -->
            <span class="text-lg text-white">/</span>

            <!-- Section Mon activité -->
            <div class="flex items-center gap-2">
              <FlapiIcon color="#BDB3FF" :height="20" mode="stroke" name="Activity" viewBox="0 0 24 24" :width="20" />
              <h3 class="text-lg font-semibold text-primary-300">Mon activité</h3>
            </div>
          </div>
        </div>

        <!-- Droite : Search bar -->
        <div class="flex items-center pr-4">
          <FlapiSearchBar placeholder="Rechercher (Ctrl + E)" title="Search" />
        </div>
      </div>

      <!-- Table -->
      <div class="w-full">
        <ApplicationEventLogsView :load="!applicationEventLogsIsLoaded" :applicationEventLogs="applicationEventLogs" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { ApplicationeventlogsApi } from '~~/src-core/api'
import type { ApplicationEventLog } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import { useAuthStore } from '~/stores/authStore'
import { useUserApplicationEventLogStore } from '~/stores/userApplicationEventLogStore'
import ApplicationEventLogsView from '~/components/views/ApplicationEventLogsView.vue'

// REFS
const applicationEventLogsIsLoaded: Ref<boolean> = ref(false)
const applicationEventLogsAlreadyLoaded: Ref<boolean> = ref(false)
let applicationEventLogs: Ref<ApplicationEventLog[]> = ref(useApplicationEventLogStore().applicationEventLogs)
const userId: number | undefined = useAuthStore().$state.authenticatedUser?.id

// FETCH APPLICATION EVENT LOGS FOR THE USER
onMounted(async () => {
  if (!applicationEventLogsAlreadyLoaded.value) {
    applicationEventLogsIsLoaded.value = false

    if (!userId) {
      console.error('User ID is not defined')
      return
    }

    const applicationEventLogsResponse: AxiosResponse<ApplicationEventLog[], any> =
      await ApplicationeventlogsApi.getApplicationEventLogsByUserId(userId)

    console.log('set userApplicationEventLogs', applicationEventLogsResponse.data)
    useUserApplicationEventLogStore().setUserApplicationEventLogs(applicationEventLogsResponse.data)
    applicationEventLogs.value = applicationEventLogsResponse.data
  }

  applicationEventLogsIsLoaded.value = true
  applicationEventLogsAlreadyLoaded.value = true
})
</script>
