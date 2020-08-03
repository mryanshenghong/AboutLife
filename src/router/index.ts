import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/home/Home.vue';

Vue.use(VueRouter);
const Content = () => import('@/views/content/Content.vue');
const Staging = () => import('@/views/staging/Staging.vue');
const Active = () => import('@/views/active/Active.vue');
const NotFound = () => import('@/views/notFound/NotFound.vue');
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
  {
    path: '/staging',
    name: 'Staging',
    component: Staging,
    props: true,
  },
  {
    path: '/active/:id',
    name: 'Active',
    component: Active,
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
