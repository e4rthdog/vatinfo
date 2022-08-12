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
    <q-card-section>
      <div class="row justify-center">
        <q-tabs no-caps v-model="tabName" dense class="text-black bg-grey-3 full-width" active-color="primary"
          indicator-color="primary" align="justify" narrow-indicator>
          <q-tab name="ctr" :label="'Online CTRs - ' + totalCTR.length" />
          <q-tab name="app" :label="'Online APPs - ' + totalAPP.length" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tabName" animated>
          <q-tab-panel name="ctr">
            <div class="row shadow-up-1 q-mt-md" style="font-size:0.8rem;">
              <div class="col-12" v-for="(m, index) in totalCTR" :key="index">
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      {{ m.callsign }} since {{ m.time_logon_str }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>

          <q-tab-panel name="app">
            <div class="row shadow-up-1 q-mt-md" style="font-size:0.8rem;">
              <div class="col-12" v-for="(m, index) in totalAPP" :key="index">
                <q-list dense>
                  <q-item>
                    <q-item-section>
                      {{ m.callsign }} since {{ m.time_logon_str }}
                    </q-item-section>
                  </q-item>
                </q-list>
              </div>
            </div>
          </q-tab-panel>
        </q-tab-panels>
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
  let res = allClients.value.filter((c) => c.callsign.includes('CTR'))
  res.forEach((c) => c.time_logon_str = `${c.time_logon.slice(8, 10)}:${c.time_logon.slice(10, 12)}`);
  return res.sort((a, b) => (a.callsign > b.callsign) ? 1 : -1);
});

const totalAPP = computed(() => {
  let res = allClients.value.filter((c) => c.callsign.includes('APP'))
  res.forEach((c) => c.time_logon_str = `${c.time_logon.slice(8, 10)}:${c.time_logon.slice(10, 12)}`);
  return res.sort((a, b) => (a.callsign > b.callsign) ? 1 : -1);
});

const totalByType = computed(() => {
  let res = {}
  allClients.value.forEach(cl => {
    res[cl.clienttype] = (res[cl.clienttype] || 0) + 1;
  });
  return res;
})

</script>
