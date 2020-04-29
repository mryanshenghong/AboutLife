<template>
  <div class="home">
    <router-view></router-view>
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
