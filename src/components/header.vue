<template>
  <div class="main-header-container">
    <div class="header-left">
      <h2 class="main-font first-letter">A</h2>
      <h2 class="main-font">BOUT LIFE</h2>
    </div>
    <div class="header-right">
      <el-dropdown
        szie="mini"
        trigger="click"
      >
        <el-avatar size="medium">user</el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">
            login
          </el-dropdown-item>
          <el-dropdown-item command="en">
            profile
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Header extends Vue {

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