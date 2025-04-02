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
      <FlapiTable
        :fields="applicationEventLogsFields"
        :cardFields="applicationEventLogsCardFields"
        :items="applicationEventLogsFiltered"
        :load="!applicationEventLogsIsLoaded"
        v-model:searchTerms="applicationEventLogsSearchTerm"
        :switchToCardAt="1200"
        showSearchBar
      >
        <template #card-header="{ item }">
          <div class="flex items-center gap-2 text-base font-medium text-light-400">
            <FlapiAvatar :name="UserHelper.getFullName(item.user)" :size="32" backgroundColor="#35424d" />
            <span class="font-semibold">{{ UserHelper.getFullName(item.user) }}</span>
          </div>
        </template>

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
import { ref, onMounted, computed } from 'vue'
import type { Ref, ComputedRef } from 'vue'
import { ApplicationeventlogsApi } from '~~/src-core/api'
import type { ApplicationEventLog } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import { useApplicationEventLogStore } from '~/stores/applicationEventLogStore'
import type { FlapiTableField, FlapiTableCardField } from '@flapi/cms-designsystem/core'
import FlapiLogActionBadge from '~/components/ui/FlapiLogActionBadge.vue'
import { DateService } from '~~/src-core/services/DateService'
import { UserHelper } from '~~/src-core/helpers/UserHelper'
import { SearchUtil } from '~~/src-core/utils/SearchUtil'

// REFS
const applicationEventLogsIsLoaded: Ref<boolean> = ref(false)
const applicationEventLogsAlreadyLoaded: Ref<boolean> = ref(false)
const applicationEventLogs: Ref<ApplicationEventLog[]> = ref(useApplicationEventLogStore().applicationEventLogs)
const applicationEventLogsSearchTerm: Ref<string> = ref('')

// COMPUTED
/**
 * Filter application event logs based on the search term
 * @returns {ApplicationEventLog[]} Filtered application event logs.
 * @description This computed property filters the application event logs based on the search term provided in the `applicationEventLogsSearchTerm` ref. It uses the `SearchUtil.filterBySearchText` method to filter the logs based on specific fields.
 */
const applicationEventLogsFiltered: ComputedRef<ApplicationEventLog[]> = computed(() => {
  return SearchUtil.filterBySearchText<ApplicationEventLog>(
    applicationEventLogs.value,
    applicationEventLogsSearchTerm.value,
    ['project.application_name', 'action_type', 'user.email', 'user.firstname', 'user.lastname', 'message'],
  )
})

// DATAS
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

const applicationEventLogsCardFields: FlapiTableCardField[] = [
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
    key: 'message',
    label: 'Message',
    layout: 'column',
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
