<script setup>
import { onMounted, ref } from 'vue';
import { useVatinfoStore } from 'src/stores/vatinfo-store';
import { useRouter } from 'vue-router';
import { QSpinnerGears, useQuasar, date, QSpinnerHourglass } from "quasar";

const $q = useQuasar();
const txtIdent = ref('')
const cfgStore = useVatinfoStore();
const router = useRouter();

const login = async () => {
  $q.loading.show({ message: "Summoning the KRAKEN ...", spinner: QSpinnerHourglass })
  await cfgStore.authAction(txtIdent.value.toUpperCase());
  $q.loading.hide();
  router.push({ name: "Root" });
}

onMounted(() => {
  txtIdent.value = cfgStore.ident;
})

</script>

<template>
  <div class="bg-blue-3 window-height window-width row justify-center items-center">
    <div class="row">
      <q-card id="login-form-card" square bordered class="q-pa-sm shadow-3">
        <q-card-section class="q-pa-none">
          <div class="row justify-center">
            <p class="text-h5 q-my-xs">VATINFO</p>
          </div>
        </q-card-section>
        <q-card-section class="q-pa-md">
          <q-form class="q-gutter-md">
            <q-input id="txtMetar" @keypress.enter.prevent="login()" color="positive" v-model.trim="txtIdent" dense
              label="config ID">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md justify-center">
          <span class="q-ma-sm footer-text text-center">A unique identification under which we save favorite settings.No
            password protection</span>
          <p class="footer-text text-center">Information provided are publicly available from VATSIM.</p>
          <p class="footer-text text-center">VATINFO keep no personal data.</p>
          <q-btn unelevated color="positive" size="md" class="full-width" label="Continue" @click="login()" />
        </q-card-actions>
      </q-card>
    </div>
  </div>

</template>

<style>
#login-form-card {
  width: 300px;
}
</style>


