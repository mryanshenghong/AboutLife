<template>
  <div class="home">
    <div class="home-nav">
      <h1 class="home-title">Anything</h1>
      <div class="blog-navs">
        <p class="blog-nav"><a href="">Anything</a></p>
        <p class="blog-nav"><a href="">Music</a></p>
        <p class="blog-nav"><a href="">Dota</a></p>
        <p class="blog-nav"><a href="">Bambi</a></p>
      </div>
    </div>
    <el-col :span="12">
      <Introduction />
    </el-col>
    <el-col :span="12">
      <Blogs />
    </el-col>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import Vue from 'vue'
import Component from 'vue-class-component'
import Introduction from './components/Introduction.vue'
import Blogs from './components/Blogs.vue'
@Component({
  components: { Introduction, Blogs },
})
export default class Home extends Vue { }
</script>
<style scoped lang="scss">
.home {
  height: calc(100vh - 58px);
  margin-top: 30px;
  font-family: 'main-font';
  .home-nav {
    display: flex;
    justify-content: left;
    .home-title {
      font-weight: 600;
      font-size: 30px;
    }
    .blog-navs {
      margin-left: 20px;
      border-left: 5px solid black;
      display: flex;
      justify-content: center;
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
