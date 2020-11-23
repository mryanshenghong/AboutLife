<template>
  <div class="media">
    <h1 class="media-title">媒体</h1>
    <el-table class="media-table" :data="mediaData" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="media-preview">
            <div v-if="props.row.media_type">
              <video
                width="200"
                v-if="props.row.media_type.match(/^video\/*/)"
                :src="resUrl + '/' + props.row.name"
              ></video>
              <audio
                v-if="props.row.media_type.match(/^audio\/*/)"
                :src="resUrl + '/' + props.row.name"
                controls
              ></audio>
              <img
                v-if="props.row.media_type.match(/^image\/*/)"
                :src="resUrl + '/' + props.row.name"
                width="200"
              />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文件名" prop="name"> </el-table-column>
      <el-table-column label="文件类型" prop="media_type"> </el-table-column>
      <el-table-column label="大小" prop="size">
        <template slot-scope="props">
          <span>{{ (props.row.size / 1048576).toFixed(2) }} MB</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at">
        <template slot-scope="props">
          <span>{{ format(props.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props">
          <el-button
            size="mini"
            type="danger"
            @click="deleteFile(props.row.name)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import Component from 'vue-class-component'
import { getCloudFilesDetail, deleteFile } from '../../api/file';
import { format } from '../../utils/formatTime';

@Component({})
export default class Media extends Vue {
  public mediaData = [];
  public resUrl: string = process.env.NODE_ENV === 'development' ? `${process.env.VUE_APP_RES_URL}` : `${process.env.VUE_APP_BASE}/static`;
  public async getMediaData() {
    const resp: Error | any = await getCloudFilesDetail().catch(err => <Error>err);
    if (resp instanceof Error) {
      this.$message({
        type: 'error',
        message: 'Can not find cloud files'
      })
    } else {
      this.mediaData = resp.mediaFiles
    }
  }

  public format(time: string) {
    return format(time)
  }

  public async deleteFile(fileName: string) {
    const resp: Error | any = await deleteFile(fileName).catch(err => <Error>err);
    if (!(resp instanceof Error) && resp.code === 200) {
      await this.getMediaData()
    } else {
      this.$message({
        type: "error",
        message: "Can not delete file"
      })
    }
  }

  public async mounted() {
    await this.getMediaData()
  }


}
</script>

<style lang="scss">
.media {
  margin-top: 30px;
  .media-title {
    font-weight: 600;
    font-size: 24px;
  }
  .media-table {
    margin-top: 15px;
  }
}
</style>