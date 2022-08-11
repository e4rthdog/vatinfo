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
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]" class="text-center">
      <p style="font-size:0.7rem;">Last Refresh: {{ lastRefresh }}</p>
      <q-btn @click="updateData()" fab icon="update" color="positive" label="Refresh All" />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { QSpinnerGears, QSpinnerPie, useQuasar, date } from "quasar";
import { inject, ref, onMounted } from "vue";
import Events from "components/Events.vue";
import Friends from "components/Friends.vue";
import Metar from "components/Metar.vue";

const cfg = inject("appConfig");
const $q = useQuasar();
const eventsRef = ref();
const friendsRef = ref();
const metarRef = ref();
const lastRefresh = ref();

function updateTime() {
  lastRefresh.value = date.formatDate(Date.now(), 'HH:mm')
}

async function updateData() {
  $q.loading.show({ message: "Fetching Data ...", spinner: QSpinnerGears })
  await eventsRef.value.getEvents();
  await friendsRef.value.getOnlineCids();
  updateTime();
  $q.loading.hide();
}

onMounted(() => {
  updateData();
  setInterval(updateData, cfg.refreshInterval);
});

defineExpose({ updateData });

</script>
