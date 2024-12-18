<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Photo de profil</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-2xl font-semibold text-light-400">
        Informations de <span class="text-primary-400">{{ props.firstName }}</span>
        <span>&nbsp;</span>
        <span class="text-primary-400">{{ props.lastName }}</span>
      </p>
      <FlapiFormCard> <div class="h-96"></div> </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts">
/**
 * Type definitions for the userInfos object
 * @type {userInfos}
 */
type userInfos = {
  firstName: string
  lastName: string
}
</script>
<script lang="ts" setup>
import FlapiFormCard from '@/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '@/components/cards/FlapiCardDownloadPicture.vue'

/**
 * Type definitions for the Card component props
 *
 */
const props: userInfos = defineProps({
  lastName: {
    type: String,
    required: true,
    default: 'Doe',
  },
  firstName: {
    type: String,
    required: true,
    default: 'John',
  },
})
</script>
