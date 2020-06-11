<template>
  <el-card class="box-card">
    <div class="info">
      <div>
        <h3
          @click="select(id)"
          class="title"
        >{{ title }}<i class="el-icon-right"></i></h3>
        <p class="content">搜索结果</p>
        <div class="insight"><i class="el-icon-chat-line-round">&nbsp;0</i> <i class="el-icon-view">&nbsp; 0</i></div>
      </div>
      <span class="time">
        <el-tag
          type="info"
          size="small"
        >{{ formatTime(time) }}</el-tag>
      </span>
    </div>
  </el-card>
</template>

<script lang="ts">
import Vue from 'vue'
import { format } from '../utils/formatTime'
import Component from 'vue-class-component'

@Component({
  props: {
    title: String,
    time: String,
    id: String,
    cat: String,
  },
})
export default class CardView extends Vue {
  public select (id: string): void {
    this.$emit('select', id)
  }

  public formatTime (time: string) {
    return format(time)
  }
}
</script>
<style lang="scss" scoped>
@import '@/styles/consts.scss';
.box-card {
  max-width: 800px;
  background: transparent;
  box-shadow: none !important;
  border: none;
  margin: 0 auto;
  .title {
    cursor: pointer;
    font-size: $blog-title-size;
  }
  .info {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      margin-bottom: 10px;
      i {
        display: none;
      }
      &:hover {
        i {
          display: inline;
        }
      }
    }
    .content {
      margin-bottom: 20px;
    }
    .insight {
      i {
        padding: 0 5px;
      }
    }
  }
}
</style>
