<template>
  <div class="active">
    {{ state.status }}
    <i v-if="state.activating" class="el-icon-loading"></i>
    <div>
      <el-button class="btn" size="small" v-if="state.valid" @click="router.replace('/')"> 返回首页 </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted, reactive } from "vue";
import { activateAccount } from "@/api/login";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();
const requestId = route.params.id as string;

// State
const state = reactive({
  status: "激活中...",
  activating: true,
  valid: false,
});

// Lifecycle
onBeforeMount(() => {
  if (route.params.id) {
    router.push("/");
  }
});

onMounted(async () => await activateAccoutn());

// Methods
const activateAccoutn = async () => {
  try {
    const res: any = await activateAccount(requestId);
    state.activating = false;
    if (!res || res.code === -1) {
      state.status = res.msg;
      return;
    }
    state.status = "激活成功!回到首页登陆";
    state.activating = false;
    state.valid = true;
  } catch (err) {
    state.status = "网络错误, 请稍后再试.";
  }
};
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
