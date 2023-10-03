<template>
  <el-dialog
    title="新建博客"
    :model-value="showCreateModal"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :append-to-body="false"
  >
    <el-form
      @submit.prevent
      ref="blogFromRef"
      :model="state.form"
      :inline="true"
      size="small"
      :rules="formRules"
    >
      <el-form-item label="博客主题" prop="title">
        <el-input v-model="state.form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="博客标签" style="margin-left: 10px">
        <div class="tagInput">
          <el-input v-model="state.form.tag" autocomplete="off"></el-input>
          <el-button class="addTagBtn" @click="addTag">添加</el-button>
        </div>
        <div class="tagsBox">
          <el-tag
            size="small"
            v-for="(value, index) in state.tags"
            :key="index"
            >{{ value }}</el-tag
          >
        </div>
      </el-form-item>
      <el-form-item label="博客种类" prop="cat">
        <el-select
          @change="onCatSelect"
          filterable
          allow-create
          v-model="state.form.cat"
          placeholder="请选一个博客种类"
        >
          <el-option
            v-for="(value, index) in state.cats"
            :key="index"
            :label="value"
            :value="value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="媒体类型" prop="media_type">
        <el-select
          @change="onMediaSelet"
          filterable
          v-model="state.form.media_type"
          placeholder="选择博客媒体类型"
        >
          <el-option key="1" label="文章" value="blog" />
          <el-option key="2" label="图片" value="image" />
          <el-option key="3" label="音乐" value="music" />
          <el-option key="4" label="视频" value="video" />
        </el-select>
      </el-form-item>
      <el-form-item
        label="媒体文件"
        prop="mediaSources"
        style="margin-left: 10px; display: block"
      >
        <el-button
          type="primary"
          :disabled="state.onUpload"
          @click="openFileInput"
          >add</el-button
        >
        <el-button
          type="primary"
          :disabled="state.onUpload"
          @click="openCloudFiles"
          >Add from Cloud</el-button
        >
        <i class="el-icon-loading spin" v-if="state.onUpload"></i>
        <div style="display: block">
          <el-tag
            class="url"
            size="default"
            type="success"
            v-if="state.form.mediaSources.length"
            v-for="(url, index) in state.form.mediaSources"
            :key="index"
            :closable="true"
            @close="removeFile(url)"
            >{{ url }}</el-tag
          >
        </div>
        <el-select
          style="margin-top: 10px"
          v-if="state.cloudFiles.length"
          @change="onCloudFileSelect"
          filterable
          placeholder="选择Cloud files"
        >
          <el-option
            v-for="(file, index) in state.cloudFiles"
            :key="index"
            :label="file"
            :value="file"
          />
        </el-select>
        <input
          ref="fileInputRef"
          id="fileInput"
          type="file"
          @change="fileChange"
          v-show="false"
          :multiple="true"
          accept="image/jpg, image/jpeg, image/png, video/mp4, audio/*"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="onCloseModal">取 消</el-button>
      <el-button size="small" type="primary" @click="onCreateBlog(blogFromRef)"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { getBlogCats } from "@/api/blog";
import { uploadFiles, getCloudFiles } from "@/api/file";
import { useMessage } from "@/utils/element-plus";
import { FormInstance } from "element-plus";
import { getCurrentInstance, nextTick, onMounted, reactive, ref } from "vue";

// Props, state, dispatch
defineProps<{ showCreateModal: boolean }>();
const emit = defineEmits<{
  (e: "onCloseCreateModal", show: boolean): void;
  (e: "onCreateBlog", blog: any): void;
}>();

const formRules = {
  title: [{ required: true, message: "请输入主题", trigger: "change" }],
  cat: [{ required: true, message: "请选择种类", trigger: "change" }],
  media_type: [
    { required: true, message: "请选择媒体类型", trigger: "change" },
  ],
};
const state = reactive<{
  form: {
    title: string;
    tag: string;
    cat: string;
    media_type: string;
    mediaSources: any[];
  };
  tags: string[];
  cats: string[];
  cloudFiles: string[];
  onUpload: boolean;
}>({
  form: {
    title: "",
    tag: "",
    cat: "",
    media_type: "",
    mediaSources: [],
  },
  tags: [],
  cats: [],
  cloudFiles: [],
  onUpload: false,
});

// Refs
const blogFromRef = ref<FormInstance>();
const fileInputRef = ref();
// Liefcycle
onMounted(async () => {
  await nextTick();
  //   typedef
  const res: any = await getBlogCats(localStorage.token);
  if (res) state.cats = res.data.result.cats;
  else state.cats = [];
});

// Methods
const onCloseModal = () => emit("onCloseCreateModal", false);

const onCreateBlog = async (formRef: FormInstance | undefined) => {
  if (!formRef) return;
  await formRef.validate((valid: boolean) => {
    const $message = useMessage(getCurrentInstance());
    if (valid) {
      const newBlog = {
        title: state.form.title,
        tags: state.tags,
        cat: state.form.cat,
        mediaType: state.form.media_type,
        mediaSources: state.form.mediaSources,
        isTech: false,
      };
      emit("onCreateBlog", newBlog);
    } else {
      $message?.info("invalid");
    }
  });

  formRef.resetFields();
  state.tags = [];
};
const addTag = () => {
  if (state.form.tag) {
    state.tags.push(state.form.tag);
    state.form.tag = "";
  }
};
const onCatSelect = (val: string) => (state.form.cat = val);
const onMediaSelet = (val: string) => (state.form.media_type = val);
const onCloudFileSelect = (val: string) => state.form.mediaSources.push(val);
const fileChange = async (e: any) => {
  const $message = useMessage(getCurrentInstance());
  state.onUpload = true;
  try {
    const res: any = await uploadFiles(e.target.files, localStorage.token);
    state.form.mediaSources.push(...res.fileUrls);
    state.onUpload = false;
  } catch (err) {
    console.log(err);
    state.onUpload = false;
    $message?.error("Cannot upload files" + err);
  }
};
const openFileInput = () => fileInputRef.value.click();
const openCloudFiles = async () => {
  const resp: any = await getCloudFiles(localStorage.token);
  if (resp && resp?.files.length) {
    state.cloudFiles = resp.files;
  }
};
const removeFile = (url: string) =>
  state.form.mediaSources.filter((source) => source !== url);
</script>

<style lang="scss" scoped>
#fileInput {
  width: 0;
  height: 0;
}
.url {
  margin: 0 5px;
}
.tagInput {
  display: flex;
  justify-content: space-between;
  .addTagBtn {
    margin-left: 10px;
  }
}
.tagsBox {
  margin: 5px 0;
}
.spin {
  margin-left: 10px;
}
</style>
