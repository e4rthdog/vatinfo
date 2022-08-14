import { defineStore } from "pinia";
import { ref } from "vue";

export const useVatinfoStore = defineStore("vatinfo", () => {
  const ident = ref("");

  const updateIdent = (v) => (ident.value = v);

  return { ident, updateIdent };
});
