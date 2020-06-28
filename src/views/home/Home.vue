<template>
  <div class="home">
    <div class="home-nav">
      <h1 v-if="!isSm" class="home-title">{{ intro.title }}</h1>
      <div class="blog-navs">
        <p class="blog-nav"><a @click="getBlogsAndInfo('Anything')">Anything</a></p>
        <p class="blog-nav"><a @click="getBlogsAndInfo('Music')">Music</a></p>
        <p class="blog-nav"><a @click="getBlogsAndInfo('Dota')">Dota</a></p>
        <p class="blog-nav"><a @click="getBlogsAndInfo('Bambi')">Bambi</a></p>
      </div>
    </div>
    <el-col v-if="!isSm" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <Introduction :content="intro.content" :media="intro.media" :media_type="intro.media_type" />
    </el-col>
    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <Blogs />
    </el-col>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'
import { namespace } from 'vuex-class'
import Introduction from './components/Introduction.vue'
import Blogs from './components/Blogs.vue'

const homeModule = namespace('MODULE_HOME')

@Component({
  components: { Introduction, Blogs },
})
export default class Home extends Vue {
  public isSm: boolean = false
  @homeModule.Getter('getIntroduction') public intro!: {
    nav: string
    title: string
    content: string
    media_type: string
    media: string
  }
  @homeModule.Action('changIntroduction') public getBlogsAndInfo!: (navName: string) => void
  public created() {
    window.addEventListener('resize', this.handleResize)
    this.getBlogsAndInfo(this.intro.nav)
  }

  public handleResize() {
    let clientWidth = document.documentElement.clientWidth
    if (clientWidth < 768) {
      this.isSm = true
    } else {
      this.isSm = false
    }
  }

  public mounted() {
    this.$nextTick(() => {
      this.handleResize()
    })
  }
}
</script>
<style scoped lang="scss">
.home {
  height: calc(100vh - 108px);
  margin-top: 30px;
  font-family: 'main-font';
  .home-nav {
    display: flex;
    justify-content: left;
    overflow-x: scroll;
    .home-title {
      font-weight: 600;
      font-size: 30px;
    }
    .blog-navs {
      margin-left: 20px;
      border-left: 5px solid black;
      display: flex;
      justify-content: center;
      cursor: pointer;
      .blog-nav {
        display: inline-block;
        padding: 0 20px 0 5px;
        line-height: 38px;
        a {
          text-decoration: none;
          color: black;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
