import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/Home.vue";

Vue.use(VueRouter);
const Content = () => import("@/views/content/Content.vue");
const Staging = () => import("@/views/staging/Staging.vue");
const Active = () => import("@/views/active/Active.vue");
const NotFound = () => import("@/views/notFound/NotFound.vue");
const Media = () => import("@/views/media/Media.vue");
// 如果Content 是按需引入的话 会出现网页元素闪动 上线了以后看看到底影响大不大
// import Content from '@/views/content/Content.vue'
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/content/:id",
    name: "Content",
    component: Content,
  },
  {
    path: "/staging",
    name: "Staging",
    component: Staging,
    props: true,
  },
  {
    path: "/active/:id",
    name: "Active",
    component: Active,
  },
  {
    path: "/media",
    name: "Media",
    component: Media,
  },
  {
    path: "/404",
    alias: "*",
    name: "NotFound",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Media" && localStorage.role !== "0") {
    next({ name: "NotFound" });
  } else { next(); }
});

export default router;
