<template>
  <div class="flex h-full min-h-screen flex-col bg-gray-700 p-8">
    <FlapiCardWelcomeUser
      :picture="fakeUser.picture"
      :firstName="fakeUser.firstName"
      :lastName="fakeUser.lastName"
      :email="fakeUser.email"
    />
    <div class="flex flex-1 items-center justify-center">
      <FlapiCircularProgressBar :loading="incrementLoading" />
    </div>
  </div>
</template>
<script lang="ts" setup>
import FlapiCircularProgressBar from '@/components/ui/FlapiCircularProgressBar.vue'
import FlapiCardWelcomeUser from '@/components/cards/FlapiCardWelcomeUser.vue'
import { ref } from 'vue'

const incrementLoading: Ref<number> = ref(0)

const fakeUser: { picture: string; firstName: string; lastName: string; email: string } = {
  picture: 'https://via.placeholder.com/120',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@email.com',
}

// TODO: Remove this interval and use the real loading value
setInterval(
  () => {
    incrementLoading.value += Math.floor(Math.random() * 10)
    if (incrementLoading.value >= 100) {
      incrementLoading.value = 0
    }
  },
  Math.floor(Math.random() * 1000),
)
</script>
