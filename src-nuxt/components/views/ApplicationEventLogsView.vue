<template>
  <div class="w-full max-w-[93vw]">
    <FlapiTable
      :fields="applicationEventLogsViewFields"
      :cardFields="applicationEventLogsViewCardFields"
      :items="applicationEventLogsFiltered"
      :load="load"
      v-model:searchTerms="applicationEventLogsViewSearchTerm"
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
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import { DateService } from '~~/src-core/services/DateService'
import { UserHelper } from '~~/src-core/helpers/UserHelper'
import { SearchUtil } from '~~/src-core/utils/SearchUtil'
import FlapiLogActionBadge from '@/components/ui/badges/FlapiLogActionBadge.vue'
import type { PropType, ComputedRef } from 'vue'
import type { FlapiTableField, FlapiTableCardField } from '@flapi/cms-designsystem/core'
import type { ApplicationEventLog } from '~~/src-core/api'
// TYPES
/**
 * Type definitions for the FlapiLogActionBadge component props
 * params {ApplicationEventLogActionTypeEnum} actionType - The action type of the log
 */
type FlapiApplicationEventLogViewActionProps = {
  load: boolean
  applicationEventLogs: ApplicationEventLog[]
}
// COMPUTED
/**
 * Filter application event logs based on the search term
 * @returns {ApplicationEventLog[]} Filtered application event logs.
 * @description This computed property filters the application event logs based on the search term provided in the `applicationEventLogsSearchTerm` ref. It uses the `SearchUtil.filterBySearchText` method to filter the logs based on specific fields.
 */
const applicationEventLogsFiltered: ComputedRef<ApplicationEventLog[]> = computed(() => {
  return SearchUtil.filterBySearchText<ApplicationEventLog>(
    applicationEventLogsView.value,
    applicationEventLogsViewSearchTerm.value,
    ['project.application_name', 'action_type', 'user.email', 'user.firstname', 'user.lastname', 'message'],
  )
})

const props: FlapiApplicationEventLogViewActionProps = defineProps({
  load: {
    type: Boolean,
    required: true,
  },
  applicationEventLogs: {
    type: Object as PropType<ApplicationEventLog[]>,
    required: true,
  },
})

const applicationEventLogsView: Ref<ApplicationEventLog[]> = ref(props.applicationEventLogs)
const applicationEventLogsViewSearchTerm: Ref<string> = ref('')

// DATAS
const applicationEventLogsViewFields: FlapiTableField[] = [
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

const applicationEventLogsViewCardFields: FlapiTableCardField[] = [
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

onMounted(() => {
  applicationEventLogsView.value = props.applicationEventLogs
})
watch(
  () => props.applicationEventLogs,
  (newValue: ApplicationEventLog[]) => {
    applicationEventLogsView.value = newValue
  },
  { immediate: true },
)
</script>
