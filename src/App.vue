<template>
  <div id="app">
    <el-container>
      <el-main>
        <mainHeader @showModal="showModal" @onShowCreateModal="showCreateModal"></mainHeader>
        <router-view />
        <!-- <mainFooter /> -->
        <Login :show="modalShow" @closeModal="showModal" />
        <CreateModal v-if="isLogin" :showCreateModal="isCreateModalShow" @onCloseCreateModal="showCreateModal" @onCreateBlog="createBlog" />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import mainHeader from "@/components/header.vue";
import mainFooter from "@/components/footer.vue";
import { Mutation, State, Getter, namespace } from "vuex-class";
const Login = () => import("./components/loginModal.vue");
const CreateModal = () => import("./components/createBlog.vue");
const HOME_MODULE = namespace("MODULE_HOME");

import { verifyToken } from "./api/login";
import { createBlog } from "@/api/blog";
@Component({
  name: "App",
  components: { mainHeader, mainFooter, Login, CreateModal },
})
export default class App extends Vue {
  @State("isLogin") public isLogin!: boolean;
  @HOME_MODULE.Getter("getIntroduction") public intro: any;
  @Mutation("SET_LOGIN") public setLogin!: (isLogin: boolean) => void;
  @Mutation("SET_USERINFO") public setUseInfo!: (res: any) => void;
  @HOME_MODULE.Mutation("updateBlogs") public updateBlogs!: (data: any) => void;

  public modalShow: boolean = false;
  public isCreateModalShow: boolean = false;
  public showModal(show: boolean) {
    this.modalShow = show;
  }

  public showCreateModal(show: boolean) {
    this.isCreateModalShow = show;
  }

  public createBlog(newBlog: any) {
    this.showCreateModal(false);
    if (!localStorage.token) {
      this.$message({
        message: "please login first",
        type: "error",
      });
    } else {
      createBlog(newBlog, localStorage.token)
        .then((res: any) => {
          if (res.result._id) {
            if (res.result.mediaType === "blog") {
              this.$router.push(`/content/${res.result._id}`);
              return;
            }
            if (res.result.cat === this.intro.nav) {
              this.updateBlogs(res.result);
              return;
            }
          }
        })
        .catch(() => {
          this.$message({
            message: "Can not create blog",
            type: "error",
          });
        });
    }
  }

  public mounted() {
    if (localStorage.user_name && localStorage.role && localStorage.token) {
      verifyToken(localStorage.user_name, localStorage.token)
        .then((res: any) => {
          this.setLogin(true);
          this.setUseInfo(res);
        })
        .catch(() => {
          localStorage.clear();
        });
    }
  }
}
</script>

<style lang="scss">
@import "./styles/consts.scss";

#app {
  background: $theme-color;
  ::-webkit-scrollbar {
    display: none;
  }
  .el-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 100vh;
    overflow-y: hidden;
    .el-main {
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
