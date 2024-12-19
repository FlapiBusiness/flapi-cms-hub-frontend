<template>
  <Form v-slot="{ meta, errors }" class="grid gap-4" @submit="emit('submit')">
    <div class="grid grid-cols-2 gap-4">
      <p class="text-light-400">Email</p>
      <p class="text-light-400">Role</p>
    </div>

    <div
      v-for="(email, index) in props.emails"
      :key="`email-${index}`"
      :class="errors[`email-${index + 1}`] ? 'items-start' : 'items-center'"
      class="invite__row flex gap-4"
    >
      <FlapiInput
        :value="email"
        @update:value="updateEmail(index, $event)"
        rules="email"
        class="flex-1"
        placeholder="email@gmail.com"
        @keydown.enter.prevent="meta.valid && hasCompletedEmail ? emit('submit') : null"
        type="required|email"
        :id="`email-${index + 1}`"
      />

      <FlapiSelect
        :options="
          [
            { label: 'Admin', value: 'admin' },
            { label: 'User', value: 'user' },
            { label: 'Viewer', value: 'viewer' },
            { label: 'Bouche trou', value: 'bouche-trou' },
          ] as SelectOption[]
        "
        class="flex-1"
        placeholder="Choisir un rôle"
        @keydown.enter.prevent="meta.valid && hasCompletedEmail ? emit('submit') : null"
        type="required"
        :id="`role-${index + 1}`"
      />

      <button v-if="showDeleteFlapiButtons" @click.prevent="removeEmail(index)">
        <div class="flex items-center justify-center gap-2 rounded-md bg-red p-2">
          <FlapiIcon name="trash" class="inline-block align-middle" width="12" height="12" />
        </div>
      </button>
    </div>

    <!-- <FlapiButton class="gap-2" @click.prevent="addEmail" startIcon="plus" variant="dashed"> Ajouter Plus </FlapiButton> -->
    <button @click.prevent="addEmail">
      <div class="flex items-center justify-center gap-2 rounded-md border border-dashed border-light-400 p-2">
        <FlapiIcon name="plus" class="inline-block align-middle" />
        <p class="inline-block align-middle text-light-400">Ajouter Plus</p>
      </div>
    </button>

    <FlapiButton
      :load="load"
      class="gap-2"
      :disabled="!meta.valid || !hasCompletedEmail"
      type="submit"
      startIcon="mail"
    >
      <span>Envoyer Invitation<span v-if="props.emails && props.emails.length > 1">s</span></span>
    </FlapiButton>
  </Form>
</template>

<script lang="ts">
/**
 * InviteForm component
 * @property {string[]} emails - The list of emails to invite
 * @property {boolean} load - The loading state of the form
 */
export type InviteFormProps = {
  emails: string[]
  load: boolean
}

/**
 * InviteForm component
 */
export type InviteFormEmits = {
  'update:emails': (emails: string[]) => void
  submit: () => void
}
</script>
<script lang="ts" setup>
import type { PropType } from 'vue'
import { Form } from 'vee-validate'
import FlapiButton from '@/components/core/FlapiButton.vue'
import FlapiIcon from '@/components/ui/FlapiIcon.vue'
import FlapiInput from '@/components/core/FlapiInput.vue'
import FlapiSelect from '@/components/core/FlapiSelect.vue'
import { computed, nextTick } from 'vue'

/**
 * Type definitions for the SelectOption type
 * @type {SelectOption}
 * @property {string} label - The label of the option
 * @property {string} value - The value of the option
 */
type SelectOption = {
  label: string
  value: string
}
/*PROPS*/
const props: InviteFormProps = defineProps({
  emails: {
    type: Array as PropType<string[]>,
    required: true,
  },
  load: {
    type: Boolean,
    default: false,
  },
})

/*EMIT*/
const emit: (event: 'update:emails' | 'submit', ...args: any[]) => void = defineEmits(['update:emails', 'submit'])

/*COMPUTED*/
const showDeleteFlapiButtons: ComputedRef<boolean> = computed(() => props.emails.length > 1)
const hasCompletedEmail: ComputedRef<string | undefined> = computed(() =>
  props.emails.find((email: string) => email !== ''),
)

/*METHODS*/

/**
 * @param {number} index - The index of the email to update
 * @param {string} newEmail - The new email value
 */
const updateEmail: (index: number, newEmail: string | number | null) => void = (
  index: number,
  newEmail: string | number | null,
) => {
  if (newEmail != null && typeof newEmail === 'string' && newEmail.length > 0 && newEmail !== '') {
    return
  }
  emit('update:emails', [...props.emails.slice(0, index), newEmail, ...props.emails.slice(index + 1)])
}

/**
 * Add a new email to the list
 * Focus on the new email input
 */
const addEmail: () => void = () => {
  emit('update:emails', [...props.emails, ''])
  nextTick(() => {
    const lastEmailInput: HTMLInputElement | null = document.querySelector(`#email-${props.emails.length}`)
    if (lastEmailInput instanceof HTMLInputElement) {
      lastEmailInput.focus()
    }
  })
}

/**
 * Remove an email from the list
 * @param {number} index - The index of the email to remove
 */
const removeEmail: (index: number) => void = (index: number) => {
  emit('update:emails', [...props.emails.slice(0, index), ...props.emails.slice(index + 1)])
}
</script>
