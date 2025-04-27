<template>
  <Html class="overscroll-none bg-gray-700">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Html>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useApplicationEventLogsListener } from '~/composables/useApplicationEventLogsListener'
import { useUserApplicationEventLogsListener } from '~/composables/useUserApplicationEventLogsListener'

onMounted(async () => {
  await useApplicationEventLogsListener()
  await useUserApplicationEventLogsListener()
})
</script>
