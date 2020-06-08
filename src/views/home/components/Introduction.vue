<template>
  <div id="intro-wrapper">
    <div class="intro-content">
      <div class="intro-detail">
        <p
          class="intro-sentence"
          v-for="(sentence,index) in content"
        >{{sentence}}</p>
      </div>
      <img
        v-if="media_type==='img'"
        class="intro-img"
        :src="media"
        alt=""
      />
      <video
        v-if="media_type==='video'"
        class="intro-video"
        :src="media"
        controls
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
const IntroProps = Vue.extend({
  props: {
    content: {
      type: Array,
      default: () => []
    },
    media_type: {
      type: String,
      default: ''
    },
    media: {
      type: String,
      default: ''
    }
  }
})
export default class Introduction extends IntroProps {

}
</script>
<style lang="scss" scoped>
#intro-wrapper {
  font-weight: 500;
  height: calc(100vh - 158px) !important;
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
      max-width: 450px;
      padding-left: 10px;
      animation: imgFirstLandingAni 1s ease-in-out;
    }
    .intro-video {
      max-width: 450px;
      padding-left: 10px;
      animation: imgFirstLandingAni 1s ease-in-out;
    }
  }
}

@keyframes imgFirstLandingAni {
  from {
    filter: blur(20px);
  }
  to {
    filter: blur(3px);
  }
}
</style>
