<script setup>
import { ref, inject, computed, onMounted } from "vue";
import { date } from "quasar";
import { useVatinfoStore } from "src/stores/vatinfo-store";

const cfgStore = useVatinfoStore();
const cfg = inject("appConfig");
const onlineCIDS = ref([]);
const trackedCIDS = ref([])
const trackedCIDSfetch = computed(() => { return trackedCIDS.value.join(',') });
const dlgManage = ref(false);
const txtCID = ref()

function formAddCID() {
  trackedCIDS.value.push(txtCID.value);
  txtCID.value = '';
  console.log(trackedCIDSfetch.value)
}

function formRemoveCID() {
  trackedCIDS.value = trackedCIDS.value.filter(s => s != txtCID.value);
  txtCID.value = ''
}
async function getOnlineCids() {
  await fetch(
    cfg.cidsURL +
    trackedCIDSfetch.value +
    "&nonce=" +
    date.formatDate(Date.now(), "YYMMDDHHmmssSS")
  )
    .then((ret) => ret.json())
    .then((data) => {
      onlineCIDS.value = data;
    });
  console.log(trackedCIDSfetch.value)
}

onMounted(() => {
  trackedCIDS.value = cfgStore.loadCIDS();
})

defineExpose({ getOnlineCids });
</script>

<template>
  <q-card style="height: 100%">
    <q-card-section class="bg-primary text-white">
      <q-icon name="people" size="1.5rem" class="q-mr-sm" />
      <span>Online CIDs</span>
      <q-btn label="Manage" icon="manage_accounts" size="sm" color="positive" class="float-right"
        @click="dlgManage = true;"></q-btn>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-markup-table bordered dense flat wrap-cells class="text-center">
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
                  <q-icon :name="cfg.status[f.clienttype]" class="q-mr-xs" />{{
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
  </q-card>

  <q-dialog v-model="dlgManage" persistent transition-show="scale" transition-hide="scale">
    <q-card>
      <q-card-section class="bg-grey-3 ">
        <div>Manage CIDs to track Online Status</div>
      </q-card-section>
      <q-card-section>
        <div class="col-12 col-lg-7">
          <q-input id="txtCID" @keypress.enter="formAddCID()" color="positive" v-model.trim="txtCID" label="CID" dense>
            <template v-slot:prepend>
              <q-icon name="people" />
            </template>
          </q-input>

        </div>

        <div class="col-12 col-lg-7">
          <q-btn-group push :stretch="false" class="q-ma-md">
            <q-btn @click="formAddCID()" label="Add" color="primary" class="footer-text" />
            <q-btn @click="formRemoveCID()" label="Remove" color="primary" class="footer-text" />
            <q-btn @click="trackedCIDS = []" label="Clear" color="negative" class="footer-text" />
            <q-btn-dropdown color="primary" icon="import_export" class="footer-text">
              <q-list>
                <q-item clickable v-close-popup @click="trackedCIDS = cfgStore.loadCIDS()">
                  <q-item-section>
                    <q-item-label>Load</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="cfgStore.saveCIDS(trackedCIDS)">
                  <q-item-section>
                    <q-item-label>Save</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </q-btn-group>
        </div>

      </q-card-section>
      <q-card-section>
        {{ trackedCIDSfetch }}
      </q-card-section>
      <q-card-actions align="right" class="positive text-teal">
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>

  </q-dialog>
</template>
