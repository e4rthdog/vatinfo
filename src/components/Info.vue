<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <q-icon name="info" size="1.5rem" class="q-mr-sm" />
      <span>General Info</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row justify-center">
        <q-chip dense square color="blue-grey-2" icon="travel_explore">
          Total Clients
          <q-badge color="positive" text-color="white" class="q-mx-sm">{{ allClients.length }}</q-badge>
        </q-chip>
        <q-chip dense square color="blue-grey-2" icon="flight">
          Pilots
          <q-badge color="positive" text-color="white" class="q-mx-sm">{{ totalByType['PILOT'] }}</q-badge>
        </q-chip>
        <q-chip dense square color="blue-grey-2" icon="settings_input_antenna">
          ATC
          <q-badge color="positive" text-color="white" class="q-mx-sm">{{ totalByType['ATC'] }}</q-badge>
        </q-chip>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import { date } from "quasar";

const cfg = inject("appConfig");
const allClients = inject('allClients');
const todaysEvents = ref([]);


const totalByType = computed(() => {
  let res = {}
  allClients.value.forEach(cl => {
    res[cl.clienttype] = (res[cl.clienttype] || 0) + 1;
  });
  return res;
})

</script>
