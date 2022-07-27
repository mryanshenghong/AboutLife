<template>
  <md-editor
    ref="editableMDRef"
    v-if="canEdit"
    v-model="content"
    class="markdown"
    :preview="true"
    codeTheme="github"
    @save="onSaveContent"
    @on-upload-img="onImgAdd"
    :toolbars="toolbarOptions"
    :footers="[]"
  />
  <md-editor ref="readonlyMDRef" v-else :modelValue="content" class="markdown" preview-only codeTheme="github" />
</template>

<script lang="ts" setup>
import MdEditor from "md-editor-v3";
import type { ToolbarNames } from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import { uploadImg } from "@/api/file";
import { useMessage } from "@/utils/element-plus";
import { getCurrentInstance, ref } from "vue";

const emit = defineEmits<{ (e: "saveContent", value: any): void }>();

// Refs
const editableMDRef = ref();
const readonlyMDRef = ref();

// Props
defineProps({
  content: {
    type: String,
    default: undefined,
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
});

const toolbarOptions: ToolbarNames[] = [
  "bold",
  "underline",
  "italic",
  "-",
  "title",
  "strikeThrough",
  "sub",
  "sup",
  "quote",
  "unorderedList",
  "orderedList",
  "-",
  "codeRow",
  "code",
  "link",
  "image",
  "table",
  "-",
  "revoke",
  "next",
  "save",
  "-",
  "pageFullscreen",
  "fullscreen",
  "preview",
];

// Methods
const onSaveContent = (value: any) => emit("saveContent", value);
const onImgAdd = async (files: Array<File>, callback: Function) => {
  const $message = useMessage(getCurrentInstance());
  const { token } = localStorage;
  try {
    const res: any = await uploadImg(files[0], token);
    const resUrl: string = import.meta.env.DEV ? `${import.meta.env.VITE_APP_RES_URL}` : `${import.meta.env.VITE_APP_BASE}/static`;
    callback([`${resUrl}/${res.imgUrl}`]);
  } catch (err) {
    $message?.error(`can not upload image ${err}`);
  }
};
</script>
<style lang="scss" scoped>
.markdown {
  margin-top: 20px;
}
</style>
