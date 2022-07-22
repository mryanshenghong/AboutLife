import { createI18n } from "vue-i18n";
import en from "@/langs/en";
import cn from "@/langs/cn";

const messages = {
  en,
  cn,
};

export default createI18n({
  locale: "cn",
  fallbackLocale: "cn",
  messages,
  silentTranslationWarn: import.meta.env.DEV,
});
