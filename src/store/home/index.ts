import * as intro from '../../intro.json'
import { Module } from 'vuex'
import { RootState } from '..'
interface HomeState {
  currentNav: string
  currentContent: Array<String>
  // 暂时将主页的左边介绍图片／视频做成动态的media type 不知道还需要加入是么新的不同的media type
  currentMedia: string
  currentMediaSrc: string
}
export const state: HomeState = {
  currentNav: 'anything',
  currentContent: intro.anything.intro,
  currentMedia: intro.anything.media_type,
  currentMediaSrc: intro.anything.media_url,
}

export const module_home: Module<HomeState, RootState> = {
  state,
}
