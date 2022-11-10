<template>
  <el-config-provider :locale="elementPlusI18n[lang]">
    <el-container>
      <el-main>
        <mainHeader @onShowLoginModal="showLoginModal" @onShowCreateModal="showCreateModal"></mainHeader>
        <router-view />
        <Login :show="data.isLoginModalShow" @closeModal="showLoginModal" />
        <WriteBlog v-if="isLogin" :showCreateModal="data.isCreateModalShow" @onCloseCreateModal="showCreateModal" @onCreateBlog="onCreateBlog"></WriteBlog>
      </el-main>
    </el-container>
  </el-config-provider>
</template>

<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, reactive, onMounted, computed } from "vue";
import mainHeader from "@/components/header.vue";

import { verifyToken } from "./api/login";
import { createBlog } from "@/api/blog";
import { useStore } from "./store";
import { useI18n } from "vue-i18n";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";
import { useMessage } from "./utils/element-plus";
import { useRouter } from "vue-router";

import { NewBlogInput } from "./types/blog";

const store = useStore();
const router = useRouter();

// Async import components on demand
const Login = defineAsyncComponent(() => import("@/components/LoginModal.vue"));
const WriteBlog = defineAsyncComponent(() => import("@/components/createBlog.vue"));

// config element-plus i18n
const { locale } = useI18n();
const lang = locale.value;

const elementPlusI18n: any = {
  cn: zhLocale,
  en: enLocale,
};

// State
const data = reactive({
  isLoginModalShow: false,
  isCreateModalShow: false,
});

// Lifecycle
onMounted(async () => {
    console.log(a.b)
  if (localStorage.user_name && localStorage.role && localStorage.token) {
    try {
      const user = await verifyToken(localStorage.user_name, localStorage.token);
      store.commit("setLoginStatus", true);
      store.commit("setUser", user);
    } catch (err) {
      localStorage.clear();
    }
  }
});

// Computed state
const isLogin = computed(() => store.state.isLogin);

// Methods
const showLoginModal = (show: boolean) => (data.isLoginModalShow = show);

const showCreateModal = (show: boolean) => (data.isCreateModalShow = show);

const onCreateBlog = async (newBlog: NewBlogInput) => {
  const $message = useMessage(getCurrentInstance());
  showCreateModal(false);
  if (!localStorage.token) {
    $message?.error("please login first");
  } else {
    try {
      const blog = await createBlog(newBlog, localStorage.token);
      if (blog._id) {
        if (blog.mediaType === "blog") {
          router.push(`/content/${blog._id}`);
          return;
        }
        const intro = store.getters["home/getIntroduction"];
        if (blog.cat === intro.nav) {
          store.commit("home/updateBlogs", blog);
          return;
        }
      }
    } catch (err) {
      $message?.error("Can not create blog");
    }
  }
};
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
