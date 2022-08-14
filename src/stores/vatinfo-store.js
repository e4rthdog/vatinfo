import { defineStore } from "pinia";
import { ref } from "vue";

export const useVatinfoStore = defineStore("vatinfo", () => {
  const saveMetars = (v) => localStorage.setItem("metars", JSON.stringify(v));
  const loadMetars = () => {
    return JSON.parse(localStorage.getItem("metars"));
  };

  return { saveMetars, loadMetars };
});
