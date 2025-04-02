<template>
  <FlapiBadge :backgroundColor="actionTypeColor">{{ actionTypeLabel }}</FlapiBadge>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { PropType, ComputedRef } from 'vue'
import { ApplicationEventLogActionTypeEnum } from '~~/src-core/api'

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
const actionTypeLabel: ComputedRef<string> = computed(() => {
  switch (props.actionType) {
    case ApplicationEventLogActionTypeEnum.Create:
      return 'Création'
    case ApplicationEventLogActionTypeEnum.Update:
      return 'Modification'
    case ApplicationEventLogActionTypeEnum.Delete:
      return 'Suppression'
    case ApplicationEventLogActionTypeEnum.Signin:
      return 'Connexion'
    case ApplicationEventLogActionTypeEnum.Signout:
      return 'Déconnexion'
    case ApplicationEventLogActionTypeEnum.Signup:
      return 'Inscription'
    case ApplicationEventLogActionTypeEnum.Invite:
      return 'Invitation'
    default:
      return 'Inconnu'
  }
})

const actionTypeColor: ComputedRef<string> = computed(() => {
  switch (props.actionType) {
    case ApplicationEventLogActionTypeEnum.Create:
      return '#CCFFEB' // menthe pastel (conservée)
    case ApplicationEventLogActionTypeEnum.Update:
      return '#FFEECC' // orange clair (conservée)
    case ApplicationEventLogActionTypeEnum.Delete:
      return '#FBD0D5' // rose doux (conservée)
    case ApplicationEventLogActionTypeEnum.Signin:
      return '#D0E1FF' // bleu lavande
    case ApplicationEventLogActionTypeEnum.Signout:
      return '#FFD6E0' // rose framboise
    case ApplicationEventLogActionTypeEnum.Signup:
      return '#E8FFB7' // vert anis
    case ApplicationEventLogActionTypeEnum.Invite:
      return '#D4F2FF' // bleu azur doux
    default:
      return '#F0F0F0' // gris très clair
  }
})
</script>
