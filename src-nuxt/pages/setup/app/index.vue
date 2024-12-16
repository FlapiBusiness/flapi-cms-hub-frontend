<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <FlapiFormCard> <div class="h-96"></div> </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
import FlapiFormCard from '@/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '@/components/cards/FlapiCardDownloadPicture.vue'
</script>
