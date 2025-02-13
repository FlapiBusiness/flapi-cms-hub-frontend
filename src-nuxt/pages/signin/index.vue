<template>
  <div class="flex h-full items-center justify-center">
    <div class="flex w-full max-w-sm flex-col gap-4 px-3">
      <FlapiLogo size="40" :large="true" class="mb-[44px] items-center justify-center" />

      <LoginForm />
      <h6 class="flex h-full flex-wrap items-center justify-center gap-2 font-medium text-light-400">
        Vous n'avez pas de compte ?
        <FlapiLink class="text-primary-light" link="/signup">S'inscrire</FlapiLink>
      </h6>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '~/components/forms/LoginForm.vue'
import FlapiLink from '~/components/core/FlapiLink.vue'
import FlapiLogo from '~/components/flapi/FlapiLogo.vue'

definePageMeta({
  layout: 'auth',
})
</script>
