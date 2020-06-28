declare var document: Document

// declare module "element-ui/lib/transitions/collapse-transition";
declare module 'element-ui'
declare module 'element-ui/lib/locale/lang/zh-CN'
declare module 'element-ui/lib/locale/lang/en'
declare module 'element-ui/lib/locale'
declare module 'vue-video-player'

declare module '*.vue' {
  import Vue, { VNode } from 'vue'
  export default Vue
}
