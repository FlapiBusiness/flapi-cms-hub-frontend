<template>
  <div class="px-8 py-8">
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

      <!-- Droite : Search bar -->
      <div class="flex items-center pr-4">
        <FlapiSearchBar placeholder="Rechercher (Ctrl + E)" title="Search" />
      </div>
    </div>

    <!-- Table -->
    <div class="w-full">
      <FlapiTable
        :fields="applicationEventLogsFields"
        :items="applicationEventLogs"
        :load="!applicationEventLogsIsLoaded"
        showSearchBar
      >
        <template #project.application_name="{ item }">
          <div v-if="item.project" class="flex items-center gap-2">
            <FlapiAvatar :name="item.project.application_name" :size="32" backgroundColor="#35424d" />
            <span class="font-semibold">{{ item.project.application_name }}</span>
          </div>
          <div v-else>Aucun projet associé</div>
        </template>

        <template #action_type="{ item }">
          <div class="flex items-center gap-2">
            <FlapiLogActionBadge :actionType="item.action_type" />
          </div>
        </template>

        <template #created_at="{ item }">
          <span v-if="item.created_at" class="font-semibold">
            {{ DateService.stringToDayMonthYearHour(item.created_at) }}
          </span>
        </template>

        <template #user="{ item }">
          <div v-if="item.user" class="flex items-center gap-2">
            <FlapiAvatar :name="UserHelper.getFullName(item.user)" :size="32" backgroundColor="#35424d" />
            <span class="font-semibold">{{ UserHelper.getFullName(item.user) }}</span>
          </div>
        </template>
      </FlapiTable>
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
import type { FlapiTableField } from '@flapi/cms-designsystem/core'
import FlapiLogActionBadge from '~/components/ui/FlapiLogActionBadge.vue'
import { DateService } from '~~/src-core/services/DateService'
import { UserHelper } from '~~/src-core/helpers/UserHelper'

// REFS
const applicationEventLogsIsLoaded: Ref<boolean> = ref(false)
const applicationEventLogsAlreadyLoaded: Ref<boolean> = ref(false)
const applicationEventLogs: Ref<ApplicationEventLog[]> = ref(useApplicationEventLogStore().applicationEventLogs)

const applicationEventLogsFields: FlapiTableField[] = [
  {
    key: 'project.application_name',
    label: 'Nom du projet',
  },
  {
    key: 'action_type',
    label: 'Action',
  },
  {
    key: 'created_at',
    label: 'Date de création',
  },
  {
    key: 'user',
    label: 'Utilisateur',
  },
  {
    key: 'message',
    label: 'Message',
  },
]

// FETCH APPLICATION EVENT LOGS
onMounted(async () => {
  if (!applicationEventLogsAlreadyLoaded.value) {
    applicationEventLogsIsLoaded.value = false
    const applicationEventLogsResponse: AxiosResponse<ApplicationEventLog[], any> =
      await ApplicationeventlogsApi.getAllApplicationEventLogs()
    console.log('set applicationEventLogs', applicationEventLogsResponse.data)
    useApplicationEventLogStore().setApplicationEventLogs(applicationEventLogsResponse.data)
    applicationEventLogs.value = applicationEventLogsResponse.data
  }
  applicationEventLogsIsLoaded.value = true
  applicationEventLogsAlreadyLoaded.value = true
})
</script>
