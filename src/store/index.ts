import { InjectionKey } from "vue";
import { createLogger, createStore, Store, useStore as useBaseStore } from "vuex";

import * as getters from "./getters";
import mutations from "./mutations";
export interface GlobalState {
  musicDisc: {
    musicData: {
      title: string;
      artist: string;
      pic: string;
      src: string;
    };
    commentData: {
      content: string;
      comment_nickname: string;
    };
  };
  user: {
    user_name: string;
    email: string;
    role: number | null;
  };
  isLogin: boolean;
  currentMediaRef: any;
}

export default createStore<GlobalState>({
  state: {
    musicDisc: {
      musicData: {
        title: "",
        artist: "",
        pic: "",
        src: "",
      },
      commentData: {
        content: "",
        comment_nickname: "",
      },
    },
    user: {
      user_name: "",
      email: "",
      role: null,
    },
    isLogin: false,
    currentMediaRef: undefined,
  },
  getters,
  mutations: mutations,
  modules: {},
  strict: import.meta.env.DEV,
  plugins: import.meta.env.DEV ? [createLogger()] : [],
});

export const key: InjectionKey<Store<GlobalState>> = Symbol();
export const useStore = () => useBaseStore(key);
