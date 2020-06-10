import VueRouter, { Route } from 'vue-router'
import { ElMessage } from 'element-ui/types/message'

declare module 'vue/types/vue' {
  interface Vue {
    $router: VueRouter
    $route: Route
    $message: ElMessage
  }
}
