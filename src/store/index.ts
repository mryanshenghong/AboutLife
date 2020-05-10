import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { module_home } from './home'
Vue.use(Vuex)

export interface RootState {}

const store: StoreOptions<RootState> = {
  state: {},
  mutations: {},
  actions: {},
  modules: { module_home },
}
export default new Vuex.Store<RootState>(store)
