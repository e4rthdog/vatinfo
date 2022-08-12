<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <q-icon name="info" size="1.5rem" class="q-mr-sm" />
      <span>General Info</span>
    </q-card-section>
    <q-separator />
    <q-card-section class="q-pa-xs">
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
    <q-card-section class="q-pa-xs">
      <div class="row" style="max-height:400px;overflow:auto;">
        <div class="col-12 col-lg-6 q-pa-sm">
          <p class="text-center q-ma-sm">CTRs Online ({{ totalCTR.length }})</p>
          <q-markup-table bordered dense flat wrap-cells class="full-width text-left">
            <thead>
              <tr class="bg-grey-1">
                <th>Callsign</th>
                <th>Since</th>
              </tr>
            </thead>
            <tbody v-for="(m, index) in totalCTR" :key="index">
              <tr>
                <td>{{ m.callsign }} </td>
                <td>{{ m.time_logon_str }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
        <div class="col-12 col-lg-6 q-pa-sm">
          <p class="text-center q-ma-sm">APPs Online ({{ totalAPP.length }})</p>
          <q-markup-table bordered dense flat wrap-cells class="full-width text-left">
            <thead>
              <tr class="bg-grey-1">
                <th>Callsign</th>
                <th>Since</th>
              </tr>
            </thead>
            <tbody v-for="(m, index) in totalAPP" :key="index">
              <tr>
                <td>{{ m.callsign }} </td>
                <td>{{ m.time_logon_str }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
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
const tabName = ref('ctr');


const totalCTR = computed(() => {
  return createTypeArray('CTR');
});

const totalAPP = computed(() => {
  return createTypeArray('APP');
});

const totalByType = computed(() => {
  let res = {}
  allClients.value.forEach(cl => {
    res[cl.clienttype] = (res[cl.clienttype] || 0) + 1;
  });
  return res;
})

function createTypeArray(type) {
  let res = allClients.value.filter((c) => c.callsign.includes(type))
  res.forEach((c) => c.time_logon_str = `${c.time_logon.slice(8, 10)}:${c.time_logon.slice(10, 12)}z`);
  return res.sort((a, b) => (a.callsign > b.callsign) ? 1 : -1);
}

</script>
