<template>
  <div class="home">
    <div class="home-nav">
      <h1 v-if="!state.isSm" class="home-title">{{ intro.title }}</h1>
      <div class="blog-navs">
        <p class="blog-nav"><a @click="onChangeNav('Anything')">Anything</a></p>
        <p class="blog-nav"><a @click="onChangeNav('Music')">Music</a></p>
        <p class="blog-nav"><a @click="onChangeNav('Dota')">Dota</a></p>
        <p class="blog-nav"><a @click="onChangeNav('Bambi')">Bambi</a></p>
      </div>
    </div>
    <el-col v-if="!state.isSm" :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <Introduction :content="intro.content" :media="intro.media" :media_type="intro.media_type" />
    </el-col>
    <!-- <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
      <Blogs />
    </el-col> -->
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onBeforeMount, onMounted, reactive } from "vue";
import Introduction from "./components/Introduction.vue";
// import Blogs from "./components/Blogs.vue";
import { useStore } from "@/store";

const store = useStore();
const intro = computed(() => store.getters["home/getIntroduction"]);

// State
const state = reactive({
  isSm: false,
});

// Lifecycle
onBeforeMount(() => {
  window.addEventListener("resize", handleResize);
  store.dispatch("home/changIntroduction", intro.value.nav);
});

onMounted(async () => {
  await nextTick();
  handleResize();
});

// Methods
const handleResize = () => {
  const clientWidth = document.documentElement.clientWidth;
  if (clientWidth < 768) {
    state.isSm = true;
  } else {
    state.isSm = false;
  }
};

const onChangeNav = (navName: string) => store.dispatch("home/changIntroduction", navName);
</script>
<style scoped lang="scss">
.home {
  height: calc(100vh - 108px);
  margin-top: 30px;
  font-family: "main-font";
  .home-nav {
    display: flex;
    justify-content: left;
    overflow-x: scroll;
    .home-title {
      font-weight: 600;
      font-size: 30px;
    }
    .blog-navs {
      margin-left: 20px;
      border-left: 5px solid black;
      display: flex;
      justify-content: center;
      cursor: pointer;
      .blog-nav {
        display: inline-block;
        padding: 0 20px 0 5px;
        line-height: 38px;
        a {
          text-decoration: none;
          color: black;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
