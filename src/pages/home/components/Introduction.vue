<template>
  <div id="intro-wrapper">
    <el-col :span="24">
      <div class="intro-content">
        <div class="intro-detail">
          <p class="intro-sentence" v-for="(sentence, index) in content">{{ sentence }}</p>
        </div>
        <transition name="blur" mode="out-in">
          <el-image v-if="media_type === 'img'" class="intro-img" :src="media" alt :key="media" />
        </transition>
        <transition name="blur" mode="out-in">
          <video v-if="media_type === 'video'" class="intro-video" :src="media" controls />
        </transition>
      </div>
    </el-col>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  content: string[];
  media_type: string;
  media: string;
}>();
</script>
<style lang="scss" scoped>
#intro-wrapper {
  font-weight: 500;
  height: calc(100vh - 146px) !important;
  .intro-content {
    .intro-detail {
      margin-top: 20px;
      .intro-sentence {
        font-weight: 200;
        padding: 10px 10px;
      }
      margin-bottom: 30px;
    }
    .intro-img {
      //   width: 100%;
      max-width: 400px;
      height: auto;
      padding-left: 10px;
    }
    .intro-video {
      //   width: 100%;
      max-width: 400px;
      height: auto;
      padding-left: 10px;
    }
  }
}
.blur-enter-active,
.blur-leave-active {
  transition: all 0.5s ease-in-out;
}
.blur-enter,
.blur-leave-to {
  filter: blur(20px);
}
</style>
