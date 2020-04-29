<template>
  <div id="app">
    <el-container>
      <el-main>
        <mainHeader></mainHeader>
        <router-view />
        <mainFooter />
      </el-main>
    </el-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import mainHeader from '@/components/header.vue'
import mainFooter from '@/components/footer.vue'
@Component({
  components: { mainHeader, mainFooter },
})
export default class App extends Vue {}
</script>

<style lang="scss">
@import './styles/consts.scss';

#app {
  background: $theme-color;
  ::-webkit-scrollbar {
    display: none;
  }
  .el-container {
    height: 100vh;
    overflow-y: hidden;
    .el-main {
      overflow: scroll;
      -webkit-overflow-scrolling: touch;
    }
  }
}
</style>
