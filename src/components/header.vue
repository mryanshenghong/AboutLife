<template>
  <div class="main-header-container">
    <div class="header-left" @click="goHome">
      <h2 class="main-font first-letter">A</h2>
      <h2 class="main-font">BOUT LIFE</h2>
    </div>
    <div class="header-right">
      <el-dropdown szie="mini" @command="onCommandChange" trigger="click">
        <el-avatar size="medium">user</el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="!isLogin" command="login">
            login
          </el-dropdown-item>
          <el-dropdown-item command="profile">
            profile
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace, State } from 'vuex-class'

const rootStore = namespace('')

@Component({})
export default class Header extends Vue {
  @State('isLogin') public isLogin!: boolean

  public onCommandChange(cm: string) {
    switch (cm) {
      case 'login':
        this.$emit('showModal', true)
        break
      default:
    }
  }

  public goHome() {
    this.$router.push('/')
  }
  public mounted() {
    console.log(this.isLogin)
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
      margin-right: 10px;
    }
    .el-avatar {
      color: #fff;
      outline: none;
    }
  }
}
</style>
