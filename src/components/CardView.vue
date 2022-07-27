<template>
  <el-card class="box-card">
    <Blog :title="title" :time="time" :id="id" :cat="cat" :mediaType="mediaType" :mediaSources="mediaSources" />
    <div v-if="mediaType !== 'blog'" class="comment_box">
      <el-button link size="small" @click="showComment">查看评论</el-button>
    </div>
    <div v-if="state.displayComments" class="comment-box">
      <Comment :blogId="id" />
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, reactive } from "vue";
import Blog from "../components/Blog.vue";

const Comment = () => defineAsyncComponent(() => import("./comments/Comments.vue"));

const props = defineProps<{
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
