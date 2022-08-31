<script setup>
import { ref, watch, inject, computed, onMounted } from "vue";
import { date, QSpinnerHourglass, useQuasar } from "quasar";
import PanelBar from "./PanelBar.vue";
import { useVatinfoStore } from "src/stores/vatinfo-store";
import appConfig from "src/config";
import { storeToRefs } from 'pinia'

const $q = useQuasar();
const cfgStore = useVatinfoStore();
const allEvents = inject('allEvents', []);
const dlgFilter = ref(false);
const filterStatus = computed(() => selectedDivisionsValues.value.length === 0 ? 'ALL' : selectedDivisionsValues.value.length)
const listEvents = computed(() => {
  let result = allEvents.value.filter((e) => Math.abs(date.getDateDiff(Date.now(), e.start_time, "days")) <= selectEvents.value ? true : false)
  if (selectedDivisionsValues.value.length != 0) {
    result = result.filter(e => selectedDivisionsValues.value.includes(e.organisers[0].division))
  }
  return result;
});
const selectEvents = ref(0);
const panelVisible = ref(true);
const selectedDivisions = ref([]);
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

const loadDivisionsPanel = async () => {
  $q.loading.show({ message: "Loading your favorite Event divisions ...", spinner: QSpinnerHourglass })
  selectedDivisions.value = [];
  await cfgStore.loadIdentDataAPI('events');
  loadSelectedDivisions();
  $q.loading.hide();
}
const saveDivisionsPanel = async () => {
  $q.loading.show({ message: "Saving your event divisions ...", spinner: QSpinnerHourglass })
  await cfgStore.saveDIVDB(selectedDivisionsValues.value)
  $q.loading.hide();
}

function eventAirports(e) {
  let airports = "";
  e.airports.forEach((a) => (airports += a.icao + " "));
  return airports;
}

const clickManage = () => {
  dlgFilter.value = true;
}

const loadSelectedDivisions = () => {
  cfgStore.arrDivisions.forEach(d => {
    selectedDivisions.value.push({ value: d, label: appConfig.vatsimDivisions[d] })
  })
}
onMounted(async () => {
  loadSelectedDivisions();
})

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
        <div class="row items-center q-pa-none q-ma-none">
          <div class="column col-12 col-lg-6 items-center q-my-lg-none q-my-sm">
            <q-btn-toggle class="q-mr-none q-mr-lg-md" v-model="selectEvents" size="sm" push text-color="black"
              color="white" toggle-text-color="white" toggle-color="positive" :options="[
                { label: 'Today', value: 0 },
                { label: '+1', value: 1 },
                { label: '+7', value: 7 }
              ]" />
          </div>
          <div class="column col-12 col-lg-6 items-center">
            <q-btn icon="filter_alt" size="sm" color="positive" @click="clickManage()">Filter<q-badge color="orange"
                class="q-mx-sm">
                {{ filterStatus }}</q-badge>
            </q-btn>
          </div>
        </div>
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

  <!-- Filter Dialog window -->
  <q-dialog v-model="dlgFilter" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width:300px;">
      <q-card-section class="bg-primary text-white">
        <div>Filter events</div>
      </q-card-section>
      <q-card-section class="q-pa-xs">
        <div class="row items-center q-ma-xs">
          <div class="col-12" style="height:300px;overflow-y: auto;">
            <q-select label="Select Divisions." v-model="selectedDivisions" clearable multiple dense use-chips
              options-dense :options="vatsimDivisionsArr" :display-value="selectedDivisionsValues" />
          </div>
          <div class="col-12 text-center">
            <q-btn-group push :stretch="false" class="q-ma-md">
              <q-btn @click="loadDivisionsPanel()" label="Load" color="primary" class="footer-text" />
              <q-btn @click="saveDivisionsPanel()" label="Save" color="info" class="footer-text" />
            </q-btn-group>
          </div>

        </div>
      </q-card-section>
      <q-card-actions align="right" class="positive text-white bg-primary">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>
