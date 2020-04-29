import Vue from 'vue'
import App from './App.vue'
import { CreateElement } from 'vue/types/umd'
import './registerServiceWorker'
import router from './router'
import store from './store'

import './utils/element'
import './styles/reset.scss'
import 'element-ui/lib/theme-chalk/display.css'
import './styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App),
}).$mount('#app')
