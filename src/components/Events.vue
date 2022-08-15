<script setup>
import { ref, inject } from "vue";
import { date } from "quasar";
import appConfig from "src/config";

const todaysEvents = ref([]);

function eventAirports(e) {
  let airports = "";
  e.airports.forEach((a) => (airports += a.icao + " "));
  return airports;
}

async function getEvents() {
  await fetch(appConfig.eventsURL + '?nonce=' + date.formatDate(Date.now(), 'YYMMDDHHmmssSS'))
    .then((ret) => ret.json())
    .then((json) => {
      todaysEvents.value = json.data.filter((e) =>
        date.getDateDiff(Date.now(), e.start_time, "days") == 0 ? true : false
      );
    });
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
      <q-markup-table bordered dense flat wrap-cells class="text-center">
        <thead>
          <tr class="bg-grey-1">
            <th class="text-left">Event Name</th>
            <th>Start(LT)</th>
            <th>End(LT)</th>
            <th>Airports</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(e, index) in todaysEvents" :key="index">
            <td class="text-left">
              <a class="link-no-decoration text-black" :href="e.link" target="_blank">{{ e.name }}
                <q-icon name="open_in_new" />
              </a>
            </td>
            <td>{{ date.formatDate(new Date(e.start_time), "HH:mm") }}</td>
            <td>{{ date.formatDate(new Date(e.end_time), "HH:mm") }}</td>
            <td>{{ eventAirports(e) }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>
