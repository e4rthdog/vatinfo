<script setup>
import { onMounted, ref } from 'vue';
import { useVatinfoStore } from 'src/stores/vatinfo-store';
import { useRouter } from 'vue-router';

const txtIdent = ref('')
const cfgStore = useVatinfoStore();
const router = useRouter();

const login = async () => {
  await cfgStore.authAction(txtIdent.value.toUpperCase());
  router.push('/')
}

onMounted(() => {
  txtIdent.value = cfgStore.previousIdent;
})

</script>

<template>
  <div class="bg-blue-3 window-height window-width row justify-center items-center">
    <div class="row">
      <q-card id="login-form-card" square bordered class="q-pa-md shadow-3">
        <q-card-section class="">
          <div class="row justify-center">
            <p class="text-h5 q-my-xs">VATINFO</p>
          </div>
        </q-card-section>
        <q-card-section>
          <q-form class="q-gutter-md">
            <q-input id="txtMetar" @keypress.enter="login" color="positive" v-model.trim="txtIdent" dense
              label="config ID">
              <template v-slot:prepend>
                <q-icon name="badge" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md justify-center">
          <span class="q-ma-sm">A unique identification under which we save favorite callsings, metars e.t.c. Use
            something unique to you cause there is no password protection</span>
          <q-btn unelevated color="positive" size="md" class="full-width" label="Continue" @click="login" />
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


