<template>
  <div class="flex h-full items-center justify-center">
    <div class="flex flex-col gap-4 px-3">
      <FlapiLogo size="40" :large="true" class="mb-[60px] items-center justify-center" />
      <SignUpForm />
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlapiLogo from '@/components/flapi/FlapiLogo.vue'
import SignUpForm from '@/components/forms/SignUpForm.vue'
</script>
