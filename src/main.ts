import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './utils/element'
import './styles/reset.scss'
import 'element-ui/lib/theme-chalk/display.css'

import { CreateElement } from 'vue/types/umd'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h: CreateElement) => h(App),
}).$mount('#app')
