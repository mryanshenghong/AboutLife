import { HomeState } from "./index";
import { MutationTree } from "vuex";
import { intro } from "@/intro";

export const HomeMutation: MutationTree<HomeState> = {
  changIntroduction(state: HomeState, { blogs, navName }: { blogs: any; navName: "Anything" | "Music" | "Dota" | "Bambi" }) {
    Object.assign(state, {
      currentNav: navName,
      currentTitle: intro[navName.toLowerCase() as "anything" | "music" | "dota" | "bambi"].title,
      currentContent: intro[navName.toLowerCase() as "anything" | "music" | "dota" | "bambi"].intro,
      currentMedia: intro[navName.toLowerCase() as "anything" | "music" | "dota" | "bambi"].media_type,
      currentMediaSrc: intro[navName.toLowerCase() as "anything" | "music" | "dota" | "bambi"].media_url,
      blogs,
    });
  },
  updateBlogs(state: HomeState, blog: any) {
    const blogs = state.blogs;
    blogs.push(blog);
    Object.assign(state, {
      ...state,
      blogs,
    });
  },
};
