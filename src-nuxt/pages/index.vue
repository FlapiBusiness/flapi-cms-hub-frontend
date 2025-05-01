<template>
  <div class="flex h-full items-center justify-center">
    <FlapiSpinner variant="light" :size="64" />
  </div>
</template>

<script lang="ts" setup>
import type { Router } from 'vue-router'
/* HOOKS */
const router: Router = useRouter()
router.push('/dashboard')
</script>
