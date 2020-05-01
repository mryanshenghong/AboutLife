<template>
  <div class="home">
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
export default class Home extends Vue {}
</script>
<style scoped lang="scss">
.home {
  height: calc(100vh - 58px);
}
</style>
