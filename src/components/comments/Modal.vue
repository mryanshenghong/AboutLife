<template>
  <el-dialog :visible="visible" center @close="onModalClose">
    <Blog :title="title" :time="time" :id="id" :cat="cat" :mediaType="mediaType" :mediaSources="mediaSources" :modalMode="true" />
  </el-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import CommentItem from "./components/CommentItem.vue";
import { queryComments, newComment, IComment } from "@/api/comments";
const Blog = () => import("../Blog.vue");

@Component({
  name: "Comment",
  props: {
    title: String,
    time: String,
    id: String,
    cat: String,
    mediaType: String,
    mediaSources: Array,
    visible: { type: Boolean },
  },
  components: { CommentItem, Blog },
})
export default class CommentModal extends Vue {
  public visibleNestedCommentBox: string | null = null;
  public commentInput: string = "";
  public comments: any[] = [];
  private isInModal: boolean = false;
  public showNestedCommentBox(index: string): void {
    if (index === this.visibleNestedCommentBox) {
      this.visibleNestedCommentBox = null;
      return;
    }
    this.visibleNestedCommentBox = index;
  }

  public onModalClose(): void {
    this.$emit("toggleModal", false);
  }

  public writeComment() {
    const nComment: IComment = {
      content: this.commentInput,
      blogId: this.$props.id,
      parentId: "",
      repliedTo: null,
    };
    const token = localStorage.getItem("token");
    newComment(nComment, token!)
      .then(async (res) => await this.getComments())
      .catch((err) => this.$message.error("can not comment"));
    this.commentInput = "";
  }

  public async mounted() {
    await this.getComments();
    this.isInModal = this.$route.params.id ? false : true;
  }

  private async getComments() {
    const res: any = await queryComments(this.$props.id)
      .then((data) => data)
      .catch((err) => err);

    if (res.code === 200) {
      this.comments = res.result;
    } else {
      this.$message.error("Can not get comments");
    }
  }
}
</script>

<style></style>
