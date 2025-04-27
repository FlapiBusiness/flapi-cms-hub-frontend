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
