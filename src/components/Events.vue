<script setup>
import { ref, watch, inject, computed } from "vue";
import { date } from "quasar";

const allEvents = inject('allEvents', []);
const listEvents = computed(() => allEvents.value.filter((e) => Math.abs(date.getDateDiff(Date.now(), e.start_time, "days")) <= selectEvents.value ? true : false));
const selectEvents = ref(0);
const panelVisible = ref(true)

function eventAirports(e) {
  let airports = "";
  e.airports.forEach((a) => (airports += a.icao + " "));
  return airports;
}

</script>

<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <q-icon name="event" size="1.5rem" class="q-mr-sm" />
      <span>Events</span>
      <q-toggle v-model="panelVisible" label="" checked-icon="visibility" unchecked-icon="visibility_off"
        color="positive" class="q-mb-md float-right" />
      <q-badge color="orange" class="q-mx-sm">{{ listEvents.length }}</q-badge>
      <q-btn-toggle v-model="selectEvents" size="sm" push text-color="black" color="white" toggle-text-color="white"
        toggle-color="positive" class="float-right" :options="[
          { label: 'Today', value: 0 },
          { label: '+1', value: 1 },
          { label: '+7', value: 7 }
        ]" />
    </q-card-section>
    <q-separator />
    <q-slide-transition>
      <div v-show="panelVisible">
        <q-card-section class="q-ma-xs">
          <q-markup-table bordered dense flat wrap-cells class="text-center e4-panel-table-lg">
            <thead>
              <tr class="bg-grey-1">
                <th class="text-left">Event Name</th>
                <th>Start(LT)</th>
                <th>Airports</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(e, index) in listEvents" :key="index">
                <td class="text-left">
                  <a class="link-no-decoration text-black" :href="e.link" target="_blank">{{ e.name }}
                    <q-icon name="open_in_new" />
                  </a>
                </td>
                <td>{{ date.formatDate(new Date(e.start_time), "ddd DD/MM/YY HH:mm") }}-{{ date.formatDate(new
                    Date(e.end_time), "HH:mm")
                }}</td>
                <td>{{ eventAirports(e) }}</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
