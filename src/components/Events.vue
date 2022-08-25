<script setup>
import { ref, watch, inject, computed } from "vue";
import { date } from "quasar";
import PanelBar from "./PanelBar.vue";
import { useVatinfoStore } from "src/stores/vatinfo-store";
import appConfig from "src/config";

const cfgStore = useVatinfoStore();
const allEvents = inject('allEvents', []);
const listEvents = computed(() => {
  let result = allEvents.value.filter((e) => Math.abs(date.getDateDiff(Date.now(), e.start_time, "days")) <= selectEvents.value ? true : false)
  if (selectedDivisionsValues.value.length != 0) {
    result = result.filter(e => selectedDivisionsValues.value.includes(e.organisers[0].division))
  }
  return result;
});
const selectEvents = ref(0);
const panelVisible = ref(true);
const selectedDivisions = ref(null);
const selectedDivisionsValues = computed(() => {
  let result = []
  selectedDivisions.value?.forEach(d => result.push(d.value));
  return result;
})
const vatsimDivisionsArr = computed(() => {
  let result = [];
  for (let d in appConfig.vatsimDivisions) {
    result.push({ label: appConfig.vatsimDivisions[d], value: d });
  }
  return result.sort();
})

function eventAirports(e) {
  let airports = "";
  e.airports.forEach((a) => (airports += a.icao + " "));
  return airports;
}

</script>

<template>
  <q-card>
    <PanelBar>
      <template #title>
        <span>
          <q-icon name="event" size="1.5rem" class="q-mr-sm q-mb-lg-none q-mb-sm" />Events <q-badge color="orange"
            class="q-mx-sm ">{{
                listEvents.length
            }}</q-badge>
        </span>
      </template>
      <template #content>
        <q-btn-toggle v-model="selectEvents" size="sm" push text-color="black" color="white" toggle-text-color="white"
          toggle-color="positive" class="float-right" :options="[
            { label: 'Today', value: 0 },
            { label: '+1', value: 1 },
            { label: '+7', value: 7 }
          ]" />
      </template>
      <template #window-control>
        <q-toggle v-model="panelVisible" label="" checked-icon="visibility" unchecked-icon="visibility_off"
          color="positive" class="float-right" />
      </template>
    </PanelBar>
    <q-separator />
    <q-slide-transition>
      <div v-show="panelVisible">
        <q-card-section class="q-ma-xs q-pt-none">
          <div class="row items-center q-ma-xs">
            <div class="col-12">
              <q-select class="full-width" label="Select Divisions." v-model="selectedDivisions" use-chips multiple
                dense options-dense :options="vatsimDivisionsArr" />
            </div>
          </div>
          <div class="row items-center">
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
                      ({{ e.organisers[0].division }})
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
          </div>

        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>
