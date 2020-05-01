<template>
  <div class="home">
    <el-col :span="12">
      左边
    </el-col>
    <el-col :span="12">
      右边
    </el-col>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {},
}
</script>
<style scoped lang="scss">
.home {
  height: calc(100vh - 154px);
}
</style>
