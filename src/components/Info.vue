<template>
  <q-card>
    <PanelBar>
      <template #title>
        <span>
          <q-icon
            name="info"
            size="1.5rem"
            class="q-mr-sm q-mb-lg-none q-mb-sm"
          />General Info
        </span>
      </template>
      <template #content>
        <q-btn-toggle
          v-model="selectPositions"
          size="sm"
          push
          text-color="black"
          color="white"
          toggle-text-color="white"
          toggle-color="positive"
          class=""
          :options="[
            { label: 'CTR', value: 'CTR' },
            { label: 'APP', value: 'APP' },
            { label: 'TWR', value: 'TWR' },
            { label: 'GND', value: 'GND' },
            { label: 'DEL', value: 'DEL' },
          ]"
        />
      </template>
      <template #window-control>
        <q-toggle
          v-model="panelVisible"
          label=""
          checked-icon="visibility"
          unchecked-icon="visibility_off"
          color="positive"
          class="float-right"
        />
      </template>
    </PanelBar>
    <q-separator />
    <q-slide-transition>
      <div v-show="panelVisible">
        <q-card-section class="q-pa-xs">
          <div class="row justify-center">
            <q-chip dense square color="blue-grey-2" icon="travel_explore">
              Total Clients
              <q-badge color="positive" text-color="white" class="q-mx-sm">{{
                allClients.length
              }}</q-badge>
            </q-chip>
            <q-chip dense square color="blue-grey-2" icon="flight">
              Pilots
              <q-badge color="positive" text-color="white" class="q-mx-sm">{{
                totalByType["PILOT"]
              }}</q-badge>
            </q-chip>
            <q-chip
              dense
              square
              color="blue-grey-2"
              icon="settings_input_antenna"
            >
              ATC
              <q-badge color="positive" text-color="white" class="q-mx-sm">{{
                totalByType["ATC"]
              }}</q-badge>
            </q-chip>
          </div>
        </q-card-section>

        <q-card-section class="q-pa-xs">
          <div class="row">
            <div class="col-12 q-pa-sm">
              <q-markup-table
                bordered
                dense
                flat
                wrap-cells
                class="full-width text-left e4-panel-table-sm"
              >
                <thead>
                  <tr class="bg-grey-1">
                    <th>
                      Callsign
                      <q-badge color="orange" class="q-mx-sm">{{
                        totalPositions.get(selectPositions).length
                      }}</q-badge>
                    </th>
                    <th>Name</th>
                    <th>Since</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(m, index) in totalPositions.get(selectPositions)"
                    :key="index"
                  >
                    <td>{{ m.callsign }}</td>
                    <td>{{ m.realname }}</td>
                    <td>
                      {{ m.time_logon_str }} / ({{
                        calculateTimeDifferenceInMinutesFromCurrent(
                          m.time_logon
                        )
                      }}')
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </div>
          </div>
        </q-card-section>
      </div>
    </q-slide-transition>
  </q-card>
</template>

<script setup>
import PanelBar from "./PanelBar.vue";
import { ref, inject, computed } from "vue";
import { date } from "quasar";
import appConfig from "src/config";
import { calculateTimeDifferenceInMinutesFromCurrent } from "src/utils/datetimeUtils";
const allClients = inject("allClients");
const tabName = ref("ctr");
const panelVisible = ref(true);
const selectPositions = ref("CTR");

const totalPositions = computed(() => {
  let result = new Map();
  result.set("CTR", createTypeArray("CTR"));
  result.set("APP", createTypeArray("APP"));
  result.set("DEL", createTypeArray("DEL"));
  result.set("TWR", createTypeArray("TWR"));
  result.set("GND", createTypeArray("GND"));
  result.set("DEL", createTypeArray("DEL"));
  return result;
});

const totalByType = computed(() => {
  let res = {};
  allClients.value.forEach((cl) => {
    res[cl.clienttype] = (res[cl.clienttype] || 0) + 1;
  });
  return res;
});

function createTypeArray(type) {
  let res = allClients.value.filter((c) => c.callsign.includes(type));
  res.forEach(
    (c) =>
      (c.time_logon_str = `${c.time_logon.slice(8, 10)}:${c.time_logon.slice(
        10,
        12
      )}z`)
  );
  return res.sort((a, b) => (a.callsign > b.callsign ? 1 : -1));
}
</script>
