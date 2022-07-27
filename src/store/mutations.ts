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
  setMediaRef(state, mediaRef: any) {
    Object.assign(state, {
      currentMediaRef: mediaRef,
    });
  },
} as MutationTree<GlobalState>;
