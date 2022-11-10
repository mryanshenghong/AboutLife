import { createApp } from "vue";
import App from "./App.vue";
import "./styles/reset.scss";
import "./styles/global.scss";
import registerGlobalElementPlus from "@/utils/element-plus";
import router from "./router";
import store, { key } from "./store";
import i18n from "@/utils/i18n";

// Sentry
import * as Sentry from "@sentry/vue";
import { BrowserTracing } from "@sentry/tracing";

const app = createApp(App)
  .use(store, key)
  .use(router)
  .use(i18n)
  .use(registerGlobalElementPlus);


Sentry.init({
  app,
  dsn: import.meta.env.VITE_APP_SENTRY_DSN,
  attachProps: true,
  release: import.meta.env.VITE_APP_SENTRY_RELEASE,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.vueRouterInstrumentation(router),
    }),
  ],
  environment: import.meta.env.NODE_ENV,
  tracesSampleRate: 1.0,
});

app.mount("#app");
