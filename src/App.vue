<script setup lang="ts">
import { defineAsyncComponent, getCurrentInstance, reactive, onMounted } from "vue";
import mainHeader from "@/components/header.vue";

import { verifyToken } from "./api/login";
import { createBlog } from "@/api/blog";
import { useStore } from "./store";
import { useI18n } from "vue-i18n";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";
import { useMessage } from "./utils/element-plus";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();

// Async import components on demand
const Login = defineAsyncComponent(() => import("@/components/LoginModal.vue"));

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
  if (localStorage.user_name && localStorage.role && localStorage.token) {
    try {
      const res: any = await verifyToken(localStorage.user_name, localStorage.token);
      store.commit("setLoginStatus", true);
      store.commit("setUser", res);
    } catch (err) {
      localStorage.clear();
    }
  }
});

// Methods
const showLoginModal = (show: boolean) => (data.isLoginModalShow = show);
const showCreateModal = (show: boolean) => (data.isCreateModalShow = show);
const onCreateBlog = async (newBlog: any) => {
  const $message = useMessage(getCurrentInstance());
  showCreateModal(false);
  if (!localStorage.token) {
    $message?.error("please login first");
  } else {
    try {
      const res: any = createBlog(newBlog, localStorage.token);
      if (res.result._id) {
        if (res.result.mediaType === "blog") {
          router.push(`/content/${res.result._id}`);
          return;
        }
        const intro = store.getters["home/getIntroduction"];
        if (res.result.cat === intro.nav) {
          store.commit("home/updateBlogs", res.result);
          return;
        }
      }
    } catch (err) {
      $message?.error("Can not create blog");
    }
  }
};
</script>

<template>
  <el-config-provider :locale="elementPlusI18n[lang]">
    <el-container>
      <el-main>
        <mainHeader @onShowLoginModal="showLoginModal" @onShowCreateModal="showCreateModal"></mainHeader>
        <router-view />
        <Login :show="data.isLoginModalShow" @closeModal="showLoginModal" />
        <!-- <CreateModal
        v-if="store.state.isLogin"
        :showCreateModal="isCreateModalShow"
        @onCloseCreateModal="showCreateModal"
        @onCreateBlog="onCreateBlog"
      ></CreateModal> -->
      </el-main>
    </el-container>
  </el-config-provider>
</template>

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
