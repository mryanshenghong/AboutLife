import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import * as types from './mutationTypes'
import * as getters from './getters'
import { MODULE_HOME } from './home'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

export interface RootState {
  musicDisc: {
    musicData: {
      title: string
      artist: string
      pic: string
      src: string
    }
    commentData: {
      content: string
      comment_nickname: string
    }
  }
  user: {
    user_name: string
    email: string
    role: number | null
  }
  isLogin: boolean
}

// 开发环境下使用，调试查看是否state是从mutation里面修改
const debug = process.env.NODE_ENV !== 'production'

const store: StoreOptions<RootState> = {
  state: {
    musicDisc: {
      musicData: {
        title: '',
        artist: '',
        pic: '',
        src: '',
      },
      commentData: {
        content: '',
        comment_nickname: '',
      },
    },
    user: {
      user_name: '',
      email: '',
      role: null,
    },
    isLogin: false,
  },
  mutations: {
    [types.SET_MUSICDISC](state, musicDisc) {
      state.musicDisc = musicDisc
    },
    [types.SET_LOGIN](state, flag) {
      state.isLogin = flag
    },
    [types.SET_USERINFO](state, user) {
      state.user = user
    },
  },
  getters,
  modules: { MODULE_HOME },
  strict: debug,
  plugins: debug ? [createLogger()] : [],
}
export default new Vuex.Store<RootState>(store)
