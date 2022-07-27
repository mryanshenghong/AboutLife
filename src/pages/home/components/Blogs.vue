<template>
  <div class="blogs-wrapper">
    <vuescroll :ops="scrollOptions">
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

<script lang="ts" setup>
import { computed } from "vue";
import vuescroll from "vuescroll";
import CardView from "@/components/CardView.vue";
import { useStore } from "@/store";

const store = useStore();
const intro = computed(() => store.getters["home/getIntroduction"]);

const scrollOptions: object = {
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
