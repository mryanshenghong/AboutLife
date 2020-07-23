<template>
  <div class="comment-container">
    <div class="comment-header">
      <el-button type="text" class="link-btn" icon="el-icon-back" @click="onDrawerClose"></el-button>
    </div>
    <div class="comment-input-wrapper">
      <el-input size="medium" type="textarea" autosize class="input" v-model="commentInput" placeholder="comment" />
      <el-button size="small" style="margin:0 10px; max-height: 33px" @click="writeComment">Comment</el-button>
    </div>
    <div class="diviver"></div>
    <CommentItem
      v-for="(comment,index) in comments"
      :key="index.toString()"
      :idx="index.toString()"
      :comment="comment"
      :visibleNestedCommentBox="visibleNestedCommentBox"
      :showNestedCommentBox="() => showNestedCommentBox(index.toString())"
    >
      <div class="childComment" v-if="comment.comments.length >0">
        <CommentItem
          v-for="(childComment,subindex) in comment.comments"
          :key="subindex+'-'+index"
          :idx="index+'-'+subindex"
          :comment="childComment"
          :visibleNestedCommentBox="visibleNestedCommentBox"
          :showNestedCommentBox="() => showNestedCommentBox(`${index}-${subindex}`)"
        />
      </div>
    </CommentItem>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import CommentItem from './components/CommentItem.vue';

import { queryComments, newComment, IComment } from '@/api/comments';

@Component({
  name: 'Comment',
  props: {
    blogId: {
      type: String
    }
  },
  components: { CommentItem }
})
export default class Comment extends Vue {
  public visibleNestedCommentBox: string | null = null;
  public commentInput: string = '';
  public comments: any[] = []
  public showNestedCommentBox(index: string): void {
    this.visibleNestedCommentBox = index;
  }

  public onDrawerClose(): void {
    this.$emit('toggleDrawer', false)
  }

  public writeComment() {
    const nComment: IComment = {
      content: this.commentInput,
      blogId: this.$props.blogId,
      parentId: '',
      repliedTo: null
    }
    const token = localStorage.getItem('token');
    newComment(nComment, token!).then(async (res) => await this.getComments()).catch(err => this.$message.error('can not comment'))
    this.commentInput = ''
  }

  private async getComments() {
    const token = localStorage.getItem('token');
    const res: any = await queryComments(this.$props.blogId, token!)
    if (res.code === 200) {
      this.comments = res.result
    } else {
      this.$message.error('Can not get comments');
    }
  }

  public async mounted() {
    await this.getComments()
  }
}
</script>
<style lang="scss" scoped>
.link-btn {
  color: #909399;
}
.comment-container {
  .comment-header {
    padding: 0 10px;
  }
  .comment-input-wrapper {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    .input {
      flex: 1;
      & /deep/ .el-input__inner {
        border-radius: 0px !important;
      }
    }
  }

  .diviver {
    display: block;
    height: 1px;
    width: inherit;
    margin: 24px 24px;
    background-color: #dcdfe6;
    position: relative;
  }
  .childComment {
    margin-left: 23px;
  }
}
</style>
