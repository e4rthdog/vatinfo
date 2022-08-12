<script setup>
import { ref, inject } from "vue";
import { date } from "quasar";

const cfg = inject("appConfig");
const onlineCIDS = ref([]);

async function getOnlineCids() {
  await fetch(
    cfg.cidsURL +
    cfg.friendsCID +
    "&nonce=" +
    date.formatDate(Date.now(), "YYMMDDHHmmssSS")
  )
    .then((ret) => ret.json())
    .then((data) => {
      onlineCIDS.value = data;
    });
}

defineExpose({ getOnlineCids });
</script>

<template>
  <q-card style="height: 100%">
    <q-card-section class="bg-primary text-white">
      <q-icon name="people" size="1.5rem" class="q-mr-sm" />
      <span>Online CIDs</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-markup-table dense flat wrap-cells class="text-center" bordered>
        <thead>
          <tr class="bg-grey-1">
            <th class="text-left">Status</th>
            <th>Name</th>
            <th>Callsign</th>
            <th>Since</th>
          </tr>
        </thead>

        <tbody v-for="(f, index) in onlineCIDS" :key="index">
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
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>
