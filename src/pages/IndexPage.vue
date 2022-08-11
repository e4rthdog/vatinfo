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
      <div class="col-5 q-ma-sm">
        <metar ref="metarRef"></metar>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { inject, ref, onMounted } from "vue";
import Events from "components/Events.vue";
import Friends from "components/Friends.vue";
import Metar from "components/Metar.vue";

async function updateData() {
  await eventsRef.value.getEvents();
  await friendsRef.value.getOnlineCids();
}

onMounted(() => {
  updateData();
  setInterval(updateData, cfg.refreshInterval);
});

defineExpose({ updateData });

const cfg = inject("appConfig");
const $q = useQuasar();
const eventsRef = ref();
const friendsRef = ref();
const metarRef = ref();
</script>
