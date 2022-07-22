import { createApp } from "vue";
import App from "./App.vue";
import "./styles/reset.scss";
import "./styles/global.scss";
import registerGlobalElementPlus from "@/utils/element-plus";
import router from "./router";
import store, { key } from "./store";
import i18n from "@/utils/i18n";

createApp(App).use(store, key).use(router).use(i18n).use(registerGlobalElementPlus).mount("#app");
