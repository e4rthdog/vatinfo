<template>
  <router-view />
</template>

<script setup>
import { provide } from "vue";
import appConfig from "src/config";

provide("appConfig", appConfig);
</script>
