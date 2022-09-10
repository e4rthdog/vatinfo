<script setup>
import { ref, inject, onMounted, computed, watch } from "vue";
import { useQuasar, QSpinnerGears, date, QSpinnerHourglass } from "quasar";
import { useVatinfoStore } from "src/stores/vatinfo-store";
import appConfig from "src/config";
import PanelBar from "./PanelBar.vue";
import metarParser from "aewx-metar-parser";

const cfgStore = useVatinfoStore();
const txtICAO = ref("");
const arrMetarsSorted = computed(() =>
  cfgStore.arrMetars.sort((a, b) => (a.icao > b.icao ? 1 : -1))
);
const $q = useQuasar();
const panelVisible = ref(true);

async function getMetar(icao = txtICAO.value.toUpperCase()) {
  return await fetch(
    appConfig.metarURL +
      icao +
      "&nonce=" +
      date.formatDate(Date.now(), "YYMMDDHHmmssSS")
  )
    .then((ret) => ret.text())
    .then((m) => {
      return { icao: icao, metar: m };
    })
    .catch((error) => {
      console.log(`getMetar -> ${error}`);
    });
}

async function refreshAllMetars() {
  for await (const m of cfgStore.arrMetars) {
    await getMetar(m.icao).then((d) => {
      m.metar = d.metar;
      m.category = metarParser(d.metar).flight_category;
    });
  }
}

async function updatePanel() {
  if (
    !cfgStore.arrMetars.find(
      (m) => m.icao.toUpperCase() === txtICAO.value.toUpperCase().trim()
    )
  ) {
    $q.loading.show({
      message: `Fetching metar: ${txtICAO.value.toUpperCase().trim()}`,
      spinner: QSpinnerHourglass,
    });
    await getMetar().then((d) => {
      if (d.metar.trim() != "")
        cfgStore.$patch((state) => {
          d.category = metarParser(d.metar).flight_category;
          state.arrMetars.push(d);
        });
    });
    $q.loading.hide();
  }

  txtICAO.value = "";
}

function clearMetars() {
  cfgStore.clearMetars();
}

const loadMetars = async () => {
  $q.loading.show({
    message: "Loading your favorite ICAOs ...",
    spinner: QSpinnerHourglass,
  });
  await cfgStore.loadIdentDataAPI("metars");
  await refreshAllMetars();
  $q.loading.hide();
};

const saveMetarsPanel = async () => {
  $q.loading.show({
    message: "Saving you favorite ICAOs ...",
    spinner: QSpinnerHourglass,
  });
  await cfgStore.saveMetarsDB(cfgStore.arrMetars);
  $q.loading.hide();
};

onMounted(async () => {});

defineExpose({ refreshAllMetars });
</script>

<template>
  <q-card>
    <PanelBar>
      <template #title>
        <span>
          <q-icon name="people" size="1.5rem" class="q-mr-sm" />METAR Info
        </span>
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
        <q-card-section class="q-pt-none">
          <div class="row items-center">
            <div class="col-12 col-lg-5">
              <q-input
                id="txtMetar"
                @keypress.enter="updatePanel()"
                color="positive"
                v-model.trim="txtICAO"
                dense
                label="Airport ICAO"
              >
                <template v-slot:prepend>
                  <q-icon name="flight_takeoff" />
                </template>
              </q-input>
            </div>
            <div class="col-12 col-lg-7">
              <q-btn-group push :stretch="false" class="q-ma-md">
                <q-btn
                  @click="updatePanel()"
                  label="Get it"
                  color="primary"
                  class="footer-text"
                />
                <q-btn
                  @click="refreshAllMetars()"
                  label="Refresh"
                  color="info"
                  class="footer-text"
                />
                <q-btn
                  @click="clearMetars()"
                  label="Clear"
                  color="negative"
                  class="footer-text"
                />
                <q-btn-dropdown color="primary" icon="save" class="footer-text">
                  <q-list>
                    <q-item clickable v-close-popup @click="loadMetars()">
                      <q-item-section>
                        <q-item-label>Load</q-item-label>
                      </q-item-section>
                    </q-item>

                    <q-item clickable v-close-popup @click="saveMetarsPanel()">
                      <q-item-section>
                        <q-item-label>Save</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </q-btn-group>
            </div>
          </div>
          <div class="row bg-yellow-1 q-mt-md" style="font-size: 0.8rem">
            <div class="col-12">
              <q-markup-table
                bordered
                dense
                flat
                wrap-cells
                class="full-width text-left e4-panel-table-sm"
              >
                <thead class="bg-grey-1">
                  <tr>
                    <th>METAR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(m, index) in arrMetarsSorted" :key="index">
                    <td>
                      <q-badge
                        v-if="m.metar != ''"
                        class="q-pa-xs"
                        :color="appConfig.metarCategory[m.category]"
                        >{{ m.category }}
                      </q-badge>
                      {{ m.metar }}
                      <q-badge text-color="white" class="transparent">
                        <q-btn
                          v-if="m.metar != ''"
                          dense
                          color="negative"
                          size="0.4rem"
                          icon="clear"
                          class="q-mx-none"
                          @click="cfgStore.removeMetar(m.icao)"
                        />
                      </q-badge>
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
