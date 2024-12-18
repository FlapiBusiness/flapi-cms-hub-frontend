<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-700">
    <div class="flex flex-col gap-4">
      <FlapiLogo size="40" :large="true" class="mb-[60px] items-center justify-center" />
      <SignUpForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlapiLogo from '@/components/flapi/FlapiLogo.vue'
import SignUpForm from '@/components/forms/SignUpForm.vue'
</script>
