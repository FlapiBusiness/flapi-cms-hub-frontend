<template>
  <div v-if="ownerIsLoaded" class="grid w-full grid-cols-2 gap-3">
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
    <FlapiInput :value="ownerName" label="Créateur de l'équipe" />
    <div class="col-span-2 w-full max-w-[93vw]">
      <FlapiLabel id="team-members">Membres de l'équipe</FlapiLabel>
      <div>
        <FlapiButton @click="goToInvitePage">Ajouter un membre</FlapiButton>
        <FlapiTable
          :fields="usersFields"
          :cardFields="usersCardFields"
          :items="usersFiltered"
          v-model:searchTerms="usersSearchTerm"
          :switchToCardAt="1200"
          showSearchBar
        >
          <template #fullName="{ item }">
            <div v-if="item" class="flex items-center gap-2">
              <FlapiAvatar :name="UserHelper.getFullName(item as User)" :size="32" backgroundColor="#35424d" />
              <span class="font-semibold">
                {{ UserHelper.getFullName(item as User) }}
              </span>
            </div>
            <div v-else>-</div>
          </template>

          <template #role="{ item }">
            <div class="flex items-center gap-2">
              <FlapiUserRoleBadge :roleName="item.role.name" />
            </div>
          </template>
        </FlapiTable>
      </div>
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
import { onMounted, ref } from 'vue'
import { UserApi } from '~~/src-core/api'
import type { User } from '~~/src-core/api'
import type { AxiosResponse } from 'axios'
import { SearchUtil } from '~~/src-core/utils/SearchUtil'
import { UserHelper } from '~~/src-core/helpers/UserHelper'
import FlapiUserRoleBadge from '~/components/ui/badges/FlapiUserRoleBadge.vue'
import type { FlapiTableCardField } from '#/core'
import FlapiProjectCard from '~/components/cards/FlapiProjectCard.vue'
import type { Router } from 'vue-router'

const router: Router = useRouter()

const owner: Ref<User | null> = ref(null)
const ownerName: Ref<string> = ref('')
const ownerIsLoaded: Ref<boolean> = ref(false)

const users: Ref<User[]> = ref([])
const usersSearchTerm: Ref<string> = ref('')

onMounted(async () => {
  ownerIsLoaded.value = false
  const userResponse: AxiosResponse<User> = await UserApi.getUserById(props.team.owner_id)
  owner.value = userResponse.data
  ownerName.value = owner.value.firstname + ' ' + owner.value.lastname
  users.value = props.team.users
  ownerIsLoaded.value = true
})

const usersFields: FlapiTableCardField[] = [
  {
    key: 'fullName',
    label: 'Nom complet',
  },
  {
    key: 'role',
    label: 'Rôle',
  },
  {
    key: 'email',
    label: 'Email',
  },
]

const usersCardFields: FlapiTableCardField[] = [
  {
    key: 'fullName',
    label: 'Nom complet',
  },
  {
    key: 'role',
    label: 'Rôle',
  },
  {
    key: 'email',
    label: 'Email',
  },
]

/**
 * Type definitions for the CreateProjectForm component props
 */
export type TeamFormProps = {
  team: Team
}

/**
 * Type definitions for the SelectOption type
 */
export type SelectOption = {
  label: string
  value: number | string
}

const props: TeamFormProps = defineProps({
  team: {
    type: Object as PropType<Team>,
    required: true,
  },
  fieldsIsRequired: {
    type: Boolean,
    default: true,
  },
})

/*EMIT*/
const emit: (event: 'update:team', project: Team) => void = defineEmits<{
  (event: 'update:team', team: Team): void
}>()

/**
 * Filter users based on the search term
 * @returns {User[]} Filtered users
 * @description This computed property filters the users based on the search term provided in the `usersSearchTerm` ref. It uses the `SearchUtil.filterBySearchText` method to filter the users based on specific fields.
 */
const usersFiltered: ComputedRef<User[]> = computed(() => {
  return SearchUtil.filterBySearchText<User>(users.value, usersSearchTerm.value, ['firstname', 'lastname', 'email'])
})

/**
 * Redirect to invite member page
 * @returns {void}
 */
const goToInvitePage: () => void = (): void => {
  router.push({
    path: '/teams/invite',
    params: {
      teamId: props.team.id,
    },
  })
}
</script>
