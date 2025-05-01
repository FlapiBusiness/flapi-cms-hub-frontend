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
import { useProjectSetupListener } from '~/composables/useProjectSetupListener'

onMounted(async () => {
  const results = await Promise.allSettled([
    useProjectSetupListener(),
    useApplicationEventLogsListener(),
    useUserApplicationEventLogsListener(),
  ])

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`❌ Listener ${index} a échoué:`, result.reason)
    }
  })
})
</script>
