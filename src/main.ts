import Vue from 'vue'
import App from './App.vue'
import { CreateElement } from 'vue/types/umd'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './utils/element'
import i18n from './utils/i18n'
import './styles/reset.scss'
import 'element-ui/lib/theme-chalk/display.css'
import './styles/global.scss'

Vue.config.productionTip = true
Vue.config.devtools = true

new Vue({
  router,
  store,
  i18n,
  render: (h: CreateElement) => h(App),
}).$mount('#app')
