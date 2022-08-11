<script setup>
import { ref, onMounted, inject } from "vue";
import moment from "moment";

const cfg = inject("appConfig");
const todaysEvents = ref([]);
const isFetching = ref(false);

function eventAirports(e) {
  let airports = "";
  e.airports.forEach((a) => (airports += a.icao + " "));
  return airports;
}

async function getEvents() {
  isFetching.value = true;
  await fetch(cfg.eventsURL)
    .then((ret) => ret.json())
    .then((json) => {
      todaysEvents.value = json.data.filter((e) =>
        moment(new Date()).isSame(e.start_time, "days")
      );
    });
  isFetching.value = false;
}

defineExpose({ getEvents });
</script>


<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <q-icon name="event" size="1.5rem" class="q-mr-sm" />
      <span>Current Events</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-markup-table dense flat wrap-cells class="text-center">
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Start</th>
            <th>End</th>
            <th>Airports</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(e, index) in todaysEvents" :key="index">
            <td class="text-left">
              <a :href="e.link" target="_blank">{{ e.name }}</a>
            </td>
            <td>{{ moment(new Date(e.start_time)).format("HH:mm") }}</td>
            <td>{{ moment(new Date(e.end_time)).format("HH:mm") }}</td>
            <td>{{ eventAirports(e) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>