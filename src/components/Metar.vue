<script setup>
import { ref, inject, onMounted } from "vue";
import { useQuasar, QSpinnerGears, date } from "quasar";

const cfg = inject("appConfig");
const isFetching = ref(false);
const txtICAO = ref("");
const arrMetars = ref([]);
const $q = useQuasar();

async function getMetar(icao = txtICAO.value) {
  return await fetch(cfg.metarURL + icao + '&nonce=' + date.formatDate(Date.now(), 'YYMMDDHHmmssSS'))
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
          <q-input id="txtMetar" @keypress.enter="updatePanel()" color="positive" v-model.trim="txtICAO"
            label="Airport ICAO">
            <template v-slot:prepend>
              <q-icon name="flight_takeoff" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-lg-7">
          <q-btn-group rounded push :stretch="false" class="q-ma-md">
            <q-btn @click="updatePanel()" label="Get it" color="primary" style="font-size:0.8rem" />
            <q-btn @click="refreshAllMetars()" icon-right="update" label="Refresh" color="info"
              style="font-size:0.8rem" />
            <q-btn @click="clearMetars()" label="Clear" color="negative" style="font-size:0.8rem" />
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
            <tbody v-for="(m, index) in arrMetars" :key="index">
              <tr>
                <td>{{ m.metar }} </td>
              </tr>
            </tbody>
          </q-markup-table>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
