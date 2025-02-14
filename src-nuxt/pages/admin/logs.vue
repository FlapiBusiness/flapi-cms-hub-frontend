<script setup lang="ts">
import FlapiTable from '../../components/core/FlapiTable.vue'
import FlapiIcon from '../../components/ui/FlapiIcon.vue'
import FlapiSearchBar from '../../components/inputs/FlapiSearchBar.vue'
import FlapiBadge from '../../components/ui/FlapiBadge.vue'
import FlapiAvatar from '../../components/ui/FlapiAvatar.vue'

const fields: Array<any> = [
  {
    key: 'application_name',
    label: 'Name Application',
  },
  {
    key: 'action',
    label: 'Action',
  },
  {
    key: 'collection',
    label: 'Collection',
  },
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'user',
    label: 'Utilisateur',
  },
  {
    key: 'message',
    label: 'Message',
  },
]

const items: Array<any> = [
  {
    application_name: 'Flapi',
    action: {
      backgroundColor: '#CCFFEB',
      message: 'Ajout',
    },
    collection: 'Products',
    date: '2024-12-19T10:30:00',
    user: 'John Doe',
    message: 'New product added to the catalog.',
  },
  {
    application_name: 'Flapi',
    action: {
      backgroundColor: '#FFEECC',
      message: 'Modification',
    },
    collection: 'Orders',
    date: '2024-12-18T14:15:00',
    user: 'Jane Smith',
    message: 'Order #12345 updated with new shipping details.',
  },
  {
    application_name: 'Flapi',
    action: {
      backgroundColor: '#FBD0D5',
      message: 'Suppression',
    },
    collection: 'Customers',
    date: '2024-12-17T09:00:00',
    user: 'Alice Brown',
    message: 'Customer account removed due to inactivity.',
  },
  {
    application_name: 'Flapi',
    action: {
      backgroundColor: '#D6D0FB',
      message: 'Changement de mot de passe',
    },
    collection: 'Categories',
    date: '2024-12-16T11:45:00',
    user: 'Bob Johnson',
    message: 'New category "Electronics" created.',
  },
  {
    application_name: 'Flapi',
    action: {
      backgroundColor: '#D6D0FB',
      message: 'Inscription',
    },
    collection: 'Users',
    date: '2024-12-15T16:20:00',
    user: 'Eve Davis',
    message: 'User permissions updated for admin access.',
  },
  {
    application_name: 'Flapi',
    action: {
      backgroundColor: '#FFEECC',
      message: 'Modification',
    },
    collection: 'Users',
    date: '2024-12-15T16:20:00',
    user: 'Eve Davis',
    message: 'User permissions updated for admin access.',
  },
]
</script>

<template>
  <div class="h-screen w-screen bg-gray-700">
    <!-- Conteneur central -->
    <div class="px-8 py-8">
      <div class="flex items-center justify-between gap-4">
        <!-- Gauche : Breadcrumb -->
        <div class="flex items-center gap-4">
          <!-- Section Historique -->
          <div class="flex items-center gap-2">
            <FlapiIcon color="white" :height="24" mode="stroke" name="Home" viewBox="0 0 24 24" :width="24" />
            <h3 class="text-xl font-semibold text-white">Historique</h3>
          </div>

          <!-- Séparateur -->
          <span class="text-xl text-white">/</span>

          <!-- Section Mon activité -->
          <div class="flex items-center gap-2">
            <FlapiIcon color="#BDB3FF" :height="24" mode="stroke" name="Users" viewBox="0 0 24 24" :width="24" />
            <h3 class="text-xl font-semibold text-primary-300">Mon activité</h3>
          </div>
        </div>

        <!-- Droite : Search bar -->
        <div class="flex items-center pr-4">
          <FlapiSearchBar placeholder="Rechercher (Ctrl + E)" title="Search" />
        </div>
      </div>

      <!-- Table -->
      <div class="w-full">
        <FlapiTable :fields="fields" :items="items" :load="false" showSearchBar>
          <template #action="{ item }">
            <div class="flex items-center gap-2">
              <FlapiBadge :backgroundColor="item.action.backgroundColor">
                {{ item.action.message }}
              </FlapiBadge>
            </div>
          </template>

          <template #user="{ item }">
            <div class="flex items-center gap-2">
              <FlapiAvatar :name="item.user.name" photo="/avatar-placeholder.png" :size="32" />
              <span class="font-semibold">{{ item.user.name }}</span>
            </div>
          </template>
        </FlapiTable>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
