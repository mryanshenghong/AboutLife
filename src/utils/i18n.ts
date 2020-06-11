import Vue from 'vue'
import locale from 'element-ui/lib/locale'
import VueI18n from 'vue-i18n'
import en from '@/langs/en'
import cn from '@/langs/cn'
Vue.use(VueI18n)
const messages = {
  en,
  cn,
}

const i18n = new VueI18n({
  locale: 'en',
  messages,
})

locale.i18n((key: string, value: string) => {
  i18n.t(key, value)
})

export default i18n
