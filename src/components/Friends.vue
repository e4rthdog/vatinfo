<script setup>
import { ref, inject, computed, onMounted } from "vue";
import { useQuasar, QSpinnerGears, date, QSpinnerHourglass } from "quasar";
import { useVatinfoStore } from "src/stores/vatinfo-store";
import appConfig from "src/config";
import _ from 'lodash';
import PanelBar from "./PanelBar.vue";

const cfgStore = useVatinfoStore();
const onlineCIDS = ref([]);
const dlgManage = ref(false);
const txtCID = ref()
const allClients = inject('allClients');
const $q = useQuasar();
const panelVisible = ref(true)

const loadCID = async () => {
  $q.loading.show({ message: "Loading your favorite Pilots/Controllers ...", spinner: QSpinnerHourglass })
  await cfgStore.loadIdentDataAPI('friends');
  await getOnlineCids();
  $q.loading.hide();
}

const saveCID = async () => {
  $q.loading.show({ message: "Saving your favorite Pilots/Controllers ...", spinner: QSpinnerHourglass })
  await cfgStore.saveCIDDB(cfgStore.arrCIDS)
  $q.loading.hide();

}

async function formAddCID() {
  cfgStore.$patch((state) => {
    state.arrCIDS.push(txtCID.value.toUpperCase());
  });
  txtCID.value = '';
  await getOnlineCids();
}

function formClearCID() {
  cfgStore.$patch((state) => {
    state.arrCIDS = []
  });
  onlineCIDS.value = [];
}

async function formRemoveCID(toRemove = txtCID.value.toUpperCase()) {
  cfgStore.removeCID(toRemove);
  txtCID.value = ''
  await getOnlineCids();
}


const getOnlineCids = async () => {
  onlineCIDS.value = [];
  cfgStore.arrCIDS.forEach((cid) => {
    let results = allClients.value.filter((client) => {
      if (client.clienttype === 'ATC') {
        return client.callsign.startsWith(cid) || client.cid === cid
      } else {
        return client.callsign == cid || client.cid === cid
      }
    })
    onlineCIDS.value = onlineCIDS.value.concat(results)
  })
  onlineCIDS.value = _.uniq(onlineCIDS.value);
}

defineExpose({ getOnlineCids });
</script>

<template>
  <q-card>
    <PanelBar>
      <template #title>
        <span>
          <q-icon name="people" size="1.5rem" class="q-mr-sm" />Tracked Members
        </span>
      </template>
      <template #content>
        <q-btn label="Manage" icon="manage_accounts" size="sm" color="positive" class="float-right"
          @click="dlgManage = true;"></q-btn>
      </template>
      <template #window-control>
        <q-toggle v-model="panelVisible" label="" checked-icon="visibility" unchecked-icon="visibility_off"
          color="positive" class="float-right" />
      </template>
    </PanelBar>
    <q-separator />
    <q-slide-transition>
      <q-card-section v-show="panelVisible">
        <q-markup-table bordered dense flat wrap-cells class="text-center e4-panel-table-lg">
          <thead>
            <tr class="bg-grey-1">
              <th class="text-left">Status</th>
              <th>Name</th>
              <th>Callsign</th>
              <th>Since</th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(f, index) in onlineCIDS" :key="index">
              <tr v-if="f.callsign">
                <td class="text-left">
                  <q-badge class="q-pa-xs" color="green">
                    <q-icon :name="appConfig.status[f.clienttype]" class="q-mr-xs" />{{
                        f.clienttype
                    }}
                  </q-badge>
                </td>
                <td>
                  {{ f.realname }}
                  <template v-if="f.clienttype === 'PILOT'">
                    <q-badge class="q-ml-sm">{{ f.planned_depairport }}</q-badge>
                    <q-icon name="east" class="q-mx-xs" />
                    <q-badge>{{ f.planned_destairport }}</q-badge>
                  </template>

                </td>
                <td>{{ f.callsign }}</td>
                <td v-html="
                  `${f.time_logon.slice(8, 10)}:${f.time_logon.slice(10, 12)}z`
                "></td>
              </tr>
            </template>
          </tbody>
        </q-markup-table>
      </q-card-section>
    </q-slide-transition>
  </q-card>

  <q-dialog v-model="dlgManage" persistent transition-show="scale" transition-hide="scale">
    <q-card style="width:300px;">
      <q-card-section class="bg-primary text-white">
        <div>Manage CIDs to track Online Status</div>
      </q-card-section>
      <q-card-section class="q-pa-xs">
        <div class="col-12 col-lg-7 q-ma-xs">
          <q-input id="txtCID" @keypress.enter="formAddCID()" color="positive" v-model.trim="txtCID"
            label="CID, Callsign (Pilot), Callsign* (ATC)" dense>
            <template v-slot:prepend>
              <q-icon name="people" />
            </template>
          </q-input>

        </div>

        <div class="col-12 col-lg-7 text-center">
          <q-btn-group push :stretch="false" class="q-mt-sm ">
            <q-btn @click="formAddCID()" label="Add" color="primary" class="footer-text" />
            <q-btn @click="formRemoveCID()" label="Remove" color="primary" class="footer-text" />
            <q-btn @click="formClearCID()" label="Clear" color="negative" class="footer-text" />
            <q-btn-dropdown color="primary" icon="save" class="footer-text">
              <q-list>
                <q-item clickable v-close-popup @click="loadCID()">
                  <q-item-section>
                    <q-item-label>Load</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="saveCID()">
                  <q-item-section>
                    <q-item-label>Save</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </div>

      </q-card-section>
      <q-card-section style="height:200px;overflow-y: auto;" class="q-ma-none q-pa-xs">
        <div v-for="(f, index) in cfgStore.arrCIDS" :key="index" class="column inline">
          <q-chip dense square color="blue-grey-2" class="q-ma-xs">
            {{ f }}
            <q-badge text-color="white" class="transparent">
              <q-btn dense color="negative" size="0.4rem" icon="clear" class="q-mx-none" @click="formRemoveCID(f)" />
            </q-badge>
          </q-chip>
        </div>
      </q-card-section>
      <q-card-actions align="right" class="positive text-white bg-primary">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>
