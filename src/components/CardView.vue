<template>
  <el-card class="box-card">
    <Blog
      :title="title"
      :time="time"
      :id="id"
      :cat="cat"
      :mediaType="mediaType"
      :mediaSources="mediaSources"
      :modalMode="false"
    />
      <div v-if="mediaType !=='blog'" class="comment_box">
        <el-button type="text" size="small" @click="toggleModal(true)"
          >查看评论</el-button
        >
      </div>
    </div>
    <BlogModal  
      :visible="isModalShow"     
      :title="title"
      :time="time"
      :id="id"
      :cat="cat"
      :mediaType="mediaType"
      :mediaSources="mediaSources"
      @toggleModal="toggleModal"  />
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from '../utils/formatTime';
import Component from 'vue-class-component';
import Blog from '../components/Blog.vue';

const BlogModal = () => import('../components/comments/Modal.vue')

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
  components: { Blog, BlogModal }
})

export default class CardView extends Vue {


  public resUrl: string = process.env.NODE_ENV === 'development' ? `${process.env.VUE_APP_RES_URL}` : `${process.env.VUE_APP_BASE}/static`;

  public isModalShow: boolean = false;

  //   public select(id: string): void {
  //     this.$emit('select', id);
  //   }

  public formatTime(time: string) {
    return format(time);
  }

  public toggleModal(isModalShow: boolean) {
    this.isModalShow = isModalShow
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
