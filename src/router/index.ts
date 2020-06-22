import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home/Home.vue'

Vue.use(VueRouter)
const Content = () => import('@/views/content/Content.vue')
// 如果Content 是按需引入的话 会出现网页元素闪动 上线了以后看看到底影响大不大
// import Content from '@/views/content/Content.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/content/:id',
    name: 'Content',
    component: Content,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
