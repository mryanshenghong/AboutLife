<template>
  <el-card class="box-card">
    <Blog
      :title="title"
      :time="time"
      :id="id"
      :cat="cat"
      :mediaType="mediaType"
      :mediaSources="mediaSources"
    />
      <div v-if="mediaType !=='blog'" class="comment_box">
        <el-button type="text" size="small" @click="showComment"
          >查看评论</el-button>
      </div>
    </div>
      <div v-if="displayComments" class="comment-box">
          <Comment :blogId="id" />
      </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from '../utils/formatTime';
import Component from 'vue-class-component';
import Blog from '../components/Blog.vue';

const Comment = () => import('./comments/Comments.vue')

@Component({
  name: 'CardView',
  props: {
    title: String,
    time: String,
    id: String,
    cat: String,
    mediaType: String,
    mediaSources: Array
  },
  components: { Blog,Comment }
})

export default class CardView extends Vue {


  public resUrl: string = process.env.NODE_ENV === 'development' ? `${process.env.VUE_APP_RES_URL}` : `${process.env.VUE_APP_BASE}/static`;

  public displayComments:boolean = false;

  public formatTime(time: string) {
    return format(time);
  }

  public showComment() {
      this.displayComments = !this.displayComments;
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/consts.scss';
.box-card {
  max-width: 800px;
  background: transparent;
  box-shadow: none !important;
  border: none;
  margin: 0 auto;
  .comment_box {
    .el-button {
      color: #909399;
    }
  }
}
</style>
