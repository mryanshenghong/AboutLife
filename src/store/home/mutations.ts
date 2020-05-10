import { HomeState } from './index'
import { MutationTree } from 'vuex'
import { intro } from '../../intro'

export const HomeMutation: MutationTree<HomeState> = {
  changIntroduction(state: HomeState, navName: 'anything' | 'music' | 'dota' | 'bambi') {
    Object.assign(state, {
      currentNav: navName,
      currentTitle: intro[navName].title,
      currentContent: intro[navName].intro,
      currentMedia: intro[navName].media_type,
      currentMediaSrc: intro[navName].media_url,
    })
  },
}
