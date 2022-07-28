<template>
  <div>
    <div v-if="mediaType === 'blog'" class="media_blog">
      <div>
        <h3 @click="select(id)" class="title">
          {{ title }}
          <i class="el-icon-right"></i>
        </h3>
        <div class="insight">
          <i class="el-icon-chat-line-round">&nbsp;0</i>
          <i class="el-icon-view">&nbsp; 0</i>
        </div>
      </div>
      <span class="time">
        <el-tag type="info" size="small">{{ formatTime(time) }}</el-tag>
      </span>
    </div>
    <div class="media_multi" v-else>
      <div class="des-box">
        <h3 class="title">{{ title }}</h3>
        <el-tag class="tag" size="small" type="info">{{ formatTime(time) }}</el-tag>
      </div>
      <div class="media_box">
        <video
          width="400"
          height="300"
          ref="videoPlayerRef"
          v-if="mediaType === 'video'"
          playinline
          :src="`${resUrl}/${mediaSources?.[0]}`"
          @play="onVideoPlay"
          controls="true"
          controlslist="nodownload"
        ></video>
        <audio
          @play="onMusicPlay"
          ref="musicPlayerRef"
          :src="`${resUrl}/${mediaSources?.[0]}`"
          v-if="mediaType === 'music'"
          controls
          controlsList="nodownload"
        ></audio>
        <div v-if="mediaType === 'image'" class="img-container">
          <el-image :src="`${resUrl}/${mediaSources?.[0]}`" :preview-src-list="[`${resUrl}/${mediaSources?.[0]}`]"></el-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from "vue";
import { format } from "@/utils/formatTime";

import { useStore } from "@/store";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const resUrl: string = import.meta.env.DEV ? `${import.meta.env.VITE_APP_RES_URL}` : `${import.meta.env.VITE_APP_BASE}/files`;

const playerOptions: any = {
  control: true,
};

// Props
const props = defineProps<{
  title: string;
  time: string;
  id: string;
  cat: string;
  mediaType: string;
  mediaSources: string[];
}>();

// Lifecycle
// onMounted(async () => {
//   await nextTick();
//   playerOptions.sources = props.mediaSources.map((source: string) => {
//     return {
//       type: "video/mp4",
//       src: `${resUrl}/` + source,
//     };
//   });
// });

// Refs
const musicPlayerRef = ref();
const videoPlayerRef = ref();

const state = reactive({
  isDrawerShow: false,
  currentMedia: null,
});

// Computed
const currentMediaRef = computed(() => store.getters["currentMediaRef"]);
const select = (id: string) => router.push(`/content/${id}`);

const formatTime = (time: string) => format(time);

// const toggleDrawer = (isDrawerShow: boolean) => (state.isDrawerShow = isDrawerShow);

const onMusicPlay = () => {
  if (currentMediaRef.value) currentMediaRef.value.ele.pause();
  store.commit("setMediaRef", {
    type: "music",
    ele: musicPlayerRef,
  });
};

const onVideoPlay = () => {
  if (currentMediaRef.value) currentMediaRef.value.ele.pause();
  store.commit("setMediaRef", {
    type: "video",
    ele: videoPlayerRef,
  });
};
</script>
<style lang="scss" scoped>
@import "@/styles/consts.scss";

.media_blog {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  .title {
    cursor: pointer;
    font-size: $blog-title-size;
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
.media_multi {
  .des-box {
    display: flex;
    justify-content: space-between;
    .title {
      font-size: $blog-title-size;
      margin-bottom: 10px;
    }
  }

  .img-container ::v-deep(.el-image) {
    max-width: 200px;
    height: auto;
  }

  .img-container-large img {
    width: 100% !important;
    height: auto;
  }

  .media_box {
    border-radius: 10px;
  }
}
</style>
