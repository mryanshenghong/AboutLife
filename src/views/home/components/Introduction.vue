<template>
  <div id="intro-wrapper">
    <div class="intro-content">
      <div class="intro-detail">
        <p class="intro-sentence">日常生活琐碎小事....</p>
        <p class="intro-sentence">吹吹牛皮...</p>
        <p class="intro-sentence">所见所闻...</p>
        <p class="intro-sentence">anything...</p>
      </div>
      <img class="intro-img" src="@/assets/bambi.jpg" alt="" />
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
#intro-wrapper {
  font-weight: 500;
  height: calc(100vh - 158px) !important;
  .intro-content {
    .intro-detail {
      margin-top: 20px;
      .intro-sentence {
        padding: 10px 10px;
      }
    }
    .intro-img {
      max-width: 350px;
      padding-left: 10px;
      animation: imgFirstLandingAni 1s ease-in-out;
    }
  }
}

@keyframes imgFirstLandingAni {
  0% {
    filter: blur(20px);
  }
  100% {
    filter: blur(3px);
  }
}
</style>
