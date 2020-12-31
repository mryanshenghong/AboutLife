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
      <span v-if="!modalMode" class="time">
        <el-tag type="info" size="small">{{ formatTime(time) }}</el-tag>
      </span>
    </div>
    <div class="media_multi" v-else>
      <div class="des-box">
        <h3 class="title">{{ title }}</h3>
        <el-tag v-if="!modalMode" class="tag" size="mini" type="info">{{
          formatTime(time)
        }}</el-tag>
      </div>
      <div class="media_box">
        <videoPlayer
          v-if="mediaType === 'video'"
          class="video-player vjs-custom-skin"
          ref="videoPlayer"
          :playsinline="true"
          :options="playerOptions"
        />
        <audio
          :src="`${resUrl}/${mediaSources[0]}`"
          v-if="mediaType === 'music'"
          controls
          controlsList="nodownload"
        ></audio>
        <div v-if="mediaType === 'image'" class="img-container">
          <img :src="`${resUrl}/${mediaSources[0]}`" alt />
        </div>
      </div>
    </div>
    <div class="comment-box">
      <Comment v-if="modalMode" :blogId="id" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { format } from '../utils/formatTime';
import Component from 'vue-class-component';
import { videoPlayer } from 'vue-video-player';
import 'video.js/dist/video-js.css';

const Comment = () => import('../components/comments/Comments.vue')

@Component({
  name: 'CardView',
  props: {
    title: String,
    time: String,
    id: String,
    cat: String,
    mediaType: String,
    mediaSources: Array,
    modalMode: Boolean
  },
  components: { videoPlayer, Comment }
})

export default class CardView extends Vue {
  public playerOptions: any = {
    playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
    autoplay: false, // 如果为true,浏览器准备好时开始回放。
    muted: false, // 默认情况下将会消除任何音频。
    loop: false, // 是否视频一结束就重新开始。
    preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: 'zh-CN',
    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    sources: [],
    poster: '', // 封面地址
    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true, // 当前时间和持续时间的分隔符
      durationDisplay: true, // 显示持续时间
      remainingTimeDisplay: false, // 是否显示剩余时间功能
      fullscreenToggle: true // 是否显示全屏按钮
    }
  };

  public resUrl: string = process.env.NODE_ENV === 'development' ? `${process.env.VUE_APP_RES_URL}` : `${process.env.VUE_APP_BASE}/static`;

  public isDrawerShow: boolean = false;

  public select(id: string): void {
    this.$router.push(`/content/${id}`)
  }

  public formatTime(time: string) {
    return format(time);
  }

  public toggleDrawer(isDrawerShow: boolean) {
    this.isDrawerShow = isDrawerShow
  }

  public mounted() {
    this.$nextTick(() => {
      const sources = this.$props.mediaSources;
      this.playerOptions.sources = sources.map((source: string) => {
        return {
          type: 'video/mp4',
          src: `${this.resUrl}/` + source
        };
      });
    });
  }
}
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

  .img-container img {
    max-width: 200px;
    height: auto;
  }

  .media_box {
    border-radius: 10px;
  }
}
.comment-box {
  margin-top: 10px;
}
</style>
