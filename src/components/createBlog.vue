<template>
  <el-dialog
    title="新建博客"
    :visible.sync="showCreateModal"
    :show-close="false"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :lock-scroll="true"
    :modal-append-to-body="false"
  >
    <el-form ref="blogForm" :model="form" :inline="true" size="mini" :rules="formRules">
      <el-form-item label="博客主题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="博客标签" style="margin-left: 10px">
        <div class="tagInput">
          <el-input v-model="form.tag" autocomplete="off"></el-input>
          <el-button class="addTagBtn" @click="addTag">添加</el-button>
        </div>
        <div class="tagsBox">
          <el-tag size="mini" v-for="(value, index) in tags" :key="index">{{ value }}</el-tag>
        </div>
      </el-form-item>
      <el-form-item label="博客种类" prop="cat">
        <el-select @change="onCatSelect" filterable allow-create v-model="form.cat" placeholder="请选一个博客种类">
          <el-option v-for="(value, index) in cats" :key="index" :label="value" :value="value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="媒体类型" prop="media_type">
        <el-select @change="onMediaSelet" filterable v-model="form.media_type" placeholder="选择博客媒体类型">
          <el-option key="1" label="文章" value="blog" />
          <el-option key="2" label="图片" value="image" />
          <el-option key="3" label="音乐" value="music" />
          <el-option key="4" label="视频" value="video" />
        </el-select>
      </el-form-item>
      <el-form-item label="媒体文件" prop="mediaSources" style="margin-left: 10px;display:block">
        <el-button type="primary" @click="openFileInput">add</el-button>
        <div style="display:block">
          <el-tag
            class="url"
            size="mini"
            type="success"
            v-if="form.mediaSources.length"
            v-for="(url,index) in form.mediaSources"
            :key="index"
            :closable="true"
            @close="removeFile(url)"
          >{{url}}</el-tag>
        </div>
        <input
          id="fileInput"
          type="file"
          @change="fileChange"
          v-show="false"
          multiple="multiple"
          accept="image/jpg, image/jpeg, image/png, video/mp4, audio/*"
        />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button size="mini" @click="onCloseModal">取 消</el-button>
      <el-button size="mini" type="primary" @click="onCreateBlog">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getBlogCats } from '@/api/blog';
import { uploadFiles } from '@/api/file';
export default {
  props: {
    showCreateModal: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      form: {
        title: '',
        tag: '',
        cat: '',
        media_type: '',
        mediaSources: []
      },
      tags: [],
      cats: [],
      formRules: {
        title: [{ required: true, message: '请输入主题', trigger: 'change' }],
        cat: [{ required: true, message: '请选择种类', trigger: 'change' }],
        media_type: [
          { required: true, message: '请选择媒体类型', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    onCloseModal () {
      this.$emit('onCloseCreateModal');
    },
    onCreateBlog () {
      const newBlog = {
        title: this.form.title,
        tags: this.tags,
        cat: this.form.cat,
        mediaType: this.form.media_type,
        mediaSources: this.form.mediaSources,
        isTech: false
      };
      this.$refs.blogForm.validate((valid) => {
        if (valid) {
          this.$emit('onCreateBlog', newBlog);
        } else {
          throw new Error('invalid');
        }
      });
      this.$refs.blogForm.resetFields();
      this.tags = [];
    },
    addTag () {
      if (this.form.tag) {
        this.tags.push(this.form.tag);
        this.form.tag = '';
      }
    },
    onCatSelect (val) {
      this.form.cat = val;
    },
    onMediaSelet (val) {
      this.form.media_type = val;
    },

    fileChange (e) {
      uploadFiles(e.target.files, localStorage.token)
        .then((res) => {
          this.form.mediaSources.push(...res.fileUrls);
        })
        .catch((err) => {
          this.$message.error('Cannot upload files' + err.toString());
        });
    },
    openFileInput () {
      document.getElementById('fileInput').click();
    },
    removeFile (url) {
      const index = this.form.mediaSources.indexOf(url);
      this.form.mediaSources.splice(index, 1);
    }
  },
  mounted () {
    this.$nextTick(() => {
      getBlogCats(localStorage.token)
        .then((res) => {
          this.cats = res.data.result.cats;
        })
        .catch((err) => {
          throw new Error('get blog info failed' + err);
        });
    });
  }
};
</script>

<style lang="scss" scoped>
#fileInput {
  width: 0;
  height: 0;
}
.url {
  margin: 0 5px;
}
.tagInput {
  display: flex;
  justify-content: space-between;
  .addTagBtn {
    margin-left: 10px;
  }
}
.tagsBox {
  margin: 5px 0;
}
</style>