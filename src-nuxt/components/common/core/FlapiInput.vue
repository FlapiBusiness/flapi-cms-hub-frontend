<template>
  <div class="relative flex flex-col gap-2">
    <label v-if="props.label" class="font-medium text-white" :for="id">
      {{ props.label }}
      <span v-if="rules && rules.includes('required')" class="text-red-400 ml-1"> * </span>
    </label>

    <Field
      :rows="rows"
      :rules="rules"
      :validateOnInput="true"
      v-slot="{ meta, field }"
      :name="props.id"
      :type="typeRef"
      :value="props.value"
      @input="emit('update:value', $event.target.value, $event)"
      :placeholder="props.placeholder"
    >
      <textarea
        v-if="rows"
        :rows="rows"
        v-bind="field"
        :id="props.id"
        :value="props.value"
        class="relative flex w-full items-center justify-center rounded-md border-2 bg-zinc-900 pl-3 pt-3 text-white outline-none placeholder:text-zinc-600 focus:border-amber-400"
        :placeholder="props.placeholder"
        :class="meta.validated && !meta.valid ? 'border-red-500' : 'border-zinc-500 hover:border-zinc-400'"
      />
      <input
        v-else
        v-bind="field"
        :type="typeRef"
        :id="props.id"
        :value="props.value"
        :min="props.min"
        :step="props.step"
        class="relative flex h-12 w-full items-center justify-center rounded-md border-2 bg-zinc-900 pl-3 text-white outline-none placeholder:text-light-100 focus:border-amber-400"
        :placeholder="props.placeholder"
        :class="[
          meta.validated && !meta.valid ? 'border-red-500' : 'border-zinc-500 hover:border-zinc-400',
          typeRef === 'number' ? 'pr-3' : null,
        ]"
      />
    </Field>

    <div
      :class="props.label ? 'top-11' : 'top-3'"
      class="absolute right-4 cursor-pointer"
      v-if="type === 'password'"
      @click.prevent="handleTogglePassword"
    >
      <FlapiIcon v-if="!togglePassword" title="Afficher le mot de passe" name="eye" mode="stroke" color="#908e97" />
      <FlapiIcon v-if="togglePassword" title="Masquer le mot de passe" name="eye-off" mode="stroke" color="#908e97" />
    </div>
    <ErrorMessage class="slide-from-left text-red-500 text-sm" :name="props.id" />
  </div>
</template>

<script lang="ts" setup>
import FlapiIcon from '~/components/common/ui/FlapiIcon.vue'
import { Field, ErrorMessage } from 'vee-validate'
import { ref } from 'vue'

/* PROPS */
const props: {
  placeholder: string
  value: string | number
  rows: number
  id: string
  type: string
  rules: string
  label: string
  min: string
  step: string
} = defineProps({
  placeholder: { type: String, default: null },
  value: { type: [String, Number], default: '' },
  rows: { type: Number, default: null },
  id: { type: String, default: 'field' },
  type: { type: String, default: 'text' },
  rules: { type: String, default: null },
  label: { type: String, default: null },
  min: { type: String, default: null },
  step: { type: String, default: null },
})

/*EMIT*/
const emit: {
  (evt: 'update:value', value: boolean, event: Event): void
} = defineEmits(['update:value'])

/*REFS*/
const togglePassword: Ref<boolean> = ref(false)
const typeRef: Ref<string> = ref(props.type)

/*METHODS*/
/**
 * Toggles the password visibility.
 * @returns {void}
 */
const handleTogglePassword: () => void = (): void => {
  togglePassword.value = !togglePassword.value
  typeRef.value = togglePassword.value ? 'text' : 'password'
}
</script>

<style scoped>
:focus-visible {
  outline: none;
}

input:hover:not(:focus) {
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 30px 0;
}

.slide-from-left {
  animation: slideFromLeft 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes slideFromLeft {
  0% {
    opacity: 0;
    filter: alpha(opacity=0);
    transform: translate3d(-40px, 0, 0);
  }
  100% {
    opacity: 1;
    filter: alpha(opacity=100);
    transform: translate3d(0, 0, 0);
  }
}
</style>
