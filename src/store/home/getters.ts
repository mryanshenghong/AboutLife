import { GetterTree } from 'vuex'
import { HomeState } from '.'
import { RootState } from '..'

export const homeGetter: GetterTree<HomeState, RootState> = {
  getIntroduction(state): object {
    return {
      nav: state.currentNav,
      title: state.currentTitle,
      content: state.currentContent,
      media_type: state.currentMedia,
      media: state.currentMediaSrc,
    }
  },
}
