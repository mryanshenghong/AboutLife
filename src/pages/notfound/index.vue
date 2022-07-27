<template>
  <div class="error">
    <div class="title">404</div>
    <div class="content">Not Found</div>
    <el-button size="small" link @click="router.replace('/')"> 返回主页 </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
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
}
</style>
