import { intro } from "@/intro";
import { Module } from "vuex";
import { GlobalState } from "../../";
import { homeGetter } from "./getters";
import { HomeMutation } from "./mutations";
import { HomeActions } from "./actions";

export interface HomeState {
  currentNav: string;
  currentTitle: string;
  currentContent: string[];
  // 暂时将主页的左边介绍图片／视频做成动态的media type 不知道还需要加入是么新的不同的media type
  currentMedia: string;
  currentMediaSrc: string;
  blogs: Blog[];
}
export const state: HomeState = {
  currentNav: "Anything",
  currentTitle: intro.anything.title,
  currentContent: intro.anything.intro,
  currentMedia: intro.anything.media_type,
  currentMediaSrc: intro.anything.media_url,
  // 还有一个state是存储 blog 的数组
  blogs: [],
};

export interface Blog {
  cat: string;
  createdAt: number;
  id: string;
  updatedAt: number;
  title: string;
}

export const MODULE_HOME: Module<HomeState, GlobalState> = {
  namespaced: true,
  state,
  getters: homeGetter,
  mutations: HomeMutation,
  actions: HomeActions,
};
