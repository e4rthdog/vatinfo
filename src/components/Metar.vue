<script setup>
import { ref, inject, onMounted, computed, watch } from "vue";
import { useQuasar, QSpinnerGears, date } from "quasar";
import { useVatinfoStore } from "src/stores/vatinfo-store";
import appConfig from "src/config";

const cfgStore = useVatinfoStore();
const isFetching = ref(false);
const txtICAO = ref("");
const arrMetars = ref([]);
const arrMetarsSorted = computed(() => arrMetars.value.sort((a, b) => (a.icao > b.icao) ? 1 : -1));
const $q = useQuasar();

async function getMetar(icao = txtICAO.value.toUpperCase()) {
  return await fetch(appConfig.metarURL + icao + '&nonce=' + date.formatDate(Date.now(), 'YYMMDDHHmmssSS'))
    .then((ret) => ret.text())
    .then((m) => {
      return { icao: icao, metar: m };
    });
}

async function refreshAllMetars() {
  for await (const m of arrMetars.value) {
    await getMetar(m.icao).then((d) => (m.metar = d.metar));
  }
}

function updatePanel() {
  getMetar().then((d) => { if (d.metar.trim() != '') arrMetars.value.push(d) });
  txtICAO.value = "";
}

function clearMetars() {
  arrMetars.value = [];
}

function fillarrMetars() {
  arrMetars.value = []
  cfgStore.identDBdATA.forEach(m => {
    if (m.metar.trim() != '') arrMetars.value.push({ id: m.id, icao: m.metar, metar: '' });
  });
}
onMounted(async () => {
  cfgStore.identDBdATA = await cfgStore.loadIdentDataAPI();
  fillarrMetars()
  watch(arrMetars, refreshAllMetars)
});

defineExpose({ refreshAllMetars })
</script>

<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <q-icon name="people" size="1.5rem" class="q-mr-sm" />
      <span>METAR Info</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="row items-center">
        <div class="col-12 col-lg-5">
          <q-input id="txtMetar" @keypress.enter="updatePanel()" color="positive" v-model.trim="txtICAO" dense
            label="Airport ICAO">
            <template v-slot:prepend>
              <q-icon name="flight_takeoff" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-lg-7">
          <q-btn-group push :stretch="false" class="q-ma-md">
            <q-btn @click="updatePanel()" label="Get it" color="primary" class="footer-text" />
            <q-btn @click="refreshAllMetars()" label="Refresh" color="info" class="footer-text" />
            <q-btn @click="clearMetars()" label="Clear" color="negative" class="footer-text" />
            <q-btn-dropdown color="primary" icon="import_export" class="footer-text">
              <q-list>
                <q-item clickable v-close-popup @click="fillarrMetars(); refreshAllMetars()">
                  <q-item-section>
                    <q-item-label>Load</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="cfgStore.saveMetars(arrMetars)">
                  <q-item-section>
                    <q-item-label>Save</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </div>
      </div>
      <div class="row bg-yellow-1 q-mt-md" style="font-size:0.8rem;">
        <div class="col-12">
          <q-markup-table bordered dense flat wrap-cells class="full-width text-left">
            <thead class="bg-grey-1">
              <tr>
                <th>METAR</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(m, index) in arrMetarsSorted" :key="index">
                <td>{{ m.metar }} </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
