<template>
  <div class="grid w-full grid-cols-2 gap-3">
    <FlapiInput
      :value="props.team.name"
      @update:value="(value) => emit('update:team', { ...team, name: value.toString() })"
      label="Nom de l'équipe"
      placeholder="Team dev"
    />
    <FlapiInput
      :value="props.team.description"
      @update:value="(value) => emit('update:team', { ...team, description: value.toString() })"
      label="Description de l'équipe"
      placeholder="Equipe de développement"
    />
    <div class="col-span-2 w-full max-w-[93vw]">
      <FlapiLabel id="team-members">Membres de l'équipe</FlapiLabel>
      <InviteForm class="container-sm" :emails="emails" @update:emails="emails = $event" />
    </div>
    <div class="col-span-2 mb-4 flex w-full flex-col gap-6">
      <div class="flex flex-row items-center justify-between">
        <FlapiLabel id="team-projects">Projets rattachés</FlapiLabel>
        <FlapiButton>Ajouter un projet</FlapiButton>
      </div>
      <div class="grid w-full max-w-6xl grid-cols-1 justify-items-center gap-4 sm:grid-cols-2 md:grid-cols-3">
        <FlapiProjectCard v-for="project in props.team.projects" :key="project.id" :title="project.application_name" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, type Ref } from 'vue'
import type { PropType } from 'vue'
import type { Team } from '~~/src-core/api'
import FlapiProjectCard from '~/components/cards/FlapiProjectCard.vue'
import InviteForm from '~/components/forms/InviteForm.vue'
//import type { User } from '~~/src-core/api'
//const users: Ref<User[]> = ref([])

const emails: Ref<string[]> = ref([''])

/**
 * Type definitions for the CreateProjectForm component props
 */
export type TeamFormProps = {
  team: Team
}

/**
 * Type definitions for the SelectOption type
 */
const props: TeamFormProps = defineProps({
  team: {
    type: Object as PropType<Team>,
    required: true,
  },
})

/*EMIT*/
const emit: (event: 'update:team', project: Team) => void = defineEmits<{
  (event: 'update:team', team: Team): void
}>()
</script>
