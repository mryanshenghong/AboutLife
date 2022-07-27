<template>
  <div class="staging">
    <div class="title">Hi, {{ name }}:</div>
    <div class="content">
      <p>感谢你注册About Life! 我们发送了激活邮件到你的邮箱: {{ email }}.</p>
      <p>请前往你的邮箱激活账户, 激活账户就可以正常登陆About Life啦！</p>
    </div>
    <div class="footer">--- About Life</div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const router = useRouter();

onBeforeMount(() => {
  if (!props.name || !props.email) {
    router.push("/");
  }
});
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
