<template>
  <div class="media">
    <h1 class="media-title">媒体</h1>
    <el-table class="media-table" :data="state.mediaData" style="width: 100%">
      <el-table-column type="expand">
        <template #default="scope">
          <div class="media-preview">
            <div v-if="scope.row.media_type">
              <video width="200" v-if="scope.row.media_type.match(/^video\/*/)" :src="resUrl + '/' + scope.row.name"></video>
              <audio v-if="scope.row.media_type.match(/^audio\/*/)" :src="resUrl + '/' + scope.row.name" controls></audio>
              <img v-if="scope.row.media_type.match(/^image\/*/)" :src="resUrl + '/' + scope.row.name" width="200" />
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="文件名" prop="name"> </el-table-column>
      <el-table-column label="文件类型" prop="media_type"> </el-table-column>
      <el-table-column label="大小" prop="size">
        <template #default="scope">
          <span>{{ (scope.row.size / 1048576).toFixed(2) }} MB</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" prop="created_at">
        <template #default="scope">
          <span>{{ formatTime(scope.row.created_at) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button size="small" type="danger" @click="onDeleteFile(scope.row.name)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, onMounted, reactive } from "vue";
import { getCloudFilesDetail, deleteFile } from "@/api/file";
import { format } from "@/utils/formatTime";
import { useMessage } from "@/utils/element-plus";

const resUrl: string = import.meta.env.DEV ? `${import.meta.env.VITE_APP_RES_URL}` : `${import.meta.env.VITE_APP_BASE}/static`;
// Directives
const $message = useMessage(getCurrentInstance());

// Lifecycle
onMounted(async () => {
  await getMediaData();
});

// State
const state = reactive<{ mediaData: any[] }>({
  mediaData: [],
});

// Methods
const getMediaData = async () => {
  try {
    const resp: any = await getCloudFilesDetail();
    state.mediaData = resp.mediaFiles;
  } catch (err: any) {
    $message?.error(`Can not find cloud files: ${err.toString()}`);
  }
};

const formatTime = (time: string) => format(time);

const onDeleteFile = async (fileName: string) => {
  try {
    const resp: any = await deleteFile(fileName);
    if (resp.code !== 200) throw Error("Internal error");
    await getMediaData();
  } catch (err: any) {
    $message?.error(`Can not delete file: ${err.toString()}`);
  }
};
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
