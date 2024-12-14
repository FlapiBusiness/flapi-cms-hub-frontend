<template>
  <div class="flex w-full flex-col gap-4 bg-gray-700">
    <div class="flex flex-col gap-4">
      <LoginForm />
    </div>
    <h6 class="mt-6 flex h-full flex-wrap items-center justify-center gap-2 text-sm font-medium">
      You do not have an account ?
      <flapiLink class="text-sm" link="https://signup"> Signup </flapiLink>
    </h6>
    <h6 class="mt-6 flex h-full flex-wrap items-center justify-center gap-2 text-sm font-medium">
      Did you forget your password?
      <flapiLink class="text-sm" link="https://forgot-password"> Forgot Password </flapiLink>
    </h6>
  </div>
</template>

<script lang="ts" setup>
import LoginForm from '~/components/forms/LoginForm.vue'
import flapiLink from '~/components/common/core/FlapiLink.vue'
</script>
