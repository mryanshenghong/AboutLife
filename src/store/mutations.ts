import { GlobalState } from ".";
import { MutationTree } from "vuex";

export default {
  setMusicDisc(state: GlobalState, musicDisc: any) {
    Object.assign(state, musicDisc);
  },
  setLoginStatus(state: GlobalState, isLogin: boolean) {
    state.isLogin = isLogin;
  },
  setUser(state, user: GlobalState["user"]) {
    state.user = user;
  },
} as MutationTree<GlobalState>;
