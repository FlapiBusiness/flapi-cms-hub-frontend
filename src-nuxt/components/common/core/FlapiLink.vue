<template>
  <a
    v-if="externalLink"
    class="inline-flex items-center gap-x-1.5 font-medium text-blue-400 decoration-2 underline-offset-4 hover:underline"
    :href="href"
  >
    <slot />
  </a>
  <NuxtLink
    v-else
    :to="props.link as string"
    class="inline-flex items-center gap-x-1.5 font-medium text-blue-400 decoration-2 underline-offset-4 hover:underline"
  >
    <slot />
  </NuxtLink>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

const props: {
  externalLink: boolean
  link: string
} = defineProps({
  externalLink: { type: Boolean, default: false },
  link: { type: String, required: true },
})

const href: ComputedRef<string | undefined> = computed(() => {
  // TODO: Add support for external links (ex: reset password)
  if (props.externalLink) {
    return String(props.link)
  }
  return undefined
})
</script>
