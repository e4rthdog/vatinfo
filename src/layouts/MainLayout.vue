<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white shadow-5" height-hint="98">
      <div class="row items-center justify-around">
        <div class="col-12 col-sm-5 text-center">
          <h1 class="text-weight-400 text-h5 q-ma-none">VATINFO Panels</h1>
        </div>
        <div class="col-12 col-sm-5 text-center q-ma-xs">
          <q-chip dense square color="blue-grey-2" icon="home">
            <q-badge color="accent" text-color="white" class="q-mx-sm">{{ currentTime }} / {{ currentUTCTime }}z
            </q-badge>
          </q-chip>
          <q-chip dense square color="blue-grey-2" icon="published_with_changes">
            <q-badge color="accent" text-color="white" class="q-mx-sm"> {{ lastRefresh }}</q-badge>
          </q-chip>
          <q-btn @click="$refs.view.updateData(); updateRefreshTime()" icon="update" color="positive"
            label="Refresh All" size="sm" class='q-ma-xs' />
          <q-btn @click="logout()" icon="logout" color="negative" :label="`LogOut (${cfgStore.ident})`" size="sm" />
        </div>
      </div>
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
          <q-badge outline color="white">{{ $q.version }}</q-badge> - App version:
          <q-badge outline color="white">v{{ version }}</q-badge>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, provide } from 'vue';
import { date } from "quasar";
import { useVatinfoStore } from 'src/stores/vatinfo-store';
import { useRouter } from 'vue-router';
import { version } from '../../package'

const router = useRouter();
const cfgStore = useVatinfoStore();
const currentUTCTime = ref()
const currentTime = ref()
const lastRefresh = ref()
const updateTime = () => {
  let d = new Date()
  currentUTCTime.value = `${d.getUTCHours().toString().padStart(2, '0')}:${d.getUTCMinutes().toString().padStart(2, '0')}`
  currentTime.value = date.formatDate(d, 'HH:mm')
}

const updateRefreshTime = () => {
  lastRefresh.value = currentTime.value
}

const logout = async () => {
  await cfgStore.authAction();
  router.push('/login')
}
provide('updateRefreshTime', updateRefreshTime)

onMounted(async () => {
  if (cfgStore.isAuthenticated) {
    await cfgStore.loadIdentDataAPI()
    cfgStore.updateArrMetars()
  };
  updateTime();
  updateRefreshTime();
  setInterval(() => {
    updateTime()
  }, 60000);
})

</script>
