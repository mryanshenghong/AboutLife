import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/pages/home/Home.vue";
import Staging from "@/pages/staging/index.vue";
import Media from "@/pages/media/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/content/:id",
    name: "Content",
    component: () => import("@/pages/content/Content.vue"),
  },
  {
    path: "/staging",
    name: "Staging",
    component: Staging,
    props: true,
  },
  {
    path: "/media",
    name: "Media",
    component: Media,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/notfound/index.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === "Media" && localStorage.role !== "0") {
    next({ name: "NotFound" });
  } else {
    next();
  }
});

export default router;
