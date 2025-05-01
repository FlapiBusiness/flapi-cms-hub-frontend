<template>
  <div class="w-full overflow-x-hidden px-4 py-8">
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
          <FlapiIcon color="#BDB3FF" :height="20" mode="stroke" name="Login" viewBox="0 0 24 24" :width="20" />
          <h3 class="text-lg font-semibold text-primary-300">Authentification</h3>
        </div>
      </div>
    </div>

    <!-- Table -->
    <div class="w-full max-w-[93vw]">
      <ApplicationEventLogsView :load="!applicationEventLogsIsLoaded" :applicationEventLogs="applicationEventLogs" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { ApplicationeventlogsApi } from '~~/src-core/api'
import type { ApplicationEventLog } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import { useApplicationEventLogStore } from '~/stores/applicationEventLogStore'
import ApplicationEventLogsView from '~/components/views/ApplicationEventLogsView.vue'

// REFS
const applicationEventLogsIsLoaded: Ref<boolean> = ref(false)
const applicationEventLogsAlreadyLoaded: Ref<boolean> = ref(false)
let applicationEventLogs: Ref<ApplicationEventLog[]> = ref(useApplicationEventLogStore().applicationEventLogs)

// FETCH APPLICATION EVENT LOGS
onMounted(async () => {
  console.log('isLoaded', applicationEventLogsIsLoaded.value)
  if (!applicationEventLogsAlreadyLoaded.value) {
    applicationEventLogsIsLoaded.value = false
    const applicationEventLogsResponse: AxiosResponse<ApplicationEventLog[], any> =
      await ApplicationeventlogsApi.getAllApplicationEventLogs()
    console.log('set applicationEventLogs', applicationEventLogsResponse.data)
    useApplicationEventLogStore().setApplicationEventLogs(applicationEventLogsResponse.data)
    applicationEventLogs.value = applicationEventLogsResponse.data
    console.log('isLoaded', applicationEventLogsIsLoaded.value)
  }
  applicationEventLogsIsLoaded.value = true
  applicationEventLogsAlreadyLoaded.value = true
  console.log('isLoaded', applicationEventLogsIsLoaded.value)
})
</script>
