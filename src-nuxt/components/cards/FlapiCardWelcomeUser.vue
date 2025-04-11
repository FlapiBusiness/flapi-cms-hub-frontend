<template>
  <div class="flex w-full flex-row gap-4 rounded-lg border border-gray-300 bg-gray-500 p-4">
    <FlapiAvatar :name="userFullName" :size="60" backgroundColor="#35424d" />
    <div class="flex flex-col items-start justify-center gap-2">
      <h2 class="text-lg font-semibold text-light-400">Hey {{ userFullName }} !</h2>
      <p class="text-sm font-medium text-light-400">
        Bienvenue sur le projet <b>{{ project.application_name }}</b> !<br />
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from 'vue'
import type { PropType, ComputedRef } from 'vue'
import type { User, Project } from '~~/src-core/api'
import { UserHelper } from '~~/src-core/helpers/UserHelper'

/**
 * Type definitions for the flapi card welcome component
 * @type {FlapiCardWelcomeProps}
 * @property {User} user - The user object
 * @property {Project} project - The project object
 */
export type FlapiCardWelcomeProps = {
  user: User
  project: Project
}

// PROPS
const props: FlapiCardWelcomeProps = defineProps({
  user: {
    type: Object as PropType<User>,
    required: true,
  },
  project: {
    type: Object as PropType<Project>,
    required: true,
  },
})

// COMPUTED
/**
 * Computed property to get the first name of the user
 * @returns {string} - The first name of the user
 */
const userFullName: ComputedRef<string> = computed(() => {
  return UserHelper.getFullName(props.user)
})
</script>
