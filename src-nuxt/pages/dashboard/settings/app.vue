<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-700">
    <div class="grid w-full max-w-7xl gap-4">
      <p class="text-2xl font-semibold text-light-400">Photo de l'applications</p>
      <FlapiCardDownloadPicture picture="https://picsum.photos/136/136" />
      <p class="text-2xl font-semibold text-light-400">Personnalisation de l'application</p>
      <FlapiFormCard> <div class="h-96"></div> </FlapiFormCard>
    </div>
  </div>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
import FlapiFormCard from '~/components/cards/FlapiFormCard.vue'
import FlapiCardDownloadPicture from '~/components/cards/FlapiCardDownloadPicture.vue'
</script>
