import { defineStore } from "pinia";
import { ref, inject, computed, reactive } from "vue";
import { date } from "quasar";
import appConfig from "src/config";
import _ from "lodash";

export const useVatinfoStore = defineStore("vatinfo", () => {
  const ident = ref("");
  const previousIdent = ref(localStorage.getItem("previousident"));
  const identDBdATA = ref([]);
  const arrMetars = ref([]);
  const arrCIDS = ref([]);
  const isAuthenticated = computed(() => {
    return ident.value === "" || !ident ? false : true;
  });

  const saveMetarsDB = async (v) => {
    const response = await fetch(
      appConfig.apiURL +
        "/vatinfo-panels.php?type=metar&ident=" +
        ident.value +
        "&action=save" +
        "&nonce=" +
        date.formatDate(Date.now(), "YYMMDDHHmmssSS"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: v }),
      }
    ).then((r) => r.json());
  };

  const saveCIDDB = async (v) => {
    const response = await fetch(
      appConfig.apiURL +
        "/vatinfo-panels.php?type=cid&ident=" +
        ident.value +
        "&action=save" +
        "&nonce=" +
        date.formatDate(Date.now(), "YYMMDDHHmmssSS"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: v }),
      }
    ).then((r) => r.json());
  };

  const clearMetars = () => {
    arrMetars.value = [];
  };

  const removeMetar = (metar) => {
    _.remove(arrMetars.value, (n) => n.icao == metar);
  };

  const removeCID = (toRemove) => {
    arrCIDS.value = arrCIDS.value.filter((r) => r != toRemove);
  };

  const authAction = async (loginFormIdent = "") => {
    if (loginFormIdent !== "") {
      ident.value = loginFormIdent;
      previousIdent.value = loginFormIdent;
      identDBdATA.value = await loadIdentDataAPI();
      localStorage.setItem("ident", loginFormIdent);
      localStorage.setItem("previousident", loginFormIdent);
    } else {
      ident.value = "";
      identDBdATA.value = [];
      localStorage.setItem("previousident", previousIdent.value);
      localStorage.setItem("ident", ident.value);
    }
  };

  const loadIdentDataAPI = async (mode) => {
    if (mode != "friends") arrMetars.value = [];
    arrCIDS.value = [];
    return await fetch(
      appConfig.apiURL +
        "/vatinfo-panels.php?action=load&ident=" +
        ident.value +
        "&nonce=" +
        date.formatDate(Date.now(), "YYMMDDHHmmssSS")
    )
      .then((ret) => ret.json())
      .then((m) => {
        m.data.forEach((k) => {
          if (k.metar.trim() != "" && mode != "friends") {
            arrMetars.value.push({ id: k.id, icao: k.metar, metar: "" });
          }

          if (k.cid.trim() != "") {
            arrCIDS.value.push(k.cid.trim());
          }
          return m.records;
        });
      });
  };

  return {
    saveMetarsDB,
    loadIdentDataAPI,
    authAction,
    removeCID,
    clearMetars,
    saveCIDDB,
    removeMetar,
    ident,
    identDBdATA,
    isAuthenticated,
    previousIdent,
    arrMetars,
    arrCIDS,
  };
});
