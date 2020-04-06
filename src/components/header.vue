<template>
  <div class="main-header-container">
    <div class="header-left">
      <img
        src="@/assets/logo.png"
        alt=""
        height="40"
      >
    </div>
    <div class="header-right">
      <span class="main-header-user">Welcome:</span>
      <!-- <el-button
        @click="logout"
        class="login-btn"
        size="mini"
      > Logout</el-button> -->
      <el-button
        class="login-btn"
        size="mini"
        type="info"
      >
        <!-- {{$t('message.login.headerBtn')}}-->Login</el-button>
      <el-dropdown
        szie="mini"
        trigger="click"
      >
        <span class="el-dropdown-link">
          <!-- {{ $t('message.langSwich.language')
          }} -->

          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="zh">
            <!-- {{
            $t('message.langSwich.cn')
            }} -->
          </el-dropdown-item>
          <el-dropdown-item command="en">
            <!-- {{
            $t('message.langSwich.en')
            }} -->
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class Header extends Vue { }
// import { mapMutations, mapGetters } from "vuex";
// import { logout as userLogout } from "../api/login";
// export default {
//   name: "MainHeader",
//   data () {
//     return {
//       navBtn: {
//         color: " rgba(0, 0, 0, 0.7)",
//         backgroundColor: "#f2f3f7",
//         borderColor: "#f2f3f7"
//       }
//     };
//   },
//   computed: {
//     ...mapGetters(["navShow", "userInfo"])
//   },
//   methods: {
//     controlNav () {
//       this.setNavShow(!this.navShow);
//     },
//     handleLangChange (command) {
//       switch (command) {
//         case "en":
//           return (this.$i18n.locale = "en");
//         case "zh":
//           return (this.$i18n.locale = "cn");
//         default:
//           return (this.$i18n.locale = "en");
//       }
//     },
//     showModal () {
//       this.$emit("showModal", true);
//     },
//     logout () {
//       userLogout(this.userInfo.email)
//         .then(res => {
//           if (res.data.code === 200) {
//             this.setUserInfo({ user_name: "", email: "", role: null });
//             this.setLogin(false);
//             localStorage.clear();
//           }
//         })
//         .catch(() => {
//           this.$message({
//             message: "Can not logout",
//             type: "error"
//           });
//         });
//     },
//     ...mapMutations({
//       setNavShow: "SET_NAVSHOW",
//       setLogin: "SET_LOGIN",
//       setUserInfo: "SET_USERINFO"
//     })
//   }
// };
</script>

<style lang="scss" scoped>
.main-header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .main-header-user {
    font-size: 14px;
    color: #606266;
    margin-right: 10px;
  }
  .header-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .login-btn {
      margin-right: 10px;
    }
    .el-avatar {
      width: 30px;
      height: 30px;
      line-height: 30px;
      margin-right: 10px;
    }
  }
}
</style>