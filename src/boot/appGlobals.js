import { boot } from "quasar/wrappers";
import { provide } from "vue";
import { useVatinfoStore } from "src/stores/vatinfo-store";

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot((app, store, router) => {
  // const cfgStore = useVatinfoStore(store);
  // console.log(cfgStore.ident);
  // router.beforeEach((to) => {
  //   if (to.path !== "/login") {
  //     return { path: "/login" };
  //   }
  // });
});
