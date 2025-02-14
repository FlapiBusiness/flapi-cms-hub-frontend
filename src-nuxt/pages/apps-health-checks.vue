<template>
  <div class="px-8 py-8">
    <div class="flex items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <FlapiIcon color="white" :height="24" mode="stroke" name="Home" viewBox="0 0 24 24" :width="24" />
          <h3 class="text-xl font-semibold text-white">Vérification des applications</h3>
        </div>
      </div>
      <div class="flex items-center pr-4">
        <FlapiSearchBar placeholder="Rechercher..." title="Search" />
      </div>
    </div>

    <div class="mt-8 w-full">
      <FlapiTable :fields="fields" :items="items" :load="false" showSearchBar>
        <template #domaineVerifie="{ item }">
          <div class="flex items-center justify-center">
            <FlapiIcon
              v-if="item.domaineVerifie"
              name="check-square"
              mode="stroke"
              color="#00FF00"
              :width="24"
              :height="24"
            />
            <FlapiIcon v-else name="x" mode="stroke" color="#FF0000" :width="24" :height="24" />
          </div>
        </template>

        <template #occupationDisque="{ item }">
          <div class="flex justify-center">
            <FlapiCircularProgress
              backgroundColor="#454D5E"
              :progress="item.occupationDisque"
              progressColor="#8472F3"
              :size="50"
              textColor="#F5F4FB"
            />
          </div>
        </template>

        <template #occupationMemoire="{ item }">
          <div class="flex justify-center">
            <FlapiCircularProgress
              backgroundColor="#454D5E"
              :progress="item.occupationMemoire"
              progressColor="#8472F3"
              :size="50"
              textColor="#F5F4FB"
            />
          </div>
        </template>

        <template #verifDb="{ item }">
          <div class="flex items-center justify-center">
            <FlapiIcon v-if="item.verifDb" name="check-square" mode="stroke" color="#00FF00" :width="24" :height="24" />
            <FlapiIcon v-else name="x" mode="stroke" color="#FF0000" :width="24" :height="24" />
          </div>
        </template>

        <template #poolConnection="{ item }">
          <div class="text-center">
            {{ item.poolConnection }}
          </div>
        </template>
      </FlapiTable>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * Type definition for the Item
 * @type {Item}
 * @property {string} nomApp - The application name
 * @property {boolean} domaineVerifie - Whether the domain is verified
 * @property {number} occupationDisque - The disk occupation
 * @property {number} occupationMemoire - The memory occupation
 * @property {boolean} verifDb - Whether the database is verified
 * @property {number} poolConnection - The database pool connections
 */
type Item = {
  nomApp: string
  domaineVerifie: boolean
  occupationDisque: number
  occupationMemoire: number
  verifDb: boolean
  poolConnection: number
}

const fields: { key: string; label: string }[] = [
  { key: 'nomApp', label: 'Nom de l’application' },
  { key: 'domaineVerifie', label: 'Domaine vérifié' },
  { key: 'occupationDisque', label: 'Occupation disque' },
  { key: 'occupationMemoire', label: 'Occupation mémoire' },
  { key: 'verifDb', label: 'Vérif DB' },
  { key: 'poolConnection', label: 'Connexions DB' },
]

const items: Item[] = [
  {
    nomApp: 'API Gateway',
    domaineVerifie: true,
    occupationDisque: 45,
    occupationMemoire: 78,
    verifDb: true,
    poolConnection: 5,
  },
  {
    nomApp: 'Backoffice Admin',
    domaineVerifie: false,
    occupationDisque: 82,
    occupationMemoire: 60,
    verifDb: true,
    poolConnection: 12,
  },
  {
    nomApp: 'Auth Service',
    domaineVerifie: true,
    occupationDisque: 66,
    occupationMemoire: 40,
    verifDb: false,
    poolConnection: 9,
  },
  {
    nomApp: 'Payment Processor',
    domaineVerifie: false,
    occupationDisque: 90,
    occupationMemoire: 25,
    verifDb: false,
    poolConnection: 2,
  },
]
</script>
