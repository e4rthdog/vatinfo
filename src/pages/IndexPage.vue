<template>
  <q-page class="q-ma-md justify-evenly">
    <div class="row justify-evenly">
      <div class="col-12 col-md-5 q-ma-sm">
        <q-card class="my-card" squared bordered>
          <q-card-section class="bg-info">
            <div class="text-h6">Our Changing Planet</div>
            <div class="text-subtitle2">by John Doe</div>
          </q-card-section>

          <q-markup-table>
            <thead>
              <tr>
                <th class="text-left">Dessert (100g serving)</th>
                <th class="text-right">Calories</th>
                <th class="text-right">Fat (g)</th>
                <th class="text-right">Carbs (g)</th>
                <th class="text-right">Protein (g)</th>
                <th class="text-right">Sodium (mg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="text-left">Frozen Yogurt</td>
                <td class="text-right">159</td>
                <td class="text-right">6</td>
                <td class="text-right">24</td>
                <td class="text-right">4</td>
                <td class="text-right">87</td>
              </tr>
              <tr>
                <td class="text-left">Ice cream sandwich</td>
                <td class="text-right">237</td>
                <td class="text-right">9</td>
                <td class="text-right">37</td>
                <td class="text-right">4.3</td>
                <td class="text-right">129</td>
              </tr>
            </tbody>
          </q-markup-table>
        </q-card>
      </div>
      <div class="col-12 col-md-5 bg-light-green shadow-5 q-ma-sm">
        <p class="cursor-not-allowed">Ton hpiate poikilotropos</p>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";

const $q = useQuasar();
</script>
