import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { date } from "quasar";
import appConfig from "src/config";
import _ from "lodash";

export const useVatinfoStore = defineStore("vatinfo", (router) => {
  const isLogout = ref(false);
  const ident = ref(localStorage.getItem("ident") ?? "");
  const identDBDATA = ref([]);
  const arrMetars = ref([]);

  const arrDivisions = computed(() => {
    let result = [];
    if (identDBDATA.value) {
      identDBDATA.value.forEach((k) => {
        if (k.filter_division.trim() != "")
          result.push(k.filter_division.trim());
      });
    }
    return result;
  });
  const arrCIDS = computed(() => {
    let result = [];
    if (identDBDATA.value) {
      identDBDATA.value.forEach((k) => {
        if (k.cid.trim() != "") result.push(k.cid.trim());
      });
    }
    return result;
  });
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

  const saveDIVDB = async (v) => {
    const response = await fetch(
      appConfig.apiURL +
        "/vatinfo-panels.php?type=filter_division&ident=" +
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
        console.log(`saveDIVDB -> ${error}`);
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
      identDBDATA.value = await loadIdentDataAPI();
      localStorage.setItem("ident", loginFormIdent);
    } else {
      isLogout.value = true;
      ident.value = "";
      identDBDATA.value = [];
      arrMetars.value = [];
      arrCIDS.value = [];
      arrDivisions.value = [];
      localStorage.setItem("ident", ident.value);
    }
  };

  const loadIdentDataAPI = async (mode = "") => {
    identDBDATA.value = [];
    let fetchURL =
      appConfig.apiURL +
      "/vatinfo-panels.php?action=load&ident=" +
      ident.value +
      "&nonce=" +
      date.formatDate(Date.now(), "YYMMDDHHmmssSS");
    await fetch(fetchURL)
      .then((ret) => ret.json())
      .then((m) => {
        m.data.forEach((k) => {
          identDBDATA.value.push(k);
        });
        if (mode === "metars") {
          updateArrMetars();
        }
      })
      .catch((error) => {
        console.log(`loadIdentDataAPI -> ${error}`);
      });
  };

  const updateArrMetars = () => {
    arrMetars.value = [];
    if (identDBDATA.value) {
      identDBDATA.value.forEach((k) => {
        if (k.metar.trim() != "")
          arrMetars.value.push({
            id: k.id,
            icao: k.metar.trim(),
            metar: "",
            category: "",
          });
      });
    }
  };

  return {
    saveMetarsDB,
    loadIdentDataAPI,
    authAction,
    removeCID,
    clearMetars,
    saveCIDDB,
    saveDIVDB,
    removeMetar,
    updateArrMetars,
    ident,
    identDBDATA,
    isAuthenticated,
    arrMetars,
    arrCIDS,
    arrDivisions,
    isLogout,
    mainIntervalHandler,
  };
});
