<template>
  <div id="intro-wrapper">
    <div class="intro-content">
      <h1 class="intro-title">Anything</h1>
      <div class="intro-detail">
        <img class="intro-img" src="@/assets/bambi.jpeg" alt="" />
        <p class="intro-sentence">日常生活琐碎小事....</p>
        <p class="intro-sentence">吹吹牛皮...</p>
        <p class="intro-sentence">所见所闻...</p>
        <p class="intro-sentence">anything...</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
#intro-wrapper {
  font-weight: 500;

  background-color: transparent !important;
  .intro-content {
    margin-top: 30px;
    .intro-title {
      font-size: 30px;
    }
    .intro-detail {
      z-index: 2;
      position: relative;
      margin-top: 20px;
      .intro-sentence {
        padding: 10px 10px;
      }
    }
  }
  .intro-img {
    top: 100px;
    right: 0;
    position: absolute;
    width: 80%;
    z-index: -1;
    background: transparent;
    filter: blur(3px);
    opacity: 0.85;
    animation: imgFirstLandingAni 2s ease-in-out;
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
