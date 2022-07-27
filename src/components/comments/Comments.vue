<template>
  <div class="comment-container">
    <div v-if="isLogin" class="comment-input-wrapper notPadding">
      <el-input size="small" type="textarea" autosize class="input" v-model="state.commentInput" placeholder="comment" />
      <el-button size="small" style="margin: 0 10px; max-height: 33px" @click="writeComment" link>{{ $t("message.comments.comment") }}</el-button>
    </div>
    <CommentItem
      v-for="(comment, index) in state.comments"
      :key="index.toString()"
      :idx="index.toString()"
      :comment="comment"
      :visibleNestedCommentBox="state.visibleNestedCommentBox"
      :showNestedCommentBox="() => showNestedCommentBox(index.toString())"
      :isNested="false"
      :getComments="() => getComments()"
    >
      <div class="childComment" v-if="comment.comments.length > 0">
        <CommentItem
          v-for="(childComment, subindex) in comment.comments"
          :key="subindex + '-' + index"
          :idx="index + '-' + subindex"
          :comment="childComment"
          :visibleNestedCommentBox="state.visibleNestedCommentBox"
          :showNestedCommentBox="() => showNestedCommentBox(`${index}-${subindex}`)"
          :isNested="true"
          :getComments="() => getComments()"
        />
      </div>
    </CommentItem>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, reactive } from "vue";
import CommentItem from "./components/CommentItem.vue";

import { queryComments, newComment, IComment } from "@/api/comments";
import { useMessage } from "@/utils/element-plus";
import { useStore } from "@/store";

const $message = useMessage(getCurrentInstance());
const store = useStore();

// State, props
const props = defineProps<{ blogId: string }>();
const state = reactive<{
  visibleNestedCommentBox: string | null;
  commentInput: string;
  comments: any[];
}>({
  visibleNestedCommentBox: null,
  commentInput: "",
  comments: [],
});

const isLogin = computed(() => store.state.isLogin);

// Lifecycle
onMounted(async () => {
  await getComments();
});

// Methods
const showNestedCommentBox = (index: string) => {
  if (index === state.visibleNestedCommentBox) {
    state.visibleNestedCommentBox = null;
    return;
  }
  state.visibleNestedCommentBox = index;
};

const writeComment = async () => {
  const nComment: IComment = {
    content: state.commentInput,
    blogId: props.blogId,
    parentId: "",
    repliedTo: null,
  };
  const token = localStorage.getItem("token");
  try {
    await newComment(nComment, token!);
    await getComments();
  } catch (err) {
    $message?.error(`can not comment, ${err}`);
  } finally {
    state.commentInput = "";
  }
};

const getComments = async () => {
  const res: any = await queryComments(props.blogId)
    .then((data) => data)
    .catch((err) => null);

  if (res.code === 200) {
    state.comments = res.result;
  } else {
    $message?.error("Can not get comments");
  }
};
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
    margin-bottom: 10px;
    .input {
      flex: 1;
      ::v-deep(.el-textarea__inner) {
        font-family: "main-font" !important;
        padding: 5px 5px;
        border-radius: 3px !important;
      }
    }
    &.notPadding {
      padding: 0 0;
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
