<template>
  <div class="main-header-container">
    <div class="header-left" @click="goHome">
      <h2 class="main-font first-letter">A</h2>
      <h2 class="main-font">BOUT LIFE</h2>
    </div>
    <div class="header-right">
      <el-button
        class="login-btn"
        type="text"
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
        <el-avatar size="medium">{{
          userInfo.user_name.charAt(0).toUpperCase()
        }}</el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="isLogin" command="profile"
            >profile</el-dropdown-item
          >
          <el-dropdown-item
            v-if="isLogin && userInfo.role === 0"
            command="write_blog"
            >{{ this.$t('message.login.write_blog') }}</el-dropdown-item
          >
          <el-dropdown-item
            v-if="isLogin && userInfo.role === 0"
            command="media_sys"
            >{{ this.$t('message.login.media_sys') }}</el-dropdown-item
          >
          <el-dropdown-item v-if="isLogin" command="logout"
            >logout</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace, State, Mutation } from 'vuex-class'
import { logout as userLogout } from '@/api/login';

const rootStore = namespace('root')

@Component({})
export default class Header extends Vue {
  @State('isLogin') public isLogin!: boolean
  @State('user') public userInfo: any
  @Mutation('SET_USERINFO') public setUserInfo!: (user: { user_name: string, email: string, role: null }) => void;
  @Mutation('SET_LOGIN') public setLogin!: (isLogin: boolean) => void;
  public onCommandChange(cm: string) {
    switch (cm) {
      case 'login':
        this.$emit('showModal', true)
        break
      case 'write_blog':
        this.$emit('onShowCreateModal', true)
        break
      case 'logout':
        this.onLogout()
        break
      case 'media_sys':
        this.$router.push('/media')
        break
      default:
    }
  }

  public goHome() {
    this.$router.push('/')
  }

  private onLogout() {
    userLogout(this.userInfo.email)
      .then((res: any) => {
        if (res.data.code === 200) {
          this.setUserInfo({ user_name: '', email: '', role: null })
          this.setLogin(false)
          localStorage.clear()
        }
      })
      .catch(() => {
        this.$message({
          message: 'Can not logout',
          type: 'error',
        })
      })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/webfont/cerepf/mainFont.css';
@import '~@/styles/consts.scss';
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
