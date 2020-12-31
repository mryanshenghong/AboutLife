<template>
  <div class="blogs-wrapper">
    <vuescroll ref="vs" :ops="scrollOptions">
      <div class="blog-list">
        <CardView
          v-for="(blog, index) in intro.blogs"
          :title="blog.title"
          :time="blog.createdAt"
          :cat="blog.cat"
          :id="blog.id"
          :key="blog.id"
          :mediaType="blog.mediaType"
          :mediaSources="blog.mediaSources"
        />
      </div>
    </vuescroll>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { namespace } from "vuex-class";
import vuescroll from "vuescroll";
import CardView from "@/components/CardView.vue";
import { Blog } from "@/store/home";

const homeModule = namespace("MODULE_HOME");

@Component({
  components: { vuescroll, CardView },
})
export default class Blogs extends Vue {
  @homeModule.Getter("getIntroduction") public intro!: {
    blogs: Blog[];
  };
  public scrollOptions: object = {
    vuescroll: {
      mode: "native",
      wheelScrollDuration: 100,
      detectResize: true,
    },
    scrollPanel: {
      speed: 300,
    },
    bar: {
      size: 0,
    },
  };
  public created(): void {
    const vs = this.$refs.vs as vuescroll;
  }
}
</script>

<style lang="scss" scoped>
.blogs-wrapper {
  height: calc(100vh - 176px) !important;
  padding-top: 30px;
  .blog-list {
    padding-left: 20px;
  }
}
</style>
