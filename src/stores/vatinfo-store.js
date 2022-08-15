import { defineStore } from "pinia";
import { ref, inject, computed, reactive } from "vue";
import { date } from "quasar";
import appConfig from "src/config";

export const useVatinfoStore = defineStore("vatinfo", () => {
  const ident = ref("");
  const previousIdent = ref("");
  const identDBdATA = ref([]);
  const arrMetars = ref([]);
  const arrCIDS = ref([]);
  const isAuthenticated = computed(() => {
    return ident.value === "" ? false : true;
  });

  const saveMetarsDB = async (v) => {
    const response = await fetch(
      appConfig.apiURL +
        "vatinfo-metars.php?ident=" +
        ident.value +
        "&action=save",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: v }),
      }
    ).then((r) => r.json());
    console.log(response);
  };

  const saveCIDS = (v) => localStorage.setItem("cids", JSON.stringify(v));
  const loadCIDS = () => {
    return JSON.parse(localStorage.getItem("cids")) ?? [];
  };

  const authAction = async (loginFormIdent = "") => {
    if (loginFormIdent !== "") {
      ident.value = previousIdent.value = loginFormIdent;
      identDBdATA.value = await loadIdentDataAPI();
      localStorage.setItem("ident", loginFormIdent);
      localStorage.setItem("previousIdent", loginFormIdent);
    } else {
      ident.value = previousIdent.value = "";
      identDBdATA.value = [];
      localStorage.setItem("previousident", previousIdent.value);
      localStorage.setItem("ident", "");
    }
  };

  const loadIdentDataAPI = async () => {
    return await fetch(
      appConfig.apiURL +
        "vatinfo-metars.php?action=load&ident=" +
        ident.value +
        "&nonce=" +
        date.formatDate(Date.now(), "YYMMDDHHmmssSS")
    )
      .then((ret) => ret.json())
      .then((m) => {
        m.data.forEach((k) => {
          if (k.metar.trim() != "")
            arrMetars.value.push({ id: k.id, icao: k.metar, metar: "" });
          if (k.cid.trim() != "") arrCIDS.value.push(k.cid.trim());
        });
        return m.records;
      });
  };

  return {
    saveMetarsDB,
    saveCIDS,
    loadCIDS,
    loadIdentDataAPI,
    authAction,
    ident,
    identDBdATA,
    isAuthenticated,
    previousIdent,
    arrMetars,
    arrCIDS,
  };
});
