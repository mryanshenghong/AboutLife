<template>
  <div class="active">
    {{status}}
    <i v-if="activing" class="el-icon-loading"></i>
    <div>
      <el-button class="btn" size="small" v-if="valid">
        <router-link tag="span" to="/">返回首页</router-link>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { activateAccount } from "../../api/login";
@Component({
  name: "Active",
})
export default class Active extends Vue {
  private status: string = "激活中...";
  private activing: boolean = true;
  private valid: boolean = false;
  public async activateAccoutn() {
    const res: any = await activateAccount(this.$route.params.id).catch((err) => err);
    this.activing = false;
    if (res instanceof Error) {
      this.status = "网络错误, 请稍后再试.";
      return;
    }
    if (!res || res.code === -1) {
      this.status = res.msg;
      return;
    }
    this.status = "激活成功!回到首页登陆";
    this.activing = false;
    this.valid = true;
  }
  public beforeMount() {
    if (!this.$route.params.id) {
      this.$router.push("/");
    }
  }
  public async mounted() {
    await this.activateAccoutn();
  }
}
</script>
<style lang="scss" scoped>
.active {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
  .btn {
    background: #f2f3f7;
  }
}
</style>