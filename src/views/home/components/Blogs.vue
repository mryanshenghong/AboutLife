<template>
  <div class="blogs-wrapper">
    <vuescroll
      ref="vs"
      :ops="scrollOptions"
    >
      <div class="blog-list">
        <CardView
          title="测试"
          time="2020-04-05T21:14:54.014Z"
          cat="测试"
        ></CardView>
        <CardView
          title="测试"
          time="2020-04-05T21:14:54.014Z"
          cat="测试"
        ></CardView>
        <CardView
          title="测试"
          time="2020-04-05T21:14:54.014Z"
          cat="测试"
        ></CardView>
      </div>
    </vuescroll>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import vuescroll from 'vuescroll'
import CardView from '@/components/CardView.vue'

@Component({
  components: { vuescroll, CardView },
})
export default class Blogs extends Vue {
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
  private created(): void {
    const vs = this.$refs['vs'] as vuescroll
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
