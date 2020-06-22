import { HomeState } from './index'
import { ActionTree } from 'vuex'
import { RootState } from '..'
import { getBlogsBasicInfo } from '../../api/blog'

export const HomeActions: ActionTree<HomeState, RootState> = {
  async changIntroduction({ commit }, navName: string): Promise<void> {
    // 根据navName 发送http请求到后台获取相应的博客基本信息
    // 拼装到state
    const res: any = await getBlogsBasicInfo(navName)
    const blogs = res.data.result
    commit('changIntroduction', { blogs, navName })
  },
}
