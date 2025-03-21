<template>
  <Form
    v-slot="{ meta }"
    class="flex h-full w-full flex-col rounded-lg border border-gray-300 bg-gray-500"
    @submit="emit('confirm')"
  >
    <div class="h-full w-full p-4">
      <slot></slot>
    </div>
    <div class="flex w-full flex-row justify-end gap-4 rounded-b-lg bg-gray-300 p-4">
      <FlapiButton size="sm" :disabled="!meta.valid || props.buttonLoading" :load="props.buttonLoading" type="submit">
        <p class="text-light-400">
          {{ buttonLoading ? 'Enregistrement...' : 'Enregistrer' }}
        </p>
      </FlapiButton>
    </div>
  </Form>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import { defineProps } from 'vue'
import type { PropType } from 'vue'

/**
 * Type definitions for the FlapiFormCard component props
 * @type {FlapiFormCardProps}
 * @property {boolean} buttonLoading - The loading state of the button
 */
type FlapiFormCardProps = {
  buttonLoading: boolean
}

/* PROPS */
const props: FlapiFormCardProps = defineProps({
  buttonLoading: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
})

/*EMIT*/
const emit: (event: 'confirm') => void = defineEmits<{
  (event: 'confirm'): void
}>()
</script>
