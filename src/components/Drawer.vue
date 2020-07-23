<template>
  <el-drawer
    :modal="true"
    :modal-append-to-body="true"
    :withHeader="false"
    :visible="isDrawerShow"
    @close="onDrawerClose"
  >
    <slot></slot>
  </el-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
@Component({
  name: 'Drawer',
  props: {
    isDrawerShow: Boolean,
  },
})
export default class Drawer extends Vue {
  public onDrawerClose(): void {
    this.$emit('toggleDrawer', false)
  }
}
</script>
<style lang="scss" scoped>
/deep/ .el-drawer__body {
  overflow: scroll;
}
</style>