import { defineStore } from "pinia";
import { ref, inject, computed, reactive } from "vue";
import { date } from "quasar";
import appConfig from "src/config";

export const useVatinfoStore = defineStore("vatinfo", () => {
  const ident = ref("");
  const previousIdent = ref("");
  const identDBdATA = ref([]);
  const isAuthenticated = computed(() => {
    return ident.value === "" ? false : true;
  });

  const saveMetars = (v) => localStorage.setItem("metars", JSON.stringify(v));
  const loadMetars = () => {
    return JSON.parse(localStorage.getItem("metars")) ?? [];
  };

  const saveCIDS = (v) => localStorage.setItem("cids", JSON.stringify(v));
  const loadCIDS = () => {
    return JSON.parse(localStorage.getItem("cids")) ?? [];
  };

  const authAction = (loginFormIdent = "") => {
    if (loginFormIdent !== "") {
      ident.value = previousIdent.value = loginFormIdent;
      localStorage.setItem("ident", loginFormIdent);
      localStorage.setItem("previousIdent", loginFormIdent);
    } else {
      ident.value = previousIdent.value = "";
      localStorage.setItem("previousident", previousIdent.value);
      localStorage.setItem("ident", "");
    }
  };

  const loadIdentDataAPI = async () => {
    return await fetch(
      appConfig.apiURL +
        "?filter=ident,eq," +
        ident.value +
        "&nonce=" +
        date.formatDate(Date.now(), "YYMMDDHHmmssSS")
    )
      .then((ret) => ret.json())
      .then((m) => {
        return m.records;
      });
  };

  return {
    saveMetars,
    loadMetars,
    saveCIDS,
    loadCIDS,
    loadIdentDataAPI,
    authAction,
    ident,
    identDBdATA,
    isAuthenticated,
    previousIdent,
  };
});
