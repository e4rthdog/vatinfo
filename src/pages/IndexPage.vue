<template>
  <q-page class="q-ma-md">
    <div class="row q-ma-none">
      <q-space></q-space>
      <p style="font-size:0.8rem;">Last Refresh: {{ lastRefresh }}</p>
    </div>
    <div class="row">
      <div class="col-12 col-md-5 q-ma-sm">
        <events ref="eventsRef"></events>
      </div>
      <div class="col-12 col-md-5 q-ma-sm">
        <friends ref="friendsRef"></friends>
      </div>
    </div>

    <div class="row">
      <div class="col-12 col-md-5 q-ma-sm">
        <metar ref="metarRef"></metar>
      </div>
      <div class="col-12 col-md-5 q-ma-sm">
        <info ref="infoRef"></info>
      </div>
    </div>
    <q-page-sticky position="top-right" :offset="[18, 18]" class="text-center">
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { QSpinnerGears, useQuasar, date } from "quasar";
import { inject, ref, onMounted, provide } from "vue";
import Events from "components/Events.vue";
import Friends from "components/Friends.vue";
import Metar from "components/Metar.vue";
import Info from "components/Info.vue"

const cfg = inject("appConfig");
const $q = useQuasar();
const eventsRef = ref();
const friendsRef = ref();
const metarRef = ref();
const infoRef = ref();
const lastRefresh = ref();
const soulis = ref('bla bla bla');
const allClients = ref([]);


provide('updateData', updateData);
provide('allClients', allClients)

async function updateData() {
  $q.loading.show({ message: "Fetching Events,CIDs ...", spinner: QSpinnerGears })
  await eventsRef.value.getEvents();
  await friendsRef.value.getOnlineCids();
  $q.loading.show({ message: "Refreshing METARs ...", spinner: QSpinnerGears })
  await metarRef.value.refreshAllMetars();
  $q.loading.show({ message: "Refreshing INFO ...", spinner: QSpinnerGears })
  await getClients();
  updateTime();
  $q.loading.hide();
}

async function getClients() {
  await fetch(cfg.clientsURL + '&' + date.formatDate(Date.now(), 'YYMMDDHHmmssSS'))
    .then((ret) => ret.json())
    .then((m) => allClients.value = m);
}
onMounted(() => {
  updateData();
  setInterval(updateData, cfg.refreshInterval);
});

function updateTime() {
  lastRefresh.value = date.formatDate(Date.now(), 'HH:mm')
}

defineExpose({ updateData });

</script>
