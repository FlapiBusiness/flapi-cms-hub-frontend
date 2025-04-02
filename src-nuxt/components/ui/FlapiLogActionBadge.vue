<template>
  <FlapiBadge :backgroundColor="actionTypeColor">{{ actionTypeLabel }}</FlapiBadge>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { PropType, ComputedRef } from 'vue'
import type { ApplicationEventLogActionTypeEnum } from '~~/src-core/api'
import { ApplicationEventLogFactory } from '~~/src-core/helpers/ApplicationEventLogFactory'

// TYPES
/**
 * Type definitions for the FlapiLogActionBadge component props
 * params {ApplicationEventLogActionTypeEnum} actionType - The action type of the log
 */
type FlapiLogActionBadgeProps = {
  actionType: ApplicationEventLogActionTypeEnum
}

// PROPS
const props: FlapiLogActionBadgeProps = defineProps({
  actionType: {
    type: String as PropType<ApplicationEventLogActionTypeEnum>,
    required: true,
  },
})

// COMPUTED
const actionTypeLabel: ComputedRef<string> = computed(() =>
  ApplicationEventLogFactory.getApplicationEventLogLabel(props.actionType),
)

const actionTypeColor: ComputedRef<string> = computed(() =>
  ApplicationEventLogFactory.getApplicationEventLogColor(props.actionType),
)
</script>
