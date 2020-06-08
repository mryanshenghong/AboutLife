import { HomeState } from './index'
import { ActionTree } from 'vuex'
import { RootState } from '..'

export const HomeActions: ActionTree<HomeState, RootState> = {
  // changIntroduction(state: HomeState, navName: 'anything' | 'music' | 'dota' | 'bambi') {
  //     Object.assign(state, {
  //       currentNav: navName,
  //       currentTitle: intro[navName].title,
  //       currentContent: intro[navName].intro,
  //       currentMedia: intro[navName].media_type,
  //       currentMediaSrc: intro[navName].media_url,
  //     })
  //   },
  changIntroduction({ commit }, navName: 'anything' | 'music' | 'dota' | 'bambi'): void {
    // 根据navName 发送http请求到后台获取相应的博客基本信息
    // 拼装到state
  },
}
