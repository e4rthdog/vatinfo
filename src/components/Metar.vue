<script setup>
import { ref, inject, onMounted } from "vue";

const cfg = inject("appConfig");
const isFetching = ref(false);
const txtICAO = ref("");
const arrMetars = ref([]);

async function getMetar(icao = txtICAO.value) {
  isFetching.value = true;
  return await fetch(cfg.metarURL + icao)
    .then((ret) => ret.text())
    .then((m) => {
      return { icao: icao, metar: m };
    })
    .finally(() => (isFetching.value = false));
}

function refreshAllMetars() {
  arrMetars.value.forEach((m) => {
    getMetar(m.icao).then((d) => (m.metar = d.metar));
  });
}

function updatePanel() {
  getMetar().then((d) => arrMetars.value.push(d));
  txtICAO.value = "";
}

function clearMetars() {
  arrMetars.value = [];
}
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
          <q-input
            id="txtMetar"
            @keypress.enter="updatePanel()"
            color="positive"
            v-model.trim="txtICAO"
            label="Airport ICAO"
          >
            <template v-slot:prepend>
              <q-icon name="flight_takeoff" />
            </template>
          </q-input>
        </div>
        <div class="col-12 col-lg-7">
          <q-btn-group rounded class="q-ma-md">
            <q-btn @click="updatePanel()" label="Get it" color="primary" />
            <q-btn
              @click="refreshAllMetars()"
              icon-right="update"
              label="Refresh"
              color="info"
            />
            <q-btn @click="clearMetars()" label="Clear" color="negative" />
          </q-btn-group>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12" v-for="(m, index) in arrMetars" :key="index">
          <q-list dense>
            <q-item>
              <q-item-section>
                {{ m.metar }}
              </q-item-section>
            </q-item>
          </q-list>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>
