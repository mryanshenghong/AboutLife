<template>
  <div class="error">
    <div class="title">404</div>
    <div class="content">Not Found</div>
    <el-button class="btn" size="small">
      <router-link to="/" tag="span">返回主页</router-link>
    </el-button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { activateAccount } from "../../api/login";
@Component({
  name: "NotFound",
})
export default class NotFound extends Vue {

}
</script>
<style lang="scss" scoped>
.error {
  display: flex;
  height: 600px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .title {
    font-size: 40px;
    margin-bottom: 10px;
  }
  .content {
    font-size: 24px;
    margin-bottom: 10px;
  }
  .btn {
    background: #f2f3f7;
  }
}
</style>