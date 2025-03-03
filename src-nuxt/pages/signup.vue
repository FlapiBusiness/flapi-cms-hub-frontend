<template>
  <NuxtLayout name="auth">
    <div class="flex h-full w-full max-w-3xl items-center justify-center">
      <div class="flex w-full flex-col gap-4 px-3">
        <FlapiLogo size="40" :large="true" class="mb-[60px] items-center justify-center" />
        <SignUpForm />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import SignUpForm from '~/components/forms/SignUpForm.vue'

definePageMeta({
  layout: 'auth',
})
</script>
