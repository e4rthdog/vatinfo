import { defineStore } from "pinia";
import { ref } from "vue";

export const useVatinfoStore = defineStore("vatinfo", () => {
  const saveMetars = (v) => localStorage.setItem("metars", JSON.stringify(v));
  const loadMetars = () => {
    return JSON.parse(localStorage.getItem("metars")) ?? [];
  };

  const saveCIDS = (v) => localStorage.setItem("cids", JSON.stringify(v));
  const loadCIDS = () => {
    return JSON.parse(localStorage.getItem("cids")) ?? [];
  };

  return { saveMetars, loadMetars, saveCIDS, loadCIDS };
});
