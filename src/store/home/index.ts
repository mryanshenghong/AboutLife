import { intro } from '../../intro'
import { Module } from 'vuex'
import { RootState } from '..'
import { homeGetter } from './getters'
import { HomeMutation } from './mutations'

export interface HomeState {
  currentNav: string
  currentTitle: string
  currentContent: string[]
  // 暂时将主页的左边介绍图片／视频做成动态的media type 不知道还需要加入是么新的不同的media type
  currentMedia: string
  currentMediaSrc: string
}
export const state: HomeState = {
  currentNav: 'anything',
  currentTitle: intro.anything.title,
  currentContent: intro.anything.intro,
  currentMedia: intro.anything.media_type,
  currentMediaSrc: intro.anything.media_url,
  // 还有一个state是存储 blog 的数组
}

export const MODULE_HOME: Module<HomeState, RootState> = {
  namespaced: true,
  state,
  getters: homeGetter,
  mutations: HomeMutation,
}