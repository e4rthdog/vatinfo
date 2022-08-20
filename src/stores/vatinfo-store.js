import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { date } from "quasar";
import appConfig from "src/config";
import _ from "lodash";

export const useVatinfoStore = defineStore("vatinfo", (router) => {
  const isLogout = ref(false);
  const ident = ref(localStorage.getItem("ident") ?? "");
  const identDBdATA = ref([]);
  const arrMetars = ref([]);
  const arrCIDS = ref([]);
  const mainIntervalHandler = ref();
  const isAuthenticated = computed(() => {
    return ident.value !== "";
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
    )
      .then((r) => r.json())
      .catch((error) => {
        console.log(`saveMetarsDB -> ${error}`);
      });
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
    )
      .then((r) => r.json())
      .catch((error) => {
        console.log(`saveCIDDB -> ${error}`);
      });
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

  const authAction = async (loginFormIdent = "", action = "") => {
    if (loginFormIdent !== "") {
      isLogout.value = false;
      ident.value = loginFormIdent;
      identDBdATA.value = await loadIdentDataAPI();
      localStorage.setItem("ident", loginFormIdent);
    } else {
      isLogout.value = true;
      ident.value = "";
      identDBdATA.value = [];
      arrMetars.value = [];
      arrCIDS.value = [];
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
      })
      .catch((error) => {
        console.log(`loadIdentDataAPI -> ${error}`);
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
    arrMetars,
    arrCIDS,
    isLogout,
    mainIntervalHandler,
  };
});
