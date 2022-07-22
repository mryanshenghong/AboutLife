import { GetterTree } from "vuex";
import { HomeState } from ".";
import { GlobalState } from "../../";

export const homeGetter: GetterTree<HomeState, GlobalState> = {
  getIntroduction(state): object {
    return {
      nav: state.currentNav,
      title: state.currentTitle,
      content: state.currentContent,
      media_type: state.currentMedia,
      media: state.currentMediaSrc,
      blogs: state.blogs,
    };
  },
};
