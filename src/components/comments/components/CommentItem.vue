<template>
  <div class="comment-item">
    <div class="comment-item-header">
      <el-avatar shape="square" size="small" class="comment-item-avatar">{{ comment.commentedBy.name.charAt(0).toUpperCase() }}</el-avatar>
      <div class="whoAndWhen">
        <span class="who">{{ comment.commentedBy.name }}</span>
        <span class="when">{{ formatTime(comment.commentedDate) }}</span>
      </div>
    </div>
    <div class="comment-content">
      <p class="content">{{ comment.content }}</p>
      <div>
        <el-button type="text" class="link-btn" @click="showNestedCommentBox">评论</el-button>
        <div class="comment-tools">
          <el-input
            v-if="visibleNestedCommentBox === idx"
            size="default"
            type="textarea"
            autosize
            class="input"
            placeholder="comment"
            v-model="state.inputComment"
          />
          <el-button @click="writeComment" v-if="visibleNestedCommentBox === idx" size="small" style="margin: 0 10px; max-height: 33px">Comment</el-button>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { format } from "@/utils/formatTime";

import { newComment, IComment } from "@/api/comments";

// State, props
const props = defineProps<{
  idx: string;
  //   typedef
  comment: any;
  visibleNestedCommentBox: string | null;
  isNested: boolean;
  showNestedCommentBox: Function;
  getComments: Function;
}>();

const state = reactive({
  inputComment: "",
});

// Methods
const writeComment = async () => {
  const comment = props.comment;
  const nComment: IComment = {
    blogId: comment.blogId,
    parentId: props.isNested ? comment.parentId : comment.id,
    repliedTo: comment.commentedBy,
    content: state.inputComment,
  };
  const token = localStorage.getItem("token");
  await newComment(nComment, token!)
    .then(async () => props.getComments())
    .catch((err) => err);
  state.inputComment = "";
  props.showNestedCommentBox();
};

const formatTime = (time: string): string => format(time);
</script>

<style scoped lang="scss">
.comment-item {
  padding: 5px 10px;
  .comment-item-header {
    display: flex;
    align-items: flex-start;
    .comment-item-avatar {
      font-size: 12px;
      border-radius: 3px;
    }
    .whoAndWhen {
      padding-left: 5px;
      .who {
        font-size: 20px;
        font-weight: bold;
      }
      .when {
        margin-left: 10px;
        font-size: 14px;
        color: rgba(0, 0, 0, 0.65);
      }
    }
  }
  .comment-content {
    font-size: 18px;
    .content {
      margin-top: 5px;
      font-size: 16px;
      margin-left: 33px;
      margin-bottom: 5px;
    }
    .link-btn {
      font-size: 14px;
      margin-left: 33px;
      margin-bottom: 5px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: normal;
      & :hover {
        font-weight: 900;
      }
    }
    & ::v-deep(.el-button--text) {
      color: "#909399";
      padding: 0;
    }
    .comment-tools {
      display: flex;
      justify-content: space-between;
      .input {
        margin-left: 33px;
        & ::v-deep(.el-textarea__inner) {
          border-radius: 0px;
          font-family: "main-font" !important;
          padding: 5px 5px;
          border-radius: 3px !important;
        }
      }
    }
  }
}
</style>
