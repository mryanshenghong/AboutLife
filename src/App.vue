<script setup lang="ts">
import { getCurrentInstance, reactive } from "vue";
import mainHeader from "@/components/header.vue";

import { verifyToken } from "./api/login";
import { createBlog } from "@/api/blog";
import { useStore } from "./store";
import { useI18n } from "vue-i18n";
import zhLocale from "element-plus/lib/locale/lang/zh-cn";
import enLocale from "element-plus/lib/locale/lang/en";
import Login from "@/components/LoginModal.vue";
import { ElMessage } from "element-plus";

// config element-plus i18n
const store = useStore();
const {
  locale: { value: lang },
} = useI18n();
const elementPlusI18n: any = {
  cn: zhLocale,
  en: enLocale,
};

// const asyncComponents = ref(new Map<string, any>());

// asyncComponents.value.set(
//   "Login",
//   defineAsyncComponent(() => import("@/components/async.vue"))
// );
// asyncComponents.value.set(
//   "CreateModal",
//   defineAsyncComponent(() => import("@/components/createBlog.vue"))
// );

const data = reactive({
  isLoginModalShow: false,
  isCreateModalShow: false,
});

const showLoginModal = (show: boolean) => (data.isLoginModalShow = show);
const showCreateModal = (show: boolean) => (data.isCreateModalShow = show);
</script>

<template>
  <el-config-provider :locale="elementPlusI18n[lang]">
    <el-container>
      <el-main>
        <mainHeader @onShowLoginModal="showLoginModal" @onShowCreateModal="showCreateModal"></mainHeader>
        <router-view />
        <Login :show="data.isLoginModalShow" @closeModal="showLoginModal"></Login>
        <!-- <CreateModal
        v-if="store.state.isLogin"
        :showCreateModal="isCreateModalShow"
        @onCloseCreateModal="showCreateModal"
        @onCreateBlog="createBlog"
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
