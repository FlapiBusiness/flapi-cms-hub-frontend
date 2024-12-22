<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-700">
    <div class="flex flex-col gap-4">
      <FlapiLogo size="40" :large="true" class="mb-[60px] items-center justify-center" />
      <LoginForm />
      <h6 class="flex h-full flex-wrap items-center justify-center gap-2 text-sm font-medium text-light-400">
        Vous n'avez pas de compte ?
        <flapiLink class="text-primary-light text-sm" link="signup"> S'inscrire</flapiLink>
      </h6>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '@/components/forms/LoginForm.vue'
import flapiLink from '@/components/core/FlapiLink.vue'
import FlapiLogo from '@/components/flapi/FlapiLogo.vue'
</script>
