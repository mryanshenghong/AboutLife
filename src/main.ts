import Vue from "vue";
import App from "./App.vue";
import { CreateElement } from "vue/types/umd";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import "./utils/element";
import i18n from "./utils/i18n";
import "./styles/reset.scss";
import "element-ui/lib/theme-chalk/display.css";
import "./styles/global.scss";

const isDev = process.env.NODE_ENV === "development" ? true : false;

Vue.config.productionTip = isDev;
Vue.config.devtools = isDev;

new Vue({
  router,
  store,
  i18n,
  render: (h: CreateElement) => h(App),
}).$mount("#app");
