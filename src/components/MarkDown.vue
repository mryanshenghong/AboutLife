<template>
  <mavon-editor
    ref="mdRef"
    :transition="true"
    :boxShadow="false"
    class="markdown"
    defaultOpen="preview"
    :toolbarsFlag="showToolBars"
    :ishljs="false"
    :value="content"
    :editable="canEdit"
    :subfield="isSubField"
    @save="onSaveContent"
    @imgAdd="onImgAdd"
  />
</template>

<script lang="ts" setup>
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import { uploadImg } from "@/api/file";
import { useMessage } from "@/utils/element-plus";
import { getCurrentInstance, ref } from "vue";

const emit = defineEmits<{ (e: "saveContent", value: any): void }>();
// Props
defineProps({
  content: {
    type: String,
    default: undefined,
  },
  defaultOpen: {
    type: String,
    default: "preview",
  },
  canEdit: {
    type: Boolean,
    default: false,
  },
  showToolBars: {
    type: Boolean,
    default: false,
  },
  isSubField: {
    type: Boolean,
    default: false,
  },
});

const mdRef = ref();

// Methods
const onSaveContent = (value: any) => emit("saveContent", value);
const onImgAdd = async (fileName: string, file: any) => {
  const $message = useMessage(getCurrentInstance());
  const { token } = localStorage;
  try {
    const res: any = await uploadImg(file, token);
    mdRef.value.md.$img2Url(fileName, `${process.env.VUE_APP_BASE}/static/${res.imgUrl}`);
  } catch (err) {
    $message?.error(`can not upload image ${err}`);
  }
};
</script>
<style lang="scss" scoped>
@import "~mavon-editor/dist/css/index.css";
.markdown {
  margin-top: 20px;
}
</style>
