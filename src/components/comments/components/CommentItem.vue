<template>
  <div class="comment-item">
    <div class="comment-item-header">
      <el-avatar
        shape="square"
        size="small"
        class="comment-item-avatar"
      >{{comment.commentedBy.name.charAt(0).toUpperCase()}}</el-avatar>
      <div class="whoAndWhen">
        <span class="who">{{comment.commentedBy.name}}</span>
        <span class="when">{{format(comment.commentedDate)}}</span>
      </div>
    </div>
    <div class="comment-content">
      <p class="content">{{comment.content}}</p>
      <div>
        <el-button type="text" class="link-btn" @click="showNestedCommentBox">评论</el-button>
        <div class="comment-tools">
          <el-input
            v-if="visibleNestedCommentBox === idx"
            size="medium"
            type="textarea"
            autosize
            class="input"
            placeholder="comment"
            v-model="inputComment"
          />
          <el-button
            @click="writeComment"
            v-if="visibleNestedCommentBox === idx"
            size="small"
            style="margin:0 10px; max-height: 33px"
          >Comment</el-button>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { format } from '@/utils/formatTime';

import { newComment, IComment } from '@/api/comments';

@Component({
  name: 'CommentItem',
  props: {
    idx: String,
    comment: Object,
    showNestedCommentBox: Function,
    visibleNestedCommentBox: String
  }
})
export default class CommentItem extends Vue {
  public inputComment: string = '';

  public async writeComment() {
    const comment = this.$props.comment;
    const nComment: IComment = {
      blogId: comment.blogId,
      parentId: comment._id,
      repliedTo: comment.commentedBy,
      content: this.inputComment
    }
    const token = localStorage.getItem('token');
    const res = await newComment(nComment, token!).then(res => res).catch(err => err)
  }

  private format(time: string) {
    return format(time)
  }
}
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
    & /deep/ .el-button--text {
      color: '#909399';
      padding: 0;
    }
    .comment-tools {
      display: flex;
      justify-content: space-between;
      .input {
        margin-left: 33px;
      }
    }
  }
}
</style>