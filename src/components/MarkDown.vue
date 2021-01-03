<template>
  <mavon-editor
    ref="md"
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

<script>
import { mavonEditor } from "mavon-editor";
import { uploadImg } from "../api/file";
export default {
  props: {
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
  },
  components: {
    mavonEditor,
  },

  methods: {
    onSaveContent(value) {
      this.$emit("saveContent", value);
    },
    onImgAdd(fileName, file) {
      const { token } = localStorage;
      uploadImg(file, token)
        .then((res) => {
          this.$refs.md.$img2Url(fileName, `${process.env.VUE_APP_BASE}/static/${res.imgUrl}`);
        })
        .catch((err) => {
          this.$message({ message: `can not upload image ${err}`, type: "error" });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~mavon-editor/dist/css/index.css";
.markdown {
  margin-top: 20px;
}
</style>
