<template>
  <div id="app">
    <el-container>
      <el-main>
        <mainHeader @showModal="showModal"></mainHeader>
        <router-view />
        <mainFooter />
        <Login
          :show="modalShow"
          @closeModal="showModal"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import mainHeader from '@/components/header.vue'
import mainFooter from '@/components/footer.vue'
import { Mutation } from 'vuex-class'
const Login = () => import('./components/loginModal.vue')
import { verifyToken } from './api/login'
@Component({
  name: 'App',
  components: { mainHeader, mainFooter, Login },
})
export default class App extends Vue {
  @Mutation('SET_LOGIN') public setLogin!: (isLogin: boolean) => void;
  @Mutation('SET_USERINFO') public setUseInfo!: (res: any) => void;
  public modalShow: boolean = false;
  public showModal (show: boolean) {
    this.modalShow = show
  }
  public mounted () {
    if (localStorage.user_name && localStorage.role && localStorage.token) {
      verifyToken(localStorage.user_name, localStorage.token).then((res: any) => {
        if (!res.invalid) {
          this.setLogin(true)
          this.setUseInfo(res)
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import './styles/consts.scss';

#app {
  background: $theme-color;
  ::-webkit-scrollbar {
    display: none;
  }
  .el-container {
    max-width: 1460px;
    margin: 0 auto;
    height: 100vh;
    overflow-y: hidden;
    padding: 0 50px;
    .el-main {
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
