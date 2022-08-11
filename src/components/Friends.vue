<script setup>
import { ref, inject } from "vue";

const cfg = inject("appConfig");
const onlineCIDS = ref([]);
const isFetching = ref(false);

async function getOnlineCids() {
  isFetching.value = true;
  await fetch(cfg.cidsURL + cfg.friendsCID)
    .then((ret) => ret.json())
    .then((data) => {
      onlineCIDS.value = data;
    });
  isFetching.value = false;
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
      <q-markup-table dense flat wrap-cells class="text-center">
        <thead>
          <tr>
            <th>Status</th>
            <th>Name</th>
            <th>Info</th>
          </tr>
        </thead>

        <tbody v-for="(f, index) in onlineCIDS" :key="index">
          <tr v-if="f.callsign">
            <td>
              <q-badge class="q-pa-xs" color="green">
                <q-icon :name="cfg.status[f.clienttype]" class="q-mr-xs" />{{
                  f.clienttype
                }}</q-badge
              >
            </td>
            <td>{{ f.realname }}</td>
            <td>{{ f.callsign }}</td>
          </tr>
        </tbody>
      </q-markup-table>
    </q-card-section>
  </q-card>
</template>;