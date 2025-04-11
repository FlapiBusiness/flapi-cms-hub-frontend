<template>
  <FlapiBadge :backgroundColor="actionTypeColor">{{ actionTypeLabel }}</FlapiBadge>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { PropType, ComputedRef } from 'vue'
import type { UserRoleNameEnum } from '~~/src-core/api'
import { UserHelper } from '~~/src-core/helpers/UserHelper'

// TYPES
/**
 * Type definitions for the FlapiUserRoleBadge component props
 * params {UserRoleNameEnum} actionType - The name of the user role
 */
type FlapiUserRoleBadgeProps = {
  roleName: UserRoleNameEnum
}

// PROPS
const props: FlapiUserRoleBadgeProps = defineProps({
  roleName: {
    type: String as PropType<UserRoleNameEnum>,
    required: true,
  },
})

// COMPUTED
const actionTypeLabel: ComputedRef<string> = computed(() => UserHelper.getRoleLabel(props.roleName))

const actionTypeColor: ComputedRef<string> = computed(() => UserHelper.getRoleColor(props.roleName))
</script>
