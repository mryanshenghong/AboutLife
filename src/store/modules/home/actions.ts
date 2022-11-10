import { HomeState } from "./index";
import { ActionTree } from "vuex";
import { GlobalState } from "../../";
import { getBlogsBasicInfo } from "@/api/blog";
import { captureException } from "@sentry/vue";

export const HomeActions: ActionTree<HomeState, GlobalState> = {
  async changIntroduction({ commit }, navName: string): Promise<void> {
    // 根据navName 发送http请求到后台获取相应的博客基本信息
    // 拼装到state
    let blogs = [];
    try {
      const res: any = await getBlogsBasicInfo(navName);
      blogs = res.data.result;
    } catch (err) {
      captureException(`Can not get blog basic info: ${err}`);
    }

    commit("changIntroduction", { blogs, navName });
  },
};
