import { GetterTree } from "vuex";
import { HomeState } from ".";
import { GlobalState } from "../../";

export const homeGetter: GetterTree<HomeState, GlobalState> = {
  getIntroduction(state): {
    nav: string;
    title: string;
    content: string[];
    media_type: string;
    media: any;
    blogs: any;
  } {
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
