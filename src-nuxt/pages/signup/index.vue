<template>
  <NuxtLayout name="auth">
    <div class="flex h-full items-center justify-center">
      <div class="flex flex-col gap-4 px-3">
        <FlapiLogo size="40" :large="true" class="mb-[60px] items-center justify-center" />
        <SignUpForm />
      </div>
    </div>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import SignUpForm from '@/components/forms/SignUpForm.vue'

definePageMeta({
  layout: 'auth',
})
</script>
