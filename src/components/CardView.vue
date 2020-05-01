<template>
  <el-card class="box-card">
    <div class="info">
      <span class="tag">
        <h3 @click="select(id)" class="title">{{ title }}</h3>
      </span>
      <span class="time">
        测试
        <el-tag type="info" size="small">{{ formatTime(time) }}</el-tag>
      </span>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from '../utils/formatTime'
import Component from 'vue-class-component'
const CardViewProps = Vue.extend({
  props: {
    title: {
      type: String,
      default: '',
    },
    time: {
      types: String,
      default: '',
    },
    id: {
      type: String,
      default: '',
    },
    cat: {
      type: String,
      default: '',
    },
  },
})
export default class CardView extends CardViewProps {
  public select = (id: string): void => {
    console.log(id)
    this.$emit('select', id)
  }
  public formatTime = (time: string) => {
    return format(time)
  }
}
</script>
<style lang="scss" scoped>
.box-card {
  max-width: 1000px;
  background: transparent;
  box-shadow: none !important;
  border: none;
  margin: 0 auto;
  .title {
    cursor: pointer;
    padding: 0 8px;
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin: 10px;
  }
}
</style>
