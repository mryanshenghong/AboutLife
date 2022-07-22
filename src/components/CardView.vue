<template>
  <el-card class="box-card">
    <Blog :title="title" :time="time" :id="id" :cat="cat" :mediaType="mediaType" :mediaSources="mediaSources" />
    <div v-if="mediaType !== 'blog'" class="comment_box">
      <el-button type="text" size="small" @click="showComment">查看评论</el-button>
    </div>
    <div v-if="state.displayComments" class="comment-box">
      <Comment :blogId="id" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive } from "vue";
import { format } from "../utils/formatTime";
import Blog from "../components/Blog.vue";

const Comment = () => defineAsyncComponent(() => import("./comments/Comments.vue"));

const resUrl: string = import.meta.env.DEV ? `${import.meta.env.VITE_APP_RES_URL}` : `${import.meta.env.VITE_APP_BASE}/static`;

defineProps<{
  title: string;
  time: string;
  id: string;
  cat: string;
  mediaType: string;
  mediaSources: any;
}>();

const state = reactive({
  displayComments: false,
});

const formatTime = (time: string) => format(time);

const showComment = () => (state.displayComments = !state.displayComments);
</script>
<style lang="scss" scoped>
@import "@/styles/consts.scss";
.box-card {
  max-width: 800px;
  background: transparent;
  box-shadow: none !important;
  border: none;
  margin: 0 auto;
  .comment_box {
    .el-button {
      color: #909399;
    }
  }
}
</style>
