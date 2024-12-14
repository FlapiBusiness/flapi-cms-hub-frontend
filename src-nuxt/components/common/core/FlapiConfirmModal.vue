<template>
  <FlapiModal
    v-if="props.show !== undefined"
    :title="props.title"
    :show="props.show"
    @update:show="$emit('update:show', $event)"
    @cancel="$emit('cancel')"
    @ok="onOk"
  >
    <p>
      {{ props.message }}
    </p>
  </FlapiModal>
</template>

<script lang="ts" setup>
import FlapiModal from '../ui/FlapiModal.vue'

/* PROPS */
const props: {
  show: boolean
  title: string
  message: string
} = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    default: 'Confirm',
  },
  message: {
    type: String,
    default: 'Are you sure?',
  },
})

/* EMITS */

const emit: {
  (evt: 'cancel'): void
  (evt: 'ok'): void
  (evt: 'update:show', event: boolean): void
} = defineEmits(['cancel', 'ok', 'update:show'])

/* METHODS */
/**
 * Method to handle the ok action
 */
const onOk: () => void = () => {
  emit('ok')
}
</script>
