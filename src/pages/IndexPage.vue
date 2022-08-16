//TODO Add help in each panel
//TODO Add version indication
<template>
  <q-page class="q-ma-md">
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
import { useVatinfoStore } from "src/stores/vatinfo-store";
import appConfig from "src/config";

const cfgStore = useVatinfoStore();
const updateRefreshTime = inject('updateRefreshTime')
const $q = useQuasar();
const eventsRef = ref();
const friendsRef = ref();
const metarRef = ref();
const infoRef = ref();
const allClients = ref([]);
const allEvents = ref([]);
const isBusy = ref(false);

provide('updateData', updateData);
provide('allClients', allClients)
provide('getEvents', getEvents)
provide('allEvents', allEvents)

async function updateData() {
  $q.loading.show({ message: "Fetching Events,CIDs ...", spinner: QSpinnerGears })
  await getClients();
  // await eventsRef.value.getEvents();
  await getEvents();
  await friendsRef.value.getOnlineCids();
  $q.loading.show({ message: "Refreshing METARs ...", spinner: QSpinnerGears })
  await metarRef.value.refreshAllMetars();
  $q.loading.show({ message: "Refreshing INFO ...", spinner: QSpinnerGears })
  $q.loading.hide();
  updateRefreshTime();
}

async function getClients() {
  await fetch(appConfig.clientsURL + '&' + date.formatDate(Date.now(), 'YYMMDDHHmmssSS'))
    .then((ret) => ret.json())
    .then((m) => allClients.value = m);
}

async function getEvents() {
  await fetch(appConfig.eventsURL + '?nonce=' + date.formatDate(Date.now(), 'YYMMDDHHmmssSS'))
    .then((ret) => ret.json())
    .then((json) => allEvents.value = json.data);
}
onMounted(async () => {
  updateData();
  setInterval(updateData, appConfig.refreshInterval);
});

defineExpose({ updateData });

</script>
