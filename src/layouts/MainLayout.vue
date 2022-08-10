<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-weight-thin text-h5 text-center"
          >VATINFO Panels</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <div>
        Made with Quasar {{ $q.version }} - Running on
        {{ $q.platform.is.name }}, v{{ $q.platform.is.version }}
      </div>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();
</script>
