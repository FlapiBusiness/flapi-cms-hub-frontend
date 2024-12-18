<template>
  <Form
    v-slot="{ meta }"
    class="flex h-full w-full flex-col rounded-lg border border-gray-300 bg-gray-500"
    @submit="validForm"
  >
    <div class="h-full w-full">
      <slot></slot>
    </div>
    <div class="flex w-full flex-row justify-end gap-4 rounded-b-lg bg-gray-300 p-4">
      <FlapiButton backgroundColor="#35424D" type="button" size="xs" @click="() => $router.push('/setup/app')">
        <p class="font-semibold text-light-400">Annuler</p>
      </FlapiButton>
      <FlapiButton size="xs" :disabled="!meta.valid" :load="buttonLoading" type="submit">
        <p class="font-semibold text-light-400">
          {{ buttonLoading ? 'Enregistrement...' : 'Enregistrer' }}
        </p>
      </FlapiButton>
    </div>

    <FlapiConfirmModal
      :show="showModal"
      :title="'Votre compte n\'est pas activé'"
      :message="'Veuillez vérifier votre boîte de réception pour activer votre compte.'"
      @update:show="showModal = $event"
      @ok="validModal"
      @cancel="showModal = false"
    />
  </Form>
</template>

<script lang="ts"></script>

<script lang="ts" setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import FlapiButton from '@/components/core/FlapiButton.vue'
import FlapiConfirmModal from '@/components/core/FlapiConfirmModal.vue'
import type { Ref } from 'vue'

/* REFS */

/**
 * Refs
 * @param {Ref<boolean>} buttonLoading - The button loading state
 * @param {Ref<boolean>} showModal - The modal state
 */

const buttonLoading: Ref<boolean> = ref(false)
const showModal: Ref<boolean> = ref(false)

/* METHODS */
/**
 * Valid form method
 */
const validForm: () => Promise<void> = async (): Promise<void> => {
  //TODO Implémenter la logique pour se connecter
  buttonLoading.value = true

  try {
    //TODO: remove this line when the above line is implemented
    await new Promise((resolve: (value?: unknown) => void) => setTimeout(resolve, 200))
  } catch (error: any) {
    console.error(error)
  } finally {
    buttonLoading.value = false
  }
}

/**
 *
 */
const validModal: () => void = () => {
  console.log('validModal')
}
</script>
