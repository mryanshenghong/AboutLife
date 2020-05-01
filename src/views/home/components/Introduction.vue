<template>
  <div id="intro-wrapper">
    <div class="intro-content">
      <h1 class="intro-title">Anything</h1>
      <div class="intro-detail">
        <p class="intro-sentence">日常生活琐碎小事....</p>
        <p class="intro-sentence">吹吹牛皮...</p>
        <p class="intro-sentence">所见所闻...</p>
        <p class="intro-sentence">anything...</p>
      </div>
    </div>
    <img class="intro-img" src="@/assets/bambi.jpeg" alt="" />
  </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
#intro-wrapper {
  position: relative;
  font-weight: 500;
  z-index: 2;
  background-color: transparent !important;
  .intro-content {
    padding: 10px;
    margin-top: 30px;
    .intro-title {
      font-size: 30px;
    }
    .intro-detail {
      margin-top: 20px;
      .intro-sentence {
        padding: 10px 10px;
      }
    }
  }
  .intro-img {
    top: 50px;
    position: absolute;
    width: 100%;
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
