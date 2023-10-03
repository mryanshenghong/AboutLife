<template>
  <div class="main-header-container">
    <div class="header-left" @click="goHome">
      <h2 class="main-font first-letter">A</h2>
      <h2 class="main-font">BOUT LIFE</h2>
    </div>
    <div class="header-right">
      <el-button
        class="login-btn"
        @click="onCommandChange('login')"
        v-if="!isLogin"
        >Login</el-button
      >
      <el-dropdown
        v-if="isLogin"
        szie="mini"
        @command="onCommandChange"
        trigger="click"
      >
        <el-avatar size="default">{{
          user.user_name.charAt(0).toUpperCase()
        }}</el-avatar>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-if="isLogin" command="profile"
              >profile</el-dropdown-item
            >
            <el-dropdown-item
              v-if="isLogin && user.role === 0"
              command="write_blog"
              >{{ $t("message.login.write_blog") }}</el-dropdown-item
            >
            <el-dropdown-item
              v-if="isLogin && user.role === 0"
              command="media_sys"
              >{{ $t("message.login.media_sys") }}</el-dropdown-item
            >
            <el-dropdown-item v-if="isLogin" command="logout"
              >logout</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, computed } from "vue";
import { logout as userLogout } from "@/api/login";
import { useRouter } from "vue-router";
import { useStore } from "@/store";
import { useMessage } from "@/utils/element-plus";

const $message = useMessage(getCurrentInstance());
const router = useRouter();
const store = useStore();

const isLogin = computed(() => store.state.isLogin);
const user = computed(() => store.state.user);

const emit = defineEmits(["onShowLoginModal", "onShowCreateModal"]);

const onCommandChange = (cm: string) => {
  switch (cm) {
    case "login":
      emit("onShowLoginModal", true);
      break;
    case "write_blog":
      emit("onShowCreateModal", true);
      break;
    case "logout":
      onLogout();
      break;
    case "media_sys":
      router.push("/media");
      break;
    default:
      break;
  }
};

const goHome = () => router.push("/");
const onLogout = () => {
  userLogout(store.state.user.email)
    .then((res: any) => {
      if (res.data.code === 200) {
        store.commit("setUser", { user_name: "", email: "", role: null });
        store.commit("setLoginStatus", false);
        localStorage.clear();
      }
    })
    .catch(() => {
      $message?.error("Can not logout");
    });
};
</script>

<style lang="scss" scoped>
@import "../styles/webfont/cerepf/mainFont.css";
@import "../styles/consts.scss";
.main-font {
  font-weight: 700;
}
.main-header-container {
  display: flex;
  justify-content: space-between;
  .main-header-user {
    font-size: 14px;
    color: #606266;
    margin-right: 10px;
  }
  .header-left {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    .first-letter {
      font-size: 30px;
      background: #000;
      color: #fff;
    }
  }
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .login-btn {
      color: #303133;
      font-weight: bold;
    }
    .el-avatar {
      color: #fff;
      outline: none;
    }
  }
}
</style>
