<template>
  <div class="staging">
    <div class="title">Hi, {{name}}:</div>
    <div class="content">
      <p>感谢你注册About Life! 我们发送了激活邮件到你的邮箱: {{email}}.</p>
      <p>请前往你的邮箱激活账户, 激活账户就可以正常登陆About Life啦！</p>
    </div>
    <div class="footer">--- About Life</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  name: 'Staging',
  props: {
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  },
})
export default class Staging extends Vue {
  public beforeMount() {
    if (!this.$props.name || !this.$props.email) {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="scss" scoped>
.staging {
  margin-top: 20px;
  .title {
    font-size: 18px;
    text-align: left;
    color: #d9d9d9;
  }
  .content {
    margin-top: 10px;
    p {
      margin-top: 5px;
    }
  }
  .footer {
    text-align: right;
  }
}
</style>