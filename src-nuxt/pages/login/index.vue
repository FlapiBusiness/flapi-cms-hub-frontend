<template>
  <div class="flex min-h-screen items-center justify-center bg-grey-700">
    <div class="flex flex-col gap-4">
      <div class="mb-8 flex flex-row items-center justify-center gap-4">
        <FlapiIcon name="flapi" :width="51" :height="51" :viewBox="'0 0 50 50'" mode="fill" />
        <h1 class="text-2xl font-medium text-light-100">Flapi</h1>
      </div>
      <LoginForm />
      <h6 class="mt-6 flex h-full flex-wrap items-center justify-center gap-2 text-sm font-medium text-light-100">
        Vous n'avez pas de compte ?
        <flapiLink class="text-sm text-primary-light" link="https://signup"> S'inscrire</flapiLink>
      </h6>
    </div>
  </div>
</template>
<script lang="ts" setup>
import LoginForm from '~/components/forms/LoginForm.vue'
import flapiLink from '~/components/common/core/FlapiLink.vue'
import FlapiIcon from '~/components/common/ui/FlapiIcon.vue'
</script>
