<template>
  <q-card>
    <q-card-section class="bg-primary text-white">
      <q-icon name="people" size="1.5rem" class="q-mr-sm" />
      <span>METAR Info</span>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <p>{{ allClients.length }}</p>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref, inject } from "vue";
import { date } from "quasar";

const cfg = inject("appConfig");
const allClients = inject('allClients');
const todaysEvents = ref([]);

</script>
