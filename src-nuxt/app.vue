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
  useProjectSetupListener()

  const results = await Promise.allSettled([useApplicationEventLogsListener(), useUserApplicationEventLogsListener()])

  results.forEach((result, index) => {
    if (result.status === 'rejected') {
      console.error(`❌ Listener ${index} a échoué:`, result.reason)
    }
  })
})

// Umami - Analytic users
if (import.meta.env.VITE_NODE_ENV === 'development') {
  const script: HTMLScriptElement = document.createElement('script')
  script.src = 'https://umami.flapi.org/script.js'
  script.setAttribute('data-website-id', '1ce6bf45-2ee2-479d-adc4-637508d51d05')
  script.async = true
  document.body.appendChild(script)
} else if (import.meta.env.VITE_NODE_ENV === 'production') {
  const script: HTMLScriptElement = document.createElement('script')
  script.src = 'https://umami.flapi.org/script.js'
  script.setAttribute('data-website-id', 'df9e1e3d-2b1f-40fd-995a-10883ab520a8')
  script.async = true
  document.body.appendChild(script)
} else if (import.meta.env.VITE_NODE_ENV === 'staging') {
  const script: HTMLScriptElement = document.createElement('script')
  script.src = 'https://umami.flapi.org/script.js'
  script.setAttribute('data-website-id', 'b0c7f8d1-2e3f-4a5b-9c6d-7e8f9a0b1c2d')
  script.async = true
  document.body.appendChild(script)
}
</script>
