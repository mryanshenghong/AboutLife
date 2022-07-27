<template>
  <div :v-loading="!state.hasContent" class="content-wrapper">
    <div class="blog-title">
      <h1>{{ state.title }}</h1>
    </div>
    <div class="content-header">
      <div>
        <span>Tags:</span>
        <el-tag
          @close="handleClose(tag)"
          :disable-transitions="false"
          :closable="state.canEdit"
          size="small"
          type="info"
          v-for="(tag, index) in state.tags"
          :key="index"
          class="tag"
          >{{ tag }}</el-tag
        >
        <div class="edit-tag-box" v-if="state.canEdit">
          <el-input
            class="new-tag-input"
            v-if="state.inputVisible"
            v-model="state.inputValue"
            :ref="saveTagInputRef"
            size="small"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
          ></el-input>
          <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
        </div>
      </div>
      <div v-if="userInfo.role === 0">
        <el-button @click="toggleEdit" class="edit-btn" size="small">{{ $t("message.content.edit") }}</el-button>
      </div>
    </div>
    <Markdown
      :showToolBars="state.showToolBars"
      :canEdit="state.canEdit"
      :v-loading="state.loading"
      @saveContent="saveContent"
      :content="state.content"
    ></Markdown>
    <div class="comments">
      <h2>全部评论</h2>
      <Comment :blogId="blogId" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, getCurrentInstance, nextTick, onMounted, reactive, ref } from "vue";
import { getBlog, saveBlog } from "@/api/blog";
import { useRoute, useRouter } from "vue-router";
import { useMessage } from "@/utils/element-plus";
import { useStore } from "@/store";
import { useI18n } from "vue-i18n";

// Components
const Markdown = defineAsyncComponent(() => import("@/components/MarkDown.vue"));
const Comment = defineAsyncComponent(() => import("@/components/comments/Comments.vue"));

const blogId = useRoute().params.id as string;

// Directives
const $message = useMessage(getCurrentInstance());
const router = useRouter();
const { t: $t } = useI18n();

// Refs
const saveTagInputRef = ref();

// Lifecycle
onMounted(async () => await _getBlog());

// State
const state = reactive<{
  title: string;
  content: string;
  tags: string[];
  allInfo: any;
  hasContent: boolean;
  loading: boolean;
  canEdit: boolean;
  showToolBars: boolean;
  inputVisible: boolean;
  inputValue: string;
}>({
  title: "",
  content: "",
  tags: [],
  allInfo: {},
  hasContent: false,
  loading: false,
  canEdit: false,
  showToolBars: false,
  inputVisible: false,
  inputValue: "",
});

const store = useStore();
const userInfo = computed(() => store.getters["userInfo"]);

// Methods
const saveContent = async (content: any) => {
  const { token } = localStorage;
  if (blogId && token) {
    try {
      const res: any = await saveBlog(
        {
          ...state.allInfo,
          content,
        },
        token
      );
      if (res.data.code === 200) {
        await _getBlog();
        $message?.success("Save successfully!");
      } else {
        throw Error();
      }
    } catch (err) {
      $message?.error("Can not save blog");
    }
  } else {
    $message?.error("No blog id");
  }
};
const toggleEdit = () => {
  state.canEdit = !state.canEdit;
  state.showToolBars = !state.showToolBars;
};
const _getBlog = async () => {
  state.loading = true;
  try {
    const res: any = await getBlog(blogId);
    state.title = res.data.result.title;
    state.content = res.data.result.content;
    state.tags = res.data.result.tags;
    state.allInfo = res.data.result;
    state.hasContent = true;
    state.loading = false;
  } catch (err) {
    $message?.error("Failed to get blog");
    router.push("/blog");
  }
};
const handleClose = (tag: string) => {
  state.tags = state.tags.filter((t) => t !== tag);
};
const showInput = async () => {
  state.inputVisible = true;
  await nextTick();
  saveTagInputRef.value.input.focus();
};
const handleInputConfirm = () => {
  const inputValue = state.inputValue;
  if (inputValue) {
    state.tags.push(inputValue);
  }
  state.inputVisible = false;
  state.inputValue = "";
};
</script>
<style lang="scss" scoped>
.content-wrapper {
  height: calc(100vh - 58px);
  margin-top: 20px;
  .content-header {
    margin-top: 20px;
    font-family: "main-font";
    display: flex;
    justify-content: space-between;
    .edit-tag-box {
      display: inline-block;
      .new-tag-input {
        width: 100px;
      }
      .button-new-tag {
        margin: 0 10px;
      }
    }
    .edit-btn {
      color: rgba(0, 0, 0, 0.7);
      background-color: #f2f3f7;
      border-color: #f2f3f7;
    }
    .tag {
      margin: 0 10px;
    }
  }
  .comments {
    margin-top: 20px;
    padding: 10px 10px 1px 10px;
    background-color: white;
    h2 {
      margin-bottom: 10px;
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
