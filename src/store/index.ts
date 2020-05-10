import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { MODULE_HOME } from './home'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export interface RootState {}
// 开发环境下使用，调试查看是否state是从mutation里面修改
const debug = process.env.NODE_ENV !== 'production'

const store: StoreOptions<RootState> = {
  state: {},
  mutations: {},
  actions: {},
  modules: { MODULE_HOME },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
}
export default new Vuex.Store<RootState>(store)
