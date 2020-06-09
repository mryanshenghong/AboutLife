<template>
  <div class="blogs-wrapper">
    <vuescroll
      ref="vs"
      :ops="scrollOptions"
    >
      <div class="blog-list">
        <CardView
          v-for="(blog,index) in intro.blogs"
          :title="blog.title"
          :time="blog.createdAt"
          :cat="blog.cat"
          :key="blog.id"
          @select="viewContent"
        />
      </div>
    </vuescroll>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import vuescroll from 'vuescroll'
import CardView from '@/components/CardView.vue'
import { Blog } from '@/store/home'
import VueRouter from 'vue-router'
const homeModule = namespace('MODULE_HOME')

@Component({
  components: { vuescroll, CardView },
})
export default class Blogs extends Vue {
  @homeModule.Getter('getIntroduction') public intro!:
    {
      blogs: Blog[]
    }
  public scrollOptions: object = {
    vuescroll: {
      mode: 'native',
      wheelScrollDuration: 1000,
      detectResize: true,
    },
    scrollPanel: {
      easing: 'easeInOutQuart',
    },
    bar: {
      size: 0,
    },
  }
  public created(): void {
    const vs = this.$refs.vs as vuescroll
  }

  public viewContent(id: string) {
    console.log(this.$store)
    this.$router.push(`/content/${id}`)
  }
}
</script>

<style lang="scss" scoped>
.blogs-wrapper {
  //   overflow-y: scroll !important;
  height: calc(100vh - 158px) !important;
  margin-top: 30px;
  .blog-list {
    padding-left: 20px;
  }
}
</style>
