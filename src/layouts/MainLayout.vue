<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white shadow-5" height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="text-weight-thin text-h5 text-center">VATINFO Panels</q-toolbar-title>
        <q-btn @click="$refs.view.updateData()" icon="update" color="positive" label="Refresh All" size="md" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <component ref="view" :is="Component" />
      </router-view>

    </q-page-container>

    <q-footer elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="footer-text text-center">
          Made with Quasar
          <q-badge outline color="white">{{ $q.version }}</q-badge> - Running on
          {{ $q.platform.is.name }},
          <q-badge outline color="white">v{{ $q.platform.is.version }}</q-badge>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
// import { refs } from 'vue'
// console.log(this.$refs);

</script>
